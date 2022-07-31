import React from 'react'
import { StyleSheet,View,Image,Text } from 'react-native'
import  Button from 'react-native-button';
import CalendarIcon from '../../../assets/footer/CalendarIcon.svg'

const Calendar = (props) => {
  let navigation=props.navigation;
  const route=props.route;
    return (
        <View>
            <Button
                style={ styles.scheduleButton }
                onPress={() =>
                    {
                      if(route!='schedule') navigation.push('schedule')}
                  }
                  >
                <View style={styles.buttonRendering}>
                    <View style={styles.containerSVG}>
                        <CalendarIcon />
                    </View>
                    <Text style={styles.buttonText}> Schedule </Text>
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
        flexDirection: 'column'
    },
    buttonText: {
        marginTop: -15,
        marginLeft: 5,
        fontSize: 13,
        color: '#102542',
        fontWeight: '500',
    }
})
export default Calendar
