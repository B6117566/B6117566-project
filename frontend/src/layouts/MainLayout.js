import React from 'react';
import { Outlet } from 'react-router-dom';
import MainHeaderBar from '../components/Header/MainHeaderBar';
import ScrollTop from '../components/ScrollTop';
import { SelectIDProvider } from '../context/SelectIDProvider';

export default function MainLayout() {
  return (
    <SelectIDProvider>
      <div style={{ position: 'sticky', top: 0, zIndex: 1 }}>
        <MainHeaderBar />
      </div>
      <Outlet />
      <ScrollTop />
    </SelectIDProvider>
  );
}
