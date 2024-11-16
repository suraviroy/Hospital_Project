import React, { useState, useEffect } from 'react';
import { View, StatusBar,Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image,ActivityIndicator,Platform } from 'react-native';
import SearchList from './SearchList';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";
import { useNavigation, useRoute } from '@react-navigation/native';
import { backendURL } from "../backendapi";

const windowWidth = Dimensions.get('window').width;
const BasicDetailsURL = `${backendURL}/adminRouter/UpdateProfileNameId`;

const AdminPatientList = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { adminName } = route.params;
    const [searchText, setSearchText] = useState('');
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPatients();
    }, []);

    useEffect(() => {
        filterPatients();
    }, [searchText, patients]);

    const fetchPatients = async () => {
        try {
            const response = await fetch(`${backendURL}/adminRouter/coordinatorPatients/${encodeURIComponent(adminName)}`);
            const data = await response.json();
            setPatients(data);
            setFilteredPatients(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching patient data:', error);
            setLoading(false);
        }
    };

    const filterPatients = () => {
        if (!searchText) {
            setFilteredPatients(patients);
            return;
        }

        const filtered = patients.filter(patient =>
            patient.name.toLowerCase().includes(searchText.toLowerCase()) ||
            patient.patientId.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredPatients(filtered);
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
                          Name:  {item.name}
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
                        {item.visitDate}, {item.visitTime}
                    </Text>
                </Text>
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
            <SearchList setSearchText={setSearchText} />
        </View>
    );

    const renderContent = () => {
        if (loading) {
            return (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color="#096759" />
                    <Text style={styles.text45}>Loading ...</Text>
                </View>
            );
        }
    

        if (filteredPatients.length === 0) {
            return <Text style={styles.text45}>No patients found for this admin.</Text>;
        }

        return (
            <FlatList
                data={filteredPatients}
                renderItem={renderPatientItem}
                keyExtractor={item => item.patientId}
                style={styles.flatList}
            />
        );
    };

    return (
        <SafeAreaView style={styles.appbar2451}>
             <StatusBar 
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
            backgroundColor="#FFFFFF"  // Match your app's background color
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
        marginLeft: 30,
        fontFamily: "bold01",
    },
    appbar2451: {
        flex: 1,
        backgroundColor: '#fff'
    },
    backButton13: {
        marginRight: 10,
        position: 'absolute',
        left: 0,
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

export default AdminPatientList;