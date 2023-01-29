import Home from './pages/Home';
import Login from './pages/Login';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {BarScannerComponent} from './pages/BarcodeScanner.jsx'

const Stack = createNativeStackNavigator();
export default function App() {
  return (
//     <NavigationContainer>
//    <Stack.Navigator>
//    <Stack.Screen name="Login" component={Login} />
//         <Stack.Screen name="Home" component={Home} />
//     </Stack.Navigator>
//     </NavigationContainer>
    <BarScannerComponent/>
 


  );
}

