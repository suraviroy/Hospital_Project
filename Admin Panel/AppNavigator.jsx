import * as React from 'react';
import { useCallback, useEffect, useRef } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useFonts } from 'expo-font';
import * as FileSystem from 'expo-file-system';
import Start from './src/starting page/start';
import Login from './src/login page/login';
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
import DiseaseForm from './src/Register/RegisterPatient/DiseaseForm';
import PatientDetails from './src/ViewList/PatientDetails';
import UpdatedDetails from './src/ViewList/Updated Details/UpdatedDetails';
import UpdatedBasicDetails from './src/ViewList/Updated Details/UpdatedBasicDetails';
import PatientNavigation from './src/ViewList/Updated Details/PatientNavigation';
import NotificationNavbar from './src/Notification/NotificationNavbar';
import NotificationDetails from './src/Notification/NotificationDetails';
import NotiRequests from './src/Notification/NotiRequests';
import Actions from './src/Notification/Actions';
import { AuthProvider, useAuth } from './src/AuthContext';
import AdminPatientList from './src/ViewList/AdminPatientList';
import AdminNotiList from './src/home page/AdminNotiList';
import ReportNavbar from './src/Notification/ReportNavbar';
import NotiReport from './src/Notification/NotiReport';
import AllReport from './src/Notification/AllReport';
import ReportNotiList from './src/home page/ReportNotiList';
import PatientAllReport from './src/ViewList/Updated Details/PatientAllReport';


const Stack = createNativeStackNavigator();
// Function to get the user's IP address
const getUserIP = async () => {
  try {
    // Option 1: Using a public IP API service
    const response = await fetch('https://api.ipify.org?format=json', { 
      timeout: 5000 // 5 second timeout
    });
    if (!response.ok) {
      throw new Error('Failed to fetch IP');
    }
    const data = await response.json();
    return data.ip;
  } catch (error) {
    console.warn('Error getting IP address from primary service:', error.message);
    
    try {
      // Option 2: Alternative IP service as fallback
      const backupResponse = await fetch('https://api.db-ip.com/v2/free/self', { 
        timeout: 5000 // 5 second timeout
      });
      if (!backupResponse.ok) {
        throw new Error('Failed to fetch IP from backup service');
      }
      const backupData = await backupResponse.json();
      return backupData.ipAddress;
    } catch (backupError) {
      console.warn('Error getting IP from backup service:', backupError.message);
      // Return a default IP if all else fails
      return '27.0.0.1';
    }
  }
};

// Main logging function with enhanced error handling
const logNavigation = async (routeName, previousRouteName = null) => {
  try {
    // Get current timestamp
    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '/'); // Format as DD/MM/YYYY
    
    const formattedTime = currentDate.toLocaleTimeString('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false
    }); // Format as HH:MM:SS
    
    // Try to get user IP, but don't let it block the logging process
    let userIP = '27.0.0.1'; // Default value
    try {
      userIP = await Promise.race([
        getUserIP(),
        // Timeout after 3 seconds to prevent long delays
        new Promise(resolve => setTimeout(() => resolve('27.0.0.1'), 3000))
      ]);
    } catch (ipError) {
      console.warn('Could not get IP, using default:', ipError.message);
    }
    
    // Calculate response time (this is simulated)
    const responseTime = Math.floor(Math.random() * 500) + 100; // Random time between 100-600ms
    
    // Create the log message in the required format
    const method = previousRouteName ? `${previousRouteName} -> ${routeName}` : `Navigated to ${routeName}`;
    
    const logMessage = {
      message: `F -> ${formattedTime}, ${formattedDate}, ${userIP}, ${method}, Button Clicked, 200, ${responseTime.toFixed(3)} ms`
    };
    
    // First, try to save locally regardless of server status
    await saveLogLocally(formattedDate, formattedTime, logMessage.message);
    
    // Then attempt to send to server
    try {
      // Check if server is reachable before attempting request
      // const serverCheckResponse = await fetch('https://pulmocare-c0zk.onrender.com/health', { 
      //   method: 'GET',
      //   timeout: 2000, // 2 second timeout
      // }).catch(() => null); // Convert error to null
      
      // if (!serverCheckResponse || !serverCheckResponse.ok) {
      //   console.log('Server not available, using local logs only');
      //   return; // Exit this part and rely on local logs only
      // }
      
      // If we reach here, the server is available
      const response = await fetch('https://ipcr.tint.edu.in/log', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(logMessage),
      });
      if (!response.ok) {
        throw new Error(`Server responded with status: ${response.status}`);
      }
      
      console.log('Successfully logged navigation to server');
    } catch (networkError) {
      console.warn('Could not send log to server:', networkError.message);
      // Already saved locally, so no need to do anything here
    }
  } catch (error) {
    console.error('Critical error in logging navigation:', error);
    // Last resort - log to console only
    console.log(`CRITICAL: Failed to log navigation from ${previousRouteName} to ${routeName}`);
  }
};

// Helper function to save logs locally
const saveLogLocally = async (formattedDate, formattedTime, logMessageText) => {
  try {
    const logFilePath = `${FileSystem.documentDirectory}navigation_logs.txt`;
    const localLogMessage = `${logMessageText}\n`;
    
    const fileInfo = await FileSystem.getInfoAsync(logFilePath);
    
    if (fileInfo.exists) {
      await FileSystem.writeAsStringAsync(logFilePath, localLogMessage, {
        encoding: FileSystem.EncodingType.UTF8,
        append: true,
      });
    } else {
      const headerMessage = `=== Navigation Log Created: ${formattedDate} ===\n${localLogMessage}`;
      await FileSystem.writeAsStringAsync(logFilePath, headerMessage, {
        encoding: FileSystem.EncodingType.UTF8,
      });
    }
    console.log('Successfully saved log locally');
    console.log(localLogMessage)
    return true;
  } catch (fileError) {
    console.error('Failed to save log locally:', fileError);
    return false;
  }
};

function AppNavigator() {
  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/Content.ttf'),
    regular02: require('./assets/fonts/Inter-Regular.ttf'),
    regular01: require('./assets/fonts/CreteRound-Regular.ttf'),
    regular03: require('./assets/fonts/InriaSerif-Regular.ttf'),
    regular89: require('./assets/fonts/Lato-Regular.ttf'),
    medium01: require('./assets/fonts/Inter-Medium.ttf'),
    medium: require('./assets/fonts/Rubik-Medium.ttf'),
    bold09: require('./assets/fonts/Content-Bold.ttf'),
    bold: require('./assets/fonts/Dongle-Bold.ttf'),
    bold02: require('./assets/fonts/InriaSerif-Bold.ttf'),
    bold01: require('./assets/fonts/Inter-Bold.ttf'),
    extrabold01: require('./assets/fonts/Inter-ExtraBold.ttf'),
    semibold01: require('./assets/fonts/Inter-SemiBold.ttf'),
    semibold: require('./assets/fonts/Inter-SemiBold.ttf'),
    bold01: require('./assets/fonts/Lato-Bold.ttf'),
    black: require('./assets/fonts/Lato-Black.ttf'),
    light: require('./assets/fonts/Lato-Light.ttf'),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await Splashscreen.hideAsync();
    }
  }, [fontsLoaded]);

  const { userId, userType, isLoading } = useAuth();
  const currentScreen = useRef(null);
  const previousScreen = useRef(null);

  if (!fontsLoaded || isLoading) {
    return null;
  }
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false 
      }}
      screenListeners={{
        state: (e) => {
          // Get the current screen name from the navigation state
          const route = e.data.state.routes[e.data.state.index];
          const screenName = route.name;
          
          // Only log if the screen has changed
          if (currentScreen.current !== screenName) {
            previousScreen.current = currentScreen.current;
            currentScreen.current = screenName;
            
            // Log the navigation with both current and previous screen
            logNavigation(screenName, previousScreen.current);
          }
        }
      }}
    >
      
      {userId ? (
        userType === 'register' ? (
          <Stack.Screen name="RegisterNavbar" component={RegisterNavbar} />
        ) : (
          <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
        )
      ) : (
        <>
          <Stack.Screen name="Start" component={Start} />
          <Stack.Screen name="Login" component={Login} />
        </>
      )}
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="RegisterFirst" component={RegisterFirst} />
      <Stack.Screen name="ViewList" component={ViewList} />
      <Stack.Screen name="HomeAdmin" component={HomeAdmin} />
      <Stack.Screen name="AdminNotiList" component={AdminNotiList} />
      <Stack.Screen name="ReportNotiList" component={ReportNotiList} />
      <Stack.Screen name="AddAdmin" component={AddAdmin} />
      <Stack.Screen name="BasicDetails" component={BasicDetails} />
      <Stack.Screen name="PatientBasicDetails" component={PatientBasicDetails} />
      <Stack.Screen name="RegisterPatient" component={RegisteredPatient} />
      <Stack.Screen name="DiseaseForm" component={DiseaseForm} />
      <Stack.Screen name="PatientDetails" component={PatientDetails} />
      <Stack.Screen name="UpdatedDetails" component={UpdatedDetails} />
      <Stack.Screen name="UpdatedBasicDetails" component={UpdatedBasicDetails} />
      <Stack.Screen name="PatientNavigation" component={PatientNavigation} />
      <Stack.Screen name="NotificationNavbar" component={NotificationNavbar} />
      <Stack.Screen name="NotificationDetails" component={NotificationDetails} />
      <Stack.Screen name="NotiRequests" component={NotiRequests} />
      <Stack.Screen name="PatientAllReport" component={PatientAllReport} />
      <Stack.Screen name="ReportNavbar" component={ReportNavbar} />
      <Stack.Screen name="NotiReport" component={NotiReport} />
      <Stack.Screen name="AllReport" component={AllReport} />
      <Stack.Screen name="Actions" component={Actions} />
      <Stack.Screen name= "AdminPatientList" component={AdminPatientList} />
     </Stack.Navigator>
   );
}

export default AppNavigator;
