import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native'
import React,{useState} from 'react'
import logo from "../assets/SafeBite-removebg-preview.png"
import { AntDesign } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';


TouchableOpacity.defaultProps = { activeOpacity: 0.8 };

const AppButton = ({ onPress, title }) => (
    <TouchableOpacity style={styles1.buttonLogin} onPress={onPress}  >
        <Text style={styles1.loginText} > {title}</Text>
    </TouchableOpacity>
);



const onPressLogin = () => { }

export default function Login({navigation}) {
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
   
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
                    <AntDesign name="user" size={24} color="black" style={{ padding: 20 }} />
                    <TextInput style={styles1.TextInput} value={email} onChange={(e)=>{setemail(e.nativeEvent.text)}} placeholder='Email' />
                </View>
                <View style={styles1.inputLogin}>
                    <Entypo name="lock" size={24} color="black" style={{ padding: 20 }} />
                    <TextInput
                        placeholder='password' 
                        value={password} 
                        onChange={(e)=>{setpassword(e.nativeEvent.text)}}
                        secureTextEntry={true}/>
                </View>

                {<AppButton title='login' onPress={onPressLogin} />}
                <Text> Dont have an account ? <Text style={styles1.signup} onPress={()=>{navigation.navigate("Signup")}}> Sign Up</Text> </Text>
                <View style={styles1.footer}>
                    <Text>signup using:</Text>
                    <View style={styles1.leslogo}>
                        <FontAwesome5 name="google" size={24} color="black" style={{paddingRight:10}} />
                        <FontAwesome name="facebook" size={24} color="black" />
                    </View>
                </View>
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
        margin: 20,
        borderRadius: 10
    },
    loginText: {
        color: '#F8B82E',
        fontSize: 20
    },
    footer:{
        marginTop:50
    },
    leslogo:{
        flexDirection:"row",
        padding:20,

    }

})
