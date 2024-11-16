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
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const scale = screenWidth / 375;
const normalize = (size) => Math.round(scale * size);

const HomeAdmin = ({ searchText }) => {
    const navigation = useNavigation();
    const [adminList, setAdminList] = useState([]);
    const [filteredAdminList, setFilteredAdminList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingAdmins, setLoadingAdmins] = useState({});
    const [loadingNoti, setloadingNoti] = useState({});
    const [notificationCounts, setNotificationCounts] = useState({});

    const fetchAdminList = useCallback(async () => {
        try {
            const response = await fetch(adminListURL);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setAdminList(data);
            setFilteredAdminList(data);
            setLoading(false);

            const notificationCountPromises = data.map(async (admin) => {
                const countResponse = await fetch(`${getNotificationCountURL}${admin.idNumber}`);
                const { count } = await countResponse.json();
                return { [admin.idNumber]: count };
            });
            const notificationCountResults = await Promise.all(notificationCountPromises);
            const notificationCountsObj = notificationCountResults.reduce((acc, cur) => ({
                ...acc,
                ...cur,
            }), {});
            setNotificationCounts(notificationCountsObj);
        } catch (error) {
            console.error('Error fetching admin list:', error);
            setLoading(false);
        }
    }, [adminList]);

    useEffect(() => {
        fetchAdminList();
    }, [fetchAdminList]);

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
    const openDial = useCallback((phNumber) => {
        try {
            console.log('Raw phone number:', phNumber);
            if (!phNumber) {
                console.error('Phone number is undefined or null');
                return;
            }
    
            const cleanNumber = phNumber.toString().replace(/\D/g, '');
            
            console.log('Cleaned phone number:', cleanNumber);
    
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
            
            Linking.canOpenURL(dialURL).then(supported => {
                if (supported) {
                    Linking.openURL(dialURL).catch(err => {
                        console.error('Error opening dial URL:', err);
                    });
                } else {
                    console.log(`Cannot open dial for number: ${formattedNumber}`);
                }
            }).catch(err => {
                console.error('Error checking URL support:', err);
            });
        } catch (error) {
            console.error('Error in openDial function:', error);
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
    const Item = ({ name, educationQualification, picture, gender, idNumber, date, time, phNumber }) => (
        <View style={styles.item}>
            <View style={styles.leftContent}>
                {picture ? (
                    <Image source={{ uri: picture }} style={styles.picture} />
                ) : (
                    <Image source={require('../../assets/images/user.png')} style={styles.picture} />
                )}
                <View style={styles.infoContainer}>
                    <View style={styles.nameContainer}>
                        <Text  style={styles.name}>{name}</Text>
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
                        style={styles.viewPatientButton}
                    >
                        {loadingAdmins[name] ? (
                            <View style={styles.loadingIndicator}>
                                <ActivityIndicator size="small" color="#E14526" />
                            </View>
                        ) : (
                            <Text style={styles.viewPatientText}>View Patient</Text>
                        )}
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style={styles.callButton} 
                        onPress={() => openDial(phNumber)}
                    >
                        <Ionicons name="call-sharp" size={20} style={styles.callIcon} />
                        <Text style={styles.callText}>Call</Text>
                    </TouchableOpacity>
                </View>
            </View>
            
            <View style={styles.registeredOnContainer}>
                <Text style={styles.registeredOnText}>
                    Registered On: <Text style={styles.datetime}>{date}, {time}</Text>
                    <TouchableOpacity
                    style={styles.notificationContainer}
                    onPress={() => handleNotificationPress(idNumber)}
                    disabled={loadingNoti[idNumber]}
                >
                    {loadingNoti[idNumber] ? (
                        <ActivityIndicator size={normalize(25)} color="#096759" marginLeft={normalize(60)} />
                    ) : (
                        <Ionicons
                            name="notifications-outline"
                            size={normalize(25)}
                            color="#096759"
                            marginLeft={normalize(60)}
                        />
                    )}
                    {notificationCounts[idNumber] > 0 && !loadingNoti[idNumber] && (
                        <View style={styles.notificationBadge}>
                            <Text style={styles.notificationCount}>
                                {notificationCounts[idNumber] > 99 ? '99+' : notificationCounts[idNumber]}
                            </Text>
                        </View>
                    )}
                </TouchableOpacity>
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
        minHeight: windowWidth * 0.4,
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
    notificationContainer: {
        position: 'relative',
        padding: normalize(2),
        marginRight: normalize(4),
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
        marginBottom: 10,
    },
    viewPatientText: {
        borderWidth: 1.5,
        borderRadius: 5,
        fontSize: 13,
        color: "#E14526",
        borderColor: "#E14526",
        padding: 8,
        textAlign: 'center',
    },
    callButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1.5,
        borderRadius: 5,
        borderColor: "#096759",
        padding: 8,
    },
    callIcon: {
        color: '#096759',
        marginRight: 5,
    },
    callText: {
        color: "#096759",
        fontSize: 14,
    },
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
        fontSize: 11,
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
        marginRight: normalize(4),
      },
      notificationBadge: {
        position: 'absolute',
        right: 0,
        top: 0,
        backgroundColor: '#FF3B30',
        borderRadius: normalize(10),
        minWidth: normalize(15),
        height: normalize(15),
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: normalize(4),
      },
      notificationCount: {
        color: '#FFFFFF',
        fontSize: normalize(12),
        fontWeight: 'bold',
      },
});

export default HomeAdmin;