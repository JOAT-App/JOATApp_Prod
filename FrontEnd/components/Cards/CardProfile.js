import React from 'react'
import {StyleSheet, Text, View, Pressable, Image} from 'react-native'
import {StreamChat} from 'stream-chat'
import { STREAM_API_KEY } from '../../utils/exports'
import AsyncStorage from '@react-native-async-storage/async-storage';

const CardProfile = ({photo, firstName, lastName, distance, navigation, id }) => {

    const chatClient = StreamChat.getInstance(STREAM_API_KEY);

    async function createChatRoom() {
        const id_ = await AsyncStorage.getItem('id');
        console.log(id_.toString(),id.toString())
        const channel = chatClient.channel('messaging',{
          members: [id.toString(),id_.toString()]
        });
        const name = firstName+' '+lastName
        const otherUser = {
          name: name,
          image: photo
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
            <View style={styles.left}>
                <Image
                source={{uri: photo}}
                style={styles.photo}
                />
            </View>
            <View style={styles.right}>
                <View>
                    <Text style={styles.nameText}> {firstName} {lastName}</Text>
                </View>
                {
                  distance &&
                  <View style={styles.distance}>
                    <Text style={styles.distanceText}>{distance.toFixed(2)} {'\n'}miles away</Text>
                  </View>
                }
                <View style={{ flexDirection:'row', justifyContent:'center'}}>
                    <Pressable style={[styles.pressable, {marginBottom:'2%'}]} onPress={() => createChatRoom()}>
                      <Text style={styles.pressableText}>Message {firstName}</Text>
                    </Pressable>
                    <Pressable style={styles.pressable} onPress={() => navigation.push('otheruserprofile', {id: id})}>
                        <Text style={styles.pressableText}>View Profile</Text>
                    </Pressable>
                </View>
            </View>
      </View>
    )
}

export default CardProfile

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFFFFF',
        flex: 1.7,
        flexDirection: 'row',
        borderRadius: 25,
        shadowColor: '#D1D1D1',
        shadowRadius: 30,
        shadowColor: '#171717',
        shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    left: {
        flex: 1,
        alignSelf: 'center'
    },
    right: {
        flex: 3,
        justifyContent: 'space-evenly'
    },
    photo: {
        borderRadius: 100,
        height: 80,
        width: 80,
        backgroundColor: '#E25E32',
        marginLeft: 10
    },
    name: {

    },
    nameText: {
        color: '#102542',
        fontWeight: '600',
        fontSize: 24,
    },
    distance: {
    },
    distanceText: {
        color: '#757575',
        paddingLeft: 4,
        fontSize: 16
    },
    pressable: {
        paddingVertical:"3%",
        paddingHorizontal: 10,
        backgroundColor: '#D0E9F0',
        width: '40%',
        alignSelf: 'flex-end',
        borderRadius: 25,
        marginRight: 20,
        marginBottom: 5
    },
    pressableText: {
        fontWeight: '600',
        color: '#3A5273',
        alignSelf: 'center',
    }
})
