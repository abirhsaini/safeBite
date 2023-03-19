import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, Image } from 'react-native';

import { AuthContext } from '../context/authContext';
import NavBar from '../component/nav';
import UserAvatar from 'react-native-user-avatar';
import SideBar from '../component/sideBar';
import AllergieView from '../component/AllergieView';




export default function Home() {
  const { logout } = useContext(AuthContext);




  return (
    <View style={styles.container}>
      <NavBar />
      <View style={styles.content1}>
        <UserAvatar style={{ marginRight: 30 }} size={50} name="John Doe" bgColors={['#ccc', '#fafafa', '#ccaabb']} />
        <Text style={{ marginLeft: 30, }}> oumaima ouahline </Text>
        <Button title="Logout" onPress={() => logout()} />
      </View>
      <View style={styles.content2}>

        <Text style={{ marginLeft: 30, fontSize: 30 }}>My allergies</Text>
        <View style={styles.allergies}>
          <AllergieView />

        </View>
        <Text style={{ textAlign: "right", color: "#654C4F", marginRight: 10 }}> See all allergies  </Text>
      </View>
      <View style={styles.deuxbouttons}>
        <View >
          <Text style={styles.button}> Scan code</Text>
          </View>
        <View  >
          <Text style={styles.button}>scan ingredients</Text>
          </View>
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
    backgroundColor: '#FFF8E7',
    paddingTop: StatusBar.currentHeight,
    flex: 1,
  },
  content1: {
    justifyContent: "center",
    padding: 15,
    flexDirection: "row",
    alignItems: 'center',
  },
  content2: {
    marginTop: 40,
    height: 300
  },
  sidebar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,

  },
  allergies: {

    flex: 1
  },
  deuxbouttons: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "center",
    marginTop:30,

  },
  button: {
    backgroundColor: "rgba(133, 95, 77, 1)",
    padding:10,
    width: 150,
    height:60,
    color: "#FFFFFF",
    textAlignVertical:"center",
    textAlign:"center",
    marginLeft:30,
    marginRight:30,
    borderRadius:30


  }

});