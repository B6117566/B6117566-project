import React from 'react';
import { Outlet } from 'react-router-dom';
import MainHeaderBar from '../components/Header/MainHeaderBar';
import ScrollTop from '../components/ScrollTop';

export default function MainLayout() {
  return (
    <>
      <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>
        <MainHeaderBar />
      </div>
      <Outlet />
      <ScrollTop />
    </>
  );
}
