import React,{ useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableWithoutFeedback, Keyboard } from 'react-native';
import {  DefaultTheme, TextInput} from 'react-native-paper';
import GenericButton from '../../../components/Buttons/GenericButton.js';


const RegistrationPassword = ({navigation, password, setPassword, confirmPassword, setConfirmPassword, nextStep }) =>{
  const [ passwordMatch, setPasswordMatch]= useState(true);
  const [long, setLong] = useState(true);
  const [disabled, setDisabled] = useState(true);

  const updateDisabled= () =>{
    setDisabled(!validatePassword())
  }

  const validatePassword = () =>{
    return password.length >= 6 && password.length <= 16 && passwordMatch
  }
  return(
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}> SIGN UP </Text>
          <View>
              <TextInput
                style={styles.textInput}
                label="Password"
                value={password}
                onChangeText={ (text) =>{
                    setPassword(text);
                  }
                }
                onEndEditing= {()=>{
                  confirmPassword === password ? setPasswordMatch(true) : setPasswordMatch(false);
                  setLong(password.length >= 6 && password.length <= 16);
                  console.log(long);
                  updateDisabled();
                  }
                }
                secureTextEntry={true}
              />
          </View>
          {!long &&
            <Text style={styles.errorText}>
              Password must be between 6 and 16 characters
            </Text>
          }
          <View style={styles.password}>
            <TextInput
              style={styles.textInput}
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={text => {
                setConfirmPassword(text);
                text === password ? setPasswordMatch(true) : setPasswordMatch(false);
                }
              }
              onEndEditing= {()=>{
                setDisabled(!(password.length >= 6 && password.length <= 16 && confirmPassword === password) )
                updateDisabled();
                }
              }
              secureTextEntry={true}
            />
            {!passwordMatch &&
              <Text style={styles.errorText}>
                Passwords do not match.
              </Text>
            }
          </View>

          <GenericButton
            text={'CONTINUE'}
            navigation={navigation}
            nextStep={nextStep}
            disabled={disabled}
          >
          </GenericButton>
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
  errorText:{
    fontSize: 12,
    alignSelf: 'center',
    color: 'red'
  },
  title: {
    fontWeight: "600",
    fontSize: 36,
    color: '#102542',
    alignSelf: 'center',
    marginBottom: 40
  },
  textInput: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  password: {
    marginBottom: 80
  }
})

export default RegistrationPassword;
