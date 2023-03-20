import React, {createContext, useState, useEffect} from 'react';
import axios from "axios"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert} from 'react-native';
import jwt_decode from "jwt-decode";



const JWT_Secret = "geguergjndgdnfgjfnfsdieapa3435334vgedffsgdbds"

export const AuthContext = createContext();
;

export const AuthProvider =({children})=>{
    const [loading, setloading] = useState(false);
    const [userToken, setuserToken] = useState(null);
    const [userId,setuserId]=useState(null)
    const [username, setusername] = useState(null);
    const [userAllergies,setuserAllergies]=useState(null)
    
    
 
   
    const login =(email,password)=>{ 
        axios.post("https://safebite.onrender.com/login", {email,password})
        .then((response)=>{
            
            setuserToken(response.data);
            setloading(false);
            AsyncStorage.setItem('AccessToken', response.data);
            
           
        })
        .catch((err)=>{
            
             if(err.response.status===404){ return Alert.alert("error","email incorrect")}
             if(err.response.status===401){ return Alert.alert("error","please fill all")}
             if(err.response.status===404){ return Alert.alert("error","mot de passe incorrect")}


        })
    }
    const logout =()=>{ 
        setloading(true)
        setuserToken(null)
        AsyncStorage.removeItem("AccessToken")
        setloading(false);
    }

    const islogged = async()=>{
        try{
            setloading(false);
            let userToken =await AsyncStorage.getItem("AccessToken") 
            var decoded = jwt_decode(userToken);
            setuserId(decoded.userId);
            setusername(decoded.username)
            console.log(decoded.username)
            axios.get(`https://safebite.onrender.com/users/${decoded.userId}/allergies`)
            .then((response)=>{
                console.log(response.data);
                setuserAllergies(response.data)})
            .catch((err)=>{console.log(err)})
            setuserToken(userToken)
            setloading(false)
        }
        catch(err){
            console.log(err)

        }
        
    }
    useEffect(() => {
        islogged();
    }, []);
    return(
    <AuthContext.Provider value={{login, logout, loading,userToken,userAllergies,username}}>
        {children}
    </AuthContext.Provider>
)}