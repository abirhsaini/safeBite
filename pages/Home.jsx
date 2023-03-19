import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet,StatusBar,Image } from 'react-native';

import { AuthContext } from '../context/authContext';
import NavBar from '../component/nav';
import UserAvatar from 'react-native-user-avatar';
import SideBar from '../component/sideBar';
import { Styles } from '@expo/config-plugins/build/android';


export default function Home() {
  const { logout } = useContext(AuthContext);
 
 


  return (
    <View style={styles.container}>
      <NavBar />
      <View style={styles.content1}>
        <UserAvatar style={{marginRight:30}} size={50} name="John Doe" bgColors={['#ccc', '#fafafa', '#ccaabb']}/>
        <Text style={{marginLeft:30}}> oumaima ouahline </Text>
        {/* <Button title="Logout" onPress={() => logout()} /> */}
      </View>
      <View style={Styles.content2}>
    
        <Text style={{marginLeft:30}}>My allergies</Text>
      </View>
      <View style={styles.sidebar}>
        {/* Sidebar component */}
        <SideBar />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
    flex: 1,
  },
  content1: {
    justifyContent:"center",
    padding:15,
    flexDirection: "row",
    alignItems: 'center',
  },
  content2:{
    marginTop:40
  },
  sidebar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    
  },
});