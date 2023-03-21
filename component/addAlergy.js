import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useState,useContext } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";
import { AuthContext } from "../context/authContext";

const AddAllergy = () => {
  const [name, setName] = useState("");
  const [ingredients, setIngredients] = useState("");
  const {userId,islogged} = useContext(AuthContext);
  
  
  const handlePress = async () => {
    try {
      const response = await axios.post(
        "https://safebite.onrender.com/allergies/",
        { name, ingredients: ingredients.split(",") }  );
      console.log(response.data);
      console.log(response.data._id)
      const allergyId=response.data._id
      console.log(`https://safebite.onrender.com/users/${userId}/allergies/`)
      const response2= await axios.post(`https://safebite.onrender.com/users/${userId}/allergies/`,{allergyId})
      console.log(response2.data);
      islogged();
     
  
      
    } catch (error) {
      console.log(error.response);
    }
    
   

  };

  return (
    <View style={styles.form}>
      <View>
        <Text style={styles.label}>Allergy Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onChangeText={(value) => setName(value)}
        />
      </View>
      <View>
        <Text style={styles.label}>Search terms</Text>
        <TextInput
          style={styles.input}
          placeholder="Search terms, Comma separated"
          onChangeText={(value) => setIngredients(value)}
        />
      </View>
      <View style={styles.button}>
        <Button
          title="ADD ALLERGY"
          color="#F8B82E"
          onPress={handlePress}
        />
      </View>
    </View>
  );
};

export default AddAllergy;

const styles = StyleSheet.create({
  form: {
    marginTop: 30,
    marginLeft: 15,
  },
  label: {
    marginTop: 13,
    fontSize: 20,
    marginBottom: 10,
    marginLeft: 10,
    color: "#654C4F",
  },
  input: {
    width: 370,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#fff",
    fontSize: 20,
    height: 60,
    padding: 20,
    backgroundColor: "#fff",
  },
  button: {
    marginTop: 40,
    width: 150,
    alignItems: "center",
    marginLeft: 100,
  },
});