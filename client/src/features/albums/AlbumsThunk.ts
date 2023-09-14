import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { IAlbum, IAlbumFull } from '../../types';

export const fetchAlbums = createAsyncThunk<IAlbum[], string>(
  'albums/fetchAll',
  async (id) => {
    const { data } = await axiosApi('albums?artist=' + id);

    console.log(data);
    if (!data) return [];

    return data;
  }
);

export const fetchAlbum = createAsyncThunk<IAlbumFull, string>(
  'albums/fetchOne',
  async (id) => {
    const { data } = await axiosApi('albums/' + id);

    if (!data) return [];

    return data;
  }
);