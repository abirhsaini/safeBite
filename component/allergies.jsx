import { View, Text, FlatList,StyleSheet } from 'react-native'
import React ,{useState, useContext} from 'react'
import { AuthContext } from '../context/authContext';

export default function allergies() {
  const {userAllergies} = useContext(AuthContext);
    
    const [data, setdata] = useState(userAllergies);
    return (
        <View style={{flex: 1, height: "100%"}}>
            <FlatList
                style={styles.notificationList}
                data={userAllergies}
                keyExtractor={ item => item._id}
                renderItem={({item})=>{
                    return (
                        <Text style={styles.name}>{item.name}</Text>
                    )
                }}
            />
        </View>
    )

 
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        
      },
    notificationList: {
        marginTop: 20,
        padding: 10,
        
        
      },
      name: {
        fontSize: 20,
        borderRadius:30,
        textAlignVertical:"center",
        height:50,
        alignItems:"center",
        width:300,
        color: '#000000',
        marginTop:10,
        marginLeft: 10,
        textAlign:"center",
        backgroundColor: '#FFFFFF',
        alignSelf: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      
    })
