import React from 'react'
import { StyleSheet,View,Image,Text } from 'react-native'
import  Button from 'react-native-button';
import MessagesIcon from '../../../assets/footer/MessageIcon.svg'

const Messages = (props) => {
  let navigation=props.navigation;
  const route=props.route;
    return (
        <View>
            <Button
                style={ styles.ratingsButton }
                onPress={() =>{if(route!='messages')navigation.push('messages')}}>
                <View style={styles.buttonRendering}>
                    <View style={styles.containerSVG}>
                        <MessagesIcon />
                    </View>
                    <Text style={styles.buttonText}> Messages </Text>
                </View>
            </Button>
        </View>

    )
}

const styles = StyleSheet.create({
    ratingsButton: {
        fontSize: 12,
        color: '#000',
        fontWeight: '600',
    },
    buttonRendering: {
        flexDirection: 'column'
    },
    buttonText: {
        marginTop: -15,
        marginLeft: 1,
        fontSize: 13,
        color: '#102542',
        fontWeight: '500',
    }
})
export default Messages
