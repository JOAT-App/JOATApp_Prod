import React, { useState, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Pressable,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import logo from '../../Logos/LogoTranslucentNoCaption.png'
import * as Linking from 'expo-linking';
import {LoadingScreen} from '../../components/index.js'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL} from '../../utils/exports';

const StripeOnboarding = ({route, navigation}) =>{
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState('')

  const _handlePressButtonAsync = async () => {
    let result = await WebBrowser.openBrowserAsync(url);
    setResult(result);
  };

  const afterLoad = async()=>{
    try {
      const userId = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token')
      const bearerToken='Bearer '+ token;

      const stripe = await fetch(
        `${URL}/logister/stripe-onboarding/${userId}`,
        {
          method: "GET",
          headers: {
            "Authorization": bearerToken,
            "Content-type": "application/json"
          },
        }
      );
      const stripeResp = await stripe.json();
      console.log(stripeResp);
      setUrl(stripeResp.url)
      setLoading(false);
    } catch (e) {
      console.log(e);
    }

  }

  const returnHomePress = async()=>{
    setLoading(true);
    const userId = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('token')
    const bearerToken='Bearer '+ token;
    const stripe = await fetch(
      `${URL}/logister/stripe/verified/${userId}`,
      {
        method: "GET",
        headers: {
          "Authorization": bearerToken,
          "Content-type": "application/json"
        },
      }
    );
    const parseRes = await stripe.json();
    console.log(parseRes.stripeVerified.toString());
    await AsyncStorage.setItem('stripeVerified', parseRes.stripeVerified.toString())
    console.log("here");
    setLoading(false);
    navigation.push('worker')
  }

  useEffect(()=>{
    afterLoad();
  }, [])
  return loading ? (<LoadingScreen/>) : (
    <View style={styles.container}>
    <StatusBar/>
    <Image source={logo} style={styles.img}/>
    <View style={styles.signIn}>
      <Text style={styles.title}>
        Begin Onboarding with Stripe
      </Text>
      <View>
        <Text style={styles.text}>
          Continue your onboarding with stripe so you can get paid!
        </Text>
      </View>
      <View style={styles.buttonView}>
      <Pressable style={[styles.btn, {marginBottom:'5%'}]}
        onPress={_handlePressButtonAsync}
        >
        <Text
          style={{
            fontSize:22,
            fontWeight: "600",
            color: 'white'

          }}>
          Begin Stripe Onboarding
        </Text>
      </Pressable>
      <Pressable style={styles.btn}
        onPress={()=> returnHomePress()}
        >
        <Text
          style={{
            fontSize:22,
            fontWeight: "600",
            color: 'white'

          }}>
          Return Home
        </Text>
      </Pressable>
    </View>
      <View style={{alignItems:'center'}}>
      </View>
    </View>
  </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6DB3C8'
  },
  img: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'transparent',
    opacity: .15,
    height: 250,
    top: 20
  },
  signIn: {
    width: '90%',
    padding: 10,
    backgroundColor: '#EDF9FD',
    borderRadius: 25,
    marginTop: 120
  },
  title: {
    fontWeight: "600",
    fontSize: 28,
    color: '#102542',
    alignSelf: 'center',
    marginBottom: 30
  },
  Form: {
    justifyContent: 'center'
  },
  buttonView: {
    marginTop:"10%"
  },
  textInput: {
    width: '85%',
    alignSelf: 'center',
    backgroundColor: 'transparent'
  },
  button: {
    width: '70%',
    padding: 5,
    alignSelf: 'center',
    overflow: 'hidden',
    borderRadius: 5
  },
  btn: {
    paddingVertical: '5%',
    width: '80%',
    alignSelf: 'center',
    alignItems: 'center',
    borderRadius: 25,
    backgroundColor: '#6DB3C8',
    color: '#fff',
  },
  forgotPassword: {
    display: 'flex',
    marginTop: 4,
    width: '100%'
  },
  textContainer: {
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'flex-start'
  },
  text: {
    fontSize: 20,
    fontFamily: 'Arial',
    alignSelf: 'flex-start'
  }
});
export default StripeOnboarding;
