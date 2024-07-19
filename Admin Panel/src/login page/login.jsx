import React, { useState, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Dimensions,
  Alert
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';

const { width, height } = Dimensions.get("window");

const Login = () => {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = useCallback(async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    try {
      if (username === "pulmo" && password === "1234") {
        await login(username, 'user');
        navigation.replace('BottomNavigation');
      } else if (username === "register" && password === "1234") {
        await login(username, 'register');
        navigation.replace('RegisterNavbar');
      } else {
        Alert.alert('Error', 'Invalid username or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', 'An error occurred during login. Please try again.');
    }
  }, [username, password, login, navigation]);

  return (
    <View style={styles.container01}>
      <View style={styles.backgroundOverlay01}></View>
      <Text style={styles.loginText01}>LOG IN</Text>

      <View style={styles.inputContainer01}>
        <Icon name="user" size={24} color="black" style={styles.inputIcon01} />
        <TextInput
          style={styles.input01}
          placeholder='Username'
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={styles.inputContainer01}>
        <Icon name="lock" size={24} color="black" style={styles.inputIcon01} />
        <TextInput
          style={styles.input01}
          placeholder='Password'
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />
      </View>
      
      <View style={styles.straightLine01}></View>
      
      <TouchableOpacity style={styles.loginButton01} onPress={handleLogin}>
        <Text style={styles.loginButtonText01}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
    straightLine01: {
        position: 'absolute',
        top: height * 0.45 + 24,
        left: 30,
        width: 3,
        height: 230, 
        backgroundColor: '#096759',
    },
    container01: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',

      },
      backgroundOverlay01: {
        backgroundColor: '#096759',
        top: -height / 2,
        position: 'absolute',
        height: height * 0.88,
        width: width * 1.23,
        borderRadius: width * 8,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        
      },
      loginText01: {
        top: height*0.1,
        fontSize: 40,
        fontFamily: 'extrabold01',
        color: '#096759',
        alignItems: "center",
    },
    inputContainer01: {
        top: height*0.15,
        height: height*0.05,
        width: "70%",
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 2,
        borderBottomColor: 'rgba(0,139,139,0.7)',
        marginVertical: 13,
        backgroundColor: '#EEE9E9',
        borderRadius: 5,
    
    },
    inputIcon01: {
        marginRight: 20,
        
    },
    input01: {
        position: 'relative',
        borderRadius: 5,
        width: width*0.5,
        color: 'black',
        fontSize: 16,
        fontFamily: 'regular03',
        fontWeight:'300',
    },
    loginButton01: {
        backgroundColor: '#096759',
        top: height*0.15,
        width: "60%",
        borderRadius: 5,
        fontStyle: 'bold02',
        padding: 10,
        marginTop: 20,
        
    },
    loginButtonText01: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default Login;
