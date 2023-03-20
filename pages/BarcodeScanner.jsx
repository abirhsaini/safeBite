import React, { useContext, useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button, View, Text, StyleSheet, Image } from "react-native";
import { AuthContext } from "../context/authContext.jsx";
import { FlatList } from "react-native-gesture-handler";
import LogoSafeBite from "../component/logo.js";


export default function BarScannerComponent(){
    const { userAllergies } = useContext(AuthContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState("Not yet scanned!");
    const [product_name, setProduct_name] = useState("");
    const [product_allergies, setProduct_allergies] = useState("")
    const [product_image, setProduct_image] = useState("C:\Users\bachi\Desktop\safeBite\assets\safebite-icon.png")

    const askForCameraPermission = () =>{
        (async ()=>{
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted')
        })()
    }

    //Request for camera's permission
    useEffect(()=>{
        askForCameraPermission();
    },[]);

    //fetching data from open food facts api 
    useEffect(()=>{
        if(scanned===true){
            fetch(`https://world.openfoodfacts.org/api/v2/search?code=${text}&fields=code,product_name,product_name_fr,image_front_small_url,allergens_from_ingredients`)
            .then(response=>response.json())
            .then(response=>{

                let product_name =  response.products[0].product_name ||response.products[0].product_name_fr
                let product_image = response.products[0].image_front_small_url
                let allergies = response.products[0].allergens_from_ingredients

                console.log("1",product_name)
                console.log("2", typeof(userAllergies))
                // console.log(allergies)
                // console.log(response.products)

                if(response.products.length === 0){
                    return setProduct_name("Desole le produit n'existe pas actuellement")
                }
                else{
                    (() => {
                        setProduct_image(product_image);
                        setProduct_name(product_name);
                        setProduct_allergies(allergies);
                        return;
                      })();
                }
            })
            .catch(error=>console.log(error))
        }
    })

    useEffect(()=>{
        
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
            <LogoSafeBite/>
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
                style={styles.imageBox}
            />
            <Text style={styles.product_name}>{product_name}</Text>
            <Text>{product_allergies}</Text>
            {/* <Text>{userAllergies}</Text> */}

            {scanned && <Button title={'scan again?'} onPress={() => setScanned(false)} color='tomato' />}
            
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
    },
    imageBox:{
        width:200,
        height:100,
        resizeMode:"contain",
        borderWidth:1,
        overflow:'hidden'
    }
});