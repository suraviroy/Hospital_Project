import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, Platform, ActivityIndicator } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontFamily } from '../../GlobalStyles';
import { backendURL } from "../backendapi";

const ViewListURL = `${backendURL}/adminRouter/allpatientList`;
const BasicDetailsURL = `${backendURL}/adminRouter/UpdateProfileNameId`;

const PatientList = ({ searchText }) => {
    const navigation = useNavigation();
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingStates, setLoadingStates] = useState({}); // Track loading state for each patient

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(ViewListURL);
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
        let filtered = patients;
        if (searchText) {
          filtered = patients.filter(patient =>
            searchText.test(patient.name.toLowerCase()) ||
            searchText.test(patient.patientId.toLowerCase())
          );
        }
        setFilteredPatients(filtered);
    }, [searchText, patients]);

    const setPatientLoading = (patientId, action, isLoading) => {
        setLoadingStates(prev => ({
            ...prev,
            [patientId]: {
                ...prev[patientId],
                [action]: isLoading
            }
        }));
    };

    const handleViewDetails = async (patientId) => {
        setPatientLoading(patientId, 'view', true);
        try {
            const response = await fetch(`${BasicDetailsURL}/${patientId}`);
            const data = await response.json();
            navigation.navigate('PatientNavigation', { details: data[0] });
        } catch (error) {
            console.error('Error fetching patient details:', error);
        } finally {
            setPatientLoading(patientId, 'view', false);
        }
    };

    const handleUpdate = async (patientId) => {
        setPatientLoading(patientId, 'update', true);
        try {
            const response = await fetch(`${BasicDetailsURL}/${patientId}`);
            const data = await response.json();
            navigation.navigate('RegisterFirst', { details: data[0] });
        } catch (error) {
            console.error('Error fetching patient details:', error);
        } finally {
            setPatientLoading(patientId, 'update', false);
        }
    };

    const renderPatientItem = ({ item }) => (
        <View style={styles.patientView}>
            <View style={styles.imageContainer}>
                {item.image ? (
                    <Image 
                        source={{ uri: item.image }} 
                        style={styles.patientImage}
                        resizeMode="cover"
                    />
                ) : (
                    <Image 
                        source={require('../../assets/images/user2.png')} 
                        style={styles.patientImage}
                        resizeMode="contain"
                    />
                )}
            </View>
            
            <View style={styles.contentContainer}>
                <View style={styles.patientDetails}>
                    <Text style={styles.patientName}>{item.name}</Text>
                    <Text style={styles.patientInfo}>Gender: {item.gender}</Text>
                    <Text style={styles.patientInfo}>Age: {item.age}</Text>
                    <Text style={styles.patientInfo}>Id: {item.patientId}</Text>
                </View>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        style={styles.viewButton}
                        onPress={() => handleViewDetails(item.patientId)}
                        disabled={loadingStates[item.patientId]?.view}
                    >
                        {loadingStates[item.patientId]?.view ? (
                            <ActivityIndicator size="small" color="#077547" />
                        ) : (
                            <Text style={styles.viewButtonText}>View Details</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.updateButton}
                        onPress={() => handleUpdate(item.patientId)}
                        disabled={loadingStates[item.patientId]?.update}
                    >
                        {loadingStates[item.patientId]?.update ? (
                            <ActivityIndicator size="small" color="#E14526" />
                        ) : (
                            <Text style={styles.updateButtonText}>Update Disease</Text>
                        )}
                    </TouchableOpacity>
                </View>

                <View style={styles.appointmentContainer}>
                    <Text style={styles.appointmentText}>
                        Last Appointment On: {' '}
                        <Text style={styles.appointmentTime}>{item.visitDate}, {item.visitTime}</Text>
                    </Text>
                </View>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#096759" />
                <Text style={styles.loadingText}>Loading ...</Text>
            </View>
        );
    }

    if (filteredPatients.length === 0) {
        return <Text style={styles.noDataText}>No patients Details Found!</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
                backgroundColor="#FFFFFF"
                translucent={false}
            />
            <FlatList
                nestedScrollEnabled
                data={filteredPatients}
                renderItem={renderPatientItem}
                keyExtractor={item => item.patientId}
                contentContainerStyle={styles.listContainer}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 85,
    },
    listContainer: {
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    patientView: {
        flexDirection: 'row',
        backgroundColor: '#fff',
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#077547',
        margin: 10,
        padding: 10,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        minHeight: windowWidth * 0.43, // Set minimum height
        // maxHeight: windowWidth * 0.5, // Set maximum height
    },
    imageContainer: {
        width: windowWidth * 0.18, // Reduced width
        height: windowWidth * 0.18, // Fixed height same as width
        marginRight: 10,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#f5f5f5', // Light background for image container
    },
    patientImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    contentContainer: {
        flex: 1,
        justifyContent: 'space-between',
    },
    patientDetails: {
        flex: 1,
    },
    patientName: {
        fontSize: 15,
        fontFamily: FontFamily.font_bold,
        marginBottom: 4,
        flexWrap: 'wrap',
    },
    patientInfo: {
        fontSize: 12,
        color: '#666',
        marginBottom: 2,
        fontFamily: 'bold01',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 4,
        gap: 8,
    },
    viewButton: {
        padding: windowWidth*0.02,
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: '#077547',
        minWidth: windowWidth * 0.22,
        marginLeft:-windowWidth*0.09,
        alignItems: 'center',
        justifyContent: 'center', // Added for centering ActivityIndicator
        minHeight: 35, // Added to maintain consistent height with/without loader
    },
    updateButton: {
        padding: windowWidth*0.02,
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: '#E14526',
        minWidth: windowWidth * 0.22,
        alignItems: 'center',
        justifyContent: 'center', // Added for centering ActivityIndicator
        minHeight: 35, // Added to maintain consistent height with/without loader
    },
    viewButtonText: {
        color: '#077547',
        fontSize: windowWidth*0.03,
        fontFamily: 'bold01',
    },
    updateButtonText: {
        color: '#E14526',
        fontSize: windowWidth*0.03,
        fontFamily: 'bold01',
    },
    appointmentContainer: {
        marginTop: 4,
        marginLeft:-windowWidth*0.08
    },
    appointmentText: {
        fontSize: 11,
        color: '#666',
    },
    appointmentTime: {
        color: '#011411',
        fontFamily: 'bold01',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        color: '#666666',
    },
    noDataText: {
        marginTop: windowWidth * 0.1,
        fontSize: 18,
        fontFamily: 'bold01',
        marginLeft: 20,
    },
});

export default PatientList;