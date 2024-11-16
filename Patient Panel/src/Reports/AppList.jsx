import React, { useState, useEffect } from 'react';
import { View, Platform,StatusBar,StyleSheet, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontFamily, Color } from '../../GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backendURL } from "../backendapi";
import Icon from 'react-native-vector-icons/Ionicons';
const windowWidth = Dimensions.get('window').width;

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const scale = screenWidth / 375;
const normalize = (size) => Math.round(scale * size);

const AppList = ({ searchText }) => {
    const navigation = useNavigation();
    const [patientInfo, setPatientInfo] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [degree,setdegree] = useState(null);
    const [medicine,setmedicine] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedPatientId = await AsyncStorage.getItem('patientId');
                console.log('Stored Patient ID:', storedPatientId);
                if (storedPatientId) {
                    await fetchPatientData(storedPatientId);
                } else {
                    console.warn('No patient ID found in storage');
                }
            } catch (error) {
                console.error('Error fetching patientId from storage:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);
    
    const fetchPatientData = async (patientId) => {
        try {
            console.log('Fetching data for patient ID:', patientId); 
            const response = await fetch(`${backendURL}/patientRouter/PatientsAllAppointments/${patientId}`);
            const data = await response.json();
            console.log('Received appointments data:', data); 
            
            if (data.patientInfo && data.appointments) {
                setPatientInfo(data.patientInfo);
                setAppointments(data.appointments);
                setdegree(data.degree);
                setmedicine(data.medicine);
            } else {
                console.warn('Invalid data structure received:', data);
            }
        } catch (error) {
            console.error('Error fetching patient appointments:', error);
        }
    };

    const renderAppointmentItem = ({ item }) => {
        console.log('Rendering appointment with ID:', item.id);
        return (
            <View style={styles.appointView}>
                <Image
  source={
    patientInfo.consultingDoctor === "Dr. Parthasarathi Bhattacharyya"
      ? { uri: 'https://res.cloudinary.com/tiasha/image/upload/doc_kb8oan.jpg' }
      : {uri: 'https://res.cloudinary.com/tiasha/image/upload/user_hx7cgx.png'}
  }
  style={styles.docImage}
/>
                <View style={styles.docInfoWrapper}>
      <Text style={styles.docname}>{patientInfo.consultingDoctor}</Text>
      <View style={styles.docInfoContainer}>
        <Text style={styles.docdesg}>{degree}</Text>
      </View>
      <Text style={styles.docexp}>{medicine}</Text>
    </View>
    <TouchableOpacity
                    style={styles.viewButton2451}
                    onPress={() => {
                        console.log('Navigating to UpdatedDetails with visitId:', item.id); 
                        navigation.navigate('UpdatedDetails', { visitId: item.id });
                    }}
                >
                    <Text style={styles.viewDetails}>View Details</Text>
                    <Icon name="arrow-forward-circle" marginLeft= {2} size={20} color= '#357EEA' />
                    
                </TouchableOpacity>
    <View style={styles.appdate}>
    <Text style={styles.apptext}>
    Appointment On: {' '}
                        <Text style={styles.datime}>
                            {item.visitDate || 'Date N/A'} , {item.visitTime || 'Time N/A'}
                        </Text>
    </Text>
  </View>
            </View>
        );
    };
    const filteredAppointments = searchText
        ? appointments.filter(appointment => 
            patientInfo?.consultingDoctor?.toLowerCase().includes(searchText.toLowerCase())
          )
        : appointments;

    if (loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading appointments...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.appointcon}>
             <StatusBar 
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
            backgroundColor="#FFFFFF" 
            translucent={false}
        />
            <FlatList
                nestedScrollEnabled
                data={filteredAppointments}
                renderItem={renderAppointmentItem}
                keyExtractor={(item) => item.id}
                ListEmptyComponent={() => (
                    <View style={styles.emptyContainer}>
                        <Text>No appointments found</Text>
                    </View>
                )}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    appointcon: {
        flex: 1,
        marginBottom: 85,
        paddingTop: -windowWidth * 0.14,
    },
    appointView: {
        width: windowWidth * 0.97,
        height: windowWidth * 0.43,
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#357EEA',
        elevation: 5,
    },
    appdate: {
        position: 'absolute',
        display: 'flex',
        bottom: 7,
        width: windowWidth * 0.965,
        borderTopColor: '#D1D1D6',
        borderTopWidth: 1,
        borderStyle: 'solid',
    },
    apptext: {
        color: '#666',
        fontSize: 13,
        marginLeft: windowWidth * 0.02,
        marginTop: windowWidth * 0.01
    },
    datime: {
        color: '#011411',
        alignSelf: 'center',
        fontFamily: 'bold01'
    },
    viewButton2451: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        width: windowWidth * 0.28,
        height: 34,
        borderColor: '#357EEA',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 5,
        marginTop: windowWidth * 0.21,
        marginLeft: windowWidth * 0.65,
    },
    viewDetails: {
        color: '#357EEA',
        fontSize: 12,
        alignContent: 'center',
    },
    docdet: {
        display: 'flex',
        flexDirection: 'column',
    },
    docInfoWrapper: {
        flex: 1,
        marginLeft: normalize(12),
    },
    docInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: normalize(4),
        flexWrap: 'wrap',
    },
    docname: {
        marginTop:normalize(20),
        fontSize: normalize(14),
        fontWeight: 'bold',
        fontFamily: FontFamily.font_bold,
        marginBottom: normalize(4),
    },
    docdesg: {
        fontSize: normalize(12),
        color: '#011411',
        fontFamily: FontFamily.font_bold,
    },
    docexp: {
        fontSize: normalize(12),
        color: '#357EEA',
        fontFamily: FontFamily.font_bold,
        marginTop:normalize(2),
    },
    doclang: {
        fontSize: normalize(12),
        color: Color.colorGray_100,
        fontFamily: 'bold01',
        marginTop: normalize(4),
    },
    appointcon: {
        flex: 1,
        marginBottom: 85,
        paddingTop: -windowWidth * 0.14,
    },
    appointView: {
        width: windowWidth * 0.97,
        height: windowWidth * 0.43,
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 2,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#357EEA',
        elevation: 5,
    },
    docImage: {
        marginTop: windowWidth * 0.02,
        marginLeft: windowWidth * 0.02,
        width: windowWidth * 0.2,
        height: windowWidth * 0.25,
        borderRadius: 2,
    },
    appdate: {
        position: 'absolute',
        display: 'flex',
        bottom: 7,
        width: windowWidth * 0.965,
        borderTopColor: '#D1D1D6',
        borderTopWidth: 1,
        borderStyle: 'solid',
    },
    apptext: {
        color: '#666',
        fontSize: 13,
        marginLeft: windowWidth * 0.02,
        marginTop: windowWidth * 0.01
    },
    datime: {
        color: '#011411',
        alignSelf: 'center',
        fontFamily: 'bold01'
    },
    viewButton2451: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        width: windowWidth * 0.28,
        height: 34,
        borderColor: '#357EEA',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 5,
        marginTop: windowWidth * 0.21,
        marginLeft: windowWidth * 0.65,
    },
    viewDetails: {
        color: '#357EEA',
        fontSize: 12,
        alignContent: 'center',
    },
});

export default AppList;