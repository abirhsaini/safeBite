import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import BarScannerComponent from './Components/BarcodeScanner' 

export default function App() {
    return ( 
    <BarScannerComponent/>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 2,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});