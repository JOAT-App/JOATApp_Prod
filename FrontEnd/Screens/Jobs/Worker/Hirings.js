import React,{ useState, useEffect} from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, ImageBackground, ActivityIndicator, Dimensions} from 'react-native';
import { Footer } from '../../../components/index.js'
import image from '../../../assets/background2.png'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import Card from '../../../components/Cards/Card.js';
import Slider from '@react-native-community/slider';
import * as Location from 'expo-location'
import {URL} from '../../../utils/exports';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SearchBar } from 'react-native-elements';

const Hirings = ({ navigation}) => {

  const [ scrollEnabled, setScrollEnabled ] = useState(true)
  const [ jobs, setJobs ] = useState([])
  const [ id, setId] = useState(0)
  const [ loading, setLoading ] = useState(true)
  const [ firstName, setFirstName ] = useState('')

  // search bar state variables
  const [filteredDataSource, setFilteredDataSource] = useState([]);
  const [masterDataSource, setMasterDataSource] = useState([]);
  const [search, setSearch] = useState('');
  const fullWidth = Dimensions.get('window').width

  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      const newData = masterDataSource.filter(function (item) {
        const itemData = item.title
          ? item.title.toUpperCase()
          : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource([]);
      setSearch(text);
    }
  };

  const setHired = async e =>{
    try {
      setLoading(true);
      const id = await AsyncStorage.getItem('id');
      const token = await AsyncStorage.getItem('token')
      const fname = await AsyncStorage.getItem('fname');
      const long = await AsyncStorage.getItem('longitude');
      const lat = await AsyncStorage.getItem('latitude');
      setFirstName(fname);
      const bearerToken='Bearer '+ token;
      const response = await fetch(
        `${URL}/jobs/hired?latitude=${lat}&longitude=${long}&id=${id}`
        ,
        {
          method: "GET",
          headers: {
            "Authorization": bearerToken,
            "Content-type": "application/json"
          }
        }
      );

      console.log(response);
      const parseRes = await response.json();
      await setJobs(parseRes)
      await setMasterDataSource(parseRes)
      setLoading(false)
    } catch (error) {
      console.error('Hirings.js afterLoad() => ', error)
    }
  }


  const _retrieveData = async () => {
    try {
      const Long = await AsyncStorage.getItem('longitude');
      const asyncLat = await AsyncStorage.getItem('latitude');
      setLatitude(asyncLat);
      setLongitude(Long);
    } catch (error) {
      // Error retrieving datasert
      console.error(error);
    }
  };
  useEffect( () => {
    // async func getLocation returns a promise and useEffect **should** wait for the getLocation to exectute properly before pinging our api.
    // .then() gets passed a function and will only execute after the getLocation() func.
    // for now i only have the console logging the data but I will pass it as props or whatever as needed once we know it works.
    // console.log('PAGE RELOADED ========================================================================================= PAGE RELOADED')
    setHired()
  },[])

    let filteredJobs = jobs //else clause means data has loaded. Filter data.
    return (
      <SafeAreaView style={styles.container} scrollEnabled={scrollEnabled}>
      <StatusBar/>
        <ScrollView style={styles.scroll}>
          <ImageBackground source={image} resizeMode="cover" style={styles.containerHeader}>
            <Text style={styles.greeting}>Hello {firstName}. </Text>
          </ImageBackground>
          <View style={styles.innerScroll}>
            <View style={styles.search}>
              <SearchBar
                round
                containerStyle={styles.containerStyle}
                inputContainerStyle={styles.inputContainerStyle}
                searchIcon={{ size: 32 }}
                onChangeText={(text) => searchFilterFunction(text)}
                onClear={(text) => searchFilterFunction('')}
                placeholder="Search Job Listings"
                value={search}
                style={styles.searchbar}
              />
            </View>

            { filteredDataSource.length != 0 ? <View style={{flexDirection: 'row'}}>
                <Text style={ styles.containerTitle }>
                    Search Results
                </Text>
            </View>: null }

            <ScrollView style={styles.scrollHorizontal} horizontal={true}>
            { filteredDataSource.length != 0 ? filteredDataSource.map(post => {
                  return (
                    <Card post={post} key={post.id} navigation={navigation} type={4}/>
                  )
            }): null }
            </ScrollView>



            <View style={{flexDirection: 'row'}}>
              <Text style={ styles.containerTitle }>
                  Hirings
              </Text>
            </View>
            <ScrollView style={styles.scrollHorizontal} horizontal={true}>
                { jobs && jobs.length != 0 ? jobs.map(post => {
                  return (
                    <View style={styles.cardWrapper}>
                      <Card post={post} key={post.id} navigation={navigation} type={4}/>
                    </View>
                  )
                }) : loading ?
                (<View style={styles.loadingWrapper}>
                  <ActivityIndicator size="large" color="#8bb9c7" style={styles.loading} />
                </View>)
                : (
                  <View style={{flexDirection:'row', flexWrap: 'wrap', width: fullWidth, paddingHorizontal: '5%'}}>
                      <Text style={{fontSize:30, flex: 1, fontWeight: '500', flexShrink: 1,  color: '#757575'}}>
                        You are not currently hired to any jobs. Apply to some on the home screen
                      </Text>
                  </View>
                )
                }
            </ScrollView>
          </View>
      </ScrollView>
      <Footer navigation={navigation} route={'hirings'}></Footer>
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
    temp: {
      height: 300
    },
    scrollHorizontal: {
      flex: 1,
      marginBottom: 10,
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
    greeting: {
      paddingTop: 70,
      paddingLeft: 20,
      fontSize: 50,
      fontWeight: "600",
    },
    search: {
      width: '75%',
      alignSelf: 'center',
      //borderWidth: 1,
      marginTop: 24
    },
    searchbar: {
      backgroundColor: '#FFFFFF',
    },
    searchText: {
      alignSelf: 'center',
      justifyContent: 'center',
      color: '#757575',
      fontSize: 20,
      fontWeight: '400'
    },
    containerStyle:{
    backgroundColor: '#FFFFFF',
    // borderRadius: 75,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    borderRadius:28
  },
    inputContainerStyle: {
      backgroundColor: '#FFFFFF'
    },
    inputStyle: {
      backgroundColor: '#111F1F'
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
      marginTop: "1%",
      marginLeft: 20,
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
      flexDirection: 'row',
      justifyContent: 'center',
      paddingLeft: 10,
    },
    card: {
      display: 'flex',
      justifyContent: 'center',
      width: 200,
      padding: 10,
      backgroundColor: '#FFFFFF',
      height: 180,
      borderRadius: 25,
      marginTop: 5,
      marginBottom: 5,
      marginRight: 15,
    },
    cardTop: {
      display: 'flex',
      flexDirection: 'row',
      height: '40%',
    },
    cardBottom: {
      paddingTop: 7,
      height: '55%',
    },
    cardLogo: {
      display: 'flex',
      flex: 1,
      marginLeft: 10,
      marginTop: 1
    },
    cardTitle: {
      display: 'flex',
      flex: 5,
      color: '#102542',
      fontSize: 20,
    },
    cardDescription: {
      paddingRight: 10,
      paddingLeft: 10,
      fontSize: 12,
    },
    cardBtnWrapper: {
      display: 'flex',
      flex: 2
    },
    cardTitleTime: {
      fontSize: 14,
      fontWeight: '300',
      paddingLeft: 5
    },
    cardTitleText: {
      fontSize: 22,
      fontWeight: '500'
    },
    pageBtns: {
      flexDirection: 'row',
      alignSelf: 'center',
      padding: 10,
    },
    recommendedWrapper: {
      paddingLeft: 10,
      paddingRight: 10
    },
    loadingWrapper: {
      flexDirection: 'column',
      height: 180,
      justifyContent: 'center',
      alignSelf: 'center',
      left: '100%'
    },
    loading: {
      alignSelf: 'center',
    }
  });

export default Hirings
