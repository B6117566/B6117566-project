import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';

//Layout
const MainLayout = lazy(() => import('../layouts/MainLayout'));
const BlankLayout = lazy(() => import('../layouts/BlankLayout'));
const GenderLayout = lazy(() => import('../layouts/GenderLayout'));

//Page
const HomePage = lazy(() => import('../pages/HomePage'));
const NotFound = lazy(() => import('../pages/NotFound'));
const Men = lazy(() => import('../pages/Men'));
const Women = lazy(() => import('../pages/Women'));
const Product = lazy(() => import('../pages/Product'));

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      {
        path: '/genders',
        element: <GenderLayout />,
        children: [
          { path: '/men', element: <Men /> },
          { path: '/women', element: <Women /> },
          { path: '*', element: <Navigate to="/404" /> },
        ],
      },
      { path: '/products/:productId', element: <Product /> },
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
