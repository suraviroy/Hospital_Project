import React, { useState } from 'react';
import { View, Text,SafeAreaView, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Ionicons } from 'react-native-vector-icons';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const Patient = () => {
    const [selectedTab, setSelectedTab] = useState("Today");

    const handleTabPress = (tab) => {
        setSelectedTab(tab);
    };

    return (
        <SafeAreaView>
            <View style={styles.adminRow012}>
                <Text style={styles.text013}>Registered Patients</Text>
                <View styles={{ alignItems: "flex-end" }}>
                    <TouchableOpacity >
                        <Ionicons name='add-outline' size={30} color='#5B5151' marginRight={20} />
                    </TouchableOpacity>
                </View>
                </View>
                <View style={styles.tabContainer}>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            selectedTab === "Today" ? styles.selectedTab : null,
                        ]}
                        onPress={() => handleTabPress("Today")}
                    >
                        <Text style={[styles.tabText, selectedTab === "Today" ? styles.selectedTabText : null]}>Today's Patients</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.tabButton,
                            selectedTab === "All" ? styles.selectedTab : null,
                        ]}
                        onPress={() => handleTabPress("All")}
                    >
                        <Text style={[styles.tabText, selectedTab === "All" ? styles.selectedTabText : null]}>All Patients</Text>
                    </TouchableOpacity>
                </View>
                {selectedTab === "Today" && <TodayPatient />}
                {selectedTab === "All" && <AllPatient />}
            </SafeAreaView>
        );
    }
    
    const styles = StyleSheet.create({
        adminRow012: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginLeft: 10,
            alignItems: "center",
            position: 'absolute',
            marginTop: windowWidth*0.15,
        },
        text013: {
            fontFamily: "bold01",
            fontSize: 20,
            marginLeft: 12,
            marginRight: windowWidth*0.35,
        },
        tabContainer: {
            flexDirection: "row",
            marginTop: windowWidth*0.28,
            alignItems: "center",
            justifyContent: "center",
            marginBottom: 0,
        },
        tabButton: {
            paddingVertical: 10,
            paddingHorizontal: 30,
            backgroundColor: '#DFDBDB',
            borderRadius: 5,
            marginHorizontal: 10,
        },
        tabText: {
            fontSize: 16,
            textAlign: 'center',
        },
        selectedTab: {
            backgroundColor: '#1E7568',
        },
        selectedTabText: {
            color: '#FFFFFF',
        },
    });
    
    export default Patient;
    