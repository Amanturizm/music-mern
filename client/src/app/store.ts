import { configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from '../features/artists/ArtistsSlice';
import { albumsReducer } from '../features/albums/AlbumsSlice';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;