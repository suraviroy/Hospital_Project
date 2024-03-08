import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const RegisterFirst = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.registerTextContainer}>
                    <Text style={styles.registerText}>Register New Patient</Text>
                </View>
                <View style={styles.profileContainer}>
                    <Image source={require("../../assets/images/user2.png")} style={styles.profileImage} />
                    <Text style={styles.profileText}>Default Profile Picture</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.label}>Patient Name:</Text>
                    <Text style={styles.value}>Mark Smith</Text>
                    <Text style={styles.label}>Age:</Text>
                    <Text style={styles.value}>30</Text>
                    <Text style={styles.label}>Gender:</Text>
                    <Text style={styles.value}>Male</Text>
                    <Text style={styles.label}>Patient ID:</Text>
                    <Text style={styles.value}>P1234</Text>
                    <Text style={styles.label}>Contact Number:</Text>
                    <Text style={styles.value}>+911234567890</Text>
                    <Text style={styles.label}>Consulting Doctor:</Text>
                    <Text style={styles.value}>Dr. Parthasarathi Bhattacharyya</Text>
                    <Text style={styles.label}>Email:</Text>
                    <Text style={styles.value}>mark.smith@example.com</Text>
                    <Text style={styles.label}>Blood Group:</Text>
                    <Text style={styles.value}>A+</Text>
                    <Text style={styles.label}>Address:</Text>
                    <Text style={styles.value}>123 Main Street, City</Text>
                    <Text style={styles.label}>State:</Text>
                    <Text style={styles.value}>West Bengal</Text>
                    <Text style={styles.label}>Country:</Text>
                    <Text style={styles.value}>India</Text>
                    <Text style={styles.label}>Local Contact Name:</Text>
                    <Text style={styles.value}>Mary Smith</Text>
                    <Text style={styles.label}>Local Contact Relation:</Text>
                    <Text style={styles.value}>Spouse</Text>
                    <Text style={styles.label}>Local Contact Number:</Text>
                    <Text style={styles.value}>+911234567980</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={[styles.button, styles.deleteButton]} >
                        <Text style={[styles.buttonText, styles.deleteText]}>Delete</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.button, styles.updateButton]} >
                        <Text style={[styles.buttonText, styles.updateText]}>Update</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContent: {
        flexGrow: 1,
    },
    registerTextContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    registerText: {
        fontSize: 26,
        fontWeight: 'bold',
    },
    profileContainer: {
        alignItems: 'center',
        marginTop: 20,
    },
    profileImage: {
        width: 150,
        height: 150,
        resizeMode: 'cover',
        borderRadius: 75,
    },
    profileText: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
    detailsContainer: {
        marginTop: 20,
        paddingHorizontal: 20,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 10,
    },
    value: {
        fontSize: 16,
        marginTop: 5,
    },
    buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: 20, 
    marginTop: 'auto', 
},
    button: {
        height: 52,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5,
        width: '45%',
    },
    deleteButton: {
        backgroundColor: '#FFFFFF',
        borderWidth: 1,
        borderColor: 'red',
    },
    deleteText: {
        color: 'red',
    },
    updateButton: {
        backgroundColor: '#008080',
    },
    updateText: {
        color: '#FFFFFF',
    },
    buttonText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RegisterFirst;

