import React, { useContext, useState, useCallback, useMemo } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions, ActivityIndicator, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";
import { backendURL } from "../backendapi";
import { AuthContext } from '../AuthContext';

const { width, height } = Dimensions.get("window");
const patientLoginURL = `${backendURL}/patientRouter/login`;

const Login = () => {
    const { login } = useContext(AuthContext);
    const [patientId, setPatientId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = useCallback(async () => {
        if (!patientId.trim() || !password.trim()) {
            Alert.alert('Error', 'Please enter both username and password');
            return;
        }

        setIsLoading(true);
        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 30000);

            const response = await fetch(patientLoginURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    patientId: patientId,
                    password: password,
                }),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            const responseData = await response.json();
            if (response.ok && responseData.status === 'success') {
                const { result } = responseData;
                await login(result.patientId);
                Alert.alert('Success', 'Logged in successfully');
            } else {
                Alert.alert('Error', responseData.message || 'Login failed');
            }
        } catch (error) {
            if (error.name === 'AbortError') {
                Alert.alert('Error', 'Login request timed out. Please try again.');
            } else {
                Alert.alert('Error', 'An unexpected error occurred. Please try again.');
            }
            console.error('Error:', error);
        } finally {
            setIsLoading(false);
        }
    }, [patientId, password, login]);

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
            <View style={styles.backgroundOverlay01}></View>
            <Text style={[styles.loginText01, { top: height * 0.1 }]}>LOG IN</Text>

            <View style={inputContainerStyle}>
                <Icon name="user" size={24} color="black" style={styles.inputIcon01} />
                <TextInput
                    style={styles.input01}
                    placeholder='Username'
                    value={patientId}
                    onChangeText={setPatientId}
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
            <View style={[styles.straightLine01, { top: height * 0.45 + 24 }]}></View>
            <TouchableOpacity 
                style={loginButtonStyle} 
                onPress={handleLogin}
                disabled={isLoading}
            >
                {isLoading ? (
                    <ActivityIndicator size="small" color={Color.colorWhite} />
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
        backgroundColor: '#357EEA',
    },
    container01: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    backgroundOverlay01: {
        backgroundColor: '#357EEA',
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
        color: '#357EEA',
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
        borderBottomColor: '#357EEA',
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
        backgroundColor: '#357EEA',
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
});

export default React.memo(Login);