import React, { useState ,useEffect} from "react";
import { View, Platform,StatusBar,StyleSheet,Alert, Text, Dimensions, TouchableOpacity, SafeAreaView, ScrollView, ActivityIndicator, TextInput } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
const windowWidth = Dimensions.get("window").width;
import Icon from "react-native-vector-icons/FontAwesome5";
import { Color } from "../../GlobalStyles";
import axios from "axios";
import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';
import { backendURL } from "../backendapi";
import { useNavigation, useRoute } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UploadReport = () => {
    const route = useRoute();
    const { patientId: routePatientId } = route.params || {};
    const [patientId, setPatientId] = useState(routePatientId);
    const navigation = useNavigation();
    const [isLoading1, setIsLoading1] = useState(false);
    const [isClicked7, setIsClicked7] = useState(false);
    const [selectedOption7, setSelectedOption7] = useState("Select");
    const [selectedDetails7, setSelectedDetails7] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isClicked15, setIsClicked15] = useState(false);
    const patientRequestURL =`${backendURL}/patientRouter/uploadReports`;

    useEffect(() => {
        const getPatientId = async () => {
            try {
                if (route.params && route.params.patientId) {
                    setPatientId(route.params.patientId);
                } else {
                    const storedPatientId = await AsyncStorage.getItem('patientId');
                    if (storedPatientId) {
                        setPatientId(storedPatientId);
                    } else {
                        console.error('PatientId not found');
                    }
                }
            } catch (error) {
                console.error('Error fetching patientId:', error);
            }
        };

        getPatientId();
    }, []);
    const [multiplereportFields, setMultipleReportFields] = useState([
        { id: 1, details: '', certificate: null, uploading: false }
      ]);
      
   
      const addReportField = () => {
        const newId = multiplereportFields.length > 0 
          ? Math.max(...multiplereportFields.map(field => field.id)) + 1 
          : 1;
        
        setMultipleReportFields([
          ...multiplereportFields, 
          { id: newId, details: '', certificate: null, uploading: false }
        ]);
      };
    
      const removeReportField = (idToRemove) => {
        setMultipleReportFields(
          multiplereportFields.filter(field => field.id !== idToRemove)
        );
      };
      
      const uploadToCloudinaryMultipleReports = async (file, type, fieldId) => {
        const updatedFields = [...multiplereportFields];
        const fieldIndex = updatedFields.findIndex(field => field.id === fieldId);
        
        if (fieldIndex === -1) return;
        
        updatedFields[fieldIndex].uploading = true;
        setMultipleReportFields(updatedFields);
        
        try {
          const formData = new FormData();
          formData.append('file', {
            uri: file.uri,
            name: file.name || `${Date.now()}.${type === 'image' ? 'jpg' : 'pdf'}`,
            type: file.mimeType || (type === 'image' ? 'image/jpeg' : 'application/pdf'),
          });
          
          const response = await fetch(`${backendURL}/upload`, {
            method: 'POST',
            body: formData,
          });
          
          if (response.ok) {
            const data = await response.json();
            
            const finalUpdatedFields = [...multiplereportFields];
            const finalFieldIndex = finalUpdatedFields.findIndex(field => field.id === fieldId);
            
            finalUpdatedFields[finalFieldIndex] = {
              ...finalUpdatedFields[finalFieldIndex],
              certificate: {
                name: file.name || data.fileName,
                type: file.mimeType || (type === 'image' ? 'image/jpeg' : 'application/pdf'),
                uri: data.fileName,
              },
              uploading: false
            };
            
            setMultipleReportFields(finalUpdatedFields);
          } else {
            throw new Error('Failed to upload file to server');
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          const finalUpdatedFields = [...multiplereportFields];
          const finalFieldIndex = finalUpdatedFields.findIndex(field => field.id === fieldId);
          
          finalUpdatedFields[finalFieldIndex] = {
            ...finalUpdatedFields[finalFieldIndex],
            certificate: null,
            uploading: false
          };
          
          setMultipleReportFields(finalUpdatedFields);
          
          Alert.alert('Error uploading file. Please check your internet connection and try again.');
        }
      };
      const pickDocumentMultipleReports = async (fieldId) => {
        try {
          const result = await DocumentPicker.getDocumentAsync({
            type: ['application/pdf', 'application/msword', 
                   'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
            copyToCacheDirectory: true
          });
      
          if (!result.canceled) {
            await uploadToCloudinaryMultipleReports(result.assets[0], 'document', fieldId);
          }
        } catch (error) {
          console.error('Error picking document:', error);
          Alert.alert('Error selecting document. Please try again.');
        }
      };
      const pickImageMultipleReports = async (source, fieldId) => {
        try {
          let result;
          
          if (source === 'camera') {
            const { status } = await ImagePicker.requestCameraPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Sorry, we need camera permissions to make this work!');
              return;
            }
            
            result = await ImagePicker.launchCameraAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            });
          } else {
            const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
              Alert.alert('Sorry, we need gallery permissions to make this work!');
              return;
            }
            
            result = await ImagePicker.launchImageLibraryAsync({
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              allowsEditing: true,
              quality: 1,
            });
          }
      
          if (!result.canceled) {
            await uploadToCloudinaryMultipleReports(result.assets[0], 'image', fieldId);
          }
        } catch (error) {
          console.error('Error picking image:', error);
          Alert.alert('Error selecting image. Please try again.');
        }
      };
      const showOptionsMultipleReports = (fieldId) => {
        if (Platform.OS === 'ios') {
          Alert.alert(
            'Select File',
            'Choose a method',
            [
              {
                text: 'Take Photo',
                onPress: () => pickImageMultipleReports('camera', fieldId)
              },
              {
                text: 'Choose from Gallery',
                onPress: () => pickImageMultipleReports('gallery', fieldId)
              },
              {
                text: 'Upload Document',
                onPress: () => pickDocumentMultipleReports(fieldId)
              },
              {
                text: 'Cancel',
                style: 'cancel'
              }
            ]
          );
        } else {
          Alert.alert(
            'Select File',
            'Choose a method',
            [
              {
                text: 'Take Photo',
                onPress: () => pickImageMultipleReports('camera', fieldId)
              },
              {
                text: 'Cancel',
                style: 'cancel'
              },
              {
                text: 'More Options',
                onPress: () => {
                  Alert.alert(
                    'More Options',
                    '',
                    [
                      {
                        text: 'Upload Document',
                        onPress: () => pickDocumentMultipleReports(fieldId)
                      },
                      {
                        text: 'Choose from Gallery',
                        onPress: () => pickImageMultipleReports('gallery', fieldId)
                      },
                      {
                        text: 'Cancel',
                        style: 'cancel'
                      },
                    ]
                  );
                }
              }
            ]
          );
        }
      };
    const handleSave = async () => {
        if (isSubmitting) {
            return;
        }

        if (!patientId) {
            console.error('PatientId is not available');
            return;
        }

        try {
            setIsSubmitting(true);
            setIsLoading1(true);
            const multiplereportData = multiplereportFields.map(field => ({
                documentname: field.details || "NA",
                document: field.certificate ? field.certificate.uri : "NA"
              }));
               
            const reqData = {
                patientId: patientId,
                multipledocument: multiplereportData    
            };

            const response = await fetch(patientRequestURL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(reqData),
            });

            if (response.ok) {
                console.log("Report sent successfully");
                setIsLoading1(false);
                
                Alert.alert("Success", "Report Sent Successfully");
                navigation.navigate('BottomNavigation');
            } else {
                Alert.alert("Sorry", "Something went wrong. Please try again.");
                console.error('Failed to send report:', response.status);
                setIsLoading1(false);
               
            }
        } catch (error) {
            console.error('Error sending request:', error);
            Alert.alert("Error", "Failed to submit report. Please try again.");
            setIsLoading1(false);
           
        } finally {
            setIsSubmitting(false);
        }
    };
    const handleBack = () => {
        navigation.goBack();
    };
    return (
        <View style={styles.reqcontainer}>
             <StatusBar 
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
            backgroundColor="#FFFFFF"
            translucent={false}
        />
            <SafeAreaView style={{ marginTop: 20 }}>
                <View style={styles.reqheader}>
                    <TouchableOpacity onPress={handleBack} style={styles.backButton14}>
                        <Text><Icon name="angle-left" size={30} color={Color.colorBlack} /></Text>
                    </TouchableOpacity>
                    <Text style={styles.text14}>Upload Reports</Text>
                </View>
                <ScrollView style={{ marginBottom: windowWidth * 0.23, paddingBottom: 10, elevation: 5, backgroundColor: Color.colorWhite }}>
                    <View style={styles.innercont}>
                      
                        
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
                                        style={{ width: "180%" , fontWeight: '700', }}
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
    {multiplereportFields.map((field, index) => (
      <View key={field.id} style={styles.multiplereportContainer}>
        {index > 0 && (
          <TouchableOpacity 
          style={styles.removeButton}
            onPress={() => removeReportField(field.id)}
          >
             <Icon name="times" size={20} color="#FF4444" />
          </TouchableOpacity>
        )}

        <View style={styles.problems}>
          <View style={styles.problist}>
            <Text style={{ fontWeight: "700", fontSize: 16, width: "50%" }}>
              Add Details:
            </Text>
          </View>
          <TouchableOpacity style={styles.textbox}>
            <TextInput
              style={{ fontSize: 15, width: windowWidth * 0.8 }}
              placeholder="Enter Here"
              placeholderTextColor={"#8E7D7D"}
              value={field.details}
              onChangeText={(text) => {
                const updatedFields = [...multiplereportFields];
                const fieldIndex = updatedFields.findIndex(f => f.id === field.id);
                updatedFields[fieldIndex].details = text;
                setMultipleReportFields(updatedFields);
              }}
            />
          </TouchableOpacity>
        </View>
        
        <View style={styles.hosopt1}>
          <Icon name="paperclip" size={22} color={Color.colorGray_100} />
          <Text style={{ 
            fontWeight: '700', 
            fontSize: 15, 
            width: windowWidth * 0.42, 
            color: '#8E7D7D', 
            marginLeft: windowWidth * 0.05 
          }}>
            {field.certificate ? field.certificate.name : 'Upload Report'}
          </Text>
          <TouchableOpacity 
            style={styles.uploadbutton} 
            onPress={() => showOptionsMultipleReports(field.id)}
            disabled={field.uploading}
          >
            {field.uploading ? (
              <ActivityIndicator size="small" color={'#357EEA'} />
            ) : (
              <Text style={{ 
                fontWeight: '700', 
                fontSize: 15, 
                color: '#357EEA', 
                alignSelf: 'center' 
              }}>
                Upload
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    ))}
    <TouchableOpacity 
      style={styles.addMoreButton} 
      onPress={addReportField}
    >
      <Icon name="plus" size={20} color="#357EEA" />
      <Text style={styles.addMoreButtonText}>Add More Report</Text>
    </TouchableOpacity>
  </View>
  ) : null}
                        
                    <TouchableOpacity 
                        style={[
                            styles.submitButton,
                            isSubmitting && { opacity: 0.7 }
                        ]} 
                        onPress={handleSave}
                        disabled={isSubmitting}
                    >
                        {isLoading1 ? (
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
        marginTop:-windowWidth*0.05,
        // marginBottom: windowWidth*0.3
    },
    // reqheader: {
    //     flexDirection: 'row',
    //     // alignItems: 'center',
    //     width: '100%',
    //     height: windowWidth * 0.25,
    //     marginHorizontal: windowWidth * 0.025,
    //     marginBottom: windowWidth * 0.01,
    //     // marginTop: windowWidth * 0.05,
    //     // elevation: 5
    // },
    // backButton14: {
    //     marginRight: windowWidth * 0.01,
    //     marginLeft: windowWidth * 0.01,
    //     marginTop: windowWidth * 0.12,
    //     position: 'absolute',
    //     left: 0,
    // },
    text14: {
      fontWeight: "bold",
      fontSize: 25,
      marginLeft: windowWidth * 0.15,
      marginTop: windowWidth * 0.1,
      fontFamily: 'regular01',
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
      marginLeft: windowWidth * 0.05,
      marginTop: windowWidth * 0.1,
      position: 'absolute',
      left: 0,
  },
    fileNameText: {
        fontWeight: '700',
        fontSize: 15,
        width: windowWidth * 0.42,
        color: '#8E7D7D',
        marginLeft: windowWidth * 0.05,
      },
      uploadbutton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        backgroundColor: '#F5F5F5',
      },
      uploadText: {
        fontWeight: '700',
        fontSize: 15,
        color: '#357EEA',
        alignSelf: 'center',
      },
    // text14: {
    //     fontWeight: "bold",
    //     fontSize: 25,
    //     marginLeft: windowWidth * 0.08,
    //     marginTop: windowWidth * 0.12,
    //     fontFamily: 'regular01',
    // },
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
        backgroundColor: "#357EEA",
        width: windowWidth * 0.95,
        height: windowWidth * 0.13,
        marginTop: windowWidth * 0.1,
        alignSelf: "center",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 5,
        elevation: 3,
        opacity: 1,
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
    multiplereportContainer: {
      marginBottom: 15,
      position: 'relative',
    },
    removeFieldButton: {
      position: 'absolute', 
      top: 0, 
      right: 0, 
      zIndex: 10,
    },
    addMoreButton: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 10,
      backgroundColor: '#F0F0F0',
      borderRadius: 5,
      marginTop: 10,
    },
    addMoreButtonText: {
      color: '#357EEA',
      marginLeft: 10,
      fontWeight: '700',
    },
    removeButton: {
      padding: 5,
      marginLeft: 15,
    },
    // hosopt1: {
    //     flexDirection: 'row',
    //     alignItems: 'center',
    //     padding: 10,
    //     backgroundColor: '#FFFFFF',
    //     borderRadius: 8,
    //     shadowColor: '#000',
    //     shadowOffset: {
    //       width: 0,
    //       height: 2,
    //     },
    //     shadowOpacity: 0.25,
    //     shadowRadius: 3.84,
    //     elevation: 5,
    //   },
    // uploadbutton: {
    //     width: windowWidth * 0.3,
    //     height: windowWidth * 0.1,
    //     backgroundColor: '#fff',
    //     borderWidth: 2,
    //     borderColor: '#357EEA',
    //     borderRadius: 5,
    //     justifyContent: 'center'
    // },
    innercont: {
        marginBottom: windowWidth * 0.08
    }
});
export default UploadReport;