import React from 'react';
import { createNativeStackNavigator} from '@react-navigation/native-stack';
import {
    Applicants,
    ChatRoom,
    ConfirmAccount,
    ContactUs,
    EditJob,
    EditProfile,
    Hirings,
    HomeOwner,
    JobForm,
    JobPosting,
    JobPostingAppliedHired,
    JobPostingHomeOwner,
    JobReview,
    Logout,
    Messages,
    OtherUserProfile,
    PaymentScreen,
    ProfileLinks,
    ScreenDir,
    Worker,
    Terms,
    PrivacyPolicy,
  } from '../Screens/index.js';

const Stack = createNativeStackNavigator();


export const DevStack = () => {
  return (

    <Stack.Navigator initalRouteName="homeowner" screenOptions={{headerShown: false}}>
        <Stack.Screen name="homeowner" component={HomeOwner} options={{animation: 'none', gestureEnabled: false}}/>
        <Stack.Screen name="worker" component ={Worker} options={{animation: 'none', gestureEnabled: false}}/>
        <Stack.Screen name="confirmAccount" component={ConfirmAccount} options={{animation: 'none', gestureEnabled: false}} />
        <Stack.Screen name="hirings" component={Hirings} options={{animation: 'none', gestureEnabled: false}}/>
        <Stack.Screen name="jobposting" component={JobPosting} />
        <Stack.Screen name="jobpostingappliedhired" component={JobPostingAppliedHired}/>
        <Stack.Screen name="applicants" component={Applicants} initialParams={{jobid: 1}}/>
        <Stack.Screen name="jobpostinghomeowner" component={JobPostingHomeOwner}/>
        <Stack.Screen name="jobreview" component={JobReview}/>
        <Stack.Screen name="jobform" component={JobForm} options={{animation: 'slide_from_bottom', gestureEnabled: false}}/>
        <Stack.Screen name="paymentScreen" component ={PaymentScreen}/>
        <Stack.Screen name="ScreenDir" component={ScreenDir} options={{animation: 'none'}} />
        <Stack.Screen name="profile" component={ProfileLinks} options={{animation: 'none', gestureEnabled: false}} />
        <Stack.Screen name="messages" component={Messages} options={{animation: 'none', gestureEnabled: false}} />
        <Stack.Screen name="ChatRoom" component={ChatRoom} />
        <Stack.Screen name="EditProfile" component={EditProfile}/>
        <Stack.Screen name="editjob" component={EditJob} />
        <Stack.Screen name="contactus" component={ContactUs} />
        <Stack.Screen name="otheruserprofile" component={OtherUserProfile} initialParams={{id: 3}}/>
        <Stack.Screen name="logout" component ={Logout} options={{animation: 'none', gestureEnabled: false}}/>
        <Stack.Screen name="termsandconditions" component={Terms}/>
        <Stack.Screen name="privacypolicy" component={PrivacyPolicy}/>
    </Stack.Navigator>
  );
};
