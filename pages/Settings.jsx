import { View, Text,StyleSheet,Image,TouchableOpacity } from 'react-native'
import React,{useContext} from 'react'
import SideBar from '../component/sideBar';
import logo from "../assets/SafeBite-Icone.png"
import english from "../assets/imgbin-logo-primera-air-organization-business-english-language-british-flag-zSPA9W4mDSMqHmnRnzhgdxHLs.jpg"
import star from "../assets/6201789.jpg"
import feedback from "../assets/2038898.jpg"
import question from "../assets/question-icon-design-vector.jpg"
import { AuthContext } from '../context/authContext';




export default function Settings({navigation}) {
    const { logout, username } = useContext(AuthContext);
  return (
    <View style={styles.container}>
        <View style={styles.support1}>
            <Image source={logo} style={{ width: 60, height: 60 }}/>
            <Text style={styles.text}>SafeBite supporter</Text>
        </View>
        <Text style={styles.text}> Scanner</Text>
        <View style={styles.support}>
            <Image source={english} style={{ width: 60, height: 60 }}/>
            <Text style={styles.text}>English</Text>
        </View>
        <Text style={{margin:20}}>The language that you want the app to search for. You can change this language when you’re traveling abroad, or buying foreign products</Text>
        <View style={styles.support}>
            <Image source={feedback} style={{ width: 60, height: 60 }}/>
            <Text style={styles.text}>Feedback</Text>
        </View>
        <View style={styles.support}>
            <Image source={question} style={{ width: 60, height: 60 }}/>
            <Text style={styles.text}>Frequently asked questions</Text>
        </View>
        <View style={styles.support}>
            <Image source={star} style={{ width: 60, height: 60 }}/>
            <Text style={styles.text}>Rate our app</Text>
        </View>
        <TouchableOpacity style={styles.deuxbouttons} onPress={() => logout()}>
        <View>
          <Text style={styles.button}>log out</Text>
        </View>
        </TouchableOpacity>
        
      
      <View style={styles.sidebar}>
        {/* Sidebar component */}
        <SideBar  navigation={navigation}/>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#FFF8E7',
      position:'relative',
      top:30,
      
      flex: 1,
    },
    support1: {
        flexDirection:"row",
        marginTop:20,
        paddingLeft:30,
      height:70,
      alignItems:"center",
      backgroundColor:"#fff"
    },
    support: {
        flexDirection:"row",
        paddingLeft:30,
      height:70,
      alignItems:"center",
      backgroundColor:"#fff"
    },
    text: {
      fontSize:20,
      paddingLeft:20
    },
    sidebar: {
      position: 'relative',
      bottom: 30,
      left: 0,
      right: 0,
    },
    allergies: {
      flex: 1,
    },
    deuxbouttons: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      marginTop: 30,
    },
    button: {
      backgroundColor: 'rgba(133, 95, 77, 1)',
      padding: 10,
      fontSize:20,
      width: 150,
      height: 60,
      color: '#DCA148',
      textAlignVertical: 'center',
      textAlign: 'center',
      marginLeft: 30,
      marginRight: 30,
      borderRadius: 30,
    },
  });