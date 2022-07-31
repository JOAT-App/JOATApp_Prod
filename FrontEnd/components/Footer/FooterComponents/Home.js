import React from 'react'
import { StyleSheet,View,Image,Text } from 'react-native'
import  Button from 'react-native-button';
import HomeIcon from '../../../assets/footer/HomeIcon.svg'


const Home = (props) => {
  let navigation = props.navigation;
  const route = props.route;
    return (
        <View>
            <Button
                style={ styles.earningsButton }
                onPress={() => {
                  if(props.type==1 || props.type ==3){
                    if(route!='worker') navigation.push('worker')
                  }else if(props.type==2 || props.type==4){
                    if(route!='homeowner') navigation.push('homeowner')
                  }else if (props.type==5){
                    navigation.push('ScreenDir')
                  }
                }}
                >
                <View style={styles.buttonRendering}>
                    <View style={styles.containerSVG}>
                        <HomeIcon />
                    </View>
                    <Text style={styles.buttonText}> Home </Text>
                </View>
            </Button>
        </View>

    )
}

const styles = StyleSheet.create({
    earningsButton: {
        color: '#000',
        fontWeight: '900',

    },
    buttonRendering: {
        flexDirection: 'column',
        alignContent: 'center'
    },
    buttonText: {
        marginTop: -15,
        justifyContent: 'center',
        marginLeft: 15,
        fontSize: 13,
        color: '#102542',
        fontWeight: '500',
    }
})
export default Home
