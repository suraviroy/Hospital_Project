import React, { useState, useEffect, useCallback } from 'react';
import { View, StatusBar, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image, ActivityIndicator, Platform } from 'react-native';
import SearchAdmin from './SearchAdmin';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";
import { useNavigation, useRoute } from '@react-navigation/native';
import { backendURL } from "../backendapi";

const windowWidth = Dimensions.get('window').width;
const BasicDetailsURL = `${backendURL}/adminRouter/UpdateProfileNameId`;
const CoordinatorSearchURL = `${backendURL}/adminRouter/coordinatorSearch`;

const AdminPatientList = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { adminName } = route.params;
    const [searchText, setSearchText] = useState('');
    const [allPatients, setAllPatients] = useState([]);
    const [displayedPatients, setDisplayedPatients] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingStates, setLoadingStates] = useState({}); 
    const [currentPage, setCurrentPage] = useState(1);
    const [patientsPerPage] = useState(10);
    const [totalPatients, setTotalPatients] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const fetchPatients = useCallback(async () => {
        try {
            setLoading(true);
            const response = await fetch(`${backendURL}/adminRouter/coordinatorPatients/${encodeURIComponent(adminName)}`);
            const data = await response.json();
            
            setAllPatients(data.patients);
            setTotalPatients(data.patients.length);
            setDisplayedPatients(data.patients.slice(0, patientsPerPage));
        } catch (error) {
            console.error('Error fetching patient data:', error);
        } finally {
            setLoading(false);
        }
    }, [adminName, patientsPerPage]);


    const searchPatients = useCallback(async () => {
        if (!searchText.trim()) {
            fetchPatients();
            return;
        }

        try {
            setLoading(true);
            setIsSearching(true);
            const response = await fetch(`${CoordinatorSearchURL}/${encodeURIComponent(adminName)}?value=${encodeURIComponent(searchText)}`);
            const data = await response.json();
            
            setAllPatients(data);
            setTotalPatients(data.length);
            setDisplayedPatients(data.slice(0, patientsPerPage));
            setCurrentPage(1);
        } catch (error) {
            console.error('Error searching patients:', error);
            fetchPatients();
        } finally {
            setLoading(false);
            setIsSearching(false);
        }
    }, [adminName, searchText, patientsPerPage, fetchPatients]);

    useEffect(() => {
        fetchPatients();
    }, [fetchPatients]);

    useEffect(() => {
        const searchTimer = setTimeout(() => {
            searchPatients();
        }, 500);

        return () => clearTimeout(searchTimer);
    }, [searchText, searchPatients]);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
        const startIndex = (newPage - 1) * patientsPerPage;
        const endIndex = startIndex + patientsPerPage;
        setDisplayedPatients(allPatients.slice(startIndex, endIndex));
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const handleViewDetails = (patientId) => {
        fetch(`${BasicDetailsURL}/${patientId}`)
        .then(response => response.json())
        .then(data => {
            navigation.navigate('PatientNavigation', { details: data[0] });
        })
        .catch(error => {
            console.error('Error fetching patient details:', error);
        });
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
                        source={require('../../assets/images/user.png')} 
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

    const headerPatients = () => (
        <View style={styles.viewList2451}>
            <View style={styles.header2451}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton13}>
                    <Text><Icon name="angle-left" size={30} color={Color.colorBlack} /></Text>
                </TouchableOpacity>
                <Text style={styles.text2451}>{adminName}'s Patients</Text>
            </View>
            <SearchAdmin 
                onSearchChange={setSearchText}
                placeholder="Search by name or patient ID"
            />
        </View>
    );

    const renderPagination = () => {
        const totalPages = Math.ceil(totalPatients / patientsPerPage);
        
        return (
            <View style={styles.paginationContainer}>
                {/* Previous Button */}
                <TouchableOpacity 
                    style={[styles.paginationButton, currentPage === 1 && styles.paginationButtonDisabled]}
                    onPress={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <Text style={styles.paginationButtonText}>Previous</Text>
                </TouchableOpacity>

                {/* Page Number */}
                <Text style={styles.paginationText}>
                    Page {currentPage} of {totalPages}
                </Text>

                {/* Next Button */}
                <TouchableOpacity 
                    style={[styles.paginationButton, currentPage === totalPages && styles.paginationButtonDisabled]}
                    onPress={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    <Text style={styles.paginationButtonText}>Next</Text>
                </TouchableOpacity>
            </View>
        );
    };

    const renderContent = () => {
        if (loading) {
            return (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#096759" />
                    <Text style={styles.text45}>Loading ...</Text>
                </View>
            );
        }

        if (displayedPatients.length === 0) {
            return <Text style={styles.text45}>No patients found for this admin.</Text>;
        }

        return (
            <>
                <FlatList
                    data={displayedPatients}
                    renderItem={renderPatientItem}
                    keyExtractor={item => item.patientId}
                    style={styles.flatList}
                />
                {renderPagination()}
            </>
        );
    };

    return (
        <SafeAreaView style={styles.appbar2451}>
            <StatusBar 
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
                backgroundColor="#FFFFFF"
                translucent={false}
            />
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    {headerPatients()}
                </View>
                {renderContent()}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    button457: {
        marginLeft: 110,
        borderWidth: 2,
        borderColor: "#096759",
        padding: 5,
        borderRadius: 6,
    },
    text45:{
        marginTop: windowWidth*0.05,
        fontSize:18,
        fontFamily: 'bold01',
        marginLeft: 20,
    },
    footerLoader: {
        paddingVertical: 20,
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        textAlign:'center',
        justifyContent:'center',
        color: '#666666',
    },
    text568:{
        color: "#096759",
        fontFamily: "bold01",
        fontSize: 14,
    },
    headerContainer: {
        paddingHorizontal: 3,
    },
    viewList2451: {
        marginHorizontal: 10,
        marginTop: 5,
    },
    header2451: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    text2451: {
        fontSize: windowWidth*0.05,
        marginLeft: 40,
        fontFamily: "bold01",
    },
    appbar2451: {
        flex: 1,
        backgroundColor: '#fff'
    },
    backButton13: {
        marginRight: 10,
        position: 'absolute',
        left: 10,
    },
    flatList: {
        paddingHorizontal: 2
    },
    
  
    container: {
        flex: 1,
        paddingTop: windowWidth*0.08,
        paddingBottom:windowWidth*0.05,
    },
    listContainer: {
        paddingHorizontal: windowWidth * 0.025,
        paddingTop: 10,
    },
   
    defaultImage: {
        width: '100%',
        height: '100%',
        opacity: 0.7,
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
        minHeight: windowWidth * 0.43, 
        // maxHeight: windowWidth * 0.5, // Set maximum height
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
            paginationContainer: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingHorizontal: 20,
                paddingVertical: 10,
                backgroundColor: '#f5f5f5',
            },
            paginationButton: {
                backgroundColor: '#077547',
                paddingHorizontal: 15,
                paddingVertical: 8,
                borderRadius: 5,
            },
            paginationButtonDisabled: {
                backgroundColor: '#cccccc',
            },
            paginationButtonText: {
                color: 'white',
                fontFamily: 'bold01',
            },
            paginationText: {
                fontFamily: 'bold01',
                fontSize: 14,
            }
        
});

export default AdminPatientList;