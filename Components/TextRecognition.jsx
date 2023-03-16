import React, { useState, useEffect } from "react";
import { Text, View, Button, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker'


export default function TextRecognitionComponent() {
  const [image, setImage] = useState(null)
  const [text, setText] = useState("text")


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
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(1, image);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log("console", result.assets[0].uri)
      console.log(2, image)
    }
  };


  useEffect(() => {
    if (image) {
      console.log(3, typeof(image))
      fetch('https://127.0.0.1:5000/extract_words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_uri: image
        })
      })
        .then(response => response.json())
        .then(data => {
          // Use the list of words in your app
          console.log(data);
          setText(data)
        })
        .catch(error => console.error(1,error));
    }

  }, [image]);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

      <Text>{text}</Text>
    </View>
  );
}

