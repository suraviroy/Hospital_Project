import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons,FontAwesome5,MaterialCommunityIcons } from 'react-native-vector-icons';
import RegisterPatient from './RegisterPatient';
import AllPatient from './AllPatient';
import TodayPatient from './TodayPatient';
import RegisterPopup from './RegisterPopup';

const Tab = createBottomTabNavigator();

const tabBarStyle = {
    padding: 4,
    borderRadius: 5,
    height: 65,
    position: "absolute",
    paddingBottom: 0,
    backgroundColor: '#DBF4F1', 
    justifyContent: 'center',
    alignItems: 'center',
    
};

const tabBarLabelStyle = {
    fontSize: 13, 
    fontWeight: 'bold', 
    marginTop: 0,
    paddingBottom: 10, 
};

const RegisterNavbar = () => {
    return (
        <Tab.Navigator
            initialRouteName='RegisterPatient'
            activeColor='#EB6A58'
            tabBarHideKeyBoard={true}
            headShown={false}
            inactiveColor="#3e2465"
            barStyle={{ paddingBottom: 40 }}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused }) => {
                    let iconName;
                    let iconName1;
                    if (route.name === 'RegisterPatient') {
                        iconName = focused ? 'person-add-sharp' : 'person-add-outline';
                    } else if (route.name === 'AllPatient') {
                        iconName = focused ? 'list-circle-sharp' : 'list-circle-outline';
                    } else if (route.name === 'TodayPatient') {
                        iconName1 = focused ? 'clipboard-list' : 'clipboard-list-outline';
                    }
                    return (
                        <View style={{ flexDirection: 'row' }}>
                            <Ionicons name={iconName} size={26} color={focused ? '#077547' : '#706767'} />
                            <MaterialCommunityIcons name={iconName1} size={26} color={focused ? '#077547' : '#706767'} />
                        </View>
                    );
                },
                tabBarLabelStyle: tabBarLabelStyle,
                tabBarActiveTintColor: '#077547', 
                tabBarInactiveTintColor: '#706767', 
                tabBarStyle: tabBarStyle,
            })}
            
        >
            <Tab.Screen
                name="RegisterPatient"
                component={RegisterPatient}
                options={{
                    tabBarLabel: 'Register',
                    headerShown: false,
                }}
            />
           
             <Tab.Screen
                name="TodayPatient"
                component={TodayPatient}
                options={{
                    tabBarLabel: 'Today-Patients',
                    headerShown: false,
                }}
            />
             <Tab.Screen
                name="AllPatient"
                component={AllPatient}
                options={{
                    tabBarLabel: 'All-Patients',
                    headerShown: false,
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({});

export default RegisterNavbar;
