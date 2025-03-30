import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, Platform, ActivityIndicator } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontFamily } from '../../../GlobalStyles';
import { backendURL } from "../../backendapi";

const PatientListURL = `${backendURL}/adminRouter/registeredPatientList`;
const BasicDetailsURL = `${backendURL}/adminRouter/UpdateProfileNameId`;

const Item = ({ name, patientId, image, handleUpdate }) => (
    <View style={styles.regpatView13}>
        <View style={styles.contentContainer}>
            <View style={styles.imageContainer}>
                {image ? (
                    <Image source={{uri: `${backendURL}/getfile/${image}`}} style={styles.regpatImage13} />
                ) : (
                    <Image source={require('../../../assets/images/user2.png')} style={styles.regpatImage13} />
                )}
            </View>
            <View style={styles.regpatDetails13}>
                <Text style={styles.regpatDetails14} numberOfLines={2}>{name}</Text>
                <Text style={styles.regpatDetails15}>ID: {patientId}</Text>
            </View>
            <TouchableOpacity
                style={styles.updateButton13}
                onPress={() => handleUpdate(patientId)}> 
                <Text style={styles.update13}>Update Details</Text>
            </TouchableOpacity>
        </View>
    </View>
);

const RegisteredPatient = ({ searchText }) => {
    const navigation = useNavigation();
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(PatientListURL)
            .then(response => response.json())
            .then(data => {
                setPatients(data);
                setFilteredPatients(data); 
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching Patient list:', error);
            });
    }, [patients]);

    useEffect(() => {
        let filtered = patients;
        if (searchText) {
          filtered = patients.filter(patient =>
            searchText.test(patient.name.toLowerCase()) ||
            searchText.test(patient.patientId.toLowerCase())
          );
        }
        setFilteredPatients(filtered);
      }, [searchText, patients]);

    const handleUpdate = (patientId) => {
        fetch(`${BasicDetailsURL}/${patientId}`)
            .then(response => response.json())
            .then(data => {
                navigation.navigate('RegisterFirst', { details: data[0] });
            })
            .catch(error => {
                console.error('Error fetching patient details:', error);
            });
    };
   
    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#096759" />
                <Text style={styles.loadingText}>Loading ...</Text>
            </View>
        );
    }

    if (filteredPatients.length === 0) {
        return <Text style={styles.text45}>No Patients Left to update!!</Text>;
    }

    return (
        <SafeAreaView style={styles.regPatCon13}>
            <FlatList
                data={filteredPatients}
                renderItem={({ item }) => (
                    <Item
                        name={item.name}
                        patientId={item.patientId}
                        image={item.image}
                        handleUpdate={handleUpdate}
                    />
                )}
                keyExtractor={item => item.patientId}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    regPatCon13: {
        flex: 1,
        marginBottom: 70,
        paddingTop: -windowWidth * 0.13,
    },
    text45: {
        marginTop: windowWidth * 0.05,
        fontSize: 18,
        fontFamily: 'bold01',
        marginLeft: 20,
    },
    loadingText: {
        marginTop: 16,
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        textAlign: 'center',
        justifyContent: 'center',
        color: '#666666',
    },
    regpatView13: {
        width: windowWidth * 0.95,
        minHeight: windowWidth * 0.30, // Changed from fixed height to minHeight
        backgroundColor: '#fff',
        marginTop: 10,
        borderRadius: 10,
        elevation: 5,
        marginLeft: windowWidth * 0.03,
        paddingVertical: 10, // Added padding for content spacing
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
    },
    imageContainer: {
        marginRight: 10,
    },
    regpatImage13: {
        width: 80,
        height: 80,
        borderRadius: 50,
    },
    regpatDetails13: {
        flex: 1, // Allow details to take remaining space
        marginRight: 10, // Add margin for spacing from button
    },
    regpatDetails14: {
        fontWeight: 'bold',
        fontSize: 15,
        fontFamily: FontFamily.font_bold,
        flexWrap: 'wrap', // Allow text to wrap
    },
    regpatDetails15: {
        color: 'grey',
        fontSize: 13,
        marginTop: 5,
    },
    updateButton13: {
        backgroundColor: '#096759',
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        minWidth: windowWidth * 0.27,
    },
    update13: {
        color: '#fff',
        fontSize: 12,
        textAlign: 'center',
    }
});

export default RegisteredPatient;