import { ObjectId } from 'mongoose';

export interface IArtist {
  name: string;
  image: string | null;
  info: string | null;
}

export interface IAlbum {
  name: string;
  artist: IArtist;
  date: Date;
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

export interface ITrackMutation {
  _id?: ObjectId;
  name: string;
  album: IAlbumMutation;
  number?: number;
  duration?: string;
}

export interface ITrackHistory {
  _id: ObjectId;
  user: string;
  track: ITrackMutation;
  datetime: Date;
}

export interface ITrackHistoryMutation {
  _id: ObjectId;
  user: string;
  track: { name: string, artist: string };
  datetime: Date;
}