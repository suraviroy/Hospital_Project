import React, { useState, useEffect} from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView,Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import NotificationDetails from './NotificationDetails';
import NotiRequests from './NotiRequests';
import Actions from './Actions'; 
import { backendURL } from "../backendapi";
const windowWidth = Dimensions.get('window').width;

const NotificationNavbar = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { patientId, requestId } = route.params;
    const [selectedTab, setSelectedTab] = useState(0);
    const [basicDetails, setBasicDetails] = useState({});
    
    const handleBack = () => {
        navigation.goBack();
    };
    
    useEffect(() => {
        fetch(`${backendURL}/adminRouter/PatientBasicDetails/${patientId}`)
            .then(response => response.json())
            .then(data => {
                setBasicDetails(data[0]);
            })
            .catch(error => {
                console.error('Error fetching patient basic details:', error);
            });
    }, [patientId]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={handleBack} 
                    style={styles.backButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Icon name="angle-left" size={30} color="#000" />
                </TouchableOpacity>
                <Text style={styles.title} numberOfLines={1}>Patient Profile</Text>
            </View>
            <ScrollView contentContainerStyle={styles.scroll}>
                <View style={styles.patientInfoContainer}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameText} numberOfLines={2}>
                            Name: {basicDetails.name}
                        </Text>
                    </View>
                    <View style={styles.idContainer}>
                        <Text style={styles.idText} numberOfLines={1}>
                            ID: {basicDetails.patientId}
                        </Text>
                    </View>
                </View>
                
                <View style={styles.tabContainer}>
                    {['Patient Details', 'Requests', 'Actions'].map((tab, index) => (
                        <TouchableOpacity 
                            key={index}
                            style={[
                                styles.tabButton,
                                selectedTab === index && styles.selectedTab
                            ]}
                            onPress={() => setSelectedTab(index)}
                        >
                            <Text style={[
                                styles.tabButtonText,
                                selectedTab === index && styles.selectedTabText
                            ]}>
                                {tab}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>

                {selectedTab === 0 && <NotificationDetails patientId={patientId} />}
                {selectedTab === 1 && <NotiRequests requestId={requestId} />}
                {selectedTab === 2 && <Actions requestId={requestId} />}
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'ios' ? 0 : windowWidth * 0.1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    backButton: {
        padding: 8,
    },
    title: {
        flex: 1,
        fontSize: 25,
        fontWeight: 'bold',
        marginLeft: 16,
    },
    scroll: {
        flexGrow: 1,
    },
    patientInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexWrap: 'wrap',
    },
    nameContainer: {
        flex: 1,
        marginRight: 16,
    },
    nameText: {
        fontSize: 16,
        fontFamily: 'regular01',
        flexWrap: 'wrap',
    },
    idContainer: {
        backgroundColor: '#85DBCD',
        borderTopLeftRadius: 15,
        borderBottomLeftRadius: 15,
        paddingVertical: 8,
        paddingHorizontal: 16,
        minWidth: 100,
        maxWidth: '40%',
    },
    idText: {
        fontFamily: 'bold02',
        fontWeight: '800',
        fontSize: 15,
        textAlign: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 16,
        gap: 8,
    },
    tabButton: {
        flex: 1,
        backgroundColor: '#DBF4F1',
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedTab: {
        backgroundColor: '#096759',
    },
    tabButtonText: {
        fontSize: 14,
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: 4,
    },
    selectedTabText: {
        color: '#fff',
    },
});

export default NotificationNavbar;