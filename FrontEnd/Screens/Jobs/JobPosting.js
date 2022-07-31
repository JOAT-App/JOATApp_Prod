import { StyleSheet, Text, View, Button, Image, Pressable, ActivityIndicator, Keyboard, TouchableWithoutFeedback, ScrollView} from 'react-native';
import React, { useState, useEffect } from 'react'
import image from '../../assets/background2.png'
import {Footer, ConfirmModal} from '../../components/index.js'
import ViewJobHeader from '../../components/Cards/ViewJobHeader';
import {URL} from '../../utils/exports';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardProfile from '../../components/Cards/CardProfile';
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const ViewJob = ({ navigation, route }) => {
  const { id, post } = route.params
  const [ loading, setLoading ] = useState(false)
  const [ applied, setApplied ] = useState(false)
  const [ wid, setWid] = useState(null)
  const [isWorker, setIsWorker] = useState(false);
  const [complete, setComplete] = useState(false)
  const [note, setNote] = useState("")
  const [stripeVerified, setStripeVerified] = useState(false)
  const[visible, setVisible] = useState(false)
  console.log(post);

  const onSubmit = async e => {
    try {
      setLoading(true)
          const body = {'workerID': parseInt(wid), 'jobID': post.id, 'note': note }
          console.log('Body: Data',body)
          const token = await AsyncStorage.getItem('token')
          const bearerToken='Bearer '+ token;
          const response = await fetch(
            `${URL}/jobs/apply`,
            {
              method: "POST",
              headers: {
                "Authorization": bearerToken,
                "Content-type": "application/json"
              },
              body: JSON.stringify(body)
            }
          );
          const parseRes = await response.text()
          if (response.status === 200) {
            setLoading(false)
            setApplied(true)
            setTimeout(previousPage, 500)
          }
          console.log('from jobposting() response (should be null) => ', parseRes)
      } catch (error) {
        console.error('JobPosting.js ', error)
      }
  }

  const previousPage = () => {
    navigation.push('worker')
  }

  const getData = async e => {
      const workerID = await AsyncStorage.getItem('id')
      const temp = await AsyncStorage.getItem('stripeVerified')
      if (workerID != null) {
        setWid(workerID)
      }if(temp) {
        setStripeVerified(temp=='true')
      }

  }
  useEffect(() => {
    getData()
  },[])

  return (
      <View style={styles.container}>
      <StatusBar/>
        <ConfirmModal
          onConfirm={()=>{
            onSubmit();
            setVisible(false);
          }}
          onDismiss={()=>setVisible(false)}
          visible={visible}
          text={`Apply for ${post.title}?`}
          note={note}
          setNote={setNote}
          isApplicant={true}
          isDeleting={false}
        />
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
                    firstName={post.homeowner_first}
                    lastName={post.homeowner_last}
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
                      <Text style={styles.description}>This job is {post.distance.toFixed(2)} mi away from you.</Text>
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
                              if(stripeVerified){
                                setVisible(true)
                              }else{
                                navigation.push('stripeonboarding')
                              }
                          }}>
                          <Text style={[styles.buttonText, !stripeVerified ? {fontSize: 20, textAlign: 'center'} : null ]}>
                          {
                            loading ?
                              <View style={styles.loading}>
                                <ActivityIndicator size="large" color="#EDF9FD"/>
                              </View> :
                              !stripeVerified ? ('Please complete Stripe Onboarding to apply for jobs'):
                              !loading && !applied ? ('APPLY FOR THIS JOB') :
                              !loading && applied ? ('APPLIED!') :
                              null}
                          </Text>
                      </Pressable>
                  </View>
              </View>

          </View>
          <Footer navigation={navigation} route={'worker'}></Footer>
      </View>
)
}

export default ViewJob;

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
    flex: 2,
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
    flex: 2,
    marginBottom:'5%'
  },
  location: {
    flex: 1,
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
    flex: 2
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
