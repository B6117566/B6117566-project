import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import MainHeaderBar from '../components/Header/MainHeaderBar';
import About from '../components/HomePage/About';
import ScrollTop from '../components/ScrollTop';
import { GlobalContext } from '../context/GlobalProvider';
import { Alert, AlertTitle } from '@material-ui/lab';

export default function MainLayout() {
  const { AlertState } = useContext(GlobalContext);
  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 2 }}>
        <MainHeaderBar />
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',

          marginTop: '0.5rem',
        }}
      >
        {AlertState.alertShow ? (
          AlertState.alertSelect ? (
            <Alert
              severity="success"
              style={{
                zIndex: 1,
                position: 'fixed',
                boxShadow: '0 3px 5px 0 rgba(0, 0, 0, 0.1)',
              }}
            >
              <AlertTitle>Success</AlertTitle>
              {AlertState.errorMessage[0]} —{' '}
              <strong>{AlertState.errorMessage[1]}</strong>
            </Alert>
          ) : (
            <Alert
              severity="error"
              style={{
                zIndex: 1,
                position: 'fixed',
                boxShadow: '0 3px 5px 0 rgba(0, 0, 0, 0.1)',
              }}
            >
              <AlertTitle>Error</AlertTitle>
              {AlertState.errorMessage[0]} —{' '}
              <strong>{AlertState.errorMessage[1]}</strong>
            </Alert>
          )
        ) : (
          <></>
        )}
      </div>
      <div style={{ marginBottom: '3rem' }}>
        <Outlet />
      </div>
      <div
        style={{
          position: 'fixed',
          bottom: '0px',
          width: '100%',
          height: '45px',
        }}
      >
        <About />
      </div>
      <ScrollTop />
    </>
  );
}
