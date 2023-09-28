import React, { useEffect, useState } from 'react';
import { Box, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import { IAlbumForm } from '../types';
import FileInput from './UI/FileInput';
import { useAppDispatch, useAppSelector } from '../app/hook';
import { createAlbum } from '../features/albums/AlbumsThunk';
import { fetchArtists } from '../features/artists/ArtistsThunk';

const initialState: IAlbumForm = {
  name: '',
  image: null,
  date: '',
  artist: '',
};

const AlbumsForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { artists } = useAppSelector(state => state.artists);

  const [state, setState] = useState<IAlbumForm>(initialState);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent) => {
    const { name, value } = e.target;

    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const changeFileValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;

    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await dispatch(createAlbum(state));
      navigate('/');
    } catch {}
  };

  return (
    <Box component="form"
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
        label="Date"
        name="date"
        type="number"
        value={state.date}
        onChange={changeValue}
      />

      <Select
        required
        name="artist"
        value={state.artist}
        onChange={changeValue}
      >
        {
          artists.map(artist => (
            <MenuItem value={artist._id} key={artist._id}>{artist.name}</MenuItem>
          ))
        }
      </Select>

      <Box component="div"
           display="flex"
           gap={2}
      >
        <FileInput
          label="image"
          name="image"
          onChange={changeFileValue}
          image={state.image}
        />

        <LoadingButton
          sx={{
            width: '100%',
            ':disabled': {
              pointerEvents: 'auto',
              cursor: 'not-allowed',
            }
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
    </Box>
  );
};

export default AlbumsForm;