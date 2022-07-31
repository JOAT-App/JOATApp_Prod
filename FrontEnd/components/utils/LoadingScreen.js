import React from 'react'
import {View} from 'react-native'
import {ActivityIndicator} from 'react-native-paper'
import { StatusBar } from 'expo-status-bar';

const LoadingScreen =()=>{
  return(
    <View style={{
      alignSelf: 'center',
      alignItems:'center',
      justifyContent: 'center',
      paddingVertical: '50%'
    }}>
      <StatusBar/>
      <ActivityIndicator color='#6DB3C8' size={150}/>
    </View>
  )
}

export default LoadingScreen;
