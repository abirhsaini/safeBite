<<<<<<< HEAD
import Home from './pages/Home';
import Login from './pages/Login';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BarScannerComponent from './pages/BarcodeScanner'
import TextRecognitionComponent from './Components/TextRecognition';
import TextRecognitionScreen from './Components/TextRecognitionScreen';
=======
import React from "react";
import { StyleSheet,  TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import AddAlergy from './component/addAlergy';
import NavBar from './component/nav';
import SideBar from './component/sideBar';
import LogoSafeBite from './component/logo';
>>>>>>> origin/fatimaVersion

// const Stack = createNativeStackNavigator();
export default function App() {
  return (
<<<<<<< HEAD
  <NavigationContainer>
   <Stack.Navigator>
   <Stack.Screen name="Login" 
      component={Login} 
      options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
 


=======
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <NavBar />
        <AddAlergy />
        <LogoSafeBite/>
        <SideBar />

      </View>
    </TouchableWithoutFeedback>
>>>>>>> origin/fatimaVersion
  );
}

const styles = StyleSheet.create({
  container: {
<<<<<<< HEAD
    justifyContent: 'center'
=======
    flex: 1,
    backgroundColor: '#FFF8E7',
>>>>>>> origin/fatimaVersion
  },
  imageBox:{

    width:300,
    height:300,
    borderColor:'black',
    borderWidth:10
}
})