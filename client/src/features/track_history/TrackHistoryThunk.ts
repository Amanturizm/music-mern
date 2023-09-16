import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ITrackHistory } from '../../types';
import { RootState } from '../../app/store';

export const fetchTrackHistory = createAsyncThunk<ITrackHistory[], undefined, { state: RootState }>(
  'track_history/fetchAll',
  async (_, thunkAPI) => {
    const token = thunkAPI.getState().users.user?.token;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    const { data } = await axiosApi('track_history', config);

    if (!data) return [];

    return data;
  },
);

export const postTrackHistory = createAsyncThunk<null, string, { state: RootState }>(
  'track_history/postOne',
  async (trackId, thunkAPI) => {
    const token = thunkAPI.getState().users.user?.token;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    await axiosApi.post('track_history', { track: trackId }, config);

    return null;
  },
);