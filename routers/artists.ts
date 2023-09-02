import express from "express";
import Artist from '../models/artist';
import { IArtist } from '../types';
import { imagesUpload } from '../multer';

const artistsRouter = express.Router();

artistsRouter.get("/", async (req, res) => {
  try {
    const artists = await Artist.find() as IArtist[];
    return res.send(artists);
  } catch {
    return res.sendStatus(500);
  }
});

artistsRouter.post("/", imagesUpload.single('image'), async (req, res) => {
  const artistAssembly: IArtist = {
    name: req.body.name,
    info: req.body.info || null,
    image: req.file ? 'images/' + req.file.filename : null,
  };

  const artist = new Artist(artistAssembly);

  try {
    await artist.save();
    return res.send(artist);
  } catch (e) {
    return res.status(400).send(e);
  }
});

export default artistsRouter;