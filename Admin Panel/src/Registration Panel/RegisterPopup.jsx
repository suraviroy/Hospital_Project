import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator, Linking, Dimensions } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from 'react-native-vector-icons';
const windowWidth = Dimensions.get('window').width;

const openEmail = (email, patientName, patientId, password) => {
    if (!email) {
        alert("Sorry!! You have not provided any email.");
        return;
    }
    const subject = "Patient Registration Details";
    const body =
        `Congratulations!! ${patientName}
You are Successfully Registered!!

Your Patient ID: ${patientId}

Your Login Credentials
    Username: ${patientId}
    Password: ${password}

Please use this username and password 
to login into our system

Thank You,
Best Wishes From IPCR `;
    Linking.openURL(`mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
};
const RegisterPopup = ({ visible, setVisible, loading, patientName, handleCancel, patientId, email, contactNumber, password }) => {
    return (
        <Modal transparent visible={visible}>
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    {loading ? (
                        <View style={styles.loadingContainer}>
                            <ActivityIndicator size="large" color="#0000ff" />
                            <Text style={styles.loadingText}>Loading...</Text>
                        </View>
                    ) : (
                        <>
                            <View style={styles.header}>
                                <Image source={require("../../assets/images/confirmation.gif")} style={styles.gif} />
                                <TouchableOpacity style={styles.closeButton} onPress={() => { setVisible(false); handleCancel(); }}>
                                    <Ionicons name="close-circle" size={25} color={'#8E7D7D'} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.content}>
                                <Text style={styles.text}>The Patient is Registered Successfully!!</Text>
                                <View style={styles.info}>
                                    <Text style={styles.infoText}>Patient Name: {patientName}</Text>
                                    <Text style={styles.infoText}>Patient ID: {patientId}</Text>
                                    <Text style={styles.infoText}>Email: {email}</Text>
                                    <Text style={styles.infoText}>Phone Number: {contactNumber}</Text>
                                </View>
                                <View style={styles.bottom}>
                                    <View style={styles.insideBottom}>
                                        <Text style={styles.insideText}>Username: {patientId}</Text>
                                        <Text style={styles.insideText}>Password: {password}</Text>
                                    </View>
                                    <View style={styles.BelowBottom}>
                                        <TouchableOpacity style={styles.gmailButton} onPress={() => openEmail(email, patientName, patientId, password)}>
                                            <MaterialCommunityIcons name="gmail" size={20} color={'#000000'} />
                                            <Text style={styles.BelowText}>Send To Gmail</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.callButton}>
                                            <MaterialCommunityIcons name="phone-message" size={20} color={'#000000'} />
                                            <Text style={styles.BelowText}>Send To Phone Number</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </>
                    )}
                </View>
            </View>
        </Modal>
    );
};

export default RegisterPopup;
const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    modalContainer: {
        width: windowWidth * 0.8, 
        backgroundColor: '#D3F1ED',
        paddingHorizontal: 0.03 * windowWidth, 
        paddingVertical: 5,
        borderRadius: 20,
        elevation: 20,
    },
    header: {
        width: '100%',
        height: 0.1 * windowWidth, 
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginBottom: 0.1 * windowWidth,
    },
    closeButton: {
        position: 'absolute',
        right: 5,
    },
    text: {
        fontSize: 0.04 * windowWidth, 
        fontFamily: 'bold09',
        textAlign: 'center',
    },
    info: {
        marginTop: 0.02 * windowWidth, 
        marginLeft: 5,
    },
    infoText: {
        fontSize: 0.032 * windowWidth, 
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#000000',
        padding: 2,
    },
    gif: {
        height: 0.3 * windowWidth, 
        width: 0.3 * windowWidth,
        aspectRatio: 1,
        marginTop: 0.08 * windowWidth, 
    },
    bottom: {
        margin: 0.03 * windowWidth, 
        backgroundColor: '#1E7568',
        height: 0.40 * windowWidth,
        width: 0.69 * windowWidth,
        borderRadius: 20,
    },
    insideBottom: {
        margin: 0.02 * windowWidth,
    },
    insideText: {
        fontSize: 0.032 * windowWidth,
        fontFamily: 'Roboto',
        fontWeight: 'bold',
        color: '#FFFFFF',
        padding: 2,
    },
    BelowBottom: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    gmailButton: {
        padding: 0.02 * windowWidth, 
        flexDirection: 'row',
        backgroundColor: '#DBF4F1',
        width: 0.43 * windowWidth, 
        borderRadius: 8,
    },
    BelowText: {
        fontSize: 0.027 * windowWidth,
        fontFamily: 'bold09',
        marginLeft: 0.02 * windowWidth,
        color: "#000000",
        alignItems: 'center',
        justifyContent: 'center',
    },
    callButton: {
        marginTop: 0.03 * windowWidth, 
        padding: 0.02 * windowWidth,
        flexDirection: 'row',
        backgroundColor: '#A5F3CE',
        width: 0.43* windowWidth,
        borderRadius: 8,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        fontFamily: 'bold09',
    },
});



