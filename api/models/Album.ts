import mongoose, { Types } from 'mongoose';
import Artist from './Artist';

const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => Artist.findById(value),
      message: 'Artist does not exist!',
    },
  },
  date: {
    type: Number,
    required: true,
  },
  image: String,
});

const Album = mongoose.model('Album', AlbumSchema);

export default Album;