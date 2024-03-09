import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Start from './src/starting page/start';
import Login from './src/login page/login';
import { useFonts } from 'expo-font';
import { useCallback } from 'react';
import Home from './src/home page/home';
import Notification from './src/Notification/Notification';
import RegisterFirst from './src/Register/RegisterFirst';
import ViewList from './src/ViewList/ViewList';
import BottomNavigation from './src/navigation/BottomNavigation';
import HomeAdmin from './src/home page/HomeAdmin';
import AddAdmin from './src/AddAdmin/AddAdmin';
import RegisterNavbar from './src/Registration Panel/RegisterNavbar';
import BasicDetails from './src/Register/RegisterPatient/BasicDetails';
import PatientBasicDetails from './src/Registration Panel/PatientBasicDetails';
import RegisteredPatient from './src/Register/RegisterPatient/RegisteredPatient';


const Stack = createNativeStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/Content.ttf'),
    regular02: require('./assets/fonts/Inter-Regular.ttf'),
    regular01: require('./assets/fonts/CreteRound-Regular.ttf'),
    regular: require('./assets/fonts/Dosis-Regular.ttf'),
    regular: require('./assets/fonts/Dongle-Regular.ttf'),
    regular03: require('./assets/fonts/InriaSerif-Regular.ttf'),
    regular: require('./assets/fonts/Judson-Regular.ttf'),
    regular89: require('./assets/fonts/Lato-Regular.ttf'),
    regular: require('./assets/fonts/JuliusSansOne-Regular.ttf'),
    medium01: require('./assets/fonts/Inter-Medium.ttf'),
    medium: require('./assets/fonts/Rubik-Medium.ttf'),
    bold09: require('./assets/fonts/Content-Bold.ttf'),
    bold: require('./assets/fonts/Dongle-Bold.ttf'),
    bold: require('./assets/fonts/InknutAntiqua-Bold.ttf'),
    bold02: require('./assets/fonts/InriaSerif-Bold.ttf'),
    bold01: require('./assets/fonts/Inter-Bold.ttf'),
    extrabold01: require('./assets/fonts/Inter-ExtraBold.ttf'),
    semibold: require('./assets/fonts/Inter-SemiBold.ttf'),
    semibold: require('./assets/fonts/Inter-SemiBold.ttf'),
    bold01: require('./assets/fonts/Lato-Bold.ttf'),
    black: require('./assets/fonts/Lato-Black.ttf'),
    light: require('./assets/fonts/Lato-Light.ttf'),
    
  });
  const onLayoutRootView = useCallback(async () => {
    if(fontsLoaded){
      await Splashscreen.hideAsync();
    }
  }, [fontsLoaded]);
  if(!fontsLoaded){
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Start" component={Start}/>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Notification" component={Notification}  />
        <Stack.Screen name="RegisterFirst" component={RegisterFirst} />
        <Stack.Screen name="ViewList" component={ViewList} />
        <Stack.Screen name="BottomNavigation" component={BottomNavigation}/>
        <Stack.Screen name="HomeAdmin" component={HomeAdmin}/>
        <Stack.Screen name="AddAdmin" component={AddAdmin}/>
        <Stack.Screen name="RegisterNavbar" component={RegisterNavbar}/>
        <Stack.Screen name="BasicDetails" component={BasicDetails}/>
        <Stack.Screen name="PatientBasicDetails" component={PatientBasicDetails}/>
        <Stack.Screen name="RegisterPatient" component={RegisteredPatient}/>



      </Stack.Navigator>
    </NavigationContainer>
   
  );
}

export default App;
