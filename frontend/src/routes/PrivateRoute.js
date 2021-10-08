import React, { useContext } from 'react';
import { Route, Navigate, useLocation } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalProvider';

export default function PrivateRoute({ element, ...rest }) {
  const { GlobalState } = useContext(GlobalContext);
  let location = useLocation();

  const RoutePart = () => {
    const num = GlobalState.authorPart.length;
    if (num !== 0) {
      let check = false;
      for (let index = 0; index < num; index++) {
        if (GlobalState.authorPart[index] === location.pathname) {
          check = true;
          break;
        }
      }
      if (check) {
        return element;
      } else {
        return <Navigate to="/404" />;
      }
    }
  };

  return (
    <Route
      {...rest}
      element={
        GlobalState.user.isAuthen ? (
          RoutePart()
        ) : (
          <Navigate to="/auth/signin" state={{ from: location }} />
        )
      }
    />
  );
}
