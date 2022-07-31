import React, {useState} from "react";
import{Modal, Text, Pressable, StyleSheet, View,TouchableWithoutFeedback, Keyboard,} from "react-native";
import { TextInput} from 'react-native-paper'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const HireModal=({onConfirm, onDismiss, isDeleting,  visible,  text, isApplicant, note, setNote,  ...props}) =>{
  const [disabled, setDisabled] = useState(false);

  return (
    <Modal animationType="slide" transparent={true} visible={visible}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={isApplicant ?styles.applicantModal:  isDeleting ? styles.deleteModal : styles.modalView}>
          <View style={styles.centeredView}>
              <View style={styles.top}>
                    <Text style={styles.modalText}>{text}</Text>
                </View>
              </View>
              <View style={styles.middle}>
                <View >
                  <Text style={styles.warningText}>Hope it went well!</Text>
                </View>
              </View>

              <View style={styles.bottom}>
                <Pressable
                    style={[styles.button,
                    {backgroundColor: '#6DB3C8'}]}
                    onPress={()=>{
                      setDisabled(true)
                      onConfirm();
                    }}
                >
                    <Text style={styles.textConfirm}>DONE</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.buttonClose]} onPress={onDismiss}>
                  <Text style={styles.textCancel}>CANCEL</Text>
                </Pressable>
              </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
  )
}

export default HireModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "flex-start",
    alignSelf: 'center',
    marginTop: 12,
    paddingBottom: 10,
    // borderColor: 'green',
    // borderWidth: 2
  },
  top: {
    flex: 1,
    flexGrow: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
  },
  middle: {
    flex: 4,
    flexGrow: 1,
  },
  bottom: {
    flex: 1,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignContent: 'center',
    marginTop: 40
  },
  deleteModal: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    alignSelf: 'center',
    marginTop:'60%',
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    alignSelf: 'center',
    marginTop:'60%',
    width: 275,
    height: 275,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  applicantModal: {
    backgroundColor: "white",
    borderRadius: 8,
    alignItems: "center",
    alignSelf: 'center',
    height: '30%',
    marginTop:'60%',
    width: '70%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 5
  },
  button: {
    borderRadius: 8,
    elevation: 2,
    height: 52,
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  buttonConfirm: {
    backgroundColor: "#F9F9FB",
  },
  buttonClose: {
    backgroundColor: "#F9F9FB",
    borderColor: '#E8E8EA',
    borderWidth: 2
  },
  textCancel: {
    color: "#4E4E4F",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18
  },
  textConfirm: {
    color: "#FFFFFF",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 18
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
    color: 'black',
    fontWeight: "600",
    flex: 1,
    flexWrap: 'wrap'
  },
  modalTextDeleting: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 24,
    color: '#cc435a',
    fontWeight: "600",
    flex: 1,
    flexWrap: 'wrap'
  },
  warningText: {
    fontSize: 18,
    fontWeight: "500",
    color: '#626266'
  },
  textInput: {
    width: 225,
    alignSelf:'center',
    marginTop:'-15%',
    textAlignVertical: 'top',
    paddingTop: 0,
    paddingBottom: 0
  }
});
