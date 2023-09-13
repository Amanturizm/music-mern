import { IArtist } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchArtists } from './ArtistsThunk';

interface State {
  artists: IArtist[];
  artistsLoading: boolean;
}

const initialState: State = {
  artists: [],
  artistsLoading: false,
};

const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchArtists.pending, (state: State) => {
      state.artistsLoading = true;
    });
    builder.addCase(fetchArtists.fulfilled, (state: State, { payload }) => {
      state.artistsLoading = false;
      state.artists = payload;
    });
    builder.addCase(fetchArtists.rejected, (state: State) => {
      state.artistsLoading = false;
    });
  },
});

export const artistsReducer = artistsSlice.reducer;