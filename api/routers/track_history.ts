import express from 'express';
import mongoose from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import Album from '../models/Album';
import Track from '../models/Track';
import Track_history from '../models/Track_history';
import { IAlbumMutation, ITrackHistoryMutation, ITrackHistorySuper } from '../types';

const trackHistoryRouter = express.Router();

trackHistoryRouter.get('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const track_history = (await Track_history.find({ user: user._id })
      .sort({ datetime: -1 })
      .populate('track', 'user album name')) as ITrackHistoryMutation[];

    const newTrackHistory: Awaited<ITrackHistorySuper>[] = await Promise.all(
      track_history.map(async ({ _id, user, track, datetime }) => {
        const album = (await Album.findOne({ _id: track.album }).populate(
          'artist',
          'user name',
        )) as IAlbumMutation;

        return {
          _id,
          user,
          datetime,
          track: {
            user: track.user,
            name: track.name,
            album: {
              _id: album._id,
              user: album.user,
              image: album.image,
              artist: {
                _id: album.artist._id,
                user: album.artist.user,
                name: album.artist.name,
              },
            },
          },
        };
      }),
    );

    return res.send(newTrackHistory);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

trackHistoryRouter.post('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const track = await Track.findById(req.body.track);

    if (!track) {
      return res.status(404).send({ error: 'Track not found!' });
    }

    const track_history = new Track_history({
      user: user._id,
      track: track._id,
      datetime: new Date().toISOString(),
    });

    await track_history.save();
    return res.send(track_history);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

export default trackHistoryRouter;
