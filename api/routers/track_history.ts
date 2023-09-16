import express from 'express';
import mongoose from 'mongoose';
import User from '../models/User';
import { ITrack, IUser } from '../types';
import Track_history from '../models/Track_history';
import auth, { RequestWithUser } from '../middleware/auth';
import Track from '../models/Track';

const trackHistoryRouter = express.Router();

trackHistoryRouter.get('/', auth, async (req, res, next) => {
  try {
    const user = (req as RequestWithUser).user;

    const track_history = await Track_history
      .find({ user: user._id })
      // .sort({ date: -1 });

    return res.send(track_history);
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