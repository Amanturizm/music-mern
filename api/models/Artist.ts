import mongoose, { Schema } from 'mongoose';
import User from './User';
import { TObjectId } from '../types';

const ArtistSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: TObjectId) => User.findById(value),
      message: 'User does not exist!',
    },
  },
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  info: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Artist = mongoose.model('Artist', ArtistSchema);

export default Artist;
