import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, Modal } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { backendURL } from "../backendapi";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";

const ViewListURL = `${backendURL}/adminRouter/notification`;
const BasicDetailsURL = `${backendURL}/adminRouter/UpdateProfileNameId`;

const Notification = ({}) => {
    const navigation = useNavigation();
    const [patients, setPatients] = useState([]);
    const [filteredPatients, setFilteredPatients] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(ViewListURL);
                const data = await response.json();
                setPatients(data);
                setFilteredPatients(data);
            } catch (error) {
                console.error('Error fetching patient data:', error);
            }
        };

        fetchData();
    }, [patients]);

    const handleViewDetails = (patientId, requestId) => {
        navigation.navigate('NotificationNavbar', { patientId, requestId });
    };
    const handleViewMore = (request) => {
        setSelectedRequest(request);
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const renderPatientItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleViewDetails(item.patientId, item.requestId)}>
            <View style={[styles.patientView, { backgroundColor: item.status === 'Critical' ? '#FFD5D5' : '#EAF9FE' }]}>
                {item.image ? (
                    <Image source={{ uri: item.image }} style={styles.patientImage2451} />
                ) : (
                    <Image source={require('../../assets/images/user2.png')} style={styles.patientImage2451} />
                )}
                <View style={styles.patientDetails13}>
                    <Text style={styles.patientDetails2451}>{item.name} sent you a request</Text>
                    <Text style={styles.patientMessage} numberOfLines={2}>{item.request.length > 25 ? `${item.request.slice(0, 25)}...` : item.request}</Text>
                    {item.request.length > 25 && (
                        <TouchableOpacity onPress={() => handleViewDetails(item.patientId, item.requestId)}>
                            <Text style={styles.viewMore}>View More</Text>
                        </TouchableOpacity>
                    )}
                </View>
                <View style={styles.patientId2451}>
                    <Text style={styles.patientId13}>{item.patientId}</Text>
                </View>
                <View style={styles.appointmentdet13}>
                    <Text style={styles.appointment2451}><Text style={styles.time2451}>{item.date},  {item.time}</Text></Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.patientContainer2451}>
            <View style={styles.header2451}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton13}>
                    <Text><Icon name="angle-left" size={30} color={Color.colorBlack} /></Text>
                </TouchableOpacity>
                <Text style={styles.text2451}>Notifications</Text>
            </View>
            <FlatList
                nestedScrollEnabled
                data={filteredPatients}
                renderItem={renderPatientItem}
                keyExtractor={item => item.requestId}
            />
            {/* <Modal
                visible={selectedRequest !== null}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setSelectedRequest(null)}
            >
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>{selectedRequest}</Text>
                        <TouchableOpacity onPress={() => setSelectedRequest(null)}>
                            <Text style={styles.closeButton}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal> */}
        </SafeAreaView>
    );
};
export default Notification;


const styles = StyleSheet.create({
    patientContainer2451:{
        flex: 1, 
        paddingTop: windowWidth*0.1,
        backgroundColor: '#fff',
        paddingBottom: windowWidth*0.3,
    },
    viewMore:{
        fontWeight: 'bold',
        alignItems: 'center',
        marginLeft:  windowWidth*0.01,
        fontSize: 12,
        fontFamily: FontFamily.font_bold,
        marginTop: windowWidth*0.01,
        // backgroundColor: '#35A9EA',
        width: windowWidth*0.15,
        borderRadius: windowWidth*0.01,
        borderBottomWidth: 1,
        borderBottomColor: '#1D1B88',
        // padding: windowWidth*0.01,
         color:'#1D1B88'

    },
    header2451: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: windowWidth*0.05,
    },
    text2451: {
        fontSize: 25,
        marginLeft: windowWidth*0.13,
        fontFamily: "bold01",
    },
    backButton13: {
        marginLeft: windowWidth*0.03,
        position: 'absolute',
    },
    patientView: {
        width: windowWidth - 15, 
        height: windowWidth * 0.22,
        alignSelf: 'center',
        // marginTop: 7,
        flexDirection: 'row',
        borderRadius: 10,
        borderStyle: 'solid',
        elevation: 3,
        marginBottom: windowWidth*0.02
    },
    patientId2451: {
        width: windowWidth*0.26,
        height: windowWidth*0.07,
        backgroundColor: '#2A9988',
        borderTopLeftRadius: 12,
        borderBottomLeftRadius: 12,
        marginLeft: windowWidth*0.01,
        marginTop: 7,
        alignContent: 'center',
        textAlignVertical: 'center',
        position:'relative'
    },
    viewButton2451: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        width: windowWidth*0.28,
        height: 34,
        borderColor: '#077547',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 5,
        marginTop: 70,
        marginLeft: windowWidth*0.65,
    },
    viewDetails: {
        color: '#077547',
        fontSize: 12,
        alignContent: 'center',
    },
    appointment2451: {
        color: '#666',
        fontSize: 12,
        alignSelf: 'center',
    },
    patientImage2451: {
        marginTop: windowWidth*0.02,
        marginLeft: windowWidth*0.01,
        marginRight: 10,
        width: windowWidth * 0.15, 
        height: windowWidth * 0.10,
        borderRadius: 8,
    },
    patientDetails2451: {
        alignItems: 'center',
        marginLeft: windowWidth*0.01,
        marginTop: windowWidth*0.02,
        fontSize: 12,
        fontFamily: 'bold01',
    },
    patientMessage:{
        fontWeight: 'bold',
        alignItems: 'center',
        marginLeft:  windowWidth*0.01,
        fontSize: 13,
        fontFamily: FontFamily.font_bold,
    },
    patientDetails2450: {
        // marginTop: 55,
        marginLeft: 10,
        alignItems: 'center',
        color: 'grey',
        fontSize: 12,
       fontFamily: FontFamily.font_bold,
    },
    patientDetails2452: {
        // marginTop: 55,
        marginLeft: 10,
        alignItems: 'center',
        color: 'black',
        fontSize: 12,
        fontFamily: 'regular89'
    },
    patientDetails13: {
        display: 'flex',
        flexDirection: 'column',
        width: windowWidth*0.5,
    },
    appointmentdet13: {
        position: 'absolute',
        bottom: windowWidth*0.03,
        left: windowWidth*0.6,
    },
    patientId13: {
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 4,
        marginLeft: 3,
        color: '#fff'
    },
    time2451: {
        color: '#011411',
        alignSelf: 'center',
        fontFamily: 'bold01'
    },
});