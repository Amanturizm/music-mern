import React, { useEffect, useState } from 'react';
import { Box, CardMedia, CircularProgress, Grid, LinearProgress, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchAlbums } from './AlbumsThunk';
import VerifiedIcon from '@mui/icons-material/Verified';
import MusicCard from '../../components/UI/MusicCard';
import { fetchArtists } from '../artists/ArtistsThunk';
import { apiUrl } from '../../constants';
import { IArtist } from '../../types';

const Albums = () => {
  const navigate = useNavigate();
  const { id } = useParams() as { id: string };

  const dispatch = useAppDispatch();
  const { albums, albumsLoading } = useAppSelector(state => state.albums);
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
    <>
      {albumsLoading && <LinearProgress color="inherit" />}
      <Box component="div" margin={13}>
        { currentArtist ?
          <Box component="div"
               display="flex"
               alignItems="center"
               gap={5}
          >
            <CardMedia
              sx={{ height: 225, width: 225, borderRadius: '50%' }}
              image={apiUrl + currentArtist.image}
            />
            <Typography variant="h2"
                        display="flex"
                        alignItems="center"
                        gap={2}
                        position="relative"
            >
              {currentArtist.name}
              <Box component="div"
                   width={30}
                   height={25}
                   position="absolute"
                   top={25}
                   right={15}
                   bgcolor="#fff"
              >
              </Box>
              <VerifiedIcon color="primary" sx={{ fontSize: 60, zIndex: 1 }} />
            </Typography>
          </Box> : <CircularProgress size={100} />
        }
        <Grid container
              gap={4}
              marginY={5}
        >
          {
            albums.map(album =>
              <MusicCard album={album}
                         onClick={() => navigate('/album/' + album._id)}
                         key={album._id}/>
            )
          }
        </Grid>
        <Typography variant="h6">
          {currentArtist?.info}
        </Typography>
      </Box>
    </>
  );
};

export default Albums;