import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { FontFamily, Color, Border, FontSize } from "../../../GlobalStyles";
import * as DocumentPicker from 'expo-document-picker';

const PastHosForm = () => {
    const [isClicked20, setIsClicked20] = useState(false);
    const [isClicked21, setIsClicked21] = useState(false);
    const [pickedFile, setPickedFile] = useState(null);
    const [isUploaded, setIsUploaded] = useState(false);

    const pickFile = async () => {
        try {
            console.log("Attempting to pick a file...");
            const filePickResponse = await DocumentPicker.getDocumentAsync({
                type: "*/*",
            });
            console.log("File pick response:", filePickResponse);

            if (!filePickResponse.cancelled) {
                const fileInfo = filePickResponse.assets[0];
                console.log("File picked successfully:", fileInfo.name);
                console.log("File type:", fileInfo.type); 
                const pickedFileData = {
                    name: fileInfo.name,
                    type: fileInfo.type,
                    uri: fileInfo.uri,
                };
                setPickedFile(pickedFileData);
            } else {
                console.log("File picking canceled or failed.");
            }
        } catch (error) {
            console.error("Error picking file:", error);
        }
    };
    const uploadFile = async () => {
        if (!pickedFile) {
            console.log("No file picked!");
            return;
        }

        console.log("Uploading file:", pickedFile);
        setIsUploaded(true);
        console.log("isUploaded:", isUploaded);
    };

    console.log("pickedFile:", pickedFile);

    return (
        <View style={styles.hosform}>
            <View style={styles.hosopt}>
                <Text style={{ fontWeight: '500', fontSize: 16, width: windowWidth * 0.57 }}>Year of hospitalization :</Text>
                <TouchableOpacity style={styles.dropdown60} onPress={() => {
                    setIsClicked20(!isClicked20);
                }}>
                    <Text style={{ color: '#8E7D7D', fontSize: 15, width: '50%' }}>Select</Text>
                    {isClicked20 ? (<Icon name="angle-up" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.08} />) : (<Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.08} />)}
                </TouchableOpacity>
            </View>
            <View style={styles.hosopt}>
                <Text style={{ fontWeight: '500', fontSize: 16, width: windowWidth * 0.57 }}>Duration in days :</Text>
                <TouchableOpacity style={styles.dropdown60} onPress={() => {
                    setIsClicked21(!isClicked21);
                }}>
                    <Text style={{ color: '#8E7D7D', fontSize: 15, width: '50%' }}>Select</Text>
                    {isClicked21 ? (<Icon name="angle-up" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.08} />) : (<Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.08} />)}
                </TouchableOpacity>
            </View>
            <View style={styles.hosopt}>
                <Text style={{ fontWeight: '500', fontSize: 16, width: windowWidth * 0.2 }}>Reason :</Text>
                <TouchableOpacity style={styles.dropdown61}>
                    <TextInput style={{ color: '#8E7D7D', fontSize: 15, width: windowWidth * 0.6 }} placeholder='Enter Here' placeholderTextColor={'#8E7D7D'}></TextInput>
                </TouchableOpacity>
            </View>
            <View style={styles.hosopt1}>
                <Icon name="paperclip" size={22} color={Color.colorGray_100} />
                <Text style={{ fontWeight: '700', fontSize: 15, width: windowWidth * 0.42, color: '#8E7D7D', marginLeft: windowWidth * 0.05 }}>
                {pickedFile ? pickedFile.name : 'Upload Discharge Certficate'}
                    </Text>
                <TouchableOpacity style={styles.uploadbutton} onPress={pickFile}>
                    <Text style={{ fontWeight: '700', fontSize: 15, color: '#2A9988', alignSelf: 'center' }}>Upload</Text>
                </TouchableOpacity>
                {pickedFile && (
                    <View style={styles.selectedFileContainer}>
                        <Text style={styles.selectedFileText}></Text>
                        <Text style={styles.selectedFileName}></Text>
                    </View>
                )}
                {isUploaded && (
                    <Text style={{ fontWeight: '700', fontSize: 15, color: 'green', alignSelf: 'center', marginTop: 10 }}>
                        File Uploaded Successfully!
                    </Text>
                )}
    
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    hosopt: {
        width: windowWidth * 0.95,
        height: windowWidth * 0.12,
        alignSelf: 'center',
        marginTop: windowWidth * 0.05,
        // backgroundColor: '#e3e3e3',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    hosopt1: {
        width: windowWidth * 0.9,
        height: windowWidth * 0.17,
        alignSelf: 'center',
        marginTop: windowWidth * 0.05,
        backgroundColor: '#e3e3e3',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 5
    },
    dropdown60: {
        width: windowWidth * 0.3,
        height: windowWidth * 0.1,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#A99F9F',
        // alignSelf: 'center',
        // marginTop: windowWidth*0.03,
        backgroundColor: '#e3e3e3',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        // marginLeft: windowWidth * 0.2,
    },
    dropdown61: {
        width: windowWidth * 0.67,
        height: windowWidth * 0.1,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#A99F9F',
        // alignSelf: 'center',
        // marginTop: windowWidth*0.03,
        backgroundColor: '#e3e3e3',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        // marginLeft: windowWidth * 0.2,
    },
    uploadbutton: {
        width: windowWidth * 0.3,
        height: windowWidth * 0.1,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#2A9988',
        borderRadius: 5,
        justifyContent: 'center'
    },
});

export default PastHosForm;