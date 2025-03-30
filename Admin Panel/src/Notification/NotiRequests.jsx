import React, { useState, useEffect } from 'react';
import { View, Text, Platform,StatusBar,StyleSheet, TouchableOpacity, Image, FlatList, Dimensions, ScrollView, Linking } from 'react-native';
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
        Linking.openURL(`${backendURL}/getfile/${url}`);
    };

    return (
        <SafeAreaView style={styles.container}>
             <StatusBar 
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
            backgroundColor="#FFFFFF" 
            translucent={false}
        />
            <ScrollView style={styles.scrollContent}>
                <View style={styles.profileContainer}>
                    <Text style={styles.texthead2}>Request Details</Text>
                    {requestDetails && (
    <View style={styles.backField}>
        <Text style={styles.subHead6}>Date: {requestDetails.date}</Text>
        <Text style={styles.subHead6}>Time: {requestDetails.time}</Text>
        <View>
    {requestDetails.request.map((req, index) => (
        <View key={index} >
            <Text style={styles.subHead3}>
                {req.requestFor ? `Request for: ${req.requestFor}` : ''}
                {req.details !=='NA' ? ` Details - ${req.details}` : ''}
            </Text>
        </View>
    ))}
</View>
        <Text style={styles.subHead4}>Action: {requestDetails.action}</Text>
        {/* {requestDetails.report && requestDetails.report.isSelected !== "NA" && (
            <Text style={styles.subHead4}>New Report: {requestDetails.report.isSelected} {" "}Type:{"   "}{requestDetails.report.details}
            {requestDetails.report.certificate !== "NA" && (
                    <TouchableOpacity onPress={() => handleDischargeCertificatePress(requestDetails.report.certificate)}>
                        <Text style={{top: windowWidth*0.015,width: windowWidth*0.2,marginLeft: windowWidth*0.05,backgroundColor: '#B21515', borderRadius: 4,padding: 5, color: 'white', fontSize: 12, fontWeight: '700'}}>  Open File</Text>
                    </TouchableOpacity>
                )}
            </Text>
        )} */}
        {requestDetails.report && requestDetails.report.isSelected !== "NA" && requestDetails.report.multiplereport.length>0 && (             <Text style={styles.subHead4}>New Report: {requestDetails.report.isSelected} {" "}</Text>)}
        {requestDetails.report && 
 requestDetails.report.isSelected !== "NA" && 
 requestDetails.report.multiplereport && 
 requestDetails.report.multiplereport.length > 0 && (
//    <Text style={styles.subHead4}>
//      New Report: {requestDetails.report.isSelected} {" "}
//      Type:{" "}
     <View style={styles.subHead4}>
       {requestDetails.report.multiplereport.map((multiplereport, index) => (
         <View key={index} style={styles.hospitalizationItem}>
           <Text style={styles.subHead4}>Document Name: {multiplereport.details}{'\n'}</Text>
           {multiplereport.certificate === 'NA' ? (
             <Text style={{ 
               borderRadius: 4, 
               padding: 7, 
               fontSize: 13, 
               fontWeight: 'bold', 
               fontFamily: 'extrabold01',
             }}>
               Not Uploaded
             </Text>
           ) : (
             <TouchableOpacity 
               onPress={() => handleDischargeCertificatePress(multiplereport.certificate)}
             >
               <Text style={{
                 marginLeft: windowWidth * 0.05,
                 width: windowWidth * 0.2, 
                 backgroundColor: '#B21515', 
                 borderRadius: 4, 
                 marginTop:-windowWidth*0.03,
                 padding: windowWidth*0.02, 
                 color: 'white', 
                 fontSize: 12, 
                 fontWeight: '700' 
               }}>
                 Open File
               </Text>
             </TouchableOpacity>
           )}
         </View>
       ))}
     </View>
//    </Text>
)}
        {requestDetails.exacrebation && requestDetails.exacrebation.isSelected !== "NA" && (
            <Text style={styles.subHead2}>Exacerbation: {requestDetails.exacrebation.isSelected}    Type: {" "}{requestDetails.exacrebation.details}</Text>
        )}
        {requestDetails.newProblem && requestDetails.newProblem.isSelected !== "NA" && (
            <Text style={styles.subHead2}>New Problem: {requestDetails.newProblem.isSelected}      Type: {" "}{requestDetails.newProblem.details}</Text>
        )}
        {requestDetails.newConsultation && requestDetails.newConsultation.isSelected !== "NA" && (
            <View>
                <Text style={styles.subHead5}>New Consultation: {requestDetails.newConsultation.isSelected} {"\n"}Reason   {requestDetails.newConsultation.details}
                {requestDetails.newConsultation.dischargeCertificate !== "NA" && (
                    <TouchableOpacity onPress={() => handleDischargeCertificatePress(requestDetails.newConsultation.dischargeCertificate)}>
                        <Text style={{top: windowWidth*0.02,width: windowWidth*0.2,marginLeft: windowWidth*0.05,backgroundColor: '#B21515', borderRadius: 4,padding: 5, color: 'white', fontSize: 12, fontWeight: '700'}}>  Open File</Text>
                    </TouchableOpacity>
                )}
                </Text>
            </View>
        )}
        {requestDetails.hospitalization && requestDetails.hospitalization.isSelected !== "NA" && (
            <Text style={styles.subHead5}>Hospitalization: {requestDetails.hospitalization.isSelected}    Reason: {" "}{requestDetails.hospitalization.records}
              {requestDetails.hospitalization.dischargeHCertificate !== "NA" && (
                    <TouchableOpacity onPress={() => handleDischargeCertificatePress(requestDetails.hospitalization .dischargeHCertificate)}>
                        <Text style={{top: windowWidth*0.02,width: windowWidth*0.2,marginLeft: windowWidth*0.05,backgroundColor: '#B21515', borderRadius: 4,padding: 5, color: 'white', fontSize: 12, fontWeight: '700'}}>  Open File</Text>
                    </TouchableOpacity>
                )}</Text>
        )}
        {requestDetails.disabilities && requestDetails.disabilities.isSelected !== "NA" && (
            <Text style={styles.subHead2}>Disabilities: {requestDetails.hospitalization.isSelected}     Organ: {" "}{requestDetails.disabilities.details}</Text>
        )}
        {requestDetails.demise && requestDetails.demise.isSelected !== "NA" && (
            <Text style={styles.subHead3}>Demise: {requestDetails.demise.isSelected}    deathCertificate:
             {requestDetails.demise.deathCertificate === "NA" ?  (
                 <Text style={{ borderRadius: 4, padding: 7, fontSize: 13, fontWeight: '700' }}>Not Uploaded</Text>
             ): (
                <TouchableOpacity onPress={() => handleDischargeCertificatePress(requestDetails.demise.deathCertificate)}>
                        <Text style={{top: windowWidth*-0.05,width: windowWidth*0.2,marginLeft: windowWidth*0.6,backgroundColor: '#B21515', borderRadius: 4,padding: 5, color: 'white', fontSize: 12, fontWeight: '700'}}>  Open File</Text>
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
        marginLeft: windowWidth * 0.01,
        paddingTop: windowWidth * 0.02,
        borderRadius: windowWidth * 0.01,
        backgroundColor: '#F1F4F3',
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
        paddingTop: windowWidth * 0.02,
        borderRadius: windowWidth * 0.01,
        backgroundColor: '#F1F4F3',
        paddingLeft: 15,
        paddingRight: 15,
        fontFamily: 'bold02',
        fontWeight: "700",
        fontSize: 15,
        paddingBottom: windowWidth * 0.02,
    },
    subHead3:{
        marginTop: windowWidth * 0.01,
        width: "95%",
        paddingTop: windowWidth * 0.02,
        borderRadius: windowWidth * 0.01,
        backgroundColor: '#F1F4F3',
        paddingLeft: 15,
        paddingRight: 15,
        fontFamily: 'bold02',
        fontWeight: "700",
        fontSize: 15,
        paddingBottom: windowWidth * 0.02,
    },
    subHead4:{
        marginTop: windowWidth * 0.01,
        width: "95%",
        paddingTop: windowWidth * 0.02,
        borderRadius: windowWidth * 0.01,
        backgroundColor: '#F1F4F3',
        paddingLeft: 15,
        paddingRight: 15,
        fontFamily: 'bold02',
        fontWeight: "700",
        fontSize: 15,
        paddingBottom: windowWidth * 0.02,
    },
    subHead5:{
        marginTop: windowWidth * 0.01,
        width: "95%",
        paddingTop: windowWidth * 0.02,
        borderRadius: windowWidth * 0.01,
        backgroundColor: "#F1F4F3",
        paddingLeft: 15,
        paddingRight: 15,
        fontFamily: 'bold02',
        fontWeight: "700",
        fontSize: 15,
        paddingBottom: windowWidth * 0.02,
    }
});
