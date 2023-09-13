import mongoose, { Types } from 'mongoose';
import Artist from './artist';
import Album from './album';

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
});

const Track = mongoose.model('Track', TrackSchema);

export default Track;