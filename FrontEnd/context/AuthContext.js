import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState, useReducer, useMemo } from 'react'
import { saveKey, getValueForKey } from '../utils/SecureStore';
import {URL } from '../utils/exports';
// Create a context
const AuthContext = createContext({
    status: 'idle',
    authToken: null,
    userType: 0,
    signIn: () => {},
    signOut: () => {},
    confirmAccount: ()=>{},
});

export const useAuthorization = () => {
    const context = React.useContext(AuthContext);
    if (!context) {
      throw new Error('Error');
    }
    console.log('context ->',context)
    return context;
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    status: 'idle',
    authToken: null,
    userType: 0
  });

  useEffect(() => {
    const initState = async () => {
        try {
            const token = await getValueForKey("token");
            const type = await AsyncStorage.getItem("userType");
            // temporarily checking if it works, change from true later
            // console.log('From AuthContext token: ', token, 'userType: ', type)
            if (token != null && type != 0){
              const tokenValid = await fetch(
                `${URL}/logister/verifyToken`,
                {
                  method: "POST",
                  headers: {
                    "Content-type": "application/json"
                  },
                  body: JSON.stringify({token})
                }
              );
                if(tokenValid.status==200) {
                  const parseRes = await tokenValid.json();
                  await saveKey('token', parseRes.newToken);
                  dispatch({type:'SIGN_IN', payload: {token: parseRes.newToken, userType: type}})
                }
                else {
                  console.log('Token is expired, please login!')
                  dispatch({ type:'SIGN_OUT'})
                }
            } else {
                console.log('No User Information')
                dispatch({ type:'SIGN_OUT'})
            }
        } catch (err) {
            console.log('authContext Error:',err)
        }
    };

    initState();
    console.log('STATE FROM AUTHCONTEXT after update: ', state);
  }, []);

  const actions = useMemo(
    () => ({
      signIn: async (token, type) => {
        dispatch({type: 'SIGN_IN', payload: {token: token, userType: type} });
        console.log('CALLED FROM LOGIN.JS')
      },
      signOut: async () => {
        dispatch({type: 'SIGN_OUT'});
        console.log('CALLED FROM LOGOUT.JS -> reducer should be next')
      },
      confirmAccount: async(type)=>{
        dispatch({type: 'CONFIRM_ACCOUNT', payload: {userType: type} });
        console.log('CALLED FROM ConfirmAccount.js')
      }
    }),
    [state, dispatch],
  );

  return (
    <AuthContext.Provider value={{...state, ...actions }}>
      {children}
    </AuthContext.Provider>
  );
};

const reducer = (state, action) => {
    console.log('\nReducer - ', state, action, '\n')
    switch (action.type) {
      case 'SIGN_OUT':
        return {
          ...state,
          status: 'signOut',
          authToken: null,
          userType: 0,
        };
      case 'SIGN_IN':
        return {
          ...state,
          status: 'signIn',
          authToken: action.payload.token,
          userType: action.payload.userType,
        };
      case 'CONFIRM_ACCOUNT':
        return {
          ...state,
          userType: action.payload.userType
        }
    }
};

export { AuthContext, AuthProvider };
