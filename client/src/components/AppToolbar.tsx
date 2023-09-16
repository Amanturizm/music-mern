import React from 'react';
import { AppBar, Box, Button, styled, Toolbar, Typography } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

const CssButton = styled(Button)({
  ':hover': {
    transform: 'scale(1.04)',
    transition: 'all .2s ease',
  },
});

const AppToolbar = () => {
  const navigate = useNavigate();

  return (
    <AppBar position="fixed" sx={{ bgcolor: '#121212' }}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, letterSpacing: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Attractor School</Link>
        </Typography>

        <Box component="div">
          <CssButton
            sx={{ color: '#b3b3b3', ':hover': { color: 'inherit' } }}
            onClick={() => navigate('/signup')}
          >
            Sign up
          </CssButton>

          <CssButton
            sx={{ ':hover': { color: 'primary' } }}
            onClick={() => navigate('/login')}
          >
            Login
          </CssButton>
        </Box>
      </Toolbar>
    </AppBar>

  );
};

export default AppToolbar;