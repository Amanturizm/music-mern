import mongoose, { ObjectId, Types } from 'mongoose';

export interface IArtist {
  name: string;
  image?: string | null;
  info?: string | null;
  isPublished?: boolean;
  user: Types.ObjectId;
}

export interface IArtistMutation extends IArtist {
  _id: Types.ObjectId;
}

export interface IAlbum {
  name?: string;
  artist: IArtistMutation;
  date?: Date;
  image?: string | null;
  amount?: number;
  isPublished?: boolean;
  user: Types.ObjectId;
}

export interface IAlbumMutation extends IAlbum {
  _id: Types.ObjectId;
}

export interface ITrack {
  name: string;
  album: string;
  number: number;
  duration: string;
  youtube: string;
  isPublished?: boolean;
  user: Types.ObjectId;
}

export interface IUser {
  username: string;
  password: string;
  token: string;
  role: string;
  displayName?: string;
  googleID?: string;
}

export interface ITrackMutation {
  _id: Types.ObjectId;
  name: string;
  album: IAlbumMutation;
  youtube: string;
  number?: number;
  duration?: string;
  isPublished?: boolean;
  user?: Types.ObjectId;
}

export interface ITrackHistory {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  track: ITrackMutation;
  datetime: Date;
}

export interface ITrackHistoryMutation {
  _id: Types.ObjectId;
  user: Types.ObjectId;
  track: { name: string, album: IAlbumMutation };
  datetime: Date;
}