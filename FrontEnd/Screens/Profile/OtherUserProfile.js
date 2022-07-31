import React, {useState, useEffect} from 'react';
import {
  View,
  SafeAreaView,
  TouchableWithoutFeedback,
  StyleSheet,
  Keyboard,
  Image,
  Text,
  ScrollView,
  Pressable
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LoadingScreen, Footer} from '../../components/index.js'
import {URL, STREAM_API_KEY} from '../../utils/exports';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StreamChat } from 'stream-chat'
import { StatusBar } from 'expo-status-bar';

const chatClient = StreamChat.getInstance(STREAM_API_KEY);


const OtherUserProfile = ({navigation, route}) => {
  const {id} = route.params
  const [name, setName] = useState('Joe Butler')
  const [photo, setPhoto] = useState('https://joatprofilepics.s3.us-east-2.amazonaws.com/87051214.png');
  const [type, setType] = useState(0);
  const [jobCount, setJobCount] = useState(0)
  const [bio, setBio] = useState('Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.')
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(true)

  const afterLoad = async e => {
    try {
      const token = await AsyncStorage.getItem('token')
      const bearerToken = 'Bearer ' + token;
      const response = await fetch(`${URL}/users/other/profile/${id}`, {
        method: "GET",
        headers: {
          "Authorization": bearerToken,
          "Content-type": "application/json"
        }
      });
      const parseRes = await response.json()
      setName(parseRes.first_name + " " + parseRes.last_name)
      setBio(parseRes.bio)
      setType(parseRes.user_type)
      setPhoto(parseRes.photo)
      setJobCount(parseRes.job_count)
      setLoading(false)
    } catch (error) {
      console.error(error)
    }
  }

  const createChatRoom= async() => {
      const id_ = await AsyncStorage.getItem('id');
      console.log(id_.toString(),id.toString())
      const channel = chatClient.channel('messaging',{
        members: [id.toString(),id_.toString()]
      });
      const otherUser = {
        name: name,
        image: photo
      }

      try {
        await channel.create();
        navigation.navigate('ChatRoom', {
          channel: channel,
          chatClient: chatClient,
          otherUser: otherUser
        });
      } catch (err) {
        console.log(err);
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
    <SafeAreaView style={styles.container}>
      <View style={styles.userProfileWrapper}>
      <StatusBar/>
        <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={48} color="#0F2441"/>
        </Pressable>
        <View style={{
            paddingTop: "10%",
            flexDirection: 'row'
          }}>
          <Image source={{
              uri: photo
            }} style={{
              height: 120,
              width: 120,
              borderRadius: 100,
              marginTop: '-18%',
              borderColor: 'white',
              borderWidth: 1,
              backgroundColor: 'white',
              alignSelf: 'flex-start',
              marginLeft: '15%',
              marginRight: "5%"
            }}
          />
          <Pressable
            style={styles.msgBtn}
            onPress={()=>{createChatRoom()}}
          >
            <Text
              style={{fontWeight:'600', fontSize:20}}
              >
                Message {name.split(' ')[0]}</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.title}>{name}</Text>

        <ScrollView
          style={styles.scroll}
          contentContainerStyle={{paddingBottom: "100%"}}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}>
            <View style={styles.bioRow}>
            <Text style={styles.userInfoSectionDescription}>
              Bio
            </Text>
            <View style={styles.bioBox}>
              <Text>
                {bio}
              </Text>
            </View>
            </View>
            <View style={styles.row}>
            <Text style={styles.userInfoSectionDescription}>Jobs Completed:
            </Text>
            <Text>
              {jobCount}
            </Text>
            </View>
        </ScrollView>
      </View>
      <Footer navigation={navigation} route="otheruserprofile"/>
    </SafeAreaView>);
  }
;
export default OtherUserProfile;
const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  scroll: {
    paddingHorizontal: 30,
    width: '100%',
    marginTop: '5%',
  },
  userProfileWrapper: {
    backgroundColor: '#E2F0F4',
    height: '30%',
    marginTop:'-5%',
    paddingTop:'5%'
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    alignSelf: 'flex-start',
    marginLeft:'7.5%'
  },
  row: {
    flexDirection: 'row',
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E3',
    paddingBottom: 2
  },
  bioRow: {
    flexDirection: 'row',
    marginBottom: "5%",
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E3',
    paddingBottom: 2,
  },
  bioBox: {
    flexDirection: 'column',
    marginBottom: 15,
    width:'110%',
    borderColor: '#FFFFFF',
    paddingBottom: 2,
    alignSelf: 'flex-start',
    paddingRight:'5%'
  },
  bottom: {
    marginTop: 10,
    width: '90%',
    alignSelf: 'center'
  },
  userInfoSectionDescription: {
    color: "#102542",
    flex: 1,
    fontWeight: 'bold',
    alignItems: 'center',
    fontSize: 18
  },
  button: {
    borderRadius: 8,
    padding: 6,
    height: 60,
    width: '80%',
    marginTop: '30%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    alignSelf: 'center',
    borderRadius: 60,
    backgroundColor: 'green'
  },
  btn: {
    marginTop: '5%',
    alignSelf: 'flex-start',
    marginLeft: '2.5%',
    marginRight: '5%'
  },
  msgBtn: {
      backgroundColor:"white",
      borderRadius:10,
      alignItems:'center',
      justifyContent:'center',
      paddingHorizontal:"2%",
      marginLeft:'5%'
  }
});
