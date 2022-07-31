import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import {DismissKeyboard} from '../../../components/index.js'
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Provider as PaperProvider, Button, DefaultTheme, Checkbox, TextInput, Title, ActivityIndicator} from 'react-native-paper';
import GenericButton from '../../../components/Buttons/GenericButton.js';
import Redirect from '../../../components/Registration/Redirect.js';
import logo from '../../../Logos/LogoTranslucentNoCaption.png'
import {URL} from '../../../utils/exports'
// import PhoneInput from "react-native-phone-number-input";


const RegistrationEmail = ({navigation, email, setEmail, phone, setPhone, nextStep}) =>{
  const [validEmail, setValidEmail] = useState(true);
  const [validPhone, setValidPhone] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [submitted, setSubmitted] = useState(false)
  const [localPhone, setLocalPhone] = useState(phone.length ? phone.slice(0,3)+'-'+phone.slice(3,6)+'-'+phone.slice(6) : '');
  const [lastDeleted, setLastDeleted] = useState('')
  const [errored, setErrored] = useState(false)
  const checkEmail = ()=>{
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
   return emailPattern.test(email);
  }
  const checkPhone = ()=>{
    return localPhone.length == 12
  }
  const updateDisabled= () =>{
    setDisabled(!phone.length || !validPhone || !validEmail || !email.length);
  }
  const checkIfEmailExists = async ()=>{
    setSubmitted(true)
    try {
      const body = { email };
      const response = await fetch(
        `${URL}/logister/email/check`,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(body)
        }
      );
      if(response.status==200){
        nextStep()
      }else{
        setErrored(true)
        setSubmitted(false)
      }
    }catch(e){
      console.error(e);
      alert("An error occurred, please try again")
      navigation.push('userform')
    }
  }

    return(
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
              <Text style={styles.title}> JUST A FEW MORE THINGS </Text>
                <View>
                  <TextInput
                    secureTextEntry={false}
                    style={styles.textInput}
                    label="Email"
                    value={email}
                    onChangeText={text => setEmail(text.trim())}
                    onBlur={()=>{
                      setValidEmail(checkEmail())
                      updateDisabled();
                    }}
                  />
                  {!validEmail &&
                    <Text style={styles.errorText}>Please enter a valid Email Address</Text>
                  }
                  {errored &&
                      <Text style={styles.errorText}>A user with that email already exists</Text>
                  }
                </View>
                <View style ={styles.phone}>
                  <TextInput
                    secureTextEntry={false}
                    style={styles.textInput}
                    label="Phone"
                    value={localPhone}
                    keyboardType={'phone-pad'}
                    maxLength={12}
                    onChangeText={
                      text => {
                        if((text.length==3 || text.length==7) &&  phone[phone.length-1] !='-' ){
                          text+='-'
                        }
                        setLocalPhone(text)
                        setPhone(text);
                      }
                    }
                    onBlur={()=>{
                      setPhone(phone.replace(/-|\s/g,""))
                      setValidPhone(checkPhone())
                      updateDisabled();
                    }}
                  />
                  {!validPhone &&
                    <Text style={styles.errorText}>Please enter a valid Phone Number</Text>
                  }
                </View>
                {submitted ? (<ActivityIndicator/>) :
                  (<GenericButton
                  text={'CONTINUE'}
                  navigation={navigation}
                  nextStep={checkIfEmailExists}
                  disabled={disabled}
                  />)
                }
          </View>
          </TouchableWithoutFeedback>
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
    width: '90%',
    padding: 10,
    backgroundColor: '#EDF9FD',
    borderRadius: 25,
    marginTop: 80 //offset the signin box
  },
  title: {
    fontWeight: "600",
    fontSize: 36,
    color: '#102542',
    alignSelf: 'center',
    marginBottom: 40
  },
  errorText:{
    fontSize: 12,
    alignSelf: 'center',
    color: 'red'
  },
  textInput: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  phone: {
    marginBottom: 80
  },
})

export default RegistrationEmail;
