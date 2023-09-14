import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const AppToolbar = () => {
  return (
    <AppBar position="fixed" sx={{ bgcolor: '#121212' }}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, letterSpacing: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>Attractor School</Link>
        </Typography>
      </Toolbar>
    </AppBar>

  );
};

export default AppToolbar;