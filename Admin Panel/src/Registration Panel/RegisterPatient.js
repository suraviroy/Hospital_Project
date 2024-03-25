
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView, Image, Dimensions , Alert,ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import { backendURL } from "../backendapi";
import RegisterPopup from './RegisterPopup';
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";

const windowWidth = Dimensions.get('window').width;

const AddPatient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [savingData, setSavingData] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [loading, setLoading] = useState(false); 
    const [image, setImage] = useState(null);
    const [patientName, setPatientName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');
    const [patientId, setPatientId] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [consultingDoctor, setConsultingDoctor] = useState('');
    // const [existingPatient, setExistingPatient] = useState('');
    const [email, setEmail] = useState('');
    const [bloodGroup, setBloodGroup] = useState('');
    const [address, setAddress] = useState('');
    const [state, setState] = useState('');
    const [country, setCountry] = useState('');
    const [localContactName, setLocalContactName] = useState('');
    const [localContactRelation, setLocalContactRelation] = useState('');
    const [localContactNumber, setLocalContactNumber] = useState('');
    const [manualStateVisible, setManualStateVisible] = useState(false);
    const [manualState, setManualState] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedGender, setSelectedGender] = useState(gender);
    const [selectedDoctor, setSelectedDoctor] = useState(consultingDoctor);
    const [selectedBloodGroup, setSelectedBloodGroup] = useState(bloodGroup);
    const [selectedState, setSelectedState] = useState(state);
    const [selectedCountry, setSelectedCountry] = useState(country);



    const [patientNameError, setPatientNameError] = useState(false);
    const [ageError, setAgeError] = useState(false);
    const [genderError, setGenderError] = useState(false);
    const [patientIdError, setPatientIdError] = useState(false);
    const [contactNumberError, setContactNumberError] = useState(false);
    const [consultingDoctorError, setConsultingDoctorError] = useState(false);
    const [countryCode, setCountryCode] = useState('');

    const formattedContactNumber = countryCode + contactNumber;
    const [generatedPassword, setGeneratedPassword] = useState(''); 

    
    const generatePassword = () => {
        const password = Math.floor(1000 + Math.random() * 9000).toString();
        const firstName = patientName.split(' ')[0];
        const newPassword = firstName.toLowerCase() + '@' + password;
        setGeneratedPassword(newPassword); 
        return newPassword; 
    };

    const pickImage = async () => {
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
    const handleCancel = () => {
        setImage(null);
        setPatientName('');
        setAge('');
        setGender('');
        setPatientId('');
        setContactNumber('');
        setConsultingDoctor('');
        // setExistingPatient('');
        setEmail('');
        setBloodGroup('');
        setAddress('');
        setState('');
        setCountry('');
        setLocalContactName('');
        setLocalContactRelation('');
        setLocalContactNumber('');

        setPatientNameError(false);
        setAgeError(false);
        setGenderError(false);
        setPatientIdError(false);
        setContactNumberError(false);
        setConsultingDoctorError(false);

        setSelectedGender(null);
        setSelectedDoctor(null);
        setSelectedBloodGroup(null);
        setSelectedState(null);
        setSelectedCountry(null);
        setSavingData(false);
    };
    const calculateAge = (dob) => {
        const today = new Date();
        const birthDate = new Date(dob);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDiff = today.getMonth() - birthDate.getMonth();
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age.toString();
    };



    const handleSave = async () => {
    const password = generatePassword();
    if (patientName === '') {
        setPatientNameError(true);
    } else {
        setPatientNameError(false);
    }

    if (age === '') {
        setAgeError(true);
    } else {
        setAgeError(false);
    }

    if (gender === '') {
        setGenderError(true);
    } else {
        setGenderError(false);
    }

    if (patientId === '') {
        setPatientIdError(true);
    } else {
        setPatientIdError(false);
    }

    if (contactNumber === '') {
        setContactNumberError(true);
    } else {
        setContactNumberError(false);
    }

    if (consultingDoctor === '') {
        setConsultingDoctorError(true);
    } else {
        setConsultingDoctorError(false);
    }

    if (
        patientName === '' ||
        age === '' ||
        gender === '' ||
        patientId === '' ||
        contactNumber === '' ||
        consultingDoctor === ''
    ) {
        return;
    }

    if (contactNumber.length !== 10) {
        setContactNumberError(true);
        alert('Contact number must be 10 digits long');
        return;
    } else {
        setContactNumberError(false);
    }

    let stateToSend = state;
    if (state === 'Other' && manualState) {
        stateToSend = manualState;
    }

    setLoading(true);
    setSavingData(true);
    setIsLoading(true);
    if (image) {
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: image,
                name: `file.jpg`,
                type: `image/jpg`,
            });
            formData.append('upload_preset', 'pulmocareapp');
            formData.append('cloud_name', 'pulmocare01');

            const cloudinaryResponse = await fetch('https://api.cloudinary.com/v1_1/pulmocare01/image/upload', {
                method: 'POST',
                body: formData,
            });

            if (cloudinaryResponse.ok) {
                const cloudinaryData = await cloudinaryResponse.json();
                console.log('Cloudinary response:', cloudinaryData);

                savePatientData(cloudinaryData.secure_url, password, stateToSend);
            } else {
                console.error('Failed to upload image to Cloudinary');
                alert('Failed to upload image. Please try again.');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Failed to upload image. Please try again.');
            setLoading(false);
        }
    } else {
        savePatientData('', password, stateToSend);
    }
};

const savePatientData = async (imageUrl, password, stateToSend) => {
    try {
        const allPatientsResponse = await fetch(`${backendURL}/adminRouter/sectionAallPatient`);
        const allPatientsData = await allPatientsResponse.json();
        const patientExists = allPatientsData.some(patient => patient.patientId === patientId);
        if (patientExists) {
            alert('Patient ID already exists');
            setLoading(false);
            setSavingData(false);
            return;
        }

        const requestBody = {
            password: password,
            name: patientName,
            gender: gender,
            patientId: patientId,
            contactNumber: formattedContactNumber,
            email: email,
            bloodGroup: bloodGroup,
            age: age,
            address: address,
            state: stateToSend,
            country: country,
            image: imageUrl,
            consultingDoctor: consultingDoctor,
            localContactName: localContactName,
            localContactRelation: localContactRelation,
            localContactNumber: localContactNumber,
            // existingPatientDiagnosis: existingPatient
        };
        const response = await fetch(`${backendURL}/adminRouter/patientregistration`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (response.ok) {
            setLoading(false);
            setShowPopup(true);
            setSavingData(false);
        } else {
            setLoading(false);
            console.error('Error response from backend:', response.status);
            alert('Failed to register patient. Please try again.');
        }
    } catch (error) {
        console.error('Error registering patient:', error.message);
        alert('Failed to register patient. Please try again.');
        setLoading(false);
    }finally {
        // Stop loading
        setIsLoading(false);
    }
};

    const handleDateOfBirthChange = (event, selectedDate) => {
        const currentDate = selectedDate || dateOfBirth;
        setShowDatePicker(false); 
        setDateOfBirth(currentDate); 
        const calculatedAge = calculateAge(currentDate);
        setAge(calculatedAge);
    };

    const handleStateChange = (value) => {
        if (value === 'Other') {
            setManualStateVisible(true);
            setSelectedState(null); 
        } else {
            setState(value); 
            setSelectedState(value);
            setManualStateVisible(false);
        }
    };

    const handleManualStateChange = (value) => {
        setState(value);
    };

    const handleGenderChange = (value) => {
        setGender(value);
        setSelectedGender(value);
    };
    const handleCountryChange = (value) => {
        setCountry(value);
        setSelectedCountry(value);

    };
    const handleBloodGroupChange = (value) => {
        setBloodGroup(value);
        setSelectedBloodGroup(value);
    };
    const handleConsultingDoctorChange = (value) => {
        setConsultingDoctor(value);
        setSelectedDoctor(value);
    };




    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.registerTextContainer}>
                    <Text style={styles.registerText}>Register New Patient</Text>
                </View>
                <TouchableOpacity onPress={pickImage} style={styles.imagePickerContainer}>
                    {!image && <Image source={require("../../assets/images/user2.png")} style={styles.backgroundImage} />}
                    {image && <Image source={{ uri: image }} style={styles.image} />}
                    <Text style={styles.buttonText}>Upload Profile Picture</Text>
                </TouchableOpacity>
                <View style={styles.formContainer}>
                    <Text style={styles.label}>Patient Name*</Text>
                    <TextInput
                        style={[styles.input, patientNameError && styles.inputError]}
                        value={patientName}
                        onChangeText={setPatientName}
                        placeholder="Enter Patient Name"
                    />
                    {patientNameError && <Text style={styles.errorText}>*Required field</Text>}
                    <Text style={styles.label}>Age*</Text>
                    <View style={[styles.input, ageError && styles.inputError]}>
                        <TextInput
                            style={styles.ageInput}
                            value={age}
                            onChangeText={setAge}
                            keyboardType="numeric"
                            placeholder="Enter Age"
                        />
                        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.calendarIconContainer}>
                            <AntDesign name="calendar" size={24} color="black" style={styles.calendarIcon} />
                        </TouchableOpacity>
                    </View>
                    {ageError && <Text style={styles.errorText}>*Required field</Text>}
                    {showDatePicker && (
                        <DateTimePicker
                            value={dateOfBirth}
                            mode="date"
                            is24Hour={true}
                            display="default"
                            onChange={handleDateOfBirthChange}
                        />
                    )}
                    <Text style={styles.label}>Gender*</Text>
                    <View style={[styles.input, genderError && styles.inputError]}>
                        <RNPickerSelect
                            value={selectedGender}
                            key={gender ? gender.toString() : 'gender'}
                            placeholder={{
                                label: 'Select Gender',
                                value: null,
                            }}
                            onValueChange={handleGenderChange}
                            items={[
                                { label: 'Male', value: 'male' },
                                { label: 'Female', value: 'female' },
                                { label: 'Other', value: 'other' },
                            ]}
                            style={{
                                inputIOS: styles.pickerSelect,
                                inputAndroid: styles.pickerSelect,
                                iconContainer: {
                                    top: 10,
                                    right: 12,
                                },
                                placeholder: {
                                    color: 'rgba(0, 0, 0, 0.5)',
                                },
                            }}
                            useNativeAndroidPickerStyle={false}
                            itemStyle={{
                                justifyContent: 'flex-start',
                            }}
                            Icon={() => {
                                return <View style={styles.dropdownIcon} />;
                            }}
                        />
                    </View>
                    {genderError && <Text style={styles.errorText}>*Required field</Text>}
                    <Text style={styles.label}>Patient ID*</Text>
                    <TextInput
                        style={[styles.input, patientIdError && styles.inputError]}
                        value={patientId}
                        onChangeText={setPatientId}
                        placeholder="Enter Patient ID"
                    />
                    {patientIdError && <Text style={styles.errorText}>*Required field</Text>}
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Contact Number*</Text>
                        <View style={styles.inlineInputContainer}>
                            <View style={[styles.input, styles.countryCodeInput]}>
                                <RNPickerSelect
                                    placeholder={{
                                        label: 'Select',
                                        value: null,
                                    }}
                                    onValueChange={(value) => setCountryCode(value)}
                                    items={[
                                        { "label": "+91", "value": "+91" },
                                        { "label": "+93", "value": "+93" },
                                        { "label": "+355", "value": "+355" },
                                        { "label": "+213", "value": "+213" },
                                        { "label": "+376", "value": "+376" },
                                        { "label": "+244", "value": "+244" },
                                        { "label": "+1-268", "value": "+1-268" },
                                        { "label": "+54", "value": "+54" },
                                        { "label": "+374", "value": "+374" },
                                        { "label": "+61", "value": "+61" },
                                        { "label": "+43", "value": "+43" },
                                        { "label": "+994", "value": "+994" },
                                        { "label": "+1-242", "value": "+1-242" },
                                        { "label": "+973", "value": "+973" },
                                        { "label": "+880", "value": "+880" },
                                        { "label": "+1-246", "value": "+1-246" },
                                        { "label": "+375", "value": "+375" },
                                        { "label": "+32", "value": "+32" },
                                        { "label": "+501", "value": "+501" },
                                        { "label": "+229", "value": "+229" },
                                        { "label": "+975", "value": "+975" },
                                        { "label": "+591", "value": "+591" },
                                        { "label": "+387", "value": "+387" },
                                        { "label": "+267", "value": "+267" },
                                        { "label": "+55", "value": "+55" },
                                        { "label": "+673", "value": "+673" },
                                        { "label": "+359", "value": "+359" },
                                        { "label": "+226", "value": "+226" },
                                        { "label": "+257", "value": "+257" },
                                        { "label": "+855", "value": "+855" },
                                        { "label": "+237", "value": "+237" },
                                        { "label": "+1", "value": "+1" },
                                        { "label": "+236", "value": "+236" },
                                        { "label": "+235", "value": "+235" },
                                        { "label": "+56", "value": "+56" },
                                        { "label": "+86", "value": "+86" },
                                        { "label": "+57", "value": "+57" },
                                        { "label": "+269", "value": "+269" },
                                        { "label": "+242", "value": "+242" },
                                        { "label": "+506", "value": "+506" },
                                        { "label": "+385", "value": "+385" },
                                        { "label": "+53", "value": "+53" },
                                        { "label": "+357", "value": "+357" },
                                        { "label": "+420", "value": "+420" },
                                        { "label": "+243", "value": "+243" },
                                        { "label": "+45", "value": "+45" },
                                        { "label": "+253", "value": "+253" },
                                        { "label": "+1-767", "value": "+1-767" },
                                        { "label": "+1-809", "value": "+1-809" },
                                        { "label": "+1-829", "value": "+1-829" },
                                        { "label": "+670", "value": "+670" },
                                        { "label": "+593", "value": "+593" },
                                        { "label": "+20", "value": "+20" },
                                        { "label": "+503", "value": "+503" },
                                        { "label": "+240", "value": "+240" },
                                        { "label": "+291", "value": "+291" },
                                        { "label": "+372", "value": "+372" },
                                        { "label": "+251", "value": "+251" },
                                        { "label": "+679", "value": "+679" },
                                        { "label": "+358", "value": "+358" },
                                        { "label": "+33", "value": "+33" },
                                        { "label": "+241", "value": "+241" },
                                        { "label": "+220", "value": "+220" },
                                        { "label": "+995", "value": "+995" },
                                        { "label": "+49", "value": "+49" },
                                        { "label": "+233", "value": "+233" },
                                        { "label": "+30", "value": "+30" },
                                        { "label": "+1-473", "value": "+1-473" },
                                        { "label": "+502", "value": "+502" },
                                        { "label": "+224", "value": "+224" },
                                        { "label": "+245", "value": "+245" },
                                        { "label": "+592", "value": "+592" },
                                        { "label": "+509", "value": "+509" },
                                        { "label": "+504", "value": "+504" },
                                        { "label": "+36", "value": "+36" },
                                        { "label": "+354", "value": "+354" },
                                        { "label": "+62", "value": "+62" },
                                        { "label": "+98", "value": "+98" },
                                        { "label": "+964", "value": "+964" },
                                        { "label": "+353", "value": "+353" },
                                        { "label": "+972", "value": "+972" },
                                        { "label": "+39", "value": "+39" },
                                        { "label": "+225", "value": "+225" },
                                        { "label": "+1-876", "value": "+1-876" },
                                        { "label": "+81", "value": "+81" },
                                        { "label": "+962", "value": "+962" },
                                        { "label": "+7", "value": "+7" },
                                        { "label": "+254", "value": "+254" },
                                        { "label": "+686", "value": "+686" },
                                        { "label": "+383", "value": "+383" },
                                        { "label": "+965", "value": "+965" },
                                        { "label": "+996", "value": "+996" },
                                        { "label": "+856", "value": "+856" },
                                        { "label": "+371", "value": "+371" },
                                        { "label": "+961", "value": "+961" },
                                        { "label": "+266", "value": "+266" },
                                        { "label": "+231", "value": "+231" },
                                        { "label": "+218", "value": "+218" },
                                        { "label": "+423", "value": "+423" },
                                        { "label": "+370", "value": "+370" },
                                        { "label": "+352", "value": "+352" },
                                        { "label": "+261", "value": "+261" },
                                        { "label": "+265", "value": "+265" },
                                        { "label": "+60", "value": "+60" },
                                        { "label": "+960", "value": "+960" },
                                        { "label": "+223", "value": "+223" },
                                        { "label": "+356", "value": "+356" },
                                        { "label": "+692", "value": "+692" },
                                        { "label": "+222", "value": "+222" },
                                        { "label": "+230", "value": "+230" },
                                        { "label": "+52", "value": "+52" },
                                        { "label": "+691", "value": "+691" },
                                        { "label": "+373", "value": "+373" },
                                        { "label": "+377", "value": "+377" },
                                        { "label": "+976", "value": "+976" },
                                        { "label": "+382", "value": "+382" },
                                        { "label": "+212", "value": "+212" },
                                        { "label": "+258", "value": "+258" },
                                        { "label": "+95", "value": "+95" },
                                        { "label": "+264", "value": "+264" },
                                        { "label": "+674", "value": "+674" },
                                        { "label": "+977", "value": "+977" },
                                        { "label": "+31", "value": "+31" },
                                        { "label": "+64", "value": "+64" },
                                        { "label": "+505", "value": "+505" },
                                        { "label": "+227", "value": "+227" },
                                        { "label": "+234", "value": "+234" },
                                        { "label": "+850", "value": "+850" },
                                        { "label": "+389", "value": "+389" },
                                        { "label": "+47", "value": "+47" },
                                        { "label": "+968", "value": "+968" },
                                        { "label": "+92", "value": "+92" },
                                        { "label": "+680", "value": "+680" },
                                        { "label": "+970", "value": "+970" },
                                        { "label": "+507", "value": "+507" },
                                        { "label": "+675", "value": "+675" },
                                        { "label": "+595", "value": "+595" },
                                        { "label": "+51", "value": "+51" },
                                        { "label": "+63", "value": "+63" },
                                        { "label": "+48", "value": "+48" },
                                        { "label": "+351", "value": "+351" },
                                        { "label": "+974", "value": "+974" },
                                        { "label": "+40", "value": "+40" },
                                        { "label": "+7", "value": "+7" },
                                        { "label": "+250", "value": "+250" },
                                        { "label": "+1-869", "value": "+1-869" },
                                        { "label": "+1-758", "value": "+1-758" },
                                        { "label": "+1-784", "value": "+1-784" },
                                        { "label": "+685", "value": "+685" },
                                        { "label": "+378", "value": "+378" },
                                        { "label": "+239", "value": "+239" },
                                        { "label": "+966", "value": "+966" },
                                        { "label": "+221", "value": "+221" },
                                        { "label": "+381", "value": "+381" },
                                        { "label": "+248", "value": "+248" },
                                        { "label": "+232", "value": "+232" },
                                        { "label": "+65", "value": "+65" },
                                        { "label": "+421", "value": "+421" },
                                        { "label": "+386", "value": "+386" },
                                        { "label": "+677", "value": "+677" },
                                        { "label": "+252", "value": "+252" },
                                        { "label": "+27", "value": "+27" },
                                        { "label": "+82", "value": "+82" },
                                        { "label": "+211", "value": "+211" },
                                        { "label": "+34", "value": "+34" },
                                        { "label": "+94", "value": "+94" },
                                        { "label": "+249", "value": "+249" },
                                        { "label": "+597", "value": "+597" },
                                        { "label": "+268", "value": "+268" },
                                        { "label": "+46", "value": "+46" },
                                        { "label": "+41", "value": "+41" },
                                        { "label": "+963", "value": "+963" },
                                        { "label": "+886", "value": "+886" },
                                        { "label": "+992", "value": "+992" },
                                        { "label": "+255", "value": "+255" },
                                        { "label": "+66", "value": "+66" },
                                        { "label": "+228", "value": "+228" },
                                        { "label": "+676", "value": "+676" },
                                        { "label": "+1-868", "value": "+1-868" },
                                        { "label": "+216", "value": "+216" },
                                        { "label": "+90", "value": "+90" },
                                        { "label": "+993", "value": "+993" },
                                        { "label": "+688", "value": "+688" },
                                        { "label": "+256", "value": "+256" },
                                        { "label": "+380", "value": "+380" },
                                        { "label": "+971", "value": "+971" },
                                        { "label": "+44", "value": "+44" },
                                        { "label": "+1", "value": "+1" },
                                        { "label": "+598", "value": "+598" },
                                        { "label": "+998", "value": "+998" },
                                        { "label": "+678", "value": "+678" },
                                        { "label": "+379", "value": "+379" },
                                        { "label": "+58", "value": "+58" },
                                        { "label": "+84", "value": "+84" },
                                        { "label": "+681", "value": "+681" },
                                        { "label": "+967", "value": "+967" },
                                        { "label": "+260", "value": "+260" },
                                        { "label": "+263", "value": "+263" }
                                    ]
                                    }
                                    style={{
                                        inputIOS: styles.pickerSelect,
                                        inputAndroid: styles.pickerSelect,
                                        iconContainer: {
                                            top: 10,
                                            right: 12,
                                        },
                                        placeholder: {
                                            color: 'rgba(0, 0, 0, 0.5)',
                                        },

                                    }}

                                    useNativeAndroidPickerStyle={false}
                                    itemStyle={{
                                        justifyContent: 'flex-start',
                                    }}
                                    Icon={() => {
                                        return <View style={styles.dropdownIcon} />;
                                    }}


                                />
                            </View>

                            <View style={[styles.input, styles.contactNumberInput]}>
                                <TextInput
                                    style={[styles.input, contactNumberError && styles.inputError]}
                                    value={contactNumber}
                                    onChangeText={setContactNumber}
                                    keyboardType="phone-pad"
                                    placeholder="Enter Contact Number"
                                />
                            </View>
                        </View>
                        {contactNumberError && <Text style={styles.errorText}>*Required field</Text>}
                    </View>
                    <Text style={styles.label}>Consulting Doctor*</Text>
                    <View style={[styles.input, consultingDoctorError && styles.inputError]}>
                        <RNPickerSelect
                            value={selectedDoctor}
                            key={consultingDoctor ? consultingDoctor.toString() : 'consultingDoctor'}
                            placeholder={{
                                label: 'Select Consulting Doctor',
                                value: null,
                            }}
                            onValueChange={handleConsultingDoctorChange}
                            items={[
                                { label: 'Dr. Parthasarathi Bhattacharyya', value: 'Dr. Parthasarathi Bhattacharyya' },
                                { label: 'Dr. Avishek Kar', value: 'Dr. Avishek Kar' },
                                { label: 'Dr. Ashok Saha', value: 'Dr. Ashok Saha' },
                                { label: 'Dr. Abhra Ch. Chowdhury', value: 'Dr. Abhra Ch. Chowdhury' },
                            ]}
                            style={{
                                inputIOS: styles.pickerSelect,
                                inputAndroid: styles.pickerSelect,
                                iconContainer: {
                                    top: 10,
                                    right: 12,
                                },
                                placeholder: {
                                    color: 'rgba(0, 0, 0, 0.5)',
                                },
                            }}
                            useNativeAndroidPickerStyle={false}
                            itemStyle={{
                                justifyContent: 'flex-start',
                            }}
                            Icon={() => {
                                return <View style={styles.dropdownIcon} />;
                            }}
                        />
                    </View>
                    {consultingDoctorError && <Text style={styles.errorText}>*Required field</Text>}
                    {/* <Text style={styles.label}>Existing Patient Diagnosis</Text>
                    <TextInput
                        style={styles.input}
                        value={existingPatient}
                        onChangeText={setExistingPatient}
                        placeholder="Enter Existing Patient Diagnosis"
                    /> */}
                    <Text style={styles.label}>Email</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        placeholder="Enter Email"
                    />
                    <Text style={styles.label}>Blood Group</Text>
                    <View style={styles.input}>
                        <RNPickerSelect
                            value={selectedBloodGroup}
                            key={bloodGroup ? bloodGroup.toString() : 'bloodGroup'}
                            placeholder={{
                                label: 'Select Blood Group',
                                value: null,
                            }}
                            onValueChange={handleBloodGroupChange}
                            items={[
                                { label: 'A+', value: 'A+' },
                                { label: 'A-', value: 'A-' },
                                { label: 'B+', value: 'B+' },
                                { label: 'B-', value: 'B-' },
                                { label: 'AB+', value: 'AB+' },
                                { label: 'AB-', value: 'AB-' },
                                { label: 'O+', value: 'O+' },
                                { label: 'O-', value: 'O-' },
                            ]}
                            style={{
                                inputIOS: styles.pickerSelect,
                                inputAndroid: styles.pickerSelect,
                                iconContainer: {
                                    top: 10,
                                    right: 12,
                                },
                                placeholder: {
                                    color: 'rgba(0, 0, 0, 0.5)',
                                },
                            }}
                            useNativeAndroidPickerStyle={false}
                            itemStyle={{
                                justifyContent: 'flex-start',
                            }}
                            Icon={() => {
                                return <View style={styles.dropdownIcon} />;
                            }}
                        />
                    </View>
                    <Text style={styles.label}>Address</Text>
                    <TextInput
                        style={styles.input}
                        value={address}
                        onChangeText={setAddress}
                        placeholder="Enter Address"
                    />
                    <Text style={styles.label}>State</Text>
                    <View style={styles.input}>
                        <RNPickerSelect
                            value={selectedState}
                            key={state ? state.toString() : 'state'}
                            placeholder={{
                                label: 'Select State',
                                value: null,
                            }}
                            onValueChange={handleStateChange}
                            items={[
                                { label: "Andhra Pradesh", value: "Andhra Pradesh" },
                                { label: "Arunachal Pradesh", value: "Arunachal Pradesh" },
                                { label: "Assam", value: "Assam" },
                                { label: "Bihar", value: "Bihar" },
                                { label: "Chhattisgarh", value: "Chhattisgarh" },
                                { label: "Goa", value: "Goa" },
                                { label: "Gujarat", value: "Gujarat" },
                                { label: "Haryana", value: "Haryana" },
                                { label: "Himachal Pradesh", value: "Himachal Pradesh" },
                                { label: "Jharkhand", value: "Jharkhand" },
                                { label: "Karnataka", value: "Karnataka" },
                                { label: "Kerala", value: "Kerala" },
                                { label: "Madhya Pradesh", value: "Madhya Pradesh" },
                                { label: "Maharashtra", value: "Maharashtra" },
                                { label: "Manipur", value: "Manipur" },
                                { label: "Meghalaya", value: "Meghalaya" },
                                { label: "Mizoram", value: "Mizoram" },
                                { label: "Nagaland", value: "Nagaland" },
                                { label: "Odisha", value: "Odisha" },
                                { label: "Punjab", value: "Punjab" },
                                { label: "Rajasthan", value: "Rajasthan" },
                                { label: "Sikkim", value: "Sikkim" },
                                { label: "Tamil Nadu", value: "Tamil Nadu" },
                                { label: "Telangana", value: "Telangana" },
                                { label: "Tripura", value: "Tripura" },
                                { label: "Uttar Pradesh", value: "Uttar Pradesh" },
                                { label: "Uttarakhand", value: "Uttarakhand" },
                                { label: "West Bengal", value: "West Bengal" },                           
                                { label: "Other", value: "Other" }
                              ]}
                            style={{
                                inputIOS: styles.pickerSelect,
                                inputAndroid: styles.pickerSelect,
                                iconContainer: {
                                    top: 10,
                                    right: 12,
                                },
                                placeholder: {
                                    color: 'rgba(0, 0, 0, 0.5)',
                                },
                            }}
                            useNativeAndroidPickerStyle={false}
                            itemStyle={{
                                justifyContent: 'flex-start',
                            }}
                            Icon={() => {
                                return <View style={styles.dropdownIcon} />;
                            }}
                        />


                    </View>
                    {manualStateVisible && (
                        <>
                            <Text style={styles.label}>Enter State Manually</Text>
                            <TextInput
                                style={styles.input}
                                value={state}
                                onChangeText={handleManualStateChange}
                                placeholder="Enter State"
                            />
                        </>
                    )}


                    <Text style={styles.label}>Country</Text>
                    <View style={styles.input}>
                        <RNPickerSelect
                            value={selectedCountry}
                            key={country ? country.toString() : 'country'}
                            placeholder={{
                                label: 'Select Country',
                                value: null,
                            }}
                            onValueChange={handleCountryChange}
                            items={[
                                { "label": "Afghanistan", "value": "Afghanistan" },
                                { "label": "Albania", "value": "Albania" },
                                { "label": "Algeria", "value": "Algeria" },
                                { "label": "Andorra", "value": "Andorra" },
                                { "label": "Angola", "value": "Angola" },
                                { "label": "Antigua and Barbuda", "value": "Antigua and Barbuda" },
                                { "label": "Argentina", "value": "Argentina" },
                                { "label": "Armenia", "value": "Armenia" },
                                { "label": "Australia", "value": "Australia" },
                                { "label": "Austria", "value": "Austria" },
                                { "label": "Azerbaijan", "value": "Azerbaijan" },
                                { "label": "Bahamas", "value": "Bahamas" },
                                { "label": "Bahrain", "value": "Bahrain" },
                                { "label": "Bangladesh", "value": "Bangladesh" },
                                { "label": "Barbados", "value": "Barbados" },
                                { "label": "Belarus", "value": "Belarus" },
                                { "label": "Belgium", "value": "Belgium" },
                                { "label": "Belize", "value": "Belize" },
                                { "label": "Benin", "value": "Benin" },
                                { "label": "Bhutan", "value": "Bhutan" },
                                { "label": "Bolivia", "value": "Bolivia" },
                                { "label": "Bosnia and Herzegovina", "value": "Bosnia and Herzegovina" },
                                { "label": "Botswana", "value": "Botswana" },
                                { "label": "Brazil", "value": "Brazil" },
                                { "label": "Brunei", "value": "Brunei" },
                                { "label": "Bulgaria", "value": "Bulgaria" },
                                { "label": "Burkina Faso", "value": "Burkina Faso" },
                                { "label": "Burundi", "value": "Burundi" },
                                { "label": "Cabo Verde", "value": "Cabo Verde" },
                                { "label": "Cambodia", "value": "Cambodia" },
                                { "label": "Cameroon", "value": "Cameroon" },
                                { "label": "Canada", "value": "Canada" },
                                { "label": "Central African Republic", "value": "Central African Republic" },
                                { "label": "Chad", "value": "Chad" },
                                { "label": "Chile", "value": "Chile" },
                                { "label": "China", "value": "China" },
                                { "label": "Colombia", "value": "Colombia" },
                                { "label": "Comoros", "value": "Comoros" },
                                { "label": "Congo", "value": "Congo" },
                                { "label": "Costa Rica", "value": "Costa Rica" },
                                { "label": "Croatia", "value": "Croatia" },
                                { "label": "Cuba", "value": "Cuba" },
                                { "label": "Cyprus", "value": "Cyprus" },
                                { "label": "Czech Republic", "value": "Czech Republic" },
                                { "label": "Democratic Republic of the Congo", "value": "Democratic Republic of the Congo" },
                                { "label": "Denmark", "value": "Denmark" },
                                { "label": "Djibouti", "value": "Djibouti" },
                                { "label": "Dominica", "value": "Dominica" },
                                { "label": "Dominican Republic", "value": "Dominican Republic" },
                                { "label": "East Timor", "value": "East Timor" },
                                { "label": "Ecuador", "value": "Ecuador" },
                                { "label": "Egypt", "value": "Egypt" },
                                { "label": "El Salvador", "value": "El Salvador" },
                                { "label": "Equatorial Guinea", "value": "Equatorial Guinea" },
                                { "label": "Eritrea", "value": "Eritrea" },
                                { "label": "Estonia", "value": "Estonia" },
                                { "label": "Eswatini", "value": "Eswatini" },
                                { "label": "Ethiopia", "value": "Ethiopia" },
                                { "label": "Fiji", "value": "Fiji" },
                                { "label": "Finland", "value": "Finland" },
                                { "label": "France", "value": "France" },
                                { "label": "Gabon", "value": "Gabon" },
                                { "label": "Gambia", "value": "Gambia" },
                                { "label": "Georgia", "value": "Georgia" },
                                { "label": "Germany", "value": "Germany" },
                                { "label": "Ghana", "value": "Ghana" },
                                { "label": "Greece", "value": "Greece" },
                                { "label": "Grenada", "value": "Grenada" },
                                { "label": "Guatemala", "value": "Guatemala" },
                                { "label": "Guinea", "value": "Guinea" },
                                { "label": "Guinea-Bissau", "value": "Guinea-Bissau" },
                                { "label": "Guyana", "value": "Guyana" },
                                { "label": "Haiti", "value": "Haiti" },
                                { "label": "Honduras", "value": "Honduras" },
                                { "label": "Hungary", "value": "Hungary" },
                                { "label": "Iceland", "value": "Iceland" },
                                { "label": "India", "value": "India" },
                                { "label": "Indonesia", "value": "Indonesia" },
                                { "label": "Iran", "value": "Iran" },
                                { "label": "Iraq", "value": "Iraq" },
                                { "label": "Ireland", "value": "Ireland" },
                                { "label": "Israel", "value": "Israel" },
                                { "label": "Italy", "value": "Italy" },
                                { "label": "Ivory Coast", "value": "Ivory Coast" },
                                { "label": "Jamaica", "value": "Jamaica" },
                                { "label": "Japan", "value": "Japan" },
                                { "label": "Jordan", "value": "Jordan" },
                                { "label": "Kazakhstan", "value": "Kazakhstan" },
                                { "label": "Kenya", "value": "Kenya" },
                                { "label": "Kiribati", "value": "Kiribati" },
                                { "label": "Kosovo", "value": "Kosovo" },
                                { "label": "Kuwait", "value": "Kuwait" },
                                { "label": "Kyrgyzstan", "value": "Kyrgyzstan" },
                                { "label": "Laos", "value": "Laos" },
                                { "label": "Latvia", "value": "Latvia" },
                                { "label": "Lebanon", "value": "Lebanon" },
                                { "label": "Lesotho", "value": "Lesotho" },
                                { "label": "Liberia", "value": "Liberia" },
                                { "label": "Libya", "value": "Libya" },
                                { "label": "Liechtenstein", "value": "Liechtenstein" },
                                { "label": "Lithuania", "value": "Lithuania" },
                                { "label": "Luxembourg", "value": "Luxembourg" },
                                { "label": "Madagascar", "value": "Madagascar" },
                                { "label": "Malawi", "value": "Malawi" },
                                { "label": "Malaysia", "value": "Malaysia" },
                                { "label": "Maldives", "value": "Maldives" },
                                { "label": "Mali", "value": "Mali" },
                                { "label": "Malta", "value": "Malta" },
                                { "label": "Marshall Islands", "value": "Marshall Islands" },
                                { "label": "Mauritania", "value": "Mauritania" },
                                { "label": "Mauritius", "value": "Mauritius" },
                                { "label": "Mexico", "value": "Mexico" },
                                { "label": "Micronesia", "value": "Micronesia" },
                                { "label": "Moldova", "value": "Moldova" },
                                { "label": "Monaco", "value": "Monaco" },
                                { "label": "Mongolia", "value": "Mongolia" },
                                { "label": "Montenegro", "value": "Montenegro" },
                                { "label": "Morocco", "value": "Morocco" },
                                { "label": "Mozambique", "value": "Mozambique" },
                                { "label": "Myanmar", "value": "Myanmar" },
                                { "label": "Namibia", "value": "Namibia" },
                                { "label": "Nauru", "value": "Nauru" },
                                { "label": "Nepal", "value": "Nepal" },
                                { "label": "Netherlands", "value": "Netherlands" },
                                { "label": "New Zealand", "value": "New Zealand" },
                                { "label": "Nicaragua", "value": "Nicaragua" },
                                { "label": "Niger", "value": "Niger" },
                                { "label": "Nigeria", "value": "Nigeria" },
                                { "label": "North Korea", "value": "North Korea" },
                                { "label": "North Macedonia", "value": "North Macedonia" },
                                { "label": "Norway", "value": "Norway" },
                                { "label": "Oman", "value": "Oman" },
                                { "label": "Pakistan", "value": "Pakistan" },
                                { "label": "Palau", "value": "Palau" },
                                { "label": "Palestine", "value": "Palestine" },
                                { "label": "Panama", "value": "Panama" },
                                { "label": "Papua New Guinea", "value": "Papua New Guinea" },
                                { "label": "Paraguay", "value": "Paraguay" },
                                { "label": "Peru", "value": "Peru" },
                                { "label": "Philippines", "value": "Philippines" },
                                { "label": "Poland", "value": "Poland" },
                                { "label": "Portugal", "value": "Portugal" },
                                { "label": "Qatar", "value": "Qatar" },
                                { "label": "Romania", "value": "Romania" },
                                { "label": "Russia", "value": "Russia" },
                                { "label": "Rwanda", "value": "Rwanda" },
                                { "label": "Saint Kitts and Nevis", "value": "Saint Kitts and Nevis" },
                                { "label": "Saint Lucia", "value": "Saint Lucia" },
                                { "label": "Saint Vincent and the Grenadines", "value": "Saint Vincent and the Grenadines" },
                                { "label": "Samoa", "value": "Samoa" },
                                { "label": "San Marino", "value": "San Marino" },
                                { "label": "Sao Tome and Principe", "value": "Sao Tome and Principe" },
                                { "label": "Saudi Arabia", "value": "Saudi Arabia" },
                                { "label": "Senegal", "value": "Senegal" },
                                { "label": "Serbia", "value": "Serbia" },
                                { "label": "Seychelles", "value": "Seychelles" },
                                { "label": "Sierra Leone", "value": "Sierra Leone" },
                                { "label": "Singapore", "value": "Singapore" },
                                { "label": "Slovakia", "value": "Slovakia" },
                                { "label": "Slovenia", "value": "Slovenia" },
                                { "label": "Solomon Islands", "value": "Solomon Islands" },
                                { "label": "Somalia", "value": "Somalia" },
                                { "label": "South Africa", "value": "South Africa" },
                                { "label": "South Korea", "value": "South Korea" },
                                { "label": "South Sudan", "value": "South Sudan" },
                                { "label": "Spain", "value": "Spain" },
                                { "label": "Sri Lanka", "value": "Sri Lanka" },
                                { "label": "Sudan", "value": "Sudan" },
                                { "label": "Suriname", "value": "Suriname" },
                                { "label": "Sweden", "value": "Sweden" },
                                { "label": "Switzerland", "value": "Switzerland" },
                                { "label": "Syria", "value": "Syria" },
                                { "label": "Taiwan", "value": "Taiwan" },
                                { "label": "Tajikistan", "value": "Tajikistan" },
                                { "label": "Tanzania", "value": "Tanzania" },
                                { "label": "Thailand", "value": "Thailand" },
                                { "label": "Togo", "value": "Togo" },
                                { "label": "Tonga", "value": "Tonga" },
                                { "label": "Trinidad and Tobago", "value": "Trinidad and Tobago" },
                                { "label": "Tunisia", "value": "Tunisia" },
                                { "label": "Turkey", "value": "Turkey" },
                                { "label": "Turkmenistan", "value": "Turkmenistan" },
                                { "label": "Tuvalu", "value": "Tuvalu" },
                                { "label": "Uganda", "value": "Uganda" },
                                { "label": "Ukraine", "value": "Ukraine" },
                                { "label": "United Arab Emirates", "value": "United Arab Emirates" },
                                { "label": "United Kingdom", "value": "United Kingdom" },
                                { "label": "United States", "value": "United States" },
                                { "label": "Uruguay", "value": "Uruguay" },
                                { "label": "Uzbekistan", "value": "Uzbekistan" },
                                { "label": "Vanuatu", "value": "Vanuatu" },
                                { "label": "Vatican City", "value": "Vatican City" },
                                { "label": "Venezuela", "value": "Venezuela" },
                                { "label": "Vietnam", "value": "Vietnam" },
                                { "label": "Yemen", "value": "Yemen" },
                                { "label": "Zambia", "value": "Zambia" },
                                { "label": "Zimbabwe", "value": "Zimbabwe" },   
                        
                              ]}
                            style={{
                                inputIOS: styles.pickerSelect,
                                inputAndroid: styles.pickerSelect,
                                iconContainer: {
                                    top: 10,
                                    right: 12,
                                },
                                placeholder: {
                                    color: 'rgba(0, 0, 0, 0.5)',
                                },
                            }}
                            useNativeAndroidPickerStyle={false}
                            itemStyle={{
                                justifyContent: 'flex-start',
                            }}
                            Icon={() => {
                                return <View style={styles.dropdownIcon} />;
                            }}
                        />
                    </View>
                    <Text style={styles.label}>Local Contact Name</Text>
                    <TextInput
                        style={styles.input}
                        value={localContactName}
                        onChangeText={setLocalContactName}
                        placeholder="Enter Local Contact Name"
                    />
                    <Text style={styles.label}>Local Contact Relation</Text>
                    <TextInput
                        style={styles.input}
                        value={localContactRelation}
                        onChangeText={setLocalContactRelation}
                        placeholder="Enter Local Contact Relation"
                    />
                    <Text style={styles.label}>Local Contact Number</Text>
                    <TextInput
                        style={styles.input}
                        value={localContactNumber}
                        onChangeText={setLocalContactNumber}
                        keyboardType="phone-pad"
                        placeholder="Enter Local Contact Number"
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
                        <Text style={[styles.buttonText, styles.cancelText]}>Cancel</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={[styles.button, styles.saveButton, savingData]} onPress={handleSave}>
                    {isLoading ? (
                                <ActivityIndicator size="small" color={Color.colorWhite} />
                            ) : (
                                <Text style={[styles.buttonText, styles.saveText, savingData]}>Save</Text>
                            )}
                        
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <RegisterPopup 
                visible={showPopup}
                setVisible={setShowPopup}
                patientName={patientName}
                patientId={patientId}
                handleCancel={handleCancel}
                email={email}
                contactNumber={formattedContactNumber}
                password={generatedPassword}
                loading={loading}
            />
        </SafeAreaView>
    );
}
export default AddPatient;
const styles = StyleSheet.create({
    disabledButton: {
        backgroundColor: '#CCCCCC', 
    },
    disabledButtonText: {
        color: '#888888',
    },
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingBottom: 80,
        paddingTop: windowWidth*0.10,
    },
    scrollViewContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    registerTextContainer: {
        alignItems: 'center',
        width: '100%',
        marginBottom: 20,
    },
    registerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    imagePickerContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    backgroundImage: {
        width: windowWidth * 0.35,
        height: windowWidth * 0.35,
        marginBottom: -5,
        borderRadius: windowWidth * 0.25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: windowWidth * 0.35,
        height: windowWidth * 0.35,
        resizeMode: 'cover',
        borderRadius: windowWidth * 0.25,
    },
    buttonText: {
        fontSize: 16,
        color: '#706767',
        marginTop: 5,
    },
    formContainer: {
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#CCCCCC',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginTop: 10,
        height: 40,
        backgroundColor: '#D3F1ED',
    },
    inputError: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 5,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        paddingHorizontal: 20,
    },
    button: {
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: '40%',
    },
    cancelButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'red',
    },
    cancelText: {
        color: 'red',
    },
    saveButton: {
        backgroundColor: '#008080',
    },
    saveText: {
        color: '#FFFFFF',
    },
    pickerSelect: {
        fontSize: 16,
        paddingHorizontal: 10,
        height: 40,
        width: '100%',
        paddingLeft: 0,
        color: '#000000',
    },
    dropdownIcon: {
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 8,
        borderTopColor: '#000000',
        borderRightWidth: 6,
        borderRightColor: 'transparent',
        borderLeftWidth: 6,
        borderLeftColor: 'transparent',
        position: 'absolute',
        right: 2,
        top: 4,
    },
    inputContainer: {
        marginBottom: 20,
    },
    inlineInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    countryCodeInput: {
        flex: 1,
        marginRight: 10,
        top: 10,
    },
    contactNumberInput: {
        flex: 3,
        borderWidth: 0,
        backgroundColor: 'transparent',
    },
    ageInput: {
        flex: 1,
        paddingHorizontal: 10,
        height: 40,
    },
    calendarIconContainer: {
        position: 'absolute',
        right: 10,
        top: 8,
    },
    calendarIcon: {
        backgroundColor: 'transparent',
    },



});

