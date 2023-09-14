import express from "express";
import { imagesUpload } from '../multer';
import Album from '../models/Album';
import { IAlbum, IAlbumMutation, ITrack } from '../types';
import Track from '../models/Track';

const albumsRouter = express.Router();

albumsRouter.get("/", async (req, res) => {
  try {
    if (req.query.artist) {
      const currentArtistAlbums = await Album
        .find({ artist: req.query.artist })
        .sort({ date: -1 });

      const albumsWithAmountTracks = await Promise.all(
        currentArtistAlbums.map(async ({ _id, name, artist, date, image }) => {
          const tracks = await Track.find({ album: _id }) as ITrack[];

          return { _id, name, artist, date, image, amount: tracks.length };
        }));

      return res.send(albumsWithAmountTracks);
    }
    const albums = await Album.find().sort({ date: -1 });;
    return res.send(albums);
  } catch {
    return res.sendStatus(500);
  }
});

albumsRouter.get("/:id", async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate("artist");
    return res.send(album);
  } catch (e) {
    return res.sendStatus(500);
  }
});

albumsRouter.post("/", imagesUpload.single('image'), async (req, res) => {
  const albumAssembly: IAlbum = {
    name: req.body.name,
    artist: req.body.artist,
    date: req.body.date,
    image: req.file ? 'images/' + req.file.filename : null,
  };

  const album = new Album(albumAssembly);

  try {
    await album.save();
    return res.send(album);
  } catch (e) {
    return res.status(400).send(e);
  }
});

export default albumsRouter;