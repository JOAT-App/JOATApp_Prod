import {Profile, Calendar, Home,Messages, PostJob, Hirings} from './FooterComponents/index.js'
import React, {useState, useEffect} from 'react'
import { StyleSheet,View} from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';
const Footer = (props) =>{
  const [type,setType] = useState(0);
  const [loading, setLoading] = useState(true)
  const getType=async()=>{
    const userType =await  AsyncStorage.getItem('userType');
    setType(userType);
    setLoading(false);
  }
  useEffect(()=>{
    getType();
  }, [])
  return loading ? (null):(
    <View style={ styles.bottomBar}>
      <View style={ styles.bottomBarButtons}>
        <Home navigation={props.navigation} route={props.route} type={type}/>
        <Messages navigation={props.navigation} route={props.route}/>
        {

          (type==2 || type ==4 ) ?
            <PostJob navigation={props.navigation} route={props.route} />
          : (type==1 || type == 3) ?
            <Hirings navigation={props.navigation} route={props.route} />
          : (type==5) ?
          <>
            <Hirings navigation={props.navigation} route={props.route} />
            <PostJob navigation={props.navigation} route={props.route} />
          </>
          : null
        }
        <Profile navigation={props.navigation} route={props.route}/>
      </View>
    </View>
  )
}
export default Footer;

const styles = StyleSheet.create({
    bottomBar: {
      position: 'absolute',
      bottom: 0,
      height: 80,
      width: '100%',
      backgroundColor: "#fff",
    },
    bottomBarButtons: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignSelf: 'center',
      justifyContent: 'center',
      width: '90%',
      marginTop: -8,
      justifyContent : 'space-between'
    }
  });
