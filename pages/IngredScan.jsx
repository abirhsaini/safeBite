import React, { useState, useEffect, useContext } from "react";
import { Text, View, Button, Image, StyleSheet } from "react-native";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { AuthContext } from "../context/authContext.jsx";



export default function TextRecognitionOcr () {
  const [imageUri, setImageUri] = useState(null)
  const [image, setImage] = useState(null);
  const [text, setText] = useState("text")

  const { userAllergies } = useContext(AuthContext);
  const [isDanger, set_isDanger] = useState(null);
  const [dangerous, setDangerous] = useState("");
  const [commonIngred, setCommonIngred] = useState(null)
  const [allergy, setAllergy] = useState(null)


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


    // console.log(1, result);

    if (!result.canceled) {
      const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' });
      setImageUri(result.assets[0].uri);
      if (imageUri.includes('jpeg')) {
        setImage(`data:image/jpeg;base64,${base64}`);
      }
      else if (imageUri.includes('jpg')) {
        setImage(`data:image/jpg;base64,${base64}`);
      }
      else if (imageUri.includes('png')) {
        setImage(`data:image/png;base64,${base64}`);
      }

    }
  };


  useEffect(() => {
    if (image) {
      // console.log(3, image)
      fetch('https://flaskocrapi.azurewebsites.net/extract_words', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          image_uri: imageUri,
          image: image
        })
      })
        .then(response => response.json())
        .then(data => {
          // Use the list of words in your app
          console.log(data);
          setText(data.words.join(","))

          // is allergic
          for (let j = 0; j < userAllergies.length; j++) {
            console.log("data", data["words"])
            const productIngred = data["words"]

            productIngred.forEach((item, index, array) => {
              array[index] = item.toUpperCase();
            });

            let allergyIngred = userAllergies && userAllergies[j] ? userAllergies[j]["ingredients"] : [];
            allergyIngred.forEach((item, index, array) => {
              array[index] = item.toUpperCase();
            });
            
            const commonIngredients = [];
            let isDanger = false;

            const smallerArray = allergyIngred.length < productIngred.length ? allergyIngred : productIngred;
            const largerArray = allergyIngred.length >= productIngred.length ? allergyIngred : productIngred;

            for (let i = 0; i < smallerArray.length; i++) {
              if (largerArray.includes(smallerArray[i])) {
                console.log(`index ${i} "${productIngred[i]}" is a common ingredient`);
                commonIngredients.push(productIngred[i]);
                setAllergy(userAllergies[j])
                isDanger = true
              }
            }
            set_isDanger(isDanger)
            console.log(commonIngredients.length)
            if (commonIngredients.length > 0) {
              setDangerous(`Product may contains`);
              setCommonIngred(commonIngredients.join(", "));
            } else {
              setDangerous("Safe product! you can consume it :)");
            }
          }})
        .catch(error => console.error(1, error));
    }
    else {
      console.log("empty image")
    }

  }, [image]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}

      <View style={{ flexDirection: 'row' }}>
                { isDanger && <AntDesign name="warning" size={24} color="black" />}
                { <Text style={styles.dangerous}> {dangerous} </Text>}    
      </View>

      <Text>{commonIngred}</Text>
    </View>
  );
};



const styles = StyleSheet.create({
  container: {
      flex:1,
      backgroundColor:'#FFF8E7',
      alignItems:'center',
      justifyContent:'center',
      // paddingTop: StatusBar.currentHeight,
  },
  warning:{
      flexDirection: 'row' ,
      margin:20,
  },
  dangerous:{
      fontSize:16
  },
  navBar: {
      position:"absolute",
      top: 31,
      width: "100%"
  },
  barcodebox:{
      // position: 'absolute',
      // top:100,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      height: 300,
      width: 340,
      overflow: 'hidden',
      borderRadius: 20,
      marginTop:0
  },
  maintext:{
      fontSize:16,
      margin:20,
      fontWeight: 'bold'
  },
  product_name:{
      fontSize:18,
      margin:20,
      fontWeight: 'bold',


  },
  imageBox:{
      width:200,
      height:100,
      resizeMode:"contain",
      borderWidth:1,
      overflow:'hidden'
  },
  button:{
      flex:1,
      position:"absolute",
      bottom:10,
  }
});