import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, StatusBar, TouchableOpacity, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { backendURL } from "../backendapi";
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";
import Icon from 'react-native-vector-icons/FontAwesome5';

const windowWidth = Dimensions.get('window').width;
const ViewListURL = `${backendURL}/adminRouter/ReportoneAdminNotification/`;

const ReportNotiList = ({ route }) => {
  const navigation = useNavigation();
  const { idNumber } = route.params;
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    fetchNotifications(1);
  }, [idNumber]);

  const fetchNotifications = async (page) => {
    try {
      setLoading(page === 1);
      setIsLoadingMore(page > 1);

      const response = await fetch(`${ViewListURL}${idNumber}?page=${page}&limit=5`);
      const data = await response.json();

      setTotalPages(data.totalPages);
      setNotifications(prevNotifications => 
        page === 1 ? data.reports : [...prevNotifications, ...data.reports]
      );

      setLoading(false);
      setIsLoadingMore(false);
    } catch (error) {
      console.error('Error fetching report notification data:', error);
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handleViewDetails = (patientId, reportId) => {
    navigation.navigate('ReportNavbar', { patientId, reportId });
  };

  const handleBack = () => {
    navigation.goBack();
  };

  const loadMoreNotifications = () => {
    if (!isLoadingMore && currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      fetchNotifications(nextPage);
    }
  };

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#096759" />
        <Text style={styles.text45}>Loading report notifications...</Text>
      </View>
    );
  }

  if (notifications.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.text45}>No report notifications to show!</Text>
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
        <Text style={styles.text2451}>Report Notifications</Text>
      </View>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => handleViewDetails(item.patientId, item.reportId)}
            activeOpacity={0.7}
          >
            <View style={[styles.patientView, { backgroundColor: '#E6E6FA' }]}>
              {item.image ? (
                <Image source={{uri: `${backendURL}/getfile/${item.image}`}} style={styles.patientImage} />
              ) : (
                <Image source={require('../../assets/images/user2.png')} style={styles.patientImage} />
              )}
              <View style={styles.contentContainer}>
                <View style={styles.patientDetails}>
                  <Text style={styles.patientName} numberOfLines={2}>
                    {item.name} sent you Report
                  </Text>
                  <Text style={styles.patientMessage} numberOfLines={2}>
                    Coordinator: {item.coordinatorName}
                  </Text>
                  <Text style={styles.patientMessage}>
                    Contact: +{item.contactNumber}
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
                  <Text style={styles.patientId} numberOfLines={1}>
                    {item.patientId}
                  </Text>
                </View>
                <View style={styles.actionIndicator}>
                  <Icon name="file-medical" size={20} color="#8A2BE2" />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.reportId.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreNotifications}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isLoadingMore && (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color="#096759" />
              <Text>Loading more...</Text>
            </View>
          )
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
    paddingTop: windowWidth * 0.1,
    backgroundColor: '#fff',
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
});

export default ReportNotiList;