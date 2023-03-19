

import { AuthContext, AuthProvider } from './context/authContext';
import { View ,ActivityIndicator} from 'react-native';
import { useContext } from 'react';
import AppNav from './AppNav';






export default function App() {

  return (

    <AuthProvider>
   <AppNav/>
    </AuthProvider>



  );
}
