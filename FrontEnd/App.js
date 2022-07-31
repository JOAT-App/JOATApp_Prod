import React, { useState, useEffect, useContext }  from 'react';
import { StyleSheet, LogBox } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import {StripeProvider} from '@stripe/stripe-react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Location from 'expo-location';
import {STRIPE_KEY} from './utils/exports.js'
import * as Font from 'expo-font'
import MaterialIcons from '@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialIcons.ttf'
import MaterialIcons1 from '@expo/vector-icons/build/vendor/react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf'
import AppLoading from'expo-app-loading'
import {getValueForKey} from './utils/SecureStore'
import { Router } from './routes/Router.js';
import { AuthStack } from './routes/AuthStack.js';
import {AuthProvider} from './context/AuthContext'
//DEV LINES, COmment out on release
LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);


export default function App() {
  const [loading, setLoading] = useState(true)

  const loadFont = async() => {
    await Font.loadAsync({
      'Material Icons': MaterialIcons,
      'Material Design Icons': MaterialIcons1
    })
    setLoading(false)
  }
  useEffect(()=>{
    loadFont();
  })

  return  loading ? (<AppLoading/>):
  (
    <StripeProvider publishableKey={STRIPE_KEY}>
      <PaperProvider>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </PaperProvider>
    </StripeProvider>
  );
}
