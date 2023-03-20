import Home from './pages/Home';
import Login from './pages/Login';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Signup from './pages/Signup';
import { AuthContext, AuthProvider } from './context/authContext';
import { View ,ActivityIndicator} from 'react-native';
import { useContext } from 'react';
import Allergies from './pages/Allergies1';
import AddAlergy from './component/addAlergy';


const Stack = createNativeStackNavigator();
export default function AppNav() {
    const {loading,userToken} = useContext(AuthContext);
    if (loading){
      return(
      <View style={{justifyContent:'center',alignItems:"center",flex:1}}> 
        <ActivityIndicator size={'large'} color="rgba(242, 157, 56, 1)"
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
        <Stack.Screen name="Allergies" component={Allergies} 
        options={{headerStyle:{backgroundColor:"rgba(255, 189, 89, 0.73)"}}}/>
        <Stack.Screen name="Addallergie" component={AddAlergy} 
        options={{headerStyle:{backgroundColor:"rgba(255, 189, 89, 0.73)"}}}/>
        </Stack.Navigator>
        

      </NavigationContainer>
     
  
  
    );
    }
}