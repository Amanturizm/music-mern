import React, { useEffect, useState } from 'react';
import { Box, CardMedia, Grid, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchAlbums } from './AlbumsThunk';
import MusicCard from '../../components/UI/MusicCard';
import { fetchArtists } from '../artists/ArtistsThunk';
import { apiUrl } from '../../constants';
import { IArtist } from '../../types';

const Albums = () => {
  const { id } = useParams() as { id: string };

  const dispatch = useAppDispatch();
  const { albums } = useAppSelector(state => state.albums);
  const { artists } = useAppSelector(state => state.artists);
  const [currentArtist, setCurrentArtist] = useState<IArtist | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchArtists());
      dispatch(fetchAlbums(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (artists.length && id) {
      setCurrentArtist(artists.find(artist => artist._id === id) || null);
    }
  }, [artists, id]);

  return (
    <Box component="div"
         margin={13}
    >
      { currentArtist ?
        <Box component="div"
             display="flex"
             justifyContent="center"
             alignItems="center"
             gap={5}
        >
          <CardMedia
            sx={{ height: 140, width: 140, borderRadius: '50%' }}
            image={apiUrl + currentArtist.image}
          />
          <Typography variant="h3">
            {currentArtist.name}
          </Typography>
        </Box> : null
      }
      <Grid container
            justifyContent="center"
            gap={4}
            marginY={5}
      >
        { albums.map(album => <MusicCard item={album} key={album._id} />) }
      </Grid>
      <Typography variant="h6" textAlign="center">
        {currentArtist?.info}
      </Typography>
    </Box>
  );
};

export default Albums;