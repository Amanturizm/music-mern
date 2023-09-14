import React from 'react';
import Artists from './features/artists/Artists';
import AppToolbar from './components/AppToolbar';
import { Route, Routes } from 'react-router-dom';

const App = () => (
  <>
    <header>
      <AppToolbar />
    </header>

    <main style={{ marginTop: 70 }}>
      <Routes>
        <Route path="/" element={<Artists />} />
      </Routes>
    </main>
  </>
);

export default App;