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
      <View> 
        <ActivityIndicator size={'large'} 
        />
      </View>
    }
    return (
      
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login"
            component={Login}
            options={{headerShown:false}}  />
          <Stack.Screen name="Signup"
            component={Signup}
            options={{headerShown:false}}  />
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
     
  
  
    );
}