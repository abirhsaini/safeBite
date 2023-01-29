import React, { useEffect, useState } from "react";
import {StatusBar} from 'expo-status-bar';
import {BarCodeScanner} from "expo-barcode-scanner";
import { Button, View, Text, StyleSheet } from "react-native";
// import BarcodeScanner from 'react-native-barcodescanner';


export default BarScannerComponent = () =>{
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState("Not yet scanned!");

    const askForCameraPermission = ()=>{
        (async ()=>{
            const {status} = await BarCodeScanner.requestPermissionAsync();
            setHasPermission(status == 'granted')
        })()
    }

    //Request for camera permission
    useEffect(()=>{
        askForCameraPermission();
    },[]);

    //What happens when we scan the bar code
    const handleBarCodeScanned = ({type,data})=>{
        setScanned(true);
        setText(data);
        console.log(`type: ${type} 
        Data: ${data}`)
    }

    //Check for permissions and return the screens
    if(hasPermission===null){
        return(
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        );
    }

    if(hasPermission===false){
        return (
            <View style={styles.container}>
                <Text style={{margin:10}}>No access to camera </Text>
                <Button title={'Allow camera'} onPress={()=>askForCameraPermission()}/>

            </View>
        )
    }

    //return view
    return(
        <View style={styles.container}>
            <View style={styles.barcodebox}>

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#fff',
        alignItems:'center',
        justifyContent:'center'
    },
    barcodebox:{
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 300,
        overflow: 'hidden',
        borderRadius: 30,
        backgroundColor: 'tomato'
    }
});