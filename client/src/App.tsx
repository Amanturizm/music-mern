import React from 'react';
import useRoutes from './routes';
import { useAppSelector } from './app/hook';
import Layout from './components/Layout';

const App = () => {
  const { user } = useAppSelector(state => state.users);
  const routes = useRoutes(!!user);

  return (
    <Layout>
      {routes}
    </Layout>
  );
};

export default App;