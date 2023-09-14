import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchArtists } from './ArtistsThunk';
import { Box, Grid } from '@mui/material';
import MusicCard from '../../components/UI/MusicCard';
import { useNavigate } from 'react-router-dom';

const Artists = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { artists } = useAppSelector(state => state.artists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <Box component="div" margin={13}>
      <Grid container justifyContent="center" gap={5}>
        {
          artists.map(artist =>
            <MusicCard item={artist}
                       isArtist
                       onClick={() => navigate('/artist/' + artist._id)}
                       key={artist._id} />
          )
        }
      </Grid>
    </Box>
  );
};

export default Artists;