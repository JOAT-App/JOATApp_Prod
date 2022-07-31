import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable } from 'react-native'
import data from './data.js'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const JobType = ({ type, setType}) => {
    const [ pressed, setPressed ] = useState(false)

    const togglePressed = () => {
        setPressed(prev => !prev)
        console.log(pressed)
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>What kind of job do you need done?</Text>
            <View style={styles.dropdown}>
                <Pressable style={styles.dropdownBtn} onPress={() => togglePressed()}>
                        <Text style={styles.dropdownText}>{type}</Text>
                        {!pressed ? <MaterialCommunityIcons name="chevron-down" size={28} color="#C4C4C4"/> : <MaterialCommunityIcons name="checkbox-blank-circle" size={28} color="#C4C4C4"/>}
                </Pressable>
                {pressed ? 
                (<View style={styles.dropdownOptions}> 
                    {data.map((clickable) => {
                        return (
                            <Pressable
                                key={clickable.key}
                                onPress={() => {
                                    setType(clickable.job)
                                    togglePressed()
                                }}
                                style={[
                                    styles.dropdownItem,
                                    ( clickable.job == type ) ? styles.chosen : styles.transparent
                                ]}
                                >
                                <Text style={styles.dropdownText} >{clickable.job} </Text>
                            </Pressable>
                        )
                    })}
                </View>) : null}
            </View>
        </View>
    )

}

export default JobType;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pressable: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    title: {
        fontSize: 28,
        paddingBottom: 20,
        paddingRight: 20,
    },
    description: {
        fontSize: 24,
    },
    dropdown: {

    },
    dropdownBtn: {
        padding: 5,
        borderBottomWidth : 1,
        borderBottomColor: '#000',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10
    },
    dropdownOptions:{
        backgroundColor: '#EEEEEE'
    },
    dropdownItem: {
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: 5,
    },
    dropdownText: {
        fontSize: 18,
        fontWeight: "300"
    },
    chosen: {
        backgroundColor: '#8DCBDE'
    },
    transparent: {
        backgroundColor: 'transparent'
    }

})
