import { View, Text, FlatList, StyleSheet, Switch } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { AuthContext } from '../context/authContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AllergieView(props) {
  console.log(props.page)

  const { userAllergies, loading,setloading } = useContext(AuthContext);
  const [isEnabled, setIsEnabled] = useState(false);
  const [data, setdata] = useState(userAllergies);
  

  useEffect(() => {
    
    const getData = async () => {
      const values = await AsyncStorage.multiGet(userAllergies.map((item) => item._id));
      console.log("data ",userAllergies)
      const newData = userAllergies.map((item, index) => {
        const value = values[index][1];
        console.log(value)
        item.isEnabled = value === 'true';
        return item;
      });
      setdata(newData);
      setloading(false)
    };
    getData();
  }, [userAllergies]);

  const toggleSwitch = (index) => {
    const newData = [...data];
    newData[index].isEnabled = !newData[index].isEnabled;
    setdata(newData);
    AsyncStorage.setItem(newData[index]._id, `${newData[index].isEnabled}`);
  };

  if (props.page === "masquer") {
    return (
      <View style={{ flex: 1, height: "100%" }}>
        <FlatList
          style={styles.notificationList}
          data={data}
          keyExtractor={item => item._id}
          renderItem={({ item }) => {
            return (
              <>
                <Text style={styles.name}>{item.name}</Text>
              </>
            )
          }}
        />
      </View>
    )
  }

  if (props.page === "afficher") {
    return (
      <View style={{ flex: 1, height: "100%" }}>
        <FlatList
          style={styles.notificationList}
          data={data}
          keyExtractor={item => item._id}
          renderItem={({ item, index }) => {
            return (
              <View style={{ flexDirection: "row", backgroundColor: '#FFFFFF' }}>
                <Text style={styles.name2}>{item.name}</Text>
                <Switch
                  trackColor={{ false: '#CCCCCC', true: 'rgba(242, 157, 56, 1)' }}
                  thumbColor={item.isEnabled ? '#ffff' : '#ffff'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => toggleSwitch(index)}
                  value={item.isEnabled}
                />
              </View>
            )
          }}
        />
      </View>
    )
  }

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
    borderRadius: 30,
    textAlignVertical: "center",
    height: 50,
    alignItems: "center",
    width: 300,
    color: '#000000',
    marginTop: 10,
    marginLeft: 10,
    textAlign: "center",
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
  name2: {
    fontSize: 20,
    textAlignVertical: "center",
    height: 50,
    alignItems: "center",
    width: 300,
    color: '#000000',
    marginTop: 10,
    marginLeft: 10,
    textAlign: "left",
    alignSelf: 'center',
   
  },

})