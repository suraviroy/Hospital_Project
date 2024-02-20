import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const Start = (props) => {
    const navigation = useNavigation();

  const handleGetStarted = () => {
  
    navigation.navigate('BottomNavigation');
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

const styles = StyleSheet.create({
    startingPage: {
        backgroundColor: Color.colorDarkcyan,
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
       
        color: Color.colorWhite,
        fontSize: 24,
    },
    text: {
        fontWeight: "500",
       
        color: Color.colorWhite,
        fontSize: 24,
    },
    laboratory: {
        
        color: Color.colorWhite,
        fontSize: 24,
    },
    getStartedButton: {
        borderRadius: Border.br_5xs,
        backgroundColor: Color.colorWhite,
        width: windowWidth * 0.8,
        height: 52,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        bottom: 50,
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
