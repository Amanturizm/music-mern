import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { fetchArtists } from './ArtistsThunk';

const Artists = () => {
  const dispatch = useAppDispatch();
  const { artists } = useAppSelector(state => state.artists);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <div>
      {
        artists.map(artist => <div>{artist.name}</div>)
      }
    </div>
  );
};

export default Artists;