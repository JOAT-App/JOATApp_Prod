import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {createContext, useEffect, useState, useReducer, useMemo } from 'react'

// Create a context
const CredentialContext = createContext({
    status: 'idle',
    authToken: null,
    userType: 0,
    signIn: () => {},
    signOut: () => {},
});

const CredentialProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    id: null,
    token: null,
    userType: null,
    fname: null,
    lname: null,
    image: null,
    stripeVerified: false,
  });

  useEffect(() => {
    const initState = async () => {
        try {
            const _token = await AsyncStorage.getItem("token", parseRes.token);
            const _id = await AsyncStorage.getItem('id', String(parseRes.id))
            const _fname = await AsyncStorage.getItem('fname', parseRes.fname)
            const _lname = await AsyncStorage.getItem('lname', parseRes.lname)
            const _image_url = await AsyncStorage.getItem('image_url', parseRes.image_url)
            const _userType = await AsyncStorage.getItem('userType', String(parseRes.type))
            const _stripeVerified = await AsyncStorage.getItem('stripeVerified', parseRes.stripeVerified)
            // temporarily checking if it works, change from true later
            console.log('From AuthContext token: ', _token, 'userType: ', _type)
        } catch (err) {
            console.log('credentialsContext ',err)
        }
    };

    initState();
    console.log('STATE FROM AUTHCONTEXT after update: ', state);
  }, []);

  return (
    <CredentialsContext.Provider value={{...state, ...actions }}>
      {children}
    </CredentialsContext.Provider>
  );
};

export { CredentialsContext, CredentialsProvider };
