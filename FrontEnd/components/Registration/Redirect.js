import React from 'react'
import { View, Text, Button, StyleSheet, Pressable } from 'react-native'

const Redirect = ({navigation, text, title, route}) => {
    return (
        <>
        <View style={styles.signInHeaderContainer}>
            <Text style={styles.signInHeader}>{title}</Text>
        </View>
        <View style={styles.signInBtn}>
             <Pressable style={{alignSelf: 'flex-start', paddingLeft: 20, paddingTop: 10}} onPress={() => navigation.push(route)}>
               <Text style={styles.signInBtnText}>{text}</Text>
            </Pressable>
        </View>
        </>

    )
}

export default Redirect;

const styles = StyleSheet.create({
    signInHeaderContainer: {
        width: '90%',
        paddingTop: 20
      },
      signInHeader: {
        display: 'flex',
        alignSelf: 'flex-start',
        fontSize: 18,
        color: '#fff',
      },
      signInBtn: {
        display: 'flex',
        width: '100%',
        alignSelf: 'flex-start'
      },
      signInBtnText: {
        color: '#102542',
        fontSize: 22,
        fontWeight: "500"
      },
      signInPressable: {
        alignSelf: 'flex-start',
        paddingLeft: 20,
        paddingTop: 10,
      },
})
