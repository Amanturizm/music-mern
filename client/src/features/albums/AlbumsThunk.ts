import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { IAlbum, IAlbumForm, IAlbumFull } from '../../types';

export const fetchAlbums = createAsyncThunk<IAlbum[], string | undefined>(
  'albums/fetchAll',
  async (id) => {
    if (id) {
      const { data } = await axiosApi<IAlbum[]>('albums?artist=' + id);
      return data;
    }
    const { data } = await axiosApi<IAlbum[]>('albums');
    return data;
  },
);

export const fetchAlbum = createAsyncThunk<IAlbumFull, string>('albums/fetchOne', async (id) => {
  const { data } = await axiosApi('albums/' + id);

  return data;
});

export const createAlbum = createAsyncThunk<void, IAlbumForm>('albums/createOne', async (album) => {
  const formData = new FormData();
  const keys = Object.keys(album) as (keyof IAlbumForm)[];

  keys.forEach((key) => {
    const value = album[key];

    if (value !== null) {
      formData.append(key, value);
    }
  });

  await axiosApi.post('/albums', formData);
});

export const deleteAlbum = createAsyncThunk<void, string>('albums/deleteOne', async (id) => {
  await axiosApi.delete('albums/' + id);
});
