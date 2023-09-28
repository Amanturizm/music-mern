import React, { useState } from 'react';
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import SendIcon from '@mui/icons-material/Send';
import { IArtistForm } from '../types';
import FileInput from './UI/FileInput';
import { useAppDispatch } from '../app/hook';
import { createArtist } from '../features/artists/ArtistsThunk';
import { useNavigate } from 'react-router-dom';

const initialState: IArtistForm = {
  name: '',
  image: null,
  info: '',
};

const ArtistsForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [state, setState] = useState<IArtistForm>(initialState);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
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
      await dispatch(createArtist(state));
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
        multiline rows={3}
        sx={{ width: '100%' }}
        label="Info"
        name="info"
        value={state.info}
        onChange={changeValue}
      />

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

export default ArtistsForm;