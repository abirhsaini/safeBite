import React, { useState, useEffect } from "react";
import { Text, View, Button, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker'

import TextRecognition from 'react-native-text-recognition'


export default function TextRecognitionComponent(){
    const [image, setImage] = useState(null)
    const [text, setText] = useState("hahaha")


    useEffect(() => {
        (async () => {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        })();
      }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing:false,
        aspect: [4, 3],
        quality: 1,
        });

        console.log(1,image);

        if (!result.canceled) {
        setImage(result.assets[0].uri);
        console.log("console",result.assets[0].uri)
        console.log(2,image)
        }
    };
            

    // useEffect(()=>{
    //     pickImage();
    // },[]);
    
    
    useEffect(()=>{
      (async ()=>{
        if(image){
          console.log(3,image)
          const result = await TextRecognition.recognize(image);
          console.log(4,result)
          setText(result)
      }
      })();  
      
    }, [image]);

    return(
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

        <Text>{text}</Text>
    </View>
    );
}

