import React, {useState} from 'react'
import { StyleSheet, View, Text, Button,Pressable } from 'react-native'
import {Modal, Portal} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL} from '../../utils/exports'
import {getIcon} from '../../utils/icons.js'

const Card = ({ navigation, post, type, isHomeowner }) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

    const apply = async()=>{
      try {
        const id = await AsyncStorage.getItem('id');
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
            body: JSON.stringify({
            jobID: post.id,
            workerID: id
            })
          }
        );
        const status = await response.status;
        if(status==200){
          hideModal();
          navigation.push('worker');
        }else{
          alert("Something has gone wrong. Please try again")
        }
      } catch (error) {
        console.error('Worker.js afterLoad() => ', error)
      }
    };

    return (
        <View style={styles.card}>
          <View style={styles.cardContent}>
              <View style={styles.cardTop}>
              {
                <View style={styles.cardLogo}>
                    { getIcon(post.job_category_id) }
                </View>
              }
                <View style={styles.cardTitle}>
                <View style={{width:"100%",  paddingLeft: 5}}>
                    <Text style={styles.cardTitleText}>{post.title} </Text>
                </View>
                    <Text style={styles.cardTitleTime}>Posted {post.time_elapsed.days} days ago</Text>
                </View>
              </View>
              <View style={styles.cardMiddle}>
                  <Text style={styles.cardDescription}>{post.description} </Text>
              </View>
            <View style={styles.cardBottom}>
            {type == 0 ? (
              <Pressable style={styles.cardBottomPressable} onPress={() => navigation.push('jobposting', {id: post.id, post: post})}>
                <Text style={styles.cardBottomPressableText}>View Job</Text>
              </Pressable>
            ) : type==1 ? (
              <Pressable style={styles.cardBottomPressable} onPress={() => navigation.push('jobpostinghomeowner', {id: post.id, post: post})}>
              <Text style={styles.cardBottomPressableText}>View Job</Text>
              </Pressable>
            ) : type == 2 ?
            (
              <Pressable style={styles.cardBottomPressable} onPress={()=> navigation.push('applicants', {id: post.id, post: post})}>
                <Text style={styles.cardBottomPressableText}>View Applicants</Text>
              </Pressable>
            ):  (type == 3 || type==4) ? (
              <Pressable style={styles.cardBottomPressable} onPress={() => navigation.push('jobpostingappliedhired', {id: post.id, post: post, type: type})}>
                <Text style={styles.cardBottomPressableText}>View Job</Text>
              </Pressable>
            ) :(null)
          }
          </View>
          </View>
        </View>
    )
}

export default Card;

const styles = StyleSheet.create({
    card: {
      display: 'flex',
      justifyContent: 'center',
      width: 200,
      backgroundColor: '#FFFFFF',
      height: 180,
      borderRadius: 25,
      marginTop: 5,
      marginBottom: 5,
      marginRight: 15,
      shadowColor: '#171717',
      shadowOffset: {width: 0, height: 0},
      shadowOpacity: 0.2,
      shadowRadius: 2,
    },
    cardContent: { //check this mispell
      paddingLeft: 5,
      paddingRight: 5,
      flex: 1
    },
    cardTop: {
      display: 'flex',
      flexDirection: 'row',
      height: '40%',
      paddingVertical: 10,
      flex: 6,
    },
    cardMiddle: {
      flex: 8,
      marginTop: '2%'
    },
    cardBottom: {
      color: '#fff',
      width: '100%',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      flex: 5
    },
    cardBottomPressable: {
      backgroundColor: '#B7D8E2',
      paddingHorizontal: 10,
      borderRadius: 25,
      paddingTop: 6,
      paddingBottom: 6,
      alignItems: 'center',
      alignSelf: 'center'
    },
    cardBottomPressableText: {
      color: '#fff',
      fontSize: 17,
      fontWeight: '700'
    },
    cardLogo: {
      display: 'flex',
      flex: 2,
      marginLeft: '5%',
      marginRight: '-3%',
      marginTop:'3%'
    },
    cardTitle: {
      display: 'flex',
      flex: 7,
      color: '#102542',
      marginTop: 2,
    },
    cardDescription: {
      paddingRight: 10,
      paddingLeft: 10,
      fontSize: 14,
      color: 'gray'
    },
    cardTitleTime: {
      fontSize: 14,
      fontWeight: '300',
      paddingLeft: 5,
      fontStyle: 'italic'
    },
    cardTitleText: {
      fontSize: 18,
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
    }
  });
