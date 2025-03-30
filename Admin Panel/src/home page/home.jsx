import React, { useState } from 'react';
import { View, Platform,StatusBar,Text,Image, StyleSheet, TouchableOpacity, FlatList, Dimensions, Alert,Linking,ActivityIndicator} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, MaterialCommunityIcons } from 'react-native-vector-icons';
import SearchAdmin from './SearchAdmin';
import { useNavigation } from '@react-navigation/native';
import HomeAdmin from './HomeAdmin';
import * as FileSystem from 'expo-file-system';
import { backendURL } from "../backendapi";
import { fromByteArray } from 'base64-js';
import * as Sharing from 'expo-sharing';
import { useAuth } from '../AuthContext';
import { CommonActions } from '@react-navigation/native';
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";

const windowWidth = Dimensions.get('window').width;

const Home = () => {
    const { logout } = useAuth();
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const staticImageUrl = "https://res.cloudinary.com/tiasha/image/upload/logo2-1_dusm95.jpg";

    const handleAddAdmin = () => {
        navigation.navigate('AddAdmin');
    };

    const handleSearch = (text) => {
        setSearchText(text);
    };

    const handleLogout = async () => {
        Alert.alert(
          "Logout",
          "Are you sure you want to logout?",
          [
            {
              text: "Cancel",
              style: "cancel"
            },
            { 
              text: "OK", 
              onPress: async () => {
                await logout();
                navigation.reset({
                  index: 0,
                  routes: [{ name: 'Login' }],
                });
              }
            }
          ]
        );
      };
    // const uploadToCloudinary = async (fileUri, fileName) => {
    //     try {
    //         const formData = new FormData();
    //         formData.append('file', {
    //             uri: fileUri,
    //             name: fileName,
    //             type: 'application/vnd.ms-excel', 
    //         });
    //         formData.append('upload_preset', 'pulmocareapp');
    //         formData.append('cloud_name', 'pulmocare01');
    
    //         const response = await fetch('https://api.cloudinary.com/v1_1/pulmocare01/raw/upload', {
    //             method: 'POST',
    //             body: formData,
    //         });
    
    //         const data = await response.json();
    //         if (!response.ok) {
    //             console.error('Failed to upload file to Cloudinary:', data);
    //             return null;
    //         }
    
    //         console.log('Cloudinary response:', data);
    //         return data.secure_url;
    //     } catch (error) {
    //         console.error('Error uploading file:', error);
    //         return null;
    //     }
    // };
    

    //  const handleNotification = () => {
    //     markNotificationsAsSeen();
    //     navigation.navigate('NotiList');
    // };
    // const downloadExcel = async () => {
    //     try {
    //         setIsLoading(true);
    //         const response = await fetch(`${backendURL}/adminRouter/excelFileFeedback`);
    
    //         if (!response.ok) {
    //             throw new Error('Failed to download Excel file');
    //         }
    
    //         const fileData = await response.arrayBuffer();
    //         const fileName = 'users.xlsx'; 
           
    //         const downloadDirectory = FileSystem.documentDirectory + 'Downloads/';
    
    //         await FileSystem.makeDirectoryAsync(downloadDirectory, { intermediates: true });
    
    //         const fileUri = downloadDirectory + fileName;
    
    //         const bytes = new Uint8Array(fileData);
    //         const base64Data = fromByteArray(bytes);
    
    //         await FileSystem.writeAsStringAsync(fileUri, base64Data, {
    //             encoding: FileSystem.EncodingType.Base64,
    //         });
    
    //         const cloudinaryUrl = await uploadToCloudinary(fileUri, fileName);
    //         if (cloudinaryUrl) {
    //             Linking.openURL(cloudinaryUrl);
    //             Alert.alert('Download Successful', 'Excel file has been uploaded');
    //         } else {
    //             Alert.alert('Upload Failed', 'Failed to upload Excel file.');
    //         }
    //     } catch (error) {
    //         console.error('Error downloading Excel file:', error);
    //         Alert.alert('Download Failed', 'Failed to download Excel file.');
    //     }finally{
    //         setIsLoading(false);
    //     }
    // };
    const downloadExcel = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`${backendURL}/adminRouter/excelFileFeedback`);
             
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
    
            // Create a FormData object to upload the file to your server
            const formData = new FormData();
            formData.append('file', {
                uri: fileUri,
                name: fileName,
                type: 'application/vnd.ms-excel',
            });
            
            // Upload to your server instead of Cloudinary
            const uploadResponse = await fetch(`${backendURL}/upload`, {
                method: 'POST',
                body: formData,
            });
            
            if (uploadResponse.ok) {
                const responseData = await uploadResponse.json();
                console.log('Upload response:', responseData);
                
                if (responseData && responseData.filePath) {
                    // Create a full URL to the file using the filePath from the response
                    const fileUrl = `${backendURL}${responseData.filePath}`;
                    console.log("File URL:", fileUrl);
                    
                    // Open the file URL
                    Linking.openURL(fileUrl);
                    Alert.alert('Download Successful', 'Excel file has been uploaded');
                } else {
                    console.error('Missing filePath in upload response');
                    Alert.alert('Upload Failed', 'Failed to get file path from server.');
                }
            } else {
                console.error('Failed to upload Excel file to server');
                Alert.alert('Upload Failed', 'Failed to upload Excel file to server.');
            }
        } catch (error) {
            console.error('Error downloading/uploading Excel file:', error);
            Alert.alert('Download Failed', 'Failed to download or upload Excel file.');
        } finally {
            setIsLoading(false);
        }
    };
    
    // Keep the existing handleNotification function
    const handleNotification = () => {
        markNotificationsAsSeen();
        navigation.navigate('NotiList');
    };
    
    const renderHeader = () => (
        <View>
            <View style={styles.appBarWrapper012}>
                <View style={styles.appBar012}>
                <Image source={{ uri: staticImageUrl }} style={styles.profileImage} />
                    {/* <MaterialIcons name='local-hospital' size={40} color={'#730404'} /> */}
                    <Text style={styles.text012}>Institute of Pulmocare & {'\n'}Research</Text>
                    <View style={{ alignItems: "flex-end" }}>
                        <TouchableOpacity style={[styles.button457,{ marginLeft:windowWidth*0.03 }]} onPress={handleLogout}>
                            <Text style={styles.text568}>Log Out</Text>
                        </TouchableOpacity>
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
                    {isLoading ? (
            <ActivityIndicator size={30} color='#096759' marginRight={ windowWidth*0.05}/>
          ) : (
            <MaterialCommunityIcons name='format-align-bottom' size={30} color='#096759' marginRight={ windowWidth*0.05} />
          )}
                        {/* <MaterialCommunityIcons name='format-align-bottom' size={30} color='#096759' marginRight={20} /> */}
                    </TouchableOpacity>
                </View>
            </View>
            <SearchAdmin onSearch={handleSearch} />
        </View>
    );

    return (
        <SafeAreaView style={styles.appbar033}>
           <StatusBar 
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
            backgroundColor="#FFFFFF"
            translucent={false}
        />
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
        position: "relative",
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 10,
        alignItems: "center",
        marginTop: 15,

    },
    text012: {
        fontFamily: "regular01",
        fontSize: 18,
        marginLeft: 5,
        marginBottom: 5,
    },
    text013: {
        fontFamily: "bold01",
        fontSize: 20,
        marginLeft: 12,
    },
    button456: {
        marginLeft: windowWidth*0.2,
        borderWidth: 2,
        borderColor: "#096759",
        padding: 5,
        borderRadius: 6,
    },
    button457: {
        marginLeft: 10,
        // borderWidth: 2,
        backgroundColor: "#9F0606",
        padding: 5,
        borderRadius: 6,
    },
    text568:{
        color:'#fff',
        padding:3,
        fontFamily: "bold01",
        fontSize: 14,
    },
    text567: {
        color: "#096759",
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
    profileImage: {
        width: windowWidth*0.1,
        height: windowWidth*0.1,
        resizeMode: 'cover',
        borderRadius: windowWidth*0.05,
    },
});

export default Home;
