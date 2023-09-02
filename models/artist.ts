import mongoose from 'mongoose';

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  info: String,
});

const Artist = mongoose.model('Artist', ArtistSchema);

export default Artist;