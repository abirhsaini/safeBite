import React, { useContext, useEffect, useState } from "react";
import { BarCodeScanner } from "expo-barcode-scanner";
import { Button, View, Text, StyleSheet, Image, StatusBar } from "react-native";
import { AuthContext } from "../context/authContext.jsx";
import { FlatList } from "react-native-gesture-handler";
import LogoSafeBite from "../component/logo.js";
import axios from "axios";
import NavBar from "../component/nav.js";
import SideBar from "../component/sideBar.js";
import { AntDesign } from '@expo/vector-icons';

export default function BarScannerComponent({ navigation }) {
    const { userAllergies } = useContext(AuthContext);
    const [hasPermission, setHasPermission] = useState(null);
    const [scanned, setScanned] = useState(false);
    const [text, setText] = useState("Not yet scanned!");
    const [product_name, setProduct_name] = useState("");
    const [product_allergies, setProduct_allergies] = useState("")
    const [product_image, setProduct_image] = useState("C:\Users\bachi\Desktop\safeBite\assets\safebite-icon.png")
    const [isDanger, set_isDanger] = useState(false);
    const [dangerous, setDangerous] = useState("");
    const [commonIngred, setCommonIngred] = useState(null)
    const [allergy, setAllergy] = useState(null)

    const askForCameraPermission = () => {
        (async () => {
            const { status } = await BarCodeScanner.requestPermissionsAsync();
            setHasPermission(status == 'granted')
        })()
    }

    const clearData = () => {
        setScanned(false)
        // setText(null)
        // setProduct_name(null)
        // setProduct_allergies(null)
        // set_isDanger(null)
        // setCommonIngred(null)
        // setAllergy(null)

    }
    //verify if the product contains some allergetic ingredients
    const isAllergetic = () => {

        // console.log("length", userAllergies.length)
        const productIngred = product_allergies ? product_allergies.split(",") : [];

        // console.log("type of product ingre", productIngred)
        productIngred.forEach((item, index, array) => {
            array[index] = item.toUpperCase();
        });

        var Empty = [];

        for (let j = 0; j < userAllergies.length; j++) {


            allergyIngred = userAllergies.reduce((accumulator, current) => {
                return [...accumulator, ...(current ? current["ingredients"] : [])];
              }, []);

            allergyIngred.forEach((item, index, array) => {
                array[index] = item.toUpperCase();
            });

            // console.log("allergy ingre",allergyIngred);
            // console.log(productIngred);

        }
        var commonIngredients = [];

        const smallerArray = allergyIngred.length < productIngred.length ? allergyIngred : productIngred;
        const largerArray = allergyIngred.length >= productIngred.length ? allergyIngred : productIngred;
        var danger = false

        console.log("allergypord",allergyIngred)
        for (let i = 0; i < smallerArray.length; i++) {
            console.log(i)
            console.log("element", smallerArray[i])
            
            if (largerArray.includes(smallerArray[i])) {
                // console.log("larger", largerArray)
                console.log(`"${smallerArray[i]}" is a common ingredient`);
                commonIngredients.push(smallerArray[i]);
                //setAllergy(userAllergies[j])
                danger = true
            }
        }
        set_isDanger(danger)
        
        console.log("common ingredients",commonIngredients)
        if (commonIngredients.length > 0) {
            setDangerous(`Product may contains`);
            setCommonIngred(commonIngredients.join(", "));
        } else {
            setDangerous("Safe product! you can consume it :)");
            setCommonIngred(null)
        }

    }
    //Request for camera's permission
    useEffect(() => {
        askForCameraPermission();
    }, []);

    //fetching data from open food facts api 
    useEffect(() => {
        if (scanned === true) {
            fetch(`https://world.openfoodfacts.org/api/v2/search?code=${text}&fields=code,product_name,product_name_fr,image_front_small_url,allergens_from_ingredients,_keywords,ingredients_text`)
                .then(response => response.json())
                .then(response => {
                    console.log("resp")
                    let product_name = response.products[0].product_name || response.products[0].product_name_fr
                    let product_image = response.products[0].image_front_small_url
                    let allergies = response.products[0].allergens_from_ingredients +response.products[0]._keywords+","+response.products[0].ingredients_text.split("\n")

                    console.log("keywords", response.products[0]._keywords)
                    console.log("allergies2222", allergies)
                    console.log("allergens produc", response.products[0].allergens_from_ingredients)
                    console.log(response.products[0])


                    // console.log("1",product_name)
                    // console.log("alle", allergies, "de type", typeof (allergies))
                    // console.log("ingred", response.products[0]._keywords)

                    if (response.products.length === 0) {
                        return setProduct_name("Desole le produit n'existe pas actuellement")
                    }
                    else {
                        (() => {
                            setProduct_image(product_image);
                            setProduct_name(product_name);
                            setProduct_allergies(allergies);
                            return;
                        })();
                    }
                })
                .catch(error => console.log("this", error))
        }
    })

    useEffect(() => {
        isAllergetic();
        // console.log(product_allergies)
        // console.log("type of userAllergies", userAllergies[1]["ingredients"])
    })

    //What happens when we scan the bar code
    const handleBarCodeScanned = ({ type, data }) => {
        setScanned(true);
        setText(data);
        //     console.log(`type: ${type} 
        //                 Data: ${data}
        //                 product_name: ${product_name}`)
    }

    //Check for permissions and return the screens
    if (hasPermission === null) {
        return (
            <View style={styles.container}>
                <Text>Requesting for camera permission</Text>
            </View>
        );
    }

    if (hasPermission === false) {
        return (
            <View style={styles.container}>
                <Text style={{ margin: 10 }}>No access to camera </Text>
                <Button title={'Allow camera'} onPress={() => askForCameraPermission()} />
            </View>
        )
    }

    //return view
    return (
        <View style={styles.container}>
            <View style={styles.navBar}>
                <NavBar />
            </View>

            <View style={styles.barcodebox}>
                <BarCodeScanner
                    showMarker={true}
                    torchMode={'on'}
                    onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
                    style={{ height: 600, width: 400 }}
                />
            </View>

            {!scanned && <Text style={styles.maintext}>Please scan your product</Text>}
            {/* <Text style={styles.maintext}>{text}</Text> */}
            {scanned && <Text style={styles.product_name}>{product_name}</Text>}

            {/* <Text>{allergy}</Text> */}
            <View style={styles.warning}>
                {scanned && isDanger && <AntDesign name="warning" size={28} color="tomato" />}
                {scanned && <Text style={styles.dangerous}> {dangerous} </Text>}
            </View>


            {scanned && <Text>{commonIngred}</Text>}
            <View style={styles.button}>
                {scanned && <Button title={'scan again?'} onPress={clearData} color='tomato' />}
            </View>
            <SideBar navigation={navigation} />

            {/* <Image
                source={{uri: product_image}}
                style={styles.imageBox}
            /> */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF8E7',
        alignItems: 'center',
        justifyContent: 'center',
        // paddingTop: StatusBar.currentHeight,
    },
    warning: {
        flexDirection: 'row',
        margin: 20,
    },
    dangerous: {
        fontSize: 16
    },
    navBar: {
        position: "absolute",
        top: 31,
        width: "100%"
    },
    barcodebox: {
        // position: 'absolute',
        // top:100,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        height: 300,
        width: 340,
        overflow: 'hidden',
        borderRadius: 20,
        marginTop: 0
    },
    maintext: {
        fontSize: 16,
        margin: 20,
        fontWeight: 'bold'
    },
    product_name: {
        fontSize: 18,
        margin: 20,
        fontWeight: 'bold',


    },
    imageBox: {
        width: 200,
        height: 100,
        resizeMode: "contain",
        borderWidth: 1,
        overflow: 'hidden'
    },
    button: {
        flex: 1,
        position: "absolute",
        bottom: 150,
    }
});