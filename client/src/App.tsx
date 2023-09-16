import React from 'react';
import AppToolbar from './components/AppToolbar';
import useRoutes from './routes';
import { useAppSelector } from './app/hook';

const App = () => {
  const { user } = useAppSelector(state => state.users);
  const routes = useRoutes(!!user);

  return (
    <>
      <header>
        <AppToolbar/>
      </header>

      <main style={{marginTop: 65}}>
        {routes}
      </main>
    </>
  );
};

export default App;