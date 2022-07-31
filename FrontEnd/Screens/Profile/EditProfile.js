import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
  TextInput,
  Keyboard,
  Image,
  Pressable,
  ScrollView,
  KeyboardAvoidingView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {UploadImage, Footer, LoadingScreen} from '../../components/index.js'
import {URL} from '../../utils/exports';
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {Avatar, Title, Caption, Text, TouchableRipple, ActivityIndicator} from 'react-native-paper';
import profilephoto from '../../assets/prof_photo.jpg'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { StatusBar } from 'expo-status-bar';
const EditAccount = ({navigation}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [photo, setPhoto] = useState('https://joatprofilepics.s3.us-east-2.amazonaws.com/87051214.png');
  const [bio, setBio] = useState('')
  const [id, setId] = useState(0)
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(true)
  const [changesLoading, setChangesLoading] = useState(false)

  const onSubmitForm = async e => {
    console.log('here')
    setChangesLoading(true)
    e.preventDefault();
    const token = await AsyncStorage.getItem('token')
    const bearerToken = 'Bearer ' + token;
    try {
      const body = {
        firstName,
        lastName,
        email,
        phone,
        bio,
        id
      };
      const response = await fetch(`${URL}/users/self/profile/update`, {
        method: "PUT",
        headers: {
          "Authorization": bearerToken,
          "Content-type": "application/json"
        },
        body: JSON.stringify(body)
      });
      console.log(response);
      const status = await response.status;
      if (status == 200) {
        alert("You're changes were applied")
        navigation.push('profile')
      }else{
        console.log(status);
      }
      //const id = parseRes.id;
    } catch (err) {
      console.error(err.message);
    }
  };

  const afterLoad = async e => {
    try {
      const newId = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token')
      const bearerToken = 'Bearer ' + token;
      setId(newId);
      console.log("ID:" + id);
      const response = await fetch(`${URL}/users/self/profile/${newId}`, {
        method: "GET",
        headers: {
          "Authorization": bearerToken,
          "Content-type": "application/json"
        }
      });
      const parseRes = await response.json()
      setPhone(parseRes.phone)
      setFirstName(parseRes.first_name)
      setLastName(parseRes.last_name)
      setEmail(parseRes.email)
      setPhoto(parseRes.photo_url)
      setBio(parseRes.bio)
      setFullName(parseRes.first_name + ' ' + parseRes.last_name)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const formatPhone = (phone) => {
    return phone.slice(0, 3) + "-" + phone.slice(3, 6) + "-" + phone.slice(6)
  }

  useEffect(() => {
    // async func getLocation returns a promise and useEffect **should** wait for the getLocation to exectute properly before pinging our api.
    // .then() gets passed a function and will only execute after the getLocation() func.
    // for now i only have the console logging the data but I will pass it as props or whatever as needed once we know it works.
    afterLoad()
  }, [])

  if (loading == true)
    return (<LoadingScreen/>);
  else
    return (
      <>
      <StatusBar/>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
       behavior={Platform.OS === "ios" ? "padding" : "height"}
       style={styles.container}
       >
      <>
        <View style={styles.userProfileWrapper}>
        <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={48} color="#0F2441"/>
        </Pressable>
          <View style={styles.userProfile}>
            <View style={{
                flexDirection: 'row',
                marginTop: 15
              }}>
              <View style={{
                  marginLeft: 20,
                  flexDirection: 'row'
                }}>
                <View style={{
                    marginRight: 20,
                    marginTop: -10
                  }}>
                  <UploadImage photoUrl={photo}/>
                </View>

                <Title style={[
                    styles.title, {
                      alignSelf: 'center',
                      justifyContent: 'center'
                    }
                  ]}>{fullName}</Title>
              </View>
            </View>
          </View>
        </View>
        <View style={styles.menuWrapper}>
          <View style={styles.userInfoSection}>
            <View style={styles.row}>
              <Text style={styles.userInfoSectionDescription}>First Name</Text>
              <TextInput value={firstName} placeholder={"First Name"} onChangeText={text => setFirstName(text)} maxLength={64} style={styles.textInput}/>
            </View>
            <View style={styles.row}>
              <Text style={styles.userInfoSectionDescription}>Last Name</Text>
              <TextInput value={lastName} placeholder={"Last Name"} onChangeText={text => setLastName(text)} maxLength={64} style={styles.textInput}/>
            </View>
            <View style={styles.row}>
              <Text style={styles.userInfoSectionDescription}>Email</Text>
              <TextInput value={email} editable={false} selectTextOnFocus={false} multiline={true} placeholder={"joe@example.com"} style={styles.textInput} onChangeText={text => setEmail(text)}/>
            </View>
            <View style={styles.row}>
              <Text style={styles.userInfoSectionDescription}>Phone
              </Text>
              <TextInput value={formatPhone(phone)} multiline={true} placeholder={phone} style={styles.textInput} onChangeText={text => setPhone(text)} editable={false} maxLength={20}/>
            </View>
            <View style={styles.bioRow}>
              <Text style={styles.userInfoSectionDescription}>
                Bio
              </Text>
              <View style={styles.bioBox}>
                <TextInput placeholder={"Placeholder text"} value={bio} onChangeText={body => setBio(body)} numberOfLines={5} textAlignVertical={"top"} textBreakStrategy={"highQuality"} underlineColorAndroid={"transparent"} multiline={true} style={styles.bioInput} maxLength={1024}/>
              </View>
            </View>
            <View style={{alignItems:'center', paddingLeft:'10%'}}>
            <Pressable
             style={styles.button}
              onPress={(e) => {
                onSubmitForm(e)
              }} disabled={disabled}
              >
              {
                changesLoading ?  <ActivityIndicator color='white'/> :
                <Text style={styles.buttonText}>
                Submit Changes
                </Text>
              }
              </Pressable>
            </View>
          </View>
        </View>
        <Footer navigation={navigation} route="EditAccount"/>
        </>
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </>)
  }
export default EditAccount;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  userInfoSection: {
    paddingHorizontal: 30,
    width: '90%',
    marginTop: '15%'
  },
  additionalOptions: {
    width: '90%'
  },
  userProfileWrapper: {
    backgroundColor: '#E2F0F4',
    height: '25%'
  },
  userProfile: {
    alignSelf: 'flex-start',
    padding:10
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold'
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    fontWeight: '500'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E3',
    paddingBottom: 2
  },
  bioRow: {
    flexDirection: 'row'
  },
  bioWrapper: {
    alignItems: 'flex-start',
    flexDirection: 'column'
  },
  bioBox: {
    flexDirection: 'column',
    width: '80%',
    borderWidth: 1,
    borderColor: '#E3E3E3',
    alignSelf: 'flex-start'
  },
  menuWrapper: {
    marginTop: 10,
    width: '100%',
    alignSelf: 'center'
  },
  userInfoSectionDescription: {
    color: "#102542",
    flex: 1,
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 18
  },
  userInfoSectionData: {
    flex: 2,
    justifyContent: 'flex-start'
  },
  textInput: {
    width: '60%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    color: '#757575'
  },
  bioInput: {
    width: '100%',
    alignSelf: 'center',
    backgroundColor: 'transparent',
    color: '#757575',
    height: '50%'
  },
  button: {
    borderRadius: 8,
    padding: 6,
    height: 60,
    width: '80%',
    elevation: 5,
    borderRadius: 60,
    backgroundColor: '#6DB3C8',
    marginTop: '-30%',
    alignItems:'center',
    justifyContent:'center'
  },
  buttonText: {
    fontSize: 18,
    color:'white',
    fontWeight:'700'
  },
  btn: {
    top: 20,
    left: 20,
    zIndex: 1
  }
});
