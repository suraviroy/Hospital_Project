
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontFamily } from '../../GlobalStyles';
import { backendURL } from "../backendapi";

const TodayListURL = `${backendURL}/adminRouter/sectionAtodaysPatient`;
const BasicDetailsURL = `${backendURL}/adminRouter/PatientBasicDetails`;


const TodayList = ({ searchText }) => {
    const navigation = useNavigation();
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(TodayListURL);
                const data = await response.json();
                setPatients(data);
                setFilteredPatients(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };

        fetchData();
    }, [patients]);

    useEffect(() => {
        const filtered = patients.filter(patient =>
            patient.name.toLowerCase().includes(searchText.toLowerCase()) ||
            patient.patientId.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredPatients(filtered);
    }, [searchText, patients]);

    const handleViewDetails = (patientId) => {
           fetch(`${BasicDetailsURL}/${patientId}`)
            .then(response => response.json())
            .then(data => {
                navigation.navigate('PatientBasicDetails', { details: data[0] });
            })
            .catch(error => {
                console.error('Error fetching patient details:', error);
            });
    };

    const renderPatientItem = ({ item }) => (
        <View style={styles.patientView2451}>
            {item.image ? (
            <Image source={{ uri: item.image }} style={styles.patientImage2451} />
        ) : (
            <Image source={require('../../assets/images/user.png')} style={styles.patientImage2451} />
        )}
            <View style={styles.patientDetails13}>
                <Text style={styles.patientDetails2451}>{item.name}</Text>
                <Text style={styles.patientDetails2450}>{item.gender}</Text>
                <Text style={styles.patientDetails2450}>{item.age}</Text>
            </View>
            <View style={styles.patientId2451}>
                <Text style={styles.patientId13}>{item.patientId}</Text>
            </View>
            <TouchableOpacity
                style={styles.viewButton2451}
                onPress={() => handleViewDetails(item.patientId)}
            >
                <Text style={styles.viewDetails}>View Details</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading) {
        return <Text style={styles.text45}>Loading...</Text>;
    }
    
    if (filteredPatients.length === 0) {
        return <Text style={styles.text45}>No patients registered today!!</Text>;
    }
    
    return (
        <SafeAreaView style={styles.patientContainer2451}>
            <FlatList
                nestedScrollEnabled
                data={filteredPatients}
                renderItem={renderPatientItem}
                keyExtractor={item => item.patientId}
            />
        </SafeAreaView>
    );
};

export default TodayList;


const styles = StyleSheet.create({
    patientContainer2451:{
        flex: 1, 
        marginBottom: 85,
        marginTop: windowWidth*-0.08,
        
    },
    text45:{
        marginTop: windowWidth*0.10,
        fontSize:18,
        fontFamily: 'bold01',
        marginLeft: 20,
    },
    patientView2451: {
        width: windowWidth * 0.95, 
        height: windowWidth * 0.4,
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#077547',
        elevation: 5,
    },
    patientId2451: {
        width: windowWidth*0.26,
        height: 30,
        backgroundColor: '#85DBCD',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        marginLeft: windowWidth*0.020,
        marginTop: 7,
        alignContent: 'center',
        textAlignVertical: 'center',
        position:'relative'
    },
    viewButton2451: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        width: 109,
        height: 34,
        borderColor: '#077547',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 5,
        marginTop: 70,
        marginLeft: windowWidth*0.65,
    },
    viewDetails: {
        color: '#077547',
        fontSize: 12,
        alignContent: 'center',
    },
    appointment2451: {
        color: '#666',
        fontSize: 12,
        alignSelf: 'center',
    },
    patientImage2451: {
        marginTop: 5,
        marginLeft: 5,
        marginRight: 10,
        width: windowWidth * 0.2, 
        height: windowWidth * 0.25,
        borderRadius: 8,
    },
    patientDetails2451: {
        fontWeight: 'bold',
        alignItems: 'center',
        marginLeft: 10,
        marginTop: 30,
        fontSize: 14,
        fontFamily: FontFamily.font_bold,
    },
    patientDetails2450: {
        // marginTop: 55,
        marginLeft: 10,
        alignItems: 'center',
        color: '#011411',
        fontSize: 12,
        fontFamily: 'regular89',
        padding: 3,
    },
    patientDetails2452: {
        marginTop: 15,
        marginLeft: 15,
        alignItems: 'center',
        color: 'grey',
        fontSize: 14,
    },
    patientDetails13: {
        display: 'flex',
        flexDirection: 'column',
        width: '45%',
    },
    appointmentdet13: {
        position: 'absolute',
        bottom: 10,
        left: 10,
    },
    patientId13: {
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 4,
        marginLeft: 3,
    },
    time2451: {
        color: '#011411',
        alignSelf: 'center',
        fontFamily: 'bold01'
    },
});