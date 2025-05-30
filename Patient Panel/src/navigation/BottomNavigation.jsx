import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../home page/home';
import { Ionicons, FontAwesome6, Fontisto } from 'react-native-vector-icons';
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

const BottomNavigation = () => {
    return (
        <Tab.Navigator
            initialRouteName='Home'
            activeColor='#357EEA'
            tabBarHideKeyBoard={true}
            headShown={false}
            inactiveColor="#3e2465"
            barStyle={{ paddingBottom: 40 }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = focused ? 'home-sharp' : 'home-outline';
                        return <Ionicons name={iconName} size={26} color={focused ? '#357EEA' : '#706767'} />;
                    } else if (route.name === 'Notification') {
                        iconName = focused ? 'hand-holding-medical' : 'hand-holding-medical';
                        return <FontAwesome6 name={iconName} size={26} color={focused ? '#357EEA' : '#706767'} />;
                    } else if (route.name === 'Reports') {
                        iconName = focused ? 'prescription' : 'prescription';
                        return <Fontisto name={iconName} size={26} color={focused ? '#357EEA' : '#706767'} />;
                    } else if (route.name === 'MyProfile') {
                        iconName = focused ? 'person-circle-sharp' : 'person-circle-outline';
                        return <Ionicons name={iconName} size={26} color={focused ? '#357EEA' : '#706767'} />;
                    }
                },
                tabBarLabelStyle: tabBarLabelStyle,
                tabBarActiveTintColor: '#357EEA',
                tabBarInactiveTintColor: '#706767',
                tabBarStyle: tabBarStyle,
            })}
        >
            <Tab.Screen
                name="Home"
                component={Home}
                options={{ tabBarLabel: 'Home', headerShown: false }}
            />
            <Tab.Screen
                name="Notification"
                component={Notification}
                options={{ tabBarLabel: 'Requests', headerShown: false }}
            />
            <Tab.Screen
                name="Reports"
                component={Reports}
                options={{ tabBarLabel: 'Appointments', headerShown: false }}
            />
            <Tab.Screen
                name="MyProfile"
                component={MyProfile}
                options={{ tabBarLabel: 'My Profile', headerShown: false }}
            />
        </Tab.Navigator>
    );
};

export default BottomNavigation;