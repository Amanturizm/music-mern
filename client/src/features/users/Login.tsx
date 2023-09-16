import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Avatar, Box, Button, Container, Grid, Link, styled, TextField, Typography } from '@mui/material';
import LockOpenOutlinedIcon from '@mui/icons-material/LockOpenOutlined';
import { TUserRegister } from '../../types';
import { useAppDispatch } from '../../app/hook';
import { login } from './usersThunk';

const CssContainer = styled(Container)({
  color: '#000',
  margin: '150px auto',
  backgroundColor: '#fff',
  borderRadius: 30,
  padding: '10px',
});

const initialState: TUserRegister = {
  username: '',
  password: '',
};

const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [state, setState] = useState<TUserRegister>(initialState);

  const changeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState(prevState => ({ ...prevState, [name]: value }));
  };

  const sendData = async (e: React.FormEvent) => {
    e.preventDefault();

    await dispatch(login(state));
    navigate('/');
  };

  return (
    <CssContainer maxWidth="xs">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
          <LockOpenOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <Box component="form" onSubmit={sendData} sx={{mt: 3}}>
          <Grid container spacing={2}>
            <Grid item xs={12} width={0}>
              <TextField
                required
                label="Username"
                name="username"
                value={state.username}
                onChange={changeValue}
                autoComplete="new-username"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                required
                name="password"
                label="Password"
                type="password"
                value={state.password}
                onChange={changeValue}
                autoComplete="new-password"
              />
            </Grid>
          </Grid>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{mt: 3, mb: 2}}
          >
            Sign In
          </Button>

          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link component={RouterLink} fontSize="JetBrains Mono" to="/signup" variant="body2">
                Don't have an account? Sign up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </CssContainer>
  );
};
export default Login;