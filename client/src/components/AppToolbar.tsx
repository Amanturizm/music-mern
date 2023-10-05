import { AppBar, Box, Button, styled, Toolbar, Typography } from '@mui/material';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hook';
import ToolbarMenu from './ToolbarMenu';
import { clearUser } from '../features/users/usersSlice';
import { fetchTrackHistory } from '../features/track_history/TrackHistoryThunk';
import { clearCurrentPlayTrack } from '../features/tracks/TracksSlice';

const CssButton = styled(Button)({
  ':hover': {
    transform: 'scale(1.04)',
    transition: 'all .2s ease',
  },
});

const AppToolbar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isLoginPathname = pathname === '/login' || pathname === '/signup';

  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.users);
  const isAuthenticated = !!user;

  const onTrackHistory = async () => {
    try {
      await dispatch(fetchTrackHistory());
      navigate('/track_history');
    } catch {
      // nothing
    }
  };

  const onLogout = async () => {
    try {
      dispatch(clearUser());
      dispatch(clearCurrentPlayTrack());
      localStorage.removeItem('persist:music:users');
      navigate('/');
    } catch {
      // nothing
    }
  };

  return (
    <AppBar position="fixed">
      <Toolbar sx={{ bgcolor: '#121212' }}>
        <Typography variant="h5" component="div" sx={{ flexGrow: 1, letterSpacing: 1 }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#fff' }}>
            Attractor School
          </Link>
        </Typography>

        {!isAuthenticated && !isLoginPathname && (
          <Box component="div">
            <CssButton
              sx={{ color: '#b3b3b3', ':hover': { color: 'inherit' } }}
              onClick={() => navigate('/signup')}
            >
              Sign up
            </CssButton>

            <CssButton sx={{ ':hover': { color: 'primary' } }} onClick={() => navigate('/login')}>
              Login
            </CssButton>
          </Box>
        )}
        {isAuthenticated && (
          <ToolbarMenu user={user} onTrackHistory={onTrackHistory} onLogout={onLogout} />
        )}
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
