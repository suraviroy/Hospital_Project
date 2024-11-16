import React, { useState, useEffect, useCallback } from 'react';
import { View, Platform,StatusBar,StyleSheet, Text, TouchableOpacity, FlatList, Dimensions, RefreshControl } from 'react-native';
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
                // console.error('Failed to fetch request data');
                setLoading(false);
            }
        } catch (error) {
            console.error('Error fetching request data:', error);
            setLoading(false);
        }
    }, []);
    const formatDate = (dateString) => {
        if (!dateString) return { month: '', day: '', year: '' };
        const parts = dateString.split(/[\s,]+/);
        
        return {
            month: parts[0],     
            day: parts[1],       
            year: parts[2]       
        };
    };

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
        const { month, day, year } = formatDate(item.date);
        
        return (
            <View style={styles.reqView}>
                <StatusBar 
                    barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
                    backgroundColor="#FFFFFF" 
                    translucent={false}
                />
                <View style={styles.dateBlock}>
                    <Text style={styles.monthText}>{month}</Text>
                    <Text style={styles.dayText}>{day}</Text>
                    <Text style={styles.yearText}>{year}</Text>
                </View>
                <View style={styles.reqdet}>
                    <Text style={styles. requeston}>Request</Text>
                    <Text style={styles.reqdate} numberOfLines={2}>{item.request}</Text>
                    {/* <Text style={[styles.reqdate, styles.reqSubText]}>{year}</Text> */}
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
        justifyContent: 'center',
        paddingVertical: 5,
    },
    monthText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: windowWidth*0.04,
        fontFamily: FontFamily.poppinsRegular,
        paddingBottom: 2,
        fontWeight:'600'
    },
    dayText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: windowWidth*0.06,
        fontWeight: 'bold',
        fontFamily: FontFamily.poppinsBold,
        paddingBottom: 2,
    },
    yearText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: windowWidth*0.04,
        fontFamily: FontFamily.poppinsRegular,
        fontWeight:'600'
    },
    reqdate: {
        marginLeft: windowWidth * 0.02,
        alignItems: 'center',
        color: '#011411',
        fontSize: 14,
        fontFamily: FontFamily.font_bold,
        marginTop: windowWidth * 0.02,
        fontSize:windowWidth*0.035,
        fontWeight:'500',
        width:windowWidth*0.3,
        fontStyle: 'italic'
    },
    reqSubText: {
        marginTop: 0,
        paddingTop: 0,
    },
    viewButton2451: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        width: windowWidth * 0.2,
        height: 34,
        borderColor: '#E14526',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 5,
        marginTop: windowWidth * 0.13,
        marginLeft: windowWidth * 0.68,
    },
    viewDetails: {
        color: '#E14526',
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
    reqtime: {
        marginLeft: windowWidth * 0.02,
        alignItems: 'center',
        color: '#011411',
        fontSize: 14,
        fontFamily: FontFamily.font_bold,
        marginTop: windowWidth * 0.02
    },
    dateText: {
        padding: windowWidth*0.02,
        fontSize: 25,
        fontWeight: 'bold',
        color: '#fff',
        alignSelf: 'center'
    },
});

export default ReqList; 