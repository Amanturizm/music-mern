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