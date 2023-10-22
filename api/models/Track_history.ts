import mongoose, { Schema } from 'mongoose';
import User from './User';
import Track from './Track';
import { TObjectId } from '../types';

const TrackHistorySchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: TObjectId) => User.findById(value),
      message: 'User does not exist!',
    },
  },
  track: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Track',
    required: true,
    validate: {
      validator: async (value: TObjectId) => Track.findById(value),
      message: 'Track does not exist!',
    },
  },
  datetime: {
    type: Date,
    required: true,
  },
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

export default TrackHistory;
