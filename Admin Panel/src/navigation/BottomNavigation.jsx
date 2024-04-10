import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../home page/home';
import { Ionicons } from 'react-native-vector-icons';


import Notification from '../Notification/Notification';
import ViewList from '../ViewList/ViewList';
import RegisterNotifications from '../Register/RegisterPatient/RegisterNotifications';
import RegisterFirst from '../Register/RegisterFirst';

const Tab = createBottomTabNavigator();

const tabBarStyle = {
    padding: 4,
    borderRadius: 5,
    height: 65,
    position: "absolute",
    paddingBottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#DBF4F1', 
};

const tabBarLabelStyle = {
    fontSize: 13, 
    fontWeight: 'bold', 
    marginTop: 0,
    paddingBottom: 10, 
};

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            activeColor='#EB6A58'
            tabBarHideKeyBoard={true}
            headShown={false}
            inactiveColor="#3e2465"
            barStyle={{ paddingBottom: 40 }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        iconName = focused ? 'home-sharp' : 'home-outline';
                    } else if (route.name === 'Notification') {
                        iconName = focused ? 'notifications-sharp' : 'notifications-outline';
                    } else if (route.name === 'RegisterNotifications') {
                        iconName = focused ? 'person-add-sharp' : 'person-add-outline';
                    } else if (route.name === 'ViewList') {
                        iconName = focused ? 'list-circle-sharp' : 'list-circle-outline';
                    }

                  
                    return <Ionicons name={iconName} size={26} color={focused ? '#077547' : '#706767'}
                    />;
                    
                },
                tabBarLabelStyle: tabBarLabelStyle,
                tabBarActiveTintColor: '#077547', 
                tabBarInactiveTintColor: '#706767', 
                tabBarStyle: tabBarStyle,
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                
                options={{
                    tabBarLabel: 'Home',
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="Notification"
                component={Notification}
                options={{
                    tabBarLabel: 'Notifications',
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="RegisterNotifications"
                component={RegisterNotifications}
                options={{
                    tabBarLabel: 'Register',
                    headerShown: false,
                }}
            />
            <Tab.Screen
                name="ViewList"
                component={ViewList}
                options={{
                    tabBarLabel: 'Patient-List',
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({});

export default BottomNavigation;
