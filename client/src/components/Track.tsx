import React, { useState } from 'react';
import { Box, styled, Typography } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import { ITrack } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { postTrackHistory } from '../features/track_history/TrackHistoryThunk';
import { changeCurrentPlayTrack } from '../features/tracks/TracksSlice';
import MusicMenu from './UI/MusicMenu';
import axiosApi from '../axiosApi';
import { deleteTrack, fetchTracks } from '../features/tracks/TracksThunk';

const CssBox = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  borderRadius: 10,
  padding: '15px 40px 15px 25px',
  cursor: 'default',
  ':hover': {
    backgroundColor: '#181818',
    transition: 'all .3s ease',
  },
});

interface Props {
  track: ITrack;
}

const Track: React.FC<Props> = ({ track }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.users);
  const { currentPlayTrack } = useAppSelector((state) => state.tracks);
  const isPLay: boolean = currentPlayTrack?._id === track._id;

  const [isHover, setIsHover] = useState<boolean>(false);
  const [isHoverOnPlay, setIsHoverOnPlay] = useState<boolean>(false);

  const clickPlay = async () => {
    try {
      if (!isPLay) {
        await dispatch(postTrackHistory(track._id));
      }
      dispatch(changeCurrentPlayTrack(track));
    } catch {
      // nothing
    }
  };

  const deleteItem = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      if (confirm('Are you sure you want to delete?')) {
        await dispatch(deleteTrack(track._id)).unwrap();
        await dispatch(fetchTracks(track.album)).unwrap();
      }
    } catch {
      // nothing
    }
  };

  const togglePublished = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await axiosApi.patch(`tracks/${track._id}/togglePublished`);
      await dispatch(fetchTracks(track.album)).unwrap();
    } catch {
      // nothing
    }
  };

  return (
    <CssBox
      component="div"
      sx={{ position: 'relative', bgcolor: isPLay ? '#181818' : 'transparent' }}
      onMouseOver={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <Box component="div" display="flex" gap={4}>
        <Typography
          variant="h6"
          display="flex"
          justifyContent="center"
          alignItems="center"
          minWidth={30}
          maxHeight={30}
          sx={{
            cursor: 'pointer',
            transform: `scale(${(isHover || isPLay) && (isHoverOnPlay ? 1.4 : 1.2)})`,
          }}
          onMouseOver={() => setIsHoverOnPlay(true)}
          onMouseLeave={() => setIsHoverOnPlay(false)}
          onClick={clickPlay}
        >
          {isHover || isPLay ? isPLay ? <PauseIcon /> : <PlayArrowIcon /> : track.number}
        </Typography>

        <Typography variant="h6">{track.name}</Typography>
      </Box>

      <Typography variant="h6">{track.duration}</Typography>

      {user && (user.role === 'admin' || user._id === track.user) && (
        <MusicMenu
          deleteVisible
          publishVisible={user.role === 'admin'}
          isPublish={track.isPublished}
          deleteClick={deleteItem}
          publishClick={togglePublished}
          hideClick={togglePublished}
          sx={{ position: 'absolute', right: 5 }}
        />
      )}
    </CssBox>
  );
};

export default Track;
