import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity, Image, Dimensions, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const windowWidth = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontFamily, Color, Border, FontSize } from "../../../GlobalStyles";
import UpdatedBasicDetails from './UpdatedBasicDetails';
import UpdatedDetails from './UpdatedDetails';


const PatientNavigation = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { details } = route.params;

    const handleBack = () => {
        navigation.goBack();
    };

    const [selectedTab, setSelectedTab] = useState(0);
    const [patientId, setPatientId] = useState(null);

    useEffect(() => {
        if (details && details.patientId) {
            setPatientId(details.patientId);
        }
    }, [details]);

    return (
        <SafeAreaView style={styles.update2451}>
            <View style={styles.upheader2451}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton14}>
                    <Text><Icon name="angle-left" size={30} color={Color.colorBlack} /></Text>
                </TouchableOpacity>
                <Text style={styles.text14}>Update Profile</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.det14}>
                    <Text style={styles.text15}>Name: {details.name}</Text>
                    <View style={styles.patientId2451}><Text style={styles.patientId13}>ID: {details.patientId}</Text></View>
                </View>
                <View style={styles.switchButton}>
                    <TouchableOpacity style={{
                        width: '50%',
                        height: 50,
                        backgroundColor: selectedTab == 0 ? '#2A9988' : '#DBF4F1',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} onPress={() => { setSelectedTab(0); }}>
                        <Text style={{
                            color: selectedTab == 0 ? '#fff' : '#000',
                            fontSize: 18,
                            fontWeight: '500',
                        }}>Basic Details</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{
                        width: '50%',
                        height: 50,
                        backgroundColor: selectedTab == 1 ? '#2A9988' : '#DBF4F1',
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                    }} onPress={() => { setSelectedTab(1); }}>
                        <Text style={{
                            color: selectedTab == 1 ? '#fff' : '#000',
                            fontSize: 18,
                            fontWeight: '500',
                        }}>Updated Diseases</Text>
                    </TouchableOpacity>
                </View>
                {selectedTab == 0 ? patientId && <UpdatedBasicDetails patientId={patientId} /> : <UpdatedDetails patientId={patientId} />}
            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    update2451: {
        marginTop: windowWidth*0.10,
        flex:1,
        width: '100%',
        alignSelf: 'center',
    },
    upheader2451: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginHorizontal: windowWidth*0.025,
        marginBottom: windowWidth*0.02
    },
    backButton14: {
        marginRight: 10,
        position: 'absolute',
        left: 0,
    },
    text14: {
        fontWeight: "bold",
        fontSize: 25,
        marginLeft: 30,
        fontFamily: 'regular01',
    },
    text15: {
        fontSize: 16,
        marginLeft: windowWidth*0.03,
        fontFamily: 'regular01',
        marginTop: windowWidth*0.1,
        width: windowWidth*0.5
    },
    patientId2451: {
        width: windowWidth*0.36,
        height: windowWidth*0.08,
        backgroundColor: '#85DBCD',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        right: -windowWidth*0.1,
        marginTop: windowWidth*0.09,

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
    switchButton: {
        width: windowWidth*0.96,
        height: 50,
        alignSelf: 'center',
        borderRadius: 10,
        backgroundColor: '#DBF4F1',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    }, 
    scroll: {
        flexGrow: 1,
        paddingBottom: 10,
    }
});

export default PatientNavigation;