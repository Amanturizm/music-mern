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
  amount?: number;
}

export interface IAlbumMutation extends IAlbum {
  _id: ObjectId;
}

export interface ITrack {
  name: string;
  album: string;
  number: number;
  duration: string;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
}

export interface ITrackHistory {
  user: string;
  track: string;
  datetime: Date;
}