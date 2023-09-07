import { model, Schema, Types } from 'mongoose';
import User from './user';
import Track from './track';

const TrackHistorySchema = new Schema({
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist!',
    },
  },
  track: {
    type: Types.ObjectId,
    ref: 'Track',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Track.findById(value),
      message: 'Track does not exist!',
    },
  },
  datetime: {
    type: Date,
    required: true,
  },
});

const TrackHistory = model('TrackHistory', TrackHistorySchema);

export default TrackHistory;