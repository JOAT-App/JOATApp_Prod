import React from 'react'
import { StyleSheet,View,Image,Text } from 'react-native'
import  Button from 'react-native-button';
import PostJobIcon from '../../../assets/footer/PostJobIcon.svg'

const PostJob = (props) => {
  let navigation=props.navigation;
  const route=props.route;
    return (
        <View>
            <Button
                style={ styles.ratingsButton }
                onPress={() =>{navigation.push('jobform')}}>
                <View style={styles.buttonRendering}>
                    <View style={styles.containerSVG}>
                        <PostJobIcon />
                    </View>
                    <Text style={styles.buttonText}> Post a Job </Text>
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
        fontSize: 13,
        color: '#102542',
        fontWeight: '500',
    }
})
export default PostJob
