import React, { useState, useEffect } from 'react';
import { View, StatusBar, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, Platform, ActivityIndicator } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontFamily } from '../../GlobalStyles';
import { backendURL } from "../backendapi";
import Icon from 'react-native-vector-icons/MaterialIcons';

const ViewListURL = `${backendURL}/adminRouter/allpatientList`;
const SearchURL = `${backendURL}/adminRouter/search`;
const BasicDetailsURL = `${backendURL}/adminRouter/UpdateProfileNameId`;

const PatientList = ({ searchText }) => {
    const navigation = useNavigation();
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingStates, setLoadingStates] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loadingMore, setLoadingMore] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const fetchData = async (page, searchQuery = '') => {
        try {
            if (page === 1) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }

            let url;
            if (searchQuery) {
                url = `${SearchURL}?value=${searchQuery}`;
            } else {
                url = `${ViewListURL}?page=${page}&limit=10`;
            }

            const response = await fetch(url);
            const data = await response.json();
            
            if (searchQuery) {
                setPatients(data);
                setFilteredPatients(data);
                setTotalPages(1);
            } else {
                setTotalPages(data.totalPages);
                setPatients(data.patients);
                setFilteredPatients(data.patients);
            }

            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching patient data:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
            setRefreshing(false);
        }
    };

    // Initial data fetch
    useEffect(() => {
        fetchData(1);
    }, []);

    // Search functionality
    useEffect(() => {
        if (searchText && typeof searchText === 'string' && searchText.trim() !== '') {
            fetchData(1, searchText);
        } else {
            fetchData(1);
        }
    }, [searchText]);

    // Add useFocusEffect to refresh data when screen comes into focus
    useFocusEffect(
        React.useCallback(() => {
            // This will run when the screen comes into focus
            fetchData(1, searchText || '');
            return () => {
                // This will run when the screen goes out of focus
                // Cleanup if needed
            };
        }, [searchText])
    );

    const handleRefresh = () => {
        setRefreshing(true);
        fetchData(1, searchText || '');
    };

    const handlePageChange = (newPage) => {
        if (newPage > 0 && newPage <= totalPages) {
            fetchData(newPage);
        }
    };

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

    const renderPatientItem = ({ item }) => (
        <View style={styles.patientView}>
            <View style={styles.imageContainer}>
                {item.image ? (
                    <Image 
                        source={{uri: `${backendURL}/getfile/${item.image}`}}
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

                {item.visitDate && item.visitTime && (
                    <View style={styles.appointmentContainer}>
                        <Text style={styles.appointmentText}>
                            Last Appointment On: {' '}
                            <Text style={styles.appointmentTime}>{item.visitDate}, {item.visitTime}</Text>
                        </Text>
                    </View>
                )}
            </View>
        </View>
    );

    const renderFooter = () => {
        if (!loadingMore || searchText) return null;
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="small" color="#096759" />
                <Text style={styles.loadingText}>Loading More ...</Text>
            </View>
        );
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
                keyExtractor={(item, index) => item.patientId + index}
                contentContainerStyle={styles.listContainer}
                refreshing={refreshing}
                onRefresh={handleRefresh}
            />
            
            {!searchText && totalPages > 1 && (
                <View style={styles.paginationContainer}>
                    <TouchableOpacity 
                        style={[styles.paginationButton, currentPage === 1 && styles.disabledButton]}
                        onPress={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <Icon name="chevron-left" size={24} color={currentPage === 1 ? '#ccc' : '#096759'} />
                    </TouchableOpacity>

                    <Text style={styles.pageText}>
                        Page {currentPage} of {totalPages}
                    </Text>

                    <TouchableOpacity 
                        style={[styles.paginationButton, currentPage === totalPages && styles.disabledButton]}
                        onPress={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <Icon name="chevron-right" size={24} color={currentPage === totalPages ? '#ccc' : '#096759'} />
                    </TouchableOpacity>
                </View>
            )}
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
        paddingTop: windowWidth*0.05,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#fff',
    },
    paginationButton: {
        padding: 10,
        marginHorizontal: 10,
    },
    disabledButton: {
        opacity: 0.3,
    },
    pageText: {
        fontSize: 16,
        fontFamily: 'bold01',
        color: '#096759',
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
        minHeight: windowWidth * 0.38, 
    },
    imageContainer: {
        width: windowWidth * 0.18, 
        height: windowWidth * 0.18, 
        marginRight: 10,
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#f5f5f5', 
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
        justifyContent: 'center', 
        minHeight: 35,
    },
    updateButton: {
        padding: windowWidth*0.02,
        borderRadius: 5,
        borderWidth: 1.5,
        borderColor: '#E14526',
        minWidth: windowWidth * 0.22,
        alignItems: 'center',
        justifyContent: 'center', 
        minHeight: 35,
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
        padding: 10,
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