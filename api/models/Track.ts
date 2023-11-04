import mongoose, { Schema } from 'mongoose';
import Album from './Album';
import User from './User';
import { TObjectId } from '../types';

const TrackSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: TObjectId) => User.findById(value),
      message: 'User does not exist!',
    },
  },
  album: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: TObjectId) => Album.findById(value),
      message: 'Album does not exist!',
    },
  },
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  youtube: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Track = mongoose.model('Track', TrackSchema);

export default Track;
