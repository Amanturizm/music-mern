import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchArtists } from './ArtistsThunk';
import { Box, Grid, LinearProgress } from '@mui/material';
import MusicCard from '../../components/UI/MusicCard';
import { useNavigate } from 'react-router-dom';

const Artists = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { artists, artistsLoading } = useAppSelector((state) => state.artists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return artistsLoading ? (
    <LinearProgress color="inherit" />
  ) : (
    <Box component="div" marginY={10}>
      <Grid container gap={5} padding={2.2}>
        {artists.map((artist) => (
          <MusicCard
            artist={artist}
            onClick={() => navigate('/artist/' + artist._id)}
            key={artist._id}
          />
        ))}
      </Grid>
    </Box>
  );
};

export default Artists;
