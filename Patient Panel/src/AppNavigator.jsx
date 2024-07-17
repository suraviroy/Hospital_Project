import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext } from './AuthContext';
import Login from './Login';
import BottomNavigation from './BottomNavigation';

const Stack = createStackNavigator();

const AppNavigator = () => {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return null;
  }

  return (
    <Stack.Navigator>
      {isLoggedIn ? (
        <Stack.Screen 
          name="BottomNavigation" 
          component={BottomNavigation} 
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen 
          name="Login" 
          component={Login} 
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;