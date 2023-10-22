import mongoose from 'mongoose';

export type TObjectId = mongoose.Schema.Types.ObjectId;

export interface IUser {
  _id: TObjectId;
  username: string;
  password: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string | null;
  googleID?: string;
}

export interface IArtist {
  _id: TObjectId;
  user: TObjectId;
  name: string;
  info: string | null;
  image: string | null;
  isPublished: boolean;
}

export interface IAlbum {
  _id: TObjectId;
  user: TObjectId;
  artist: TObjectId;
  name: string;
  date: Date;
  image: string | null;
  amount?: number;
  isPublished: boolean;
}

export interface IAlbumMutation extends Omit<IAlbum, 'artist'> {
  artist: { _id: TObjectId; user: TObjectId; name: string };
}

export interface ITrack {
  _id: TObjectId;
  user: TObjectId;
  album: TObjectId;
  name: string;
  duration: string;
  number: number;
  youtube: string;
  isPublished: boolean;
}

export interface ITrackHistory {
  _id: TObjectId;
  user: TObjectId;
  track: TObjectId;
  datetime: Date;
}

export interface ITrackHistoryMutation extends Omit<ITrackHistory, 'track'> {
  track: { _id: TObjectId; user: TObjectId; album: string; name: string };
}

export interface ITrackHistorySuper extends Omit<ITrackHistory, 'track'> {
  track: {
    user: TObjectId;
    name: string;
    album: {
      _id: TObjectId;
      user: TObjectId;
      image: string | null;
      artist: {
        _id: TObjectId;
        user: TObjectId;
        name: string;
      };
    };
  };
}
