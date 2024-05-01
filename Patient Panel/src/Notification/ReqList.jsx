import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontFamily, Color } from '../../GlobalStyles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { backendURL } from "../backendapi";

const ReqList = ({ searchText }) => {
    const route = useRoute();
    const { patientId } = route.params;
    const navigation = useNavigation();
    const [filteredDate, setFilteredDate] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${backendURL}/patientRouter/allrequest/${patientId}`);
                if (response.ok) {
                    const requestData = await response.json();
                    setFilteredDate(requestData);
                    setLoading(false);
                } else {
                    // console.error('Failed to fetch request data');
                    setLoading(false);
                }
            } catch (error) {
                console.error('Error fetching request data:', error);
            }
        };

        fetchData();
    }, [filteredDate]);

    const handleViewDetails = (requestId) => {
        navigation.navigate('NotificationNavbar', {requestId})
    };
    if (loading) {
        return <Text style={styles.text45}>Loading...</Text>;
    }
    
    if (filteredDate.length === 0) {
        return <Text style={styles.text45}>You have made no Request yet!!</Text>;
    }


    const renderRequestItem = ({ item }) => (
        <View style={styles.reqView}>
            <View style={styles.dateBlock}>
                <Text style={styles.dateText}>{item.date}</Text>
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

    return (
        <SafeAreaView style={styles.reqcon}>
            <FlatList
                nestedScrollEnabled
                data={filteredDate}
                renderItem={renderRequestItem}
                keyExtractor={item => item.requestId.toString()} 
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
        backgroundColor: '#35A9EA',
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
        marginLeft: windowWidth * 0.73,
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
        marginLeft: windowWidth * 0.05,
        marginTop: windowWidth * 0.07,
        fontSize: 20,
        fontFamily: FontFamily.font_bold,
    },
    reqdate: {
        marginLeft: windowWidth * 0.05,
        alignItems: 'center',
        color: '#011411',
        fontSize: 14,
        fontFamily: FontFamily.font_bold,
        marginTop: windowWidth * 0.005,
    },
    reqtime: {
        marginLeft: windowWidth * 0.05,
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
})

export default ReqList;
