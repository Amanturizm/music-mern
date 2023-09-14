import { IAlbum, IAlbumFull } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchAlbum, fetchAlbums } from './AlbumsThunk';

interface State {
  albums: IAlbum[];
  currentAlbum: IAlbumFull | null;
  albumsLoading: boolean;
}

const initialState: State = {
  albums: [],
  currentAlbum: null,
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

    builder.addCase(fetchAlbum.fulfilled, (state: State, { payload }) => {
      state.currentAlbum = payload;
    });
  },
});

export const albumsReducer = albumsSlice.reducer;