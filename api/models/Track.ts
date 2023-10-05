import mongoose, { Types } from 'mongoose';
import Artist from './Artist';
import Album from './Album';
import User from './User';

const Schema = mongoose.Schema;

const TrackSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Album.findById(value),
      message: 'Album does not exist!',
    },
  },
  duration: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    required: true,
  },
  youtube: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => User.findById(value),
      message: 'User does not exist!',
    },
  },
});

const Track = mongoose.model('Track', TrackSchema);

export default Track;
