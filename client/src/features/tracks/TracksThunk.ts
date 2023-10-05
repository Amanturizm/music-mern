import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { ITrack, ITrackForm } from '../../types';

export const fetchTracks = createAsyncThunk<ITrack[], string>('tracks/fetchAll', async (id) => {
  const { data } = await axiosApi('tracks?album=' + id);

  return data;
});

export const createTrack = createAsyncThunk<void, ITrackForm>('tracks/createOne', async (track) => {
  await axiosApi.post('/tracks', track);
});
