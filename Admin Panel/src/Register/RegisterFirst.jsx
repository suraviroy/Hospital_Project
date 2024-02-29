import React, { useState } from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView, TextInput, TouchableOpacity, Image, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";
import { PickerIos, Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { backendURL } from "../backendapi";
import * as FileSystem from 'expo-file-system';
const adminRegistrationURL = `${backendURL}/adminListRouter/adminregistration`;


const RegisterFirst = () => {
    const [image, setImage] = useState(null);
    const navigation = useNavigation();
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [education, setEducation] = useState('');
    const [gender, setGender] = useState('');
    const [idNumber, setIdNumber] = useState('');

    const handleRegister = () => {
        console.log('Name:', name);
        console.log('Phone Number:', phoneNumber);
        console.log('Educational Qualification:', education);
        console.log('Gender:', gender);
        console.log('ID Number:', idNumber);
        console.log('Picture:', image)
    };

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            base64: true,
        });

        if (!result.canceled && result.assets.length > 0) {
            setImage(result.assets[0].uri);

        }
    };

    const handleCancel = () => {
        console.log('Cancelled');
    };

    const handleSave = async () => {
        if (phoneNumber.length !== 10) {
            alert('Phone number must be 10 digits long');
            return;
        }

        let base64Image = '';

        try {
            if (image) {
                let imageUri = image;
                if (image.startsWith('file://')) {
                    const base64 = await FileSystem.readAsStringAsync(image, {
                        encoding: FileSystem.EncodingType.Base64,
                    });
                    base64Image = `data:image/jpeg;base64,${base64}`;
                } else {
                    base64Image = image;
                }
            }
        } catch (error) {
            console.error('Error reading image:', error);
            return;
        }

        const data = {
            name: name,
            phNumber: phoneNumber,
            educationQualification: education,
            gender: gender,
            idNumber: idNumber,
            picture: image,
        };
        const res = await axios.post(adminRegistrationURL, data,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err)
            })
    };

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                        <Text><Icon name="angle-left" size={34} color={Color.colorBlack} /></Text>
                    </TouchableOpacity>
                    <View>
                        <Text style={styles.headerText}>Register Admin</Text>
                        <View style={styles.subHeader}>
                            <Text style={styles.subHeaderText}>Add Details</Text>
                        </View>
                    </View>

                </View>
                <View style={styles.imagePickerContainer}>
                    {!image && <Image source={require("../../assets/images/user.png")} style={styles.backgroundImage} />}
                    {image && <Image source={{ uri: image, base64: true }} style={styles.selectedImage} />}
                    <TouchableOpacity onPress={pickImage}>
                        <Text style={styles.buttonText}>Add Picture</Text>
                    </TouchableOpacity>
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
                <Text style={styles.label}>Educational Qualification*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter here"
                    value={education}
                    onChangeText={setEducation}
                />
                <Text style={styles.label}>Gender*</Text>
                <Picker
                    selectedValue={gender}
                    style={styles.picker}
                    onValueChange={(itemValue, itemIndex) => setGender(itemValue)}
                >
                    <Picker.Item label="Select" value="" />
                    <Picker.Item label="Male" value="male" />
                    <Picker.Item label="Female" value="female" />
                    <Picker.Item label="Other" value="other" />
                </Picker>
                <Text style={styles.label}>ID Number*</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter here"
                    value={idNumber}
                    onChangeText={setIdNumber}
                    keyboardType="numeric"
                />
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                        <Text style={[styles.buttonText, styles.cancelText]}>Cancel</Text>
                    </TouchableOpacity>
                    {/* <View style={{ width: 80 }} /> */}
                    <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                        <Text style={[styles.buttonText, styles.saveText]}>Save</Text>
                    </TouchableOpacity>
                </View>
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
        //flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        height: '100%',
        width: '100%',
        margin: 0,
        padding: 0,
        marginTop: -40,
        backgroundColor: '#FFFFFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
        width: '100%',

    },
    backButton: {
        marginRight: 10,
        position: 'absolute',
        left: 0,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        fontFamily: FontFamily.font_bold,
        color: Color.colorBlack,
    },
    subHeaderText: {
        fontSize: 16,
        color: Color.colorGray,
    },
    subHeader: {
        color: Color.colorGray,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

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
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '100%',
    },
    button: {
        // flex: 1,
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Border.br_5xs,
    },
    cancelButton: {
        backgroundColor: Color.colorWhite,
        borderWidth: 1,
        borderColor: Color.colorRed,
        width: '40%'
    },
    cancelText: {
        color: Color.colorRed,
    },
    saveButton: {
        backgroundColor: Color.colorDarkcyan,
        width: '40%'
    },
    saveText: {
        color: Color.colorWhite,
    },
    buttonText: {
        fontSize: FontSize.size_base,
        fontWeight: 'bold',
        fontFamily: FontFamily.font_bold,
    },
    icon: {
        marginLeft: 10,
    },
    backgroundImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
        borderRadius: 20,
    },
    imagePickerContainer: {
        alignItems: 'center',
    },
    selectedImage: {
        width: 100,
        height: 100,
        marginVertical: 10,
    },
    picker: {
        width: '100%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: Border.br_5xs,
        marginBottom: 10,
        color: Color.colorBlack,
    },
});

export default RegisterFirst;