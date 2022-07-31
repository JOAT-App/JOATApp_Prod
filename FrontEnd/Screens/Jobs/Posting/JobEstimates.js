import React, { useState } from 'react'
import { StyleSheet, Text, View, Pressable, TextInput,  Keyboard, TouchableWithoutFeedback } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import GenericButton from '../../../components/Buttons/GenericButton.js'

const JobEstimates = ({nextStep, hours, setHours, mins, setMins, payment, setPayment}) => {

  const [displayHours, setDisplayHours] = useState(hours);
  const [displayMins, setDisplayMins] = useState(mins);


    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <>
            <View style={styles.top}>
                <Text style={styles.text}>How much time will someone spend on this job?</Text>
                <View style={styles.timeInputs}>
                    <View style={styles.timeLabel}>
                        <TextInput
                            style={styles.input}
                            onEndEditing={() => {
                                const temp = parseInt(displayHours);
                                console.log(temp);
                                if(temp!=null && temp<20 && temp>-1 ){
                                  setHours(displayHours);
                                }else{
                                  setDisplayHours(hours)
                                }
                              }
                            }
                            onChangeText={(text)=>{
                              setDisplayHours(text);
                            }}
                            placeholder={hours}
                            value={displayHours}
                            keyboardType="numeric"
                            returnKeyType="done"
                            maxLength={2}
                        />
                        <Text style={styles.label}>
                            hrs
                        </Text>
                    </View>
                    <View style={styles.timeLabel}>
                    <TextInput
                        style={styles.input}
                        onEndEditing={() => {
                            const temp = parseInt(displayMins);
                            console.log(temp);
                            if(temp!=null && temp<60 && temp>-1 ){
                              setMins(displayMins);
                            }else{
                              setDisplayMins(mins)
                            }
                          }
                        }
                        onChangeText={(text)=>{
                          setDisplayMins(text);
                        }}
                        placeholder={mins}
                        value={displayMins}
                        keyboardType="numeric"
                        returnKeyType="done"
                        maxLength={2}
                    />
                        <Text style={styles.label}>
                            mins
                        </Text>
                    </View>
                </View>
            </View>
            <View style={styles.bottom}>
                <Text style={styles.text}>How much money will they earn from this job?</Text>
                <View style={styles.timeInputs}>
                    <View style={styles.timeLabel}>
                        <TextInput
                            style={styles.input}
                            onChangeText={text => setPayment(text)}
                            defaultValue={payment}
                            keyboardType="numeric"
                            returnKeyType="done"
                        />
                        <Text style={styles.labelMoney}>
                            $
                        </Text>
                    </View>
                </View>
            </View>
          </>
        </View>
        </TouchableWithoutFeedback>
    )

}

export default JobEstimates

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    pressable: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    text: {
        fontSize: 24,
        fontWeight: '300'
    },
    input: {
        marginBottom: 10,
        borderBottomWidth: 2,
        fontSize: 24,
        width: 100
    },
    timeInputs: {
        width: '70%',
        flexDirection: 'row',
        alignSelf: 'center',
        justifyContent: 'space-around'
    },
    timeLabel: {
        flexDirection: 'row'
    },
    label: {
        position: 'absolute',
        opacity: .5,
        fontSize: 18,
        right: 0,
    },
    labelMoney: {
        position: 'absolute',
        opacity: .5,
        fontSize: 18,
        left: -15,
        top: 5
    },
    inputMoney: {
        marginBottom: 10,
        borderBottomWidth: 2,
        fontSize: 24,
        width: 100,
        paddingLeft: 20
    }

})
