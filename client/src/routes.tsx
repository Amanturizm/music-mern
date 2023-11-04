import { Navigate, Route, Routes } from 'react-router-dom';
import Artists from './features/artists/Artists';
import Signup from './features/users/Signup';
import Login from './features/users/Login';
import Albums from './features/albums/Albums';
import Tracks from './features/tracks/Tracks';
import TrackHistory from './features/track_history/TrackHistory';
import ArtistsForm from './components/ArtistsForm';
import AlbumsForm from './components/AlbumsForm';
import TracksForm from './components/TracksForm';

const useRoutes = (isAuthenticated: boolean) => (
  <Routes>
    <Route path="/" element={<Artists />} />
    <Route path="/artist/:id" element={<Albums />} />
    <Route path="/album/:id" element={<Tracks />} />
    {!isAuthenticated ? (
      <>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </>
    ) : (
      <>
        <Route path="/track_history" element={<TrackHistory />} />
        <Route path="/add-artist" element={<ArtistsForm />} />
        <Route path="/add-album" element={<AlbumsForm />} />
        <Route path="/add-track" element={<TracksForm />} />
      </>
    )}
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
);

export default useRoutes;
