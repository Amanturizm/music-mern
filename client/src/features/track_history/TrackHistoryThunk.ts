import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ITrackHistory } from '../../types';

export const fetchTrackHistory = createAsyncThunk<ITrackHistory[]>(
  'track_history/fetchAll',
  async () => {
    const { data } = await axiosApi('track_history');

    return data;
  },
);

export const postTrackHistory = createAsyncThunk<void, string>(
  'track_history/postOne',
  async (trackId) => {
    await axiosApi.post('track_history', { track: trackId });
  },
);
