import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, StatusBar, TouchableOpacity, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { backendURL } from "../backendapi";
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";
import Icon from 'react-native-vector-icons/FontAwesome5';

const windowWidth = Dimensions.get('window').width;
const ViewListURL = `${backendURL}/adminRouter/oneAdminNotification/`;

const AdminNotiList = ({ route }) => {
  const navigation = useNavigation();
  const { idNumber } = route.params;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRequests, setTotalRequests] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchNotifications(currentPage);
  }, [idNumber, currentPage]);

  const fetchNotifications = async (page) => {
    try {
      setLoading(true);
      const response = await fetch(`${ViewListURL}${idNumber}?page=${page}&limit=${itemsPerPage}`);
      const data = await response.json();
      const processedNotifications = data.notifications.map(notification => {
        if (Array.isArray(notification.request)) {
          const requestCount = notification.request.length;
          return {
            ...notification,
            displayRequest: notification.request[0].requestFor || 'Request',
            details: notification.request[0].details, 
            additionalRequestCount: requestCount > 1 ? `+${requestCount - 1}` : ''
          };
        }
        return {
          ...notification,
          displayRequest: notification.request,
          additionalRequestCount: ''
        };
      });

      setNotifications(prevNotifications => 
        page === 1 ? processedNotifications : [...prevNotifications, ...processedNotifications]
      );
      
      setTotalPages(data.totalPages);
      setTotalRequests(data.totalRequests);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notification data:', error);
      setLoading(false);
    }
  };

  const handleViewDetails = (patientId, requestId) => {
    navigation.navigate('NotificationNavbar', { patientId, requestId });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const loadMoreNotifications = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  if (loading && notifications.length === 0) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#096759" />
        <Text style={styles.text45}>Loading notifications...</Text>
      </View>
    );
  }

  if (notifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text45}>No notifications to show!</Text>
      </View>
    );
  }

  return (
    <View style={styles.patientContainer2451}>
      <StatusBar
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        backgroundColor="#FFFFFF"
        translucent={false}
      />
      <View style={styles.header2451}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton13} activeOpacity={0.7}>
          <Icon name="angle-left" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.text2451}>Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleViewDetails(item.patientId, item.requestId)}
            activeOpacity={0.7}
          >
            <View
              style={[
                styles.patientView,
                { backgroundColor: item.status === 'Critical' ? '#FFD5D5' : '#EAF9FE' },
              ]}
            >
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.patientImage} />
              ) : (
                <Image source={require('../../assets/images/user2.png')} style={styles.patientImage} />
              )}
              <View style={styles.contentContainer}>
                <View style={styles.patientDetails}>
                  <Text style={styles.patientName} numberOfLines={2}>
                    {item.name} sent you a request
                  </Text>
                  <Text style={styles.patientMessage} numberOfLines={2}>
                    Request for: {' '} 
                    {item.displayRequest}  {' '} 
                     
                    {item.details !=='NA' && (
                            <Text style={styles.patientMessage} numberOfLines={2}>
                                Details: 
                                {item.details}
                            </Text>
                        )}
                    {item.additionalRequestCount && (
                      <Text style={styles.additionalRequestText}>
                        {` ${item.additionalRequestCount}`}
                      </Text>
                    )}
                  </Text>
                  <Text style={styles.patientName}>Coordinator: {item.coordinator}</Text>
                </View>
                <View style={styles.bottomRow}>
                  <Text style={styles.timestamp}>
                    {item.date}, {item.time}
                  </Text>
                </View>
              </View>
              <View style={styles.rightSection}>
                <View style={styles.patientIdContainer}>
                  <Text style={styles.patientId} numberOfLines={1}>
                    {item.patientId}
                  </Text>
                </View>
                <View style={styles.actionIndicator}>
                  {item.action?.toLowerCase() === 'na' ? (
                    <Icon name="times-circle" size={20} color="#FF4444" />
                  ) : (
                    <Icon name="check-circle" size={20} color="#4CAF50" />
                  )}
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => `${item.requestId}`}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreNotifications}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          loading && notifications.length > 0 ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color="#096759" />
              <Text>Loading more...</Text>
            </View>
          ) : null
        }
      />
    </View>
  );
};
const styles = StyleSheet.create({
    footerLoader: {
        padding: windowWidth * 0.03,
        alignItems: 'center',
    },
    patientContainer2451: {
        flex: 1, 
        paddingTop: windowWidth * 0.15,
        backgroundColor: '#fff',
        // paddingBottom: windowWidth * 0.2,
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
});

export default AdminNotiList;