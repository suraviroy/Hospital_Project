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

const Request = () => {
    const route = useRoute();
    const { patientId: routePatientId } = route.params || {};
    const [patientId, setPatientId] = useState(routePatientId);
    const navigation = useNavigation();
    const [isLoading1, setIsLoading1] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [isLoading3, setIsLoading3] = useState(false);
    const [isLoading4, setIsLoading4] = useState(false);
    const [isLoading5, setIsLoading5] = useState(false);
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
    // const [selectedRequest, setSelectedRequest] = useState("Select");
    const [selectedRequests, setSelectedRequests] = useState([]);
    const [otherTexts, setOtherTexts] = useState({}); 
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
    const [pickedFile5, setPickedFile5] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
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
    const handleRequestSelection = (value) => {
      if (value === "Select") {
          return;
      }
  
      setSelectedRequests(prev => {
          // If item already exists, remove it (toggle behavior)
          if (prev.includes(value)) {
              return prev.filter(item => item !== value);
          }
          // Otherwise add it
          return [...prev, value];
      });
  };
  const handleOtherText = (text, index) => {
    setOtherTexts(prev => ({
        ...prev,
        [index]: text
    }));
};
    // const handleRequestSelection = (val) => {
    //     setSelectedRequest(val);
    //     if (val === 'Others') {
    //         setOtherText('');
    //     }
    // };
    //  const [multiplereportFields, setmultiplereportFields] = useState([
    //     { id: 1,details:'', certificate: null, uploading: false }
    //   ]);

    const showOptions1 = () => {
        if (Platform.OS === 'ios') {
          Alert.alert(
            'Select File',
            'Choose a method',
            [
                {
                    text: 'Take Photo',
                    onPress: () => pickImage1('camera')
                  },
                  {
                    text: 'Choose from Gallery',
                    onPress: () => pickImage1('gallery')
                  },
                  {
                    text: 'Upload Document',
                    onPress: () => pickDocument1()
                  },
              {
                text: 'Cancel',
                style: 'cancel'
              }
            ]
          );
        } else {
          // Android can only show 3 buttons maximum
          Alert.alert(
            'Select File',
            'Choose a method',
            [
                {
                    text: 'Take Photo',
                    onPress: () => pickImage1('camera')
                  },
              {
                text: 'Cancel',
                style: 'cancel'
              },
              {
                text: 'More Options',
                onPress: () => {
                  // Show a second alert for the remaining options
                  Alert.alert(
                    'More Options',
                    '',
                    [
                        {
                            text: 'Upload Document',
                            onPress: () => pickDocument1()
                          },
                      {
                        text: 'Choose from Gallery',
                        onPress: () => pickImage1('gallery')
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
      const pickImage1 = async (source) => {
        try {
          let result;
          
          if (source === 'camera') {
            // Request camera permissions
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
            // Request media library permissions
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
            await uploadToCloudinary1(result.assets[0], 'image');
          }
        } catch (error) {
          console.error('Error picking image:', error);
          Alert.alert('Error selecting image. Please try again.');
        }
      };
    
      const pickDocument1 = async () => {
        try {
          const result = await DocumentPicker.getDocumentAsync({
            type: ['application/pdf', 'application/msword', 
                   'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
            copyToCacheDirectory: true
          });
    
          if (!result.canceled) {
            await uploadToCloudinary1(result.assets[0], 'document');
          }
        } catch (error) {
          console.error('Error picking document:', error);
          Alert.alert('Error selecting document. Please try again.');
        }
      };
    
      const uploadToCloudinary1 = async (file, type) => {
        setIsLoading2(true);
        try {
          const formData = new FormData();
          formData.append('file', {
            uri: file.uri,
            name: file.name || `${Date.now()}.${type === 'image' ? 'jpg' : 'pdf'}`,
            type: file.mimeType || (type === 'image' ? 'image/jpeg' : 'application/pdf'),
          });
      
          const response = await fetch( `${backendURL}/upload`, {
            method: 'POST',
            body: formData,
          });
      
          if (response.ok) {
            const data = await response.json();
            console.log('Upload response:', data);
      
            // Check if the response contains fileName as shown in your example
            if (data && data.fileName) {
              setPickedFile1({
                name: file.name || data.fileName,
                type: file.mimeType || (type === 'image' ? 'image/jpeg' : 'application/pdf'),
                uri: data.fileName, // Construct the file URL
              });
              console.log("Uploaded file name:", data.fileName);
            } else {
              throw new Error('Invalid response format from server');
            }
          } else {
            throw new Error('Failed to upload file to server');
          }
        } catch (error) {
          console.error('Error uploading file:', error);
          Alert.alert('Error uploading file. Please check your internet connection and try again.');
        } finally {
          setIsLoading2(false);
        }
      };
        // const pickFile5 = async () => {
        //     setIsLoading5(true);
        //     try {
        //         const filePickResponse = await DocumentPicker.getDocumentAsync({
        //           type: 'application/pdf',
        //           copyToCacheDirectory: true
        //         });
          
        //         if (!filePickResponse.canceled) {
        //           const fileInfo = filePickResponse.assets[0];
        //           const formData = new FormData();
        //           formData.append('file', {
        //             uri: fileInfo.uri,
        //             name: fileInfo.name,
        //             type: 'application/pdf',
        //           });
        //           formData.append('upload_preset', 'pulmocareapp');
        //           formData.append('cloud_name', 'pulmocare01');
          
        //           try {
                    
        //             const response = await fetch(
        //               'https://api.cloudinary.com/v1_1/pulmocare01/image/upload',
        //               {
        //                 method: 'POST',
        //                 body: formData,
        //               }
        //             );
          
        //             if (response.ok) {
        //               const data = await response.json();
        //               console.log('Cloudinary response:', data);
          
        //               setPickedFile5({
        //                 name: data.original_filename || fileInfo.name,
        //                 type: fileInfo.mimeType || 'application/pdf',
        //                 uri: data.secure_url,
        //               });
        //             } else {
        //               console.error('Failed to upload file to Cloudinary');
        //               alert('Failed to upload file. Please try again.');
        //             }
        //           } catch (error) {
        //             console.error('Error uploading file:', error);
        //             alert('Error uploading file. Please check your internet connection and try again.');
        //           } 
        //         }
        //       } catch (error) {
        //         console.error('Error picking file:', error);
        //         alert('Error selecting file. Please try again.');
        //       }
        //       finally {
        //         setIsLoading5(false);
        //       }
        //     };
        const showOptions5 = () => {
            if (Platform.OS === 'ios') {
              Alert.alert(
                'Select File',
                'Choose a method',
                [
                    {
                        text: 'Take Photo',
                        onPress: () => pickImage5('camera')
                      },
                      {
                        text: 'Choose from Gallery',
                        onPress: () => pickImage5('gallery')
                      },
                      {
                        text: 'Upload Document',
                        onPress: () => pickDocument5()
                      },
                  {
                    text: 'Cancel',
                    style: 'cancel'
                  }
                ]
              );
            } else {
              // Android can only show 3 buttons maximum
              Alert.alert(
                'Select File',
                'Choose a method',
                [
                    {
                        text: 'Take Photo',
                        onPress: () => pickImage5('camera')
                      },
                  {
                    text: 'Cancel',
                    style: 'cancel'
                  },
                  {
                    text: 'More Options',
                    onPress: () => {
                      // Show a second alert for the remaining options
                      Alert.alert(
                        'More Options',
                        '',
                        [
                            {
                                text: 'Upload Document',
                                onPress: () => pickDocument5()
                              },
                          {
                            text: 'Choose from Gallery',
                            onPress: () => pickImage5('gallery')
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
          const pickImage5 = async (source) => {
            try {
              let result;
              
              if (source === 'camera') {
                // Request camera permissions
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
                // Request media library permissions
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
                await uploadToCloudinary5(result.assets[0], 'image');
              }
            } catch (error) {
              console.error('Error picking image:', error);
              Alert.alert('Error selecting image. Please try again.');
            }
          };
        
          const pickDocument5 = async () => {
            try {
              const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'application/msword', 
                       'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
                copyToCacheDirectory: true
              });
        
              if (!result.canceled) {
                await uploadToCloudinary5(result.assets[0], 'document');
              }
            } catch (error) {
              console.error('Error picking document:', error);
              Alert.alert('Error selecting document. Please try again.');
            }
          };
        
          const uploadToCloudinary5= async (file, type) => {
            setIsLoading5(true);
            try {
              const formData = new FormData();
              formData.append('file', {
                uri: file.uri,
                name: file.name || `${Date.now()}.${type === 'image' ? 'jpg' : 'pdf'}`,
                type: file.mimeType || (type === 'image' ? 'image/jpeg' : 'application/pdf'),
              });
          
              const response = await fetch( `${backendURL}/upload`, {
                method: 'POST',
                body: formData,
              });
          
              if (response.ok) {
                const data = await response.json();
                console.log('Upload response:', data);
          
                // Check if the response contains fileName as shown in your example
                if (data && data.fileName) {
                  setPickedFile5({
                    name: file.name || data.fileName,
                    type: file.mimeType || (type === 'image' ? 'image/jpeg' : 'application/pdf'),
                    uri: data.fileName, // Construct the file URL
                  });
                  console.log("Uploaded file name:", data.fileName);
                } else {
                  throw new Error('Invalid response format from server');
                }
              } else {
                throw new Error('Failed to upload file to server');
              }
            } catch (error) {
              console.error('Error uploading file:', error);
              Alert.alert('Error uploading file. Please check your internet connection and try again.');
            }finally {
              setIsLoading5(false);
            }
          };
          const showOptions2 = () => {
            if (Platform.OS === 'ios') {
              Alert.alert(
                'Select File',
                'Choose a method',
                [
                    {
                        text: 'Take Photo',
                        onPress: () => pickImage2('camera')
                      },
                      {
                        text: 'Choose from Gallery',
                        onPress: () => pickImage2('gallery')
                      },
                      {
                        text: 'Upload Document',
                        onPress: () => pickDocument2()
                      },
                  {
                    text: 'Cancel',
                    style: 'cancel'
                  }
                ]
              );
            } else {
              // Android can only show 3 buttons maximum
              Alert.alert(
                'Select File',
                'Choose a method',
                [
                    {
                        text: 'Take Photo',
                        onPress: () => pickImage2('camera')
                      },
                  {
                    text: 'Cancel',
                    style: 'cancel'
                  },
                  {
                    text: 'More Options',
                    onPress: () => {
                      // Show a second alert for the remaining options
                      Alert.alert(
                        'More Options',
                        '',
                        [
                            {
                                text: 'Upload Document',
                                onPress: () => pickDocument2()
                              },
                          {
                            text: 'Choose from Gallery',
                            onPress: () => pickImage2('gallery')
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
          const pickImage2 = async (source) => {
            try {
              let result;
              
              if (source === 'camera') {
                // Request camera permissions
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
                // Request media library permissions
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
                await uploadToCloudinary2(result.assets[0], 'image');
              }
            } catch (error) {
              console.error('Error picking image:', error);
              Alert.alert('Error selecting image. Please try again.');
            }
          };
        
          const pickDocument2 = async () => {
            try {
              const result = await DocumentPicker.getDocumentAsync({
                type: ['application/pdf', 'application/msword', 
                       'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
                copyToCacheDirectory: true
              });
        
              if (!result.canceled) {
                await uploadToCloudinary2(result.assets[0], 'document');
              }
            } catch (error) {
              console.error('Error picking document:', error);
              Alert.alert('Error selecting document. Please try again.');
            }
          };
        
          const uploadToCloudinary2= async (file, type) => {
            setIsLoading3(true);
            try {
              const formData = new FormData();
              formData.append('file', {
                uri: file.uri,
                name: file.name || `${Date.now()}.${type === 'image' ? 'jpg' : 'pdf'}`,
                type: file.mimeType || (type === 'image' ? 'image/jpeg' : 'application/pdf'),
              });
          
              const response = await fetch( `${backendURL}/upload`, {
                method: 'POST',
                body: formData,
              });
          
              if (response.ok) {
                const data = await response.json();
                console.log('Upload response:', data);
          
                // Check if the response contains fileName as shown in your example
                if (data && data.fileName) {
                  setPickedFile2({
                    name: file.name || data.fileName,
                    type: file.mimeType || (type === 'image' ? 'image/jpeg' : 'application/pdf'),
                    uri: data.fileName, // Construct the file URL
                  });
                  console.log("Uploaded file name:", data.fileName);
                } else {
                  throw new Error('Invalid response format from server');
                }
              } else {
                throw new Error('Failed to upload file to server');
              }
            } catch (error) {
              console.error('Error uploading file:', error);
              Alert.alert('Error uploading file. Please check your internet connection and try again.');
            }finally {
              setIsLoading3(false);
            }
          };

       
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

    // const validateForm = () => {
    //     if (selectedRequest === 'Select') {
    //         Alert.alert("Alert", "Please select a request type");
    //         return false;
    //     }

    //     if (selectedRequest === 'Others' && !otherText.trim()) {
    //         Alert.alert("Alert", "Please enter your request details");
    //         return false;
    //     }

    //     return true;
    // };

    const handleSave = async () => {
        if (isSubmitting) {
            return;
        }

        // if (!validateForm()) {
        //     return;
        // }

        if (!patientId) {
            console.error('PatientId is not available');
            return;
        }

        try {
            setIsSubmitting(true);
            setIsLoading1(true);
            const multiplereportData = multiplereportFields.map(field => ({
              details: field.details || "NA",
              certificate: field.certificate ? field.certificate.uri : "NA"
            }));
            const requestsData = selectedRequests.map(request => ({
              requestFor: request === "Others" ? otherTexts[request] || "NA" : request,
              details: "NA" // You can add details handling if needed
          }));

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
                    dischargeCertificate: pickedFile1 ? pickedFile1.uri : "NA",
                },
                hospitalization: {
                    isSelected: selectedOption4 === "Select" ? "NA" : selectedOption4,
                    records: selectedDetails4 || "NA",
                    dischargeHCertificate: pickedFile5 ? pickedFile5.uri : "NA",
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
                  multiplereport: multiplereportData
                },
                request: requestsData.length > 0 ? requestsData : [{ requestFor: "NA", details: "NA" }],
                action: "NA"
            };

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
                setIsLoading5(false);
                setIsLoading4(false);
                Alert.alert("Success", "Request Sent Successfully");
                navigation.navigate('BottomNavigation');
            } else {
                Alert.alert("Sorry", "Something went wrong. Please try again.");
                console.error('Failed to send request:', response.status);
                setIsLoading1(false);
                setIsLoading2(false);
                setIsLoading3(false);
                setIsLoading5(false);
                setIsLoading4(false);
            }
        } catch (error) {
            console.error('Error sending request:', error);
            Alert.alert("Error", "Failed to submit request. Please try again.");
            setIsLoading1(false);
            setIsLoading2(false);
            setIsLoading3(false);
            setIsLoading4(false);
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
                                            setIsLoading2(false);
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
      <Icon name="paperclip" size={22} color="#8E7D7D" />
      <Text style={styles.fileNameText}>
        {pickedFile1 ? pickedFile1.name : 'Upload Prescription/Image'}
      </Text>
      <TouchableOpacity style={styles.uploadbutton} onPress={showOptions1}>
        {isLoading2 ? (
          <ActivityIndicator size="small" color="#357EEA" />
        ) : (
          <Text style={styles.uploadText}>Upload</Text>
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
                            <View>
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
                            <View style={styles.hosopt1}>
                                    <Icon name="paperclip" size={22} color={Color.colorGray_100} />
                                    <Text style={{ fontWeight: '700', fontSize: 15, width: windowWidth * 0.42, color: '#8E7D7D', marginLeft: windowWidth * 0.05 }}>
                                        {pickedFile5 ? pickedFile5.name : 'Upload Discharge Certificate'}
                                    </Text>
                                    <TouchableOpacity style={styles.uploadbutton} onPress={showOptions5}>
                                        {isLoading5 ? (
                                            <ActivityIndicator size="small" color={'#357EEA'} />
                                        ) : (
                                            <Text style={{ fontWeight: '700', fontSize: 15, color: '#357EEA', alignSelf: 'center' }}>Upload</Text>
                                        )}
                                    </TouchableOpacity>
                                </View>
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
                                    {pickedFile2 ? pickedFile2.name : 'Upload Death Certificate'}
                                </Text>
                                <TouchableOpacity style={styles.uploadbutton} onPress={showOptions2}>
                                        {isLoading3 ? (
                                            <ActivityIndicator size="small" color={'#357EEA'} />
                                        ) : (
                                            <Text style={{ fontWeight: '700', fontSize: 15, color: '#357EEA', alignSelf: 'center' }}>Upload</Text>
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
                        <View style={styles.reqdet}>
    <Text style={styles.texthead}>Request*</Text>
</View>
<View style={{ paddingHorizontal: 10 }}>
    {Req_Options.map((option, index) => (
        <View key={option.key} style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
            <TouchableOpacity
                style={{
                    width: 20,
                    height: 20,
                    borderWidth: 1,
                    borderColor: '#A99F9F',
                    backgroundColor: selectedRequests.includes(option.value) ? '#007AFF' : '#e3e3e3',
                    marginRight: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => handleRequestSelection(option.value)}
            >
                {selectedRequests.includes(option.value) && (
                    <Text style={{ color: '#fff' }}>✓</Text>
                )}
            </TouchableOpacity>
            <Text>{option.value}</Text>
        </View>
    ))}
    
    {selectedRequests.includes('Others') && (
        <TextInput
            value={otherTexts['Others']}
            onChangeText={(text) => handleOtherText(text, 'Others')}
            placeholder="Enter request"
            placeholderTextColor={"#8E7D7D"}
            style={{
                marginTop: 10,
                borderWidth: 0.5,
                borderColor: '#A99F9F',
                borderRadius: 5,
                paddingHorizontal: 10,
                paddingVertical: 8,
            }}
        />
    )}
</View>
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

export default Request;