import React, { useState, useEffect } from "react";
import { Text, View, Button, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker'

export default function TextRecognitionScreen() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");

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

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      console.log(1, result.assets[0].uri)
      console.log(2, image)
    }
  };

  useEffect(() => {
    console.log(image)
    if (image) {
      // Create a new FormData object
      const formData = new FormData();
      formData.append('image', {
        uri: image,
        name: 'image.jpg',
        type: 'image/jpg'
      });

      //Make a POST request to the API endpoint
      // fetch('http://localhost:5000/recognize_text', {
      //   method: 'POST',
      //   body: formData,
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //   },
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     // Update the state with the recognized text
      //     setText(data.text);
      //     console.log("text", text )
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });

      // fetch('http://localhost:5000/')
      //   .then(response => response.text())
      //   .then(responseText => {
      //     console.log(responseText);
      //     setText(responseText)
      //   })
      //   .catch(error => {
      //     console.error(error);
      //   });

      // fetch('http://127.0.0.1:5000/post_data', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({
      //     name: 'John Doe',
      //     email: 'johndoe@example.com',
      //   }),
      // })
      //   .then(response => response.json())
      //   .then(data => {
      //     console.log(data);
      //   })
      //   .catch(error => {
      //     console.error("error",error);
      //   });

      fetch('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => response.json())
      .then(json => console.log(json))


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
