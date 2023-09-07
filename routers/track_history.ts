import express from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import { IUser } from '../types';
import Track_history from '../models/track_history';

const trackHistoryRouter = express.Router();

trackHistoryRouter.post('/', async (req, res, next) => {
  try {
    const token = req.get('Authorization');

    if (!token) {
      return res.status(401).send({ error: 'No token present!' });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).send({ error: 'Wrong token!' });
    }

    const track_history = new Track_history({
      user: user._id,
      track: req.body.track,
      datetime: new Date().toISOString(),
    });

    await track_history.save();
    return res.send(track_history);
  } catch (e) {
    if (e instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(e);
    }

    return next(e);
  }
});

export default trackHistoryRouter;