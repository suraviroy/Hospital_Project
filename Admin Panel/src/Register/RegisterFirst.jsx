import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";

const RegisterFirst = () => {
    const [image, setImage] = useState(null);
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [idNumber, setIdNumber] = useState('');

    const handleRegister = () => {
        console.log('Name:', name);
        console.log('Phone Number:', phoneNumber);
        console.log('ID Number:', idNumber);
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <Image source={require("../../assets/images/user.png")} style={styles.backgroundImage} />
                {/* <Text style={styles.title}>Register</Text> */}
                <View style={styles.imagePickerContainer}>
                    <TouchableOpacity onPress={pickImage}>
                        <Text style={styles.buttonText}>Add Picture</Text>
                    </TouchableOpacity>
                    {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
                </View>
                <Text style={styles.label}>Your Name*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter here"
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.label}>Your Phone Number*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter here"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                />
                <Text style={styles.label}>ID Number*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter here"
                    value={idNumber}
                    onChangeText={setIdNumber}
                    keyboardType="numeric"
                />
                <TouchableOpacity style={styles.button} onPress={handleRegister}>
                    <Text style={styles.buttonText}>Register</Text>
                    <Icon name="arrow-right" size={20} color={Color.colorDarkcyan} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
        width: '100%',
    },
    label: {
        color: Color.colorBlack,
        alignSelf: 'flex-start',
        marginBottom: 5,
    },
    input: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: Border.br_5xs,
        marginBottom: 10,
        paddingHorizontal: 10,
        color: Color.colorBlack,
    },
    button: {
        width: windowWidth * 0.8,
        height: 52,
        backgroundColor: Color.colorWhite,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Border.br_5xs,
        marginTop: 20,
    },
    buttonText: {
        color: Color.colorBlack,
        fontSize: FontSize.size_base,
        fontWeight: 'bold',
        fontFamily: FontFamily.font_bold,
    },
    icon: {
        marginLeft: 10,
    },
    backgroundImage: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    imagePickerContainer: {
        alignItems: 'center',
    },
    selectedImage: {
        width: 200,
        height: 200,
        marginVertical: 10,
    },
});

export default RegisterFirst;
