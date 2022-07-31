import React, {useState} from 'react'
import { StyleSheet, View, Text, Button, SafeAreaView, PaperProvider } from 'react-native'
const Review = ({ review }) => {
    // { date, description, rating, category, servicePerformed, cost }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.heading}>
                    <View>
                        <Text>{review.date}</Text>
                    </View>
                    <View>
                        <Text>OOOOO {review.rating}</Text>
                    </View>
                </View>
                <View style={styles.description}>
                    <Text style={styles.descriptionText}>Technician was prompt and thorough; cleared vent as well as the connecting elbow between dryer and long vent. </Text>
                </View>
                <View style={styles.category}>
                    <Text style={styles.categoryTitle}>Category: </Text>
                    <Text style={styles.categoryText}>{review.job_category_id}</Text>
                </View>
                <View style={styles.servicePerformed}>
                        <Text style={styles.servicePerformedTitle}>Services Performed: </Text>
                        <Text style={styles.servicePerformedText}> {review.servicePerformed ? 'Yes' : 'No'}</Text>
                </View>
                <View style={styles.cost}>
                        <Text style={styles.costTitle}>$Cost: </Text>
                        <Text style={styles.costText}> {review.pay}</Text>
                </View>
                <View style={styles.readMore}>
                    <Text style={styles.readMoreText}>Read More </Text>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Review;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 30,
        borderColor: '#000',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        padding: 30,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        borderRadius: 5,
        borderWidth: 1,
        
    },
    heading: {
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: 'row',
        fontWeight: "600",
        marginBottom: 15
    },
    description: {
        marginBottom: 15,
    },
    descriptionText: {
        fontWeight: "400",
    },
    category: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15
    },
    categoryTitle: {
        fontWeight: "600",
        fontSize: 16
    },
    categoryText: {
        fontWeight: "400"
    },
    servicePerformed: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15,
    },
    servicePerformedTitle: {
        fontWeight: "600",
        fontSize: 16
    },
    servicePerformedText: {
        fontWeight: "400",
        fontSize: 16
    },
    cost: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 15
    },
    costTitle: {
        fontWeight: "600",
        fontSize: 16
    },
    readMore: {
        display: 'flex',
    },
    readMoreText: {
        alignSelf: 'flex-end'
    }
    
  });