import React, { useContext } from 'react';
import { View, Text, Button, StyleSheet, StatusBar, Image } from 'react-native';

import NavBar from '../component/nav';
import SideBar from '../component/sideBar';
import Allergies from '../component/AllergieView';
import Logo from '../component/logo';

export default function Allergies() {

    return (
        <View style={styles.container}>
            <NavBar />
            <View style={styles.button}>
                <Button title='ADD ALLERGY' color={'#F8B82E'} />
            </View>
            <View style={styles.content2}>
                <Text style={{ marginLeft: 30, fontSize: 30 }}>Available Allergies</Text>
                <View style={styles.allergies}>
                    <Allergies />
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
        paddingTop: StatusBar.currentHeight,
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
    button:  {
        marginTop:40,
        width: 150,
        alignItems: 'center',
        marginLeft: 100
    },
    logo:{
        alignItems: 'center',
        marginBottom: 50
    }

});