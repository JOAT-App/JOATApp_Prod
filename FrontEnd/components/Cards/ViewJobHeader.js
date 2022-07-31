import React, {useState} from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getIcon } from '../../utils/icons';
const ViewJobHeader = ({ navigation, post }) => {

    return (
        <View style={styles.card}>
            <View style={styles.top}>
              <View style={styles.logo}>
                  { getIcon(post.job_category_id) }
              </View>
              <View style={styles.header}>
              <View style={{width:"100%"}}>
                  <Text style={styles.title}> {post.title} </Text>
              </View>
              <Text style={styles.time}> posted {post.time_elapsed.days} days ago</Text>
              </View>
            </View>
        </View>
    )
}

export default ViewJobHeader;

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
    logo: {
      display: 'flex',
      flex: 1,
      marginLeft: '8%',
      marginRight: '-5%',
      marginTop:'1%'
    },
    header: {
      display: 'flex',
      flex: 5,
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
  });
