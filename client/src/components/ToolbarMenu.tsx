import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import HistoryIcon from '@mui/icons-material/History';
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import { Logout } from '@mui/icons-material';
import { IUserForUsing } from '../types';
import { useNavigate } from 'react-router-dom';
import { apiUrl } from '../constants';

interface Props {
  user: IUserForUsing;
  onTrackHistory: React.MouseEventHandler;
  onLogout: React.MouseEventHandler;
}

const ToolbarMenu: React.FC<Props> = ({ user, onTrackHistory, onLogout }) => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  let avatar = '';
  if (user.avatar) {
    avatar = user.avatar.includes('http') ? user.avatar.toString() : apiUrl + user.avatar;
  }

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? 'account-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
          >
            <Avatar src={avatar} sx={{ width: 32, height: 32 }}>
              {user.username[0].toUpperCase()}
            </Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            color: '#fff',
            bgcolor: '#222',
            '& .MuiMenuItem-root': {
              ':hover': {
                bgcolor: 'rgba(227,227,227,.08)',
                transition: 'all .1s linear',
              },
            },
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: '#222',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleClose}>
          <Avatar src={avatar} />
          <Typography
            sx={{ width: 125 }}
            whiteSpace="nowrap"
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {user.displayName || user.username}
          </Typography>
        </MenuItem>
        <Divider color="#ccc" />
        <MenuItem onClick={() => navigate('/add-artist')}>
          <ListItemIcon>
            <AddIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          New artist
        </MenuItem>
        <MenuItem onClick={() => navigate('/add-album')}>
          <ListItemIcon>
            <AddIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          New album
        </MenuItem>
        <MenuItem onClick={() => navigate('/add-track')}>
          <ListItemIcon>
            <AddIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          New track
        </MenuItem>
        <MenuItem onClick={onTrackHistory}>
          <ListItemIcon>
            <HistoryIcon sx={{ color: '#fff' }} />
          </ListItemIcon>
          Track History
        </MenuItem>
        <MenuItem onClick={onLogout}>
          <ListItemIcon>
            <Logout fontSize="small" sx={{ color: '#fff', marginLeft: 0.5 }} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ToolbarMenu;
