import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import{ActivityIndicator} from 'react-native-paper'
import logo from '../../Logos/LogoTranslucentNoCaption.png'
import Redirect from '../../components/Registration/Redirect.js';
import {URL} from '../../utils/exports';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Feather} from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { AuthContext, useAuthorization } from '../../context/AuthContext';

const ConfirmAccount = ({navigation, route}) => {
  const [sent, setSent] = useState(false);
  const [sentLoading, setSentLoading] = useState(false)
  const [errored, setErrored] = useState(false);
  const [refreshLoading, setRefreshLoading] = useState(false)
  const { confirmAccount } = useAuthorization();

  const resend = async()=>{
    try {
      setSentLoading(true)
      setErrored(false)
      const id = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token')
      const bearerToken='Bearer '+ token;
      const response = await fetch(
        `${URL}/logister/resendConfirmation`,
        {
          method: "POST",
          headers: {
            "Authorization": bearerToken,
            "Content-type": "application/json"
          },
          body: JSON.stringify({
          id: id
          })
        }
      );
      console.log(response);
      if(response.status==200){
        setSent(true);
      }else {
        setErrored(true)
      }
      setSentLoading(false)
    } catch (e) {
      setErrored(true)
      setSentLoading(false)
    }
  }
  const refresh = async()=>{
    try{
      setRefreshLoading(true);
      setErrored(false)
      const id = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token')
      const bearerToken='Bearer '+ token;
      const response = await fetch(
        `${URL}/users/type/${id}`,
        {
          method: "GET",
          headers: {
            "Authorization": bearerToken,
            "Content-type": "application/json"
          },
        }
      );
      if(response.status==500){
        setErrored(true)
      }
      else{
        const parseRes = await response.json()
        const newType = parseRes.user_type_id;
        confirmAccount(newType);
        await AsyncStorage.setItem('userType', String(newType) );
        setRefreshLoading(false)
      }
      } catch (e) {
        console.log(e);
      setErrored(true)
      setRefreshLoading(false)
      }
  }

  return(
  <View style={styles.container}>
  <StatusBar/>
    <Image source={logo} style={styles.img}/>
    <View style={styles.Verify}>
      <View >
        <Feather name="mail" size={48} color="black"/>
      </View>
      <Text style={styles.title}>
        Verify your email to begin using JOAT
      </Text>
        {
        (
          <>
          {
            sent ?
            <Text style={styles.text}>
            Please check your email to verify your account
            </Text>
            :   <Text style={styles.text}>
            An email has been sent to your inbox
              </Text>
          }
          {
            refreshLoading ?
            <View style={styles.loading}>
              <ActivityIndicator size={60} color='#6DB3C8'/>
            </View>:
            <Pressable style={[styles.button, {
              marginBottom:0
            }]} onPress={()=>{refresh()}}>
            <Text style={styles.buttonText}>Refresh</Text>
            </Pressable>
          }
        </>
      )
        }
        {
          sentLoading ?
          <View style={styles.loading}>
            <ActivityIndicator size={60} color='#6DB3C8'/>
          </View>:
          <Pressable style={styles.button} onPress={()=>{resend()}}>
            <Text style={styles.buttonText}>Resend Email</Text>
          </Pressable>
        }
        {
          errored &&
          <Text style={{alignSelf:'center', marginTop:'5%', color:'red', fontSize:18}}>
            Oops something went wrong. Please try again
          </Text>
        }


    </View>

  </View>)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6DB3C8'
  },
  loading: {
    marginVertical: '5%'
  },
  img: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'transparent',
    opacity: .15,
    height: 250,
    top: 20
  },
  Verify: {
    width: '90%',
    padding: 10,
    backgroundColor: '#EDF9FD',
    borderRadius: 25,
    marginTop: "50%",
    alignItems:'center'
  },
  title: {
    fontWeight: "600",
    fontSize: 36,
    color: '#102542',
    alignSelf: 'center',
    marginBottom: 30
  },
  button: {
    width: '70%',
    padding: 20,
    marginVertical:"5%",
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 40,
    backgroundColor: '#6DB3C8',

  },
  buttonText: {
    alignSelf:'center',
    fontSize: 20,
    fontWeight: '500',
    color:'white'
  },
  text: {
    color: '#000',
    fontSize: 26,
    fontFamily: 'Arial',
    alignSelf: 'flex-start',
    marginHorizontal: "5%",
    fontWeight: '400'
  },
  icon: {
    alignSelf:'center',
    alignItems:'center'
  }
})
export default ConfirmAccount;
