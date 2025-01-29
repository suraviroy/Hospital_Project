import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, Platform, ActivityIndicator } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
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
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [currentSearchText, setCurrentSearchText] = useState('');

    const fetchData = async (currentPage, searchValue = '') => {
        try {
            setLoading(true);
            setIsLoadingMore(true);
            
            let url = searchValue 
                ? `${SearchURL}?value=${searchValue}&page=${currentPage}&limit=10`
                : `${AllListURL}?page=${currentPage}&limit=10`;

            const response = await fetch(url);
            const data = await response.json();

           
            const newPatients = Array.isArray(data) ? data : (data.patients || []);
            
          
            const updatedPatients = currentPage === 1 
                ? newPatients 
                : [...patients, ...newPatients];

            setPatients(updatedPatients);

            setTotalPages(Math.ceil(newPatients.length / 10));
            
            setLoading(false);
            setIsLoadingMore(false);
        } catch (error) {
            console.error('Error fetching patient data:', error);
            setLoading(false);
            setIsLoadingMore(false);
        }
    };

    useEffect(() => {
        
        setPatients([]);
        setPage(1);
        fetchData(1);
    }, [refreshTrigger]);

    useEffect(() => {
        
        if (searchText) {
            const searchValue = searchText.replace(/^\^/, '').replace(/\/i$/, '');
            setCurrentSearchText(searchValue);
            setPatients([]);
            setPage(1);
            fetchData(1, searchValue);
        } else {

            setCurrentSearchText('');
            setPatients([]);
            setPage(1);
            fetchData(1);
        }
    }, [searchText]);

    const loadMorePatients = () => {
        if (page < totalPages && !isLoadingMore) {
            const nextPage = page + 1;
            setPage(nextPage);
            fetchData(nextPage, currentSearchText);
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

    const renderFooter = () => {
        if (page >= totalPages) return null;
        
        return (
            <TouchableOpacity 
                style={styles.nextButton} 
                onPress={loadMorePatients}
                disabled={isLoadingMore}
            >
                <Text style={styles.nextButtonText}>
                    {isLoadingMore ? 'Loading...' : 'Load More'}
                </Text>
            </TouchableOpacity>
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

    if (patients.length === 0) {
        return <Text style={styles.emptyText}>No patients found!</Text>;
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                nestedScrollEnabled
                data={patients}
                renderItem={renderPatientItem}
                keyExtractor={(item, index) => item.patientId + index}
                contentContainerStyle={styles.listContainer}
                ListFooterComponent={renderFooter}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    nextButton: {
        backgroundColor: '#077547',
        padding: 15,
        alignItems: 'center',
        marginVertical: 10,
        marginHorizontal: 20,
        borderRadius: 8,
    },
    nextButtonText: {
        color: 'white',
        fontFamily: FontFamily.font_bold,
        fontSize: 16,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
        backgroundColor: '#f8f8f8',
    },
    paginationButton: {
        paddingHorizontal: 15,
        paddingVertical: 10,
    },
    disabledButton: {
        opacity: 0.3,
    },
    pageText: {
        fontSize: 16,
        fontFamily: FontFamily.font_bold,
        color: '#077547',
        marginHorizontal: 15,
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