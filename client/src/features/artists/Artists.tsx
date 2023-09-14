import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchArtists } from './ArtistsThunk';
import { Grid } from '@mui/material';
import MusicCard from '../../components/UI/MusicCard';

const Artists = () => {
  const dispatch = useAppDispatch();
  const { artists } = useAppSelector(state => state.artists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <Grid container
          justifyContent="center"
          gap={4}
          marginTop={15}
    >
      {
        artists.map(artist => <MusicCard item={artist} key={artist._id} />)
      }
    </Grid>
  );
};

export default Artists;