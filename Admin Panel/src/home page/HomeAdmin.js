import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StatusBar, StyleSheet, FlatList, Image, TouchableOpacity, Linking, Platform, Dimensions, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { backendURL } from "../backendapi";
import { Ionicons } from 'react-native-vector-icons';
import debounce from 'lodash/debounce';

const windowWidth = Dimensions.get('window').width;
const adminListURL = `${backendURL}/adminListRouter/adminlist`;
const getNotificationCountURL = `${backendURL}/adminRouter/countAdminNotification/`;
const markNotificationSeenURL = `${backendURL}/adminRouter/seenAdminNotification/`;
const getReportCountURL = `${backendURL}/adminRouter/ReportcountAdminNotification/`;
const markReportSeenURL = `${backendURL}/adminRouter/ReportseenAdminNotification/`;
const { width: screenWidth } = Dimensions.get('window');
const scale = screenWidth / 375;
const normalize = (size) => Math.round(scale * size);

const HomeAdmin = ({ searchText }) => {
    const navigation = useNavigation();
    const [adminList, setAdminList] = useState([]);
    const [filteredAdminList, setFilteredAdminList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingAdmins, setLoadingAdmins] = useState({});
    const [loadingNoti, setloadingNoti] = useState({});
    const [loadingReports, setLoadingReports] = useState({});
    const [loadingCalls, setLoadingCalls] = useState({});
    const [notificationCounts, setNotificationCounts] = useState({});
    const [reportCounts, setReportCounts] = useState({});

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalAdmins, setTotalAdmins] = useState(0);
    const [isLoadingMore, setIsLoadingMore] = useState(false);

    const ITEMS_PER_PAGE = 10;

    const fetchAdminList = useCallback(async (page = 1, limit = ITEMS_PER_PAGE) => {
        try {
            setLoading(page === 1);
            setIsLoadingMore(page > 1);

            const response = await fetch(`${adminListURL}?page=${page}&limit=${limit}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            setCurrentPage(data.currentPage);
            setTotalPages(data.totalPages);
            setTotalAdmins(data.totalAdmins);

            const newAdminList = page === 1 ? data.admins : [...adminList, ...data.admins];
            setAdminList(newAdminList);
            setFilteredAdminList(newAdminList);

            const notificationCountPromises = data.admins.map(async (admin) => {
                const countResponse = await fetch(`${getNotificationCountURL}${admin.idNumber}`);
                const { count } = await countResponse.json();
                return { [admin.idNumber]: count };
            });

            const reportCountPromises = data.admins.map(async (admin) => {
                const reportResponse = await fetch(`${getReportCountURL}${admin.idNumber}`);
                const { count } = await reportResponse.json();
                return { [admin.idNumber]: count };
            });

            const notificationCountResults = await Promise.all(notificationCountPromises);
            const reportCountResults = await Promise.all(reportCountPromises);

            const notificationCountsObj = notificationCountResults.reduce((acc, cur) => ({
                ...acc,
                ...cur,
            }), notificationCounts);

            const reportCountsObj = reportCountResults.reduce((acc, cur) => ({
                ...acc,
                ...cur,
            }), reportCounts);

            setNotificationCounts(notificationCountsObj);
            setReportCounts(reportCountsObj);

            setLoading(false);
            setIsLoadingMore(false);
        } catch (error) {
            console.error('Error fetching admin list:', error);
            setLoading(false);
            setIsLoadingMore(false);
        }
    }, [adminList, notificationCounts, reportCounts]);

    useEffect(() => {
        fetchAdminList();
    }, []);

    useEffect(() => {
        let filtered = adminList;
        if (searchText) {
            filtered = adminList.filter(admin =>
                searchText.test(admin.name.toLowerCase()) ||
                searchText.test(admin.idNumber.toLowerCase())
            );
        }
        setFilteredAdminList(filtered);
    }, [searchText, adminList]);

    const handleNextPage = () => {
        if (currentPage < totalPages) {
            fetchAdminList(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            fetchAdminList(currentPage - 1);
        }
    };


    const handleViewPatient = useCallback(
        debounce(async (adminName) => {
            if (loadingAdmins[adminName]) return;

            setLoadingAdmins(prev => ({ ...prev, [adminName]: true }));
            try {
                navigation.navigate('AdminPatientList', { adminName });
            } catch (error) {
                console.error('Error navigating to AdminPatientList:', error);
            } finally {
                setTimeout(() => {
                    setLoadingAdmins(prev => ({ ...prev, [adminName]: false }));
                }, 500);
            }
        }, 300),
        [navigation]
    );

    const openDial = useCallback(async (phNumber, adminId) => {
        if (loadingCalls[adminId]) return;

        setLoadingCalls(prev => ({ ...prev, [adminId]: true }));
        try {
            if (!phNumber) {
                console.error('Phone number is undefined or null');
                return;
            }

            const cleanNumber = phNumber.toString().replace(/\D/g, '');
            
            if (cleanNumber.length < 10) {
                console.error('Invalid phone number length:', cleanNumber);
                return;
            }

            const formattedNumber = cleanNumber.startsWith('+91') 
                ? `+${cleanNumber}` 
                : cleanNumber.length === 10 
                    ? `+91${cleanNumber}` 
                    : `+${cleanNumber}`;

            const dialURL = Platform.OS === "android" 
                ? `tel:${formattedNumber}` 
                : `telprompt:${formattedNumber}`;
            
            const supported = await Linking.canOpenURL(dialURL);
            if (supported) {
                await Linking.openURL(dialURL);
            } else {
                console.log(`Cannot open dial for number: ${formattedNumber}`);
            }
        } catch (error) {
            console.error('Error in openDial function:', error);
        } finally {
            setTimeout(() => {
                setLoadingCalls(prev => ({ ...prev, [adminId]: false }));
            }, 500);
        }
    }, []);

    const handleNotificationPress = async (idNumber) => {
        if (loadingNoti[idNumber]) return;
    
        setloadingNoti((prev) => ({ ...prev, [idNumber]: true }));
        try {
            await fetch(`${markNotificationSeenURL}${idNumber}`, {
                method: 'POST',
            });
            setNotificationCounts((prev) => ({
                ...prev,
                [idNumber]: 0,
            }));
            navigation.navigate('AdminNotiList', { idNumber });
        } catch (error) {
            console.error('Error marking notification as seen:', error);
        } finally {
            setTimeout(() => {
                setloadingNoti((prev) => ({ ...prev, [idNumber]: false }));
            }, 500);
        }
    };

    const handleReportPress = async (idNumber) => {
        if (loadingReports[idNumber]) return;
    
        setLoadingReports((prev) => ({ ...prev, [idNumber]: true }));
        try {
            await fetch(`${markReportSeenURL}${idNumber}`, {
                method: 'POST',
            });
            setReportCounts((prev) => ({
                ...prev,
                [idNumber]: 0,
            }));
            navigation.navigate('ReportNotiList', { idNumber });
        } catch (error) {
            console.error('Error marking reports as seen:', error);
        } finally {
            setTimeout(() => {
                setLoadingReports((prev) => ({ ...prev, [idNumber]: false }));
            }, 500);
        }
    };

    const Item = ({ name, educationQualification, picture, gender, idNumber, date, time, phNumber }) => (
        <View style={styles.item}>
            <View style={styles.leftContent}>
                {picture ? (
                    <Image source={{uri: `${backendURL}/getfile/${picture}`}} style={styles.picture} />
                ) : (
                    <Image source={require('../../assets/images/user.png')} style={styles.picture} />
                )}
                <View style={styles.infoContainer}>
                    <View style={styles.nameContainer}>
                        <Text style={styles.name}>{name}</Text>
                    </View>
                    <Text style={styles.educationQualification} numberOfLines={1}>{educationQualification}</Text>
                    <Text style={styles.gender}>Gender: {gender}</Text> 
                    {idNumber && idNumber !== '0' && (
                        <Text style={styles.idNumber} numberOfLines={1}> ID: {idNumber}</Text>
                    )}
                </View>
            </View>
            
            <View style={styles.rightContentWrapper}>
                <View style={styles.rightContent}>
                    <TouchableOpacity 
                        onPress={() => handleViewPatient(name)} 
                        disabled={loadingAdmins[name]}
                        style={[styles.viewPatientButton, loadingAdmins[name] && styles.loadingButton]}
                    >
                        {loadingAdmins[name] ? (
                            <ActivityIndicator size="small" color="#E14526" />
                        ) : (
                            <Text style={styles.viewPatientText}>View Patient</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={[styles.callButton, loadingCalls[idNumber] && styles.loadingButton]}
                        onPress={() => openDial(phNumber, idNumber)}
                        disabled={loadingCalls[idNumber]}
                    >
                        {loadingCalls[idNumber] ? (
                            <ActivityIndicator size="small" color="#096759" />
                        ) : (
                            <>
                                <Ionicons name="call-sharp" size={20} style={styles.callIcon} />
                                <Text style={styles.callText}>Call</Text>
                            </>
                        )}
                    </TouchableOpacity>

                    <View style={styles.bottomButtonsContainer}>
                        <TouchableOpacity
                            style={[
                                styles.notificationButton, 
                                loadingNoti[idNumber] && styles.loadingButton,
                                { marginRight: normalize(10) }
                            ]}
                            onPress={() => handleNotificationPress(idNumber)}
                            disabled={loadingNoti[idNumber]}
                        >
                            {loadingNoti[idNumber] ? (
                                <ActivityIndicator size={normalize(28)} color="#096759" />
                            ) : (
                                <>
                                    <Ionicons
                                        name="notifications-outline"
                                        size={normalize(28)}
                                        color="#096759"
                                    />
                                    {notificationCounts[idNumber] > 0 && (
                                        <View style={styles.notificationBadge}>
                                            <Text style={styles.notificationCount}>
                                                {notificationCounts[idNumber] > 99 ? '99+' : notificationCounts[idNumber]}
                                            </Text>
                                        </View>
                                    )}
                                </>
                            )}
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={[styles.reportButton, loadingReports[idNumber] && styles.loadingButton]}
                            onPress={() => handleReportPress(idNumber)}
                            disabled={loadingReports[idNumber]}
                        >
                            {loadingReports[idNumber] ? (
                                <ActivityIndicator size={normalize(28)} color="#FF6347" />
                            ) : (
                                <>
                                    <Ionicons
                                        name="document-text-outline"
                                        size={normalize(28)}
                                        color="#FF6347"
                                    />
                                    {reportCounts[idNumber] > 0 && (
                                        <View style={styles.reportBadge}>
                                            <Text style={styles.reportCount}>
                                                {reportCounts[idNumber] > 99 ? '99+' : reportCounts[idNumber]}
                                            </Text>
                                        </View>
                                    )}
                                </>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            
            <View style={styles.registeredOnContainer}>
                <Text style={styles.registeredOnText}>
                    Registered On: <Text style={styles.datetime}>{date}, {time}</Text>
                </Text>
            </View>
        </View>
    );

    if (loading) {
        return (
            <View style={styles.loaderContainer}>
                <ActivityIndicator size="large" color="#096759" />
                <Text style={styles.text45}>Loading ...</Text>
            </View>
        );
    }

    if (filteredAdminList.length === 0) {
        return <Text style={styles.text45}>No Admins registered !!</Text>;
    }

    return (
        <View style={styles.container}>
            <StatusBar 
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
                backgroundColor="#FFFFFF"
                translucent={false}
            />
            <FlatList
                data={filteredAdminList}
                renderItem={({ item }) => <Item {...item} />}
                keyExtractor={item => item._id}
                ListFooterComponent={
                    <View style={styles.paginationContainer}>
                        <TouchableOpacity 
                            style={[
                                styles.paginationButton, 
                                currentPage === 1 && styles.disabledButton
                            ]}
                            onPress={handlePreviousPage}
                            disabled={currentPage === 1}
                        >
                            <Text style={styles.paginationButtonText}>Previous</Text>
                        </TouchableOpacity>
                        <Text style={styles.pageInfo}>
                            Page {currentPage} of {totalPages}
                        </Text>
                        <TouchableOpacity 
                            style={[
                                styles.paginationButton, 
                                currentPage === totalPages && styles.disabledButton
                            ]}
                            onPress={handleNextPage}
                            disabled={currentPage === totalPages}
                        >
                            <Text style={styles.paginationButtonText}>Next</Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: windowWidth * 0.04,
        marginBottom: 65,
    },
    item: {
        backgroundColor: '#fff',
        marginVertical: 8,
        marginHorizontal: 15,
        padding: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#096759",
        elevation: 5,
        minHeight: windowWidth * 0.42,
    },
    leftContent: {
        flexDirection: 'row',
        flex: 1,
    },
    picture: {
        width: windowWidth * 0.2,
        height: windowWidth * 0.25,
        borderRadius: 8,
        marginRight: 10,
    },
    infoContainer: {
        flex: 1,
        paddingRight: windowWidth * 0.30, 
    },
    nameContainer: {
        marginTop: 5,
        marginBottom: 5,
    },
    name: {
        fontFamily: 'bold01',
        fontSize: 14,
        flexWrap: 'wrap',
    },
    educationQualification: {
        fontSize: 12,
        fontFamily: 'regular89',
        marginBottom: 5,
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    gender: {
        fontSize: 12,
        fontFamily: 'regular89',
        marginBottom: 5,
    },
    idNumber: {
        fontSize: 12,
        fontFamily: 'regular89',
    },
    rightContentWrapper: {
        position: 'absolute',
        right: 10,
        top: 10,
        width: windowWidth * 0.25,
    },
    rightContent: {
        alignItems: 'stretch',
    },
    viewPatientButton: {
        marginBottom: windowWidth*0.02,
    },
    // viewPatientText: {
    //     borderWidth: 1.5,
    //     borderRadius: 5,
    //     fontSize: windowWidth*0.03,
    //     color: "#E14526",
    //     borderColor: "#E14526",
    //     padding: windowWidth*0.02,
    //     textAlign: 'center',
    // },
    // callButton: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     borderWidth: 1.5,
    //     borderRadius: 5,
    //     borderColor: "#096759",
    //     padding: windowWidth*0.02,
    //     marginBottom:normalize(4),
    // },
    // callIcon: {
    //     color: '#096759',
    //     marginRight: 5,
    // },
    // callText: {
    //     color: "#096759",
    //     fontSize: windowWidth*0.04,
    // },
    viewPatientButton: {
        borderWidth: 1.5,
        borderRadius: 5,
        borderColor: "#E14526",
        padding: windowWidth * 0.02,
        marginBottom: windowWidth * 0.02,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 40, // Added for consistent height
    },
    callButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderRadius: 5,
        borderColor: "#096759",
        padding: windowWidth * 0.02,
        marginBottom: normalize(4),
        minHeight: 40, // Added for consistent height
    },
    notificationButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: normalize(2),
        marginRight: normalize(4),
        minHeight: 40, // Added for consistent height
        position: 'relative',
    },
    loadingButton: {
        opacity: 0.7,
    },
    viewPatientText: {
        fontSize: windowWidth * 0.03,
        color: "#E14526",
        textAlign: 'center',
    },
    callIcon: {
        color: '#096759',
        marginRight: 5,
    },
    callText: {
        color: "#096759",
        fontSize: windowWidth * 0.04,
    },
    // notificationBadge: {
    //     // position: 'absolute',
    //     marginright: normalize(18),
    //     top: normalize(7),
    //     backgroundColor: '#FF3B30',
    //     borderRadius: normalize(10),
    //     minWidth: normalize(15),
    //     height: normalize(16),
    //     justifyContent: 'center',
    //     alignItems: 'center',
    //     paddingHorizontal: normalize(4),
    // },
    // notificationCount: {
    //     color: '#FFFFFF',
    //     fontSize: normalize(12),
    //     fontWeight: 'bold',
    // },
    loadingIndicator: {
        borderWidth: 1.5,
        borderRadius: 5,
        borderColor: "#E14526",
        padding: 8,
        alignItems: 'center',
    },
    registeredOnContainer: {
        marginTop: 10,
    },
    registeredOnText: {
        color: '#666',
        fontSize: windowWidth*0.03,
    },
    datetime: {
        color: '#011411',
        fontFamily: 'bold01',
    },
    text45:{
        marginTop: windowWidth*0.10,
        fontSize:18,
        fontFamily: 'bold01',
        marginLeft: 20,
    },
    notificationContainer: {
        position: 'relative',
        padding: normalize(2),
        marginRight: normalize(2),
      },
      notificationBadge: {
        position: 'absolute',
        right: normalize(5),
        top: normalize(5),
        backgroundColor: '#FF3B30',
        borderRadius: normalize(10),
        minWidth: normalize(15),
        height: normalize(16),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: normalize(4),
      },
      notificationCount: {
        color: '#FFFFFF',
        fontSize: normalize(12),
        fontWeight: 'bold',
      },
      bottomButtonsContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft:normalize(10),
        // justifyContent: 'space-between',
    },
    reportButton: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: normalize(2),
        minHeight: 40,
        position: 'relative',
    },
    reportBadge: {
        position: 'absolute',
        right: normalize(5),
        top: normalize(5),
        backgroundColor: '#FF3B30',
        borderRadius: normalize(10),
        minWidth: normalize(15),
        height: normalize(16),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: normalize(4),
    },
    reportCount: {
        color: '#FFFFFF',
        fontSize: normalize(12),
        fontWeight: 'bold',
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 15,
        backgroundColor: '#f8f8f8',
    },
    paginationButton: {
        backgroundColor: '#096759',
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
    },
    disabledButton: {
        backgroundColor: '#cccccc',
    },
    paginationButtonText: {
        color: 'white',
        fontFamily: 'bold01',
    },
    pageInfo: {
        fontFamily: 'regular89',
        fontSize: 16,
    },
});

export default HomeAdmin;