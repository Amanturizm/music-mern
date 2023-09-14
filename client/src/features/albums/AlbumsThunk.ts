import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { IAlbum } from '../../types';

export const fetchAlbums = createAsyncThunk<IAlbum[], string>(
  'albums',
  async (id) => {
    const { data } = await axiosApi('albums?artist=' + id);

    if (!data) return [];

    return data;
  }
);