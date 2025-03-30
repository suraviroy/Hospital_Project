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
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';

import { backendURL } from "../backendapi";
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";

const ViewListURL = `${backendURL}/adminRouter/notification`;
const ReportsNotificationURL = `${backendURL}/adminRouter/Reportsnotification`;
const INITIAL_LOAD_LIMIT = 20;
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
            onEndReached={hasMoreItems ? onLoadMore : null}
            onEndReachedThreshold={0.1}
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

    const processNotifications = useCallback((notificationsData, reportsNotificationsData, existingRequestNotifications, existingReportNotifications) => {
        const transformedRequestNotifications = notificationsData.map(notification => ({
            ...notification,
            type: 'default',
            background: notification.status === 'Critical' ? '#FFD5D5' : '#EAF9FE'
        })).filter(notification => 
            !existingRequestNotifications.some(existing => 
                existing.requestId === notification.requestId
            )
        ).sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return dateB - dateA;
        });
    
        const transformedReportNotifications = reportsNotificationsData.map(report => ({
            ...report,
            type: 'report',
            request: `Patient name: ${report.name}`,
            coordinator: report.coordinatorName,
            requestId: report.reportId,
            background: '#E6E6FA' 
        })).filter(report => 
            !existingReportNotifications.some(existing => 
                existing.reportId === report.reportId
            )
        ).sort((a, b) => {
            const dateA = new Date(`${a.date} ${a.time}`);
            const dateB = new Date(`${b.date} ${b.time}`);
            return dateB - dateA;
        });
    
        return { 
            transformedRequestNotifications, 
            transformedReportNotifications 
        };
    }, []);
    
    const fetchNotifications = useCallback(async (type = 'both', isInitialLoad = false) => {
        try {
           
            if (isInitialLoad) {
                setLoading(true);
                setError(null);
            } else {
                setIsLoadingMore(true);
            }
            const fetchRequests = type === 'both' || type === 'requests';
            const fetchReports = type === 'both' || type === 'reports';

            const fetchPromises = [];
            if (fetchRequests) {
                fetchPromises.push(
                    fetch(`${ViewListURL}?page=${requestPage}&limit=${INITIAL_LOAD_LIMIT}`)
                );
            }
            if (fetchReports) {
                fetchPromises.push(
                    fetch(`${ReportsNotificationURL}?page=${reportPage}&limit=${INITIAL_LOAD_LIMIT}`)
                );
            }

            const responses = await Promise.all(fetchPromises);
            const parsedResponses = await Promise.all(
                responses.map(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch notifications');
                    }
                    return response.json();
                })
            );
            let newRequestNotifications = requestNotifications;
            let newReportNotifications = reportNotifications;

            if (fetchRequests) {
                const requestData = parsedResponses[fetchReports ? 0 : 0];
                setRequestTotalPages(requestData.totalPages);
                
                const { transformedRequestNotifications } = processNotifications(
                    requestData.notifications, 
                    [], 
                    isInitialLoad ? [] : requestNotifications,
                    []
                );

                newRequestNotifications = isInitialLoad 
                    ? transformedRequestNotifications 
                    : [...requestNotifications, ...transformedRequestNotifications];
                
                setRequestNotifications(newRequestNotifications);
            }

            if (fetchReports) {
                const reportData = parsedResponses[fetchRequests ? 1 : 0];
                setReportTotalPages(reportData.totalPages);

                const { transformedReportNotifications } = processNotifications(
                    [], 
                    reportData.reports, 
                    [],
                    isInitialLoad ? [] : reportNotifications
                );

                newReportNotifications = isInitialLoad 
                    ? transformedReportNotifications 
                    : [...reportNotifications, ...transformedReportNotifications];
                
                setReportNotifications(newReportNotifications);
            }

        } catch (error) {
            console.error('Error fetching notification data:', error);
            setError(error.message || 'Failed to load notifications. Please try again.');
        } finally {
            if (isInitialLoad) {
                setLoading(false);
            } else {
                setIsLoadingMore(false);
            }
        }
    }, [processNotifications, requestPage, reportPage, requestNotifications, reportNotifications]);

    useEffect(() => {
        fetchNotifications('both', true);

        autoRefreshTimerRef.current = setInterval(() => {
            fetchNotifications('both');
        }, AUTO_REFRESH_INTERVAL);

        return () => {
            if (autoRefreshTimerRef.current) {
                clearInterval(autoRefreshTimerRef.current);
            }
        };
    }, [fetchNotifications]);

    const handleLoadMoreRequests = useCallback(() => {
        if (requestPage < requestTotalPages && !isLoadingMore) {
            setRequestPage(prev => prev + 1);
            fetchNotifications('requests');
        }
    }, [requestPage, requestTotalPages, isLoadingMore, fetchNotifications]);

    const handleLoadMoreReports = useCallback(() => {
        if (reportPage < reportTotalPages && !isLoadingMore) {
            setReportPage(prev => prev + 1);
            fetchNotifications('reports');
        }
    }, [reportPage, reportTotalPages, isLoadingMore, fetchNotifications]);

    const handleViewDetails = useCallback(async (item) => {
        try {
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

    const RequestTab = () => (
        <NotificationList 
            notifications={requestNotifications}
            loading={loading}
            error={error}
            handleViewDetails={handleViewDetails}
            onLoadMore={handleLoadMoreRequests}
            hasMoreItems={requestPage < requestTotalPages}
            isLoadingMore={isLoadingMore}
        />
    );

    const ReportTab = () => (
        <NotificationList 
            notifications={reportNotifications}
            loading={loading}
            error={error}
            handleViewDetails={handleViewDetails}
            onLoadMore={handleLoadMoreReports}
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