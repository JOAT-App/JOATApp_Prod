import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, ScrollView, View, SafeAreaView, ImageBackground, FlatList} from 'react-native';
import {Footer, LoadingScreen} from '../../components/index.js'
import {ChannelList, Chat, OverlayProvider } from 'stream-chat-expo'
import { StreamChat } from 'stream-chat'
import { STREAM_API_KEY } from '../../utils/exports.js';
import image from '../../assets/background2.png'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';


const client = StreamChat.getInstance(STREAM_API_KEY);

const Messages=({navigation})=>{
  const [ scrollEnabled, setScrollEnabled ] = useState(true)
  const [ name, setName ] = useState('')
  const [id, setId] = useState(null)
  const [strId, setStrId] = useState('')
  const [loading, setLoading] = useState(true);

  const fetchName = async() => {
    const name = await AsyncStorage.getItem('fname')
    const id = await AsyncStorage.getItem('id')
    setId(id)
    setStrId(id+'')
    console.log("ID"+strId);
    if(name != ''){
      setName(name)
    }
  }
  const onSelect = async(channel) =>{
    const resp = await channel.queryMembers({});
    const userArr = [resp.members[0].user, resp.members[1].user]
    const otherUser = userArr[0].id == id ? userArr[1] : userArr[0]
    navigation.navigate('ChatRoom', {
      channel: channel,
      chatClient: client,
      otherUser: otherUser
    });
  }
  useEffect(() => {
    fetchName()
    setLoading(false)
  }, [])

    return (loading || strId=='') ? (
      <View>
      <StatusBar/>
        <LoadingScreen/>
      </View>
    ): (
    <SafeAreaView style={styles.container} scrollEnabled={scrollEnabled}>
    <StatusBar/>
      <View style={styles.scroll}>
        <ImageBackground source={image} resizeMode="cover" style={styles.containerHeader}>
          <Text style={styles.greeting}>Hello {name}. </Text>
        </ImageBackground>
        <View style={styles.innerScroll}>
          <OverlayProvider style={styles.scroll}>
            <Chat client={client}>
              <ChannelList
                LoadingIndicator={LoadingScreen}
                filters={{members: {$in:[strId]}}}
                onSelect={channel => {
                  onSelect(channel)
                }} />
            </Chat>
          </OverlayProvider>
        </View>
      </View>
      <Footer navigation={navigation} route={'messages'}></Footer>
    </SafeAreaView>
  )
}

export default Messages;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scroll: {
    flex: 1,
    backgroundColor: '#F8F8F9',
    marginTop: '-20%'
  },
  innerScroll: {
    flex: 1,
    borderTopRightRadius: 73,
    borderTopLeftRadius: 73,
    backgroundColor: '#fcfdfd',
    marginTop: '-10%',
    paddingTop:"10%",
    paddingHorizontal:"5%"
  },
  containerHeader:{
    height: 200,
    backgroundColor: 'transparent',
    zIndex: 0
  },
  greeting: {
    paddingTop: 70,
    paddingLeft: 20,
    fontSize: 50,
    fontWeight: "600",
  },
})
