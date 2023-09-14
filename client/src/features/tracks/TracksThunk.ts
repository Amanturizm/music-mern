import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ITrack } from '../../types';

export const fetchTracks = createAsyncThunk<ITrack[], string>(
  'tracks/fetchAll',
  async (id) => {
    const { data } = await axiosApi('tracks?album=' + id);

    if (!data) return [];

    return data;
  }
);