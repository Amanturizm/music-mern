import React from 'react';
import { Box, CardMedia, Grid, styled, Typography } from '@mui/material';
import { IAlbum, IArtist } from '../../types';
import { apiUrl } from '../../constants';

const CssGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  borderRadius: 10,
  backgroundColor: '#181818',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#282828',
    transition: 'all .3s ease',
  },
});

interface Props {
  item: IArtist | IAlbum;
  isArtist?: boolean;
  onClick?: React.MouseEventHandler;
}

const MusicCard: React.FC<Props> = ({ item, isArtist, onClick }) => {
  return (
    <CssGrid item
             onClick={onClick}
             width={isArtist ? 180 : 200}
             height={isArtist ? 210 : 240}
             padding={isArtist ? 1 : 2}
    >
      <Box component="div"
           width={160}
           height={160}
           margin="0 auto"
           borderRadius={isArtist ? '50%' : 2}
           boxShadow="0 8px 24px rgba(0,0,0,.5)"
      >
        <CardMedia
          sx={{ height: '100%', width: '100%', borderRadius: isArtist ? '50%' : 2, }}
          image={apiUrl + item.image}
        />
      </Box>

      <Typography
        variant="h6"
        textAlign="center"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {item.name}
      </Typography>
    </CssGrid>
  );
};

export default MusicCard;