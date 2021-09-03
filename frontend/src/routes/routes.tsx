import { Navigate } from 'react-router-dom';

//Layout
import BlankLayout from '../layouts/BlankLayout';
import MainLayout from '../layouts/MainLayout';

//Page
import HomePage from '../pages/HomePage';
import NotFound from '../pages/NotFound';

const routes = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: '/', element: <HomePage /> },
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
