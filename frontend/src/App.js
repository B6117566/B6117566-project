import React, { Suspense } from 'react';
import { useRoutes } from 'react-router-dom';
import SimpleBackdrop from './components/SimpleBackdrop';
import routes from './routes/routes';

function App() {
  const routing = useRoutes(routes);

  return (
    <>
      <Suspense fallback={<SimpleBackdrop />}>{routing}</Suspense>
    </>
  );
}

export default App;
