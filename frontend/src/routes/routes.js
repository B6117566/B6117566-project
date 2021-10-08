import React, { lazy, Suspense } from 'react';
import { Navigate, Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import SimpleBackdrop from '../components/SimpleBackdrop';

//Layout
import MainLayout from '../layouts/MainLayout';
import BlankLayout from '../layouts/BlankLayout';

//Page
import NotFound from '../pages/NotFound';
const HomePage = lazy(() => import('../pages/HomePage'));
const Product = lazy(() => import('../pages/Product'));
const Gender = lazy(() => import('../pages/Gender'));
const Cart = lazy(() => import('../pages/Cart'));
const SignIn = lazy(() => import('../pages/SignIn'));
const SignUp = lazy(() => import('../pages/SignUp'));

const SuspenseLazy = (component) => {
  return <Suspense fallback={<SimpleBackdrop />}>{component}</Suspense>;
};

export default function Router() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={SuspenseLazy(<HomePage />)} />
        <Route path="/genders/:genderName" element={SuspenseLazy(<Gender />)} />
        <Route
          path="/products/:productID"
          element={SuspenseLazy(<Product />)}
        />
        <PrivateRoute path="/cart" element={SuspenseLazy(<Cart />)} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>

      <Route path="/auth/" element={<BlankLayout />}>
        <Route path="/" element={<Navigate to="/404" />} />
        <Route path="/signin" element={SuspenseLazy(<SignIn />)} />
        <Route path="/signup" element={SuspenseLazy(<SignUp />)} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>

      <Route path="/404" element={<BlankLayout />}>
        <Route path="/" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>
    </Routes>

    /* 
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
  );
}
