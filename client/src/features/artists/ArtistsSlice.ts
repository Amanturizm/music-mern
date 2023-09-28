import { IArtist } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { createArtist, fetchArtists } from './ArtistsThunk';

interface State {
  artists: IArtist[];
  artistsLoading: boolean;
  artistsFormLoading: boolean;
}

const initialState: State = {
  artists: [],
  artistsLoading: false,
  artistsFormLoading: false,
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

    builder.addCase(createArtist.pending, (state: State) => {
      state.artistsFormLoading = true;
    });
    builder.addCase(createArtist.fulfilled, (state: State) => {
      state.artistsFormLoading = false;
    });
    builder.addCase(createArtist.rejected, (state: State) => {
      state.artistsFormLoading = false;
    });
  },
});

export const artistsReducer = artistsSlice.reducer;