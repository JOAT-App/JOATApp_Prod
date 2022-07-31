import React, { useState } from 'react'
import { StyleSheet, Text, View,  Image, Pressable, ScrollView } from 'react-native'
import { StatusBar } from 'expo-status-bar';

import  Button from 'react-native-button';
const screens = [
  "login",
  "confirmAccount",
  "userform",
  "home",
  "worker",
  "applicants",
  "homeowner",
  "jobposting",
  "messages",
  "profile",
  "schedule",
  "jobreview",
  "forgotpassword",
  "jobform",
  "hirings",
  "paymentScreen",
  "otheruserprofile",
  "EditProfile",
  "stripeonboarding"
];

// insert post into props here
const ScreenDir = ({ navigation }) => {

    return (
        <View style={styles.container}>
        <StatusBar/>
            <View>
                {
                  screens.map((screen, id) => {
                  //console.log(screen);
                    return (
                      <Button key={id}
                      onPress={() => navigation.push(screen)}
                      style={{
                        fontSize: 20,
                        marginTop: 5,
                        color: 'white'
                      }}
                      >
                      {screen}
                      </Button>
                    )
                })
              }
            </View>
        </View>
    )
}
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
        paddingBottom: 60,
    },
    pressable: {
      position: 'absolute',
      top: 40,
      left: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: '500',
        marginBottom: 8,
        paddingLeft: 3,
    },
    defaultText: {
        fontSize: 14,
        fontWeight: "400",
        paddingTop: 20,
        paddingLeft: 5
    }
})

export default ScreenDir;
