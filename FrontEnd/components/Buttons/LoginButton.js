import React from 'react';
import { StyleSheet, Pressable, Alert, Text, View } from 'react-native';

const GenericButton = ({text, route, disabled, submit, setLoading}) => {
  return (
      <Pressable
        disabled={disabled}
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#6DB3C8' : '#102542',
          },
          styles.button,
        ]}
        onPress={(e) => {
          submit(e)
          setLoading(true)
        }}>
        <Text style={styles.buttonText}> {text} </Text>
      </Pressable>
  );
};

GenericButton.defaultProps = {
    color: '#fff',
    text: 'default'
}

export default GenericButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 8,
    padding: 6,
    height: 50,
    width: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    alignSelf: 'center',
    borderRadius: 25,
    marginBottom: 15
  },
//   btn: {
//     paddingTop: 7,
//     paddingBottom: 7,
//     width: '80%',
//     alignSelf: 'center',
//     borderRadius: 25,
//     fontWeight: "500",
//     backgroundColor: '#102542',
//     color: '#fff',
//     marginTop: 80,
//     marginBottom: 20,
//   },
  buttonText: {
    fontSize: 24,
    color: 'white',
    fontWeight: "400"
  },
});
