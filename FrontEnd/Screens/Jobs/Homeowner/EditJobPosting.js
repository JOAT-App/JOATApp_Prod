import {
  StyleSheet,
  Text,
  View,
  Button,
  Image,
  Pressable,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react'
import { StatusBar } from 'expo-status-bar';
import image from '../../../assets/background2.png'
import {Footer, ConfirmModal, LoadingScreen} from '../../../components/index.js'
import EditJobHeader from '../../../components/Cards/EditJobHeader';
import {URL} from '../../../utils/exports';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditIcon from '../../../assets/pencil.svg'
import {MaterialCommunityIcons} from '@expo/vector-icons';

const EditJob = ({navigation, route}) => {
  const {id} = route.params
  const [loading, setLoading] = useState(true)
  const [loadingEdits, setLoadingEdits] = useState(false)
  const [editSent, setEditSent] = useState(false)
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [pay, setPay] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [displayHours, setDisplayHours] = useState('');
  const [displayMins, setDisplayMins] = useState('')
  const [ jobCategory, setJobCategory ] = useState(0)
  const [ days, setDays ] = useState(1)
  const [deleted, setDeleted] = useState(false)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [deleteDisabled, setDeleteDisabled] = useState(false);
  const [modalVisible, setModalVisible] = useState(false)
  const [hoursFlag, setHoursFlag] = useState(false)

  const previousPage = () => {
    navigation.goBack()
  }

  const deleteJob = async () => {
    try {
      console.log("hello");
      const token = await AsyncStorage.getItem('token')
      const bearerToken = 'Bearer ' + token;
      const response = await fetch(`${URL}/jobs/delete/${id}`, {
        method: "DELETE",
        headers: {
          "Authorization": bearerToken
        }
      });
      const status = response.status;
      console.log(status);
      if (status === 200) {
        alert('Your Job has been delted');
        navigation.replace('homeowner');
      }
    } catch (error) {
      console.error('EditJob.js ', error)
    }
  }

  const sendEdits = async () => {
    try {
      const mins = parseInt(minutes) + 60 * parseInt(hours);
      const payload = {
        description: description,
        pay: Number(pay).toFixed(2),
        jobID: id,
        minutes: mins
      }
      console.log(payload);
      const token = await AsyncStorage.getItem('token')
      const bearerToken = 'Bearer ' + token;
      const response = await fetch(`${URL}/jobs/update`, {
        method: "PUT",
        headers: {
          "Authorization": bearerToken,
          "Content-type": "application/json"
        },
        body: JSON.stringify(payload)
      });
      const status = response.status;
      if (status == 200) {
        // alert('Job Has successfulyl been Updated');
        navigation.replace('homeowner')
      } else {
        console.log(status);
        alert("Something went wrong, please try again")
        navigation.replace('editjob', {id: id})
      }
    } catch (e) {
      console.error(e);
    }
  }

  const getData = async e => {
    try {
      const token = await AsyncStorage.getItem('token')
      const bearerToken = 'Bearer ' + token;
      const parseRes = await fetch(`${URL}/jobs/getById/${id}`, {
        method: "GET",
        headers: {
          "Authorization": bearerToken
        }
      });
      const job = await parseRes.json();
      console.log('FROM EDITJOBPOSTING.JS ->',job);
      setTitle(job.title);
      setPay(job.pay);
      setDescription(job.description);
      setHours(Math.floor(job.minutes / 60));
      setMinutes(job.minutes % 60);
      setDisplayMins(String(job.minutes % 60))
      setDisplayHours(String(Math.floor(job.minutes / 60)))
      setDays(job.time_elapsed.days)
      setJobCategory(job.job_category_id)
      console.log('jobid',job.job_category_id);
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => {
    getData();
    console.log(minutes);
    setLoading(false)
  }, [])

  return loading ? (
    <LoadingScreen/>
  )
    : (
      <View style={styles.container}>
        <StatusBar/>
        <Image source={image} style={styles.img}/>
        <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={48} color="#0F2441"/>
        </Pressable>
        <ConfirmModal
                  onConfirm={()=>{
                    deleteJob();
                    setModalVisible(false);
                  }}
                  onDismiss={()=>setModalVisible(false)}
                  visible={modalVisible}
                  text={`Delete Job`}
                  isDeleting={true}
        />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.content}>
            <View style={styles.top}>
              <EditJobHeader jobCategory={jobCategory} title={title} days={days} setModalVisible={setModalVisible}/>
            </View>
            <View style={styles.middle}>
              <View style={styles.jobDescription}>
                <View style={styles.jobDescriptionHeader}>
                  <Text style={styles.title}>Edit Job Description </Text>
                  <View style={styles.pencil}>
                    <EditIcon/>
                  </View>
                </View>
                  <TextInput
                    value={description}
                    style={styles.description}
                    multiline={true}
                    onChangeText={(text) => {
                      setDescription(text)
                    }}/>
              </View>
              <View style={styles.wage}>
                  <View style={styles.hours}>
                    <View style={styles.hoursHeader}>
                      <Text style={styles.title}>Time</Text>
                      <View style={styles.pencil}>
                        <EditIcon/>
                      </View>
                    </View>
                      {/* <Text style={styles.description}>{hours} hrs</Text> */}
                      <View style={{flexDirection: 'row'}}>
                        <TextInput style={styles.description} onEndEditing={() => {
                            const temp = parseInt(displayHours);
                            console.log('hrs: ', + temp);
                            if (temp != null && temp < 20 && temp > -1) {
                              setDisplayHours(temp);

                            } else {
                              setDisplayHours(hours)
                              setHoursFlag(true)
                              setTimeout(function() {
                                setHoursFlag(false)
                              }, 4000)
                            }
                          }}
                          onChangeText={(text) => {
                            setDisplayHours(text);
                          }}
                          defaultValue={String(hours)}
                          value={displayHours}
                          keyboardType="numeric"
                          returnKeyType="done"
                          maxLength={2}/>
                      <Text style={styles.dollar}> hrs</Text>
                      </View>
                      {
                        hoursFlag ?
                        (<View>
                          <Text style={styles.hoursFlag}>Hours cannot exceed 20.</Text>
                        </View>) : null
                      }


                  </View>
                  <View style={styles.pay}>
                    <View style={styles.payHeader}>
                      <Text style={styles.title}>You Will Pay</Text>
                      <View style={styles.payPencil}>
                        <EditIcon/>
                      </View>
                    </View>

                    <View style={{flexDirection: 'row'}}>
                      <Text style={styles.dollar}>$</Text>
                      <TextInput
                      style={styles.description}
                      onChangeText={(text)=>{
                        setPay(parseInt(text));
                      }}
                      defaultValue={String(pay)}
                      keyboardType="numeric"
                      returnKeyType="done"
                      maxLength={2}
                    />
                    </View>

                  </View>
              </View>
            </View>
              {/* <View style={styles.jobDescription}>
                <ConfirmModal
                  onConfirm={()=>{
                    deleteJob();
                    setModalVisible(false);
                  }}
                  onDismiss={()=>setModalVisible(false)}
                  visible={modalVisible}
                  text={`Delete for all eternity?`}
                />
                <Text style={[styles.title,
                    {
                      alignSelf: 'flex-start',
                      marginBottom: '1%'
                    }]}>
                    Edit Job Description:
                </Text>
                <View style={{
                    width: '80%',
                    borderColor: 'black',
                    borderWidth: 1
                  }}>
                  <TextInput
                    value={description}
                    multiline={true}
                    onChangeText={(text) => {
                      setDescription(text)
                    }}/>
                </View>
                <View style={{
                    marginTop: "10%",
                    alignSelf: 'center'
                  }}>
                  <View style={styles.hours}>
                    <View>
                      <Text style={styles.title}>Hours</Text>
                      <TextInput style={styles.numericInput} onEndEditing={() => {
                          const temp = parseInt(displayHours);
                          console.log(temp);
                          if (temp != null && temp < 20 && temp > -1) {
                            setHours(temp);
                          } else {
                            setDisplayHours(hours)
                          }
                        }}
                        onChangeText={(text) => {
                          setDisplayHours(text);
                        }}
                        defaultValue={String(hours)}
                        value={displayHours}
                        keyboardType="numeric"
                        returnKeyType="done"
                        maxLength={2}/>
                    </View>
                    <View style={{
                        marginLeft: "20%"
                      }}>
                      <Text style={styles.title}>Minutes</Text>
                      <TextInput style={styles.numericInput} onEndEditing={() => {
                          const temp = parseInt(displayMins);
                          console.log(temp);
                          if (temp != null && temp < 60 && temp > -1) {
                            setMinutes(displayMins);
                          } else {
                            setDisplayMins(minutes)
                          }
                        }}
                        onChangeText={(text) => {
                          setDisplayMins(text);
                        }}
                        defaultValue={String(minutes)}
                        value={displayMins}
                        keyboardType="numeric"
                        returnKeyType="done"
                        maxLength={2}
                      />
                    </View>
                  </View>
                  <View>
                    <View style={{alignItems:'center', justifyContent: 'center', paddingRight: '25%', marginTop: '5%'}}>
                      <Text style={styles.title}>Pay</Text>
                      <TextInput
                      style={styles.numericInput}
                      onChangeText={(text)=>{
                        setPay(parseInt(text));
                      }}
                      defaultValue={String(pay)}
                      keyboardType="numeric"
                      returnKeyType="done"
                      maxLength={2}
                      />
                    </View>
                  </View>
                </View>
              </View> */}



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
                              sendEdits()
                              setLoadingEdits(true)
                          }}>
                          <Text style={styles.buttonText}>
                          {
                            loadingEdits ?
                              <View style={styles.loading}>
                                <ActivityIndicator size="large" color="#EDF9FD"/>
                              </View> :

                              !loadingEdits ? ('SAVE CHANGES') :
                              editSent && loadingEdits ? ('APPLIED!') :
                              null}
                          </Text>
                      </Pressable>
                  </View>
              </View>
          </View>
        </TouchableWithoutFeedback>

    <Footer navigation={navigation} route={'worker'}/>
  </View>
)
}

export default EditJob;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6DB3C8'
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
    flex: 4
  },
  middle: {
    flex: 9,
    paddingTop: 20,
    flexDirection: 'column'
  },
  bottom: {
    flex: 1
  },
  btn: {
    position: 'absolute',
    top: 25,
    left: 20
  },
  img: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'transparent',
    height: 250,
    top: 0
  },
  pressable: {
    position: 'absolute',
    top: 40,
    left: 20
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#3A5273',
    alignSelf: 'flex-start'
  },
  description: {
    fontSize: 24,
    color: '#5C5C5C',
    fontWeight: '500',
    paddingLeft: 2,
    paddingTop: 4
  },
  defaultText: {
    fontSize: 14,
    fontWeight: "400",
    paddingTop: 20,
    paddingLeft: 5
  },
  jobDescriptionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  jobDescription: {
    flex: 2
  },
  pencil: {
    paddingRight: 10,
  },
  wage: {
    flex: 3,
    flexDirection: 'row',
  },
  hours: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'flex-start',
  },
  pay: {
    flex: 1,
    alignItems: 'flex-start',
  },
  dollar: {
    fontSize: 24,
    color: '#5C5C5C',
    fontWeight: '500',
    paddingTop: 5
  },
  hoursHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  payHeader: {
    display: 'flex',
    flexDirection: 'row',
  },
  payPencil: {
    paddingLeft: 40
  },
  pressable: {
    flex: 1
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
    borderRadius: 60
  },
  textInput: {
    backgroundColor: 'grey',
    borderWidth: 10,
  },
  numericInput: {
    marginBottom: 10,
    borderBottomWidth: 2,
    fontSize: 24
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: "400"
  },
  loading: {
    paddingTop: 9
  },
  hoursFlag: {
    fontSize: 16,
    color: 'red',
    paddingLeft: 3
  }
})
