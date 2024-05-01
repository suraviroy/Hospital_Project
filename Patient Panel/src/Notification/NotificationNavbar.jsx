import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NotiReq from './NotiReq';
import { backendURL } from "../backendapi";
import ActionOk from './ActionOK';
import ActionError from './ActionError';

const windowWidth = Dimensions.get('window').width;

const NotificationNavbar = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { requestId } = route.params;
    const [selectedTab, setSelectedTab] = useState(0);
    const [action, setAction] = useState(null);

    useEffect(() => {
        fetch(`${backendURL}/patientRouter/request/${requestId}`)
            .then(response => response.json())
            .then(data => {
                const { action } = data[0];
                setAction(action);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleBack = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton}>
                    <Icon name="angle-left" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title}>Request Details</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.switchButtons}>
                    <TouchableOpacity style={[styles.tabButton, selectedTab === 0 && styles.selectedTab]} onPress={() => setSelectedTab(0)}>
                        <Text style={styles.tabButtonText}>Requests</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.tabButton, selectedTab === 1 && styles.selectedTab]} onPress={() => setSelectedTab(1)}>
                        <Text style={styles.tabButtonText}>Actions</Text>
                    </TouchableOpacity>
                </View>
                {selectedTab === 0 && <NotiReq requestId={requestId} />}
                {selectedTab === 1 && (
                    action !== null && action !== 'NA' ? (
                        <ActionOk navigation={navigation} action={action} />
                    ) : (
                        <ActionError navigation={navigation} />
                    )
                )}
            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: windowWidth * 0.1,
        backgroundColor: '#fff'
    },
    text15: {
        fontSize: 16,
        marginLeft: windowWidth*0.03,
        fontFamily: 'regular01',
        marginTop: windowWidth*0.05,
        width: windowWidth*0.5
    },
    patientId2451: {
        width: windowWidth*0.36,
        height: windowWidth*0.08,
        backgroundColor: '#85DBCD',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        right: -windowWidth*0.1,
        marginTop: windowWidth*0.05,

    },
    patientId13: {
        alignSelf: 'center',
        marginTop: 4,
        marginLeft: windowWidth*0.025,
        fontFamily: 'bold02',
        fontWeight: '800',
        fontSize: 15,
    },
    det14: {
        display: 'flex',
        flexDirection: 'row',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: windowWidth * 0.02,
    },
    backButton: {
        marginRight: 10,
        marginLeft: windowWidth*0.05,

    },
    title: {
        fontWeight: "bold",
        fontSize: 25,
        marginLeft: windowWidth*0.03
    },
    details: {
        marginLeft: windowWidth * 0.03,
    },
    text: {
        fontSize: 16,
        marginBottom: 5,
    },
    switchButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 20,
        marginHorizontal: windowWidth * 0.03,
    },
    tabButton: {
        width: '48%',
        height: 50,
        backgroundColor: '#CFEDFE',
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectedTab: {
        backgroundColor: '#35A9EA',
    
    },
    tabButtonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: '500',
    },
    scroll: {
        paddingBottom: 10,
    },
});

export default NotificationNavbar;
