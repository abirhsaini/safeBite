import React, { useEffect, useState } from "react";
import {StatusBar} from 'expo-status-bar';
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button, View, Text, StyleSheet, Image } from "react-native";


export default function BarScannerComponent(){
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState("Not yet scanned!");
    const [product_name, setProduct_name] = useState("");
    const [product_image, setProduct_image] = useState("")

    const askForCameraPermission = () =>{
        (async ()=>{
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted')
        })()
    }

    //Request for camera permission
    useEffect(()=>{
        askForCameraPermission();
    },[]);

    //fetching data from open data foods
    useEffect(()=>{
        if(scanned===true){
            fetch(`https://world.openfoodfacts.org/api/v2/search?code=${text}&fields=code,product_name,image_front_small_url`)
            .then(response=>response.json())
            .then(response=>{
                let product_name = response.products[0].product_name
                let product_mage = response.products[0].product_image
                console.log(response.products)
                if(response.products===[]){
                    return setProduct_name("Desole le produit n'existe pasactuellement")
                }
                else{return setProduct_name(product_name), setProduct_image(product_image)}
            })
            .catch(error=>console.log(error))
        }
    })

    //What happens when we scan the bar code
    const handleBarCodeScanned = ({type, data}) => {
        setScanned(true);
        setText(data);
        console.log(`type: ${type} 
                    Data: ${data}
                    product_name: ${product_name}`)
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
                <BarCodeScanner
                showMarker={true}
                torchMode={'on'}
                onBarCodeScanned={scanned?undefined:handleBarCodeScanned}
                style={{height:600, width:400}}
                />
                
            </View>
            <Text style={styles.maintext}>{text}</Text>
            <Image
                source={{uri: product_image}}
                defaultSource="https://images.openfoodfacts.org/images/products/611/124/210/1197/front_fr.26.200.jpg"
                // style={{ width: 200, height: 200 }}
            />

            <Text style={styles.product_name}> bla bla {product_name}</Text>
            {scanned && <Button style={{position:'absolue', bottom:2}} title={'scan again?'} onPress={() => setScanned(false)} color='tomato' />}
            
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor:'#FFF8E7',
        alignItems:'center',
        justifyContent:'center'
    },
    barcodebox:{
        // position: 'absolute',
        // top:100,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 340,
        overflow: 'hidden',
        borderRadius: 20,
        marginTop:0
    },
    maintext:{
        fontSize:16,
        margin:20,
    },
    product_name:{
        fontSize:16,
        margin:20,
        textColor:'red'
    }
});