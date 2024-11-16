import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, Platform, ActivityIndicator } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontFamily } from '../../GlobalStyles';
import { backendURL } from "../backendapi";

const AllListURL = `${backendURL}/adminRouter/sectionAallPatient`;
const BasicDetailsURL = `${backendURL}/adminRouter/PatientBasicDetails`;

const AllList = ({ searchText, refreshTrigger }) => {
    const navigation = useNavigation();
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch(AllListURL);
            const data = await response.json();
            setPatients(data);
            setFilteredPatients(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching patient data:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        const intervalId = setInterval(fetchData, 20000);
        return () => clearInterval(intervalId);
    }, [refreshTrigger]);

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
    
    const handleViewDetails = async (patientId) => {
        try {
            const response = await fetch(`${BasicDetailsURL}/${patientId}`);
            const data = await response.json();
            navigation.navigate('PatientBasicDetails', { details: data[0] });
        } catch (error) {
            console.error('Error fetching patient details:', error);
        }
    };

    const renderPatientItem = ({ item }) => (
        <View style={styles.patientView}>
            <View style={styles.contentContainer}>
                <View style={styles.imageContainer}>
                    {item.image ? (
                        <Image 
                            source={{ uri: item.image }} 
                            style={styles.patientImage} 
                        />
                    ) : (
                        <Image 
                            source={require('../../assets/images/user.png')} 
                            style={styles.defaultImage}
                            resizeMode="contain"
                        />
                    )}
                </View>

                <View style={styles.infoContainer}>
                    <View style={styles.patientDetails}>
                        <Text style={styles.patientName}  ellipsizeMode="tail">
                         {item.name}
                        </Text>
                        <Text style={styles.patientInfo}>Gender: {item.gender}</Text>
                        <Text style={styles.patientInfo}>Age: {item.age}</Text>
                        <Text style={styles.patientId}>Id: {item.patientId}</Text>
                    </View>

                    <TouchableOpacity
                        style={styles.viewButton}
                        onPress={() => handleViewDetails(item.patientId)}
                    >
                        <Text style={styles.viewButtonText}>View Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={styles.appointmentContainer}>
                <Text style={styles.appointmentText}>
                    Last Appointment On: {' '}
                    <Text style={styles.appointmentTime}>
                        {item.date}, {item.time}
                    </Text>
                </Text>
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
        return <Text style={styles.emptyText}>No patients found!</Text>;
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
        paddingHorizontal: windowWidth * 0.025,
        paddingTop: 10,
    },
    patientView: {
        backgroundColor: '#fff',
        marginBottom: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#077547',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        padding: 10,
        margin:windowWidth*0.02,
    },
    contentContainer: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    imageContainer: {
        width: windowWidth * 0.18,
        height: windowWidth * 0.20,
        marginRight: 12,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        overflow: 'hidden',
    },
    patientImage: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    defaultImage: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
    },
    infoContainer: {
        flex: 1,
        flexDirection: 'row',
    },
    patientDetails: {
        flex: 1,
        paddingRight: 8,
    },
    patientName: {
        fontSize: 15,
        fontFamily: FontFamily.font_bold,
        marginBottom: 4,
        fontWeight:'600'
    },
    patientInfo: {
        fontSize: 13,
        color: '#011411',
        fontFamily: 'regular89',
        marginBottom: 2,
    },
    patientId: {
        fontSize: 13,
        fontFamily: 'bold01',
        color: 'black',
        marginTop: 2,
    },
    viewButton: {
        alignSelf: 'flex-start',
        paddingHorizontal: windowWidth*0.05,
        paddingVertical: windowWidth*0.03,
        borderWidth: 1.5,
        borderColor: '#077547',
        borderRadius: 6,
        marginLeft: 4,
    },
    viewButtonText: {
        color: '#077547',
        fontSize: windowWidth*0.03,
        fontFamily: 'bold01',
    },
    appointmentContainer: {
        marginTop: 4,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    appointmentText: {
        fontSize: 12,
        color: '#666',
        fontFamily: 'regular89',
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
    emptyText: {
        marginTop: windowWidth * 0.1,
        fontSize: 18,
        fontFamily: 'bold01',
        marginLeft: 20,
    },
});

export default AllList;