import React, { useState, useEffect, useRef } from 'react';
import { View, StatusBar,Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, ActivityIndicator, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backendURL } from "../backendapi";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";

const windowWidth = Dimensions.get('window').width;
const ITEMS_PER_LOAD = 5;

const NotiList = () => {
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState([]);
    const [patientId, setPatientId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [allData, setAllData] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const staticImageUrl = "https://res.cloudinary.com/tiasha/image/upload/logo2-1_dusm95.jpg";
    const timeoutRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedPatientId = await AsyncStorage.getItem('patientId');
                if (storedPatientId) {
                    setPatientId(storedPatientId);
                    await fetchAllNotifications(storedPatientId);
                }
            } catch (error) {
                console.error('Error fetching patientId from storage:', error);
            }
        };
        fetchData();
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);
    const handleBack = () => {
        navigation.goBack();
    };
    const fetchAllNotifications = async (id) => {
        try {
            const response = await fetch(`${backendURL}/patientRouter/requestNotification/${id}`);
            const data = await response.json();
            const enhancedData = data.map(notification => ({
                ...notification,
                image: staticImageUrl
            }));
            setAllData(enhancedData);
            setLoading(false);
            loadMoreItems(enhancedData);
        } catch (error) {
            console.error('Error fetching notification data:', error);
            setLoading(false);
        }
    };

    const loadMoreItems = (dataSource = allData) => {
        if (loadingMore || currentIndex >= dataSource.length) return;

        setLoadingMore(true);
        const nextItems = dataSource.slice(currentIndex, currentIndex + ITEMS_PER_LOAD);
        timeoutRef.current = setTimeout(() => {
            setNotifications(prev => [...prev, ...nextItems]);
            setCurrentIndex(prev => prev + ITEMS_PER_LOAD);
            setLoadingMore(false);
        }, 500);
    };

    useEffect(() => {
        if (patientId) {
            const intervalId = setInterval(async () => {
                const response = await fetch(`${backendURL}/patientRouter/requestNotification/${patientId}`);
                const data = await response.json();
                const enhancedData = data.map(notification => ({
                    ...notification,
                    image: staticImageUrl
                }));
                
                if (JSON.stringify(enhancedData) !== JSON.stringify(allData)) {
                    setAllData(enhancedData);
                    const newNotifications = enhancedData.slice(0, currentIndex);
                    setNotifications(newNotifications);
                }
            }, 3000);
            return () => clearInterval(intervalId);
        }
    }, [patientId, currentIndex, allData]);

    const handleViewDetails = (requestId) => {
        navigation.navigate('NotificationNavbar', { patientId, requestId });
    };

    const renderNotificationItem = ({ item, index }) => (
        <TouchableOpacity 
            onPress={() => handleViewDetails(item.requestId)}
            activeOpacity={0.7}
            style={styles.notificationContainer}
        >
            <View style={styles.notificationView}>
                <Image 
                    source={{ uri: item.image }}
                    style={styles.notificationImage}
                    defaultSource={require('../../assets/images/user2.png')}
                />
                <View style={styles.notificationDetails}>
                    <Text style={styles.notificationTitle}>New Action</Text>
                    <Text style={styles.notificationMessage} numberOfLines={2}>
                       Request: {item.request}
                    </Text>
                    <Text style={styles.actionText}>
                        Action: {item.action}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );

    const renderFooter = () => {
        if (!loadingMore || currentIndex >= allData.length) return null;
        return (
            <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color="#3982BD" />
                <Text style={styles.loadingMoreText}>Loading more...</Text>
            </View>
        );
    };

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#3982BD" />
                <Text style={styles.loadingText}>Loading notifications...</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
             <StatusBar 
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
            backgroundColor="#FFFFFF" 
            translucent={false}
        />
            <View style={styles.header}>
            <TouchableOpacity onPress={handleBack} style={styles.backButton13}>
                    <Text><Icon name="angle-left" size={25} color={Color.colorWhite} /></Text>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifications</Text>
            </View>
            {notifications.length === 0 ? (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No notifications to show!</Text>
                </View>
            ) : (
                <FlatList
                    data={notifications}
                    renderItem={renderNotificationItem}
                    keyExtractor={item => item.requestId.toString()}
                    onEndReached={() => loadMoreItems()}
                    onEndReachedThreshold={0.5}
                    ListFooterComponent={renderFooter}
                    contentContainerStyle={styles.listContainer}
                    showsVerticalScrollIndicator={false}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
    },
    header: {
        padding: Platform.OS === 'ios' ? 16 : 12,
        backgroundColor: '#3982BD',
        flexDirection:'row',
        elevation: Platform.OS === 'android' ? 4 : 0,
        shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
        shadowOffset: Platform.OS === 'ios' ? { width: 0, height: 2 } : undefined,
        shadowOpacity: Platform.OS === 'ios' ? 0.25 : undefined,
        shadowRadius: Platform.OS === 'ios' ? 3.84 : undefined,
    },
    headerTitle: {
        fontSize: Platform.OS === 'ios' ? 20 : 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    notificationContainer: {
        width: '100%',
        paddingHorizontal: windowWidth * 0.04,
        marginVertical: 6,
    },
    notificationView: {
        flexDirection: 'row',
        padding: Platform.OS === 'ios' ? 16 : 12,
        backgroundColor: '#ECF4F7',
        borderRadius: 8,
        elevation: Platform.OS === 'android' ? 3 : 0,
        shadowColor: '#000',
        shadowOffset: { 
            width: 0, 
            height: Platform.OS === 'ios' ? 2 : 1 
        },
        shadowOpacity: Platform.OS === 'ios' ? 0.1 : 0.2,
        shadowRadius: Platform.OS === 'ios' ? 4 : 2,
    },
    notificationImage: {
        width: windowWidth * 0.12,
        height: windowWidth * 0.12,
        borderRadius: (windowWidth * 0.12) / 2,
        marginRight: windowWidth * 0.03,
    },
    notificationDetails: {
        flex: 1,
        justifyContent: 'center',
    },
    notificationTitle: {
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        fontWeight: 'bold',
        color: '#333333',
        marginBottom: 4,
    },
    notificationMessage: {
        fontSize: Platform.OS === 'ios' ? 14 : 13,
        color: '#666666',
        fontWeight:'500',
        marginBottom: 4,
        lineHeight: Platform.OS === 'ios' ? 20 : 18,
    },
    backButton13: {
        marginLeft: windowWidth*0.03,
        marginRight:windowWidth*0.15,
    },
    actionText: {
        fontSize: Platform.OS === 'ios' ? 14 : 13,
        color: '#00305A',
        fontWeight: 'bold',
        marginBottom: 4,
    },
    footerLoader: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 16,
    },
    loadingMoreText: {
        marginLeft: 8,
        fontSize: Platform.OS === 'ios' ? 14 : 12,
        color: '#666666',
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 16,
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        color: '#666666',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyText: {
        fontSize: Platform.OS === 'ios' ? 16 : 14,
        color: '#666666',
        fontWeight:'600'
    },
    listContainer: {
        paddingVertical: 8,
    },
});

export default NotiList;