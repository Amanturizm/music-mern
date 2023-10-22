import express from 'express';
import mongoose, { HydratedDocument } from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import { imagesUpload } from '../multer';
import Artist from '../models/Artist';
import Album from '../models/Album';
import Track from '../models/Track';
import { IAlbum, IArtist } from '../types';

const artistsRouter = express.Router();

artistsRouter.get('/', async (req, res) => {
  try {
    const artists = (await Artist.find()) as IArtist[];
    return res.send(artists);
  } catch {
    return res.sendStatus(500);
  }
});

artistsRouter.post('/', auth, imagesUpload.single('image'), async (req, res) => {
  try {
    const user = (req as RequestWithUser).user;

    const artist = new Artist({
      user: user._id,
      name: req.body.name,
      info: req.body.info,
      image: req.file ? 'images/' + req.file.filename : null,
    });

    await artist.save();
    return res.send(artist);
  } catch (e) {
    return res.status(400).send(e);
  }
});

artistsRouter.delete('/:id', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const _id = req.params.id;

    const artist = (await Artist.findById(_id)) as HydratedDocument<IArtist>;

    if (!artist) {
      return res.status(404).send({ error: 'Artist not found!' });
    }

    if (user.role !== 'admin' && user._id.toString() !== artist.user.toString()) {
      return res.status(401).send({ error: "Don't have enough rights!" });
    }

    if (user.role !== 'admin' && artist.isPublished) {
      return res.status(400).send({ error: 'Artist published!' });
    }

    const albums = (await Album.find({ artist: _id })) as HydratedDocument<IAlbum[]>;

    await Promise.all(albums.map(async ({ _id }) => await Track.deleteMany({ album: _id })));

    await Album.deleteMany({ artist: _id });

    await artist.deleteOne();

    return res.send({ message: 'Artist deleted!' });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const artist = (await Artist.findById(req.params.id)) as HydratedDocument<IArtist>;

    artist.isPublished = !artist.isPublished;

    await artist.save();
    return res.send({ message: 'Field toggled!' });
  } catch (e) {
    return next(e);
  }
});

export default artistsRouter;
