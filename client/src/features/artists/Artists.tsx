import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchArtists } from './ArtistsThunk';
import { Grid } from '@mui/material';
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
    <Grid container
          justifyContent="center"
          gap={4}
          marginTop={15}
    >
      {
        artists.map(artist =>
          <MusicCard item={artist}
                     isArtist
                     onClick={() => navigate('/artist/' + artist._id)}
                     key={artist._id} />
        )
      }
    </Grid>
  );
};

export default Artists;