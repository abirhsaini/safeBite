import React, { useState, useEffect, useContext } from "react";
import { Text, View, Button, Image, StyleSheet } from "react-native";
import { launchImageLibrary, launchCamera } from 'react-native-image-picker';
import * as ImagePicker from 'expo-image-picker'
import * as FileSystem from 'expo-file-system';
import { AntDesign } from '@expo/vector-icons';
import axios from "axios";
import { AuthContext } from "../context/authContext.jsx";
import SideBar from "../component/sideBar.js";
import NavBar from "../component/nav.js";



export default function TextRecognitionOcr ({navigation}) {
  const [imageUri, setImageUri] = useState(null)
  const [image, setImage] = useState(null);
  const [text, setText] = useState("text")

  const { userAllergies } = useContext(AuthContext);
  const [isDanger, set_isDanger] = useState(null);
  const [dangerous, setDangerous] = useState("");
  const [commonIngred, setCommonIngred] = useState(null)


  
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
    
  }, []);
  
  const pickImage = async () => {
   var result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,

    });
    await ocr(result)
  }
    const ocr = async (result)=>{
      if (!result.canceled) {
        try {
          const base64 = await FileSystem.readAsStringAsync(result.assets[0].uri, { encoding: 'base64' });
          // console.log("image uri",result.assets[0].uri)
          await setImageUri(result.assets[0].uri)
          if (result.assets[0].uri.includes('jpeg')) {
            setImage(`data:image/jpeg;base64,${base64}`);
          }
          else if (result.assets[0].uri.includes('jpg')) {
            setImage(`data:image/jpg;base64,${base64}`);
          }
          else if (result.assets[0].uri.includes('png')) {
            setImage(`data:image/png;base64,${base64}`);
          }
        } catch (error) {
          console.error('error 3', error);
        }
      }
    }


    const isAllergetic = (data) => {

      // console.log("length", userAllergies.length)
      const productIngred = data["words"]
      // console.log("product ingres",productIngred)


      // console.log("type of product ingre", productIngred)
      productIngred.forEach((item, index, array) => {
          array[index] = item.toUpperCase();
      });

      var allergyIngred = [];

      for (let j = 0; j < userAllergies.length; j++) {

          // console.log(j)

          // allergyIngred=...allergyIngred+ (userAllergies && userAllergies[j] ? userAllergies[j]["ingredients"] : [])
          allergyIngred = userAllergies.reduce((accumulator, current) => {
            return [...accumulator, ...(current ? current["ingredients"] : [])];
          }, []);
          // console.log("j", userAllergies[j]["ingredients"])
          allergyIngred.forEach((item, index, array) => {
              array[index] = item.toUpperCase();
          });

          // console.log("allergy ingre",allergyIngred);
          // console.log("prod ingredients ",productIngred);

      }
      var commonIngredients = [];

      const smallerArray = allergyIngred.length < productIngred.length ? allergyIngred : productIngred;
      const largerArray = allergyIngred.length >= productIngred.length ? allergyIngred : productIngred;
      var danger = false

      // console.log("allergypord",allergyIngred)
      for (let i = 0; i < smallerArray.length; i++) {
          // console.log(i)
          // console.log("element", smallerArray[i])
          
          if (largerArray.includes(smallerArray[i])) {
              // console.log("larger", largerArray)
              // console.log(`"${smallerArray[i]}" is a common ingredient`);
              commonIngredients.push(smallerArray[i]);
              //setAllergy(userAllergies[j])
              danger = true
          }
      }
      set_isDanger(danger)
      
      // console.log("common ingredients",commonIngredients)
      if (commonIngredients.length > 0) {
          setDangerous(`Product may contains`);
          setCommonIngred(commonIngredients.join(", "));
      } else {
          setDangerous("Safe product! you can consume it :)");
          setCommonIngred(null)
      }

  }


 
    
    
  useEffect(() => {

    if (image) {
      // console.log("9bl l fetch", image)
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
          setText(data.words.join(","))

          // is allergic
          isAllergetic(data)
         
        })
        .catch(error => console.error(1, error));
    }
    else {
      console.log("empty image")
    }

  }, [image]);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:"#FFF8E7" }}>
      {image && <Image source={{ uri: imageUri }} 
      
      style={{
        width:400,
        aspectRatio:3,
      }}
      />}

      <View style={{ flexDirection: 'row' }}>
                { isDanger && <AntDesign name="warning" size={24} color="black" />}
                { <Text style={styles.dangerous}> {dangerous} </Text>}    
      </View>

      <Text>{commonIngred}</Text>
      <Button title="Pick an image from camera roll" color='tomato' onPress={pickImage} />
      <SideBar navigation={navigation}/>
    </View>
  );
};
















const styles = StyleSheet.create({
  container: {
      flex:1,
        backgroundColor: '#FFF8E7',
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
  image:{
      width:200,
      aspectRatio:1,
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