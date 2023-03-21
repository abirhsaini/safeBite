import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { FontAwesome5 } from '@expo/vector-icons'; 


const NavBar =()=> {
    return(
        <View style={styles.nav}>
            <Text style={styles.content}>SafeBite</Text>
            <FontAwesome5 style={styles.icon} name="search" size={30} color="rgba(101, 76, 79, 1)" />
        </View>
    )
}

export default NavBar;
const styles = StyleSheet.create({
    nav: {
        backgroundColor: "rgba(255, 189, 89, 0.73)",
        height: 60,
        width: "100%",
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'center',
        // position:"absolute",
        // top: 31

    }, 
    content: {
        fontSize: 30,
        color: "rgba(101, 76, 79, 1)",
        fontWeight: 'bold'
    }, 
    icon: {
        paddingTop: 10,
        marginLeft: 8
    }

});
