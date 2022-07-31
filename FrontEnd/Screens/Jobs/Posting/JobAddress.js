import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput,  Keyboard, TouchableWithoutFeedback } from 'react-native'
import GenericButton from '../../../components/Buttons/GenericButton.js'

const JobAddress = ({nextStep, street, setStreet, apt, setApt, city, setCity, state, setState, zipcode, setZipcode}) => {
    const [autofilled, setAutofilled] = useState(true)
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <Text style={styles.title}>Where will this job be completed? </Text>
            <View style={styles.body}>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setStreet(text)}
                    defaultValue={street}
                    placeholder="Street address"
                    returnKeyType="done"
                    textContentType='streetAddressLine1'
                />
                <TextInput
                    style={styles.input}
                    onChangeText={text => setApt(text)}
                    defaultValue={apt}
                    placeholder="apt no. (optional)"
                    returnKeyType="done"
                    textContentType='streetAddressLine2'
                />
                <View style={styles.location}>
                    <View style={styles.cityWrap}>
                        <TextInput
                            style={styles.city}
                            onChangeText={text => setCity(text)}
                            defaultValue={city}
                            placeholder="City"
                            returnKeyType="done"
                            textContentType='addressCity'
                        />
                    </View>
                    <View style={styles.stateWrap}>
                        <TextInput
                            style={styles.state}
                            onChangeText={text => setState(text)}
                            defaultValue={state}
                            placeholder="State"
                            returnKeyType="done"
                            textContentType="addressState"
                        />
                    </View>
                    <View style={styles.zipcodeWrap}>
                        <TextInput
                            style={styles.zipcode}
                            onChangeText={text => setZipcode(text)}
                            defaultValue={zipcode}
                            placeholder="zip"
                            returnKeyType="done"
                            textContentType='postalCode'
                        />
                    </View>
                </View>
            </View>
            </View>
        </TouchableWithoutFeedback>
    )

}

export default JobAddress;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 26,
        paddingRight: 10
    },
    body: {
        padding: 10,
    },
    autofilled: {
        opacity: .5,
        paddingTop: 4,
    },
    input: {
        marginBottom: 10,
        borderBottomWidth: 1.3,
        fontSize: 24,
        width: '90%',
        opacity: .6,
        marginTop: 10
    },
    location: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 10
    },
    cityWrap: {
        flex: 2,
        paddingRight: 10,
    },
    stateWrap: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10,
    },
    zipcodeWrap: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    city: {
        borderBottomWidth: 1.3,
        fontSize: 22,
    },
    state: {
        flex: 1,
        borderBottomWidth: 1.3,
        fontSize: 22,
    },
    zipcode: {
        flex: 1,
        borderBottomWidth: 1.3,
        fontSize: 22,
    }


})
