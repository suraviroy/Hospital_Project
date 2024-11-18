import React, { useState } from 'react';
import { View, Platform,StatusBar,Text, StyleSheet, FlatList, TouchableOpacity,Dimensions ,Linking,Alert,ActivityIndicator} from 'react-native';
import SearchList from './SearchList';
import PatientList from './PatientList';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";
import { useNavigation } from '@react-navigation/native';
const windowWidth = Dimensions.get('window').width;
import * as FileSystem from 'expo-file-system';
import { backendURL } from "../backendapi";
import { fromByteArray } from 'base64-js';

const ViewList = () => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleBack = () => {
        navigation.goBack();
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
            setIsLoading(true);
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
                Alert.alert('Download Successful', 'Excel file has been uploaded');
            } else {
                Alert.alert('Upload Failed', 'Failed to upload Excel file');
            }
        } catch (error) {
            console.error('Error downloading Excel file:', error);
            Alert.alert('Download Failed', 'Failed to download Excel file.');
        } finally {
            setIsLoading(false);
        }
    };
    const headerPatients = () => (
        <View style={styles.viewList2451}>
              <View style={styles.header2451}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton13}>
                    <Text><Icon name="angle-left" size={30} color={Color.colorBlack} /></Text>
                </TouchableOpacity>
                <Text style={styles.text2451}>All Patients</Text>
                <View style={{ alignItems: "flex-end" }}>
                        <TouchableOpacity style={[styles.button457,{ marginLeft: windowWidth*0.15 }]} onPress={downloadExcel}>
                        {isLoading ? (
              <ActivityIndicator   style={styles.but568}/>
          ) : (
            <Text style={styles.text568}>Download Excel</Text>
          )}
                            {/* <Text style={styles.text568}>Download Excel</Text> */}
                        </TouchableOpacity>
                    </View>
            </View>
            <SearchList setSearchText={setSearchText} />
        </View>
    );

    return (
        <SafeAreaView style={styles.appbar2451}>
             <StatusBar 
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
            backgroundColor="#FFFFFF"  // Match your app's background color
            translucent={false}
        />
            <View style={styles.container}>
                <View style={styles.headerContainer}>
                    {headerPatients()}
                </View>
                <FlatList
                    data={[]}
                    renderItem={({ item }) => null}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={<PatientList searchText={searchText} />}
                    style={styles.flatList}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        // paddingTop: 35,
        paddingTop: windowWidth*0.08,
    },
    button457: {
        marginLeft: 110,
        borderWidth: 2,
        borderColor: "#096759",
        padding: 5,
        borderRadius: 6,
    },
    text568:{
        color: "#096759",
        fontFamily: "bold01",
        fontSize: 14,
    },
    but568:{
        color: "#096759",
        fontFamily: "bold01",
        fontSize: 20,
        width: windowWidth*0.25,
    },
    headerContainer: {
        paddingHorizontal: 3,
    },
    viewList2451: {
        marginHorizontal: 10,
        marginTop: 5,
    },
    header2451: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    text2451: {
        fontSize: 25,
        marginLeft: windowWidth*0.1,
        fontFamily: "bold01",
    },
    appbar2451: {
        flex: 1,
        backgroundColor: '#fff'
    },
    backButton13: {
        marginLeft:windowWidth*0.03,
        //  marginRight: windowWidth*0.03,
        position: 'absolute',
        left: 0,
    },
    flatList: {
        paddingHorizontal: 2
    },
});

export default ViewList;