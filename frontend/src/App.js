import React from 'react';
import Router from './routes/routes';
import { GlobalStateProvider } from './context/GlobalProvider';

export default function App() {
  return (
    <GlobalStateProvider>
      <Router />
    </GlobalStateProvider>
  );
}
