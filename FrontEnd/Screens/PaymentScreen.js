import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Alert,
  Pressable,
  Image
} from 'react-native';
import {Footer, LoadingScreen} from '../components/index.js'
import { StatusBar } from 'expo-status-bar';
import logo from '../Logos/LogoTranslucentNoCaption.png'
import StripeLogo from '../Logos/Stripe/StripeLogo.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL} from '../utils/exports';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {CardField, CardFieldInput, useStripe} from '@stripe/stripe-react-native';

const PaymentScreen = ({route, navigation}) => {
  const {jobID, workerID} = route.params;
  const {initPaymentSheet, presentPaymentSheet} = useStripe();
  const [loading, setLoading] = useState(true);
  const [workerName, setWorkerName] = useState('');
  const [cost, setCost] = useState('');
  const [title, setTitle] = useState('')
  const data = {
    jobID,
    workerID
  }

  const fetchPaymentSheetParams = async () => {
    const token = await AsyncStorage.getItem('token')
    const bearerToken = 'Bearer ' + token;
    const response = await fetch(`${URL}/payments/checkout`, {
      method: 'POST',
      headers: {
        "Authorization": bearerToken,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const {
      paymentIntent,
      ephemeralKey,
      customer,
      cost,
      title,
      workerFirst,
      workerLast
    } = await response.json();
    setCost(cost);
    setTitle(title);
    setWorkerName(workerFirst + " " + workerLast);
    return {paymentIntent, ephemeralKey, customer};
  };

  const initializePaymentSheet = async () => {
    const {paymentIntent, ephemeralKey, customer, publishableKey} = await fetchPaymentSheetParams();

    const {error} = await initPaymentSheet({
      customerId: customer, customerEphemeralKeySecret: ephemeralKey, paymentIntentClientSecret: paymentIntent,
      // Set `allowsDelayedPaymentMethods` to true if your business can handle payment
      //methods that complete payment after a delay, like SEPA Debit and Sofort.
      allowsDelayedPaymentMethods: true
    });
    if (!error) {
      setLoading(false);
    }
  };
  const openPaymentSheet = async () => {
    const {error} = await presentPaymentSheet();

    if (error) {
      if(error.code!='Canceled'){
        alert(`An error occurred, please try again`);
      }
    } else {
      const token = await AsyncStorage.getItem('token')
      const bearerToken = 'Bearer ' + token;
      const response = await fetch(`${URL}/jobs/hireapplicant`, {
        method: 'POST',
        headers: {
          "Authorization": bearerToken,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({jobID: jobID, workerID: workerID})
      });
      if(response){
        console.log(response);
        navigation.replace('homeowner')
      }
    }
  };

  useEffect(() => {
    initializePaymentSheet();
  }, []);

  return loading
    ? (
    <LoadingScreen/>
  )
    : (
      <View style={styles.container}>
      <StatusBar/>
      <Image source={logo} style={styles.img}/>
      <Pressable style={{
        position: 'absolute',
        top: 20,
        left: 20
      }}
      onPress={() => navigation.goBack()}
      >
        <MaterialCommunityIcons name="chevron-left" size={48} color="#0F2441"/>
      </Pressable>
      <View style={styles.signIn}>
        <Text style={styles.title}>
          Confirm Payment of ${cost}
        </Text>
        <View></View>
        <View>
          <Text style={styles.text}>
            You are paying ${cost} for {workerName} to complete your job of {title}. We'll hold onto the money until the work is done
          </Text>
        </View>
        <Pressable style={styles.btn}
          onPress={() => {
            openPaymentSheet();
          }}
          >
          <Text
            style={{
              fontSize:22,
              fontWeight: "600",
              color: 'white'

            }}>
            Confirm Payment
          </Text>
        </Pressable>
        <View style={{alignItems:'center'}}>
        <StripeLogo width={150} height={40}/>
        </View>
      </View>

    </View>);
};

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
    marginTop: 80,
    marginBottom: 20
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
})

export default PaymentScreen;
