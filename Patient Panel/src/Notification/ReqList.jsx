import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontFamily, Color } from '../../GlobalStyles';

const reqdata = [
    {
        reqdate: '15',
        reqmon: 'October',
        reqyear: '2024',
        reqtime: '2.00pm',
        id: 1
    },
    {
        reqdate: '25',
        reqmon: 'November',
        reqyear: '2024',
        reqtime: '3.30pm',
        id: 2
    },
    {
        reqdate: '08',
        reqmon: 'August',
        reqyear: '2024',
        reqtime: '2.20pm',
        id: 3
    },
    {
        reqdate: '20',
        reqmon: 'May',
        reqyear: '2024',
        reqtime: '4.00pm',
        id: 4
    },
    {
        reqdate: '23',
        reqmon: 'July',
        reqyear: '2024',
        reqtime: '6.30pm',
        id: 5
    },
];

const ReqList = ({ searchText }) => {
    const navigation = useNavigation();
    const [filteredDate, setFilteredDate] = useState([]);


    const handleViewDetails = (id) => {
        navigation.navigate('#');
    };

    useEffect(() => {
        if (!searchText) {
            setFilteredDate(reqdata);
            return;
        }

        const filtered = reqdata.filter(doctor =>
            doctor.reqdate.toLowerCase().includes(searchText.toLowerCase()) ||
            doctor.reqmon.toLowerCase().includes(searchText.toLowerCase())
        );
        setFilteredDate(filtered);
    }, [searchText, reqdata]);

    const renderDoctorItem = ({ item }) => (
        <View style={styles.reqView}>
            <View style={styles.dateBlock}>
                <Text style={styles.dateText}>{item.reqdate}</Text>
                <Text style={styles.monText}>{item.reqmon}</Text>
            </View>
            <View style={styles.reqdet}>
                <Text style={styles.requeston}>Request on</Text>
                <Text style={styles.reqdate}>Date: {item.reqdate} {item.reqmon} {item.reqyear}</Text>
                <Text style={styles.reqtime}>Time: {item.reqtime}</Text>
            </View>
            <TouchableOpacity
                style={styles.viewButton2451}
                onPress={() => handleViewDetails()}
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
                renderItem={renderDoctorItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    reqcon: {
        flex: 1,
        marginBottom: 85,
        paddingTop: -windowWidth * 0.14,
    },
    reqView: {
        width: windowWidth * 0.97,
        height: windowWidth * 0.35,
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 10,
        // borderWidth: 1,
        // borderStyle: 'solid',
        elevation: 5,
    },
    dateBlock: {
        // marginTop: windowWidth * 0.02,
        marginLeft: windowWidth * 0.02,
        // marginRight: 10,
        width: windowWidth * 0.23,
        height: windowWidth * 0.25,
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
        // width: windowWidth * 0.28
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
        fontSize: 45,
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