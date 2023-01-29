import React, { useState } from "react";
import { View, Image,  StyleSheet} from "react-native";

const LogoSafeBite =()=>{
    return(
        <View style={styles.image}>           
            <Image
            source={require('../assets/SafeBite-Icone.png')}
            style={{ width: 60, height: 60 }}
            />
        </View>
    )
}

export default LogoSafeBite;

const styles =StyleSheet.create({
    image: {
        alignItems: "center",
        marginTop: 140
    }
})