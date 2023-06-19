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
    const [userAllergies,setuserAllergies]=useState(null);
    const [allergiesStatus, setallergiesStatus] = useState([]);
    const login =(email,password)=>{ 
        setloading(false)
        axios.post("https://safebite.onrender.com/login", {email,password})
        .then((response)=>{
            
            setuserToken(response.data.token);
            setloading(false);
            AsyncStorage.setItem('AccessToken', response.data.token);
            islogged()
            
            
           
        })
        .catch((err)=>{
            
             if(err.response.status===404){ return Alert.alert("error","email incorrect")}
             if(err.response.status===401){ return Alert.alert("error","please fill all")}
             if(err.response.status===404){ return Alert.alert("error","mot de passe incorrect")}


        })
    }
    const logout =async()=>{ 
         setloading(true)
    setuserToken(null)
    console.log(userAllergies)
    await AsyncStorage.removeItem("AccessToken")
    await AsyncStorage.removeItem("userId")
    //await AsyncStorage.multiRemove(userAllergies.map((element) => element._id.toString()))
    setuserId(null)
    setusername(null)
    setuserAllergies(null)
    setallergiesStatus([])
    setloading(false);
    }

    const islogged = async()=>{
        try{
            setloading(false);
            let userToken =await AsyncStorage.getItem("AccessToken") 
            var decoded = jwt_decode(userToken);
            await setuserId(decoded.userId);
            setusername(decoded.username)
            console.log("hi")
            axios.get(`https://safebite.onrender.com/users/${decoded.userId}/allergies`)
            .then((response)=>{
                console.log(response.data)
                setuserAllergies(response.data)
                response.data.map(async(element) => {
                    await AsyncStorage.setItem(element._id.toString(),"true")
                });
                setloading(false)
            })
            .catch((err)=>{console.log(err)})
            setuserToken(userToken)
            
        }
        catch(err){
            console.log(err)

        }
        
    }
    useEffect(() => {
        islogged();
    }, []);
    return(
    <AuthContext.Provider value={{login, logout, loading,userToken,userAllergies,username,userId,islogged,setloading}}>
        {children}
    </AuthContext.Provider>
)}