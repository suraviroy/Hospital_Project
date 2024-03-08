
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterPatient from '../RegisterPanel/RegisterPatient';

const Stack = createNativeStackNavigator();

const RegisterPanelStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#DBF4F1', 
        },
      }}>
      <Stack.Screen
        name="Register"
        component={RegisterPatient}
        options={{
          title: 'Register', 
          headerTintColor: 'black', 
        }}
      />
    </Stack.Navigator>
  );
}

export default RegisterPanelStack;