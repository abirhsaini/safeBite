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
