import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native'; 
const windowWidth = Dimensions.get('window').width;
import { backendURL } from "../../backendapi";

const UpdatedBasicDetails = ({ patientId }) => { 
    const navigation = useNavigation();
    const [basicDetails, setBasicDetails] = useState(null);

    useEffect(() => {
        fetch(`${backendURL}/adminRouter/PatientBasicDetails/${patientId}`)
            .then(response => response.json())
            .then(data => {
                setBasicDetails(data[0]);
            })
            .catch(error => {
                console.error('Error fetching patient basic details:', error);
            });
    }, [patientId]);

    const handleClose = () => {
        navigation.goBack();
    };

    if (!basicDetails) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                {/* <View style={styles.registerTextContainer}>
                    <Text style={styles.registerText}>Patient Basic Details</Text>
                </View> */}
                <View style={styles.profileContainer}>
                    {basicDetails.image ? (
                        <Image source={{ uri: basicDetails.image }} style={styles.profileImage} />
                    ) : (
                        <Image source={require('../../../assets/images/user.png')} style={styles.profileImage} />
                    )}
                    <Text style={styles.profileText}>Profile Picture</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>Patient Name:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.name}</Text></View>
                    <Text style={styles.label}>Age:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.age}</Text></View>
                    <Text style={styles.label}>Gender:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.gender}</Text></View>
                    <Text style={styles.label}>Patient ID:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.patientId}</Text></View>
                    <Text style={styles.label}>Contact Number:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.contactNumber}</Text></View>
                    <Text style={styles.label}>Consulting Doctor:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.consultingDoctor}</Text></View>
                    <Text style={styles.label}>Email:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.email}</Text></View>
                    <Text style={styles.label}>Blood Group:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.bloodGroup}</Text></View>
                    <Text style={styles.label}>Address:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.address}</Text></View>
                    <Text style={styles.label}>State:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.state}</Text></View>
                    <Text style={styles.label}>Country:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.country}</Text></View>
                    <Text style={styles.label}>Local Contact Name:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.localContactName}</Text></View>
                    <Text style={styles.label}>Local Contact Relation:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.localContactRelation}</Text></View>
                    <Text style={styles.label}>Local Contact Number:</Text>
                    <View style = {styles.textContainer}>
                    <Text style={styles.value}>{basicDetails.localContactNumber}</Text></View>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={handleClose}>
                        <Text style={[styles.buttonText, styles.deleteText]}>Close</Text>
                    </TouchableOpacity>
                    {/* <TouchableOpacity style={[styles.button, styles.updateButton]} >
                        <Text style={[styles.buttonText, styles.updateText]}>Update</Text>
                    </TouchableOpacity> */}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

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
        justifyContent: 'center',
        paddingHorizontal: 20,
        marginBottom: 20, 
        marginTop: 'auto', 
    },
    button: {
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: '45%',
    },
    deleteButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'red',
    },
    deleteText: {
        color: 'red',
    },
    updateButton: {
        backgroundColor: '#008080',
    },
    updateText: {
        color: '#FFFFFF',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default UpdatedBasicDetails;
