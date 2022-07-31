import React from 'react'
import { StyleSheet, Text, View, ScrollView, SafeAreaView, PaperProvider } from 'react-native';
import Review from '../../components/Cards/Reviews/Review.js'
import Footer from '../../components/index.js';
import { StatusBar } from 'expo-status-bar';

const JobReview = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
        <StatusBar/>
            <ScrollView style={styles.scrollContainer}>
                {reviewData ? reviewData.map((review) => {
                    return (
                        <Review key={review.job_id} review={review}></Review>
                    )
                    }) : <Text> No Reviews to Display </Text>
                }
            </ScrollView>
            <Footer navigation={navigation} route={'jobreview'}/>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F8F8F9",
        padding: 10
    },
    scrollContainer: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
    },
    heading: {
        display: 'flex',
        justifyContent: 'space-between'
    },

  });

export default JobReview;
