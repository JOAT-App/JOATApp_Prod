import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { manipulateAsync, SaveFormat } from 'expo-image-manipulator';
import { Buffer } from "buffer";
import {URL} from '../../utils/exports';

export default function UploadImage({photoUrl}) {
  const [image, setImage] = useState(photoUrl);
  const [id, setId] = useState(0);

  //check for camera roll permission, asks user if we dont have them
  const  checkForCameraRollPermission=async()=>{
       const { status } = await ImagePicker.getMediaLibraryPermissionsAsync();
       if (status !== 'granted') {
         //alert("Please grant camera roll permissions inside your system's settings");
       }else{
         console.log('Media Permissions are granted')
       }

 }

  const addImage = async () => {
   let _image = await ImagePicker.launchImageLibraryAsync({
     mediaTypes: ImagePicker.MediaTypeOptions.Images,
     allowsEditing: true,
     base64: true,
     aspect: [4,3],
     quality: 2,
   });
   if (!_image.cancelled) {
      setImage(_image.uri);
      // const resizedImage=_image;
      const resizedImage = await manipulateAsync(
       _image.uri,
       [{ resize: { width: 300 } }], // resize to width of 300 and preserve aspect ratio
       { compress: 0.7, format: SaveFormat.PNG },
      );
      try {
        // console.log("here");
          const data = new FormData();
          data.append('id', id);
          //console.log(_image.base64);
          //const buffer = new Buffer(_image.base64)
          const uri=_image.uri;
          const fileType = uri.substring(uri.lastIndexOf(".") + 1);


          data.append('photo',{
          uri: uri,
          name: `photo.${fileType}`,
          type: `image/${fileType}`
          });
          const token = await AsyncStorage.getItem('token')
          const bearerToken='Bearer '+ token;
          const response = await fetch(
            `${URL}/users/self/uploadProfilePic`,
            {
              method: "PUT",
              headers: new Headers({
                "Authorization": bearerToken,
                'Content-Type': 'application/x-www-form-urlencoded',
         }),
              body: data
            }
          );
          const status = await response.status;
        } catch (err) {
          console.error(err.message);
        }

    }
 };

 const afterLoad = async e => {
   try {
     const newId = await AsyncStorage.getItem('id');
     setId(newId);
   }catch (error) {
     console.error(error)
   }
 }
 useEffect(() => {
  checkForCameraRollPermission()
  afterLoad();
  }, []);

  return (
            <View style={imageUploaderStyles.container}>
                {
                    image  && <Image source={{ uri: image }} style={{ width: '100%', height: "100%" }} />
                }

                    <View style={imageUploaderStyles.uploadBtnContainer}>
                        <TouchableOpacity onPress={addImage} style={imageUploaderStyles.uploadBtn} >
                            <EvilIcons name="pencil" size={20} color="black" />
                        </TouchableOpacity>
                    </View>


            </View>

  );
}

const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:100,
        width:100,
        backgroundColor:'#efefef',
        position:'relative',
        borderRadius:999,
        overflow:'hidden',
    },
    uploadBtnContainer:{
        opacity:0.7,
        position:'absolute',
        right:0,
        bottom:0,
        backgroundColor:'lightgrey',
        width:'100%',
        height:'18%',
    },
    uploadBtn:{
        display:'flex',
        alignItems:"center",
        justifyContent:'center'
    }
})
