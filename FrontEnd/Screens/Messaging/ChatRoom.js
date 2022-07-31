import React from 'react';
import {View, StyleSheet, Text, Pressable, Image} from 'react-native';
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  OverlayProvider as ChatOverlayProvider,
  useChannelContext
} from 'stream-chat-expo';
import {LoadingScreen} from '../../components/index.js'
import {MaterialCommunityIcons} from '@expo/vector-icons';
import {SafeAreaView} from 'react-native';
import {useSafeAreaInsets } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';

const ChatRoom = ({navigation, route}) => {
  const {channel, chatClient, otherUser} = route.params;
  const {bottom} = useSafeAreaInsets();
  // console.log(channel.state);


 return (
    <SafeAreaView style={{backgroundColor: "#e2f0f4"}}>
    <StatusBar/>
      <ChatOverlayProvider bottomInset={bottom} topInset={30}>
        <Chat client={chatClient}>
          <Channel channel={channel} keyboardVerticalOffset={0}>
            <View style={StyleSheet.absoluteFill}>
              <View style={{paddingLeft:10, flexDirection:'column'}}>
                <Pressable style={styles.btn} onPress={() => navigation.goBack()}>
                  <MaterialCommunityIcons name="chevron-left" size={48} color="#0F2441"/>
                </Pressable>
                <View>
                  <View style={{ alignSelf:'center', alignItems:'center', marginTop: '-14%'}}>
                    <Image
                      style={{height: 50, width: 50, borderRadius:30}}
                      source={{uri: otherUser.image}}
                    />
                    <Text style={styles.userText}>{otherUser.name}</Text>
                  </View>
                </View>
              </View>
              <MessageList />
              <MessageInput />
            </View>
          </Channel>
        </Chat>
      </ChatOverlayProvider>
    </SafeAreaView>
  );
};

export default ChatRoom;
const styles = StyleSheet.create({
  btn: {
    marginTop:"5%"
  },
  userText: {
    fontWeight:"500",
    fontSize:18,
    marginBottom: '2%'
  }
});
