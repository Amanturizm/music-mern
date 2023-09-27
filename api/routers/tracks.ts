import express from "express";
import Track from '../models/Track';
import { IAlbum, IAlbumMutation, ITrack } from '../types';
import Album from '../models/Album';
import album from '../models/Album';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import mongoose, { HydratedDocument } from 'mongoose';

const tracksRouter = express.Router();

tracksRouter.get("/", auth, async (req, res) => {
  try {
    if (req.query.album) {
      const currentAlbumTracks = await Track
        .find({ album: req.query.album })
        .sort({ number: 1 });

      return res.send(currentAlbumTracks);
    }
    const tracks = await Track.find().sort({ number: 1 });;
    return res.send(tracks);
  } catch {
    return res.sendStatus(500);
  }
});

tracksRouter.get("/:id", async (req, res) => {
  try {
    const albums = await Album.find({ artist: req.params.id }) as IAlbumMutation[];

    const artistTracks: ITrack[] = [];

    void await Promise.all(albums.map(async (album) => {
      const currentAlbumTrack = await Track
        .find({ album: album._id })
        .populate("album", "name date image") as ITrack[];

      currentAlbumTrack.forEach(track => {
        artistTracks.push(track);
      });
    }));

    return res.send(artistTracks);
  } catch {
    return res.status(500);
  }
});

tracksRouter.post("/", auth, async (req, res) => {
  try {
    const trackAssembly: ITrack = {
      name: req.body.name,
      album: req.body.album,
      number: req.body.number,
      duration: req.body.duration,
      youtube: req.body.youtube,
      user: req.body.user,
    };

    const track = new Track(trackAssembly);

    await track.save();
    return res.send(track);
  } catch (e) {
    return res.status(400).send(e);
  }
});

tracksRouter.delete('/:id', auth, permit('admin', 'user'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const track = await Track.findById(req.params.id) as HydratedDocument<IAlbum>;

    if (!track) {
      return res.status(404).send({ error: 'Track not found!' });
    }

    if (user.role !== 'admin' && (user._id.toString() !== track.user.toString())) {
      return res.status(401).send({ error: 'Don\'t have enough rights!' });
    }

    if (track.isPublished) {
      return res.status(400).send({ error: 'Track published!' });
    }

    await track.deleteOne();
    return res.send({ message: 'Track deleted!' });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const track = await Track.findById(req.params.id) as HydratedDocument<ITrack>;

    track.isPublished = !track.isPublished;

    await track.save();
    return res.send({ message: 'Field toggled!' });
  } catch (e) {
    return next(e);
  }
});

export default tracksRouter;