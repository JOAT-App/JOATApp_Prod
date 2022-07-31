import React,{ useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GenericButton from '../../../components/Buttons/GenericButton.js';
import {URL} from '../../../utils/exports';

const RegistrationAddress = ({navigation, nextStep }) =>{
  const [ address, setAddress ] = useState('')
  const [ addressExtra, setAddressExtra ] = useState('')
  const [ city, setCity ] = useState('')
  const [ state, setState ] = useState('')
  const [ zipCode, setZipCode ] = useState('')

  return(
        <View style={styles.container}>
            <Text style={styles.title}>JUST A FEW MORE THINGS... </Text>
            <View>
              <TextInput
                secureTextEntry={false}
                style={styles.textInput}
                label="Street Address"
                value={address}
                onChangeText={text => setAddress(text)}
              />
            </View>
            <View>
              <TextInput
              style={styles.textInput}
              label="Apt/Suite/Bldg/Gate Code (optional)"
              value={addressExtra}
              onChangeText={text => setAddressExtra(text)}
              />
            </View>
            <View style={styles.cityState}>
              <TextInput
              style={styles.city}
              label="City"
              value={city}
              onChangeText={text => setCity(text)}
              />
              <TextInput
              style={styles.state}
              label="State"
              value={state}
              onChangeText={text => setState(text)}
              />
            </View>
            <View style={styles.zipCodeContainer}>
              <TextInput
              style={styles.textInput}
              label="Zip Code"
              value={zipCode}
              onChangeText={text => setZipCode(text)}
              />
            </View>

            <GenericButton
            text={'CONTINUE'}
            navigation={navigation}
            nextStep={nextStep}
            >
            </GenericButton>
        </View>
  )
}

const styles=StyleSheet.create({
  container: {
    width: '90%',
    padding: 10,
    backgroundColor: '#EDF9FD',
    borderRadius: 25,
    marginTop: 120
  },
  title: {
    fontWeight: "600",
    fontSize: 36,
    color: '#102542',
    alignSelf: 'center',
    width: '80%'
  },
  textInput: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
  },
  cityState: {
    width: '90%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    justifyContent: 'space-between',
    display: 'flex',
    flexDirection: 'row'
  },
  city: {
      width: '60%',
      backgroundColor: 'transparent',
  },
  state: {
      width: '25%',
      backgroundColor: 'transparent',
  },
  zipCodeContainer:{
      marginBottom: 50,
  }
})

export default RegistrationAddress;
