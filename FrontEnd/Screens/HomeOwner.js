import React,{ useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, Pressable, ImageBackground} from 'react-native';
import {Footer, LoadingScreen } from '../components/index.js'
import {Searchbar,Button, Title, Menu} from 'react-native-paper'
import { Entypo } from '@expo/vector-icons';
import useAxios from 'axios-hooks'
import image from '../assets/background2.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import RecommendedCard from '../components/Cards/RecommendedCard.js';
import CardHomeowner from '../components/Cards/CardHomeowner.js';
import Slider from '@react-native-community/slider';
import * as Location from 'expo-location'
import {URL} from '../utils/exports';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

const HomeOwner = ({ navigation}) => {
  const open ={
    title: 'Open Jobs',
    noDataTitle: 'You havent posted any jobs',
    noDataText: '',
    showSlider: false,
    showFilter: true,
    type: 2,
    status: 1
  }
  const hired ={
    title: 'Hirings',
    noDataTitle: 'You haven\'t hired anyone yet',
    noDataText: 'Please Check Back later',
    showSlider: false,
    showFilter: false,
    applied: true,
    type:1,
    status: 3
  }

  const [ pageNumber, setPageNumber ] = useState(0)
  const [ distance, setDistance ] = useState(50)
  const [ scrollEnabled, setScrollEnabled ] = useState(true)
  const [ jobs, setJobs ] = useState([])
  const [ lon, setLon ] = useState('')
  const [ loc, setLoc ] = useState('')
  const [id, setId] = useState(0)
  const [ loading, setLoading ] = useState(true)
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [jobType, setJobType]=useState(open);
  const [jobsNearMe, setJobsNearMe] = useState(null);
  const[menuVisible, setMenuVisible]=useState(false);
  const [ firstName, setFirstName] = useState('')
  const init = async e => {
    try{
    const id = await AsyncStorage.getItem('id');
    const token = await AsyncStorage.getItem('token')
    const fname = await AsyncStorage.getItem('fname');
    setFirstName(fname);
    const bearerToken='Bearer '+ token;

    const response = await fetch(
      `${URL}/jobs/get/homeowner/${id}`,
      {
        method: "GET",
        headers: {
          "Authorization": bearerToken,
          "Content-type": "application/json"
        }
      }
    );
    const parseRes = await response.json();
    await setJobs(parseRes)
    setJobType(open);
    // console.log(parseRes);

    setLoading(false)
  }catch(e){console.error(e);}
  }
  const setOpen = async e => {
    try {
      setLoading(true);
      setMenuVisible(false)
      setJobType(open)
      setLoading(false)
    } catch (error) {
      console.error('Worker.js afterLoad() => ', error)
    }
  }
  const setHired = async e =>{
    try {
      setLoading(true);
      setMenuVisible(false)
      setJobType(hired)
      setLoading(false)
    } catch (error) {
      console.error('Worker.js afterLoad() => ', error)
    }
  }


  useEffect( () => {
    // async func getLocation returns a promise and useEffect **should** wait for the getLocation to exectute properly before pinging our api.
    // .then() gets passed a function and will only execute after the getLocation() func.
    // for now i only have the console logging the data but I will pass it as props or whatever as needed once we know it works.
    init();
  },[])

      return  loading ?
      (
        <LoadingScreen/>
      ):(
        <SafeAreaView style={styles.container} scrollEnabled={scrollEnabled}>
        <StatusBar/>
          <ScrollView style={styles.scroll}>
            <ImageBackground source={image} resizeMode="cover" style={styles.containerHeader}>
              <Text style={styles.greeting}>Hello, {firstName} </Text>
            </ImageBackground>
            <View style={styles.innerScroll}>
              {/* <Menu
               visible={menuVisible}
               onDismiss={()=>setMenuVisible(false)}
               anchor={<Button onPress={()=>setMenuVisible(true)}>Show menu</Button>}>
               <Menu.Item onPress={ ()=>{setOpen()}} title="Your Open Jobs" />
               <Menu.Item onPress={ ()=>{setHired()}} title="Your hirings" />
             </Menu> */}
              <View style={{flexDirection: 'row'}}>
                <Text style={ styles.containerTitle }>
                    {jobType.title}
                </Text>
                <View style={{
                  alignSelf:'center',
                  marginLeft: '10%',
                  marginTop:"5%",
                  alignItems: 'flex-end'}}>
                <Menu
                 visible={menuVisible}
                 onDismiss={()=>setMenuVisible(false)}
                 anchor={
                   <Pressable
                   style={{flexDirection:'row'}}
                    onPress={()=>{setMenuVisible(true)}}>
                      <Text style={{
                        color:'grey',
                        fontSize:20
                      }}>{jobType.title}</Text>
                      <AntDesign name="down" size={24} color="grey" />
                   </Pressable>
                 }
                 >
                 <Menu.Item onPress={() => {setOpen()}} title="Open Jobs" />
                 <Menu.Item onPress={() => {setHired()}} title="Hirings" />
               </Menu>
               </View>
              </View>
              <ScrollView style={styles.scrollVertical}>
                <View style={styles.cardWrapper}>
                  { jobs && jobs.length ? jobs.filter(job=>job.job_status_id==jobType.status).map(post => {
                  //  console.log("TYPE: "+jobType.type);
                    return (
                      <CardHomeowner
                      key={post.id}
                      navigation={navigation}
                      type={jobType.type}
                      isHomeowner={true}
                      post={post}
                      />
                    )
                  }) :
                  <View style={{flexDirection: 'column', alignItems: 'center', marginTop: '5%'}}>
                    <Title style={{ color: '#000', fontWeight: "500"}}> {jobType.noDataTitle} </Title>
                    <Text>{jobType.noDataText}</Text>
                  </View>
                  }
                  { loading ? <Text> Animation! </Text> : null}
                </View>
              </ScrollView>
            </View>
        </ScrollView>
        <Footer navigation={navigation} route={'homeowner'}></Footer>
        </SafeAreaView>
      )
}


// Encountered a glitch... not sure what is up but scroll with flex: 1 doesn't fill the parent container,
// SafeAreaView << ScrollView << Rest and scrollview just did not fill up safearea view

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    scroll: {
      flex: 1,
      backgroundColor: '#F8F8F9',
      marginTop: '-17.5%',
    },
    scrollVertical: {
      flex: 1,
      marginBottom: 10,
      paddingBottom: '20%'
    },
    containerHeader:{
      height: 200,
      backgroundColor: 'transparent',
      zIndex: 0
    },
    innerScroll: {
      flex: 1,
      borderTopRightRadius: 73,
      borderTopLeftRadius: 73,
      backgroundColor: '#F8F8F9',
      marginTop: -50
    },
    searchbar: {
      marginTop: 20,
      marginBottom: 20,
      padding: 6,
      borderRadius: 40,
      width: '82%',
      alignSelf: 'center',
    },
    greeting: {
      paddingTop: 70,
      paddingLeft: 20,
      fontSize: 50,
      fontWeight: "600",
    },
    Searchbar: {
      width: '100%',
    },
    location: {
      alignItems: 'center',
      flexDirection: 'row',
      height: 70,
      backgroundColor: '#fff',
      marginTop: 20,
      borderBottomWidth: 1,
      borderBottomColor: 'blue'
    },
    circle: {
      height: 40,
      width: 40,
      borderRadius: 40/2,
      backgroundColor: '#b0b0b0'
    },
    containerTitle: {
      marginTop: "4%",
      marginLeft: 50,
      fontWeight: '600',
      fontSize: 30,
      marginBottom: 5

    },
    recommendationsText: {
      marginTop: 5,
      marginLeft: 20,
      fontWeight: '600',
      fontSize: 24,
    },
    bottomBar: {
      position: 'absolute',
      bottom: 0,
      height: 70,
      width: '100%',
      backgroundColor: "#fff"
    },
    bottomBarButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '85%',
      marginLeft: 25,
    },
    cardWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    pageBtns: {
      flexDirection: 'row',
      alignSelf: 'center',
      padding: 10,
    },
    recommendedWrapper: {
      paddingLeft: 10,
      paddingRight: 10
    }
  });

export default HomeOwner
