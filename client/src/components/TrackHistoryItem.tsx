import React from 'react';
import dayjs from 'dayjs';
import { ITrackHistory } from '../types';
import { Box, CardMedia, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../constants';
import no_album_image from '../assets/no-album.png';

interface Props {
  item: ITrackHistory;
}

const TrackHistoryItem: React.FC<Props> = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Box
      component="div"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      borderBottom={2}
      padding={1}
    >
      <Box component="div" display="flex" alignItems="center" gap={2}>
        <CardMedia
          sx={{ height: 50, width: 50, borderRadius: 2 }}
          image={item.track.album.image ? apiUrl + item.track.album.image : no_album_image}
        />
        <Box component="div">
          <Box component="div" display="flex">
            <Typography
              variant="h6"
              sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}
              onClick={() => navigate('/album/' + item.track.album._id)}
            >
              {item.track.name}
            </Typography>
          </Box>

          <Box component="div" display="flex">
            <Typography
              variant="subtitle1"
              sx={{ cursor: 'pointer', ':hover': { textDecoration: 'underline' } }}
              onClick={() => navigate('/artist/' + item.track.album.artist._id)}
            >
              {item.track.album.artist.name}
            </Typography>
            <div></div>
          </Box>
        </Box>
      </Box>
      <Typography variant="h6">{dayjs(item.datetime).format('HH:mm:ss DD.MM.YYYY')}</Typography>
    </Box>
  );
};

export default TrackHistoryItem;
