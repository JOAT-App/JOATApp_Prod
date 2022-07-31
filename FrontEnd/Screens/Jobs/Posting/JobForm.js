import React, { useState } from 'react'
import { StyleSheet, Text, View, Image, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native'
import image from '../../../assets/background2.png'
import JobType from './JobType';
import JobDetails from './JobDetails';
import JobAddress from './JobAddress';
import JobEstimates from './JobEstimates';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import GenericButton from '../../../components/Buttons/GenericButton.js'
import {Footer} from '../../../components/index.js'
import {URL} from '../../../utils/exports'

const JobForm = ({ navigation }) => {
    const [ step, setStep ] = useState(1)
    const [ type, setType ] = useState('Misc')
    const [ title, setTitle ] = useState('')
    const [ description, setDescription ] = useState('')
    const [ hours, setHours ] = useState('');
    const [ mins, setMins ] = useState('')
    const [ payment, setPayment ] = useState('')
    const [ street, setStreet] = useState('')
    const [ apt, setApt ] = useState('')
    const [ city, setCity ] = useState('')
    const [ state, setState] = useState('')
    const [ zipcode, setZipcode] = useState('')


    const nextStep = () => {
        setStep(prev => prev + 1)
    }

    const prevStep = () => {
        if (step == 1) {
            navigation.goBack()
        }
        else if (step > 1) {
            setStep(prev => prev - 1)
        }
    }

    const submitJob = async () => {
      try{
        const minutes = parseInt(mins) + 60*parseInt(hours);
        var address = [street, apt, city, state, zipcode].join(' ')
        const id = await AsyncStorage.getItem("id");
        const token = await AsyncStorage.getItem('token')
        const bearerToken='Bearer '+ token;
        const payload = {
            title: title,
            description: description,
            address: address,
            apt_no: apt,
            category: type,
            pay: payment,
            homeownerID: id,
            minutes: minutes
        }
        console.log(payload);
        const response = await fetch(
          `${URL}/jobs/post`,
          {
            method: "POST",
            headers: {
              "Authorization": bearerToken,
              "Content-type": "application/json"
            },
            body: JSON.stringify(payload)
          }
        );
        const status = await response.status;
        console.log(status);
        if(status==200){
          navigation.replace('homeowner')
        }else{
          alert("Something went wrong, please try again")
          navigation.replace('jobform')
        }
      }catch(e){console.error(e);}

    }

    const renderComponent = (step) => {
        switch(step){
            case 1:
                return (
                    <JobType nextStep={nextStep} type={type} setType={setType} />
                )
            case 2:
                return (
                      <JobDetails nextStep={nextStep} title={title} setTitle={setTitle} description={description} setDescription={setDescription} />
                )
            case 3:
                return (
                      <JobAddress street={street} setStreet={setStreet} apt={apt} setApt={setApt} city={city} setCity={setCity} state={state} setState={setState} zipcode={zipcode} setZipcode={setZipcode}/>
                )
            case 4:
                return (
                      <JobEstimates title={title} mins={mins} setMins={setMins} hours={hours} setHours={setHours} payment={payment} setPayment={setPayment} />
                )
            default:
                (console.log('This is a multi-step form built with React.'))
        }
    }
    return (
        <View style={styles.container}>
        <StatusBar/>
            <Image source={image} style={styles.img} />
            <View style={styles.content}>
                {/* { step == 1 ? null
                : ( <Pressable style={styles.pressable} onPress={() => prevStep()}>
                        <MaterialCommunityIcons name="chevron-left" size={48} color="#0F2441" />
                    </Pressable>)
                } */}
                <Pressable style={styles.pressable} onPress={() => prevStep()}>
                        <MaterialCommunityIcons name="chevron-left" size={48} color="#6DB3C8" />
                </Pressable>
                { renderComponent(step) }
                { step == 4 ? <GenericButton text={'POST MY JOB'} nextStep={() => submitJob()}/>
                 :
                 <GenericButton text={'CONTINUE'} nextStep={nextStep}/>
                }
            </View>
            <Footer navigation={navigation} route={'homeowner'}></Footer>
        </View>
    )
}

export default JobForm;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6DB3C8',
        paddingBottom: '5%'
      },
      img: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'transparent',
        height: 250,
        top: 0,
      },
      content: {
          flex: 1,
          backgroundColor: '#F8F8F9',
          marginTop: 60,
          width: '100%',
          borderTopLeftRadius: 73,
          borderTopRightRadius: 73,
          paddingTop: 90,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 60,
      },
      pressable: {
        position: 'absolute',
        top: 40,
        left: 20,
      },
})
