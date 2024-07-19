import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAuthState();
  }, []);

  const loadAuthState = async () => {
    try {
      const storedUserId = await AsyncStorage.getItem('userId');
      const storedUserType = await AsyncStorage.getItem('userType');
      if (storedUserId && storedUserType) {
        setUserId(storedUserId);
        setUserType(storedUserType);
      }
    } catch (error) {
      console.error('Error loading auth state:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (newUserId, newUserType) => {
    try {
      await AsyncStorage.setItem('userId', newUserId);
      await AsyncStorage.setItem('userType', newUserType);
      setUserId(newUserId);
      setUserType(newUserType);
    } catch (error) {
      console.error('Error saving auth state:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('userType');
      setUserId(null);
      setUserType(null);
    } catch (error) {
      console.error('Error removing auth state:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ userId, userType, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);