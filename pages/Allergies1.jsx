import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, Switch, Image, Dimensions } from 'react-native';

import NavBar from '../component/nav';
import SideBar from '../component/sideBar';
import AllergieView from '../component/AllergieView';
import { Icon } from '@rneui/themed';
import Logo from '../component/logo';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default function Allergies1({navigation}) {
    const { width } = Dimensions.get('window');


    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback >
                <View style={styles.button}>

                    <Icon
                        name='add-circle'
                        color='rgba(242, 157, 56, 1)'
                    />
                    <Text onPress={()=>navigation.navigate("Addallergie")} style={{ color: "rgba(242, 157, 56, 1)", }}> CREATE NEW ALLERGY</Text>
                </View>
            </TouchableWithoutFeedback>
            <View style={styles.content2}>
                <Text style={{ marginLeft: 30, fontSize: 30 }}>Available Allergies</Text>
                <View style={styles.allergies}>
                    <AllergieView page="afficher" />

                </View>
            </View>
            <View style={styles.sidebar}>
                <Logo />
            </View>
            <View style={styles.sidebar}>
                <SideBar />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF8E7',
        flex: 1,
    },
    content1: {
        justifyContent: "center",
        padding: 15,
        flexDirection: "row",
        alignItems: 'center',
    },
    content2: {
        marginTop: 40,
        height: 300
    },
    sidebar: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,

    },
    allergies: {

        flex: 1
    },
    button: {
        flexDirection: "row",
        backgroundColor: "#FFFF",
        height: 50,
        marginTop: 40,

        justifyContent: "center",
        alignItems: 'center',

    },
    logo: {
        alignItems: 'center',
        marginBottom: 50
    }

});