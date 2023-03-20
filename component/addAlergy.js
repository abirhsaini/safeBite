import React, { useState } from "react";
import { StyleSheet, View, Text, TextInput, Button } from "react-native";

const AddAlergy = () => {
    const [alergy, setAlergy] = useState('');
    const [terms, setTerms] = useState('');
    return(
        <View style={styles.form}>
            <View>
                <Text style={styles.label}>Allergy Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    onChangeText={value => setAlergy(value)}
                />
            </View>
            <View>
                <Text style={styles.label}>Search terms</Text>
                <TextInput
                    placeholder="Search terms, Comma separated"
                    onChangeText={value => setTerms(value)}
                    style={styles.input}
                />
            </View>
            <View style={styles.button}>
                 <Button title='ADD ALLERGY' color={'#F8B82E'}/>
            </View>

        </View>

    )
}

export default AddAlergy;

const styles = StyleSheet.create({
    form:{
        marginTop: 30,
        marginLeft: 15
    },
    label:{
        marginTop: 13,
        fontSize: 20,
        marginBottom: 10,
        marginLeft: 10,
        color: '#654C4F',
    },
    input:{
        width: 370, 
        borderWidth: 1,
        borderRadius: 6,
        borderColor: '#fff', 
        fontSize: 20,
        height: 60,
        padding: 20, 
        backgroundColor: '#fff',
    },
    button:  {
        marginTop:40,
        width: 150,
        alignItems: 'center',
        marginLeft: 100
    }
})
