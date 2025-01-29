import React, { useState, useEffect, useCallback } from 'react';
import { View, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions, RefreshControl } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontFamily, Color } from '../../GlobalStyles';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { backendURL } from "../backendapi";
import AsyncStorage from '@react-native-async-storage/async-storage';

const MAX_VISIBLE_REQUESTS = 1;

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
                item.time.toLowerCase().includes(text.toLowerCase()) ||
                item.request.some(req => 
                    req.requestFor.toLowerCase().includes(text.toLowerCase()) ||
                    req.details.toLowerCase().includes(text.toLowerCase())
                )
            );
            setFilteredData(filtered);
        }
    };

    const handleViewDetails = (requestId) => {
        navigation.navigate('NotificationNavbar', { requestId })
    };

    const renderRequestSubItem = (request, index, isLast) => {
        return (
            <View 
                style={[
                    styles.requestSubItem,
                    !isLast && styles.requestSubItemBorder
                ]} 
                key={request._id}
            >
                <View style={styles.requestLineContainer}>
                    <Text 
                        style={styles.requestType}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                    >
                        {request.requestFor}
                    </Text>
                    {request.details !== "NA" && (
                        <Text 
                            style={styles.requestDetails}
                            numberOfLines={1}
                            ellipsizeMode="tail"
                        >
                            : {request.details}
                        </Text>
                    )}
                </View>
            </View>
        );
    };

    const renderRemainingCount = (remainingCount) => (
        <View style={styles.remainingCountContainer}>
            <Text 
                style={styles.remainingCountText}
            >
                +{remainingCount} more {remainingCount === 1 ? 'request' : 'requests'}
            </Text>
        </View>
    );

    const renderRequestItem = ({ item }) => {
        const { month, day, year } = formatDate(item.date);
        const requests = item.request;
        const hasMoreRequests = requests.length > MAX_VISIBLE_REQUESTS;
        const visibleRequests = requests.slice(0, MAX_VISIBLE_REQUESTS);
        const remainingCount = requests.length - MAX_VISIBLE_REQUESTS;

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
                    <Text style={styles.requeston}>Requests</Text>
                    <View style={styles.requestsList} >
                        {visibleRequests.map((req, index) => 
                            renderRequestSubItem(
                                req, 
                                index,
                                index === visibleRequests.length - 1 && !hasMoreRequests
                            )
                            
                        )}
                        {hasMoreRequests && renderRemainingCount(remainingCount)}
                    </View>
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
        backgroundColor: '#F5F5F5',
        paddingBottom:windowWidth*0.2
    },
    reqView: {
        flexDirection: 'row',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        margin: 7,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    dateBlock: {
        backgroundColor: '#007AFF',
        padding: 10,
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center',
        width: 80,
    },
    monthText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#fff',
    },
    dayText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
    },
    yearText: {
        fontSize: 14,
        color: '#fff',
    },
    reqdet: {
        flex: 1,
        marginLeft: 15,
        justifyContent: 'space-between',
    },
    requeston: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 8,
    },
    requestSubItem: {
        marginBottom: 8,
        paddingLeft: 8,
        paddingVertical: 6,
        borderLeftWidth: 2,
        borderLeftColor: '#007AFF',
    },
    requestSubItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
        marginBottom: 8,
    },
    remainingCountContainer: {
        paddingLeft: 8,
        paddingVertical: 4,
        borderLeftWidth: 2,
        borderLeftColor: '#007AFF',
    },
    remainingCountText: {
        fontSize: 13,
        color: '#007AFF',
        fontWeight: '600',
    },
    requestsList: {
        marginBottom: 8,
        backgroundColor: '#FFFFFF',
    },
    requestType: {
        fontSize: 14,
        fontWeight: '600',
        color: '#007AFF',
        marginBottom: 2,
    },
    requestDetails: {
        fontSize: 12,
        color: '#666',
    },
    reqtime: {
        fontSize: 12,
        color: '#666',
    },
    viewButton2451: {
        backgroundColor: '#007AFF',
        padding: 8,
        borderRadius: 6,
        alignSelf: 'center',
        marginLeft: 10,
    },
    viewDetails: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },
    text45: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },
});

export default ReqList;