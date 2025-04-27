import React, { useState, useEffect, useCallback, useRef } from 'react';
import { 
    View, 
    Text, 
    Platform, 
    StatusBar, 
    StyleSheet, 
    TouchableOpacity, 
    Image, 
    FlatList, 
    Dimensions,
    ActivityIndicator 
} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
const windowWidth = Dimensions.get('window').width;
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { backendURL } from "../backendapi";
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";

const ViewListURL = `${backendURL}/adminRouter/notification`;
const ReportsNotificationURL = `${backendURL}/adminRouter/Reportsnotification`;
const INITIAL_LOAD_LIMIT = 2;
const AUTO_REFRESH_INTERVAL = 15000; 

const Tab = createMaterialTopTabNavigator();

const NotificationItem = React.memo(({ item, onViewDetails }) => {
   
    const firstRequest = item.request && Array.isArray(item.request) 
        ? item.request[0] 
        : item.request;
    
    const hasAdditionalRequests = item.request && Array.isArray(item.request) && item.request.length > 1;

    return (
        <TouchableOpacity 
            onPress={() => onViewDetails(item)}
            activeOpacity={0.7}
        >
            <View style={[
                styles.patientView, 
                { backgroundColor: item.background }
            ]}>
                <Image 
                    source={
                        item.image 
                        ? {uri: `${backendURL}/getfile/${item.image}`}
                        : require('../../assets/images/user2.png')
                    } 
                    style={styles.patientImage}
                    defaultSource={require('../../assets/images/user2.png')}
                />
                <View style={styles.contentContainer}>
                    <View style={styles.patientDetails}>
                        <Text style={styles.patientName} numberOfLines={2}>
                            {item.type === 'report' 
                                ? 'New Report' 
                                : `${item.name} sent you a request`}
                        </Text>
                        <Text style={styles.patientMessage} numberOfLines={2}>
                            {firstRequest?.requestFor 
                                ? `Request for: ${firstRequest.requestFor}` 
                                : item.request || item.message}
                            {hasAdditionalRequests && ` (+${item.request.length - 1} more)`}
                        </Text>
                        
                        {firstRequest.details !=='NA' && (
                            <Text style={styles.patientMessage} numberOfLines={2}>
                                Details: 
                                {firstRequest.details}
                            </Text>
                        )}
                        <Text style={styles.patientName}>
                            Coordinator: {item.coordinator || item.coordinatorName}
                        </Text>
                    </View>
                    <View style={styles.bottomRow}>
                        <Text style={styles.timestamp}>
                            {item.date}, {item.time}
                        </Text>
                    </View>
                </View>
                <View style={styles.rightSection}>
                    <View style={styles.patientIdContainer}>
                        <Text style={styles.patientId} numberOfLines={1}>{item.patientId}</Text>
                    </View>
                    {item.type === 'default' && (
                        <View style={styles.actionIndicator}>
                            {item.action?.toLowerCase() === 'na' ? (
                                <Icon name="times-circle" size={20} color="#FF4444" />
                            ) : (
                                <Icon name="check-circle" size={20} color="#4CAF50" />
                            )}
                        </View>
                    )}
                </View>
            </View>
        </TouchableOpacity>
    );
});


const NotificationList = ({ 
    notifications, 
    loading, 
    error, 
    handleViewDetails,
    onLoadMore,
    hasMoreItems,
    isLoadingMore
}) => {
    // Debug log to check if onLoadMore is being triggered
    const handleEndReached = () => {
        // console.log("End reached, hasMoreItems:", hasMoreItems);
        if (hasMoreItems) {
            onLoadMore();
        }
    };
    
    const renderFooter = () => {
        if (!isLoadingMore) return null;
        return (
            <View style={styles.footerLoader}>
                <ActivityIndicator size="small" color="#096759" />
            </View>
        );
    };

    if (loading && notifications.length === 0) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#096759" />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
            </View>
        );
    }
    
    if (notifications.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.text45}>No Notifications to show!</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={notifications}
            renderItem={({ item }) => (
                <NotificationItem 
                    item={item} 
                    onViewDetails={handleViewDetails} 
                />
            )}
            keyExtractor={item => `${item.type}_${item.requestId || item.reportId}_${item.date}_${item.time}`}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContainer}
            onEndReached={handleEndReached}
            onEndReachedThreshold={0.5} // Increased threshold to trigger earlier
            ListFooterComponent={renderFooter}
        />
    );
};

const Notification = () => {
    const navigation = useNavigation();
    const [requestNotifications, setRequestNotifications] = useState([]);
    const [reportNotifications, setReportNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [error, setError] = useState(null);
    const [requestPage, setRequestPage] = useState(1);
    const [reportPage, setReportPage] = useState(1);
    const [requestTotalPages, setRequestTotalPages] = useState(1);
    const [reportTotalPages, setReportTotalPages] = useState(1);
    const autoRefreshTimerRef = useRef(null);
    const isLoadingRef = useRef(false); // Use this to prevent multiple simultaneous requests
    const actionTakenRef = useRef(false);

    // Function to transform notifications
    const transformNotifications = useCallback((notifications, isReport = false) => {
        return notifications.map(item => ({
            ...item,
            type: isReport ? 'report' : 'default',
            background: isReport ? '#E6E6FA' : (item.status === 'Critical' ? '#FFD5D5' : '#EAF9FE'),
            ...(isReport && {
                request: `Patient name: ${item.name}`,
                coordinator: item.coordinatorName,
                requestId: item.reportId
            })
        })).sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return dateB - dateA;
        });
    }, []);

    // Handle initial data fetch
    const fetchInitialNotifications = useCallback(async () => {
        try {
            // console.log("Fetching initial notifications...");
            setLoading(true);
            
            // Fetch requests
            const requestResponse = await fetch(`${ViewListURL}?page=1&limit=${INITIAL_LOAD_LIMIT}`);
            if (!requestResponse.ok) {
                throw new Error('Failed to fetch request notifications');
            }
            const requestData = await requestResponse.json();
            
            // Fetch reports
            const reportResponse = await fetch(`${ReportsNotificationURL}?page=1&limit=${INITIAL_LOAD_LIMIT}`);
            if (!reportResponse.ok) {
                throw new Error('Failed to fetch report notifications');
            }
            const reportData = await reportResponse.json();
            
            // Set total pages
            setRequestTotalPages(requestData.totalPages || 1);
            setReportTotalPages(reportData.totalPages || 1);
            
            // Transform and set notifications
            const transformedRequests = transformNotifications(requestData.notifications || []);
            const transformedReports = transformNotifications(reportData.reports || [], true);
            
            setRequestNotifications(transformedRequests);
            setReportNotifications(transformedReports);
            
            // Reset page counters - we've loaded page 1
            setRequestPage(1);
            setReportPage(1);
            
        } catch (error) {
            console.error('Error fetching initial notifications:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [transformNotifications]);

    // Load more function for requests
    const loadMoreRequests = useCallback(async () => {
        if (isLoadingRef.current || requestPage >= requestTotalPages) {
            // console.log("Skipping load more requests - already loading or at end");
            return;
        }
        
        try {
            // console.log("Loading more requests...", requestPage + 1);
            isLoadingRef.current = true;
            setIsLoadingMore(true);
            
            const nextPage = requestPage + 1;
            const response = await fetch(`${ViewListURL}?page=${nextPage}&limit=${INITIAL_LOAD_LIMIT}`);
            
            if (!response.ok) {
                throw new Error('Failed to load more request notifications');
            }
            
            const data = await response.json();
            
            if (data.notifications && data.notifications.length > 0) {
                const transformedRequests = transformNotifications(data.notifications);
                
                setRequestNotifications(prev => {
                    // Filter out duplicates
                    const newItems = transformedRequests.filter(
                        newItem => !prev.some(existing => existing.requestId === newItem.requestId)
                    );
                    // console.log("Adding", newItems.length, "new request notifications");
                    return [...prev, ...newItems];
                });
            }
            
            // Update page counter
            setRequestPage(nextPage);
            
        } catch (error) {
            console.error('Error loading more requests:', error);
            setError('Failed to load more notifications. Please try again.');
        } finally {
            setIsLoadingMore(false);
            isLoadingRef.current = false;
        }
    }, [requestPage, requestTotalPages, transformNotifications]);

    // Load more function for reports
    const loadMoreReports = useCallback(async () => {
        if (isLoadingRef.current || reportPage >= reportTotalPages) {
            // console.log("Skipping load more reports - already loading or at end");
            return;
        }
        
        try {
            console.log("Loading more reports...", reportPage + 1);
            isLoadingRef.current = true;
            setIsLoadingMore(true);
            
            const nextPage = reportPage + 1;
            const response = await fetch(`${ReportsNotificationURL}?page=${nextPage}&limit=${INITIAL_LOAD_LIMIT}`);
            
            if (!response.ok) {
                throw new Error('Failed to load more report notifications');
            }
            
            const data = await response.json();
            
            if (data.reports && data.reports.length > 0) {
                const transformedReports = transformNotifications(data.reports, true);
                
                setReportNotifications(prev => {
                    // Filter out duplicates
                    const newItems = transformedReports.filter(
                        newItem => !prev.some(existing => existing.reportId === newItem.reportId)
                    );
                    // console.log("Adding", newItems.length, "new report notifications");
                    return [...prev, ...newItems];
                });
            }
            
            // Update page counter
            setReportPage(nextPage);
            
        } catch (error) {
            console.error('Error loading more reports:', error);
            setError('Failed to load more notifications. Please try again.');
        } finally {
            setIsLoadingMore(false);
            isLoadingRef.current = false;
        }
    }, [reportPage, reportTotalPages, transformNotifications]);

    // Check for new notifications (auto-refresh)
    const checkForNewNotifications = useCallback(async () => {
        if (isLoadingRef.current) {
            return; // Skip if already loading
        }
        
        try {
            isLoadingRef.current = true;
            
            // Fetch latest requests
            const requestResponse = await fetch(`${ViewListURL}?page=1&limit=${INITIAL_LOAD_LIMIT}`);
            if (!requestResponse.ok) {
                throw new Error('Failed to check for new requests');
            }
            const requestData = await requestResponse.json();
            
            // Fetch latest reports
            const reportResponse = await fetch(`${ReportsNotificationURL}?page=1&limit=${INITIAL_LOAD_LIMIT}`);
            if (!reportResponse.ok) {
                throw new Error('Failed to check for new reports');
            }
            const reportData = await reportResponse.json();
            
            // Transform the new data
            const newRequests = transformNotifications(requestData.notifications || []);
            const newReports = transformNotifications(reportData.reports || [], true);
            
            // Add new requests to the top (if any)
            setRequestNotifications(prev => {
                // Create a merged array, prioritizing server data for items that exist in both
                const mergedRequests = [...prev];
                
                // First, update any existing items
                newRequests.forEach(newItem => {
                    const existingIndex = mergedRequests.findIndex(
                        existing => existing.requestId === newItem.requestId
                    );
                    
                    if (existingIndex !== -1) {
                        // Replace the existing item
                        mergedRequests[existingIndex] = newItem;
                    } else {
                        // If it's a new item, add it to the beginning
                        mergedRequests.unshift(newItem);
                    }
                });
                
                return mergedRequests;
            });
            
            // Add new reports to the top (if any)
            setReportNotifications(prev => {
                // Create a merged array, prioritizing server data for items that exist in both
                const mergedReports = [...prev];
                
                // First, update any existing items
                newReports.forEach(newItem => {
                    const existingIndex = mergedReports.findIndex(
                        existing => existing.reportId === newItem.reportId
                    );
                    
                    if (existingIndex !== -1) {
                        // Replace the existing item
                        mergedReports[existingIndex] = newItem;
                    } else {
                        // If it's a new item, add it to the beginning
                        mergedReports.unshift(newItem);
                    }
                });
                
                return mergedReports;
            });
            
        } catch (error) {
            console.error('Error checking for new notifications:', error);
            // Don't show errors for background refresh
        } finally {
            isLoadingRef.current = false;
        }
    }, [transformNotifications]);

    // Initial data fetch
    useEffect(() => {
        fetchInitialNotifications();
        
        // Set up auto-refresh
        autoRefreshTimerRef.current = setInterval(() => {
            checkForNewNotifications();
        }, AUTO_REFRESH_INTERVAL);
        
        return () => {
            if (autoRefreshTimerRef.current) {
                clearInterval(autoRefreshTimerRef.current);
            }
        };
    }, [fetchInitialNotifications, checkForNewNotifications]);

    // Handle screen focus - refresh data when returning to this screen
    useFocusEffect(
        useCallback(() => {
            // Only refresh when returning from a notification detail screen
            if (actionTakenRef.current) {
                // console.log('Screen is focused after action, refreshing data...');
                fetchInitialNotifications();
                actionTakenRef.current = false;
            }
            return () => {};
        }, [fetchInitialNotifications])
    );

    const handleViewDetails = useCallback(async (item) => {
        try {
            // Set the action taken flag so we know to refresh when returning
            actionTakenRef.current = true;
            
            if (item.type === 'report') {
                navigation.navigate('ReportNavbar', { 
                    reportId: item.reportId,
                    patientId: item.patientId 
                });
            } else {
                navigation.navigate('NotificationNavbar', { 
                    patientId: item.patientId, 
                    requestId: item.requestId 
                });
            }
        } catch (error) {
            console.error('Error navigating to details:', error);
        }
    }, [navigation]);

    const handleBack = useCallback(() => {
        navigation.goBack();
    }, [navigation]);

    // Component for Request tab
    const RequestTab = () => (
        <NotificationList 
            notifications={requestNotifications}
            loading={loading}
            error={error}
            handleViewDetails={handleViewDetails}
            onLoadMore={loadMoreRequests}
            hasMoreItems={requestPage < requestTotalPages}
            isLoadingMore={isLoadingMore}
        />
    );

    // Component for Report tab
    const ReportTab = () => (
        <NotificationList 
            notifications={reportNotifications}
            loading={loading}
            error={error}
            handleViewDetails={handleViewDetails}
            onLoadMore={loadMoreReports}
            hasMoreItems={reportPage < reportTotalPages}
            isLoadingMore={isLoadingMore}
        />
    );

    return (
        <SafeAreaView style={styles.patientContainer2451}>
            <StatusBar 
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
                backgroundColor="#FFFFFF" 
                translucent={false}
            />
            <View style={styles.header2451}>
                <TouchableOpacity 
                    onPress={handleBack} 
                    style={styles.backButton13}
                    activeOpacity={0.7}
                >
                    <Icon name="angle-left" size={30} color={Color.colorBlack} />
                </TouchableOpacity>
                <Text style={styles.text2451}>Notifications</Text>
            </View>
            
            <Tab.Navigator
                screenOptions={{
                    tabBarActiveTintColor: '#096759',
                    tabBarInactiveTintColor: '#808080',
                    tabBarIndicatorStyle: { 
                        backgroundColor: '#096759',
                        height: 3
                    },
                    tabBarLabelStyle: {
                        textTransform: 'none',
                        fontFamily: 'bold01',
                        fontSize: 16
                    }
                }}
            >
                <Tab.Screen name="Requests" component={RequestTab} />
                <Tab.Screen name="Reports" component={ReportTab} />
            </Tab.Navigator>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    footerLoader: {
        padding: windowWidth * 0.03,
        alignItems: 'center',
    },
    patientContainer2451: {
        flex: 1, 
        paddingTop: windowWidth * 0.1,
        backgroundColor: '#fff',
        paddingBottom: windowWidth * 0.2,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    listContainer: {
        paddingBottom: windowWidth * 0.1,
    },
    actionIndicator: {
        position: 'absolute',
        right: windowWidth * 0.04,
        top: windowWidth * 0.1,
    },
    text45: {
        marginTop: windowWidth * 0.10,
        fontSize: 18,
        fontFamily: 'bold01',
        marginLeft: 20,
    },
    header2451: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        marginBottom: windowWidth * 0.05,
    },
    text2451: {
        fontSize: 25,
        marginLeft: windowWidth * 0.13,
        fontFamily: "bold01",
    },
    backButton13: {
        marginLeft: windowWidth * 0.03,
        position: 'absolute',
        padding: 10,
    },
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: windowWidth * 0.1,
        paddingBottom: windowWidth * 0.2,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: windowWidth * 0.04,
        marginBottom: windowWidth * 0.05,
    },
    headerTitle: {
        fontSize: 25,
        marginLeft: windowWidth * 0.13,
        fontFamily: "bold01",
    },
    backButton: {
        padding: 10,
    },
    patientView: {
        flexDirection: 'row',
        marginHorizontal: windowWidth * 0.02,
        borderRadius: 10,
        padding: windowWidth * 0.03,
        marginBottom: windowWidth * 0.02,
        elevation: 3,
        minHeight: windowWidth * 0.22,
    },
    patientImage: {
        width: windowWidth * 0.15,
        height: windowWidth * 0.15,
        borderRadius: 8,
        alignSelf: 'flex-start',
    },
    contentContainer: {
        flex: 1,
        marginLeft: windowWidth * 0.03,
        justifyContent: 'space-between',
    },
    patientDetails: {
        flex: 1,
    },
    patientName: {
        fontSize: 14,
        fontFamily: 'bold01',
        marginBottom: 4,
        flexWrap: 'wrap',
    },
    patientMessage: {
        fontSize: 13,
        fontFamily: FontFamily.font_bold,
        flexWrap: 'wrap',
    },
    bottomRow: {
        marginTop: 8,
    },
    timestamp: {
        fontSize: 12,
        color: '#011411',
        fontFamily: 'bold01',
    },
    rightSection: {
        marginLeft: windowWidth * 0.02,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
    },
    patientIdContainer: {
        backgroundColor: '#096759',
        borderRadius: 12,
        paddingVertical: 4,
        paddingHorizontal: 8,
        minWidth: windowWidth * 0.2,
        maxWidth: windowWidth * 0.3,
    },
    patientId: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 12,
        fontWeight: 'bold',
    },
    actionIndicator: {
        marginTop: 8,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    footerLoader: {
        padding: windowWidth * 0.03,
        alignItems: 'center',
    },
    listContainer: {
        paddingBottom: windowWidth * 0.1,
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 15,
    },
    retryButton: {
        backgroundColor: '#096759',
        padding: 10,
        borderRadius: 5,
    },
    retryButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default Notification;