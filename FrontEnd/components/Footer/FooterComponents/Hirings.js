import React from 'react'
import { StyleSheet,View,Image,Text } from 'react-native'
import  Button from 'react-native-button';
import { FontAwesome5 } from '@expo/vector-icons';

const Hirings = (props) => {
  let navigation=props.navigation;
  const route=props.route;
    return (
        <View>
            <Button
                onPress={() =>
                    {
                      if(route!='hirings') navigation.push('hirings')}
                  }
                  >
                <View style={styles.buttonRendering}>
                    <View style={{marginTop: "45%", marginBottom: '-20%', alignItems: 'center', justifyContent: 'center', alignSelf: 'center'}}>
                      <FontAwesome5 name="handshake" size={28} color="#0F2441" />
                    </View>
                    <Text style={styles.buttonText}>Hirings </Text>
                </View>
            </Button>
        </View>

    )
}

const styles = StyleSheet.create({
    scheduleButton: {
        fontSize: 12,
        color: '#000',
        fontWeight: '600',
    },
    buttonRendering: {
        flexDirection: 'column',
        paddingHorizontal: 14,
    },
    buttonText: {
        marginTop: 20,
        marginLeft: 5,
        fontSize: 13,
        color: '#102542',
        fontWeight: '500',
    }
})
export default Hirings
