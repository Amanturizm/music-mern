import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchTrackHistory } from './TrackHistoryThunk';
import TrackHistoryItem from '../../components/TrackHistoryItem/TrackHistoryItem';

const TrackHistory = () => {
  const dispatch = useAppDispatch();

  const { trackHistory } = useAppSelector(state => state.trackHistory);

  useEffect(() => {
    if (!trackHistory) {
      dispatch(fetchTrackHistory());
    }

  }, [trackHistory, dispatch]);

  return (
    <Box component="div">
      {trackHistory?.map(item => <TrackHistoryItem item={item} key={item._id} />)}
    </Box>
  );
};

export default TrackHistory;