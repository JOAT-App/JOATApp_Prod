import { StatusBar } from 'expo-status-bar';
import React, {useEffect, useState} from 'react';
import useAxios from 'axios-hooks'
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import { Provider as PaperProvider, Title, RadioButton} from 'react-native-paper';
import  Button from 'react-native-button';
import homeImage from '../assets/homepage.png'
import logo from '../Logos/LogoTranslucent.png'
import * as Location from 'expo-location'
import AsyncStorage from '@react-native-async-storage/async-storage';

const homeTheme = {
  colors: {
    background: '#39b5fa'
  }
}
const Home = ({ navigation}) =>{
  const [location, setLocation] = useState(null)
  const [loading, setLoading ] = useState(true)
  useEffect(() => {
    (async () => {
      console.log("here");
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status !== 'granted') {
        // setErrorMsg('Permission to access location was denied');
        setLoading(false)
        return;
      }else{
        let position = await Location.getCurrentPositionAsync({});
        setLocation(position);
        await AsyncStorage.setItem("latitude", String(position.coords.latitude));
        await AsyncStorage.setItem("longitude", String(position.coords.longitude));
        setLoading(false)

      }

      // console.log(position)

    })();
  }, []);
  if (true)
  return(
    <PaperProvider theme={homeTheme}>
    <StatusBar style='light'/>
      <View style={styles.container}>
          <View style={styles.backgroundContainer}>
              <Image style={styles.backgroundImage} source={homeImage} />
          </View>
          <View style={styles.imgBox}>
              <Image source={logo} style={styles.img} />
          </View>
          <View style={styles.btnContainer}>
              { loading ? (
                    <Button style={styles.btn}>Loading</Button>
                    ) : (
                    <Button style={styles.btn} onPress={() => navigation.push('login')}>Get Started With JOAT </Button>
                    )}

          </View>

      </View>
    </PaperProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  backgroundContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  backgroundImage: {
      flex: 1,
      width: null,
      height: null
  },
  btnContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '100%',
  },
  btn: {
    width: '60%',
    alignSelf: 'flex-end',
    fontSize: 42,
    fontWeight: "600",
    color: "#fff",
    paddingRight: 30,
    backgroundColor: 'transparent',
    marginBottom: 70
  },
  buttonBox:{
    flex: 3,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 15
  },
  imgBox: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
  },
  img: {
    position: 'relative',
    width: '50%',
    alignSelf: 'flex-start',
    backgroundColor: 'transparent',
    marginTop: 40,
    marginLeft: 20,
    resizeMode: 'contain'
  }
});

export default Home;
