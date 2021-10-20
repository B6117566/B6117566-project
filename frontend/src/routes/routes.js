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
const Search = lazy(() => import('../pages/Search'));
const Cart = lazy(() => import('../pages/Cart'));
const Order = lazy(() => import('../pages/Order'));
const Account = lazy(() => import('../pages/Account'));
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
        <Route path="/search/:search" element={SuspenseLazy(<Search />)} />
        <Route
          path="/products/:productID"
          element={SuspenseLazy(<Product />)}
        />
        <PrivateRoute path="/cart" element={SuspenseLazy(<Cart />)} />
        <PrivateRoute path="/order" element={SuspenseLazy(<Order />)} />
        <PrivateRoute path="/account" element={SuspenseLazy(<Account />)} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Route>

      <Route path="/auth/" element={<MainLayout />}>
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
  );
}
