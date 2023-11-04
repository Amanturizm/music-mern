import React from 'react';
import { Box, Button, ListItemIcon, Menu, MenuItem, SxProps, Theme } from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteIcon from '@mui/icons-material/Delete';
import PublishIcon from '@mui/icons-material/Publish';
import HideSourceIcon from '@mui/icons-material/HideSource';

interface Props {
  deleteVisible?: boolean;
  publishVisible?: boolean;
  isPublish?: boolean;
  deleteClick?: React.MouseEventHandler;
  publishClick?: React.MouseEventHandler;
  hideClick?: React.MouseEventHandler;
  sx?: SxProps<Theme> | undefined;
}

const MusicMenu: React.FC<Props> = ({
  deleteVisible,
  deleteClick,
  publishVisible,
  isPublish,
  publishClick,
  hideClick,
  sx,
}) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();

    setAnchorEl(null);
  };

  return (
    <Box sx={sx}>
      <Button
        id="basic-button"
        aria-controls={open ? 'basic-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        onClick={handleClick}
        sx={{ minWidth: 10, p: 0.5, borderRadius: '50%' }}
      >
        <MoreVertIcon color="action" />
      </Button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {deleteVisible && (
          <MenuItem sx={{ pl: 1 }} onClick={handleClose}>
            <ListItemIcon>
              <DeleteIcon onClick={deleteClick} />
            </ListItemIcon>
            Delete
          </MenuItem>
        )}
        {publishVisible &&
          (isPublish ? (
            <MenuItem sx={{ pl: 1.2 }} onClick={hideClick}>
              <ListItemIcon>
                <HideSourceIcon />
              </ListItemIcon>
              Hide
            </MenuItem>
          ) : (
            <MenuItem sx={{ pl: 1 }} onClick={publishClick}>
              <ListItemIcon>
                <PublishIcon />
              </ListItemIcon>
              Publish
            </MenuItem>
          ))}
      </Menu>
    </Box>
  );
};

export default MusicMenu;
