export interface IArtist {
  _id: string;
  name: string;
  image: string | null;
  info: string | null;
}

export interface IAlbum {
  _id: string;
  name: string;
  artist: string;
  date: number;
  image: string | null;
  amount: string;
}

export interface IAlbumFull {
  _id: string;
  name: string;
  artist: IArtist;
  date: number;
  image: string | null;
}

export interface ITrack {
  _id: string;
  name: string;
  album: string;
  number: number;
  duration: string;
}

export interface ITrackHistory {
  _id: string;
  user: string;
  track: string;
  datetime: Date;
}

export interface IUser {
  _id: string;
  username: string;
  password: string;
  token: string;
}

export type TUserRegister = Omit<IUser, '_id' | 'token'>;

export interface IRegisterResponse {
  user: IUser;
  message: string;
}