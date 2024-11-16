import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, TextInput, TouchableOpacity, Image, Dimensions, ScrollView,Platform,StatusBar } from 'react-native';
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

    // return (
    //     <SafeAreaView style={styles.update2451}>
    //         <View style={styles.upheader2451}>
    //             <TouchableOpacity onPress={handleBack} style={styles.backButton14}>
    //                 <Text><Icon name="angle-left" size={30} color={Color.colorBlack} /></Text>
    //             </TouchableOpacity>
    //             <Text style={styles.text14}>Patient Profile</Text>
    //         </View>
    //         <ScrollView contentContainerStyle={styles.scroll}>
    //             <View style={styles.det14}>
    //                 <Text style={styles.text15}>Name: {details.name}</Text>
    //                 <View style={styles.patientId2451}><Text style={styles.patientId13}>Patient ID: {details.patientId}</Text></View>
    //             </View>
    //             <View style={styles.switchButton}>
    //                 <TouchableOpacity style={{
    //                     width: '50%',
    //                     height: 50,
    //                     backgroundColor: selectedTab == 0 ? '#096759' : '#DBF4F1',
    //                     borderRadius: 10,
    //                     justifyContent: 'center',
    //                     alignItems: 'center',
    //                 }} onPress={() => { setSelectedTab(0); }}>
    //                     <Text style={{
    //                         color: selectedTab == 0 ? '#fff' : '#000',
    //                         fontSize: 18,
    //                         fontWeight: '500',
    //                     }}>Basic Details</Text>
    //                 </TouchableOpacity>
    //                 <TouchableOpacity style={{
    //                     width: '50%',
    //                     height: 50,
    //                     backgroundColor: selectedTab == 1 ? '#096759' : '#DBF4F1',
    //                     borderRadius: 10,
    //                     justifyContent: 'center',
    //                     alignItems: 'center',
    //                 }} onPress={() => { setSelectedTab(1); }}>
    //                     <Text style={{
    //                         color: selectedTab == 1 ? '#fff' : '#000',
    //                         fontSize: 18,
    //                         fontWeight: '500',
    //                     }}>Updated Diseases</Text>
    //                 </TouchableOpacity>
    //             </View>
    const TabButton = ({ isSelected, onPress, title }) => (
        <TouchableOpacity 
            style={[
                styles.tabButton,
                { backgroundColor: isSelected ? '#096759' : '#DBF4F1' }
            ]} 
            onPress={onPress}
        >
            <Text style={[
                styles.tabButtonText,
                { color: isSelected ? '#fff' : '#000' }
            ]}>
                {title}
            </Text>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar 
                barStyle="dark-content"
                backgroundColor="#FFFFFF" 
                translucent={false}
            />
            
            <View style={styles.header}>
                <TouchableOpacity 
                    onPress={handleBack} 
                    style={styles.backButton}
                    hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
                >
                    <Icon name="angle-left" size={30} color={Color.colorBlack} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Patient Profile</Text>
            </View>

            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.patientInfoContainer}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.nameText} numberOfLines={2}>
                            Name: {details.name}
                        </Text>
                    </View>
                    <View style={styles.patientIdContainer}>
                        <Text style={styles.patientIdText} numberOfLines={1}>
                            Patient ID: {details.patientId}
                        </Text>
                    </View>
                </View>

                <View style={styles.tabContainer}>
                    <TabButton 
                        isSelected={selectedTab === 0}
                        onPress={() => setSelectedTab(0)}
                        title="Basic Details"
                    />
                    <TabButton 
                        isSelected={selectedTab === 1}
                        onPress={() => setSelectedTab(1)}
                        title="Updated Diseases"
                    />
                </View>
                {selectedTab == 0 ? patientId && <UpdatedBasicDetails patientId={patientId} /> : <UpdatedDetails patientId={patientId} />}
            </ScrollView>
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
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
        padding: 4,
    },
    headerTitle: {
        fontSize: 22,
        fontFamily: 'regular01',
        fontWeight: 'bold',
        marginLeft: 24,
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: 20,
    },
    patientInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingVertical: 12,
        flexWrap: 'wrap',
        gap: 8,
    },
    nameContainer: {
        flex: 1,
        marginRight: 8,
    },
    nameText: {
        fontSize: 16,
        fontFamily: 'regular01',
        flexWrap: 'wrap',
    },
    patientIdContainer: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        padding: 8,
        justifyContent: 'center',
    },
    patientIdText: {
        fontFamily: 'bold02',
        fontSize: 15,
        textAlign: 'center',
    },
    tabContainer: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginTop: 16,
        borderRadius: 10,
        backgroundColor: '#DBF4F1',
        overflow: 'hidden',
    },
    tabButton: {
        flex: 1,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabButtonText: {
        fontSize: 16,
        fontWeight: '500',
        textAlign: 'center',
        paddingHorizontal: 4,
    },
});

export default PatientNavigation;