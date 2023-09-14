import React from 'react';
import Artists from './features/artists/Artists';
import AppToolbar from './components/AppToolbar';
import { Route, Routes } from 'react-router-dom';
import Albums from './features/albums/Albums';

const App = () => (
  <>
    <header>
      <AppToolbar />
    </header>

    <main style={{ marginTop: 70 }}>
      <Routes>
        <Route path="/" element={<Artists />} />
        <Route path="/artist/:id" element={<Albums />} />
      </Routes>
    </main>
  </>
);

export default App;