import React, {useState, useEffect, useContext} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image, Keyboard, TouchableWithoutFeedback, Pressable } from 'react-native';
import { Provider as PaperProvider,Button, DefaultTheme,Checkbox, TextInput, Headline, ActivityIndicator} from 'react-native-paper';
import logo from '../../Logos/LogoTranslucentNoCaption.png'
import Redirect from '../../components/Registration/Redirect.js';
import {URL, STREAM_API_KEY} from '../../utils/exports';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoginButton from '../../components/Buttons/LoginButton';
import { saveKey } from '../../utils/SecureStore';
import { AuthContext, useAuthorization } from '../../context/AuthContext';
import {fetchuserToken, setClient} from '../../utils/streamChat.js'

const Login=({ navigation, route }) => {
  const {status, authToken, signIn} = useAuthorization()
  /**
   * owermerling2@sciencedaily.com
   * wriolfi0@guardian.co.uk
   * password
   */
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ submitted, setSubmitted ] = useState(false)
  const [ loading, setLoading ] = useState(false)
  const [ errored, setErrored ] = useState(false)
  const [ emailPlaceholder, setEmailPlaceholder ] = useState('Email')
  const [ passwordPlaceholder, setPasswordPlaceholder ] = useState('Password')

  // const {setAuth, setType} = route.params;

  // stream-chat client

  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        `${URL}/logister/login`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      console.log('Login.js onSubmitForm(e) ', body)
      const parseRes = await response.json();
      //const id = parseRes.id;
      console.log('after onSubmitForm(e) --> parseRes Log: ', parseRes)
      if (parseRes.token && parseRes.id && parseRes.fname) {
        await AsyncStorage.setItem("token", parseRes.token);
        await AsyncStorage.setItem('id', String(parseRes.id))
        await AsyncStorage.setItem('fname', parseRes.fname)
        await AsyncStorage.setItem('lname', parseRes.lname)
        await AsyncStorage.setItem('image_url', parseRes.image_url)
        await AsyncStorage.setItem('userType', String(parseRes.type))
        if(parseRes.stripeVerified){
          console.log(parseRes.stripeVerified);
          await AsyncStorage.setItem('stripeVerified', parseRes.stripeVerified.toString())
        }
        saveKey('token', parseRes.token)

        //stream-chat-call
        await setClient(id=parseRes.id, fname=parseRes.fname, lname=parseRes.lname, image_url=parseRes.image_url)
        signIn(token=parseRes.token, type=parseRes.type)

      } else {
        setErrored(true)
        setLoading(false)
      }
    } catch (err) {
      console.error(err.message);
    }
  };


  return(
    <PaperProvider theme={inputTheme}>
    <StatusBar/>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Image source={logo} style={styles.img} />
        <View style={styles.signIn}>
            <Text style={styles.title}> SIGN IN </Text>
            <View style={styles.top}>
              <TextInput
                secureTextEntry={false}
                style={styles.textInput}
                placeholder={emailPlaceholder}
                value={email}
                onChangeText={text => setEmail(text)}
                textContentType='emailAddress'
                keyboardType='email-address'
                underlineColor='transparent'
                onFocus={() => setEmailPlaceholder('')}
                theme={{
                  colors: {
                             placeholder: '#102542', text: 'black', primary: 'grey',
                     }
                }}
              />
            </View>
            <View style={styles.bottom}>
              <TextInput
                  style={styles.textInput}
                  placeholder={passwordPlaceholder}
                  value={password}
                  onChangeText={text => setPassword(text)}
                  secureTextEntry={true}
                  textContentType='password'
                  underlineColor='transparent'
                  onFocus={() => setPasswordPlaceholder('')}
                  theme={{
                    colors: {
                              placeholder: '#102542', text: 'black', primary: 'grey',
                      }
                  }}
                />
            </View>
            <View style={styles.forgotPassword}>
                  <Text style={styles.errorText}>
                    { errored && <>Invalid Email or Password</> }
                  </Text>

              <Pressable style={styles.forgotPasswordPressable} onPress={() => navigation.push('forgotpassword')}>
                <Text style={styles.forgotPasswordText}>forgot password?</Text>
              </Pressable>
            </View>
            { loading ? (<View style={{height: 50, paddingTop:10, marginBottom: 15}}><ActivityIndicator/></View>) :
              (<LoginButton
                text={'SIGN IN'}
                submit={onSubmitForm}
                setLoading={setLoading}>
              </LoginButton>)
            }
        </View>
        <Redirect navigation={navigation} text={'CREATE AN ACCOUNT'} title={'Don\'t have an account already?'} route={'userform'}/>

      </View>
      </TouchableWithoutFeedback>

    </PaperProvider>
  )
}


const inputTheme={
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    accent: '#39B5FA',
    primary: '#39B5FA'
  }
}
const styles=StyleSheet.create({
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
    top: 20,
  },
  signIn: {
    width: '90%',
    padding: 10,
    backgroundColor: '#EDF9FD',
    borderRadius: 25,
    marginTop:90,
  },
  top: {
    marginTop: 10,
    marginBottom: 50,
    // borderColor: 'rgba(0,0,0,.6)',
    // borderWidth: 1.3,
    width: '90%',
    alignSelf: 'center'
  },
  bottom: {
    // borderColor: 'rgba(0,0,0,.6)',
    // borderWidth: 1.3,
    width: '90%',
    alignSelf: 'center'
  },
  title: {
    fontWeight: "600",
    fontSize: 36,
    color: '#102542',
    alignSelf: 'center',
    marginBottom: 30
  },
  Form: {
    justifyContent: 'center'
  },
  errorText:{
    fontSize: 16,
    color: 'red',
  },
  textInput: {
    height: 26,
    width: '100%',
    paddingTop: 10,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderBottomColor: 'rgba(0,0,0,.6)',
    borderBottomWidth: 1.3,
    fontSize: 18
  },
  button:{
    width: '70%',
    padding: 5,
    alignSelf: 'center',
    overflow:'hidden',
    borderRadius: 5,
  },
  btn: {
    paddingTop: 7,
    paddingBottom: 7,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 25,
    fontWeight: "500",
    backgroundColor: '#102542',
    color: '#fff',
    marginTop: 80,
    marginBottom: 20,
  },
  forgotPassword: {
    display: 'flex',
    marginTop: 8,
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
  },
  forgotPasswordPressable: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
    marginBottom: 65,
  },
  forgotPasswordText: {
    display: 'flex',
    color: '#757575',
    fontWeight: '400',
    fontSize: 16,
    marginRight: -10,

  },
  textContainer: {
    marginTop: 30,
    marginBottom: 20,
    justifyContent: 'flex-start'
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontFamily: 'Arial',
    alignSelf: 'flex-start'
  }
})
export default Login;
