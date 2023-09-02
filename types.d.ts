import { ObjectId } from 'mongoose';

export interface IArtist {
  name: string;
  image: string | null;
  info: string | null;
}

export interface IAlbum {
  name: string;
  artist: string;
  date: string;
  image: string | null;
}

export interface IAlbumMutation extends IAlbum {
  _id: ObjectId;
}

export interface ITrack {
  name: string;
  album: string;
  duration: string;
}