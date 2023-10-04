export interface IArtist {
  _id: string;
  name: string;
  image: string | null;
  info: string | null;
  isPublished: boolean;
  user: string;
}

export interface IArtistForm {
  name: string;
  image: File | null;
  info: string | null;
}

export interface IAlbum {
  _id: string;
  name: string;
  artist: string;
  date: number;
  image: string | null;
  amount: string;
  isPublished: boolean;
  user: string;
}

export interface IAlbumForm {
  artist: string;
  name: string;
  date: string;
  image: File | null;
}

export interface IAlbumFull {
  _id: string;
  name: string;
  artist: IArtist;
  date: number;
  image: string | null;
  isPublished: boolean;
  user: string;
}

export interface ITrack {
  _id: string;
  name: string;
  album: string;
  number: number;
  youtube: string;
  duration: string;
  isPublished: boolean;
  user: string;
}

export interface ITrackForm {
  name: string;
  album: string;
  number: string;
  youtube: string;
  duration: string;
}

export interface ITrackMutation extends ITrack {
  album: IAlbumFull;
}

export interface ITrackHistory {
  _id: string;
  user: IUser;
  track: { name: string, album: IAlbumFull, };
  datetime: Date;
}

export interface IUser {
  _id: string;
  username: string;
  password: string;
  role: string;
  token: string;
  displayName?: string;
  googleID?: string;
}

export type TUserRegister = Omit<IUser, '_id' | 'token' | 'role' | 'googleID'>;

export interface IRegisterResponse {
  user: IUser;
  message: string;
}

export interface IValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    },
  },
  error: string;
  message: string;
  name: string;
  _message: string;
}