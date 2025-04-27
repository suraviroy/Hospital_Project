import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList,Platform, Dimensions, ActivityIndicator } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontFamily } from '../../GlobalStyles';
import { backendURL } from "../backendapi";

const AllListURL = `${backendURL}/adminRouter/sectionAallPatient`;
const SearchURL = `${backendURL}/adminRouter/search`;
const BasicDetailsURL = `${backendURL}/adminRouter/PatientBasicDetailsNewWP`;
const AllList = ({ searchText, refreshTrigger }) => {
    const navigation = useNavigation();
    const [patients, setPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasNextPage, setHasNextPage] = useState(false);
    const [currentSearchText, setCurrentSearchText] = useState('');

    const fetchData = async (page, searchValue = '') => {
        try {
            setLoading(true);
            
            let url = searchValue 
                ? `${SearchURL}?value=${searchValue}&page=${page}&limit=10`
                : `${AllListURL}?page=${page}&limit=10`;

            const response = await fetch(url);
            const data = await response.json();
           
            const newPatients = Array.isArray(data) ? data : (data.patients || []);
            
            setPatients(newPatients);
            
            // If we received 10 items, assume there's a next page
            setHasNextPage(newPatients.length === 10);
            
            setLoading(false);
        } catch (error) {
            console.error('Error fetching patient data:', error);
            setLoading(false);
        }
    };

    const refreshList = useCallback(() => {
        setCurrentPage(1);
        fetchData(1, currentSearchText);
    }, [currentSearchText]);

    // Initial load when component mounts
    useEffect(() => {
        setCurrentPage(1);
        fetchData(1);
    }, [refreshTrigger]);

    // Refresh when searchText changes
    useEffect(() => {
        if (searchText) {
            const searchValue = searchText.replace(/^\^/, '').replace(/\/i$/, '');
            setCurrentSearchText(searchValue);
            setCurrentPage(1);
            fetchData(1, searchValue);
        } else {
            setCurrentSearchText('');
            setCurrentPage(1);
            fetchData(1);
        }
    }, [searchText]);

    // Refresh when screen comes into focus
    useFocusEffect(
        useCallback(() => {
            refreshList();
            return () => {
                // Cleanup if needed
            };
        }, [refreshList])
    );

    const goToNextPage = () => {
        const nextPage = currentPage + 1;
        setCurrentPage(nextPage);
        fetchData(nextPage, currentSearchText);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            const prevPage = currentPage - 1;
            setCurrentPage(prevPage);
            fetchData(prevPage, currentSearchText);
        }
    };

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
                            source={{uri: `${backendURL}/getfile/${item.image}`}}
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
                        <Text style={styles.patientName} ellipsizeMode="tail">
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
                        {item.visitDate || item.date || 'N/A'}, {' '}
                    </Text>
                </Text>
                <Text style={styles.appointmentText}>
                    Time: {' '}
                    <Text style={styles.appointmentTime}>
                        {item.visitTime || item.time || 'N/A'}
                    </Text>
                </Text>
            </View>
        </View>
    );

    const renderPaginationControls = () => (
        <View style={styles.paginationContainer}>
            <TouchableOpacity 
                style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
                onPress={goToPreviousPage}
                disabled={currentPage === 1}
            >
                <Text style={styles.paginationButtonText}>Previous</Text>
            </TouchableOpacity>
            
            <Text style={styles.pageIndicator}>Page {currentPage}</Text>
            
            <TouchableOpacity 
                style={[styles.paginationButton, !hasNextPage && styles.disabledButton]}
                onPress={goToNextPage}
                disabled={!hasNextPage}
            >
                <Text style={styles.paginationButtonText}>Next</Text>
            </TouchableOpacity>
        </View>
    );

    if (loading && currentPage === 1) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#096759" />
                <Text style={styles.loadingText}>Loading ...</Text>
            </View>
        );
    }

    if (patients.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.emptyText}>No patients found!</Text>
                {renderPaginationControls()}
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {loading && (
                <View style={styles.overlayLoader}>
                    <ActivityIndicator size="large" color="#096759" />
                </View>
            )}
            <FlatList
                nestedScrollEnabled
                data={patients}
                renderItem={renderPatientItem}
                keyExtractor={(item, index) => item.patientId + index}
                contentContainerStyle={styles.listContainer}
                ListFooterComponent={renderPaginationControls}
            />
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
        marginTop: 10,
    },
    paginationButton: {
        backgroundColor: '#096759',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: '#CCCCCC',
    },
    paginationButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    pageIndicator: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    overlayLoader: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
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
        margin: windowWidth * 0.02,
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
        fontWeight: '600'
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
        paddingHorizontal: windowWidth * 0.05,
        paddingVertical: windowWidth * 0.03,
        borderWidth: 1.5,
        borderColor: '#077547',
        borderRadius: 6,
        marginLeft: 4,
    },
    viewButtonText: {
        color: '#077547',
        fontSize: windowWidth * 0.03,
        fontFamily: 'bold01',
    },
    appointmentContainer: {
        marginTop: 4,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: '#eee',
        flexDirection:'row'
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
        padding: 20,
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