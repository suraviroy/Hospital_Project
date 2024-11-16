import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, StatusBar, Image, ScrollView, TouchableOpacity, Dimensions, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; 
import RNPickerSelect from 'react-native-picker-select';
const windowWidth = Dimensions.get('window').width;
import { backendURL } from "../../backendapi";

const UpdatedBasicDetails = ({ patientId }) => { 
    const navigation = useNavigation();
    const [PatientbasicDetails, setPatientBasicDetails] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [updatedDetails, setUpdatedDetails] = useState({});
    const [state, setState] = useState('West Bengal');
    const [country, setCountry] = useState('India');
    const [selectedGender, setSelectedGender] = useState('');
    const [consultingDoctor, setConsultingDoctor] = useState('');
    const [manualStateVisible, setManualStateVisible] = useState(false);
    const [manualState, setManualState] = useState('');
    const [genderError, setGenderError] = useState(false);
    const [contactNumberError, setContactNumberError] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(consultingDoctor);
    const [ageError, setAgeError] = useState(false);
    const [bloodGroup, setBloodGroup] = useState('');
    const [address, setAddress] = useState('');
    const [selectedBloodGroup, setSelectedBloodGroup] = useState(bloodGroup);
    const [selectedState, setSelectedState] = useState(state);
    const [selectedCountry, setSelectedCountry] = useState(country);
    useEffect(() => {
        fetchPatientDetails();
    }, [patientId]);

    const fetchPatientDetails = () => {
        fetch(`${backendURL}/adminRouter/PatientBasicDetails/${patientId}`)
            .then(response => response.json())
            .then(data => {
                setPatientBasicDetails(data[0]);
                setUpdatedDetails(data[0]);
                setSelectedGender(data[0].gender);
                setConsultingDoctor(data[0].consultingDoctor);
                setSelectedDoctor(data[0].consultingDoctor);
                setBloodGroup(data[0].bloodGroup);
                setSelectedBloodGroup(data[0].bloodGroup);
                setCountry(data[0].country);
                setSelectedCountry(data[0].country);
                setState(data[0].state);
                setSelectedState(data[0].state);
                
            })
            .catch(error => {
                console.error('Error fetching patient basic details:', error);
            });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setUpdatedDetails(PatientbasicDetails);
        setSelectedGender(PatientbasicDetails.gender);
        setConsultingDoctor(PatientbasicDetails.consultingDoctor);
        setSelectedDoctor(PatientbasicDetails.consultingDoctor);
        setBloodGroup(PatientbasicDetails.bloodGroup);
        setSelectedBloodGroup(PatientbasicDetails.bloodGroup);
        setCountry(PatientbasicDetails.country);
        setSelectedCountry(PatientbasicDetails.country);
        setState(PatientbasicDetails.state);
        setSelectedState(PatientbasicDetails.state);
    };

    const handleClose = () => {
        navigation.goBack();
    };

    const handleSubmit = () => {
        if (selectedGender === '') {
            setGenderError(true);
            return;
        }
        setGenderError(false);

        const contactNumberLength = updatedDetails.contactNumber?.toString().length;
        if (contactNumberLength !== 12) {
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
    
        if (isNaN(updatedDetails.age) || updatedDetails.age < 0) {
            setAgeError(true);
            alert('Please enter a valid age');
            return;
        } else {
            setAgeError(false);
        }

        const updatedData = {
            ...updatedDetails,
            gender: selectedGender,
            consultingDoctor: selectedDoctor,
            bloodGroup:selectedBloodGroup,
            state:selectedState,
            country:selectedCountry,
        };

        fetch(`${backendURL}/adminRouter/updateBasicDetails/${patientId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Profile updated successfully:', data);
            setIsEditing(false);
            setPatientBasicDetails(data.data);
        })
        .catch(error => {
            console.error('Error updating patient basic details:', error);
        });
    };

    const handleInputChange = (field, value) => {
        if (field === 'age') {
            const numericValue = parseInt(value);
            setUpdatedDetails((prevState) => ({
                ...prevState,
                [field]: isNaN(numericValue) ? null : numericValue
            }));
        } else {
            setUpdatedDetails((prevState) => ({
                ...prevState,
                [field]: value
            }));
        }
    };

    const handleGenderChange = (value) => {
        setSelectedGender(value);
    };
    const handleStateChange = (value) => {
        if (value === 'Other') {
            setManualStateVisible(true);
            setSelectedState(null);
            setState('');
        } else {
            setState(value);
            setSelectedState(value);
            setManualStateVisible(false);
        }
    };
    
    const handleCountryChange = (value) => {
        setCountry(value);
        setSelectedCountry(value);
    };
    const handleManualStateChange = (value) => {
        setState(value);
    };

    const handleConsultingDoctorChange = (value) => {
        setConsultingDoctor(value);
        setSelectedDoctor(value);
    };
    const handleBloodGroupChange = (value) => {
        setBloodGroup(value);
        setSelectedBloodGroup(value);
    };

    if (!PatientbasicDetails) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.text45}>Loading...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
             <StatusBar 
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
            backgroundColor="#FFFFFF"
            translucent={false}
        />
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.profileContainer}>
                    {PatientbasicDetails.image ? (
                        <Image source={{ uri: PatientbasicDetails.image }} style={styles.profileImage} />
                    ) : (
                        <Image source={require('../../../assets/images/user.png')} style={styles.profileImage} />
                    )}
                    <Text style={styles.profileText}>Profile Picture</Text>
                </View>
                <View style={styles.detailsContainer}>
                    {isEditing ? (
                        <>
                         <Text style={styles.label}>Patient Name:</Text>
                            <TextInput
                                style={styles.input}
                                value={updatedDetails.name}
                                onChangeText={(text) => handleInputChange('name', text)}
                            />
                            <Text style={styles.label}>Age:</Text>
                            <TextInput
                                style={styles.input}
                                value={updatedDetails.age?.toString()}
                                onChangeText={(text) => handleInputChange('age', parseInt(text))}
                                keyboardType="numeric"
                            />
                            <Text style={styles.label}>Gender</Text>
                            <View style={[ genderError && styles.inputError]}>
                                <RNPickerSelect
                                    value={selectedGender}
                                    key={selectedGender ? selectedGender.toString() : 'gender'}
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
                                  <View style={styles.inputContainer}>
                        <Text style={styles.label}>Contact Number</Text>
                            <View style={[styles.input,contactNumberError && styles.contactNumberInput]}>
                            <TextInput
                                value={updatedDetails.contactNumber?.toString()}
                                onChangeText={(text) => handleInputChange('contactNumber', parseInt(text))}
                                keyboardType="numeric"
                            />
                            </View>
                            <Text style={styles.label}>Consulting Doctor:</Text>
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
                        <Text style={styles.label}>Email:</Text>
                        <TextInput
                                style={styles.input}
                                value={updatedDetails.email}
                                onChangeText={(text) => handleInputChange('email', text)}
                            />
                            <Text style={styles.label}>Blood Group:</Text>
                            <View>
                        <RNPickerSelect
                            value={selectedBloodGroup}
                            key={bloodGroup ? bloodGroup.toString() : 'bloodGroup'}
                            placeholder={{
                                label: 'Select Blood Group',
                                value: null,
                            }}
                            onValueChange={handleBloodGroupChange}
                            items={[
                                { label: 'A+ᵛᵉ', value: 'A+ve' },
                                { label: 'A-ᵛᵉ', value: 'A-ve' },
                                { label: 'B+ᵛᵉ', value: 'B+ve' },
                                { label: 'B-ᵛᵉ', value: 'B-ve' },
                                { label: 'AB+ᵛᵉ', value: 'AB+ve' },
                                { label: 'AB-ᵛᵉ', value: 'AB-ve' },
                                { label: 'O+ᵛᵉ', value: 'O+ve' },
                                { label: 'O-ᵛᵉ', value: 'O-ve' },
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
                        <Text style={styles.label}>Address</Text>
                        <TextInput
                                style={styles.input}
                                value={updatedDetails.address}
                                onChangeText={(text) => handleInputChange('address', text)}
                            />
                    </View>
                    <Text style={styles.label}>State</Text>
                    <View>
                        <RNPickerSelect
                            value={selectedState || 'West Bengal'}
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
                    <View>
                        <RNPickerSelect
                            value={selectedCountry || 'India'}
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
                         <Text style={styles.label}>Local Contact Name:</Text>
                        <TextInput
                                style={styles.input}
                                value={updatedDetails.localContactName}
                                onChangeText={(text) => handleInputChange('localContactName', text)}
                            />
                             <Text style={styles.label}>Local Contact Relation:</Text>
                        <TextInput
                                style={styles.input}
                                value={updatedDetails.localContactRelation}
                                onChangeText={(text) => handleInputChange('localContactRelation', text)}
                            />
                             <Text style={styles.label}>Local Contact Number:</Text>
                        <TextInput
                                style={styles.input}
                                value={updatedDetails.localContactNumber}
                                onChangeText={(text) => handleInputChange('localContactNumber', text)}
                            />

                    </View>
                        </View>
                        </View>

                        </>
                    ) : (
                        <>
                            <Text style={styles.label}>Patient Name:</Text>
                            <View style={styles.textContainer}>
                                <Text style={styles.value}>{PatientbasicDetails.name}</Text>
                            </View>
                    <Text style={styles.label}>Age:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{PatientbasicDetails.age}</Text></View>
                    <Text style={styles.label}>Gender:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{PatientbasicDetails.gender}</Text></View>
                    <Text style={styles.label}>Patient ID:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{PatientbasicDetails.patientId}</Text></View>
                    <Text style={styles.label}>Contact Number:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{PatientbasicDetails.contactNumber}</Text></View>
                    <Text style={styles.label}>Consulting Doctor:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{PatientbasicDetails.consultingDoctor}</Text></View>
                    <Text style={styles.label}>Email:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{PatientbasicDetails.email}</Text></View>
                    <Text style={styles.label}>Blood Group:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{PatientbasicDetails.bloodGroup}</Text></View>
                    <Text style={styles.label}>Address:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{PatientbasicDetails.address}</Text></View>
                    <Text style={styles.label}>State:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{PatientbasicDetails.state}</Text></View>
                    <Text style={styles.label}>Country:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{PatientbasicDetails.country}</Text></View>
                    <Text style={styles.label}>Local Contact Name:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{PatientbasicDetails.localContactName}</Text></View>
                    <Text style={styles.label}>Local Contact Relation:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{PatientbasicDetails.localContactRelation}</Text></View>
                    <Text style={styles.label}>Local Contact Number:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{PatientbasicDetails.localContactNumber}</Text></View>
                    </>
                    )}
                </View>
              <View style={styles.buttonContainer}>
              <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={isEditing ? handleCancel : handleClose}>
                  <Text style={[styles.buttonText, styles.cancelText]}>Cancel</Text>
              </TouchableOpacity>
              {isEditing ? (
                  <TouchableOpacity style={[styles.button, styles.submitButton]} onPress={handleSubmit}>
                      <Text style={[styles.buttonText, styles.submitText]}>Submit</Text>
                  </TouchableOpacity>
              ) : (
                  <TouchableOpacity style={[styles.button, styles.editButton]} onPress={handleEdit}>
                      <Text style={[styles.buttonText, styles.editText]}>Edit Data</Text>
                  </TouchableOpacity>
              )}
          </View>
      </ScrollView>
  </SafeAreaView>
);
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: windowWidth*-0.5,
    },
    scrollContent: {
        flexGrow: 1,
    },
    textContainer:{
        backgroundColor: '#F1F4F3',
        padding: 5,
    },
    button457: {
        marginLeft: 10,
        width:windowWidth*0.3,
        backgroundColor: "#9F0606",
        padding: 5,
        alignItems:'center',
        justifyContent:'center',
        borderRadius: 6,
    },
    text567: {
        color: "#096759",
        fontFamily: "bold01",
        fontSize: 14,
    },
    ageInput: {
        flex: 1,
        paddingHorizontal: 10,
        height: 40,
    },
    ageError: {
        borderColor: 'red',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    pickerSelect: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        color: 'black',
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
    text568:{
        color:'#fff',
        padding:3,
        fontFamily: "bold01",
        fontSize: 14,
    },
    registerTextContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    registerText: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 75,
    },
    profileText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    detailsContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        padding: 5,
    },
    value: {
        fontSize: 16,
        marginTop: 5,
    },
    buttonContainer: {
        paddingTop: 20,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        marginBottom: 20, 
        marginTop: 'auto', 
        flexDirection:'row'
    },
    button: {
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: '45%',
    },
    cancelButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'red',
    },
    cancelText: {
        color: 'red',
    },
    submitButton: {
        backgroundColor: '#008080',
    },
    submitText: {
        color: '#FFFFFF',
    },
    editButton: {
        backgroundColor: '#9F0606',
    },
    editText: {
        color: '#FFFFFF',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    input: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    text45:{
        marginTop: windowWidth*0.10,
        fontSize:18,
        fontFamily: 'bold01',
        marginLeft: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    contactNumberInput: {
        flex: 3,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 5,
    },
    inputError: {
        borderColor: 'red',
    },
});

export default UpdatedBasicDetails;
