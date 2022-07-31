import React, {useState, useEffect} from 'react'
import {
  StyleSheet,
  View,
  Pressable,
  Text,
  Image,
  ScrollView,
  SafeAreaView
} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Footer, LoadingScreen} from '../../components/index.js'
import Logo from '../../assets/logo.svg'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Linking from 'expo-linking';
import {URL} from '../../utils/exports';
import { StatusBar } from 'expo-status-bar';

const ProfileLinks = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('https://joatprofilepics.s3.us-east-2.amazonaws.com/87051214.png');
  const [bio, setBio] = useState('')
  const [stripeUrl, setStripeUrl] = useState('')
  const [loading, setLoading] = useState(true)
  const [type, setType] = useState(null)
  const [stripeConfirmed, setStripeConfirmed] = useState(false)

  const afterLoad = async e => {
    try {
      const id = await AsyncStorage.getItem('id');
      const type = await AsyncStorage.getItem('userType');
      const token = await AsyncStorage.getItem('token')
      const stripeVerified = await AsyncStorage.getItem('stripeVerified')
      setStripeConfirmed(stripeVerified=='true')
      setType(type);
      console.log(type);
      const bearerToken = 'Bearer ' + token;
      const response = await fetch(`${URL}/users/self/profile/${id}`, {
        method: "GET",
        headers: {
          "Authorization": bearerToken,
          "Content-type": "application/json"
        }
      });
      const parseRes = await response.json()
      console.log(parseRes);
      setPhone(parseRes.phone)
      setFirstName(parseRes.first_name)
      setLastName(parseRes.last_name)
      setEmail(parseRes.email)
      setPhoto(parseRes.photo_url)
      setBio(parseRes.bio)
      if(parseRes.link){
        setStripeUrl(parseRes.link.url)
        setStripeConfirmed(true)
      }
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    afterLoad()
  }, [])

    return loading == true ?  (<LoadingScreen/>) : (
      <View style={styles.container}>
      <StatusBar/>
      <View style={styles.top}>
      {
        // <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
        // <MaterialCommunityIcons name="chevron-left" size={48} color="#6DB3C8"/>
        // </Pressable>
      }
        <View style={{
            alignSelf: 'center',
            padding: 20
          }}>
          <Image source={{
              uri: photo
            }} style={{
              height: 110,
              width: 110,
              borderRadius: 100,
              alignSelf: 'center',
              marginTop: 60
            }}/>
        </View>
        <View style={styles.name}>
          <Text style={styles.nameText}>{firstName + " " + lastName}
          </Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.heading}>
            <Text style={styles.headingText}>General</Text>
          </View>
          <View style={styles.pageContainer}>
            <Pressable style={styles.page} onPress={() => {
                navigation.push('EditProfile')
              }}>
              <Text style={styles.pageText}>Edit Profile</Text>
              <MaterialCommunityIcons style={styles.pageIcon} name="chevron-right" size={28} color="#C4C4C4"/>
            </Pressable>
            {(type==3)  &&
            <Pressable style={styles.page} onPress={() => {
              stripeConfirmed ? Linking.openURL(stripeUrl) : navigation.push('stripeonboarding')
              }}>
              <Text style={styles.pageText}>View Stripe Account</Text>
              <MaterialCommunityIcons style={styles.pageIcon} name="chevron-right" size={28} color="#C4C4C4"/>
            </Pressable>
            }

          </View>

          <View style={styles.heading}>
            <Text style={styles.headingText}>Other</Text>
          </View>
          <View style={styles.pageContainer}>
            <Pressable style={styles.page} onPress={() => {
                navigation.push('contactus')
              }}>
              <Text style={styles.pageText}>Contact Us</Text>
              <MaterialCommunityIcons style={styles.pageIcon} name="chevron-right" size={28} color="#C4C4C4"/>
            </Pressable>
            <Pressable style={styles.page} onPress={() => {
                navigation.push('termsandconditions')
              }}>
              <Text style={styles.pageText}>Terms and Conditions</Text>
              <MaterialCommunityIcons style={styles.pageIcon} name="chevron-right" size={28} color="#C4C4C4"/>
            </Pressable>
            <Pressable style={styles.page} onPress={() => {
                navigation.push('privacypolicy')
              }}>
              <Text style={styles.pageText}>Privacy Policy</Text>
              <MaterialCommunityIcons style={styles.pageIcon} name="chevron-right" size={28} color="#C4C4C4"/>
            </Pressable>
            <Pressable style={styles.page} onPress={() => {
                navigation.push('logout')
              }}>
              <Text style={[
                  styles.pageText, {
                    color: 'red'
                  }
                ]}>Log Out</Text>
              <MaterialCommunityIcons style={styles.pageIcon} name="chevron-right" size={28} color="#C4C4C4"/>
            </Pressable>

          </View>
          <View style={styles.svgContainer}>
            <Logo/>
          </View>
        </ScrollView>
      </View>
      <Footer navigation={navigation}></Footer>
    </View>)
}

export default ProfileLinks

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  top: {
    flexDirection: 'row',
    backgroundColor: '#E2F0F4',
    flex: 2
  },
  bottom: {
    flex: 5,
    backgroundColor: '#F8F8F9'
  },
  scrollView: {
    paddingTop: 1
  },
  name: {
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 40
  },
  nameText: {
    color: '#102542',
    fontSize: 24,
    fontWeight: '500'
  },
  heading: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 15
  },
  headingText: {
    fontWeight: '500',
    fontSize: 20,
    color: '#000000',
    paddingTop: 15
  },
  page: {
    borderBottomColor: '#E3E3E3',
    borderBottomWidth: 1,
    width: '93%',
    alignSelf: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  pageText: {
    paddingLeft: 35,
    paddingTop: 20,
    paddingBottom: 4,
    fontSize: 16
  },
  pageIcon: {
    paddingRight: 20,
    paddingTop: 10
  },
  btn: {
    position: 'absolute',
    top: 30,
    left: 20,
    zIndex: 1
  },
  svgContainer: {
    paddingTop: 20,
    paddingBottom: 80,
    flex: 1,
    alignItems: 'center'
  }
})
