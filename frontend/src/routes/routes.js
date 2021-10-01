import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

//Layout
const MainLayout = lazy(() => import('../layouts/MainLayout'));
const BlankLayout = lazy(() => import('../layouts/BlankLayout'));

//Page
const HomePage = lazy(() => import('../pages/HomePage'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Product = lazy(() => import('../pages/Product'));
const Gender = lazy(() => import('../pages/Gender'));

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/genders/:genderName', element: <Gender /> },
      { path: '/products/:productID', element: <Product /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  /* {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { path: '/', element: <Dashboard /> },
      { path: 'account', element: <Account /> },
      { path: 'customers', element: <CustomerList /> },
      { path: 'products', element: <ProductList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  }, */
  {
    path: '/404',
    element: <BlankLayout />,
    children: [
      { path: '/', element: <NotFound /> },
      { path: '*', element: <Navigate to="/404" /> },
    ],
  },
];

export default routes;
