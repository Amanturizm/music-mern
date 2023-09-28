import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { IArtist } from '../../types';

export const fetchArtists = createAsyncThunk<IArtist[]>(
  'artists/fetchAll',
  async () => {
    const { data } = await axiosApi<IArtist[]>('artists');

    return data;
  }
);