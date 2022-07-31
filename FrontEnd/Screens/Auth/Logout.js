import React, {useEffect, useContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';
import {LoadingScreen} from '../../components/index.js'
import { StreamChat } from 'stream-chat'
import {STREAM_API_KEY} from '../../utils/exports';
import { AuthContext } from '../../context/AuthContext.js';
const chatClient = StreamChat.getInstance(STREAM_API_KEY);



const Logout=({ navigation, route }) => {
  const { signOut } = useContext(AuthContext)

  const eraseData = async () => {
    const keys = await AsyncStorage.getAllKeys();
    await AsyncStorage.multiRemove(keys);
    await chatClient.disconnectUser();
  }

  useEffect(()=>{
    eraseData();
    setTimeout(() => {signOut();}, 1200);
  })
  return(
    <LoadingScreen/>
  )
}
export default Logout;
