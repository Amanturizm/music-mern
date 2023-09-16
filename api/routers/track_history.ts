import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import { IAlbum, IAlbumMutation, ITrack, ITrackHistory, ITrackHistoryMutation, ITrackMutation, IUser } from '../types';
import Track_history from '../models/Track_history';
import auth, { RequestWithUser } from '../middleware/auth';
import Track from '../models/Track';
import Album from '../models/Album';

const trackHistoryRouter = express.Router();

trackHistoryRouter.get('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const track_history = await Track_history
      .find({ user: user._id })
      .sort({ datetime: -1 })
      .populate('track', 'name album') as ITrackHistory[];

    const newTrackHistory: ITrackHistoryMutation[] = [];

    void await Promise.all(track_history.map(async ({ _id, user, track, datetime }) => {
      const album = await Album
        .findOne({ _id: track.album })
        .populate('artist', 'name') as IAlbumMutation;

      newTrackHistory.push({ _id, user, datetime, track: { name: track.name, artist: album.artist.name } });
    }));

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

    const track_history = new Track_history({
      user: user._id,
      track: req.body.track,
      datetime: new Date().toISOString(),
    });

    await track_history.save();
    return res.send(track_history);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      if (e.errors.track) {
        return res.status(404).send({ error: 'Track not found!' });
      }
      return res.status(400).send(e);
    }

    return next(e);
  }
});

export default trackHistoryRouter;