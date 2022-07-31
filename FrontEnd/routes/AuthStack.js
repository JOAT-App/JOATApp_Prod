import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
    Home,
    PrivacyPolicy,
    Terms,
    UserForm,
    ForgotPassword,
    Login
  } from '../Screens/index.js';

const Stack = createNativeStackNavigator();

export const AuthStack = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="home" component={Home} options={{animation: 'none', gestureEnabled: false}}/>
        <Stack.Screen name="privacypolicy" component={PrivacyPolicy}/>
        <Stack.Screen name="termsandconditions" component={Terms}/>
        <Stack.Screen name="userform" component={UserForm} options={{animation: 'none', gestureEnabled: false}}/>
        <Stack.Screen name="login" component={Login} options={{animation: 'none', gestureEnabled: false}}/>
        <Stack.Screen name="forgotpassword" component={ForgotPassword}/>
    </Stack.Navigator>
  );
};

/*
        <Stack.Screen name="login"
            component={Login}
            initialParams= {{isAuthenticated: isAuthenticated, setAuth: setIsAuthenticated, setType: setType}}
        />
*/
