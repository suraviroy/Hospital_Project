import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, ScrollView, Linking } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontFamily } from '../../GlobalStyles';
import { backendURL } from "../backendapi";
import { useNavigation, useRoute } from '@react-navigation/native';

const NotiRequests = () => {
    const route = useRoute();
    const { requestId } = route.params;
    const [requestDetails, setRequestDetails] = useState(null);
    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch(`${backendURL}/patientRouter/request/${requestId}`);
            const data = await response.json();
            setRequestDetails(data[0]);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleDischargeCertificatePress = (url) => {
        Linking.openURL(url);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollContent}>
                <View style={styles.profileContainer}>
                    <Text style={styles.texthead2}>Request Details</Text>
                    {requestDetails && (
    <View style={styles.backField}>
        <Text style={styles.subHead6}>Date: {requestDetails.date}</Text>
        <Text style={styles.subHead6}>Time: {requestDetails.time}</Text>
        <Text style={styles.subHead3}>Request: {requestDetails.request}</Text>
        <Text style={styles.subHead4}>Action: {requestDetails.action}</Text>
        {requestDetails.report && requestDetails.report.isSelected !== "NA" && (
            <Text style={styles.subHead4}>New Report: {requestDetails.report.isSelected} {" "}Type:{"   "}{requestDetails.report.details}
            {requestDetails.report.certificate !== "NA" && (
                    <TouchableOpacity onPress={() => handleDischargeCertificatePress(requestDetails.report.certificate)}>
                        <Text style={{top: windowWidth*0.015,width: windowWidth*0.2,marginLeft: windowWidth*0.05,backgroundColor: '#B21515', borderRadius: 4,padding: 5, color: 'white', fontSize: 12, fontWeight: '700'}}>  Open PDF</Text>
                    </TouchableOpacity>
                )}
            </Text>
        )}
        {requestDetails.exacrebation && requestDetails.exacrebation.isSelected !== "NA" && (
            <Text style={styles.subHead2}>Exacerbation: {requestDetails.exacrebation.isSelected}    Type {" "}{requestDetails.exacrebation.details}</Text>
        )}
        {requestDetails.newProblem && requestDetails.newProblem.isSelected !== "NA" && (
            <Text style={styles.subHead2}>New Problem: {requestDetails.newProblem.isSelected}      Type {" "}{requestDetails.newProblem.details}</Text>
        )}
        {requestDetails.newConsultation && requestDetails.newConsultation.isSelected !== "NA" && (
            <View>
                <Text style={styles.subHead5}>New Consultation: {requestDetails.newConsultation.isSelected} {"\n"}Reason   {requestDetails.newConsultation.details}
                {requestDetails.newConsultation.dischargeCertificate !== "NA" && (
                    <TouchableOpacity onPress={() => handleDischargeCertificatePress(requestDetails.newConsultation.dischargeCertificate)}>
                        <Text style={{top: windowWidth*0.02,width: windowWidth*0.2,marginLeft: windowWidth*0.05,backgroundColor: '#B21515', borderRadius: 4,padding: 5, color: 'white', fontSize: 12, fontWeight: '700'}}>  Open PDF</Text>
                    </TouchableOpacity>
                )}
                </Text>
            </View>
        )}
        {requestDetails.hospitalization && requestDetails.hospitalization.isSelected !== "NA" && (
            <Text style={styles.subHead2}>Hospitalization: {requestDetails.hospitalization.isSelected}    Reason {" "}{requestDetails.hospitalization.records}</Text>
        )}
        {requestDetails.disabilities && requestDetails.disabilities.isSelected !== "NA" && (
            <Text style={styles.subHead2}>Disabilities: {requestDetails.hospitalization.isSelected}     Organ {" "}{requestDetails.disabilities.details}</Text>
        )}
        {requestDetails.demise && requestDetails.demise.isSelected !== "NA" && (
            <Text style={styles.subHead3}>Demise: {requestDetails.demise.isSelected}    deathCertificate:
             {requestDetails.demise.deathCertificate === "NA" ?  (
                 <Text style={{ borderRadius: 4, padding: 7, fontSize: 13, fontWeight: '700' }}>Not Uploaded</Text>
             ): (
                <TouchableOpacity onPress={() => handleDischargeCertificatePress(requestDetails.demise.deathCertificate)}>
                        <Text style={{top: windowWidth*-0.05,width: windowWidth*0.2,marginLeft: windowWidth*0.6,backgroundColor: '#B21515', borderRadius: 4,padding: 5, color: 'white', fontSize: 12, fontWeight: '700'}}>  Open PDF</Text>
                    </TouchableOpacity>
             ) }
            </Text>
        )}

    </View>
)}
  </View>
            </ScrollView>
        </SafeAreaView>
    );
}
export default NotiRequests;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        paddingTop: windowWidth * -0.5,
        paddingBottom: windowWidth * 0.05,
    },
    scrollContent: {
        flexGrow: 1,
    },
    profileContainer: {
        marginLeft: windowWidth * 0.01,
        marginTop: -windowWidth * 0.01,
    },
    backField: {
        marginLeft: windowWidth * 0.02,
    },
    texthead2: {
        marginLeft: windowWidth * 0.03,
        fontWeight: "600",
        fontFamily: 'extrabold01',
        fontSize: 17,
        marginTop: windowWidth * 0.02,
        marginBottom: windowWidth * 0.02,
    },
    subHead6: {
        marginTop: windowWidth * 0.01,
        width: "95%",
        height: windowWidth * 0.10,
        marginLeft: windowWidth * 0.01,
        paddingTop: windowWidth * 0.02,
        borderRadius: windowWidth * 0.01,
        backgroundColor: "#D9D9D9",
        paddingLeft: 15,
        paddingRight: 15,
        fontFamily: 'regular',
        fontWeight: "700",
        paddingBottom: windowWidth * 0.01,
        fontSize: 15,
    },
    subHead2: {
        marginTop: windowWidth * 0.01,
        width: "95%",
        height: windowWidth * 0.10,
        paddingTop: windowWidth * 0.02,
        borderRadius: windowWidth * 0.01,
        backgroundColor: "#D9D9D9",
        paddingLeft: 15,
        paddingRight: 15,
        fontFamily: 'bold02',
        fontWeight: "700",
        fontSize: 15,
    },
    subHead3:{
        marginTop: windowWidth * 0.01,
        width: "95%",
        height: windowWidth * 0.15,
        paddingTop: windowWidth * 0.02,
        borderRadius: windowWidth * 0.01,
        backgroundColor: "#D9D9D9",
        paddingLeft: 15,
        paddingRight: 15,
        fontFamily: 'bold02',
        fontWeight: "700",
        fontSize: 15,

    },
    subHead4:{
        marginTop: windowWidth * 0.01,
        width: "95%",
        height: windowWidth * 0.20,
        paddingTop: windowWidth * 0.02,
        borderRadius: windowWidth * 0.01,
        backgroundColor: "#D9D9D9",
        paddingLeft: 15,
        paddingRight: 15,
        fontFamily: 'bold02',
        fontWeight: "700",
        fontSize: 15,

    },
    subHead5:{
        marginTop: windowWidth * 0.01,
        width: "95%",
        height: windowWidth * 0.18,
        paddingTop: windowWidth * 0.02,
        borderRadius: windowWidth * 0.01,
        backgroundColor: "#D9D9D9",
        paddingLeft: 15,
        paddingRight: 15,
        fontFamily: 'bold02',
        fontWeight: "700",
        fontSize: 15,

    }
});
