import React from 'react';
import { Box, CardMedia, Grid, styled, Typography } from '@mui/material';
import { apiUrl } from '../../constants';
import { IAlbum, IArtist } from '../../types';
import { MusicNote } from '@mui/icons-material';
import no_album_image from '../../assets/no-album.png';
import NoArtistSvg from './NoArtistSvg';

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
  artist?: IArtist;
  album?: IAlbum;
  onClick?: React.MouseEventHandler;
}

const MusicCard: React.FC<Props> = ({ artist, album, onClick }) => {
  const item = artist || album;

  const imageUrl: string = (item && item.image) ? apiUrl + item.image : no_album_image;

  let image: React.ReactNode =
    <CardMedia
      sx={{
        height: '100%',
        width: '100%',
        borderRadius: artist ? '50%' : 2,
        bgcolor: '#333'
      }}
      image={imageUrl}
    />;

  if ((!item || !item.image) && artist) {
    image = <NoArtistSvg />;
  }

  return (
    <CssGrid item
             onClick={onClick}
             width={artist ? 180 : 200}
             height={artist ? 210 : 240}
             padding={artist ? 1 : 2}
             paddingBottom={1}
    >
      <Box component="div"
           width={160}
           height={160}
           margin="0 auto 10px auto"
           borderRadius={artist ? '50%' : 2}
           boxShadow="0 8px 24px rgba(0,0,0,.5)"
      >
        {image}
      </Box>

      <Typography
        variant="h6"
        fontWeight={600}
        textAlign={artist && 'center'}
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {item?.name}
      </Typography>
      {
        album ?
          <Box component="div"
               display="flex"
               justifyContent="space-between"
               alignItems="center"
          >
            <Typography variant="subtitle1" textAlign="center">
              {album.date}
            </Typography>

            <Typography variant="subtitle1"
                        display="flex"
                        alignItems="center"
            >
              <MusicNote fontSize="small" />{album.amount}
            </Typography>
          </Box> : null
      }
    </CssGrid>
  );
};

export default MusicCard;