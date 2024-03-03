import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontFamily } from '../../../GlobalStyles';
import { backendURL } from "../../backendapi";

const PatientListURL =  `${backendURL}/adminListRouter/adminlist`;

const Item = ({ name, idNumber, picture, handleUpdate }) => (
    <View style={styles.regpatView13}>
        <Image source={{ uri: picture }} style={styles.regpatImage13} />
        <View style={styles.regpatDetails13}>
            <Text style={styles.regpatDetails14}>{name}</Text>
            <Text style={styles.regpatDetails15}>ID: {idNumber}</Text>
        </View>
        <TouchableOpacity
            style={styles.updateButton13}
            onPress={handleUpdate}>
            <Text style={styles.update13}>Update Details</Text>
        </TouchableOpacity>
    </View>
);

const RegisteredPatient = ({ searchText }) => {
    const navigation = useNavigation();
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);

    useEffect(() => {
        fetch(PatientListURL)
            .then(response => response.json())
            .then(data => {
                setPatients(data);
                setFilteredPatients(data); 
            })
            .catch(error => {
                console.error('Error fetching admin list:', error);
            });
    }, []);

    useEffect(() => {
        const filtered = searchText ? patients.filter(patient => patient.name.toLowerCase().startsWith(searchText.toLowerCase())) : patients;
        setFilteredPatients(filtered);
    }, [searchText, patients]);

    const handleUpdate = () => {
        navigation.navigate('');
    };

    return (
        <SafeAreaView style={styles.regPatCon13}>
            <FlatList
                data={filteredPatients}
                renderItem={({ item }) => (
                    <Item
                        name={item.name}
                        idNumber={item.idNumber}
                        picture={item.picture}
                        handleUpdate={handleUpdate}
                    />
                )}
                keyExtractor={item => item._id}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    regPatCon13: {
        flex: 1,
        marginBottom: 70,
        marginTop: -windowWidth * 0.20,
    },
    regpatView13: {
        width: windowWidth * 1,
        height: windowWidth * 0.27,
        backgroundColor: '#fff',
        alignContent: 'center',
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 10,
        elevation: 5,
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
        width: 109,
        height: 34,
        borderRadius: 5,
        marginTop: 30,
        marginLeft: 270,
        backgroundColor: '#2A9988',
    },
    update13: {
        color: '#fff',
        fontSize: 12,
        alignContent: 'center',
    }
});

export default RegisteredPatient;

