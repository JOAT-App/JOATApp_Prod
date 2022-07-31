import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from 'react-native'
import {Title} from 'react-native-paper'
import { StatusBar } from 'expo-status-bar';
import image from '../../../assets/background2.png'
import CardHeader from '../../../components/Cards/CardHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CardApplicant from '../../../components/Cards/CardApplicant';
import userLookup from '../../../utils/userLookup';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {URL} from '../../../utils/exports';
import { getIcon } from '../../../utils/icons';

const Applicants =  ({ navigation, route }) => {
    const [ applicants, setApplicants ] = useState([])
    const [ loading, setLoading ] = useState(true)
    const [showDescription, setShowDescription] = useState(false);
    var {id, post}= route.params;
    const afterLoad = async e => {
        try {
          const token = await AsyncStorage.getItem('token')
          const bearerToken='Bearer '+ token;
          const response = await fetch(
            `${URL}/jobs/getApplicants/${id}`,
            {
              method: "GET",
              headers: {
                "Authorization": bearerToken,
                "Content-type": "application/json"
              }
            }
          );
          console.log(response);
          const parseRes = await response.json()
          console.log('onLoad response => ', parseRes)
          setApplicants(parseRes)
        } catch (error) {
          console.error('Worker.js afterLoad() => ', error)
        }
      }
    useEffect(() => {
      afterLoad()
      setLoading(false)
    },[])

    return (
        <View style={styles.container}>
          <StatusBar/>
          <Image source={image} style={styles.img} />
          <Pressable style={styles.backBtn} onPress={() => navigation.goBack()}>
            <MaterialCommunityIcons name="chevron-left" size={48} color="#0F2441" />
          </Pressable>
            <View style={styles.content}>
            <View style={styles.card}>
                <View style={styles.top}>
                  <View style={{marginTop:'2.5%'}}>
                  { getIcon(post.job_category_id) }
                  </View>
                  <View style={styles.header}>
                      <Text style={styles.title}> {post.title} </Text>
                      <Text style={styles.time}> Posted {post.time_elapsed.days} days ago</Text>
                  </View>
                </View>
                <View style={styles.bottom}>
                  <View style={{flexDirection:'row'}}>
                    <Text style={{
                      fontSize: 24,
                      fontWeight: '500'
                    }}> Job Description </Text>
                    <Pressable  style={{marginTop:'-1%'}} onPress={() => setShowDescription(!showDescription)}>
                    {
                      showDescription ?
                      <MaterialCommunityIcons name="chevron-up" size={38} color="#0F2441" /> :
                      <MaterialCommunityIcons name="chevron-down" size={38} color="#0F2441" />
                    }
                    </Pressable>
                  </View>
                  {
                    showDescription &&
                    <Text style={styles.description}>{post.description} </Text>
                  }
                </View>
            </View>
                <Text style={styles.title}>Applicants</Text>
                <ScrollView>
                { !loading && applicants.length != 0 ? applicants.map(applicant => {
                    return (
                            <CardApplicant
                            applicant={applicant}
                            key={applicant.id}
                            navigation={navigation}
                            jobId={id}/>
                    )
                }) :
                <View style={{flexDirection: 'column', alignItems: 'center', marginTop: '5%'}}>
                  <Title style={{ color: '#757575', fontWeight: "500"}}> No one has applied to this job yet </Title>
                  <Text style={{ color: '#757575'}}>Please check back later</Text>
                </View>
                }
                </ScrollView>



            </View>
        </View>
    )
}

export default Applicants;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#6DB3C8'
      },
      img: {
        position: 'absolute',
        width: '100%',
        backgroundColor: 'transparent',
        height: 250,
        top: 0,
      },
      content: {
          flex: 1,
          backgroundColor: '#F8F8F9',
          marginTop: 70,
          width: '100%',
          borderTopLeftRadius: 73,
          borderTopRightRadius: 73,
          paddingLeft: 20,
          paddingRight: 20,
          paddingBottom: 60
      },
      pressable: {
        position: 'absolute',
        top: 40,
        left: 20,
      },
      btn: {
        borderRadius: 8,
        padding: 6,
        justifyContent: 'center',
        alignItems: 'flex-start',
        elevation: 5,
        alignSelf: 'flex-start',
        backgroundColor:'blue'
      },
      title: {
          fontSize: 24,
          fontWeight: '500',
          marginBottom: 8,
          paddingLeft: 3,
          marginTop: '8%'
      },
      defaultText: {
          fontSize: 14,
          fontWeight: "400",
          paddingTop: 20,
          paddingLeft: 5
      },
      backBtn: {
        position: 'absolute',
        top: 20,
        left: 20,
      },
      top:{
        flexDirection: 'row',
        marginLeft:'4%',
        marginTop:'2%'
      },
      time: {
        fontSize: 14,
        fontWeight: '300',
        color: '#757575',
        marginTop:'-4%',
        marginBottom:'4%'
      },

})
