import React, {useState} from 'react'
import { StyleSheet, View, Text, Button, Pressable } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getIcon } from '../../utils/icons';
const EditJobHeader = ({ navigation, jobCategory, title, days, setModalVisible }) => {

    return (
        <View style={styles.card}>
            <View style={styles.top}>
              <View style={styles.left}>
                { getIcon(jobCategory) }
              </View>
              <View style={styles.middle}>
                <View style={{width:"100%"}}>
                    <Text style={styles.title}> {title} </Text>
                </View>
                <Text style={styles.time}> posted {days} days ago</Text>
              </View>
              <View style={styles.right}>
              <Pressable style={styles.btn} onPress={() => setModalVisible(true)}>
                <MaterialCommunityIcons name="trash-can" size={36} color="#d4372c"/>
                {/* <Text style={styles.btnText}> Delete </Text> */}
              </Pressable>
              </View>
            </View>
        </View>
    )
}

export default EditJobHeader;

const styles = StyleSheet.create({
    card: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      flex: 1,
    },
    top: {
      display: 'flex',
      flexDirection: 'row',
      paddingTop: 40,
      paddingLeft: 20,
      flex: 1,
      marginTop: "-5%"
    },
    left: {
      display: 'flex',
      flex: 1,
      marginTop: 3
    },
    middle: {
      display: 'flex',
      flex: 4,
      marginTop: 3
    },
    right: {
        flex: 2,
    },
    title: {
      display: 'flex',
      color: '#0F2441',
      fontSize: 28,
      fontWeight: '500',
      marginBottom: '-3%'
    },
    description: {
      paddingRight: 10,
      paddingLeft: 10,
      fontSize: 14,
      color: '#5C5C5C'
    },
    time: {
      fontSize: 15,
      fontWeight: '300',
      paddingLeft: 5,
      color: '#757575',
      paddingTop: 8
    },
    btn: {
        flexDirection: 'row',
        borderColor: 'rgba(235, 64, 52, .5)',
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 100,
        height: 60,
        width: 60
    },
    btnText: {
        color: '#eb4034',
        fontSize: 18
    }
  });
