import React from 'react'
import { StyleSheet,View,Image,Text } from 'react-native'
import  Button from 'react-native-button';
import ProfileIcon from '../../../assets/footer/ProfileIcon.svg';

const Profile = (props) => {
  let navigation = props.navigation;
  const route = props.route;
    return (
        <View>
            <Button
                style={ styles.accountsButton }
                onPress={() => {if(route!='profile') navigation.push('profile')}}>
                <View style={styles.buttonRendering}>
                    <View style={styles.containerSVG}>
                        <ProfileIcon /> 
                    </View>
                    <Text style={styles.buttonText}> Profile </Text>
                </View>
            </Button>
        </View>

    )
}

const styles = StyleSheet.create({
    accountsButton: {
        fontSize: 13,
        color: '#102542',
        fontWeight: '900',
    },
    buttonRendering: {
        flexDirection: 'column',
        alignContent: 'center'
    },
    buttonText: {
        marginTop: -15,
        fontSize: 13,
        color: '#102542',
        fontWeight: '500',
        justifyContent: 'center',
        marginLeft: 15
    }
})
export default Profile
