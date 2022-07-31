import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable, TextInput, Keyboard, TouchableWithoutFeedback} from 'react-native'
import GenericButton from '../../../components/Buttons/GenericButton.js'

const JobDetails = ({nextStep, title, setTitle, description, setDescription}) => {

    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <>
            <View style={styles.top}>
                <Text style={styles.title}>Give this job a title.</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setTitle(text)}
                    defaultValue={title}
                    placeholder=""
                    returnKeyType="done"
                    autoCorrect={true}
                />
            </View>
            <View styles={styles.bottom}>
                <Text style={styles.description}>And a description.</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={text => setDescription(text)}
                    defaultValue={description}
                    placeholder=""
                    returnKeyType="next"
                    numberOfLines={5} // check on this
                    multiline={true}
                    autoCorrect={true}
                />
            </View>
            </>
        </View>
        </TouchableWithoutFeedback>
    )
}

export default JobDetails;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    top: {
        marginBottom: 60
    },
    bottom: {

    },
    title: {
        fontSize: 24,
        paddingBottom: 30
    },
    description: {
        fontSize: 24,
        paddingBottom: 30
    },
    input: {
        marginBottom: 10,
        borderBottomWidth: 1.3,
        fontSize: 24,
        width: '90%'
    },

})
