import { IAlbum, IAlbumFull } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchAlbum, fetchAlbums } from './AlbumsThunk';

interface State {
  albums: IAlbum[];
  currentAlbum: IAlbumFull | null;
  albumsLoading: boolean;
  currentAlbumLoading: boolean;
}

const initialState: State = {
  albums: [],
  currentAlbum: null,
  albumsLoading: false,
  currentAlbumLoading: false,
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

    builder.addCase(fetchAlbum.pending, (state: State) => {
      state.currentAlbumLoading = true;
    });
    builder.addCase(fetchAlbum.fulfilled, (state: State, { payload }) => {
      state.currentAlbumLoading = false;
      state.currentAlbum = payload;
    });
    builder.addCase(fetchAlbum.rejected, (state: State) => {
      state.currentAlbumLoading = false;
    });
  },
});

export const albumsReducer = albumsSlice.reducer;