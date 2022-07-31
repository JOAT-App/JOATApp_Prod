import React, {useState} from 'react'
import { StyleSheet, View, Text, Button,Pressable } from 'react-native'
import {Modal, Portal} from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {URL} from '../../utils/exports'
import EditIcon from '../../assets/pencil.svg'
import { getIcon } from '../../utils/icons';

const Card = ({ navigation, post, type, isHomeowner }) => {
  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  console.log(post);

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

    const containerStyle = {
      backgroundColor: 'white',
      padding: 20,
      width:'60%',
      alignSelf: 'center'};


    return (
      <>
      <Portal>
       <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
         <Button
         title="Confirm"
         onPress={apply}
         style={{backgroundColor:'green', marginBottom:100}}
         />
         <Button
         title="Cancel"
         onPress={hideModal}
         />
       </Modal>
     </Portal>
        <View style={styles.card}>
          <View style={styles.cardContent}>
              <View style={styles.cardTop}>
                <View style={styles.cardLogo}>
                    { getIcon(post.job_category_id) }
                </View>
                <View style={styles.cardTitle}>
                    <Text style={styles.cardTitleText}>{post.title} </Text>
                    <Text style={styles.cardTitleTime}>Posted {post.time_elapsed.days} days ago</Text>
                </View>
                {
                  post.job_status_id < 3 &&
                  <View style={styles.cardEdit}>
                  <Pressable style={styles.btn}
                  onPress={()=>{
                    navigation.push('editjob', {id: post.id})}}>
                    <EditIcon />
                    </Pressable>
                    </View>
                }
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
        </>
    )
}

export default Card;

const styles = StyleSheet.create({
    card: {
      display: 'flex',
      justifyContent: 'center',
      width: '90%',
      backgroundColor: '#FFFFFF',
      height: 180,
      borderRadius: 25,
      marginTop: 8,
      marginBottom: 8,
      shadowColor: '#171717',
      shadowOffset: {width: 0.5, height: 0.5},
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
    },
    cardBottom: {
      color: '#11f',
      width: '100%',
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,
      flex: 5,
      paddingBottom: 8
    },
    cardBottomPressable: {
      backgroundColor: '#B7D8E2',
      paddingHorizontal: 10,
      borderRadius: 25,
      paddingTop: 6,
      paddingBottom: 6,
      alignItems: 'center',
      alignSelf: 'center',
      width: '60%'
    },
    cardBottomPressableText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: '700'
    },
    cardLogo: {
      display: 'flex',
      flex: 1,
      marginLeft: "3%",
      marginTop: '2%'
    },
    cardTitle: {
      display: 'flex',
      flex: 7,
      color: '#102542',
      fontSize: 20,
      marginTop: 2
    },
    cardEdit: {
      flex: 1,
      marginTop: 2
    },
    cardDescription: {
      paddingRight: 10,
      paddingLeft: 15,
      fontSize: 14,
      color: 'gray'
    },
    cardTitleTime: {
      fontSize: 14,
      fontWeight: '300',
      fontStyle: 'italic'
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
    btn: {
      backgroundColor: '#FFFFFF'
    }
  });
