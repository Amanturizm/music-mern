import express from "express";
import Track from '../models/track';
import { IAlbum, IAlbumMutation, ITrack } from '../types';
import Album from '../models/album';
import album from '../models/album';

const tracksRouter = express.Router();

tracksRouter.get("/", async (req, res) => {
  try {
    if (req.query.album) {
      const currentAlbumTracks = await Track
        .find({ album: req.query.album })
        .populate("album", "name artist date");

      return res.send(currentAlbumTracks);
    }
    const tracks = await Track.find().populate("album", "name artist date");
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

tracksRouter.post("/", async (req, res) => {
  const trackAssembly: ITrack = {
    name: req.body.name,
    album: req.body.album,
    duration: req.body.duration,
  };

  const track = new Track(trackAssembly);

  try {
    await track.save();
    return res.send(track);
  } catch (e) {
    return res.status(400).send(e);
  }
});

export default tracksRouter;