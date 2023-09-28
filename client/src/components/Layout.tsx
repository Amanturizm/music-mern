import React, { PropsWithChildren } from 'react';
import { Box, ThemeProvider } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hook';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import YouTubeIcon from '@mui/icons-material/YouTube';
import AppToolbar from './AppToolbar';
import Youtube from './UI/Youtube';
import { clearCurrentPlayTrack, toggleVisibleVideo } from '../features/tracks/TracksSlice';
import theme from '../theme';

const iconStyles = {
  width: 35,
  height: 35,
  cursor: 'pointer',
  ':hover': {
    fill: '#ccc',
  },
};

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.users);
  const isAuthenticated = !!user;
  const { currentPlayTrack, visibleVideo } = useAppSelector(state => state.tracks);

  return (
    <ThemeProvider theme={theme}>
      <header>
        <AppToolbar/>
      </header>

      <main style={{marginTop: 65}}>
        {
          (currentPlayTrack && isAuthenticated) &&
          <Box component="div"
               position="fixed"
               top={90}
               right={67}
               style={{ borderRadius: 20 }}
          >
            <Youtube src={currentPlayTrack.youtube} visible={visibleVideo} isAutoPlay />
            <Box component="div"
                 position="absolute"
                 top={0}
                 right={-40}
                 display="flex"
                 flexDirection="column"
            >
              <CloseIcon
                sx={iconStyles}
                onClick={() => dispatch(clearCurrentPlayTrack())}
              />
              {
                visibleVideo ?
                  <VisibilityOffIcon
                    sx={iconStyles}
                    onClick={() => dispatch(toggleVisibleVideo())}
                  /> :
                  <YouTubeIcon
                    sx={iconStyles}
                    onClick={() => dispatch(toggleVisibleVideo())}
                  />
              }
            </Box>
          </Box>
        }
        {children}
      </main>
    </ThemeProvider>
  );
};

export default Layout;