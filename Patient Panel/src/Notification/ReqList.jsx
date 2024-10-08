import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions, RefreshControl } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontFamily, Color } from '../../GlobalStyles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { backendURL } from "../backendapi";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReqList = ({ searchText }) => {
    const navigation = useNavigation();
    const [filteredData, setFilteredData] = useState([]);
    const [originalData, setOriginalData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [patientId, setPatientId] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const fetchPatientData = useCallback(async (id) => {
        try {
            const response = await fetch(`${backendURL}/patientRouter/allrequest/${id}`);
            if (response.ok) {
                const requestData = await response.json();
                setOriginalData(requestData);
                setFilteredData(requestData);
                setLoading(false);
            } else {
                console.error('Failed to fetch request data');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching request data:', error);
            setLoading(false);
        }
    }, []);

    const refreshList = useCallback(async () => {
        setRefreshing(true);
        if (patientId) {
            await fetchPatientData(patientId);
        }
        setRefreshing(false);
    }, [patientId, fetchPatientData]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedPatientId = await AsyncStorage.getItem('patientId');
                if (storedPatientId) {
                    setPatientId(storedPatientId);
                    fetchPatientData(storedPatientId);
                }
            } catch (error) {
                console.error('Error fetching patientId from storage:', error);
            }
        };
        fetchData();
    }, [fetchPatientData]);

    useFocusEffect(
        useCallback(() => {
            if (patientId) {
                fetchPatientData(patientId);
            }
        }, [patientId, fetchPatientData])
    );

    useEffect(() => {
        if (patientId) {
            filterData(searchText);
        }
    }, [searchText, patientId, originalData]);

    const filterData = (text) => {
        if (!text) {
            setFilteredData(originalData);
        } else {
            const filtered = originalData.filter(item => 
                item.date.toLowerCase().includes(text.toLowerCase()) ||
                item.time.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredData(filtered);
        }
    };

    const handleViewDetails = (requestId) => {
        navigation.navigate('NotificationNavbar', {requestId})
    };

    const renderRequestItem = ({ item }) => {
        const [day, month] = item.date.split(',');
        return (
            <View style={styles.reqView}>
                <View style={styles.dateBlock}>
                    <Text style={styles.dayText}>{day}</Text>
                    <Text style={styles.monthText}>{month}</Text>
                </View>
                <View style={styles.reqdet}>
                    <Text style={styles.requeston}>Request on</Text>
                    <Text style={styles.reqdate}>Date: {item.date}</Text>
                    <Text style={styles.reqtime}>Time: {item.time}</Text>
                </View>
                <TouchableOpacity
                    style={styles.viewButton2451}
                    onPress={() => handleViewDetails(item.requestId)}
                >
                    <Text style={styles.viewDetails}>View</Text>
                </TouchableOpacity>
            </View>
        );
    };

    if (loading) {
        return <Text style={styles.text45}>Loading...</Text>;
    }
    
    if (filteredData.length === 0) {
        return <Text style={styles.text45}>No matching requests found.</Text>;
    }

    return (
        <SafeAreaView style={styles.reqcon}>
            <FlatList
                nestedScrollEnabled
                data={filteredData}
                renderItem={renderRequestItem}
                keyExtractor={item => item.requestId.toString()}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={refreshList}
                    />
                }
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    reqcon: {
        flex: 1,
        marginBottom: 85,
        paddingTop: -windowWidth * 0.14,
    },
    text45:{
        marginTop: windowWidth*0.05,
        fontSize:18,
        fontFamily: 'bold01',
        marginLeft: 20,
    },
    dayText: {
        color: '#fff',
        paddingTop:17,
        paddingBottom: 5,
        fontSize: 18,
        textAlign:'center',
        fontWeight: 'bold',
        fontFamily: FontFamily.poppinsBold,
    },
    monthText: {
        color: '#fff',
        textAlign:'center',
        fontSize: 18,
        fontFamily: FontFamily.poppinsRegular,
    },
    reqView: {
        width: windowWidth * 0.97,
        height: windowWidth * 0.35,
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 10,
        elevation: 5,
    },
    dateBlock: {
        marginLeft: windowWidth * 0.03,
        width: windowWidth * 0.26,
        height: windowWidth * 0.28,
        borderRadius: 10,
        backgroundColor: '#357EEA',
        alignSelf: 'center',
        alignContent: 'center'
    },
    viewButton2451: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        width: windowWidth * 0.2,
        height: 34,
        borderColor: '#F56B62',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 5,
        marginTop: windowWidth * 0.13,
        marginLeft: windowWidth * 0.75,
    },
    viewDetails: {
        color: '#F56B62',
        fontSize: 12,
        alignContent: 'center',
    },
    reqdet: {
        display: 'flex',
        flexDirection: 'column',
    },
    requeston: {
        fontWeight: 'bold',
        alignItems: 'center',
        marginLeft: windowWidth * 0.02,
        marginTop: windowWidth * 0.07,
        fontSize: 20,
        fontFamily: FontFamily.font_bold,
    },
    reqdate: {
        marginLeft: windowWidth * 0.02,
        alignItems: 'center',
        color: '#011411',
        fontSize: 14,
        fontFamily: FontFamily.font_bold,
        marginTop: windowWidth * 0.005,
    },
    reqtime: {
        marginLeft: windowWidth * 0.02,
        alignItems: 'center',
        color: '#011411',
        fontSize: 14,
        fontFamily: FontFamily.font_bold,
        marginTop: windowWidth * 0.005
    },
    dateText: {
        padding: windowWidth*0.02,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        alignSelf: 'center'
    },
    monText: {
        fontSize: 17,
        fontWeight: 'bold',
        color: '#fff',
        alignSelf: 'center'
    }
});

export default ReqList; 