import React, { useState } from "react";
import { View, StyleSheet, Text, Dimensions, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator, TextInput } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
const windowWidth = Dimensions.get("window").width;
import Icon from "react-native-vector-icons/FontAwesome5";
import { Color } from "../../GlobalStyles";
import axios from "axios";
import * as DocumentPicker from 'expo-document-picker';
import { backendURL } from "../backendapi";
import { useNavigation, useRoute } from '@react-navigation/native';

const Request = () => {
    const route = useRoute();
    const { patientId } = route.params;
    const navigation = useNavigation();
    const [isLoading1, setIsLoading1] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [isLoading3, setIsLoading3] = useState(false);
    const [isLoading4, setIsLoading4] = useState(false);
    const [isClicked1, setIsClicked1] = useState(false);
    const [selectedOption1, setSelectedOption1] = useState("Select");
    const [selectedDetails1, setSelectedDetails1] = useState("");
    const [isClicked2, setIsClicked2] = useState(false);
    const [selectedOption2, setSelectedOption2] = useState("Select");
    const [selectedDetails2, setSelectedDetails2] = useState("");
    const [isClicked3, setIsClicked3] = useState(false);
    const [selectedOption3, setSelectedOption3] = useState("Select");
    const [selectedDetails3, setSelectedDetails3] = useState("");
    const [isClicked4, setIsClicked4] = useState(false);
    const [selectedOption4, setSelectedOption4] = useState("Select");
    const [selectedDetails4, setSelectedDetails4] = useState("");
    const [isClicked5, setIsClicked5] = useState(false);
    const [selectedOption5, setSelectedOption5] = useState("Select");
    const [selectedDetails5, setSelectedDetails5] = useState("");
    const [isClicked6, setIsClicked6] = useState(false);
    const [selectedOption6, setSelectedOption6] = useState("Select");
    const [isClicked7, setIsClicked7] = useState(false);
    const [selectedOption7, setSelectedOption7] = useState("Select");
    const [selectedDetails7, setSelectedDetails7] = useState("");
    const [isClicked8, setIsClicked8] = useState(false);
    const [selectedRequest, setSelectedRequest] = useState("Select");
    const [otherText, setOtherText] = useState('');
    const [isClicked9, setIsClicked9] = useState(false);
    const [isClicked10, setIsClicked10] = useState(false);
    const [isClicked11, setIsClicked11] = useState(false);
    const [isClicked12, setIsClicked12] = useState(false);
    const [isClicked13, setIsClicked13] = useState(false);
    const [isClicked14, setIsClicked14] = useState(false);
    const [isClicked15, setIsClicked15] = useState(false);
    const [pickedFile1, setPickedFile1] = useState(null);
    const [pickedFile2, setPickedFile2] = useState(null);
    const [pickedFile3, setPickedFile3] = useState(null);
    const patientRequestURL =`${backendURL}/patientRouter/RegiseterNewPatientRequest`;

    const Req_Options = [
        {
            value: 'Advice Remedy',
            key: 'AR'
        },
        {
            value: 'Advice - what to do?',
            key: 'AD'
        },
        {
            value: 'Want to talk to the doctor',
            key: 'WD'
        },
        {
            value: 'Want to inform',
            key: 'WI'
        },
        {
            value: 'Want the doctors to guide',
            key: 'WG'
        },
        {
            value: 'Others',
            key: 'OT'
        },
    ]

    const handleRequestSelection = (val) => {
        setSelectedRequest(val);
        if (val === 'Others') {
            setOtherText('');
        }
    };

    const pickFile1 = async () => {
        setIsLoading1(true);
        try {
            const filePickResponse = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
            });

            if (!filePickResponse.canceled) {
                const fileInfo = filePickResponse.assets[0];
                const formData = new FormData();
                formData.append('file', {
                    uri: fileInfo.uri,
                    name: fileInfo.name,
                    type: 'application/pdf',
                });
                formData.append('upload_preset', 'pulmocareapp');
                formData.append('cloud_name', 'pulmocare01');

                try {
                    const response = await fetch('https://api.cloudinary.com/v1_1/pulmocare01/image/upload', {
                        method: 'POST',
                        body: formData,
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log('Cloudinary response:', data);

                        setPickedFile1({
                            name: data.original_filename || fileInfo.name,
                            type: fileInfo.type,
                            uri: data.secure_url,
                        });
                    } else {
                        console.error('Failed to upload file to Cloudinary');
                    }
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        } catch (error) {
            console.error("Error picking file:", error);
        }
        finally {
            setIsLoading1(false);
        }
    };

    const pickFile2 = async () => {
        setIsLoading2(true);
        try {
            const filePickResponse = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
            });

            if (!filePickResponse.canceled) {
                const fileInfo = filePickResponse.assets[0];
                const formData = new FormData();
                formData.append('file', {
                    uri: fileInfo.uri,
                    name: fileInfo.name,
                    type: 'application/pdf',
                });
                formData.append('upload_preset', 'pulmocareapp');
                formData.append('cloud_name', 'pulmocare01');

                try {
                    const response = await fetch('https://api.cloudinary.com/v1_1/pulmocare01/image/upload', {
                        method: 'POST',
                        body: formData,
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log('Cloudinary response:', data);

                        setPickedFile2({
                            name: data.original_filename || fileInfo.name,
                            type: fileInfo.type,
                            uri: data.secure_url,
                        });
                    } else {
                        console.error('Failed to upload file to Cloudinary');
                    }
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        } catch (error) {
            console.error("Error picking file:", error);
        }
        finally {
            setIsLoading2(false);
        }
    };

    const pickFile3 = async () => {
        setIsLoading4(true);
        try {
            const filePickResponse = await DocumentPicker.getDocumentAsync({
                type: 'application/pdf',
            });

            if (!filePickResponse.canceled) {
                const fileInfo = filePickResponse.assets[0];
                const formData = new FormData();
                formData.append('file', {
                    uri: fileInfo.uri,
                    name: fileInfo.name,
                    type: 'application/pdf',
                });
                formData.append('upload_preset', 'pulmocareapp');
                formData.append('cloud_name', 'pulmocare01');

                try {
                    const response = await fetch('https://api.cloudinary.com/v1_1/pulmocare01/image/upload', {
                        method: 'POST',
                        body: formData,
                    });

                    if (response.ok) {
                        const data = await response.json();
                        console.log('Cloudinary response:', data);

                        setPickedFile3({
                            name: data.original_filename || fileInfo.name,
                            type: fileInfo.type,
                            uri: data.secure_url,
                        });
                    } else {
                        console.error('Failed to upload file to Cloudinary');
                    }
                } catch (error) {
                    console.error('Error uploading file:', error);
                }
            }
        } catch (error) {
            console.error("Error picking file:", error);
        }
        finally {
            setIsLoading4(false);
        }
    };

    const handleSave = async () => {
        setIsLoading3(true);
        const requestText =
            selectedRequest === "Select" ? "NA" : (selectedRequest === "Others" ? otherText : selectedRequest);
            const reqData = {
                patientId: patientId,
                exacrebation: {
                    isSelected: selectedOption1 === "Select" ? "NA" : selectedOption1,
                    details: selectedDetails1 || "NA",
                },
                newProblem: {
                    isSelected: selectedOption2 === "Select" ? "NA" : selectedOption2,
                    details: selectedDetails2 || "NA",
                },
                newConsultation: {
                    isSelected: selectedOption3 === "Select" ? "NA" : selectedOption3,
                    details: selectedDetails3 || "NA",
                    dischargeCertificate: pickedFile1? pickedFile1.uri : "NA",
                },
                hospitalization: {
                    isSelected: selectedOption4 === "Select" ? "NA" : selectedOption4,
                    records: selectedDetails4 || "NA",
                },
                disabilities: {
                    isSelected: selectedOption5 === "Select" ? "NA" : selectedOption5,
                    details: selectedDetails5 || "NA",
                },
                demise: {
                    isSelected: selectedOption6 === "Select" ? "NA" : selectedOption6,
                    deathCertificate: pickedFile2 ? pickedFile2.uri : "NA",
                },
                report: {
                    isSelected: selectedOption7 === "Select" ? "NA" : selectedOption7,
                    details: selectedDetails7 || "NA",
                    certificate: pickedFile3 ? pickedFile3.uri : "NA",
                },
                request: requestText,
                action:"NA"
            };
        console.log(reqData)
        try {
            const response = await fetch(patientRequestURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqData),
            });
    
            if (response.ok) {
                
                console.log("Request sent successfully");
               
                setIsLoading1(false);
                setIsLoading2(false);
                setIsLoading3(false);
                setIsLoading4(false);
                alert('Request Sent Successfully');
                navigation.goBack();
            } else {
                
                console.error('Failed to send request:', response.status);
                
                setIsLoading1(false);
                setIsLoading2(false);
                setIsLoading3(false);
                setIsLoading4(false);
            }
        } catch (error) {
            console.error('Error sending request:', error);
            setIsLoading1(false);
            setIsLoading2(false);
            setIsLoading3(false);
            setIsLoading4(false);
        }
    };

    const handleBack = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.reqcontainer}>
            <SafeAreaView style={{ marginTop: 20 }}>
                <View style={styles.reqheader}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton14}>
                        <Text><Icon name="angle-left" size={30} color={Color.colorBlack} /></Text>
                    </TouchableOpacity>
                    <Text style={styles.text14}>Request Help</Text>
                </View>
                <ScrollView style={{ marginBottom: windowWidth * 0.23, paddingBottom: 10, elevation: 5, backgroundColor: Color.colorWhite }}>
                    <View style={styles.innercont}>
                        <View style={styles.reqdet}>
                            <Text style={styles.texthead}>Any Exacrebation</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.dropdown13}
                            onPress={() => {
                                setIsClicked1(!isClicked1);
                            }}
                        >
                            <Text style={{ color: "#8E7D7D", fontSize: 15, width: windowWidth * 0.73 }}>
                                {selectedOption1}
                            </Text>
                            {isClicked1 ? (
                                <Icon
                                    name="angle-up"
                                    size={15}
                                    color={"#8E7D7D"}
                                    marginLeft={windowWidth * 0.1}
                                />
                            ) : (
                                <Icon
                                    name="angle-down"
                                    size={15}
                                    color={"#8E7D7D"}
                                    marginLeft={windowWidth * 0.1}
                                />
                            )}
                        </TouchableOpacity>
                        {isClicked1 ? (
                            <View style={styles.options}>
                                <View style={styles.option}>
                                    <TouchableOpacity
                                        style={{ width: "180%" }}
                                        onPress={() => {
                                            setSelectedOption1("yes");
                                            setIsClicked1(false);
                                            setIsClicked9(true);
                                        }}
                                    >
                                        <Text style={{ fontSize: 15 }}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ width: "180%" }}
                                        onPress={() => {
                                            setSelectedOption1("No");
                                            setIsClicked1(false);
                                            setIsClicked9(false);
                                            setSelectedDetails1("");
                                        }}
                                    >
                                        <Text style={{ fontSize: 15, marginTop: windowWidth * 0.02 }}>
                                            No
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : null}
                        {isClicked9 ? (
                            <View style={styles.problems}>
                                <View style={styles.problist}>
                                    <Text style={{ fontWeight: "700", fontSize: 16, width: "50%" }}>
                                        Add Details :
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.textbox}>
                                    <TextInput
                                        style={{ fontSize: 15, width: windowWidth * 0.8 }}
                                        placeholder="Enter Here"
                                        placeholderTextColor={"#8E7D7D"}
                                        onChangeText={(text) => setSelectedDetails1(text)}
                                    />
                                </TouchableOpacity>
                            </View>
                        ) : null}
                        <View style={styles.reqdet}>
                            <Text style={styles.texthead}>Any New Problem</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.dropdown13}
                            onPress={() => {
                                setIsClicked2(!isClicked2);
                            }}
                        >
                            <Text style={{ color: "#8E7D7D", fontSize: 15, width: windowWidth * 0.73 }}>
                                {selectedOption2}
                            </Text>
                            {isClicked2 ? (
                                <Icon
                                    name="angle-up"
                                    size={15}
                                    color={"#8E7D7D"}
                                    marginLeft={windowWidth * 0.1}
                                />
                            ) : (
                                <Icon
                                    name="angle-down"
                                    size={15}
                                    color={"#8E7D7D"}
                                    marginLeft={windowWidth * 0.1}
                                />
                            )}
                        </TouchableOpacity>
                        {isClicked2 ? (
                            <View style={styles.options}>
                                <View style={styles.option}>
                                    <TouchableOpacity
                                        style={{ width: "180%" }}
                                        onPress={() => {
                                            setSelectedOption2("yes");
                                            setIsClicked2(false);
                                            setIsClicked10(true);
                                        }}
                                    >
                                        <Text style={{ fontSize: 15 }}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ width: "180%" }}
                                        onPress={() => {
                                            setSelectedOption2("No");
                                            setIsClicked2(false);
                                            setIsClicked10(false);
                                            setSelectedDetails2("");
                                        }}
                                    >
                                        <Text style={{ fontSize: 15, marginTop: windowWidth * 0.02 }}>
                                            No
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : null}
                        {isClicked10 ? (
                            <View style={styles.problems}>
                                <View style={styles.problist}>
                                    <Text style={{ fontWeight: "700", fontSize: 16, width: "50%" }}>
                                        Add Details :
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.textbox}>
                                    <TextInput
                                        style={{ fontSize: 15, width: windowWidth * 0.8 }}
                                        placeholder="Enter Here"
                                        placeholderTextColor={"#8E7D7D"}
                                        onChangeText={(text) => setSelectedDetails2(text)}
                                    />
                                </TouchableOpacity>
                            </View>
                        ) : null}
                        <View style={styles.reqdet}>
                            <Text style={styles.texthead}>Any New Consultation</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.dropdown13}
                            onPress={() => {
                                setIsClicked3(!isClicked3);
                            }}
                        >
                            <Text style={{ color: "#8E7D7D", fontSize: 15, width: windowWidth * 0.73 }}>
                                {selectedOption3}
                            </Text>
                            {isClicked3 ? (
                                <Icon
                                    name="angle-up"
                                    size={15}
                                    color={"#8E7D7D"}
                                    marginLeft={windowWidth * 0.1}
                                />
                            ) : (
                                <Icon
                                    name="angle-down"
                                    size={15}
                                    color={"#8E7D7D"}
                                    marginLeft={windowWidth * 0.1}
                                />
                            )}
                        </TouchableOpacity>
                        {isClicked3 ? (
                            <View style={styles.options}>
                                <View style={styles.option}>
                                    <TouchableOpacity
                                        style={{ width: "180%" }}
                                        onPress={() => {
                                            setSelectedOption3("yes");
                                            setIsClicked3(false);
                                            setIsClicked11(true);
                                        }}
                                    >
                                        <Text style={{ fontSize: 15 }}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ width: "180%" }}
                                        onPress={() => {
                                            setSelectedOption3("No");
                                            setIsClicked3(false);
                                            setIsClicked11(false);
                                            setSelectedDetails3("");
                                            setPickedFile1("");
                                        }}
                                    >
                                        <Text style={{ fontSize: 15, marginTop: windowWidth * 0.02 }}>
                                            No
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : null}
                        {isClicked11 ? (
                            <View>
                                <View style={styles.problems}>
                                    <View style={styles.problist}>
                                        <Text style={{ fontWeight: "700", fontSize: 16, width: "50%" }}>
                                            Add Details :
                                        </Text>
                                    </View>
                                    <TouchableOpacity style={styles.textbox}>
                                        <TextInput
                                            style={{ fontSize: 15, width: windowWidth * 0.8 }}
                                            placeholder="Enter Here"
                                            placeholderTextColor={"#8E7D7D"}
                                            onChangeText={(text) => setSelectedDetails3(text)}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.hosopt1}>
                                    <Icon name="paperclip" size={22} color={Color.colorGray_100} />
                                    <Text style={{ fontWeight: '700', fontSize: 15, width: windowWidth * 0.42, color: '#8E7D7D', marginLeft: windowWidth * 0.05 }}>
                                        {pickedFile1 ? pickedFile1.name : 'Upload Discharge Certificate'}
                                    </Text>
                                    <TouchableOpacity style={styles.uploadbutton} onPress={pickFile1}>
                                        {isLoading1 ? (
                                            <ActivityIndicator size="small" color={'#35A9EA'} />
                                        ) : (
                                            <Text style={{ fontWeight: '700', fontSize: 15, color: '#35A9EA', alignSelf: 'center' }}>Upload</Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : null}
                        <View style={styles.reqdet}>
                            <Text style={styles.texthead}>Any Hospitalization</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.dropdown13}
                            onPress={() => {
                                setIsClicked4(!isClicked4);
                            }}
                        >
                            <Text style={{ color: "#8E7D7D", fontSize: 15, width: windowWidth * 0.73 }}>
                                {selectedOption4}
                            </Text>
                            {isClicked4 ? (
                                <Icon
                                    name="angle-up"
                                    size={15}
                                    color={"#8E7D7D"}
                                    marginLeft={windowWidth * 0.1}
                                />
                            ) : (
                                <Icon
                                    name="angle-down"
                                    size={15}
                                    color={"#8E7D7D"}
                                    marginLeft={windowWidth * 0.1}
                                />
                            )}
                        </TouchableOpacity>
                        {isClicked4 ? (
                            <View style={styles.options}>
                                <View style={styles.option}>
                                    <TouchableOpacity
                                        style={{ width: "180%" }}
                                        onPress={() => {
                                            setSelectedOption4("yes");
                                            setIsClicked4(false);
                                            setIsClicked12(true);
                                        }}
                                    >
                                        <Text style={{ fontSize: 15 }}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ width: "180%" }}
                                        onPress={() => {
                                            setSelectedOption4("No");
                                            setIsClicked4(false);
                                            setIsClicked12(false);
                                            setSelectedDetails4("");
                                        }}
                                    >
                                        <Text style={{ fontSize: 15, marginTop: windowWidth * 0.02 }}>
                                            No
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : null}
                        {isClicked12 ? (
                            <View style={styles.problems}>
                                <View style={styles.problist}>
                                    <Text style={{ fontWeight: "700", fontSize: 16, width: "50%" }}>
                                        Add Records :
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.textbox}>
                                    <TextInput
                                        style={{ fontSize: 15, width: windowWidth * 0.8 }}
                                        placeholder="Enter Here"
                                        placeholderTextColor={"#8E7D7D"}
                                        onChangeText={(text) => setSelectedDetails4(text)}
                                    />
                                </TouchableOpacity>
                            </View>
                        ) : null}
                        <View style={styles.reqdet}>
                            <Text style={styles.texthead}>Disabilities</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.dropdown13}
                            onPress={() => {
                                setIsClicked5(!isClicked5);
                            }}
                        >
                            <Text style={{ color: "#8E7D7D", fontSize: 15, width: windowWidth * 0.73 }}>
                                {selectedOption5}
                            </Text>
                            {isClicked5 ? (
                                <Icon
                                    name="angle-up"
                                    size={15}
                                    color={"#8E7D7D"}
                                    marginLeft={windowWidth * 0.1}
                                />
                            ) : (
                                <Icon
                                    name="angle-down"
                                    size={15}
                                    color={"#8E7D7D"}
                                    marginLeft={windowWidth * 0.1}
                                />
                            )}
                        </TouchableOpacity>
                        {isClicked5 ? (
                            <View style={styles.options}>
                                <View style={styles.option}>
                                    <TouchableOpacity
                                        style={{ width: "180%" }}
                                        onPress={() => {
                                            setSelectedOption5("yes");
                                            setIsClicked5(false);
                                            setIsClicked13(true);
                                        }}
                                    >
                                        <Text style={{ fontSize: 15 }}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ width: "180%" }}
                                        onPress={() => {
                                            setSelectedOption5("No");
                                            setIsClicked5(false);
                                            setIsClicked13(false);
                                            setSelectedDetails5("");
                                        }}
                                    >
                                        <Text style={{ fontSize: 15, marginTop: windowWidth * 0.02 }}>
                                            No
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : null}
                        {isClicked13 ? (
                            <View style={styles.problems}>
                                <View style={styles.problist}>
                                    <Text style={{ fontWeight: "700", fontSize: 16, width: "50%" }}>
                                        Add Details :
                                    </Text>
                                </View>
                                <TouchableOpacity style={styles.textbox}>
                                    <TextInput
                                        style={{ fontSize: 15, width: windowWidth * 0.8 }}
                                        placeholder="Enter Here"
                                        placeholderTextColor={"#8E7D7D"}
                                        onChangeText={(text) => setSelectedDetails5(text)}
                                    />
                                </TouchableOpacity>
                            </View>
                        ) : null}
                        <View style={styles.reqdet}>
                            <Text style={styles.texthead}>Demise</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.dropdown13}
                            onPress={() => {
                                setIsClicked6(!isClicked6);
                            }}
                        >
                            <Text style={{ color: "#8E7D7D", fontSize: 15, width: windowWidth * 0.73 }}>
                                {selectedOption6}
                            </Text>
                            {isClicked6 ? (
                                <Icon
                                    name="angle-up"
                                    size={15}
                                    color={"#8E7D7D"}
                                    marginLeft={windowWidth * 0.1}
                                />
                            ) : (
                                <Icon
                                    name="angle-down"
                                    size={15}
                                    color={"#8E7D7D"}
                                    marginLeft={windowWidth * 0.1}
                                />
                            )}
                        </TouchableOpacity>
                        {isClicked6 ? (
                            <View style={styles.options}>
                                <View style={styles.option}>
                                    <TouchableOpacity
                                        style={{ width: "180%" }}
                                        onPress={() => {
                                            setSelectedOption6("yes");
                                            setIsClicked6(false);
                                            setIsClicked14(true);
                                        }}
                                    >
                                        <Text style={{ fontSize: 15 }}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ width: "180%" }}
                                        onPress={() => {
                                            setSelectedOption6("No");
                                            setIsClicked6(false);
                                            setIsClicked14(false);
                                            setPickedFile2("");
                                        }}
                                    >
                                        <Text style={{ fontSize: 15, marginTop: windowWidth * 0.02 }}>
                                            No
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : null}
                        {isClicked14 ? (
                            <View style={styles.hosopt1}>
                                <Icon name="paperclip" size={22} color={Color.colorGray_100} />
                                <Text style={{ fontWeight: '700', fontSize: 15, width: windowWidth * 0.42, color: '#8E7D7D', marginLeft: windowWidth * 0.05 }}>
                                    {pickedFile2 ? pickedFile2.name : 'Upload Discharge Certificate'}
                                </Text>
                                <TouchableOpacity style={styles.uploadbutton} onPress={pickFile2}>
                                    {isLoading2 ? (
                                        <ActivityIndicator size="small" color={'#35A9EA'} />
                                    ) : (
                                        <Text style={{ fontWeight: '700', fontSize: 15, color: '#35A9EA', alignSelf: 'center' }}>Upload</Text>
                                    )}
                                </TouchableOpacity>
                            </View>
                        ) : null}
                        <View style={styles.reqdet}>
                            <Text style={styles.texthead}>Any Report</Text>
                        </View>
                        <TouchableOpacity
                            style={styles.dropdown13}
                            onPress={() => {
                                setIsClicked7(!isClicked7);
                            }}
                        >
                            <Text style={{ color: "#8E7D7D", fontSize: 15, width: windowWidth * 0.73 }}>
                                {selectedOption7}
                            </Text>
                            {isClicked7 ? (
                                <Icon
                                    name="angle-up"
                                    size={15}
                                    color={"#8E7D7D"}
                                    marginLeft={windowWidth * 0.1}
                                />
                            ) : (
                                <Icon
                                    name="angle-down"
                                    size={15}
                                    color={"#8E7D7D"}
                                    marginLeft={windowWidth * 0.1}
                                />
                            )}
                        </TouchableOpacity>
                        {isClicked7 ? (
                            <View style={styles.options}>
                                <View style={styles.option}>
                                    <TouchableOpacity
                                        style={{ width: "180%" }}
                                        onPress={() => {
                                            setSelectedOption7("yes");
                                            setIsClicked7(false);
                                            setIsClicked15(true);
                                        }}
                                    >
                                        <Text style={{ fontSize: 15 }}>Yes</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={{ width: "180%" }}
                                        onPress={() => {
                                            setSelectedOption7("No");
                                            setIsClicked7(false);
                                            setIsClicked15(false);
                                            setSelectedDetails7("");
                                        }}
                                    >
                                        <Text style={{ fontSize: 15, marginTop: windowWidth * 0.02 }}>
                                            No
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : null}
                        {isClicked15 ? (
                            <View>
                                <View style={styles.problems}>
                                    <View style={styles.problist}>
                                        <Text style={{ fontWeight: "700", fontSize: 16, width: "50%" }}>
                                            Add Details :
                                        </Text>
                                    </View>
                                    <TouchableOpacity style={styles.textbox}>
                                        <TextInput
                                            style={{ fontSize: 15, width: windowWidth * 0.8 }}
                                            placeholder="Enter Here"
                                            placeholderTextColor={"#8E7D7D"}
                                            onChangeText={(text) => setSelectedDetails7(text)}
                                        />
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.hosopt1}>
                                    <Icon name="paperclip" size={22} color={Color.colorGray_100} />
                                    <Text style={{ fontWeight: '700', fontSize: 15, width: windowWidth * 0.42, color: '#8E7D7D', marginLeft: windowWidth * 0.05 }}>
                                        {pickedFile3 ? pickedFile3.name : 'Upload Discharge Certificate'}
                                    </Text>
                                    <TouchableOpacity style={styles.uploadbutton} onPress={pickFile3}>
                                        {isLoading4 ? (
                                            <ActivityIndicator size="small" color={'#35A9EA'} />
                                        ) : (
                                            <Text style={{ fontWeight: '700', fontSize: 15, color: '#35A9EA', alignSelf: 'center' }}>Upload</Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
                            </View>
                        ) : null}
                        <View style={styles.reqdet}>
                            <Text style={styles.texthead}>Request</Text>
                        </View>
                        <View style={{ paddingHorizontal: 10 }}>
                            <SelectList
                                setSelected={handleRequestSelection}
                                data={Req_Options}
                                save="value"
                                placeholder='Select'
                                searchPlaceholder='Search'
                                boxStyles={{
                                    borderRadius: 5,
                                    borderWidth: 0.5,
                                    borderColor: '#A99F9F',
                                    marginTop: windowWidth * 0.03,
                                    backgroundColor: '#e3e3e3',
                                    paddingLeft: 15,
                                    paddingRight: 15,
                                }}
                                inputStyles={{ color: '#8E7D7D', fontSize: 15 }}
                            />
                            {selectedRequest === 'Others' && (
                                <TextInput
                                    value={otherText}
                                    onChangeText={setOtherText}
                                    placeholder="Enter request"
                                    placeholderTextColor={"#8E7D7D"}
                                    style={{
                                        marginTop: 10,
                                        borderWidth: 0.5,
                                        borderColor: '#A99F9F',
                                        borderRadius: 5,
                                        paddingHorizontal: 10,
                                        paddingVertical: 8,
                                        // backgroundColor: "#F1F4F3",
                                    }}
                                />
                            )}
                        </View>
                        <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
                            {isLoading3 ? (
                                <ActivityIndicator size="small" color={Color.colorWhite} />
                            ) : (
                                <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>
                                    Submit
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    reqcontainer: {
        flex: 1,
        backgroundColor: '#fff',
        // marginBottom: windowWidth*0.3
    },
    reqheader: {
        flexDirection: 'row',
        // alignItems: 'center',
        width: '100%',
        height: windowWidth * 0.25,
        marginHorizontal: windowWidth * 0.025,
        marginBottom: windowWidth * 0.01,
        // marginTop: windowWidth * 0.05,
        // elevation: 5
    },
    backButton14: {
        marginRight: windowWidth * 0.01,
        marginLeft: windowWidth * 0.01,
        marginTop: windowWidth * 0.12,
        position: 'absolute',
        left: 0,
    },
    text14: {
        fontWeight: "bold",
        fontSize: 25,
        marginLeft: windowWidth * 0.08,
        marginTop: windowWidth * 0.12,
        fontFamily: 'regular01',
    },
    reqdet: {
        marginLeft: 15,
        marginTop: windowWidth * 0.05,
    },
    texthead: {
        fontWeight: "700",
        fontSize: 17,
    },
    dropdown13: {
        width: "95%",
        height: 50,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: "#A99F9F",
        alignSelf: "center",
        marginTop: windowWidth * 0.03,
        backgroundColor: "#e3e3e3",
        flexDirection: "row",
        alignItems: "center",
        paddingLeft: 15,
        paddingRight: 15,
    },
    submitButton: {
        backgroundColor: "#35A9EA",
        width: windowWidth * 0.95,
        height: windowWidth * 0.13,
        marginTop: windowWidth * 0.1,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        elevation: 3,
    },
    options: {
        width: windowWidth * 0.94,
        height: 70,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: "#fff",
        elevation: 2,
        marginLeft: windowWidth * 0.03,
        paddingLeft: 15,
        paddingTop: 10,
    },
    option: {
        width: "50%",
        height: "50%",
        alignSelf: "flex-start",
    },
    problems: {
        width: "95%",
        height: windowWidth * 0.37,
        backgroundColor: "#e3e3e3",
        marginTop: windowWidth * 0.05,
        borderRadius: 10,
        alignSelf: "center",
        marginTop: windowWidth * 0.05,
        backgroundColor: "#e3e3e3",
        paddingLeft: 15,
        paddingRight: 15,
    },
    problist: {
        flexDirection: "row",
        marginTop: windowWidth * 0.05,
        justifyContent: "flex-start",
        // alignItems: 'center'
    },
    textbox: {
        width: "100%",
        height: 60,
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: "#A99F9F",
        alignSelf: "center",
        marginTop: windowWidth * 0.03,
        backgroundColor: "#F1F4F3",
        flexDirection: "row",
        paddingLeft: 10,
        paddingRight: 10,
    },
    hosopt1: {
        width: windowWidth * 0.95,
        height: windowWidth * 0.17,
        alignSelf: 'center',
        marginTop: windowWidth * 0.05,
        backgroundColor: '#e3e3e3',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        borderRadius: 10
    },
    uploadbutton: {
        width: windowWidth * 0.3,
        height: windowWidth * 0.1,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: '#35A9EA',
        borderRadius: 5,
        justifyContent: 'center'
    },
    innercont: {
        marginBottom: windowWidth * 0.08
    }
});

export default Request;