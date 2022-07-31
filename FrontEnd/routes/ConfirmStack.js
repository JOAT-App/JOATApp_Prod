import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
    ConfirmAccount,
    Logout
  } from '../Screens/index.js';

const Stack = createNativeStackNavigator();

export const ConfirmStack = () => {
  return (
    <Stack.Navigator initalRouteName="confirmaccount" screenOptions={{headerShown: false}}>
        <Stack.Screen name="confirmaccount" component={ConfirmAccount} />
    </Stack.Navigator>
  );
};
