import { createSlice } from '@reduxjs/toolkit';
import { ITrack } from '../../types';
import { fetchTracks } from './TracksThunk';

interface State {
  tracks: ITrack[];
  currentPlayTrack: string;
  tracksLoading: boolean;
}

const initialState: State = {
  tracks: [],
  currentPlayTrack: '',
  tracksLoading: false,
};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {
    changeCurrentPlayTrack: (state: State, { payload }) => {
      state.currentPlayTrack = state.currentPlayTrack === payload ? '' : payload;
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
export const { changeCurrentPlayTrack } = tracksSlice.actions;