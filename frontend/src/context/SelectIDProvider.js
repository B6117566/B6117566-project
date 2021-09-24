import React, { createContext, useReducer } from 'react';

const initialState = {
  gender: null,
  gender_id: null,
  category: { _id: null, name: null },
  product: null,
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
        ...state, // copy state
        gender_id: action.payload, // set state
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
    default:
      return state;
  }
};

export const SelectIDContext = createContext({});

export const SelectIDProvider = ({ children }) => {
  const [SelectIDState, SelectIDDispatch] = useReducer(Reducer, initialState);

  const SetGenderDP = (payload) =>
    SelectIDDispatch({ type: 'SET_GENDER', payload });
  const SetGenderIDDP = (payload) =>
    SelectIDDispatch({ type: 'SET_GENDER_ID', payload });
  const SetCategoryDP = (payload) =>
    SelectIDDispatch({ type: 'SET_CATEGORY', payload });
  const SetProductDP = (payload) =>
    SelectIDDispatch({ type: 'SET_PRODUCT', payload });
  return (
    <SelectIDContext.Provider
      value={{
        SelectIDState,
        SetGenderDP,
        SetGenderIDDP,
        SetCategoryDP,
        SetProductDP,
      }}
    >
      {children}
    </SelectIDContext.Provider>
  );
};
