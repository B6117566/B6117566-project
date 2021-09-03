import React from 'react';
import { Outlet } from 'react-router-dom';
import MainHeaderBar from '../components/Header/MainHeaderBar';
import ScrollTop from '../components/Header/ScrollTop';

function MainLayout() {
  return (
    <>
      <header style={{ position: 'sticky', top: 0 }}>
        <MainHeaderBar />
      </header>
      <Outlet />
      <ScrollTop />
    </>
  );
}

export default MainLayout;
