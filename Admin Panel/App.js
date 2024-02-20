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


const Stack = createNativeStackNavigator();

function App() {
  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/Content.ttf'),
    regular02: require('./assets/fonts/Inter-Regular.ttf'),
    regular01: require('./assets/fonts/CreteRound-Regular.ttf'),
    regular: require('./assets/fonts/Dosis-Regular.ttf'),
    regular: require('./assets/fonts/Dongle-Regular.ttf'),
    regular: require('./assets/fonts/InriaSerif-Regular.ttf'),
    regular: require('./assets/fonts/Judson-Regular.ttf'),
    regular: require('./assets/fonts/Lato-Regular.ttf'),
    regular: require('./assets/fonts/JuliusSansOne-Regular.ttf'),
    medium01: require('./assets/fonts/Inter-Medium.ttf'),
    medium: require('./assets/fonts/Rubik-Medium.ttf'),
    bold: require('./assets/fonts/Content-Bold.ttf'),
    bold: require('./assets/fonts/Dongle-Bold.ttf'),
    bold: require('./assets/fonts/InknutAntiqua-Bold.ttf'),
    bold: require('./assets/fonts/InriaSerif-Bold.ttf'),
    bold01: require('./assets/fonts/Inter-Bold.ttf'),
    extrabold: require('./assets/fonts/Inter-ExtraBold.ttf'),
    semibold: require('./assets/fonts/Inter-SemiBold.ttf'),
    semibold: require('./assets/fonts/Inter-SemiBold.ttf'),
    bold: require('./assets/fonts/Lato-Bold.ttf'),
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
  // TIASHA
  //Suravi
  //Me again
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
       


      </Stack.Navigator>
    </NavigationContainer>
   
  );
}

export default App;
