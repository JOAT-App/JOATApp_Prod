import React, {useState} from 'react'
import { StyleSheet, View, Text, } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { getIcon } from '../../utils/icons';

const RecommendedCard = ({ recommended }) => {
    return (
        <>
            <View style={styles.card}>
                <View style={styles.cardLogo}> 
                    { getIcon(recommended.job_category_id) }
                </View>
                <View style={styles.info}>
                    <Text styles={styles.title}> 
                        {recommended.title}
                    </Text>
                    <View style={styles.homeowner}>
                        <Text style={styles.homeownerName}> for John Doe </Text>
                        <View style={{backgroundColor: '#e1e1e1', height: 20, width: 20, borderRadius: 100, marginTop: -2}}> 

                        </View>
                        <Text style={styles.homeownerTag}> @johndoe27</Text> 
                    </View>
                    <View style={styles.timeAndDetails}>
                        <Text> completed {recommended.time_elapsed.days} days ago</Text>
                    </View>
                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    card: {
        padding: 20,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 24,
        marginBottom: 15,
    },
    cardLogo: {
        display: 'flex',
        flex: 1,
        marginLeft: 10,
        marginTop: 1
    },
    info: {
        flex: 8
    },
    title: {
        fontSize: 24,
        fontWeight: "600",
        backgroundColor: '#63EAD7'
    },
    homeowner: {
        display: 'flex',
        flexDirection: 'row'
    },
    homeownerName: {
        
    },
    homeownerTag: {
        
    },
    timeAndDetails: {
        
    },
})

export default RecommendedCard
