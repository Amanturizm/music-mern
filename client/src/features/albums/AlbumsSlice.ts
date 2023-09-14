import { IAlbum } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchAlbums } from './AlbumsThunk';

interface State {
  albums: IAlbum[];
  albumsLoading: boolean;
}

const initialState: State = {
  albums: [],
  albumsLoading: false,
};

const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchAlbums.pending, (state: State) => {
      state.albumsLoading = true;
    });
    builder.addCase(fetchAlbums.fulfilled, (state: State, { payload }) => {
      state.albumsLoading = false;
      state.albums = payload;
    });
    builder.addCase(fetchAlbums.rejected, (state: State) => {
      state.albumsLoading = false;
    });
  },
});

export const albumsReducer = albumsSlice.reducer;