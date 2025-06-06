import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Dimensions,
  Alert,
  Platform,
  StatusBar,
  ActivityIndicator
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
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaProblem, setCaptchaProblem] = useState({ question: '', answer: 0 });
  const generateCaptcha = useCallback(() => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const isAddition = Math.random() < 0.5;

    if (isAddition) {
      setCaptchaProblem({
        question: `${num1} + ${num2} = ?`,
        answer: num1 + num2
      });
    } else {
      const larger = Math.max(num1, num2);
      const smaller = Math.min(num1, num2);
      setCaptchaProblem({
        question: `${larger} - ${smaller} = ?`,
        answer: larger - smaller
      });
    }
  }, []);
  useEffect(() => {
    generateCaptcha();
  }, [generateCaptcha]);

  const handleLogin = useCallback(async () => {
    if (!username.trim() || !password.trim()) {
      Alert.alert('Error', 'Please enter both username and password');
      return;
    }

    if (!captchaAnswer.trim()) {
      Alert.alert('Error', 'Please solve the captcha');
      return;
    }

    if (Number(captchaAnswer) !== captchaProblem.answer) {
      Alert.alert('Error', 'Incorrect captcha answer');
      setCaptchaAnswer('');
      generateCaptcha();
      return;
    }

    setIsLoading(true);
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
    } finally {
      setIsLoading(false);
    }
  }, [username, password, login, navigation, captchaAnswer, captchaProblem.answer, generateCaptcha]);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword);
  }, [showPassword]);

  const inputContainerStyle = useMemo(() => [
    styles.inputContainer01,
    { top: height * 0.15 }
  ], [height]);

  const loginButtonStyle = useMemo(() => [
    styles.loginButton01,
    { top: height * 0.15 }
  ], [height]);

  return (
    <View style={styles.container01}>
      <StatusBar 
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        backgroundColor="#FFFFFF" 
        translucent={false}
      />
      <View style={styles.backgroundOverlay01} />
      <Text style={[styles.loginText01, { top: height * 0.1 }]}>LOG IN</Text>

      <View style={inputContainerStyle}>
        <Icon name="user" size={24} color="black" style={styles.inputIcon01} />
        <TextInput
          style={styles.input01}
          placeholder='Username'
          value={username}
          onChangeText={setUsername}
        />
      </View>

      <View style={inputContainerStyle}>
        <Icon name="lock" size={24} color="black" style={styles.inputIcon01} />
        <TextInput
          style={styles.input01}
          placeholder='Password'
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
          <Icon name={showPassword ? "eye-slash" : "eye"} size={20} color="black" />
        </TouchableOpacity>
      </View>
      <View style={[inputContainerStyle, styles.captchaContainer]}>
        <Icon name="shield" size={24} color="black" style={styles.inputIcon02} />
        <View style={styles.captchaContent}>
          <Text style={styles.captchaQuestion}>{captchaProblem.question}</Text>
          <TextInput
            style={[styles.input01, styles.captchaInput]}
            placeholder='Enter answer'
            value={captchaAnswer}
            onChangeText={setCaptchaAnswer}
            keyboardType="numeric"
          />
        </View>
        <TouchableOpacity onPress={generateCaptcha} style={styles.refreshIcon}>
          <Icon name="refresh" size={20} color="black" />
        </TouchableOpacity>
      </View>
      
      <View style={[styles.straightLine01, { top: height * 0.45 + 24 }]} />
      
      <TouchableOpacity 
        style={loginButtonStyle} 
        onPress={handleLogin}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text style={styles.loginButtonText01}>Login</Text>
        )}
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
        height: height * 0.82,
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
    inputIcon02: {
      marginLeft: width*0.05,
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
    eyeIcon: {
        position: 'absolute',
        right: 10,
    },
    captchaContainer: {
        height: height * 0.078,
    },
    captchaContent: {
        flex: 1,
        flexDirection: 'column',
        marginLeft:width*0.06,
        justifyContent: 'center',
    },
    captchaQuestion: {
        fontSize: width*0.045,
        fontWeight: 'bold',
        color: '#096759',
        // marginBottom: width*0.01,
    },
    captchaInput: {
        width: '100%',
        height: width*0.08,
        fontSize: width*0.045,
        fontWeight: '200',
    },
    refreshIcon: {
        position: 'absolute',
        right: 10,
        padding: 5,
    },
});

export default React.memo(Login);