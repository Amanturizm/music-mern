import React, { useEffect } from 'react';
import { Box, LinearProgress } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchTrackHistory } from './TrackHistoryThunk';
import TrackHistoryItem from '../../components/TrackHistoryItem';
import Empty from '../../components/UI/Empty';

const TrackHistory = () => {
  const dispatch = useAppDispatch();

  const { trackHistory, trackHistoryLoading } = useAppSelector(state => state.trackHistory);

  useEffect(() => {
    if (!trackHistory) {
      dispatch(fetchTrackHistory());
    }

  }, [trackHistory, dispatch]);

  return (
    <Box component="div">
      {
        trackHistoryLoading ? <LinearProgress color="inherit" />
          : trackHistory ? trackHistory.map(item => <TrackHistoryItem item={item} key={item._id} />)
            : <Empty>Track History is empty</Empty>
      }
    </Box>
  );
};

export default TrackHistory;