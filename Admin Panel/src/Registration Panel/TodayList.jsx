import React, { useState, useEffect } from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, Platform, ActivityIndicator } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontFamily } from '../../GlobalStyles';
import { backendURL } from "../backendapi";

const TodayListURL = `${backendURL}/adminRouter/sectionAtodaysPatient`;
const BasicDetailsURL = `${backendURL}/adminRouter/PatientBasicDetailsNewWP`;

const TodayList = ({ searchText }) => {
    const navigation = useNavigation();
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        try {
            const response = await fetch(TodayListURL);
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
    }, []);

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
                
                <View style={styles.patientDetails}>
                    <Text style={styles.patientName} ellipsizeMode="tail">
                     {item.name}
                    </Text>
                    <Text style={styles.patientInfo}>Gender: {item.gender}</Text>
                    <Text style={styles.patientInfo}>Age: {item.age}</Text>
                    <Text style={styles.patientId}>Id: {item.patientId}</Text>
                </View>
            </View>

            <TouchableOpacity
                style={styles.viewButton}
                onPress={() => handleViewDetails(item.patientId)}
            >
                <Text style={styles.viewButtonText}>View Details</Text>
            </TouchableOpacity>
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
        return <Text style={styles.emptyText}>No patients registered today!!</Text>;
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
        margin:windowWidth*0.03,
    },
    contentContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    imageContainer: {
        width: windowWidth * 0.15, // Reduced from 0.2
        height: windowWidth * 0.15, // Added fixed height
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
        width: '100%', // Smaller proportion of the container
        height: '100%', // Smaller proportion of the container
        opacity: 0.7, // Slightly faded
    },
    patientDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    patientName: {
        fontSize: 16,
        fontFamily: FontFamily.font_bold,
        marginBottom: 4,
        flexWrap: 'wrap',
        fontWeight:'600'
    },
    patientInfo: {
        fontSize: 13,
        color: '#011411',
        fontFamily: 'regular89',
        marginBottom: 2,
    },
    patientId: {
        fontSize: 14,
        fontFamily: 'bold01',
        marginTop: 2,
    },
    viewButton: {
        alignSelf: 'flex-end',
        paddingHorizontal: windowWidth*0.05,
        paddingVertical: windowWidth*0.03,
        borderWidth: 1.5,
        borderColor: '#077547',
        borderRadius: 6,
        marginTop: 8,
    },
    viewButtonText: {
        color: '#077547',
        fontSize: windowWidth*0.03,
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

export default TodayList;