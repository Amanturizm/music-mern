import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITrack } from '../../types';
import { fetchTracks } from './TracksThunk';

interface State {
  tracks: ITrack[];
  currentPlayTrack: ITrack | null;
  visibleVideo: boolean;
  tracksLoading: boolean;
}

const initialState: State = {
  tracks: [],
  currentPlayTrack: null,
  visibleVideo: true,
  tracksLoading: false,
};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    changeCurrentPlayTrack: (state: State, { payload }: PayloadAction<ITrack>) => {
      state.currentPlayTrack = state.currentPlayTrack?._id === payload._id ? null : payload;
    },
    clearCurrentPlayTrack: (state: State) => {
      state.currentPlayTrack = null;
    },
    toggleVisibleVideo: (state: State) => {
      state.visibleVideo = !state.visibleVideo;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchTracks.pending, (state: State) => {
      state.tracksLoading = true;
    });
    builder.addCase(fetchTracks.fulfilled, (state: State, { payload }) => {
      state.tracksLoading = false;
      state.tracks = payload;
    });
    builder.addCase(fetchTracks.rejected, (state: State) => {
      state.tracksLoading = false;
    });
  },
});

export const tracksReducer = tracksSlice.reducer;
export const { changeCurrentPlayTrack, clearCurrentPlayTrack, toggleVisibleVideo } = tracksSlice.actions;