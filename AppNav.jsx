import Home from './pages/Home';
import Login from './pages/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from './pages/Signup';
import { AuthContext, AuthProvider } from './context/authContext';
import { View ,ActivityIndicator} from 'react-native';
import { useContext } from 'react';


const Stack = createNativeStackNavigator();
export default function AppNav() {
    const {loading,userToken} = useContext(AuthContext);
    if (loading){
      return(
      <View style={{justifyContent:'center',alignItems:"center",flex:1}}> 
        <ActivityIndicator size={'large'} 
        />
      </View>
      )
    }
    console.log(userToken)
    if (userToken===null) {
      return(
        <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login"
            component={Login}
            options={{headerShown:false}}  />
          <Stack.Screen name="Signup"
            component={Signup}
            options={{headerShown:false}}  />
          
        </Stack.Navigator>
      </NavigationContainer>
      )
    } 
    else{
    return (
      
      <NavigationContainer>
        <Stack.Navigator>
        <Stack.Screen name="Home" component={Home} 
        options={{headerShown:false}}/>
        </Stack.Navigator>
      </NavigationContainer>
     
  
  
    );
    }
}