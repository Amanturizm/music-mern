import React from 'react';
import { ITrack } from '../types';
import { Box, styled, Typography } from '@mui/material';

const CssBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  borderRadius: 10,
  padding: '15px 25px',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#181818',
    transition: 'all .3s ease',
  }
});

interface Props {
  track: ITrack;
}

const Track: React.FC<Props> = ({ track }) => {
  return (
    <CssBox component="div">
      <Box component="div"
           display="flex"
           gap={4}
      >
        <Typography variant="h6" minWidth={25} textAlign="end">
          {track.number}
        </Typography>

        <Typography variant="h6">
          {track.name}
        </Typography>
      </Box>

      <Typography variant="h6">
        {track.duration}
      </Typography>
    </CssBox>
  );
};

export default Track;