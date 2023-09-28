import express from "express";
import Artist from '../models/Artist';
import { IArtist } from '../types';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import { HydratedDocument, Types } from 'mongoose';

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res) => {
  try {
    const artists = await Artist.find() as IArtist[];
    return res.send(artists);
  } catch {
    return res.sendStatus(500);
  }
});

artistsRouter.post('/', auth, imagesUpload.single('image'), async (req, res) => {
  try {
    const user = (req as RequestWithUser).user;

    const artistAssembly: IArtist = {
      name: req.body.name,
      info: req.body.info || null,
      image: req.file ? 'images/' + req.file.filename : null,
      user: user._id,
    };

    const artist = new Artist(artistAssembly);

    await artist.save();
    return res.send(artist);
  } catch (e) {
    return res.status(400).send(e);
  }
});

artistsRouter.delete('/:id', auth, permit('admin', 'user'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const artist = await Artist.findById(req.params.id) as HydratedDocument<IArtist>;

    if (!artist) {
      return res.status(404).send({ error: 'Artist not found!' });
    }

    if (user.role !== 'admin' && (user._id.toString() !== artist.user.toString())) {
      return res.status(401).send({ error: 'Don\'t have enough rights!' });
    }

    if (user.role !== 'admin' && artist.isPublished) {
      return res.status(400).send({ error: 'Artist published!' });
    }

    await artist.deleteOne();
    return res.send({ message: 'Artist deleted!' });
  } catch (e) {

    return next(e);
  }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const artist = await Artist.findById(req.params.id) as HydratedDocument<IArtist>;

    artist.isPublished = !artist.isPublished;

    await artist.save();
    return res.send({ message: 'Field toggled!' });
  } catch (e) {
    return next(e);
  }
});

export default artistsRouter;