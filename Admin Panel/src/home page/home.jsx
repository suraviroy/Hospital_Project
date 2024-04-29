import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions, Alert, Platform, PermissionsAndroid ,Linking} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from 'react-native-vector-icons';
import SearchAdmin from './SearchAdmin';
import { useNavigation } from '@react-navigation/native';
import HomeAdmin from './HomeAdmin';
import * as FileSystem from 'expo-file-system';
import { backendURL } from "../backendapi";
import { fromByteArray } from 'base64-js';
import * as Sharing from 'expo-sharing';

const windowWidth = Dimensions.get('window').width;

const Home = () => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');

    const handleAddAdmin = () => {
        navigation.navigate('AddAdmin');
    };

    const handleSearch = (text) => {
        setSearchText(text);
    };
    const uploadToCloudinary = async (fileUri, fileName) => {
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: fileUri,
                name: fileName,
                type: 'application/vnd.ms-excel', 
            });
            formData.append('upload_preset', 'pulmocareapp');
            formData.append('cloud_name', 'pulmocare01');
    
            const response = await fetch('https://api.cloudinary.com/v1_1/pulmocare01/raw/upload', {
                method: 'POST',
                body: formData,
            });
    
            const data = await response.json();
            if (!response.ok) {
                console.error('Failed to upload file to Cloudinary:', data);
                return null;
            }
    
            console.log('Cloudinary response:', data);
            return data.secure_url;
        } catch (error) {
            console.error('Error uploading file:', error);
            return null;
        }
    };
    
    const downloadExcel = async () => {
        try {
            const response = await fetch(`${backendURL}/adminRouter/excelFile`);
    
            if (!response.ok) {
                throw new Error('Failed to download Excel file');
            }
    
            const fileData = await response.arrayBuffer();
            const fileName = 'users.xlsx'; 
           
            const downloadDirectory = FileSystem.documentDirectory + 'Downloads/';
    
            await FileSystem.makeDirectoryAsync(downloadDirectory, { intermediates: true });
    
            const fileUri = downloadDirectory + fileName;
    
            const bytes = new Uint8Array(fileData);
            const base64Data = fromByteArray(bytes);
    
            await FileSystem.writeAsStringAsync(fileUri, base64Data, {
                encoding: FileSystem.EncodingType.Base64,
            });
    
            const cloudinaryUrl = await uploadToCloudinary(fileUri, fileName);
            if (cloudinaryUrl) {
                Linking.openURL(cloudinaryUrl);
                Alert.alert('Download Successful', 'Excel file has been uploaded to Cloudinary.');
            } else {
                Alert.alert('Upload Failed', 'Failed to upload Excel file to Cloudinary.');
            }
        } catch (error) {
            console.error('Error downloading Excel file:', error);
            Alert.alert('Download Failed', 'Failed to download Excel file.');
        }
    };
    
    const renderHeader = () => (
        <View>
            <View style={styles.appBarWrapper012}>
                <View style={styles.appBar012}>
                    <MaterialIcons name='local-hospital' size={40} color={'#730404'} />
                    <Text style={styles.text012}>Institute of Pulmocare & {'\n'}Research</Text>
                    <View style={{ alignItems: "flex-end" }}>
                        <TouchableOpacity style={{ marginLeft: 50 }}>
                            <Ionicons name='chatbubble-ellipses-sharp' size={30} color='#2A9988' />
                        </TouchableOpacity>
                        <View style={styles.ChatCount012}>
                            <Text style={styles.chatNumber012}>8</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.adminRow012}>
                <Text style={styles.text013}>Admins List</Text>
                <TouchableOpacity style={styles.button456} onPress={handleAddAdmin}>
                    <Text style={styles.text567}> Add Admin</Text>
                </TouchableOpacity>
                <View style={{ alignItems: "flex-end" }}>
                    <TouchableOpacity onPress={downloadExcel}>
                        <Ionicons name='settings-sharp' size={30} color='#5B5151' marginRight={20} />
                    </TouchableOpacity>
                </View>
            </View>
            <SearchAdmin onSearch={handleSearch} />
        </View>
    );

    return (
        <SafeAreaView style={styles.appbar033}>
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    {renderHeader()}
                </View>
                <FlatList
                    data={[]}
                    renderItem={({ item }) => null}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={<HomeAdmin searchText={searchText} />}
                    style={styles.flatList}
                />
            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',

    },
    headerContainer: {
        paddingHorizontal: 3,
    },
    flatListContainer: {
        flex: 1,
    },
    appBarWrapper012: {
        marginHorizontal: 22,
        marginTop: 12,
    },
    appBar012: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 3,
        borderBottomColor: '#D3F1ED'
    },
    adminRow012: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 10,
        alignItems: "center",
        marginTop: 15,
    },
    text012: {
        fontFamily: "regular01",
        fontSize: 18,
        marginBottom: 5,
    },
    text013: {
        fontFamily: "bold01",
        fontSize: 20,
        marginLeft: 12,
    },
    button456: {
        marginLeft: 110,
        borderWidth: 2,
        borderColor: "#2A9988",
        padding: 5,
        borderRadius: 6,
    },
    text567: {
        color: "#2A9988",
        fontFamily: "bold01",
        fontSize: 14,
    },
    ChatCount012: {
        position: "absolute",
        marginLeft: 23,
        bottom: 18,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: "#D0152C",
        justifyContent: "center",
        zIndex: 999
    },
    chatNumber012: {
        fontFamily: "bold01",
        fontSize: 10,
        color: "#FFFFFF",
    },
    appbar033: {
        flex: 1,
        backgroundColor: '#fff'
    },
});

export default Home;
