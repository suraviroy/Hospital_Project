import React, { useState, useEffect } from 'react';
import { View, Platform, StatusBar, Text, StyleSheet, TouchableOpacity, Dimensions, ScrollView, Linking } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontFamily } from '../../GlobalStyles';
import { backendURL } from "../backendapi";
import { useRoute } from '@react-navigation/native';

const NotiReq = () => {
    const route = useRoute();
    const { requestId } = route.params;
    const [requestDetails, setRequestDetails] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [requestId]);

    const fetchData = async () => {
        try {
            const response = await fetch(`${backendURL}/patientRouter/request/${requestId}`);
            const data = await response.json();
            setRequestDetails(data[0]);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching data:', error);
            setLoading(false);
        }
    };

    const handleDischargeCertificatePress = (url) => {
        Linking.openURL(`${backendURL}/getfile/${url}`);
    };

    const RequestItem = ({ request }) => (
        <View style={styles.requestItem}>
            <Text style={styles.requestType}>{request.requestFor}</Text>
            {request.details !== "NA" && (
                <Text style={styles.requestDetails}>Details: {request.details}</Text>
            )}
        </View>
    );

    const ReportSection = ({ report }) => {
        if (!report || report.isSelected === "NA" || !report.multiplereport?.length) return null;
        
        return (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>New Report</Text>
                {report.multiplereport.map((item, index) => (
                    <View key={index} style={styles.reportItem}>
                        <Text style={styles.reportName}>Document: {item.details}</Text>
                        {item.certificate === 'NA' ? (
                            <Text style={styles.notUploaded}>Not Uploaded</Text>
                        ) : (
                            <TouchableOpacity 
                                onPress={() => handleDischargeCertificatePress(item.certificate)}
                                style={styles.fileButton}
                            >
                                <Text style={styles.fileButtonText}>Open File</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                ))}
            </View>
        );
    };

    const ConditionalSection = ({ title, data }) => {
        if (!data || data.isSelected === "NA") return null;
        
        return (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <View style={styles.sectionContent}>
                    <Text style={styles.sectionDetails}>
                        {data.details && data.details !== "NA" && `Details: ${data.details}`}
                        {data.records && data.records !== "NA" && `Reason: ${data.records}`}
                    </Text>
                    {(data.dischargeCertificate || data.dischargeHCertificate || data.deathCertificate) !== "NA" && (
                        <TouchableOpacity 
                            onPress={() => handleDischargeCertificatePress(
                                data.dischargeCertificate || 
                                data.dischargeHCertificate || 
                                data.deathCertificate
                            )}
                            style={styles.fileButton}
                        >
                            <Text style={styles.fileButtonText}>Open File</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>
        );
    };
    const OnlyDataSection = ({ title, data }) => {
        if (!data || data.details === "NA") return null;
        
        return (
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>{title}</Text>
                <View style={styles.sectionContent}>
                    <Text style={styles.sectionDetails}>
                        {data.details && data.details !== "NA" && `Details: ${data.details}`}
                        {data.records && data.records !== "NA" && `Reason: ${data.records}`}
                    </Text>
                   
                </View>
            </View>
        );
    };
    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </SafeAreaView>
        );
    }

    if (!requestDetails) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.errorText}>No request details found</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar 
                barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
                backgroundColor="#FFFFFF" 
                translucent={false}
            />
            <ScrollView style={styles.scrollContent}>
                <View style={styles.profileContainer}>
                    <Text style={styles.pageTitle}>Your Request</Text>
                    
                    <View style={styles.headerInfo}>
                        <Text style={styles.dateTime}>Date: {requestDetails.date}</Text>
                        <Text style={styles.dateTime}>Time: {requestDetails.time}</Text>
                    </View>

                    <View style={styles.requestsContainer} >
                        <Text style={styles.sectionTitle}>Requests</Text>
                        {requestDetails.request.map((req, index) => (
                            <RequestItem key={index} request={req} />
                        ))}
                    </View>

                    {requestDetails.action !== "NA" && (
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Action</Text>
                            <Text style={styles.actionText}>{requestDetails.action}</Text>
                        </View>
                    )}

                    <ReportSection report={requestDetails.report} />
                    
                    <OnlyDataSection title="Exacerbation" data={requestDetails.exacrebation} />
                    <OnlyDataSection title="New Problem" data={requestDetails.newProblem} />
                    <ConditionalSection title="New Consultation" data={requestDetails.newConsultation} />
                    <ConditionalSection title="Hospitalization" data={requestDetails.hospitalization} />
                    <OnlyDataSection title="Disabilities" data={requestDetails.disabilities} />
                    <ConditionalSection title="Demise" data={requestDetails.demise} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flex: 1,
    },
    profileContainer: {
        padding: 16,
    },
    pageTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        color: '#333',
    },
    headerInfo: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
        backgroundColor: '#F5F5F5',
        padding: 12,
        borderRadius: 8,
    },
    dateTime: {
        fontSize: 14,
        color: '#666',
        fontWeight: '500',
    },
    requestsContainer: {
        marginBottom: 20,
    },
    requestItem: {
        backgroundColor: '#F8F9FA',
        padding: 12,
        borderRadius: 8,
        marginBottom: 8,
        borderLeftWidth: 4,
        borderLeftColor: '#007AFF',
    },
    requestType: {
        fontSize: 16,
        fontWeight: '600',
        color: '#333',
        marginBottom: 4,
    },
    requestDetails: {
        fontSize: 14,
        color: '#666',
    },
    section: {
        marginBottom: 20,
        backgroundColor: '#F8F9FA',
        padding: 16,
        borderRadius: 8,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 12,
    },
    sectionContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    sectionDetails: {
        fontSize: 14,
        color: '#666',
        flex: 1,
    },
    reportItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#E5E5E5',
    },
    reportName: {
        fontSize: 14,
        color: '#333',
        flex: 1,
    },
    notUploaded: {
        fontSize: 13,
        color: '#666',
        fontWeight: '500',
    },
    fileButton: {
        backgroundColor: '#B21515',
        borderRadius: 4,
        padding: 8,
        minWidth: 80,
    },
    fileButtonText: {
        color: 'white',
        fontSize: 12,
        fontWeight: '700',
        textAlign: 'center',
    },
    loadingText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#666',
    },
    errorText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        color: '#DC3545',
    },
    actionText: {
        fontSize: 14,
        color: '#666',
    },
});

export default NotiReq;