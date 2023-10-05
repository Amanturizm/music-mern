import React, { useEffect, useState } from 'react';
import { Box, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import { ITrackForm } from '../types';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { fetchAlbums } from '../features/albums/AlbumsThunk';
import { fetchArtists } from '../features/artists/ArtistsThunk';
import { createTrack } from '../features/tracks/TracksThunk';

const initialState: ITrackForm = {
  name: '',
  number: '',
  duration: '',
  youtube: '',
  album: '',
};

const TracksForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { artists } = useAppSelector((state) => state.artists);
  const { albums } = useAppSelector((state) => state.albums);

  const [state, setState] = useState<ITrackForm>(initialState);
  const [selectedArtist, setSelectedArtist] = useState<string>('');

  useEffect(() => {
    dispatch(fetchArtists());
    dispatch(fetchAlbums());
  }, [dispatch]);

  const changeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent,
  ) => {
    const { name, value } = e.target;

    setState((prevState) => ({ ...prevState, [name]: value }));
  };

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(createTrack(state));
      navigate('/');
    } catch {
      // nothing
    }
  };

  return (
    <Box
      component="form"
      width="60%"
      margin="10% auto"
      display="flex"
      flexDirection="column"
      gap={2}
      onSubmit={sendData}
    >
      <TextField
        sx={{ width: '100%' }}
        required
        label="Name"
        name="name"
        value={state.name}
        onChange={changeValue}
      />

      <TextField
        required
        sx={{ width: '100%' }}
        label="Number"
        name="number"
        type="number"
        value={state.number}
        onChange={changeValue}
      />

      <TextField
        sx={{ width: '100%' }}
        required
        label="Youtube"
        name="youtube"
        value={state.youtube}
        onChange={changeValue}
      />

      <TextField
        sx={{ width: '100%' }}
        required
        label="Duration"
        name="duration"
        value={state.duration}
        onChange={changeValue}
      />

      <Select
        required
        label="Artist"
        name="artist"
        value={selectedArtist}
        onChange={(e) => setSelectedArtist(e.target.value)}
      >
        {artists.map((artist) => (
          <MenuItem value={artist._id} key={artist._id}>
            {artist.name}
          </MenuItem>
        ))}
      </Select>

      <Select required name="album" value={state.album} onChange={changeValue}>
        {albums.map((album) =>
          selectedArtist === album.artist ? (
            <MenuItem value={album._id} key={album._id}>
              {album.name}
            </MenuItem>
          ) : null,
        )}
      </Select>

      <LoadingButton
        sx={{
          width: '100%',
          ':disabled': {
            pointerEvents: 'auto',
            cursor: 'not-allowed',
          },
        }}
        type="submit"
        endIcon={<SendIcon />}
        // disabled={productFormLoading}
        // loading={productFormLoading}
        loadingPosition="end"
        variant="contained"
      >
        Send
      </LoadingButton>
    </Box>
  );
};

export default TracksForm;
