import React,{ useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';
import { Provider as PaperProvider, DefaultTheme, TextInput} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Redirect from '../../components/Registration/Redirect.js';
import logo from '../../Logos/LogoTranslucentNoCaption.png'
import {
  RegistrationName,
  RegistrationEmail,
  RegistrationPassword,
  RegistrationAddress,
  RegistrationInfo
} from './components/index.js'
import { StatusBar } from 'expo-status-bar';


import {URL} from '../../utils/exports'

const UserForm = ({navigation}) =>{
    const [ step, setStep ] = useState(1)
    const [ firstName, setFirstName ] = useState('')
    const [ lastName, setLastName ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ phone, setPhone ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ confirmPassword, setConfirmPassword ] = useState('')
    const [ dateString, setDateString ] = useState('')
    const [isHomeowner, setIsHomeowner] = useState(false)
    const [ stripeURL, setStripeURL] = useState('https://www.joatapp.com')
    const [isDone, setIsDone] = useState(false);


    const nextStep = () => {
        setStep(prev => prev + 1)
    }

    const prevStep = () => {
        if ( step > 1) {
            setStep(prev => prev - 1)
        } // temporary, prev button won't show when step == 1
    }

    const submit = async () =>{
      try {
        setEmail(email.toLowerCase());
        const type = isHomeowner ? 2 : 1;
        const body = {firstName, lastName, email, phone, password, dateString, type };
        console.log(body);
        const response = await fetch(
          `${URL}/logister/register`,
          {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(body)
          }
        );
        const json = await response.json();
        const status = await response.status;
        if(status!=200){
          alert("There was an issue creating your account. Please try again");
          navigation.replace('login')
        }else{
          alert("Your account was successfully created, please login");
          navigation.replace('login')
        }
      }catch (e) {
        console.error(e);
      }
    }

    const renderComponent = step => {
        switch (step) {

            case 1:
                return (
                    <RegistrationName
                        firstName={firstName}
                        setFirstName={setFirstName}
                        lastName={lastName}
                        setLastName={setLastName}
                        nextStep={nextStep}
                        dateString={dateString}
                        navigation={navigation}
                        setDateString={setDateString}
                    />
                );
            case 2:
                return (
                    <RegistrationEmail
                        email={email}
                        setEmail={setEmail}
                        phone={phone} setPhone={setPhone} nextStep={nextStep}/>
                );
            case 3:
                return (
                    <RegistrationPassword
                        password={password}
                        setPassword={setPassword}
                        confirmPassword={confirmPassword}
                        setConfirmPassword={setConfirmPassword}
                        nextStep={nextStep}
                    />
                );
            // case 4:
            //     return (
            //         <RegistrationAddress
            //             nextStep={nextStep}
            //         />
            //     );
            case 4:
                return (
                    <RegistrationInfo
                    onPress={submit}
                    isHomeowner={isHomeowner}
                    setIsHomeowner ={setIsHomeowner}
                    />
                );
            default:
                (console.log('This is a multi-step form built with React.'))

        }
    }

    return(
    <PaperProvider theme={inputTheme}>
    <StatusBar/>
        <View style={styles.container}>
        <Image source={logo} style={styles.img} />
        { step == 1 ? null
            : (<Pressable style={styles.pressable} onPress={() => prevStep()}>
                <MaterialCommunityIcons name="chevron-left" size={48} color="#0F2441" />
            </Pressable>)
        }
        { renderComponent(step) }
        <Redirect navigation={navigation} text={'SIGN IN'} title={'Already have an account?'} route={'login'}/>

        </View>
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
  pressable: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
})

export default UserForm;
