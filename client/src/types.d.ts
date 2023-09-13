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
  date: string;
  image: string | null;
}

export interface ITrack {
  _id: string;
  name: string;
  album: string;
  duration: string;
}

export interface IUser {
  _id: string;
  username: string;
  password: string;
  token: string;
}

export interface ITrackHistory {
  _id: string;
  user: string;
  track: string;
  datetime: Date;
}