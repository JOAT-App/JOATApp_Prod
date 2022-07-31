import React from 'react';
import { StyleSheet, Pressable, Alert, Text, View } from 'react-native';

const GenericButton = ({text, route, nextStep, disabled}) => {
  return (
    // <View style={styles.container}>
      <Pressable
        disabled={disabled}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#6DB3C8' : '#102542',
          },
          styles.button,
        ]}
        onPress={() => {
          nextStep()
        }}>
        <Text style={styles.buttonText}> {text} </Text>
      </Pressable>
    // </View>
  );
};

GenericButton.defaultProps = {
    color: '#fff',
    text: 'default'
}

export default GenericButton;

const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'white',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
  button: {
    borderRadius: 8,
    padding: 6,
    height: 50,
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    // backgroundColor: '#102542',
    alignSelf: 'center',
    borderRadius: 25,
    marginBottom: 15
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    fontWeight: "400"
  },
});
