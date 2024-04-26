import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Dimensions , Alert, ActivityIndicator} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import axios from "axios";
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";
import { backendURL } from "../backendapi";
const { width, height } = Dimensions.get("window");
const patientLoginURL = `${backendURL}/patientRouter/login`;
const Login = () => {
    const navigation = useNavigation();
    const [patientId, setPatientId] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
      setIsLoading(true);
      console.log(patientLoginURL)
      try {
          const response = await fetch(patientLoginURL, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  patientId: patientId,
                  password: password,
              }),
          });
          const responseData = await response.json();
          if (response.ok) {
            if (responseData.status === 'success') {
                const { result } = responseData;
                const { patientId, name, gender, age, contactNumber, bloodGroup, image } = result;
                navigation.navigate('BottomNavigation', { patientId: patientId });

        // fetch(`${backendURL}/patientRouter/HomePageDetails/${patientId}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         navigation.navigate('BottomNavigation', { patientId: patientId });
        //         console.log(patientId)
        //     })
            // .catch(error => {
            //     console.error('Error fetching patient details:', error);
            // });
            } else {
                console.error('Error:', responseData.message);
            }
        } 
        else {
            console.error('Error:', responseData.message);
        }
    } catch (error) {
        console.error('Error:', error);
    }finally {

        setIsLoading(false);
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
                    value={patientId}
                    onChangeText={text => setPatientId(text)}
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
        backgroundColor: '#35A9EA',
    },
    container01: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',

      },
      backgroundOverlay01: {
        backgroundColor: '#35A9EA',
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
        color: '#35A9EA',
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
        borderBottomColor: '#35A9EA',
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
        backgroundColor: '#35A9EA',
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
