import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React ,{useState}from 'react'
import { Fontisto } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import logo from "../assets/SafeBite-removebg-preview.png"
import axios from "axios"

TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity style={styles1.buttonLogin} onPress={onPress}  >
        <Text style={styles1.loginText} > {title}</Text>
    </TouchableOpacity>
);





export default function Signup({ navigation }) {
    const [email, setemail] = useState("");
const [username, setusername] = useState("");
const [password, setpassword] = useState("");
const [conpassword, setconpassword] = useState("");

const onPressLogin = () => { 
    axios.post("http://localhost:5000/login", {email, username,password, conpassword }).then((response)=>{
        console.log(response)
    })

}
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles1.root}>
                <LinearGradient

                    colors={['#FFFFFF', '#F8B82E']}
                    style={{ flex: 1, width: "100%", alignItems: "center" }}
                    locations={[0.66, 0.999999]}
                >



                    <Image source={logo} style={styles1.logoStyle} resizeMode="contain" />
                    <View style={styles1.inputLogin}>
                        <AntDesign name="user"
                            size={24} color="black"
                            style={{ padding: 20 }} />
                        <TextInput style={styles1.TextInput}
                            placeholder='username'
                            value={username}
                            onChange={(e) => { setusername(e.nativeEvent.text) }} />
                    </View>
                    <View style={styles1.inputLogin}>
                        <Fontisto name="email"
                            size={24}
                            color="black"
                            style={{ padding: 20 }} />
                        <TextInput
                            value={email}
                            placeholder='Email'
                            onChange={(e) => { setemail(e.nativeEvent.text) }} />
                    </View>
                    <View style={styles1.inputLogin}>
                        <Entypo name="lock" size={24} color="black" style={{ padding: 20 }} />
                        <TextInput
                            placeholder='password'
                            value={password}
                            onChange={(e) => { setpassword(e.nativeEvent.text) }} />
                    </View>
                    <View style={styles1.inputLogin}>
                        <Entypo name="lock" size={24} color="black" style={{ padding: 20 }} />
                        <TextInput
                            placeholder='confirm password'
                            value={conpassword}
                            onChange={(e) => { setconpassword(e.nativeEvent.text) }} />
                    </View>
                    <View style={styles1.footer}>
                        <Text>signup using:</Text>
                        <View style={styles1.leslogo}>
                            <FontAwesome5 name="google"
                                size={24}
                                color="black"
                                style={{ paddingRight: 10 }} />
                            <FontAwesome name="facebook"
                                size={24}
                                color="black" />
                        </View>
                    </View>
                    {<AppButton
                        title='signup'
                        onPress={onPressLogin} />}

                </LinearGradient>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles1 = StyleSheet.create({
    logoStyle: {
        width: 100,
        height: 150,
        marginTop: 50
    },
    root: {
        flex: 1,

    },
    inputLogin: {
        width: 200,
        flexDirection: "row",
        alignItems: 'center',
        borderBottomWidth: 1,

    },
    TextInput: {
        size: 30,
        paddingRight: 10
    },

    signup: {
        // fontFamily: 'Pacifico',
        color: '#F8B82E',
    },
    buttonLogin: {
        backgroundColor: "#855F4D",

        padding: 20,

        borderRadius: 10
    },
    loginText: {
        color: '#F8B82E',
        fontSize: 20
    },
    footer: {
        marginTop: 10
    },
    leslogo: {
        flexDirection: "row",
        padding: 10,

    }

})