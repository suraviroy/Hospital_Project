import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontFamily, Color } from '../../GlobalStyles';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backendURL } from "../backendapi";

const windowWidth = Dimensions.get('window').width;

const AppList = ({ searchText }) => {
    const navigation = useNavigation();
    const [patientData, setPatientData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedPatientId = await AsyncStorage.getItem('patientId');
                if (storedPatientId) {
                    fetchPatientData(storedPatientId);
                }
            } catch (error) {
                console.error('Error fetching patientId from storage:', error);
            }
        };
        fetchData();
    }, []);

    const fetchPatientData = async (patientId) => {
        try {
            const response = await fetch(`${backendURL}/patientRouter/HomePageDetails/${patientId}`);
            const data = await response.json();
            setPatientData(data);
        } catch (error) {
            console.error('Error fetching patient basic details:', error);
        }
    };



    const renderAppointmentItem = ({ item }) => (
        <View style={styles.appointView}>
            <Image source={require('../../assets/images/doc.png')} style={styles.docImage} />
            <View style={styles.docdet}>
                <Text style={styles.docname}>{item.consultingDoctor}</Text>
                <View style={{ display: 'flex', flexDirection: 'row' }}>
                    <Text style={styles.docdesg}>MD, DND, DM</Text>
                    <Text style={styles.docexp}>Pulmonary Medicine</Text>
                </View>
                <Text style={styles.doclang}>English, Hindi , Bengali</Text>
            </View>
            <TouchableOpacity
                style={styles.viewButton2451}
            >
                <Text style={styles.viewDetails}>View Details</Text>
            </TouchableOpacity>
            <View style={styles.appdate}>
                <Text style={styles.apptext}>Appointment On: <Text style={styles.datime}>{item.date} , {item.time}</Text></Text>
            </View>
        </View>
    );

    const filteredAppointments = patientData.filter(item =>
        item.consultingDoctor.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <SafeAreaView style={styles.appointcon}>
            <FlatList
                nestedScrollEnabled
                data={filteredAppointments}
                renderItem={renderAppointmentItem}
                keyExtractor={(item, index) => index.toString()}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
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
    docImage: {
        marginTop: windowWidth * 0.02,
        marginLeft: windowWidth * 0.02,
        width: windowWidth * 0.2,
        height: windowWidth * 0.25,
        borderRadius: 8,
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
    docname: {
        fontWeight: 'bold',
        alignItems: 'center',
        marginLeft: windowWidth * 0.02,
        marginTop: windowWidth * 0.05,
        fontSize: 14,
        fontFamily: FontFamily.font_bold,
    },
    docdesg: {
        marginLeft: windowWidth * 0.02,
        alignItems: 'center',
        color: '#011411',
        fontSize: 12,
        fontFamily: FontFamily.font_bold,
        marginTop: windowWidth * 0.005,
        width: windowWidth * 0.28
    },
    doclang: {
        marginLeft: windowWidth * 0.02,
        alignItems: 'center',
        color: Color.colorGray_100,
        fontSize: 12,
        fontFamily: 'bold01',
        marginTop: windowWidth * 0.005
    },
    docexp: {
        color: '#357EEA',
        marginLeft: windowWidth * 0.13,
        alignItems: 'center',
        fontSize: 12,
        fontFamily: FontFamily.font_bold,
        marginTop: windowWidth * 0.005,
    }
});

export default AppList;