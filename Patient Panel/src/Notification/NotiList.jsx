import React, { useState, useEffect, useRef } from 'react';
import { View, StatusBar, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, ActivityIndicator, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backendURL } from "../backendapi";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";

const windowWidth = Dimensions.get('window').width;
const ITEMS_PER_PAGE = 5;
const MAX_VISIBLE_REQUESTS = 1;

const NotiList = () => {
    const navigation = useNavigation();
    const [notifications, setNotifications] = useState([]);
    const [patientId, setPatientId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const staticImageUrl = "https://res.cloudinary.com/tiasha/image/upload/logo2-1_dusm95.jpg";
    const timeoutRef = useRef(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedPatientId = await AsyncStorage.getItem('patientId');
                if (storedPatientId) {
                    setPatientId(storedPatientId);
                    await fetchNotifications(storedPatientId, 1);
                }
            } catch (error) {
                console.error('Error fetching patientId from storage:', error);
                setLoading(false);
            }
        };
        fetchData();

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const fetchNotifications = async (id, page) => {
        try {
            setLoading(page === 1);
            setRefreshing(page !== 1);

            const response = await fetch(`${backendURL}/patientRouter/requestNotification/${id}?page=${page}&limit=${ITEMS_PER_PAGE}`);
            const data = await response.json();

            const enhancedData = data.requests.map(notification => ({
                ...notification,
                image: staticImageUrl
            }));

            setNotifications(prev => 
                page === 1 
                    ? enhancedData 
                    : [...prev, ...enhancedData]
            );

            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
            setLoading(false);
            setRefreshing(false);
        } catch (error) {
            console.error('Error fetching notification data:', error);
            setLoading(false);
            setRefreshing(false);
        }
    };

    const renderRequestItem = (request, index, isLast, requestId) => (
        <View 
            key={`${requestId}-request-${index}`}
            style={[
                styles.requestItem,
                !isLast && styles.requestItemBorder
            ]}
        >
            <Text style={styles.requestFor} numberOfLines={1}
                        ellipsizeMode="tail">
                {request.requestFor}
                
            </Text>
            {request.details !== "NA" && (
                <Text style={styles.requestDetails} numberOfLines={1}
                ellipsizeMode="tail">
                    {request.details}
                </Text>
            )}
        </View>
    );

    const renderRemainingRequestsCount = (totalRequests, requestId) => {
        const remaining = totalRequests - MAX_VISIBLE_REQUESTS;
        return (
            <View 
                key={`${requestId}-remaining-count`}
                style={styles.remainingCountContainer}
            >
                <Text style={styles.remainingCountText}>
                    +{remaining} more {remaining === 1 ? 'request' : 'requests'}
                </Text>
            </View>
        );
    };

    const renderNotificationItem = ({ item }) => {
        const requests = Array.isArray(item.request) ? item.request : [{ requestFor: item.request, details: "NA" }];
        const hasMoreRequests = requests.length > MAX_VISIBLE_REQUESTS;
        const visibleRequests = requests.slice(0, MAX_VISIBLE_REQUESTS);

        return (
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
                        <View style={styles.requestsContainer} numberOfLines={1}>
                            {visibleRequests.map((req, index) => 
                                renderRequestItem(
                                    req, 
                                    index,
                                    index === visibleRequests.length - 1 && !hasMoreRequests,
                                    item.requestId
                                )
                            )}
                            {hasMoreRequests && renderRemainingRequestsCount(requests.length, item.requestId)}
                        </View>
                        <Text style={styles.actionText} numberOfLines={2}>
                            Action: {item.action}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    };

    const handleBack = () => {
        navigation.goBack();
    };

    const loadMoreNotifications = () => {
        if (patientId && currentPage < totalPages) {
            fetchNotifications(patientId, currentPage + 1);
        }
    };

    const handleViewDetails = (requestId) => {
        navigation.navigate('NotificationNavbar', { patientId, requestId });
    };

    const renderFooter = () => {
        if (!refreshing) return null;
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
                    onEndReached={loadMoreNotifications}
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
        paddingBottom:windowWidth*0.2
    },
    header: {
        padding: Platform.OS === 'ios' ? 16 : 12,
        backgroundColor: '#3982BD',
        flexDirection: 'row',
        elevation: Platform.OS === 'android' ? 4 : 0,
        shadowColor: Platform.OS === 'ios' ? '#000' : undefined,
        shadowOffset: Platform.OS === 'ios' ? { width: 0, height: 2 } : undefined,
        shadowOpacity: Platform.OS === 'ios' ? 0.25 : undefined,
        shadowRadius: Platform.OS === 'ios' ? 3.84 : undefined,
    },
    notificationContainer: {
        width: '100%',
        paddingHorizontal: windowWidth * 0.03,
        marginVertical: 4,
    },
    requestsContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 6,
        padding: 8,
        marginVertical: windowWidth * 0.01,
        marginHorizontal: 4,
    },
    requestItem: {
        paddingVertical: 6,
    },
    requestItemBorder: {
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    requestFor: {
        fontSize: Platform.OS === 'ios' ? 14 : 13,
        color: '#333333',
        fontWeight: '600',
        marginBottom: 2,
    },
    requestDetails: {
        fontSize: Platform.OS === 'ios' ? 13 : 12,
        color: '#666666',
        marginTop: 2,
    },
    remainingCountContainer: {
        paddingTop: 6,
        marginTop: 6,
        borderTopWidth: 1,
        borderTopColor: '#E5E5E5',
    },
    remainingCountText: {
        fontSize: Platform.OS === 'ios' ? 13 : 12,
        color: '#3982BD',
        fontWeight: '600',
        textAlign: 'center',
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
    headerTitle: {
        fontSize: Platform.OS === 'ios' ? 20 : 18,
        fontWeight: 'bold',
        color: '#FFFFFF',
        textAlign: 'center',
    },
    backButton13: {
        marginLeft: windowWidth * 0.03,
        marginRight: windowWidth * 0.15,
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
        fontWeight: '600'
    },
    listContainer: {
        paddingVertical: 8,
    },
});

export default NotiList;