import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AppToolbar from './components/AppToolbar';
import Artists from './features/artists/Artists';
import Signup from './features/users/Signup';
import Albums from './features/albums/Albums';
import Tracks from './features/tracks/Tracks';
import Login from './features/users/Login';

const App = () => (
  <>
    <header>
      <AppToolbar />
    </header>

    <main style={{ marginTop: 65 }}>
      <Routes>
        <Route path="/" element={<Artists />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/artist/:id" element={<Albums />} />
        <Route path="/album/:id" element={<Tracks />} />
      </Routes>
    </main>
  </>
);

export default App;