import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../home page/home';
import { Ionicons, FontAwesome,FontAwesome6 ,Fontisto} from 'react-native-vector-icons';
import MyProfile from '../MyProfile/MyProfile';
import Notification from '../Notification/Notification';
import Reports from '../Reports/reports';

const Tab = createBottomTabNavigator();

const tabBarStyle = {
  padding: 4,
  borderRadius: 5,
  height: 65,
  position: "absolute",
  paddingBottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '#D1EDFC',
};

const tabBarLabelStyle = {
  fontSize: 13,
  fontWeight: 'bold',
  marginTop: 0,
  paddingBottom: 10,
};

const BottomNavigation = ({ route }) => {
  const { patientId} = route.params;
  return (
    <Tab.Navigator
      initialRouteName='Home'
      activeColor='#0E79B5'
      tabBarHideKeyBoard={true}
      headShown={false}
      inactiveColor="#3e2465"
      barStyle={{ paddingBottom: 40 }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name === 'Home') {
            iconName = focused ? 'home-sharp' : 'home-outline';
            return <Ionicons name={iconName} size={26} color={focused ? '#0E79B5' : '#706767'} />;
          } else if (route.name === 'Notification') {
            iconName = focused ? 'hand-holding-medical' : 'hand-holding-medical';
            return <FontAwesome6 name={iconName} size={26} color={focused ? '#0E79B5' : '#706767'} />;
          }  else if (route.name === 'Reports') {
            iconName = focused ? 'prescription' : 'prescription';
            return <Fontisto name={iconName} size={26} color={focused ? '#0E79B5' : '#706767'} />;
          } else if (route.name === 'MyProfile') {
            iconName = focused ? 'person-circle-sharp' : 'person-circle-outline';
            return <Ionicons name={iconName} size={26} color={focused ? '#0E79B5' : '#706767'} />;
          }
        },
        tabBarLabelStyle: tabBarLabelStyle,
        tabBarActiveTintColor: '#0E79B5',
        tabBarInactiveTintColor: '#706767',
        tabBarStyle: tabBarStyle,
      })}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{ tabBarLabel: 'Home', headerShown: false }}
        initialParams={{ patientId: patientId }}
      />
      <Tab.Screen
        name="Notification"
        component={Notification}
        options={{ tabBarLabel: 'Requests', headerShown: false }}
        initialParams={{ patientId: patientId }}
      />
      <Tab.Screen
        name="Reports"
        component={Reports}
        options={{ tabBarLabel: 'Appoinments', headerShown: false }}
        initialParams={{ patientId: patientId }}
      />
      <Tab.Screen
        name="MyProfile"
        component={MyProfile}
        options={{ tabBarLabel: 'My Profile', headerShown: false }}
        initialParams={{ patientId: patientId }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default BottomNavigation;
