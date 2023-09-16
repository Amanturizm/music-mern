import { ITrackHistory } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { fetchTrackHistory } from './TrackHistoryThunk';

interface State {
  trackHistory: ITrackHistory[];
  trackHistoryLoading: boolean;
}

const initialState: State = {
  trackHistory: [],
  trackHistoryLoading: false,
};

const trackHistorySlice = createSlice({
  name: 'track_history',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchTrackHistory.pending, (state: State) => {
      state.trackHistoryLoading = true;
    });
    builder.addCase(fetchTrackHistory.fulfilled, (state: State, { payload }) => {
      state.trackHistoryLoading = false;
      state.trackHistory = payload;
    });
    builder.addCase(fetchTrackHistory.rejected, (state: State) => {
      state.trackHistoryLoading = false;
    });
  },
});

export const trackHistoryReducer = trackHistorySlice.reducer;