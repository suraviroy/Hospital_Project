import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Start = (props) => {
    const navigation = useNavigation();

  const handleGetStarted = () => {
  
    navigation.navigate('Login');
  };
    return (
        <View style={styles.startingPage}>
            <Image
                source={require("../../assets/images/frontpic.png")}
                style={styles.backgroundImage}
            />
            <Text style={[styles.getStartedFlexBox]}>
                <Text style={styles.doctor}>Institute of Pulmocare</Text>
                <Text style={styles.text}>{` `}</Text>
                <Text style={styles.laboratory}>& Research</Text>
            </Text>
            <TouchableOpacity
                style={styles.getStartedButton}
                onPress={handleGetStarted}
            >
                <Text style={styles.buttonText}>Get Started</Text>
                <Icon name="arrow-right" size={20} color='#35A9EA' style={styles.icon} />
            
            </TouchableOpacity>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    startingPage: {
        backgroundColor: '#35A9EA',
        flex: 1,
        height: "100%",
        overflow: "hidden",
        width: "100%",
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        top: 69,
        left: 10,
        borderRadius: 45,
        width: 386,
        height: 426,
        position: "absolute"
    },
    getStartedFlexBox: {
        alignItems: "center",
        position: "absolute",
        top: '75%',
      },
    doctor: {
       
        color: '#FFFFFF',
        fontSize: 24,
    },
    text: {
        fontWeight: "500",
       
        color: '#FFFFFF',
        fontSize: 24,
    },
    laboratory: {
        
        color: '#FFFFFF',
        fontSize: 24,
    },
    getStartedButton: {
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        width: windowWidth * 0.8,
        height: 52,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        bottom: 50,
    },
    buttonText: {
        fontSize: 16,
        fontWeight: "700",
       
        color: '#35A9EA',
    },
    icon: {
        marginLeft: 10,
    },
});

export default Start;
