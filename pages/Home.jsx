import { View, Text, Button } from 'react-native'
import React,{ useContext} from 'react'
import { AuthContext } from '../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Home() {
  const {logout} = useContext(AuthContext);
  return (
    <View>
      <Button title='hi' onPress={()=>{logout()}}/>
    </View>
  )
}