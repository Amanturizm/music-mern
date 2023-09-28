import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ITrack } from '../../types';
import { RootState } from '../../app/store';

export const fetchTracks = createAsyncThunk<ITrack[], string, { state: RootState }>(
  'tracks/fetchAll',
  async (id, { getState }) => {
    const token = getState().users.user?.token;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    const { data } = await axiosApi('tracks?album=' + id, config);

    return data;
  }
);