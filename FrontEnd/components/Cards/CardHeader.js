import React, {useState} from 'react'
import { StyleSheet, View, Text, Button } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getIcon } from '../../utils/icons';

const CardHeader = ({ navigation, post }) => {

    return (
        <View style={styles.card}>
            <View style={styles.top}>
              <View style={styles.logo}>
                  { getIcon(post.job_category_id) }
              </View>
              <View style={styles.header}>
                  <Text style={styles.title}> {post.title} </Text>
                  <Text style={styles.time}> Posted {post.time_elapsed.days} days ago</Text>
              </View>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.description}>{post.description} </Text>
            </View>
        </View>
    )
}

export default CardHeader;

const styles = StyleSheet.create({
    card: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      height: 200
    },
    top: {
      display: 'flex',
      flexDirection: 'row',
      height: '40%',
      paddingVertical: 10
    },
    logo: {
      display: 'flex',
      flex: 1,
      marginRight:'-8%',
      marginLeft: '5%',
      marginTop:'2%'
    },
    header: {
      display: 'flex',
      flex: 5,
    },
    bottom: {
      width: '100%',
    },
    title: {
      display: 'flex',
      flex: 5,
      color: '#0F2441',
      fontSize: 36,
      fontWeight: '500'
    },
    description: {
      paddingRight: 10,
      paddingLeft: 10,
      fontSize: 14,
      color: '#5C5C5C'
    },
    time: {
      fontSize: 14,
      fontWeight: '300',
      paddingLeft: 5,
      color: '#757575'
    },
  });
