import React, {useState, useContext, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { StreamChat } from 'stream-chat'
import { HomeOwnerStack } from './HomeOwnerStack';
import { WorkerStack } from './WorkerStack';
import { ConfirmStack } from './ConfirmStack';
import { DevStack } from './DevStack';
import { AuthStack } from './AuthStack';
import { AuthContext, useAuthorization } from '../context/AuthContext';
import {setClient } from '../utils/streamChat';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const Router = ({}) => {
  const { status, userType } = useAuthorization()
  const [ loading, setLoading ] = useState(false)

  const initStream = async()=>{
    const id = await AsyncStorage.getItem('id')
    const fname = await AsyncStorage.getItem('fname')
    const lname = await AsyncStorage.getItem('lname')
    const image_url = await AsyncStorage.getItem('image_url')
    await setClient(id, fname, lname, image_url)
  }


  useEffect(()=>{
    if(userType && (userType>2)){
      initStream();
    }
  }, [userType])

  function renderStack(status, userType) {
    console.log('\nRouter - renderStack called')
    switch(parseInt(userType)) {
        case 1:
            return <ConfirmStack/>
        case 2:
            return <ConfirmStack/>
        case 3:
          {console.log('\nRouter - WorkerStack : Case 2 \n')}
          return <WorkerStack/>
        case 4:
          {console.log('\nRouter - WorkerStack : Case 3 \n')}
          return <HomeOwnerStack/>
        case 5:
          {console.log('\nRouter - DevStack : Case 5\n')}
          return <DevStack/>
        default:
          {console.log('\nRouter - AuthStack : Case default \n')}
          return <AuthStack />
    }
}

console.log('from router:', status, userType)

  if (loading) {
      console.log('loading? triggered?')
      return <></>;
  }
  return (
      <NavigationContainer>
          {renderStack(status, userType)}
      </NavigationContainer>
  );
};
