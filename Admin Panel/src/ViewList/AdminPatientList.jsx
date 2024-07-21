import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Dimensions, Image } from 'react-native';
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
        <View style={styles.patientView2451}>
            {item.image ? (
                <Image source={{ uri: item.image }} style={styles.patientImage2451} />
            ) : (
                <Image source={require('../../assets/images/user2.png')} style={styles.patientImage2451} />
            )}
            <View style={styles.patientDetails13}>
                <Text style={styles.patientDetails2451}>{item.name}</Text>
                <Text style={styles.patientDetails2450}>{item.gender}</Text>
                <Text style={styles.patientDetails2452}>{item.age}</Text>
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
            <View style={styles.appointmentdet13}>
                <Text style={styles.appointment2451}>Last Appointment On: <Text style={styles.time2451}>{item.visitDate},  {item.visitTime}</Text></Text>
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
            return <Text style={styles.text45}>Loading...</Text>;
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
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // paddingTop: 35,
        paddingTop: windowWidth*0.08,
    },
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
        fontSize: 25,
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
    patientContainer2451:{
        flex: 1, 
        marginBottom: 85,
        paddingTop: -windowWidth*0.14,
    },
    patientView2451: {
        width: windowWidth*0.95,
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
        width: windowWidth*0.28,
        height: 30,
        backgroundColor: '#85DBCD',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        marginLeft: windowWidth*0.027,
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
        width: windowWidth*0.28,
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
        marginTop: 25,
        fontSize: 14,
        fontFamily: FontFamily.font_bold,
    },
    patientDetails2450: {
        // marginTop: 55,
        marginLeft: 10,
        alignItems: 'center',
        color: 'grey',
        fontSize: 12,
        fontFamily: FontFamily.font_bold,
    },
    patientDetails2452: {
        // marginTop: 55,
        marginLeft: 10,
        alignItems: 'center',
        color: 'black',
        fontSize: 12,
        fontFamily: 'bold01'
    },
    // patientDetails2452: {
    //     marginTop: 15,
    //     marginLeft: 15,
    //     alignItems: 'center',
    //     color: 'grey',
    //     fontSize: 14,
    // },
    patientDetails13: {
        display: 'flex',
        flexDirection: 'column',
        width: windowWidth*0.4,
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

export default AdminPatientList;