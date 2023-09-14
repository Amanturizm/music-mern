import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';

const AppToolbar = () => {
  return (
    <AppBar position="fixed" sx={{ bgcolor: '#121212' }}>
      <Toolbar>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, letterSpacing: 1 }}>
          Artists
        </Typography>
      </Toolbar>
    </AppBar>

  );
};

export default AppToolbar;