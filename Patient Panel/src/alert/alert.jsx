import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { CheckBox } from 'react-native-elements';
const { width, height } = Dimensions.get("window");
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const AlertNoti = (props) => {
    const navigation = useNavigation();
    const handleAlert = () => {
        navigation.navigate('Login');
    };
    const [isChecked, setIsChecked] = useState(false);

    const cautionPoints = [
        "This app is currently in its testing phase. Some features may not function as intended.",
        "You may encounter bugs, errors, or unexpected behavior while using the app.",
        "Data entered during this testing period may not be saved or may be lost.",
        "Patient information security measures are still being implemented. Use caution when entering sensitive data.",
        "The app's performance may be slower than expected as we optimize its functionality.",
        "Some features may be incomplete or subject to change in future updates.",
        "In case of emergencies, please use established hospital protocols rather than relying solely on this app.",
        "Your feedback is crucial. Please report any issues or suggestions to improve the app's functionality.",
        "We appreciate your cooperation and patience as we work to enhance this tool for better patient coordination.",
        "For immediate assistance or to report critical issues, please contact our support team."
    ];

    return (
        <View style={styles.container01}>
            <View style={styles.backgroundOverlay01}></View>
            <Text style={styles.title}>Please read it carefully</Text>
            <View style={styles.alertbg}>
                <View style={styles.straightLine01}></View>
                <ScrollView style={styles.scrollView}>
                    {cautionPoints.map((point, index) => (
                        <View key={index} style={styles.bulletPoint}>
                            <Text style={styles.bullet}>•</Text>
                            <Text style={styles.text01}>{point}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
            <View style={styles.checkboxContainer}>
                <CheckBox
                    title="I have read all the above information"
                    checked={isChecked}
                    onPress={() => setIsChecked(!isChecked)}
                    containerStyle={styles.checkbox}
                    textStyle={styles.checkboxText}
                />
            </View>
            <TouchableOpacity 
    style={[styles.alertButton01, !isChecked && styles.disabledButton]} 
    onPress={handleAlert}
    disabled={!isChecked}
>
    <View style={styles.buttonContent}>
        <Text style={styles.buttonText}>Proceed</Text>
        <Icon name="chevron-forward-circle-outline" size={20} color='#fff' style={styles.icon01} />
    </View>
</TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container01: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    backgroundOverlay01: {
        backgroundColor: '#357EEA',
        top: -height / 2,
        position: 'absolute',
        height: height * 0.60,
        width: width * 1.7,
        borderRadius: width * 8,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    alertbg: {
        flexDirection: 'column',
        backgroundColor: 'white',
        padding: 5,
        borderRadius: 10,
        maxHeight: height * 0.9,
        width: width * 0.9,
    },
    straightLine01: {
        position: 'absolute',
        top: 0,
        left: 10,
        width: 3,
        height: '100%',
        backgroundColor: '#357EEA',
    },
    scrollView: {
        marginLeft: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        paddingBottom: 20,
        color: '#E90808',
        paddingTop: 70,
        right: 50,
        fontFamily: "regular05",
    },
    bulletPoint: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    bullet: {
        marginRight: 5,
        color: '#357EEA',
    },
    text01: {
        flex: 1,
        fontSize: 14,
    },
    checkboxContainer: {
        width: width * 0.9,
        marginTop: 10,
    },
    checkbox: {
        backgroundColor: 'transparent',
        borderWidth: 0,
    },
    checkboxText: {
        fontSize: 14,
        fontWeight: 'normal',
    },
    alertButton01: {
        backgroundColor: '#357EEA',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        width: width * 0.9,
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    icon01: {
        marginLeft: 8,
    },
});

export default AlertNoti;