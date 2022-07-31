import React, { useState } from 'react'
import { StyleSheet, Text, View, Modal, Pressable, Image } from 'react-native'
import { Avatar } from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {HireModal}  from '../index.js'
import { STREAM_API_KEY } from '../../utils/exports.js';
import { StreamChat } from 'stream-chat'
import AsyncStorage from '@react-native-async-storage/async-storage';
const chatClient = StreamChat.getInstance(STREAM_API_KEY);

const CardApplicant = ({ applicant, jobId, navigation}) => {
    const [pressed, setPressed ] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    console.log(applicant);
    const togglePressed = () => {
        setPressed(prev => !prev)
    }
    async function createChatRoom() {
        const id_ = await AsyncStorage.getItem('id');
        console.log(id_.toString(),applicant.id.toString())
        const channel = chatClient.channel('messaging',{
          members: [applicant.id.toString(),id_.toString()]
        });
        const name = applicant.first_name+' '+applicant.last_name
        const otherUser = {
          name: name,
          image: applicant.photo_url
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
    return (
        <View style={styles.container}>
            <View style={styles.info}>
            <HireModal
              onConfirm={()=>{
                navigation.push('paymentScreen', {jobID:jobId, workerID: applicant.id});
                setModalVisible(!modalVisible);
              }}
              onDismiss={()=>setModalVisible(!modalVisible)}
              visible={modalVisible}
              text={`Hire ${applicant.first_name} ${applicant.last_name}?`}
            />
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              isDeleting={false}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => {
                  console.log(jobId);
                  navigation.push('paymentScreen', {jobID:jobId, workerID: applicant.id})
                }
              }
              >
                <Text style={styles.textStyle}>Confirm Hiring</Text>
              </Pressable>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}
              >
                <Text style={styles.textStyle}>Cancel</Text>
              </Pressable>
          </View>
        </View>
      </Modal>
                <Image
                    source={{ uri: applicant.photo_url}}
                    style={styles.img}
                    size={90}
                />
                <View style={styles.infoContent}>
                <View style={{flexDirection: 'column'}}>
                    <Text style={styles.name}>{applicant.first_name + ' ' + applicant.last_name}</Text>
                    <Pressable style={styles.pressableProfile} onPress={()=>{navigation.push('otheruserprofile', {id: applicant.id})}}>
                      <Text style={styles.pressableText}>View Profile</Text>
                    </Pressable>
                    </View>
                    <Pressable style={styles.pressed} onPress={() => togglePressed()}>
                        { pressed ?
                        <MaterialCommunityIcons name="chevron-up" size={30} color="#757575"/>
                        :
                        <MaterialCommunityIcons name="chevron-down" size={30} color="#757575"/>}
                    </Pressable>
                </View>

                {/* <Text style={styles.distance}>{applicant.distance} mi</Text> */}
            </View>
            { pressed &&
                <View style={styles.expandable}>
                    <Text style={styles.bioHeader}>Personal Bio</Text>
                    <Text style={styles.bioDescription}>{applicant.bio}</Text>
                    <Text style={styles.bioHeader}>Note</Text>
                    <Text style={styles.bioDescription}>{applicant.note}</Text>
                    {
                      // <Text style={styles.bioHeader}>Jobs Completed</Text>
                      // <Text style={styles.bioDescription}>{applicant.completed}</Text>
                    }
                </View>
            }
            <View style={styles.pressableContainer}>
              <Pressable style={styles.pressableHire} onPress={()=>{setModalVisible(true);}}>
                <Text style={styles.pressableText}>Hire {applicant.first_name}</Text>
              </Pressable>
                <Pressable style={styles.pressable} onPress={()=>createChatRoom()}>
                    <Text style={styles.pressableText}>Message {applicant.first_name}</Text>
                </Pressable>
            </View>

        </View>
    )
}

export default CardApplicant

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        width: '100%',
        backgroundColor: '#fff',
        padding: 10,
        borderRadius: 20,
        paddingTop: 20,
        marginBottom: 12
    },
    info: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    name: {
        fontSize: 22,
        fontWeight: '500',
        paddingTop: 5,
        paddingLeft: 5,
    },
    pressed: {
        paddingTop: 2
    },
    img: {
        height: 90,
        width: 90,
        borderRadius: 100
    },
    infoContent: {
        display: 'flex',
        flexDirection: 'row',
        flex: 4,
        marginTop: 10,
        marginLeft: 5
    },
    distance: {
        flex: 1,
        fontSize: 14,
        fontWeight: '300',
        alignSelf: 'flex-start',
        paddingTop: 2
    },
    pressableContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: '5%',
        paddingRight:'5%',
        flexDirection: 'row'
    },
    pressable: {
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: '#D0E9F0',
        width: '40%',
        borderRadius: 25,
        alignItems: 'center',
    },
    pressableHire: {
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: '#95e6a8',
        width: '40%',
        borderRadius: 25,
        alignItems: 'center',
    },
    pressableProfile: {
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
        backgroundColor: '#D0E9F0',
        width: 200,
        borderRadius: 25,
        alignItems: 'center',
    },
    pressableText: {
        color: '#3A5273',
        fontSize: 15,
        fontWeight: '500'
    },
    expandable: {
        paddingRight: 20,
        paddingBottom: 10
    },
    bioHeader: {
        color: '#3A5273',
        fontSize: 17,
        fontWeight: "500",
        paddingBottom: 3
    },
    bioDescription: {
        color: '#000',
        fontSize: 14,
        paddingLeft: 24,
        paddingBottom: 4
    },
    modalView: {
    margin: 20,
    alignSelf: 'center',
    justifyContent:'center',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
   backgroundColor: "#F194FF",
 },
 buttonClose: {
   backgroundColor: "#FF0000",
 },

})
