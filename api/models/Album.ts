import mongoose, { Schema } from 'mongoose';
import Artist from './Artist';
import User from './User';
import { TObjectId } from '../types';

const AlbumSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: TObjectId) => User.findById(value),
      message: 'User does not exist!',
    },
  },
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: TObjectId) => Artist.findById(value),
      message: 'Artist does not exist!',
    },
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  date: {
    type: Number,
    required: true,
  },
  image: String,
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Album = mongoose.model('Album', AlbumSchema);

export default Album;
