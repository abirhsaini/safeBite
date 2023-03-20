import Home from './pages/Home';
import Login from './pages/Login';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import BarScannerComponent from './pages/BarcodeScanner'
import TextRecognitionComponent from './Components/TextRecognition';
import TextRecognitionScreen from './Components/TextRecognitionScreen';

// const Stack = createNativeStackNavigator();
export default function App() {
  return (
  <NavigationContainer>
   <Stack.Navigator>
   <Stack.Screen name="Login" 
      component={Login} 
      options={{headerShown:false}}/>
        <Stack.Screen name="Home" component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
 
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  imageBox:{

    width:300,
    height:300,
    borderColor:'black',
    borderWidth:10
}
})