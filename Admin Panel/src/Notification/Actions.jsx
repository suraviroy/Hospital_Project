import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator,Dimensions, Image, ScrollView, TextInput, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Color } from '../../GlobalStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { backendURL } from "../backendapi";

const windowWidth = Dimensions.get('window').width;

const Action = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { patientId, requestId } = route.params;
    const [isLoading1, setIsLoading1] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [customAction, setCustomAction] = useState('');

    const options = [
        "Start oxygen inhalation",
        "Rush to nearest emergency and hospitalization & inform",
        "Get admitted and inform us with the name and phone number of your doctor so that we can contact him",
        "Send the details of admission/discharge certificate",
        "Please send the death certificate for our record"
    ];

    const handleOptionSelect = (index) => {
        if (selectedOption === index) {
            setSelectedOption(null);
        } else {
            setSelectedOption(index);
            setCustomAction('');
        }
    };

    const handleCustomActionChange = (text) => {
        setCustomAction(text);
        setSelectedOption(null);
    };

    const renderOptions = () => {
        return options.map((option, index) => (
            <TouchableOpacity
                key={index}
                style={[
                    styles.optionBox,
                    selectedOption === index && {
                        backgroundColor: '#09675980',
                        color: '#fff',
                    },
                ]}
                onPress={() => handleOptionSelect(index)}
            >
                <View style={[styles[`circle${index + 1}`], selectedOption === index && { backgroundColor: '#096759' }]}></View>
                <Text style={styles.optionText}>{option}</Text>
            </TouchableOpacity>
        ));
    };

    const sendAction = async () => {
        let actionToSend = '';
        if (selectedOption !== null) {
            actionToSend = options[selectedOption];
        } else if (customAction.trim() !== '') {
            actionToSend = customAction.trim();
        }

        if (actionToSend) {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ action: actionToSend })
            };
            
            try {
                setIsLoading1(true);
                const response = await fetch(`${backendURL}/adminRouter/action/${requestId}`, requestOptions);
                const data = await response.json();
                Alert.alert(
                    "Action Taken",
                    "Thank you for taking action!",
                    [
                        { text: "OK", onPress: () => navigation.navigate('BottomNavigation') }
                    ]
                );
                setIsLoading1(false);
            } catch (error) {
                setIsLoading1(false);
                console.error('Error:', error);
                Alert.alert("Error", "An error occurred while sending the action. Please try again.");
            }
        } else {
            setIsLoading1(false);
            Alert.alert("No Action", "Please select an action or type a custom action.");
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.bottomContainer}>
                    <Image source={require('../../assets/images/action.png')} style={styles.bottomImage} />
                    <Text style={[styles.bottomText, { fontWeight: 'bold' }]}>What action do you want to take?</Text>
                    <View style={styles.optionsContainer}>
                        {renderOptions()}
                        <View style={styles.customActionContainer}>
                            <TextInput
                                style={styles.customActionInput}
                                placeholder="Type custom action here"
                                value={customAction}
                                onChangeText={handleCustomActionChange}
                                multiline
                            />
                        </View>
                    </View>
                    <TouchableOpacity style={styles.sendButton} onPress={sendAction}>
                    {isLoading1 ? (
                            <ActivityIndicator size="small" color={Color.colorWhite} />
                        ) : (
                            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>
                                Submit
                            </Text>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: -windowWidth*0.01,
    },
    header: {
        paddingTop: 30,
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 0.18,
        borderBottomColor: '#ccc',
    },
    title: {
        fontSize: 25,
        marginLeft: 70,
        fontFamily: 'bold01',
    },
    bottomContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    bottomImage: {
        width: 200,
        height: 200,
        marginBottom: 10,
        marginTop: -8,
    },
    bottomText: {
        fontSize: 18,
        left: -30,
    },
    optionsContainer: {
        flexDirection: 'column',
        alignItems: 'stretch',
        marginTop: 10,
    },
    optionBox: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#D9D9D980',
        borderRadius: 12,
        padding: 6,
        marginBottom: 10,
        marginLeft: 0,
        width: windowWidth - 54,
    },
    optionText: {
        fontSize: 14,
        color: '#000',
        marginLeft: 10,
    },
    circle1: {
        width: 16,
        height: 16,
        borderRadius: 10,
        backgroundColor: '#000',
        position: 'absolute',
        left: -20,
        top: 8,
    },
    circle2: {
        width: 16,
        height: 16,
        borderRadius: 10,
        backgroundColor: '#000',
        position: 'absolute',
        left: -20,
        top: 16,
    },
    circle3: {
        width: 16,
        height: 16,
        borderRadius: 10,
        backgroundColor: '#000',
        position: 'absolute',
        left: -20,
        top: 25,
    },
    circle4: {
        width: 16,
        height: 16,
        borderRadius: 10,
        backgroundColor: '#000',
        position: 'absolute',
        left: -20,
        top: 16,
    },
    circle5: {
        width: 16,
        height: 16,
        borderRadius: 10,
        backgroundColor: '#000',
        position: 'absolute',
        left: -20,
        top: 16,
    },
    customActionContainer: {
        marginTop: 10,
        width: windowWidth - 54,
    },
    customActionInput: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 14,
        padding: 10,
        minHeight: 80,
        textAlignVertical: 'top',
    },
    sendButton: {
        backgroundColor: '#096759',
        borderRadius: 6,
        paddingVertical: 10,
        paddingHorizontal: 140,
        marginTop: 20,
        marginBottom: 16,
    },
    sendButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default Action;