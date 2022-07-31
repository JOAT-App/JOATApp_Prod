import React,{ useState, useEffect} from 'react'
import { StyleSheet, Text, View, KeyboardAvoidingView, Linking,  ImageBackground, Button, Keyboard, TouchableWithoutFeedback, Pressable} from 'react-native';
import {TextInput} from 'react-native-paper';
import { Footer, LoadingScreen } from '../components/index.js'
import image from '../assets/background2.png'
import {URL} from '../utils/exports.js';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const ContactUs = ({ navigation}) => {
  const [email, setEmail] = useState('')
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [send, setSent] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [disabled, setDisabled] = useState(true);


  const checkEmail = ()=>{
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   return emailPattern.test(email);
  }

  const updateDisabled= () =>{
    setDisabled(!validEmail || !email.length);
  }

  const onSubmit = async e => {
    try {
      setLoading(true)
      setDisabled(true)
          const body = {email, subject, message}
          const token = await AsyncStorage.getItem('token')
          const bearerToken='Bearer '+ token;
          const response = await fetch(
            `${URL}/contactUs`,
            {
              method: "POST",
              headers: {
                "Authorization": bearerToken,
                "Content-type": "application/json"
              },
              body: JSON.stringify(body)
            }
          );
          if (response.status === 200) {
            alert("Your message was sent. We'll get back to you as soon as possible")
            setTimeout(previousPage, 1000)
            setSent(true)
          }
      } catch (error) {
        console.error('ContactUs.js', error)
      }
  }

  const previousPage = () => {
    navigation.goBack()
  }

  useEffect( () => {

  },[])

  if ( loading) return (
  <LoadingScreen/>
  )
  else {
    return(
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <>
      <StatusBar/>
      <View style={styles.container} >
          <ImageBackground source={image} resizeMode="cover" style={styles.containerHeader}>
            <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
              <MaterialCommunityIcons name="chevron-left" size={48} color="#0F2441" />
            </Pressable>
            <Text style={styles.greeting}>We'd Love to hear from you. </Text>
          </ImageBackground>
          <KeyboardAvoidingView
             behavior={Platform.OS === "ios" ? "padding" : "height"}
             style={styles.innerScroll}
           >
            <View style={styles.form}>
              <TextInput
                secureTextEntry={false}
                mode='outlined'
                style={styles.textInput}
                activeOutlineColor='#6DB3C8'
                label="Email"
                value={email}
                onChangeText={(text)=>{setEmail(text.trim())}}
                onBlur={()=>{
                  setEmail(email.trim())
                  setValidEmail(checkEmail())
                  updateDisabled();
                }}
              />
              {!validEmail &&
                <Text style={styles.errorText}>Please enter a valid Email Address</Text>
              }
              <TextInput
              secureTextEntry={false}
              activeOutlineColor='#6DB3C8'
              mode='outlined'
              style={styles.textInput}
              label="Subject"
              value={subject}
              onChangeText={(text)=>{setSubject(text)}}
              />
              <TextInput
              secureTextEntry={false}
              activeOutlineColor='#6DB3C8'
              mode='outlined'
              style={styles.textInput1}
              multiline={true}
              label="Message"
              value={message}
              onChangeText={(text)=>{setMessage(text)}}
              />
                <Text style={styles.contactText}>
                Or contact Us Directly at
                <Pressable
                onPress={() => Linking.openURL('mailto:admin@joatapp.com') }>
                  <Text style={styles.linkText}>admin@joatapp.com</Text>
                </Pressable>
                </Text>
                <Text style={styles.contactText}>
                1221 College Park Dr Suite 116,
                </Text>
                <Text style={styles.contactText}>
                Dover, Delaware 19904{"\n"}
                </Text>
              <Pressable
              style={styles.button}
              onPress={() => {
                  onSubmit()}}
              disabled={disabled}
              >
                  <Text style={styles.buttonText}>
                    Submit
                  </Text>
              </Pressable>
              </View>
              </KeyboardAvoidingView>
      <Footer navigation={navigation} route={'ContactUs'}></Footer>
      </View>
      </>
      </TouchableWithoutFeedback>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    linkText:{
      alignSelf:"flex-end",
      justifyContent: 'center',
      color:'blue',
      marginLeft:'2%',
      marginBottom: '-1%'

    },
    contactText:{
      alignSelf:'center',
      justifyContent: 'center'
    },
    scroll: {
      flex: 1,
      backgroundColor: '#F8F8F9',
      marginTop: '-17.5%',
    },
    containerHeader:{
      height: 200,
      backgroundColor: 'transparent',
      zIndex: 0,
      flexDirection:  'row'
    },
    form:{
      marginTop:'6%'
    },
    innerScroll: {
      flex: 1,
      borderTopRightRadius: 73,
      borderTopLeftRadius: 73,
      backgroundColor: '#F8F8F9',
      marginTop: "-13%"
    },
    greeting: {
      paddingTop: '5%',
      paddingLeft: 20,
      fontSize: 50,
      fontWeight: "600",
    },
    containerStyle: {
      backgroundColor: '#FFFFFF',
      // borderRadius: 75,
      borderWidth: 1,
      borderColor: '#FFFFFF'
    },
    inputContainerStyle: {
      backgroundColor: '#FFFFFF'
    },
    containerTitle: {
      marginTop: "1%",
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 30,
      marginBottom: 5

    },
    loading: {
      alignSelf: 'center',
    },
    textInput: {
      width: '90%',
      alignSelf: 'center',
      backgroundColor: 'transparent',
      marginVertical: '1%',
    },
    textInput1: {
      width: '90%',
      height: 150,
      alignSelf: 'center',
      backgroundColor: 'transparent',
      marginVertical: '1%',
    },
    button: {
      borderRadius: 8,
      padding: 6,
      height: 60,
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 5,
      alignSelf: 'center',
      borderRadius: 60,
      backgroundColor: 'green'
    },
    buttonText: {
      fontSize: 20,
      color: 'white',
      fontWeight: "400"
    },
    loading: {
      paddingTop: 9
    },
    errorText:{
      fontSize: 12,
      alignSelf: 'center',
      color: 'red'
    },
    btn: {
      marginTop: '5%',
      marginRight: -20
    },
  });

export default ContactUs
