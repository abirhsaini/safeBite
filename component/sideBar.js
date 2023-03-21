import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from "react-native";
import { Foundation } from '@expo/vector-icons'; 
import { MaterialIcons } from '@expo/vector-icons'; 
import { Ionicons } from '@expo/vector-icons'; 

const SideBar =({ navigation })=>{
    return(
        <View style={styles.sideBar}>
            <TouchableOpacity style={styles.item} onPress={()=>{navigation.navigate("Home")}}>
                <Foundation name="home" size={45} color="white" />
                <Text style={styles.content}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}> 
                <MaterialIcons name="history" size={50} color="white" />
                <Text  style={styles.content}>History</Text>
            </TouchableOpacity>
        
            <TouchableOpacity style={styles.item}>
                <MaterialIcons name="qr-code-scanner" size={45} color="white" />
                <Text style={styles.content}>Scan</Text>
            </TouchableOpacity>
            
            <TouchableOpacity  onPress={()=>{navigation.navigate("Settings")}} style={styles.item}>
            <Ionicons name="settings-sharp" size={45} color="white" />
                <Text style={styles.content}>Settings</Text>
            </TouchableOpacity>
            
        </View>
    )
}
export default SideBar;

const styles = StyleSheet.create({
    sideBar: {
        backgroundColor: "rgba(255, 189, 89, 0.73)",
        height: 80,
        flexDirection: 'row', 
        alignItems: 'center',
        position: 'absolute',
        bottom: 0, 
        width: 450
        
    }, 
    item: {
       marginLeft: 45, 
       marginTop: 4,
       alignItems: 'center'
    },
    content: {
        color: 'white',
        fontSize: 15
    }
});