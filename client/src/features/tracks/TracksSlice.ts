import { createSlice } from '@reduxjs/toolkit';
import { ITrack } from '../../types';
import { fetchTracks } from './TracksThunk';

interface State {
  tracks: ITrack[];
  tracksLoading: boolean;
}

const initialState: State = {
  tracks: [],
  tracksLoading: false,
};

const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
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