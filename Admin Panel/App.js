import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/AuthContext';
import AppNavigator from './AppNavigator';

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;