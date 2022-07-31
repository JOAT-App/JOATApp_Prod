import React,{ useState } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { Provider as PaperProvider,Button, DefaultTheme, RadioButton, ActivityIndicator} from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GenericButton from '../../../components/Buttons/GenericButton.js';
import Redirect from '../../../components/Registration/Redirect.js';
import logo from '../../../Logos/LogoTranslucentNoCaption.png'



const RegistrationInfo = ({isHomeowner, setIsHomeowner, navigation, onPress }) =>{
  const [checked, setChecked] = React.useState('Homeowner');
  const [value, setValue] = React.useState('Homeowner')
  const [disabled, setDisabled] = React.useState(true)
  const [localIsHomeowner, setLocalIsHomeowner] = useState(0)
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = ()=>{
    setSubmitted(true);
    onPress();
  }

  return(
        <View style={styles.container}>
            <Text style={styles.title}> JUST A FEW MORE THINGS... </Text>
            <View>
              <Text style={{alignSelf: 'center', fontSize: 18, fontWeight: "500"}}>Are you looking to</Text>
            </View>
            <View style={styles.radioBtnGroupContainer}>
                <View style={styles.radioBtn}>
                  <Text>Post Jobs</Text>
                  <RadioButton
                  status={localIsHomeowner==2 ? 'checked' : 'unchecked'}
                  onPress={()=>{
                    setIsHomeowner(true);
                    setLocalIsHomeowner(2);
                    setDisabled(false)
                  }}
                  />
                </View>
                <View style={styles.radioBtn}>
                  <Text>Work Jobs</Text>
                  <RadioButton
                  status={localIsHomeowner==1 ? 'checked' : 'unchecked'}
                  onPress={()=>
                    {
                      setIsHomeowner(false);
                      setLocalIsHomeowner(1);
                      setDisabled(false)
                    }
                  }
                  />
                </View>
            </View>
            {submitted ? (<ActivityIndicator/>) :
            (<GenericButton
            text={'FINISH AND SIGN UP'}
            navigation={navigation}
            route={'worker'}
            nextStep={onSubmit}
            disabled={disabled}
            />)
            }
        </View>
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
  },
  title: {
    fontWeight: "600",
    fontSize: 36,
    color: '#102542',
    alignSelf: 'center'
  },
  radioBtnContainer: {
    width: '40%',
    flexDirection: 'row',
  },
  radioBtn: {
    padding: "5%",
    borderRadius: 40,
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor:'#8DCBDE',
    alignItems:'center',
    justifyContent:'center',
    marginHorizontal: "3%",
    marginTop: '5%',
    marginBottom: '3%'
  },
  radioBtnGroup: {
    display: 'flex',
    width: '100%',
    backgroundColor: '#42f5c2'
  },
  radioBtnGroupContainer:{
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center'
  }
})

export default RegistrationInfo;
