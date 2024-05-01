import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontFamily } from '../../../GlobalStyles';
import { backendURL } from "../../backendapi";

const PatientListURL = `${backendURL}/adminRouter/registeredPatientList`;
const BasicDetailsURL = `${backendURL}/adminRouter/UpdateProfileNameId`;

const Item = ({ name, patientId, image, handleUpdate }) => (
    <View style={styles.regpatView13}>
        {image ? (
            <Image source={{ uri: image }} style={styles.regpatImage13} />
        ) : (
            <Image source={require('../../../assets/images/user2.png')} style={styles.regpatImage13} />
        )}
        <View style={styles.regpatDetails13}>
            <Text style={styles.regpatDetails14}>{name}</Text>
            <Text style={styles.regpatDetails15}>ID: {patientId}</Text>
        </View>
        <TouchableOpacity
            style={styles.updateButton13}
            onPress={() => handleUpdate(patientId)}> 
            <Text style={styles.update13}>Update Details</Text>
        </TouchableOpacity>
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
        const filtered = patients.filter(patient =>
            patient.name.toLowerCase().includes(searchText.toLowerCase()) ||
            patient.patientId.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredPatients(filtered);
    }, [patients, searchText]);

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
        return <Text style={styles.text45}>Loading...</Text>;
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
        paddingTop: -windowWidth*0.13,
        
    },
    text45:{
        marginTop: windowWidth*0.05,
        fontSize:18,
        fontFamily: 'bold01',
        marginLeft: 20,
    },
    regpatView13: {
        width: windowWidth * 0.95,
        height: windowWidth * 0.27,
        backgroundColor: '#fff',
        alignContent: 'center',
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 10,
        elevation: 5,
        marginLeft: windowWidth*0.03
    },
    regpatImage13: {
        width: 80,
        height: 80,
        marginLeft: 10,
        marginTop: 10,
        borderRadius: 50,
    },
    regpatDetails13: {
        display: 'flex',
        flexDirection: 'column',
        width: '45%',
        marginLeft: -5,
    },
    regpatDetails14: {
        fontWeight: 'bold',
        alignItems: 'center',
        marginLeft: 15,
        marginTop: 30,
        fontSize: 15,
        fontFamily: FontFamily.font_bold,
    },
    regpatDetails15: {
        marginLeft: 15,
        alignItems: 'center',
        color: 'grey',
        fontSize: 13,
    },
    updateButton13: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        width: windowWidth*0.27,
        height: 34,
        borderRadius: 5,
        marginTop: 30,
        marginLeft: windowWidth*0.65,
        backgroundColor: '#2A9988',
    },
    update13: {
        color: '#fff',
        fontSize: 12,
        alignContent: 'center',
    }
});

export default RegisteredPatient;
