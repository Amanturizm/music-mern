import React from 'react';
import { CardMedia, Grid, styled, Typography } from '@mui/material';
import { IAlbum, IArtist } from '../../types';
import { apiUrl } from '../../constants';

const CssGrid = styled(Grid)({
  width: 200,
  borderRadius: 10,
  backgroundColor: '#181818',
  padding: '10px',
  cursor: 'pointer',
  ':hover': {
    backgroundColor: '#282828',
    transition: 'all .3s ease',
  },
});

interface Props {
  item: IArtist | IAlbum;
}

const MusicCard: React.FC<Props> = ({ item }) => {
  return (
    <CssGrid item>
      <CardMedia
        sx={{ height: 140, width: 140, borderRadius: '50%', margin: '0 auto 10px auto' }}
        image={apiUrl + item.image}
      />

      <Typography variant="h5" textAlign="center">
        {item.name}
      </Typography>
    </CssGrid>
  );
};

export default MusicCard;