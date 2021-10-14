import { Grid } from '@material-ui/core';
import React from 'react';
import { Outlet } from 'react-router-dom';
import MainHeaderBar from '../components/Header/MainHeaderBar';
import About from '../components/HomePage/About';
import ScrollTop from '../components/ScrollTop';

export default function MainLayout() {
  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>
        <MainHeaderBar />
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
