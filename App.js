import { AuthContext, AuthProvider } from './context/authContext';
import { View, ActivityIndicator } from 'react-native';
import { useContext } from 'react';
import AppNav from './AppNav';
import BarScannerComponent from './pages/BarcodeScanner';
import { LogBox } from 'react-native';



export default function App() {

  LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
  LogBox.ignoreAllLogs();//Ignore all log notifications

  return (

    <AuthProvider>
      <AppNav />
      {/* <BarScannerComponent/> */}
    </AuthProvider>



  );
}
