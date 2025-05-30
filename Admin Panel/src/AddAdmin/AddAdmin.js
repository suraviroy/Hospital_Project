import React, { useState } from 'react';
import { 
    View, 
    StyleSheet, 
    Text, 
    SafeAreaView, 
    TextInput, 
    TouchableOpacity, 
    Image, 
    ScrollView, 
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    StatusBar,
    Dimensions,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";
import DropDownPicker from 'react-native-dropdown-picker';
import axios from 'axios';
import { backendURL } from "../backendapi";
import * as FileSystem from 'expo-file-system';

const adminRegistrationURL = `${backendURL}/adminListRouter/adminregistration`;

const AddAdmin = () => {
    const navigation = useNavigation();
    const [image, setImage] = useState(null);
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [education, setEducation] = useState('');
    const [gender, setGender] = useState('');
    const [idNumber, setIdNumber] = useState('');

    const [nameError, setNameError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [educationError, setEducationError] = useState(false);
    const [genderError, setGenderError] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'},
        {label: 'Other', value: 'other'}
    ]);

    const pickImage = async () => {
        const options = [
            { text: 'Choose from Library', onPress: pickFromLibrary },
            { text: 'Take Photo', onPress: takePhoto },
            { text: 'Cancel', style: 'cancel' }
        ];
    
        Alert.alert('Select Image', 'Choose an option', options);
    };
    
    const pickFromLibrary = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        }
    };
    
    const takePhoto = async () => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Camera permission needed', 'Please enable camera permissions in your settings.');
            return;
        }
    
        let result = await ImagePicker.launchCameraAsync({
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
    
        if (!result.canceled && result.assets.length > 0) {
            setImage(result.assets[0].uri);
        }
    };
    const handleCancel = () => {
        navigation.goBack();
    };

    const handleSave = async () => {
        if (name === '') {
            setNameError(true);
        } else {
            setNameError(false);
        }
    
        if (phoneNumber === '') {
            setPhoneError(true);
        } else {
            setPhoneError(false);
        }
    
        if (education === '') {
            setEducationError(true);
        } else {
            setEducationError(false);
        }
    
        if (gender === '') {
            setGenderError(true);
        } else {
            setGenderError(false);
        }
    
        if (idNumber === '') {
            alert('ID Number is required');
            return;
        }
    
        if (name === '' || phoneNumber === '' || education === '' || gender === '' || idNumber === '') {
            alert('Please fill in all required fields');
            return;
        }
    
        if (phoneNumber.length !== 10) {
            alert('Phone number must be 10 digits long');
            return;
        }
    
        setIsLoading(true);
    
        if (image) {
           try{ 
            const formData = new FormData();
            formData.append('file', {
                uri: image,
                name: `file.jpg`,
                type: `image/jpg`,
            });
            // formData.append('upload_preset', 'pulmocareapp');
            // formData.append('cloud_name', 'pulmocare01');
    
            // try {
            //     const response = await fetch('https://api.cloudinary.com/v1_1/pulmocare01/image/upload', {
            //         method: 'POST',
            //         body: formData,
            //     });
    
            //     if (response.ok) {
            //         const data = await response.json();
            //         console.log('Cloudinary response:', data);
            //         data && data.secure_url && setImage(data.secure_url);
            //         saveDataToBackend(data.secure_url);
            //     } else {
            //         console.error('Failed to upload image to Cloudinary');
            //     }
            // } catch (error) {
            //     console.error('Error uploading image:', error);
            // }
              const uploadResponse = await fetch(`${backendURL}/upload`, {
                            method: 'POST',
                            body: formData,
                        });
                        
                        if (uploadResponse.ok) {
                            const responseData = await uploadResponse.json();
                            console.log('Upload response:', responseData);
                            
                            if (responseData && responseData.fileName) {
                                // Using the filePath or fileName from the response
                                const fileUrl = responseData.fileName;
                                console.log("Uploaded file:", fileUrl);
                                
                                // Use the file path/name from the response to save patient data
                                saveDataToBackend(fileUrl);
                            } else {
                                console.error('Missing fileName in upload response');
                                alert('Failed to process uploaded image. Please try again.');
                                
                            }
                        } else {
                            console.error('Failed to upload image to server');
                            alert('Failed to upload image. Please try again.');
                            saveDataToBackend('')
                        }
                    } catch (error) {
                        console.error('Error uploading image:', error);
                        alert('Failed to upload image. Please try again.');
                    }
                    }
    
    };
    
    const saveDataToBackend = async (imageUrl) => {
        const data = {
            name: name,
            phNumber: phoneNumber,
            educationQualification: education,
            gender: gender,
            idNumber: idNumber,
            picture: imageUrl,
        };
    
        try {
            const res = await axios.post(`${backendURL}/adminListRouter/adminregistration`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
    
            if (res.status === 200) {
                alert('Registration Successful');
                navigation.navigate('BottomNavigation');
            }
        } catch (error) {
            if (error.response && error.response.data.message === 'ID number already exists') {
                alert('ID number already exists');
            } else {
                console.error('Error registering admin:', error);
                alert('Registration Failed');
            }
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.container}>
             <StatusBar 
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
            backgroundColor="#FFFFFF" 
            translucent={false}
        />
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
            
            <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollViewContent}
                enableOnAndroid={true}
                enableAutomaticScroll={Platform.OS === 'ios'}
                keyboardShouldPersistTaps="handled"
                extraScrollHeight={Platform.OS === 'ios' ? 20 : 0}
                extraHeight={120}
            >
                <View style={styles.innerContainer}>
                    <View style={styles.imagePickerContainer}>
                        {!image && <Image source={require("../../assets/images/user.png")} style={styles.backgroundImage} />}
                        {image && <Image source={{ uri: image }} style={styles.selectedImage} />}
                        <TouchableOpacity onPress={pickImage}>
                            <Text style={styles.buttonText}>Add Picture</Text>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.label}>Your Name*</Text>
                    <TextInput
                        style={[styles.input, nameError && styles.inputError]}
                        placeholder="Enter here"
                        value={name}
                        onChangeText={setName}
                        autoCorrect={false}
                        autoCapitalize="words"
                        returnKeyType="next"
                    />
                    {nameError && <Text style={styles.errorText}>*Required field</Text>}

                    <Text style={styles.label}>Your Phone Number*</Text>
                    <TextInput
                        style={[styles.input, phoneError && styles.inputError]}
                        placeholder="Enter here"
                        value={phoneNumber}
                        onChangeText={setPhoneNumber}
                        keyboardType="phone-pad"
                        maxLength={10}
                        returnKeyType="next"
                    />
                    {phoneError && <Text style={styles.errorText}>*Required field</Text>}

                    <Text style={styles.label}>Educational Qualification*</Text>
                    <TextInput
                        style={[styles.input, educationError && styles.inputError]}
                        placeholder="Enter here"
                        value={education}
                        onChangeText={setEducation}
                        autoCapitalize="words"
                        returnKeyType="next"
                    />
                    {educationError && <Text style={styles.errorText}>*Required field</Text>}

                    <Text style={styles.label}>Gender*</Text>
                    <View style={[styles.inputContainer, genderError && styles.inputError]}>
                        <DropDownPicker
                            open={open}
                            value={gender}
                            items={items}
                            setOpen={setOpen}
                            setValue={setGender}
                            setItems={setItems}
                            placeholder="Select Gender"
                            style={styles.dropdown}
                            dropDownContainerStyle={styles.dropdownContainer}
                            zIndex={1000}
                            listMode="SCROLLVIEW"
                        />
                    </View>
                    {genderError && <Text style={styles.errorText}>*Required field</Text>}

                    <Text style={styles.label}>ID Number*</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter here"
                        value={idNumber}
                        onChangeText={setIdNumber}
                        keyboardType="numeric"
                        returnKeyType="done"
                    />

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                            <Text style={[styles.buttonText, styles.cancelText]}>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={handleSave}>
                            {isLoading ? (
                                <ActivityIndicator size="small" color={Color.colorWhite} />
                            ) : (
                                <Text style={[styles.buttonText, styles.saveText]}>Save</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAwareScrollView>
        </View>
    );
};


const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingTop: 40,
    },
    backButton: {
        marginRight: 10,
        position: 'absolute',
        left: 20,
        paddingTop: 40,
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
        padding: 5,
    },
    subHeader: {
        color: Color.colorGray,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    innerContainer: {
        padding: 10,
    },
    label: {
        color: Color.colorBlack,
        alignSelf: 'flex-start',
        marginBottom: 5,
        marginLeft: 10,
        padding: 5,
    },
    input: {
        width: '95%',
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: Border.br_5xs,
        marginBottom: 5,
        paddingHorizontal: 10,
        color: Color.colorBlack,
        marginLeft: 10,
    },
    inputContainer: {
        width: '95%',
        marginBottom: 10,
        marginLeft: 10,
    },
    dropdown: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: Border.br_5xs,
    },
    dropdownContainer: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: Border.br_5xs,
    },
    inputError: {
        borderColor: Color.colorRed,
    },
    errorText: {
        color: Color.colorRed,
        fontSize: FontSize.size_xs,
        marginLeft: 10,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: '100%',
        paddingHorizontal: 10,
    },
    button: {
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
    backgroundImage: {
        width: 100,
        height: 100,
        marginBottom: 20,
        borderRadius: 20,
    },
    imagePickerContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    selectedImage: {
        width: 100,
        height: 100,
        marginVertical: 10,
        borderRadius: 20,
    },
});

export default AddAdmin;
