import React, { useState, useEffect } from "react";
import { 
    View, 
    Platform, 
    StatusBar, 
    StyleSheet, 
    Text, 
    Dimensions, 
    TouchableOpacity, 
    SafeAreaView, 
    ScrollView, 
    ActivityIndicator, 
    Linking,
    Alert
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { Color } from "../../GlobalStyles";
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { backendURL } from "../backendapi";

const windowWidth = Dimensions.get("window").width;

const NotiReport = () => {
    const route = useRoute();
    const navigation = useNavigation();
    const [reportDetails, setReportDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchReportDetails();
    }, []);

    const fetchReportDetails = async () => {
        try {
          
            const { reportId } = route.params || {};
            
            if (!reportId) {
                throw new Error('Report ID is required');
            }

            const response = await axios.get(`${backendURL}/adminRouter/reports/${reportId}`);
            
            if (response.data && response.data.length > 0) {
                setReportDetails(response.data[0]);
            } else {
                throw new Error('No report details found');
            }
            setIsLoading(false);
        } catch (err) {
            console.error('Error fetching report details:', err);
            setError(err.message);
            setIsLoading(false);
            Alert.alert('Error', err.message);
        }
    };

  
    const openDocument = (documentUrl) => {
        if (documentUrl) {
            Linking.openURL(`${backendURL}/getfile/${documentUrl}`).catch(err => {
                Alert.alert('Error', 'Could not open document');
            });
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#096759" />
            </View>
        );
    }

    if (error || !reportDetails) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load report details</Text>
                <TouchableOpacity onPress={fetchReportDetails} style={styles.retryButton}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.reqcontainer}>
            <StatusBar 
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
                backgroundColor="#FFFFFF"
                translucent={false}
            />
            <SafeAreaView>
                {/* <View style={styles.reqheader}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton14}>
                        <Text><Icon name="angle-left" size={30} color={Color.colorBlack} /></Text>
                    </TouchableOpacity>
                    <Text style={styles.text14}>Report Details</Text>
                </View> */}
                <ScrollView style={{ marginBottom: windowWidth * 0.23, paddingBottom: 10, elevation: 5, backgroundColor: Color.colorWhite }}>
                    <View style={styles.innercont}>
                        {/* Patient Information */}
                        {/* <View style={styles.detailSection}>
                            <Text style={styles.sectionTitle}>Patient Information</Text>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Patient ID:</Text>
                                <Text style={styles.detailValue}>{reportDetails.patientId}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Name:</Text>
                                <Text style={styles.detailValue}>{reportDetails.name}</Text>
                            </View>
                        </View> */}

                        {/* Report Information */}
                        <View style={styles.detailSection}>
                            <Text style={styles.sectionTitle}>Report Details</Text>
                            <View style={styles.detailRow}>
                                {/* <Text style={styles.detailLabel}>Report ID:</Text>
                                <Text style={styles.detailValue}>{reportDetails.reportId}</Text> */}
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Date:</Text>
                                <Text style={styles.detailValue}>{reportDetails.date}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Time:</Text>
                                <Text style={styles.detailValue}>{reportDetails.time}</Text>
                            </View>
                            <View style={styles.detailRow}>
                                <Text style={styles.detailLabel}>Coordinator:</Text>
                                <Text style={styles.detailValue}>{reportDetails.coordinatorName}</Text>
                            </View>
                        </View>

                        {/* Documents */}
                        <View style={styles.detailSection}>
                            <Text style={styles.sectionTitle}>Uploaded Documents</Text>
                            {reportDetails.multipledocument.map((doc, index) => (
                                <TouchableOpacity 
                                    key={doc._id} 
                                    style={styles.documentItem}
                                    onPress={() => openDocument(doc.document)}
                                >
                                    <Icon name="file-pdf" size={24} color="#FF4444" />
                                    <View style={styles.documentDetails}>
                                        <Text style={styles.documentName}>{doc.documentname}</Text>
                                        <Text style={styles.documentLink}>View Document</Text>
                                    </View>
                                </TouchableOpacity>
                            ))}
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    reqcontainer: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: windowWidth * 0.05,
    },
    reqheader: {
        flexDirection: 'row',
        width: '100%',
        height: windowWidth * 0.25,
        marginHorizontal: windowWidth * 0.025,
        marginBottom: windowWidth * 0.01,
    },
    backButton14: {
        marginRight: windowWidth * 0.01,
        marginLeft: windowWidth * 0.01,
        marginTop: windowWidth * 0.12,
        position: 'absolute',
        left: 0,
    },
    text14: {
        fontWeight: "bold",
        fontSize: 25,
        marginLeft: windowWidth * 0.08,
        marginTop: windowWidth * 0.12,
        fontFamily: 'regular01',
    },
    innercont: {
        marginBottom: windowWidth * 0.08,
        padding: 15,
    },
    detailSection: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#096759',
    },
    detailRow: {
        flexDirection: 'row',
        marginBottom: 8,
    },
    detailLabel: {
        fontWeight: 'bold',
        marginRight: 10,
        width: '40%',
    },
    detailValue: {
        flex: 1,
    },
    documentItem: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 12,
        marginBottom: 10,
    },
    documentDetails: {
        marginLeft: 12,
        flex: 1,
    },
    documentName: {
        fontSize: 16,
        fontWeight: '600',
    },
    documentLink: {
        color: '#096759',
        marginTop: 5,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    errorText: {
        fontSize: 18,
        color: 'red',
        textAlign: 'center',
    },
    retryButton: {
        backgroundColor: '#357EEA',
        padding: 10,
        borderRadius: 5,
        marginTop: 15,
    },
    retryButtonText: {
        color: 'white',
        textAlign: 'center',
    },
});

export default NotiReport;