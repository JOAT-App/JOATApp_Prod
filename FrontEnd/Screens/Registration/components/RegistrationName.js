import { StatusBar } from 'expo-status-bar';
import React,{ useState } from 'react';
import { StyleSheet, Text, View, Image, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { Provider as PaperProvider, Button, DefaultTheme, TextInput, Title} from 'react-native-paper';
import GenericButton from '../../../components/Buttons/GenericButton.js';
import { DatePickerModal, DatePickerInput } from 'react-native-paper-dates';



const RegistrationName = ({dateString, setDateString, navigation, firstName, setFirstName, lastName, setLastName, nextStep}) => {
  const [date, setDate] = useState(dateString ? new Date(dateString) : null)
  const [open, setOpen] = React.useState(false);
  const [disabled, setDisabled] = useState(true);
  const [oldEnough, setOldEnough] = useState(true);

  const updateDisabled = () => {
    console.log(!firstName.length || !lastName.length || !date || !oldEnough);
    setDisabled(!firstName.length || !lastName.length || !date || !oldEnough)
    console.log(disabled);
  }
  const checkAge = (birthDateString) =>{
    var today = new Date();
    var birthDate = new Date(birthDateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age > 13;
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <>
            <Text style={styles.title}> SIGN UP </Text>
              <View>
                <TextInput
                  secureTextEntry={false}
                  style={styles.textInput}
                  placeholder="First Name"
                  label="First Name"
                  value={firstName}
                  onChangeText={text => setFirstName(text)}
                  onBlur={()=>{updateDisabled()}}
                />
              </View>
              <View>
                <TextInput
                style={styles.textInput}
                label="Last Name"
                value={lastName}
                onChangeText={text => setLastName(text)}
                onBlur={()=>{updateDisabled()}}
                />
              </View>
            <View>
            <DatePickerInput
               locale="en"
               style={[styles.textInput, {marginLeft: '2%'}]}
               label="Birthdate"
               value={date}
               onChange={(d) => {
                 setDate(d);
                 setDateString(d.toISOString().substring(0,10))
                 setOldEnough(checkAge(d.toISOString()))
                 console.log(date);
                 updateDisabled();
               }}
               onBlur={()=>updateDisabled()}
               onConfirm={()=>updateDisabled()}
               validRange={{
                startDate: new Date(1900, 0, 0),  // optional
                endDate: new Date(), // optional
                disabledDates: [new Date()] // optional
               }}
               inputMode="end"
             />
              {!oldEnough &&
                <Text style={styles.errorText}> You must be 13 years old to use JOAT </Text>
              }
              </View>
            <Text style={styles.conditions}>
              By clicking ACCEPT AND CONTINUE, you recognize that you have read and agreed to the
            </Text>
            <View style={{flexDirection: 'row', marginBottom:"5%"}}>
              <Pressable
               onPress={() =>{ navigation.push('termsandconditions')}} uppercase={false}
               style={{marginTop:'-6%'}}>
                <Text style={{color:'#08a4ff'}}>
                  terms and conditions
                </Text>
              </Pressable>
              <Text style={{marginTop:"-6%"}}>
                {" "}as well as our {" "}
              </Text>
              <Pressable
                onPress={() => navigation.push('privacypolicy')}
                style={{marginTop:"-6%"}}
               >
                 <Text style={{color:'#08a4ff'}}>
                  privacy policy.
                  </Text>
              </Pressable>
            </View>
            <GenericButton
              text={'ACCEPT AND CONTINUE'}
              navigation={navigation}
              nextStep={nextStep}
              disabled={disabled}
            >
            </GenericButton>
            </>
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
  conditions: {
    width: '90%',
    alignSelf: 'center',
    paddingTop: 10,
    paddingBottom: 20
  }
})

export default RegistrationName;
