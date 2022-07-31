import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {
    Home,
    ChatRoom,
    ContactUs,
    EditJob,
    EditProfile,
    Hirings,
    JobPosting,
    JobPostingAppliedHired,
    Logout,
    Messages,
    OtherUserProfile,
    ProfileLinks,
    Worker,
    Terms,
    PrivacyPolicy,
    StripeOnboarding,
  } from '../Screens/index.js';

const Stack = createNativeStackNavigator();

export const WorkerStack = () => {
  return (
    <Stack.Navigator initalRouteName="worker" screenOptions={{headerShown: false}}>
        <Stack.Screen name="worker" component={Worker} options={{animation: 'none', gestureEnabled: false}} />
        <Stack.Screen name="hirings" component={Hirings} options={{animation: 'none', gestureEnabled: false}}/>
        <Stack.Screen name="jobposting" component={JobPosting}/>
        <Stack.Screen name="jobpostingappliedhired" component={JobPostingAppliedHired}/>
        <Stack.Screen name="stripeonboarding" component={StripeOnboarding} initialParams={{url:'http://www.google.com'}}/>
        <Stack.Screen name="profile" component={ProfileLinks} options={{animation: 'none', gestureEnabled: false}}/>
        <Stack.Screen name="messages" component={Messages} options={{animation: 'none', gestureEnabled: false}}/>
        <Stack.Screen name="ChatRoom" component={ChatRoom}/>
        <Stack.Screen name="EditProfile" component={EditProfile}/>
        <Stack.Screen name="contactus" component={ContactUs} />
        <Stack.Screen name="otheruserprofile" component={OtherUserProfile} initialParams={{id: 3}}/>
        <Stack.Screen name="logout" component={Logout} options={{animation: 'none', gestureEnabled: false}}/>
        <Stack.Screen name="termsandconditions" component={Terms}/>
        <Stack.Screen name="privacypolicy" component={PrivacyPolicy}/>
    </Stack.Navigator>
  );
};
