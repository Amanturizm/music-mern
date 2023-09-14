import express from "express";
import Track from '../models/Track';
import { IAlbum, IAlbumMutation, ITrack } from '../types';
import Album from '../models/Album';
import album from '../models/Album';

const tracksRouter = express.Router();

tracksRouter.get("/", async (req, res) => {
  try {
    if (req.query.album) {
      const currentAlbumTracks = await Track.find({ album: req.query.album });

      return res.send(currentAlbumTracks);
    }
    const tracks = await Track.find();
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
    number: req.body.number,
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