
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";
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
                <Icon name="arrow-right" size={20} color={Color.colorDarkcyan} style={styles.icon} />
            </TouchableOpacity>
        </View>
    );
};

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    startingPage: {
        backgroundColor: Color.colorDarkcyan,
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        borderRadius: 45,
        bottom: 60,
        width: windowWidth * 0.9, 
        height: windowHeight * 0.55, 
    },
    getStartedFlexBox: {
        alignItems: "center",
        position: "absolute",
        top: '75%',
    },
    doctor: {
        color: Color.colorWhite,
        fontSize: windowWidth * 0.05,
    },
    text: {
        fontWeight: "500",
        color: Color.colorWhite,
        top: 10,
        fontSize: windowWidth * 0.05,
    },
    laboratory: {
        color: Color.colorWhite,
        fontSize: windowWidth * 0.05,
    },
    getStartedButton: {
        borderRadius: Border.br_5xs,
        backgroundColor: Color.colorWhite,
        width: windowWidth * 0.7,
        height: windowHeight * 0.08, 
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        bottom: windowHeight * 0.1, 
    },
    buttonText: {
        fontSize: FontSize.size_base,
        fontWeight: "700",
        color: Color.colorDarkcyan,
    },
    icon: {
        marginLeft: 10,
    },
});

export default Start;
