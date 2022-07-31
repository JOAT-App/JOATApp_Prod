import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Provider as PaperProvider, Button, DefaultTheme, Checkbox, TextInput, Title} from 'react-native-paper';
import GenericButton from '../../components/Buttons/GenericButton.js';
import Redirect from '../../components/Registration/Redirect.js';
import logo from '../../Logos/LogoTranslucentNoCaption.png'
import {URL} from '../../utils/exports';


const ForgotPassword = ({navigation}) => {
    const [ email, setEmail ] = useState('')
    const [ token, setToken ] = useState('')
    const [ passwordMatch, setPasswordMatch]= useState(true);
    const [long, setLong] = useState(true);
    const [disabled, setDisabled] = useState(true);
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [ error, setError ] = useState(false)
    const [ tokenError, setTokenError ] = useState(false)
    const [sent, setSent] = useState(false)
    const [phase, setPhase] = useState(0)
    const [id, setId] = useState(0);

    const updateDisabled= () =>{
      setDisabled(!passwordMatch || !long || !password.length || !confirmPassword.length)
    }

    const validatePassword = () =>{
      return password.length >= 6 && password.length <= 16
    }

    const onSubmitForm = async() => {
        const body = { email };
        // setSent(true);
        console.log("here");
        try {
            const response = await fetch(
                `${URL}/logister/password/forgot`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                body: JSON.stringify(body)
            }
            )
            const status = await response.status;
            if(status!=200){
              console.log(status);
              setError(true)
            }
            else{
              setPhase(1)
            }

        } catch (error) {
            console.error(error.message)
        }
    }
    const onSubmitToken = async() => {
        const body = { email, token };
        console.log(body);
        //setSent(true);
        try {
            const response = await fetch(
                `${URL}/logister/password/verifyToken`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                body: JSON.stringify(body)
            }
            )
            const status = await response.status;
            const resp = await response.json();
            console.log(resp);
            await setId(resp.id);
            console.log(id);
            if(status!=200){
              console.log(status);
              setTokenError(true)
            }
            else{
              setPhase(2)
            }

        } catch (error) {
            console.error(error.message)
        }
    }
    const onSubmitPassword = async() => {
        const body = { id, email, password, token };
        //setSent(true);
        try {
            const response = await fetch(
                `${URL}/logister/password/change`,
                {
                    method: "PUT",
                    headers: {
                        "Content-type": "application/json"
                    },
                body: JSON.stringify(body)
            }
            )
            const status = await response.status;
            const {user_id} = await response.json;
            setId(user_id);
            if(status!=200){
              console.log(status);
              alert("There was an issue changing your password. Please Try Again");
              navigation.push('login')
            }
            else{
              alert("Your password has successfully been changed. Pleae Login");
              navigation.push('login')
            }

        } catch (error) {
            console.error(error.message)
        }
    }
    switch (phase) {
      case 0:
        return(
      <PaperProvider theme={inputTheme}>
      <StatusBar/>
        <View style={styles.container}>
          <Image source={logo} style={styles.img} />
          { !sent ?
            (
              <View style={styles.signIn}>
              <Text style={styles.title}>Forgot Your Password? </Text>
              <Text style={styles.text}>No worries. Enter your username and email and we’ll send you instructions to reset your password.</Text>
              <View style={styles.email}>
              <TextInput
              secureTextEntry={false}
              style={styles.textInput}
              label="Email"
              value={email}
              onChangeText={text => setEmail(text.trim())}
              />
              {error &&
                <Text style={styles.errorText}>Please enter a valid Email Address</Text>
              }
              </View>
              <GenericButton
              text={'SUBMIT'}
              navigation={navigation}
              route={'registrationaddress'}
              nextStep={()=>onSubmitForm()}
              >
              </GenericButton>
              </View>
          ) :
            (
              <View style={styles.signIn}>
              <Text style={styles.title}>Forgot Your Password? </Text>
                <Text style={styles.text}>A password reset link has been sent to your email</Text>
                </View>
            )

          }
          <Redirect navigation={navigation} text={'SIGN IN'} title={'Remembered your password?'} route={'login'}/>
        </View>
      </PaperProvider>
    )
        break;
      case 1:
        return(
        <PaperProvider theme={inputTheme}>
          <View style={styles.container}>
            <Image source={logo} style={styles.img} />
                <View style={styles.signIn}>
                  <Text style={styles.title}>Forgot Your Password? </Text>
                  <Text style={styles.text}>A verification code has been sent to your email. Please enter it Below</Text>
                  <View style={styles.email}>
                    <TextInput
                    secureTextEntry={false}
                    style={styles.textInput}
                    label="Verification Code"
                    value={token}
                    onChangeText={text => setToken(text.trim())}
                    />
                    {tokenError &&
                      <Text style={styles.errorText}>Invalid Token or Expired Token</Text>
                    }
                  </View>
                  <GenericButton
                  text={'SUBMIT'}
                  navigation={navigation}
                  nextStep={()=>onSubmitToken()}
                  >
                  </GenericButton>
                </View>

            <Redirect navigation={navigation} text={'SIGN IN'} title={'Remembered your password?'} route={'login'}/>
          </View>
        </PaperProvider>
      )

        break;
      case 2:
        return(
          <PaperProvider theme={inputTheme}>
                <View style={styles.container}>
                  <Image source={logo} style={styles.img} />
                      <View style={styles.signIn}>
                      <Text style={styles.title}>Forgot Your Password? </Text>
                      <Text style={styles.text}>A verification code has been sent to your email. Please enter it Below</Text>
                    <View style={styles.password}>
                      <TextInput
                        style={styles.passwordInput}
                        label="Password"
                        value={password}
                        onChangeText={ (text) =>{
                            setPassword(text);
                          }
                        }
                        onEndEditing= {()=>{
                          confirmPassword === password ? setPasswordMatch(true) : setPasswordMatch(false);
                          setLong(validatePassword());
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
                      style={styles.passwordInput}
                      label="Confirm Password"
                      value={confirmPassword}
                      onChangeText={text => {
                        setConfirmPassword(text);
                        }
                      }
                      onEndEditing= {()=>{
                        confirmPassword === password ? setPasswordMatch(true) : setPasswordMatch(false);
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
                  text={'SUBMIT'}
                  navigation={navigation}
                  nextStep={()=>onSubmitPassword()}
                  >
                  </GenericButton>
              </View>

              <Redirect navigation={navigation} text={'SIGN IN'} title={'Remembered your password?'} route={'login'}/>
            </View>
            </PaperProvider>
        )
      default:

    }
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
  password: {
    marginBottom: '4%'
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
    padding: 12,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    backgroundColor: '#EDF9FD',
    borderRadius: 25,
    marginTop: 80 //offset the signin box
  },
  title: {
    fontWeight: "600",
    fontSize: 32,
    color: '#102542',
    alignSelf: 'center',
    marginBottom: 20
  },
  text: {
  },
  textInput: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  passwordInput: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  email: {
    marginBottom: 160
  },
  errorText:{
    fontSize: 12,
    alignSelf: 'center',
    color: 'red'
  },
})

export default ForgotPassword;
