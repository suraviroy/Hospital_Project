import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get("window");

const Login = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        
        if (username === "pulmo" && password === "1234") {
            
            navigation.navigate('BottomNavigation');
        }else if (username === "register" && password === "1234"){
            navigation.navigate('RegisterNavbar');
        }
        else {
          
            alert('Invalid username or password');
        }
    };

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
                    onChangeText={text => setUsername(text)}
                />
            </View>

            <View style={styles.inputContainer01}>
                <Icon name="lock" size={24} color="black" style={styles.inputIcon01} />
                <TextInput
                    style={styles.input01}
                    placeholder='Password'
                    secureTextEntry={true}
                    value={password}
                    onChangeText={text => setPassword(text)}
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
        backgroundColor: '#2A9988',
    },
    container01: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',

      },
      backgroundOverlay01: {
        backgroundColor: '#2A9988',
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
        color: '#2A9988',
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
        backgroundColor: '#2A9988',
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
