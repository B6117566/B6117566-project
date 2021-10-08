import React, { createContext, useEffect, useReducer } from 'react';
import {
  getUserRoleOfUser,
  findUserRoleById,
  checkExpiresAuthorization,
} from '../services/UserRole';

async function checkInitAuthorPart() {
  let UserData;
  try {
    UserData = JSON.parse(localStorage.getItem('user'));
  } catch (error) {}
  try {
    if (UserData) {
      const data = await findUserRoleById(UserData.userRole._id);
      return data.result.authorizationPart;
    } else {
      const data = await getUserRoleOfUser();
      return data.result.authorizationPart;
    }
  } catch (error) {
    return [];
  }
}

async function checkInitUser() {
  let UserData;
  try {
    UserData = JSON.parse(localStorage.getItem('user'));
  } catch (error) {}
  try {
    if (UserData) {
      await checkExpiresAuthorization({
        token: UserData.token,
      });
      if (!UserData.isAuthen) {
        UserData.isAuthen = true;
        localStorage.setItem('user', JSON.stringify(UserData));
      }
      return UserData;
    } else {
      return {
        _id: null,
        firstname: null,
        lastname: null,
        userRole: {
          _id: null,
          role: null,
        },
        token: null,
        isAuthen: false,
      };
    }
  } catch (error) {
    UserData.isAuthen = false;
    localStorage.setItem('user', JSON.stringify(UserData));
    return UserData;
  }
}

const initialState = {
  gender: null,
  gender_id: null,
  category: { _id: null, name: null },
  product: null,
  authorPart: [],
  user: {
    isAuthen: true,
  },
};

const Reducer = (state, action) => {
  switch (action.type) {
    case 'SET_GENDER':
      return {
        ...state, // copy state
        gender: action.payload, // set state
      };
    case 'SET_GENDER_ID':
      return {
        ...state,
        gender_id: action.payload,
      };
    case 'SET_CATEGORY':
      return {
        ...state,
        category: { _id: action.payload._id, name: action.payload.name },
      };
    case 'SET_PRODUCT':
      return {
        ...state,
        product: action.payload,
      };
    case 'SET_AUTHORPART':
      return {
        ...state,
        authorPart: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export const GlobalContext = createContext({});

export const GlobalStateProvider = ({ children }) => {
  const [GlobalState, GlobalDispatch] = useReducer(Reducer, initialState);

  useEffect(() => {
    checkInitUser().then((payload) => {
      GlobalDispatch({ type: 'SET_USER', payload });
    });
    checkInitAuthorPart().then((payload) => {
      GlobalDispatch({ type: 'SET_AUTHORPART', payload });
    });
  }, []);

  const SetGenderDP = (payload) =>
    GlobalDispatch({ type: 'SET_GENDER', payload });
  const SetGenderIDDP = (payload) =>
    GlobalDispatch({ type: 'SET_GENDER_ID', payload });
  const SetCategoryDP = (payload) =>
    GlobalDispatch({ type: 'SET_CATEGORY', payload });
  const SetProductDP = (payload) =>
    GlobalDispatch({ type: 'SET_PRODUCT', payload });
  const SetAuthorPartDP = (payload) =>
    GlobalDispatch({ type: 'SET_AUTHORPART', payload });
  const SetUserLoginDP = (payload) =>
    GlobalDispatch({ type: 'SET_USER', payload });

  return (
    <GlobalContext.Provider
      value={{
        GlobalState,
        SetGenderDP,
        SetGenderIDDP,
        SetCategoryDP,
        SetProductDP,
        SetAuthorPartDP,
        SetUserLoginDP,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
