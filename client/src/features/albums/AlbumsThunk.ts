import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { IAlbum, IAlbumFull } from '../../types';

export const fetchAlbums = createAsyncThunk<IAlbum[], string>(
  'albums/fetchAll',
  async (id) => {
    const { data } = await axiosApi<IAlbum[]>('albums?artist=' + id);

    return data
  }
);

export const fetchAlbum = createAsyncThunk<IAlbumFull, string>(
  'albums/fetchOne',
  async (id) => {
    const { data } = await axiosApi('albums/' + id);

    return data;
  }
);