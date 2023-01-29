import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
import { StatusBar } from 'expo-status-bar';
import { StyleSheet,  TouchableWithoutFeedback, View, Keyboard } from 'react-native';
import AddAlergy from './component/addAlergy';
import NavBar from './component/nav';
import SideBar from './component/sideBar';
import LogoSafeBite from './component/logo';

export default function App() {
  return (
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss();
    }}>
      <View style={styles.container}>
        <NavBar />
        <AddAlergy />
        <LogoSafeBite/>
        <SideBar />

      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF8E7',
  },
});
