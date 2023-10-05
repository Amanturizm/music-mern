import React from 'react';
import { Box, CardMedia, Grid, styled, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import { MusicNote } from '@mui/icons-material';
import { apiUrl } from '../../constants';
import { IAlbum, IArtist } from '../../types';
import no_album_image from '../../assets/no-album.png';
import NoArtistSvg from './NoArtistSvg';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import axiosApi from '../../axiosApi';
import { deleteArtist, fetchArtists } from '../../features/artists/ArtistsThunk';
import { deleteAlbum, fetchAlbums } from '../../features/albums/AlbumsThunk';
import { useParams } from 'react-router-dom';

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

  const { id } = useParams() as { id: string };
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.users);
  const itemName = artist ? 'artist' : 'album';

  const imageUrl: string = item && item.image ? apiUrl + item.image : no_album_image;

  let image: React.ReactNode = (
    <CardMedia
      sx={{
        height: '100%',
        width: '100%',
        borderRadius: artist ? '50%' : 2,
        bgcolor: '#333',
      }}
      image={imageUrl}
    />
  );

  if ((!item || !item.image) && artist) {
    image = <NoArtistSvg />;
  }

  const deleteItem = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      if (artist) {
        await dispatch(deleteArtist(artist._id));
        await dispatch(fetchArtists());
      } else if (album) {
        await dispatch(deleteAlbum(album._id));
        await dispatch(fetchAlbums(id));
      }
    } catch {
      // nothing
    }
  };

  const togglePublished = async (e: React.MouseEvent) => {
    e.stopPropagation();

    try {
      await axiosApi.patch(`${itemName}s/${item?._id}/togglePublished`);
      if (artist) {
        await dispatch(fetchArtists());
      } else {
        await dispatch(fetchAlbums(id));
      }
    } catch {
      // nothing
    }
  };

  const isVisible =
    item && (item.isPublished || (user && (user.role === 'admin' || user._id === item.user)));

  return item && !isVisible ? null : (
    <CssGrid
      item
      position="relative"
      onClick={onClick}
      width={artist ? 180 : 200}
      height={artist ? 210 : 240}
      padding={artist ? 1 : 2}
      paddingBottom={1}
    >
      <Box
        component="div"
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
      {album ? (
        <Box component="div" display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="subtitle1" textAlign="center">
            {album.date}
          </Typography>

          <Typography variant="subtitle1" display="flex" alignItems="center">
            <MusicNote fontSize="small" />
            {album.amount}
          </Typography>
        </Box>
      ) : null}
      {user && (user.role === 'admin' || user._id === item?.user) && (
        <DeleteIcon
          sx={{
            position: 'absolute',
            left: 8,
            top: 8,
            zIndex: 2,
            ':hover': {
              transform: 'scale(1.2)',
            },
          }}
          onClick={deleteItem}
        />
      )}
      {!item?.isPublished && user && (user.role === 'admin' || user._id === item?.user) && (
        <UnpublishedIcon
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            zIndex: 2,
            ':hover': {
              transform: 'scale(1.2)',
            },
          }}
          onClick={togglePublished}
        />
      )}
    </CssGrid>
  );
};

export default MusicCard;
