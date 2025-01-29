import React, { useState, useEffect, useCallback } from 'react';
import { 
    View, 
    StatusBar, 
    Text, 
    StyleSheet, 
    TouchableOpacity, 
    Image, 
    TextInput, 
    Dimensions, 
    ScrollView, 
    Platform, 
    SafeAreaView, 
    AppState,
    Alert,
    ActivityIndicator 
} from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backendURL } from "../backendapi";
import { FontFamily, Color } from '../../GlobalStyles';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const scale = screenWidth / 375;
const normalize = (size) => Math.round(scale * size);

const POLLING_INTERVAL = 10000;

const Home = () => {
    const navigation = useNavigation();
    const [patientData, setPatientData] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);
    const [notificationCount, setNotificationCount] = useState(0);
    const [appState, setAppState] = useState(AppState.currentState);
    const [isLoading, setIsLoading] = useState(true);

    const fetchNotificationCount = async (patientId) => {
        try {
            const response = await fetch(`${backendURL}/patientRouter/countNotification/${patientId}`);
            const data = await response.json();
            setNotificationCount(data.count);
        } catch (error) {
            console.error('Error fetching notification count:', error);
        }
    };

    useEffect(() => {
        let pollingInterval;
        
        const startPolling = async () => {
            const storedPatientId = await AsyncStorage.getItem('patientId');
            if (storedPatientId) {
                fetchNotificationCount(storedPatientId);
                pollingInterval = setInterval(() => {
                    fetchNotificationCount(storedPatientId);
                }, POLLING_INTERVAL);
            }
        };

        startPolling();
        return () => {
            if (pollingInterval) {
                clearInterval(pollingInterval);
            }
        };
    }, []);

    useEffect(() => {
        const subscription = AppState.addEventListener('change', async (nextAppState) => {
            if (appState.match(/inactive|background/) && nextAppState === 'active') {
                const storedPatientId = await AsyncStorage.getItem('patientId');
                if (storedPatientId) {
                    fetchNotificationCount(storedPatientId);
                }
            }
            setAppState(nextAppState);
        });

        return () => {
            subscription.remove();
        };
    }, [appState]);

    useFocusEffect(
        useCallback(() => {
            const refreshData = async () => {
                const storedPatientId = await AsyncStorage.getItem('patientId');
                if (storedPatientId) {
                    fetchNotificationCount(storedPatientId);
                }
            };

            refreshData();
        }, [])
    );

    const fetchPatientData = async (patientId) => {
        try {
            setIsLoading(true);
            const response = await fetch(`${backendURL}/patientRouter/HomePageDetails/${patientId}`);
            const data = await response.json();
            setPatientData(data[0]);
        } catch (error) {
            console.error('Error fetching patient basic details:', error);
        } finally {
            setTimeout(() => {
                setIsLoading(false);
            }, 1000); // Add a minimum loading time of 1 second for better UX
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedPatientId = await AsyncStorage.getItem('patientId');
                if (storedPatientId) {
                    fetchPatientData(storedPatientId);
                }
            } catch (error) {
                console.error('Error fetching patientId from storage:', error);
            }
        };
        fetchData();
    }, []);

    const markNotificationsAsSeen = async () => {
        try {
            const storedPatientId = await AsyncStorage.getItem('patientId');
            const response = await fetch(`${backendURL}/patientRouter/seenNotification/${storedPatientId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) {
                setNotificationCount(0);
            }
        } catch (error) {
            console.error('Error marking notifications as seen:', error);
        }
    };

    const handleNotification = () => {
        markNotificationsAsSeen();
        navigation.navigate('NotiList');
    };
    const handleSend = async =>{
        Alert.alert(
          "Sorry",
          "This functionality is not available right now."
        )
      }
    
    const handleViewDetails = () => {
        navigation.navigate('Request');
    };
    const handleUploadReport = () => {
        navigation.navigate('UploadReport');
    };

    const handleViewAll = () => {
        navigation.navigate('Reports');
    };

    const handleNextSlide = () => {
        setCurrentIndex((currentIndex + 1) % 3);
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <View style={styles.blurOverlay}>
                    <ActivityIndicator size="large" color="#357EEA" />
                    <Text style={styles.loadingText}>Loading...</Text>
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar 
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
                backgroundColor="#FFFFFF" 
                translucent={false}
            />
            <ScrollView 
                style={styles.container} 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.scrollContent}
            >
                <View style={styles.mainContent}>
                    <View style={styles.topContainer}>
                        <View style={styles.header}>
                            {patientData.image ? (
                                <Image source={{ uri: patientData.image }} style={styles.profileImage} />
                            ) : (
                                <Image source={require('../../assets/images/user2.png')} style={styles.profileImage} />
                            )}
                            <View style={styles.profileText}>
                                <Text style={styles.boldText}>{patientData.name}</Text>
                                <Text style={styles.greyText}>How can I help you today?</Text>
                            </View>
                            <View style={styles.notificationContainer}>
                                <TouchableOpacity onPress={handleNotification}>
                                    <Ionicons name="notifications-outline" size={normalize(30)} color="black" />
                                    {notificationCount > 0 && (
                                        <View style={styles.notificationBadge}>
                                            <Text style={styles.notificationCount}>
                                                {notificationCount > 99 ? '99+' : notificationCount}
                                            </Text>
                                        </View>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.searchBar}>
                            <Ionicons name="search" size={normalize(20)} color="gray" />
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search by Speciality"
                                placeholderTextColor="#aaa"
                            />
                        </View>
                    </View>

                    <View style={styles.sliderContainer}>
                        <TouchableOpacity onPress={handleNextSlide} style={styles.imageSlider}>
                            {currentIndex === 0 && (
                                <Image source={require('../../assets/images/back.jpg')} style={styles.sliderImage} />
                            )}
                            {currentIndex === 1 && (
                                <Image source={require('../../assets/images/back.jpg')} style={styles.sliderImage} />
                            )}
                            {currentIndex === 2 && (
                                <Image source={require('../../assets/images/back.jpg')} style={styles.sliderImage} />
                            )}
                            <View style={styles.sliderDots}>
                                {[0, 1, 2].map((index) => (
                                    <View
                                        key={index}
                                        style={[
                                            styles.dot,
                                            index === currentIndex && { backgroundColor: '#357EEA' },
                                        ]}
                                    />
                                ))}
                            </View>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.sectionTitle}>Our Services</Text>

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.button, styles.buttonShadow]} onPress={handleSend}>
                            <MaterialIcons name="assignment-add" size={normalize(30)} color="#357EEA" />
                            <Text style={styles.buttonText}>Book Appointment</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonShadow]} onPress={handleViewDetails}>
                            <FontAwesome5 name="hands-helping" size={normalize(30)} color="#357EEA" />
                            <Text style={styles.buttonText}>Contact/Help</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.button, styles.buttonShadow]} onPress={handleUploadReport}>
                            <MaterialCommunityIcons name="file-upload" size={normalize(30)} color="#357EEA" />
                            <Text style={styles.buttonText}>Upload</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.footer}>
                        <Text style={styles.footerTitle}>Last Appointment</Text>
                        <Text style={styles.viewAll} onPress={handleViewAll}>View All</Text>
                    </View>

                    <View style={styles.appointView}>
                        <View style={styles.appointmentContent}>
                            <Image
                                source={
                                    patientData.consultingDoctor === "Dr. Parthasarathi Bhattacharyya"
                                        ? { uri: 'https://res.cloudinary.com/tiasha/image/upload/doc_kb8oan.jpg' }
                                        : { uri: 'https://res.cloudinary.com/tiasha/image/upload/user_hx7cgx.png' }
                                }
                                style={styles.docImage}
                            />
                            <View style={styles.docInfoWrapper}>
                                <Text style={styles.docname}>{patientData.consultingDoctor}</Text>
                                <View style={styles.docInfoContainer}>
                                    <Text style={styles.docdesg}>{patientData.degree}</Text>
                                </View>
                                <Text style={styles.docexp}>{patientData.medicine}</Text>
                            </View>
                        </View>
                        <View style={styles.appdate}>
                            <Text style={styles.apptext}>
                                Appointment On: <Text style={styles.datime}>{patientData.date}, {patientData.time}</Text>
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
            {isLoading && (
                <View style={[StyleSheet.absoluteFill, styles.loadingOverlay]}>
                    <View style={styles.blurOverlay}>
                        <ActivityIndicator size="large" color="#357EEA" />
                        <Text style={styles.loadingText}>Loading...</Text>
                    </View>
                </View>
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingBottom: normalize(45),
    },
    mainContent: {
        flex: 1,
        padding: normalize(16),
    },
    loadingContainer: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingOverlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    blurOverlay: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: normalize(20),
        borderRadius: normalize(10),
        alignItems: 'center',
        ...Platform.select({
            ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
            },
            android: {
                elevation: 5,
            },
        }),
    },
    loadingText: {
        marginTop: normalize(10),
        fontSize: normalize(16),
        color: '#357EEA',
        fontWeight: '600',
    },
    topContainer: {
        marginTop: Platform.OS === 'android' ? normalize(20) : 0,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: normalize(16),
    },
    profileImage: {
        width: normalize(40),
        height: normalize(40),
        borderRadius: normalize(20),
        marginRight: normalize(8),
    },
    profileText: {
        flex: 1,
    },
    boldText: {
        fontSize: normalize(16),
        fontWeight: 'bold',
    },
    greyText: {
        fontSize: normalize(14),
        color: 'gray',
    },
    notificationContainer: {
        position: 'relative',
        padding: normalize(4),
    },
    notificationBadge: {
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: '#FF3B30',
        borderRadius: normalize(10),
        minWidth: normalize(20),
        height: normalize(20),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: normalize(4),
    },
    notificationCount: {
        color: '#FFFFFF',
        fontSize: normalize(12),
        fontWeight: 'bold',
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#357EEA',
        borderRadius: normalize(8),
        paddingHorizontal: normalize(8),
        height: normalize(38),
        marginBottom: normalize(16),
    },
    searchInput: {
        flex: 1,
        marginLeft: normalize(8),
        color: '#333',
        fontSize: normalize(14),
        height: normalize(38),
    },
    sliderContainer: {
        marginVertical: normalize(8),
    },
    imageSlider: {
        height: screenWidth * 0.45,
        backgroundColor: '#f0f0f0',
        borderRadius: normalize(10),
        overflow: 'hidden',
    },
    sliderImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
    sliderDots: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: normalize(16),
        alignSelf: 'center',
    },
    dot: {
        width: normalize(8),
        height: normalize(8),
        borderRadius: normalize(4),
        backgroundColor: '#ccc',
        marginHorizontal: normalize(4),
    },
    sectionTitle: {
        fontSize: normalize(18),
        fontWeight: 'bold',
        marginVertical: normalize(12),
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: normalize(16),
    },
    button: {
        width: '30%',
        aspectRatio: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: normalize(10),
        padding: normalize(6),
        backgroundColor: '#F5F5F5',
        borderWidth: 1,
        borderColor: '#EBEBEB',
    },
    buttonShadow: {
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(0, 0, 0, 0.25)',
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
            },
            android: {
                elevation: 4,
            },
        }),
    },
    buttonImage: {
        width: '70%',
        height: '60%',
        resizeMode: 'contain',
    },
    buttonText: {
        fontSize: normalize(11),
        marginTop: normalize(6),
        textAlign: 'center',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: normalize(12),
    },
    footerTitle: {
        fontSize: normalize(16),
        fontWeight: 'bold',
    },
    viewAll: {
        fontSize: normalize(14),
        color: '#357EEA',
        textDecorationLine: 'underline',
    },
    appointView: {
        backgroundColor: '#fff',
        borderRadius: normalize(2),
        borderWidth: 1,
        borderColor: '#357EEA',
        elevation: 5,
        marginBottom: normalize(16),
        overflow: 'hidden',
    },
    appointmentContent: {
        padding: normalize(12),
        flexDirection: 'row',
    },
    docImage: {
        width: screenWidth * 0.18,
        height: screenWidth * 0.22,
        borderRadius: normalize(2),
    },
    docInfoWrapper: {
        flex: 1,
        marginLeft: normalize(12),
    },
    docInfoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: normalize(4),
        flexWrap: 'wrap',
    },
    docname: {
        fontSize: normalize(14),
        fontWeight: 'bold',
        fontFamily: FontFamily.font_bold,
        marginBottom: normalize(4),
    },
    docdesg: {
        fontSize: normalize(12),
        color: '#011411',
        fontFamily: FontFamily.font_bold,
    },
    docexp: {
        fontSize: normalize(12),
        color: '#357EEA',
        fontFamily: FontFamily.font_bold,
        marginTop:normalize(2),
    },
    doclang: {
        fontSize: normalize(12),
        color: Color.colorGray_100,
        fontFamily: 'bold01',
        marginTop: normalize(4),
    },
    viewButton2451: {
        borderColor: '#357EEA',
        borderWidth: 2,
        borderRadius: normalize(5),
        padding: normalize(8),
        alignSelf: 'flex-start',
    },
    viewDetails: {
        color: '#357EEA',
        fontSize: normalize(12),
    },
    appdate: {
        borderTopWidth: 1,
        borderTopColor: '#D1D1D6',
        padding: normalize(8),
    },
    apptext: {
        fontSize: normalize(13),
        color: '#666',
    },
    datime: {
        color: '#011411',
        fontFamily: 'bold01',
    },
});

export default Home;