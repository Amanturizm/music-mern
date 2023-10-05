import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { IArtist, IArtistForm } from '../../types';

export const fetchArtists = createAsyncThunk<IArtist[]>('artists/fetchAll', async () => {
  const { data } = await axiosApi<IArtist[]>('artists');

  return data;
});

export const createArtist = createAsyncThunk<void, IArtistForm>(
  'artists/createOne',
  async (artist) => {
    const formData = new FormData();
    const keys = Object.keys(artist) as (keyof IArtistForm)[];

    keys.forEach((key) => {
      const value = artist[key];

      if (value !== null) {
        formData.append(key, value);
      }
    });

    await axiosApi.post('artists', formData);
  },
);

export const deleteArtist = createAsyncThunk<void, string>('artists/deleteOne', async (id) => {
  await axiosApi.delete('artists/' + id);
});
