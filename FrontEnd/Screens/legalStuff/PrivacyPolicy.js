import React from 'react'
import { StyleSheet, Text, View, Pressable, ScrollView } from 'react-native'
import{Paragraph} from 'react-native-paper'
import { StatusBar } from 'expo-status-bar';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const Privacy= ({navigation})=>{

const privacyPolicy1=`
At JOAT App, accessible from joatapp.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by JOAT App and how we use it.

If you have additional questions or require more information about our Privacy Policy, do not hesitate to contact us at admin@joatapp.com.

This Privacy Policy applies only to our online activities and is valid for visitors to our website/app with regards to the information that they shared and/or collect in JOAT App. This policy is not applicable to any information collected offline or via channels other than this website. Our Privacy Policy was created with the help of the Free Privacy Policy Generator.
`;
const privacyPolicy2= `By using our website, you hereby consent to our Privacy Policy and agree to its terms.
`;

const privacyPolicy3= `The personal information that you are asked to provide, and the reasons why you are asked to provide it, will be made clear to you at the point we ask you to provide your personal information.
If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
When you register for an Account, we may ask for your contact information, including items such as name, company name, address, email address, and telephone number, and payment information.
`

const privacyPolicy4=`We use the information we collect in various ways, including to:
• Provide, operate, and maintain our website/app
• Improve, personalize, and expand our website/app
• Understand and analyze how you use our website/app
• Develop new products, services, features, and functionality
• Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website, and for marketing and promotional purposes
• Send you emails
• Find and prevent fraud`

  return(
      <View>
      <StatusBar/>
      <View style={{flexDirection:'row', marginTop:'7.5%'}}>
        <Pressable style={styles.pressable} onPress={()=>{navigation.goBack()}}>
            <MaterialCommunityIcons name="chevron-left" size={48} color="#0F2441" />
        </Pressable>
        <Text style={styles.title}>Privacy Policy</Text>
      </View>
        <ScrollView contentContainerStyle={{paddingBottom: "30%"}}>
          <Paragraph style={styles.paragraph}>
            {privacyPolicy1}
          </Paragraph>
          <Text style={styles.titleSmall}>Consent</Text>
          <Paragraph style={styles.paragraph}>
            {privacyPolicy2}
          </Paragraph>
          <Text style={styles.titleSmall}>Information We Collect</Text>
          <Paragraph style={styles.paragraph}>
            {privacyPolicy3}
          </Paragraph>
          <Text style={styles.titleSmall}>How we use your information</Text>
          <Paragraph style={styles.paragraph}>
            {privacyPolicy4}
          </Paragraph>
        </ScrollView>
        </View>
      );
}

export default Privacy;

const styles =StyleSheet.create({
  title: {
    fontSize: 50,
    alignSelf: 'center',
    fontWeight: "600"
  },
  titleSmall: {
    fontSize: 26,
    alignSelf: 'center',
    fontWeight: "400"
  },
  pressable: {
    marginLeft: '2.5%'
  },
  paragraph: {
    marginHorizontal:'5%'
   }
})
