import React, {createContext, useState} from 'react';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext();

export const AuthProvider =({children})=>{
    const [loading, setloading] = useState(true);
    const [userToken, setuserToken] = useState(null);

    const login =(email,password)=>{ 
        axios.post("https://safebite.onrender.com/login", {email,password})
        .then((response)=>{
            console.log(response)
            setuserToken(response.data.token);
            setloading(false);
            AsyncStorage.setItem('AccessToken', response.data.token);
            navigation.replace("Home")
           
        })
        .catch((err)=>{
            if(err.response.status===404){ return Alert.alert("error","email incorrect")}
            if(err.response.status===401){ return Alert.alert("error","please fill all")}
            if(err.response.status===404){ return Alert.alert("error","mot de passe incorrect")}


        })
    }
    const logout =()=>{ 
        setuserToken(null);
        setloading(false);
    }
    return(
    <AuthContext.Provider value={{login, logout, loading,userToken}}>
        {children}
    </AuthContext.Provider>
)}