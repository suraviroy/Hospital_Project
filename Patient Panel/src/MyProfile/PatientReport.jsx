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
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from "react-native-vector-icons/FontAwesome5";
import { Color } from "../../GlobalStyles";
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
import { backendURL } from "../backendapi";

const windowWidth = Dimensions.get("window").width;

const PatientReport = () => {
    const navigation = useNavigation();
    const [reportData, setReportData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Attempt to get patientId from AsyncStorage
                const storedPatientId = await AsyncStorage.getItem('patientId');
                
                if (storedPatientId) {
                    await fetchAllReportDetails(storedPatientId);
                } else {
                    // If no patientId is found in AsyncStorage
                    setError('No patient ID found');
                    setIsLoading(false);
                    Alert.alert('Error', 'No patient ID found');
                }
            } catch (error) {
                console.error('Error fetching patientId from storage:', error);
                setError('Error fetching patient ID');
                setIsLoading(false);
                Alert.alert('Error', 'Could not retrieve patient ID');
            }
        };

        fetchData();
    }, []);

    const fetchAllReportDetails = async (patientId) => {
        try {
            setIsLoading(true);
            const response = await axios.get(`${backendURL}/adminRouter/allReports/${patientId}`);
            
            if (response.data) {
                setReportData(response.data);
                setError(null);
            } else {
                throw new Error('No report details found');
            }
        } catch (err) {
            console.error('Error fetching all report details:', err);
            setError(err.message || 'Failed to fetch report details');
            Alert.alert('Error', err.message || 'Could not load report details');
        } finally {
            setIsLoading(false);
        }
    };

    const openDocument = (documentUrl) => {
        if (documentUrl && documentUrl !== 'NA') {
            Linking.openURL(`${backendURL}/getfile/${documentUrl}`).catch(err => {
                Alert.alert('Error', 'Could not open document');
            });
        } else {
            Alert.alert('No Document', 'No document available');
        }
    };
    const handleBack = () => {
        navigation.goBack();
    };
    const handleRetry = async () => {
        try {
            const storedPatientId = await AsyncStorage.getItem('patientId');
            if (storedPatientId) {
                await fetchAllReportDetails(storedPatientId);
            }
        } catch (error) {
            console.error('Retry error:', error);
            Alert.alert('Error', 'Failed to retry');
        }
    };

    if (isLoading) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#096759" />
            </View>
        );
    }

    if (error || !reportData) {
        return (
            <View style={styles.errorContainer}>
                <Text style={styles.errorText}>Failed to load report details</Text>
                <TouchableOpacity onPress={handleRetry} style={styles.retryButton}>
                    <Text style={styles.retryButtonText}>Retry</Text>
                </TouchableOpacity>
            </View>
        );
    }

    const patient = reportData.patient || {};
    const visitCounts = patient.visitCount || [];
    const reports = reportData.reports || [];
    const requests = reportData.request || [];

    return (
        <View style={styles.reqcontainer}>
            <StatusBar 
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
                backgroundColor="#FFFFFF"
                translucent={false}
            />
            <SafeAreaView>
                <ScrollView style={styles.scrollViewStyle}>
                <View style={styles.reqheader}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton14}>
                        <Text><Icon name="angle-left" size={30} color={Color.colorBlack} /></Text>
                    </TouchableOpacity>
                    <Text style={styles.text14}>All Reports</Text>
                </View>
                    <View style={styles.innercont}>
                        {/* Visits */}
                        {visitCounts.map((visit, visitIndex) => (
                            <View key={`visit-${visitIndex}`} style={styles.detailSection}>
                                <Text style={styles.sectionTitle}>Visit Details {visitCounts.length > 1 ? `#${visitIndex + 1}` : ''}</Text>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Visit Date:</Text>
                                    <Text style={styles.detailValue}>{visit.visitDate || 'N/A'}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Visit Time:</Text>
                                    <Text style={styles.detailValue}>{visit.visitTime || 'N/A'}</Text>
                                </View>

                                {/* Past Hospitalization */}
                                {visit.pastHospitalization && visit.pastHospitalization.length > 0 && (
                                    <View style={styles.subSection}>
                                        <Text style={styles.subSectionTitle}>Past Hospitalization</Text>
                                        {visit.pastHospitalization.map((hosp, hospIndex) => (
                                            hosp.yearOfHospitalization || hosp.days || hosp.reason !== 'NA'  || hosp.dischargeCertificate !== 'NA' ? (
                                                <View key={`hosp-${hospIndex}`} style={styles.subSection}>
                                                    <View style={styles.detailRow}>
                                                        <Text style={styles.detailLabel}>Year:</Text>
                                                        <Text style={styles.detailValue}>{hosp.yearOfHospitalization || 'N/A'}</Text>
                                                    </View>
                                                    <View style={styles.detailRow}>
                                                        <Text style={styles.detailLabel}>Days:</Text>
                                                        <Text style={styles.detailValue}>{hosp.days || 'N/A'}</Text>
                                                    </View>
                                                    <View style={styles.detailRow}>
                                                        <Text style={styles.detailLabel}>Reason:</Text>
                                                        <Text style={styles.detailValue}>{hosp.reason || 'N/A'}</Text>
                                                    </View>
                                                    {hosp.dischargeCertificate && hosp.dischargeCertificate !== 'NA' && (
                                                        <TouchableOpacity 
                                                            style={styles.documentItem}
                                                            onPress={() => openDocument(hosp.dischargeCertificate)}
                                                        >
                                                            <Icon name="file-pdf" size={24} color="#FF4444" />
                                                            <View style={styles.documentDetails}>
                                                                <Text style={styles.documentName}>Discharge Certificate</Text>
                                                                <Text style={styles.documentLink}>View Document</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )}
                                                </View>
                                            ) : null
                                        ))}
                                    </View>
                                )}

                                {/* Other Documents */}
                                {visit.otherdocuments && visit.otherdocuments.length > 0 && (
                                    <View style={styles.subSection}>
                                        <Text style={styles.subSectionTitle}>Other Documents</Text>
                                        {visit.otherdocuments.map((doc, docIndex) => (
                                            doc.documentname !== 'NA' && doc.document !== 'NA' ? (
                                                <TouchableOpacity 
                                                    key={`other-doc-${docIndex}`}
                                                    style={styles.documentItem}
                                                    onPress={() => openDocument(doc.document)}
                                                >
                                                    <Icon name="file-pdf" size={24} color="#FF4444" />
                                                    <View style={styles.documentDetails}>
                                                        <Text style={styles.documentName}>{doc.documentname}</Text>
                                                        <Text style={styles.documentLink}>View Document</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            ) : null
                                        ))}
                                    </View>
                                )}

                                {/* Prescription */}
                                {visit.prescription && visit.prescription.length > 0 && (
                                    <View style={styles.subSection}>
                                        <Text style={styles.subSectionTitle}>Prescriptions</Text>
                                        {visit.prescription.map((presc, prescIndex) => (
                                            presc.prescriptiondocument && presc.prescriptiondocument !== 'NA' ? (
                                                <TouchableOpacity 
                                                    key={`presc-${prescIndex}`}
                                                    style={styles.documentItem}
                                                    onPress={() => openDocument(presc.prescriptiondocument)}
                                                >
                                                    <Icon name="file-pdf" size={24} color="#FF4444" />
                                                    <View style={styles.documentDetails}>
                                                        <Text style={styles.documentName}>Prescription</Text>
                                                        <Text style={styles.documentLink}>View Document</Text>
                                                    </View>
                                                </TouchableOpacity>
                                            ) : null
                                        ))}
                                    </View>
                                )}
                            </View>
                        ))}

                        {/* Reports */}
                        {reports.map((report, reportIndex) => (
                            <View key={`report-${reportIndex}`} style={styles.detailSection}>
                                <Text style={styles.sectionTitle}>Report {reports.length > 1 ? `#${reportIndex + 1}` : ''}</Text>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Date:</Text>
                                    <Text style={styles.detailValue}>{report.date}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Time:</Text>
                                    <Text style={styles.detailValue}>{report.time}</Text>
                                </View>

                                {/* Uploaded Documents */}
                                {report.multipledocument && report.multipledocument.length > 0 && (
                                    <>
                                        <Text style={styles.subSectionTitle}>Uploaded Documents</Text>
                                        {report.multipledocument.map((doc, docIndex) => (
                                            <TouchableOpacity 
                                                key={`report-doc-${docIndex}`} 
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
                                    </>
                                )}
                            </View>
                        ))}

                        {/* Requests */}
                        {requests.map((request, requestIndex) => (
                            <View key={`request-${requestIndex}`} style={styles.detailSection}>
                                <Text style={styles.sectionTitle}>Request Details {requests.length > 1 ? `#${requestIndex + 1}` : ''}</Text>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Date:</Text>
                                    <Text style={styles.detailValue}>{request.date}</Text>
                                </View>
                                <View style={styles.detailRow}>
                                    <Text style={styles.detailLabel}>Time:</Text>
                                    <Text style={styles.detailValue}>{request.time}</Text>
                                </View>

                                {/* New Consultation */}
                                {request.newConsultation?.isSelected === "yes" && (
                                    <View style={styles.subSection}>
                                        <Text style={styles.subSectionTitle}>New Consultation</Text>
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Selected:</Text>
                                            <Text style={styles.detailValue}>{request.newConsultation?.isSelected}</Text>
                                        </View>
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Details:</Text>
                                            <Text style={styles.detailValue}>{request.newConsultation?.details}</Text>
                                        </View>
                                        {request.newConsultation.dischargeCertificate && request.newConsultation.dischargeCertificate !== 'NA' && (
                                                        <TouchableOpacity 
                                                            style={styles.documentItem}
                                                            onPress={() => openDocument(request.newConsultation.dischargeCertificate)}
                                                        >
                                                            <Icon name="file-pdf" size={24} color="#FF4444" />
                                                            <View style={styles.documentDetails}>
                                                                <Text style={styles.documentName}>Report</Text>
                                                                <Text style={styles.documentLink}>View Document</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )}
                                    </View>
                                )}

                                {/* Hospitalization */}
                                {request.hospitalization?.isSelected === "yes" && (
                                    <View style={styles.subSection}>
                                        <Text style={styles.subSectionTitle}>Hospitalization</Text>
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Selected:</Text>
                                            <Text style={styles.detailValue}>{request.hospitalization?.isSelected}</Text>
                                        </View>
                                        {request.hospitalization.dischargeHCertificate && request.hospitalization.dischargeHCertificate !== 'NA' && (
                                                        <TouchableOpacity 
                                                            style={styles.documentItem}
                                                            onPress={() => openDocument(request.hospitalization.dischargeHCertificate)}
                                                        >
                                                            <Icon name="file-pdf" size={24} color="#FF4444" />
                                                            <View style={styles.documentDetails}>
                                                                <Text style={styles.documentName}>Discharge Certificate</Text>
                                                                <Text style={styles.documentLink}>View Document</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )}
                                    </View>
                                )}

                                {/* Demise */}
                                {request.demise?.isSelected === "yes" && (
                                    <View style={styles.subSection}>
                                        <Text style={styles.subSectionTitle}>Demise</Text>
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Selected:</Text>
                                            <Text style={styles.detailValue}>{request.demise?.isSelected}</Text>
                                        </View>
                                        {request.demise.deathCertificate && request.demise.deathCertificate !== 'NA' && (
                                                        <TouchableOpacity 
                                                            style={styles.documentItem}
                                                            onPress={() => openDocument(request.demise.deathCertificate)}
                                                        >
                                                            <Icon name="file-pdf" size={24} color="#FF4444" />
                                                            <View style={styles.documentDetails}>
                                                                <Text style={styles.documentName}>Demise Report</Text>
                                                                <Text style={styles.documentLink}>View Document</Text>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )}
                                    </View>
                                )}

                                {/* Report */}
                                {request.report?.isSelected === "yes" && (
                                    <View style={styles.subSection}>
                                        <Text style={styles.subSectionTitle}>Report</Text>
                                        <View style={styles.detailRow}>
                                            <Text style={styles.detailLabel}>Selected:</Text>
                                            <Text style={styles.detailValue}>{request.report?.isSelected}</Text>
                                        </View>
                                        {request.report.multiplereport && request.report.multiplereport.length > 0 && (
                                    <>
                                        <Text style={styles.subSectionTitle}>Uploaded Documents</Text>
                                        {request.report.multiplereport.map((doc, docIndex) => (
                                            <TouchableOpacity 
                                                key={`report-doc-${docIndex}`} 
                                                style={styles.documentItem}
                                                onPress={() => openDocument(doc.certificate)}
                                            >
                                                <Icon name="file-pdf" size={24} color="#FF4444" />
                                                <View style={styles.documentDetails}>
                                                    <Text style={styles.documentName}>{doc.details}</Text>
                                                    <Text style={styles.documentLink}>View Document</Text>
                                                </View>
                                            </TouchableOpacity>
                                        ))}
                                    </>
                                )}
                                    </View>
                                )}
                            </View>
                        ))}
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
        paddingTop: windowWidth * 0.05,
    },
    scrollViewStyle: {
        marginBottom: windowWidth * 0.02,
        paddingBottom: 10,
        elevation: 5,
        backgroundColor: Color.colorWhite
    },
    text14: {
        fontWeight: "bold",
        fontSize: 25,
        marginLeft: windowWidth * 0.15,
        marginTop: windowWidth * 0.05,
        fontFamily: 'regular01',
    },
    reqheader: {
        flexDirection: 'row',
        // alignItems: 'center',
        width: '100%',
        height: windowWidth * 0.25,
        marginHorizontal: windowWidth * 0.025,
        // marginBottom: windowWidth * 0.01,
        // marginTop: windowWidth * 0.05,
        // elevation: 5
    },
    backButton14: {
        marginRight: windowWidth * 0.01,
        marginLeft: windowWidth * 0.05,
        marginTop: windowWidth * 0.05,
        position: 'absolute',
        left: 0,
    },
    innercont: {
        marginBottom: windowWidth * 0.08,
        padding: 15,
        marginTop:-windowWidth*0.08
    },
    detailSection: {
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        elevation: 2,
    },
    subSection: {
        backgroundColor: '#f0f0f0',
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#096759',
    },
    subSectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 5,
        color: '#357EEA',
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
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
        padding: 12,
        marginTop: 10,
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
        color: '#357EEA',
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

export default PatientReport;