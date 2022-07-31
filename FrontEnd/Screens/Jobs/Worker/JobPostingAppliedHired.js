import { StyleSheet, Text, View, Button, Image, Pressable, ActivityIndicator, ScrollView} from 'react-native';
import React, { useState, useEffect } from 'react'
import image from '../../../assets/background2.png'
import {Footer} from '../../../components/index.js'
import ViewJobHeader from '../../../components/Cards/ViewJobHeader';
import {URL} from '../../../utils/exports';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardProfile from '../../../components/Cards/CardProfile';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';

const ViewJobAppliedHired = ({ navigation, route }) => {
  const { id, post, type } = route.params
  const [ loading, setLoading ] = useState(false)
  const [ wid, setWid] = useState(null)
  const [isWorker, setIsWorker] = useState(false);
  const [complete, setComplete] = useState(false)
  const [formattedAddr, setFormattedAddr] = useState('')
  console.log(post);


  const previousPage = () => {
    navigation.goBack()
  }

  const formatAddr = (post)=>{
    let ret =''
    ret+=post.addr_number+" "
    ret+=post.street+", "
    ret+=post.city+" "
    if(post.apt_no!=null){
      ret+=post.apt_no+" "
    }
    ret+=post.state+", "
    ret+=post.zip+" "

    return ret
  }

  const getData = async e => {
      const workerID = await AsyncStorage.getItem('id')
      if (workerID != null) {
        setWid(workerID)
      }
      else {
          console.error('Async storage failed to retrieve data')
      }
  }
  useEffect(() => {
    getData()
  },[])

  return (
    <View style={styles.container}>
      <StatusBar/>
        <Image source={image} style={styles.img} />
        <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
                <MaterialCommunityIcons name="chevron-left" size={48} color="#0F2441" />
        </Pressable>
        <View style={styles.content}>
            <View style={styles.top}>
                <ViewJobHeader post={post}/>
                <CardProfile
                photo={post.homeowner_photo_url}
                distance={post.distance}
                firstName={post.homeowner_first_name}
                lastName={post.homeowner_last_name}
                id={post.homeowner_id}
                navigation={navigation}
                />
            </View>
            <View style={styles.middle}>
                <View style={styles.jobDescription}>
                    <Text style={styles.title}>Job Description</Text>
                    <ScrollView>
                      <Text style={styles.description}>
                          {post.description}
                      </Text>
                    </ScrollView>
                </View>

                <View style={styles.location}>
                    <Text style={styles.title}>Location</Text>
                    <Text style={styles.description}>
                      {
                        type==4?
                        (formatAddr(post)) : (<Text style={styles.description}>{post.distance.toFixed(2)} miles away from you</Text>)
                      }
                    </Text>

                </View>

                <View style={styles.wage}>
                    <View style={styles.hours}>
                        <Text style={styles.title}>Estimated Time</Text>
                        <Text style={styles.description}>{post.time_elapsed.hours} hrs</Text>
                    </View>
                    <View style={styles.pay}>
                        <Text style={styles.title}>You Will Recieve</Text>
                        <Text style={styles.description}>${((post.pay*.929)-.29).toFixed(2)}</Text>
                    </View>
                </View>

            </View>
            <View style={styles.bottom}>
                <View style={styles.pressable}>
                    <Pressable
                        style={({pressed}) => [
                        {
                            backgroundColor: pressed ? '#6DB3C8' : '#3A5273',
                        },
                        styles.button,
                        ]}
                        onPress={() => {
                            //console.log('FROM JOBPOSTING ============== ', wid, post.id)
                            onSubmit()
                        }}
                        disabled={true}>
                        <Text style={styles.buttonText}>
                        {
                          loading ?
                            <View style={styles.loading}>
                              <ActivityIndicator size="large" color="#EDF9FD"/>
                            </View> :

                            type==3 ? ("APPLIED") : ("YOU'RE HIRED!" )
                            }
                        </Text>
                    </Pressable>
                </View>
            </View>

        </View>
        <Footer navigation={navigation} route={'hirings'}></Footer>
    </View>
)
}

export default ViewJobAppliedHired;

const styles = StyleSheet.create({
container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6DB3C8',
  },
  content: {
    backgroundColor: '#F8F8F9',
    height: '83%',
    width: '100%',
    borderTopLeftRadius: 73,
    borderTopRightRadius: 73,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 40
  },
  top: {
    flex: 6,
  },
  middle: {
    flex: 9,
    paddingTop: 20
  },
  bottom: {
    flex: 1.5,
  },
  btn: {
    position: 'absolute',
    top: 20,
    left: 20,
  },
  img: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'transparent',
    height: 250,
    top: 0,
  },
  pressable: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
      fontSize: 24,
      fontWeight: '600',
      marginBottom: 1,
      color: '#3A5273'
  },
  description: {
    fontSize: 18,
    color: '#5C5C5C',
    fontWeight: '500',
    paddingLeft: 2,

  },
  defaultText: {
      fontSize: 14,
      fontWeight: "400",
      paddingTop: 20,
      paddingLeft: 5
  },
  jobDescription: {
    flex: 2
  },
  location: {
    flex: 1,
    marginTop: '0%'
  },
  wage: {
    flex: 1,
    flexDirection: 'row',
  },
  hours: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  pay: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  pressable: {
    flex: 1,
  },
  button: {
    borderRadius: 8,
    padding: 6,
    height: 60,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    alignSelf: 'center',
    borderRadius: 60,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: "400"
  },
  loading: {
    paddingTop: 9
  }
})
