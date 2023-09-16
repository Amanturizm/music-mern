import React from 'react';
import dayjs from 'dayjs';
import { ITrackHistory } from '../../types';
import { Box, Typography } from '@mui/material';

interface Props {
  item: ITrackHistory;
}

const TrackHistoryItem: React.FC<Props> = ({ item }) => {
  return (
    <Box component="div"
         display="flex"
         justifyContent="space-between"
         alignItems="center"
         borderBottom={2}
         paddingY={1}
         paddingX={5}
    >
      <Box component="div">
        <Typography variant="h6">
          {item.track.name}
        </Typography>
        <Typography variant="subtitle1">
          {item.track.artist}
        </Typography>
      </Box>
      <Typography variant="h6">
        {dayjs(item.datetime).format('DD.MM.YYYY HH:mm:ss')}
      </Typography>
    </Box>
  );
};

export default TrackHistoryItem;