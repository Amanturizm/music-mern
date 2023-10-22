import express from 'express';
import mongoose, { HydratedDocument } from 'mongoose';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import { imagesUpload } from '../multer';
import Album from '../models/Album';
import Track from '../models/Track';
import { IAlbum, ITrack } from '../types';

const albumsRouter = express.Router();

albumsRouter.get('/', async (req, res) => {
  try {
    if (req.query.artist) {
      const currentArtistAlbums = (await Album.find({ artist: req.query.artist }).sort({
        date: -1,
      })) as unknown as IAlbum[];

      const albumsWithAmountTracks = await Promise.all(
        currentArtistAlbums.map(async ({ _id, name, artist, date, image, isPublished, user }) => {
          const tracks = (await Track.find({ album: _id })) as ITrack[];

          return { _id, name, artist, date, image, isPublished, user, amount: tracks.length };
        }),
      );

      return res.send(albumsWithAmountTracks);
    }
    const albums = await Album.find().sort({ date: -1 });
    return res.send(albums);
  } catch {
    return res.sendStatus(500);
  }
});

albumsRouter.get('/:id', async (req, res) => {
  try {
    const album = await Album.findById(req.params.id).populate('artist');
    return res.send(album);
  } catch (e) {
    return res.sendStatus(500);
  }
});

albumsRouter.post('/', auth, imagesUpload.single('image'), async (req, res) => {
  try {
    const user = (req as RequestWithUser).user;

    const album = new Album({
      user: user._id,
      artist: req.body.artist,
      name: req.body.name,
      date: req.body.date,
      image: req.file ? 'images/' + req.file.filename : null,
    });

    await album.save();
    return res.send(album);
  } catch (e) {
    return res.status(400).send(e);
  }
});

albumsRouter.delete('/:id', auth, permit('admin', 'user'), async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const _id = req.params.id;

    const album = (await Album.findById(_id)) as HydratedDocument<IAlbum>;

    if (!album) {
      return res.status(404).send({ error: 'Album not found!' });
    }

    if (user.role !== 'admin' && user._id.toString() !== album.user.toString()) {
      return res.status(401).send({ error: "Don't have enough rights!" });
    }

    if (user.role !== 'admin' && album.isPublished) {
      return res.status(400).send({ error: 'Album published!' });
    }

    await Track.deleteMany({ album: album._id });

    await album.deleteOne();

    return res.send({ message: 'Album deleted!' });
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const album = (await Album.findById(req.params.id)) as HydratedDocument<IAlbum>;

    album.isPublished = !album.isPublished;

    await album.save();
    return res.send({ message: 'Field toggled!' });
  } catch (e) {
    return next(e);
  }
});

export default albumsRouter;
