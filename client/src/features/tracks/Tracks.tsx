import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchTracks } from './TracksThunk';
import { Box, CardMedia, CircularProgress, Grid, LinearProgress, Typography } from '@mui/material';
import { apiUrl } from '../../constants';
import { IArtist } from '../../types';
import Track from '../../components/Track';
import { fetchAlbum } from '../albums/AlbumsThunk';
import { fetchArtists } from '../artists/ArtistsThunk';

const Tracks = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const dispatch = useAppDispatch();
  const { artists } = useAppSelector(state => state.artists);
  const { currentAlbum } = useAppSelector(state => state.albums);
  const { tracks, tracksLoading } = useAppSelector(state => state.tracks);

  const [currentArtist, setCurrentArtist] = useState<IArtist | null>(null);

  useEffect(() => {
    if (id) {
      dispatch(fetchTracks(id));
      dispatch(fetchAlbum(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (currentAlbum) {
      dispatch(fetchArtists());
    }
  }, [currentAlbum, dispatch]);

  useEffect(() => {
    if (artists.length && currentAlbum) {
      setCurrentArtist(artists.find(artist => artist._id === currentAlbum.artist._id) || null);
    }
  }, [artists, currentAlbum]);

  return (
    <>
      {tracksLoading && <LinearProgress color="inherit" />}
      <Box component="div" margin={13}>
        { currentAlbum ?
          <Box component="div"
               display="flex"
               alignItems="center"
               gap={5}
          >
            <CardMedia
              sx={{ height: 200, width: 200, borderRadius: 2 }}
              image={apiUrl + currentAlbum.image}
            />
            <Box>
              <Typography variant="h3" fontWeight="bold">
                {currentAlbum.name}
              </Typography>

              {
                currentArtist ?
                  <Typography variant="h5"
                              marginLeft={.2}
                              onClick={() => navigate('/artist/' + currentArtist._id)}
                              style={{ cursor: 'pointer' }}
                  >
                    {currentArtist.name}
                  </Typography> : <CircularProgress />
              }
            </Box>
          </Box> : <CircularProgress size={100} />
        }
        <Grid container
              flexDirection="column"
              justifyContent="center"
              marginY={5}
        >
          {
            tracks.map(track =>
              <Track
                track={track}
                key={track._id}
              />
            )
          }
        </Grid>
        <Typography variant="h6" textAlign="center">
          {currentArtist?.info}
        </Typography>
      </Box>
    </>
  );
};

export default Tracks;