import React, { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  Button,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  Platform,
  StatusBar,
  ActivityIndicator,
  Alert
} from "react-native";
const windowWidth = Dimensions.get("window").width;
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";
import { FontFamily, Color, Border, FontSize } from "../../../GlobalStyles";
import PastHosForm from "./PastHosForm";
import ExiDisForm from "./ExiDisForm";
import axios from "axios";
import PFCForm from "./PFCForm";
import SOSForm from "./SOSForm";
import Exposure from "./Exposure";
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import { PickerIos, Picker } from "@react-native-picker/picker";
import { backendURL } from "../../backendapi";
import moment from 'moment-timezone';
import DateTimePicker from '@react-native-community/datetimepicker';

const DiseaseForm = ({ patientId }) => {
  const [Hosdata, setHosData] = useState([
    {
      yearOfHospitalization: 0,
      days: 0,
      reason: "NA",
      dischargeCertificate: "NA",
    },
  ]);
  const navigation = useNavigation();
  const exposureRef = useRef(null);
  const PFCRef = useRef(null);
  const exiDisRef = useRef(null);
  const [isClicked3, setIsClicked3] = useState(false);
  const [isClicked9, setIsClicked9] = useState(false);
  const [selectedOption1, setSelectedOption1] = useState("Select");
  const [selectedUnit1, setSelectedUnit1] = useState("");
  const [allergyType, setAllergyType] = useState("");
  const [allergyDuration, setAllergyDuration] = useState("");
  const [isClicked4, setIsClicked4] = useState(false);
  const [isClicked10, setIsClicked10] = useState(false);
  const [selectedOption2, setSelectedOption2] = useState("Select");
  const [typeOfDrug, setTypeOfDrug] = useState("");
  const [typeOfReaction, setTypeOfReaction] = useState("");
  const [isClicked5, setIsClicked5] = useState(false);
  const [isClicked11, setIsClicked11] = useState(false);
  const [selectedOption3, setSelectedOption3] = useState("Select");
  const [typeOfSurgery, setTypeOfSurgery] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [isClicked6, setIsClicked6] = useState(false);
  const [isClicked12, setIsClicked12] = useState(false);
  const [selectedOption4, setSelectedOption4] = useState("Select");
  const [typeOfDisease, setTypeOfDisease] = useState("");
  const [isClicked7, setIsClicked7] = useState(false);
  const [isClicked13, setIsClicked13] = useState(false);
  const [selectedOption5, setSelectedOption5] = useState("Select");
  const [familyHistory, setFamilyHistory] = useState("");
  const [occupation, setOccupation] = useState("");
  const [isClicked17, setIsClicked17] = useState(false);
  const [selectedOption8, setSelectedOption8] = useState("Select");
  const years = Array.from(new Array(40), (val, index) => 2023 - index);
  const [selectedOption6, setSelectedOption6] = useState("Select");
  const [selectedOption7, setSelectedOption7] = useState("Select");
  const [catScore, setCatScore] = useState(0);
  const [isClicked15, setIsClicked15] = useState(false);
  const [isClicked16, setIsClicked16] = useState(false);
  const [isClicked8, setIsClicked8] = useState(false);
  const [isClicked14, setIsClicked14] = useState(false);
  const [coordinators, setCoordinators] = useState([]);
  const [selectedCoordinator, setSelectedCoordinator] = useState("Select");
  const [basicDetails, setBasicDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [visitDate, setVisitDate] = useState(new Date());
  const [visitTime, setVisitTime] = useState(new Date());
  const [showVisitDatePicker, setShowVisitDatePicker] = useState(false);
  const [showVisitTimePicker, setShowVisitTimePicker] = useState(false);
  const [pickedFile, setPickedFile] = useState(null);
  const patientDiseaseURL = `${backendURL}/adminRouter/patientEachVisitDetails/${patientId}`;
  useEffect(() => {
    fetch(`${backendURL}/patientRouter/PatientProfile/${patientId}`)
      .then((response) => response.json())
      .then((data) => {
        setBasicDetails(data);
      })
      .catch((error) => {
        console.error("Error fetching patient basic details:", error);
      });
  }, [patientId]);

  const Unit = [
    {
      value: "Days",
      key: "DY",
    },
    {
      value: "Weeks",
      key: "WK",
    },
    {
      value: "Months",
      key: "MT",
    },
    {
      value: "Years",
      key: "YR",
    },
  ];
  
  const [prescriptionFields, setPrescriptionFields] = useState([
    { id: 1, file: null, uploading: false }
  ]);
    const [otherFields, setOtherFields] = useState([
      { id: 1, documentName: '', file: null, uploading: false }
    ]);
  
    const handleDocumentNameChange = (id, text) => {
      setOtherFields(fields =>
        fields.map(field =>
          field.id === id
            ? { ...field, documentName: text }
            : field
        )
      );
    };
  
    const addOtherField = () => {
      setOtherFields(fields => [
        ...fields,
        { id: fields.length + 1, documentName: '', file: null, uploading2: false }
      ]);
    };
  
    const removeOtherField = (id) => {
      setOtherFields(fields => fields.filter(field => field.id !== id));
    };
  // Reusing your existing file handling functions
  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
      Alert.alert('Permission required', 'Please grant camera and media library permissions to use this feature.');
      return false;
    }
    return true;
  };

  // const uploadToCloudinary = async (fileInfo, fieldId) => {
  //   setPrescriptionFields(fields => 
  //     fields.map(field => 
  //       field.id === fieldId 
  //         ? { ...field, uploading: true }
  //         : field
  //     )
  //   );

  //   const formData = new FormData();
  //   formData.append('file', {
  //     uri: fileInfo.uri,
  //     name: fileInfo.name || 'file',
  //     type: fileInfo.type || 'application/octet-stream',
  //   });
  //   formData.append('upload_preset', 'pulmocareapp');
  //   formData.append('cloud_name', 'pulmocare01');

  //   try {
  //     const response = await fetch(
  //       'https://api.cloudinary.com/v1_1/pulmocare01/auto/upload',
  //       {
  //         method: 'POST',
  //         body: formData,
  //       }
  //     );

  //     if (response.ok) {
  //       const data = await response.json();
  //       return {
  //         name: data.original_filename || fileInfo.name,
  //         type: fileInfo.type,
  //         uri: data.secure_url,
  //       };
  //     } else {
  //       throw new Error('Upload failed');
  //     }
  //   } catch (error) {
  //     console.error('Error uploading file:', error);
  //     Alert.alert('Upload Error', 'Failed to upload file. Please try again.');
  //     return null;
  //   } finally {
  //     setPrescriptionFields(fields => 
  //       fields.map(field => 
  //         field.id === fieldId 
  //           ? { ...field, uploading: false }
  //           : field
  //       )
  //     );
  //   }
  // };
  const uploadToCloudinary = async (fileInfo, fieldId) => {
    // Update the prescription field to show uploading status
    setPrescriptionFields(fields =>
        fields.map(field =>
            field.id === fieldId
                ? { ...field, uploading: true }
                : field
        )
    );

    const formData = new FormData();
    formData.append('file', {
        uri: fileInfo.uri,
        name: fileInfo.name || 'file',
        type: fileInfo.type || 'application/octet-stream',
    });

    try {
        // Using your server endpoint instead of Cloudinary
        const response = await fetch(
            `${backendURL}/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (response.ok) {
            const data = await response.json();
            console.log('Upload response:', data);
            
            // Return an object with the same structure as before
            return {
                name: data.fileName || fileInfo.name,
                type: fileInfo.type,
                 uri: `${data.fileName}`,
            };
        } else {
            throw new Error('Upload failed');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        Alert.alert('Upload Error', 'Failed to upload file. Please try again.');
        return null;
    } finally {
        // Update the prescription field to remove uploading status
        setPrescriptionFields(fields =>
            fields.map(field =>
                field.id === fieldId
                    ? { ...field, uploading: false }
                    : field
            )
        );
    }
};
  const uploadToCloudinary2 = async (fileInfo, fieldId) => {
    setOtherFields(fields => 
      fields.map(field => 
        field.id === fieldId 
          ? { ...field, uploading: true }
          : field
      )
    );

    const formData = new FormData();
    formData.append('file', {
        uri: fileInfo.uri,
        name: fileInfo.name || 'file',
        type: fileInfo.type || 'application/octet-stream',
    });

    try {
        // Using your server endpoint instead of Cloudinary
        const response = await fetch(
            `${backendURL}/upload`,
            {
                method: 'POST',
                body: formData,
            }
        );

        if (response.ok) {
            const data = await response.json();
            console.log('Upload response:', data);
            
            // Return an object with the same structure as before
            return {
                name: data.fileName || fileInfo.name,
                type: fileInfo.type,
                uri: `${data.fileName}`,
            };
        } else {
            throw new Error('Upload failed');
        }
    } catch (error) {
        console.error('Error uploading file:', error);
        Alert.alert('Upload Error', 'Failed to upload file. Please try again.');
        return null;
    } finally {
      setOtherFields(fields => 
        fields.map(field => 
          field.id === fieldId 
            ? { ...field, uploading: false }
            : field
        )
      );
    }
  };
  const handleFileUpload = async (fileInfo, fieldId) => {
    const uploadedFile = await uploadToCloudinary(fileInfo, fieldId);
    if (uploadedFile) {
      setPrescriptionFields(fields =>
        fields.map(field =>
          field.id === fieldId
            ? { ...field, file: uploadedFile }
            : field
        )
      );
    }
  };
  const handleFileUpload2 = async (fileInfo, fieldId) => {
    const uploadedFile = await uploadToCloudinary2(fileInfo, fieldId);
    if (uploadedFile) {
      setOtherFields(fields =>
        fields.map(field =>
          field.id === fieldId
            ? { ...field, file: uploadedFile }
            : field
        )
      );
    }
  };

  const showFilePickerOptions = (fieldId) => {
    if (Platform.OS === 'ios') {
      Alert.alert(
        'Select File',
        'Choose a method',
        [
          {
            text: 'Take Photo',
            onPress: () => takePhoto(fieldId)
          },
          {
            text: 'Choose from Gallery',
            onPress: () => pickImage(fieldId)
          },
          {
            text: 'Upload Document',
            onPress: () => pickDocument(fieldId)
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
            onPress: () => takePhoto(fieldId)
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
                    onPress: () => pickDocument(fieldId)
                  },
                  {
                    text: 'Choose from Gallery',
                    onPress: () => pickImage(fieldId)
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

  const pickDocument = async (fieldId) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 
               'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true
      });

      if (!result.canceled) {
        const fileInfo = result.assets[0];
        handleFileUpload(fileInfo, fieldId);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    }
  };

  const pickImage = async (fieldId) => {
    if (!await requestPermissions()) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });

      if (!result.canceled) {
        const fileInfo = {
          uri: result.assets[0].uri,
          type: 'image/jpeg',
          name: 'image.jpg',
        };
        handleFileUpload(fileInfo, fieldId);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const takePhoto = async (fieldId) => {
    if (!await requestPermissions()) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });

      if (!result.canceled) {
        const fileInfo = {
          uri: result.assets[0].uri,
          type: 'image/jpeg',
          name: 'camera.jpg',
        };
        handleFileUpload(fileInfo, fieldId);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };
  const showFilePickerOptions2 = (fieldId) => {
    if (Platform.OS === 'ios') {
      Alert.alert(
        'Select File',
        'Choose a method',
        [
          {
            text: 'Take Photo',
            onPress: () => takePhoto2(fieldId)
          },
          {
            text: 'Choose from Gallery',
            onPress: () => pickImage2(fieldId)
          },
          {
            text: 'Upload Document',
            onPress: () => pickDocument2(fieldId)
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
            onPress: () => takePhoto2(fieldId)
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
                    onPress: () => pickDocument2(fieldId)
                  },
                  {
                    text: 'Choose from Gallery',
                    onPress: () => pickImage2(fieldId)
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

  const pickDocument2 = async (fieldId) => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 
               'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true
      });

      if (!result.canceled) {
        const fileInfo = result.assets[0];
        handleFileUpload2(fileInfo, fieldId);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    }
  };

  const pickImage2 = async (fieldId) => {
    if (!await requestPermissions()) return;

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });

      if (!result.canceled) {
        const fileInfo = {
          uri: result.assets[0].uri,
          type: 'image/jpeg',
          name: 'image.jpg',
        };
        handleFileUpload2(fileInfo, fieldId);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const takePhoto2 = async (fieldId) => {
    if (!await requestPermissions()) return;

    try {
      const result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 0.7,
      });

      if (!result.canceled) {
        const fileInfo = {
          uri: result.assets[0].uri,
          type: 'image/jpeg',
          name: 'camera.jpg',
        };
        handleFileUpload2(fileInfo, fieldId);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };


  const addPrescriptionField = () => {
    setPrescriptionFields(fields => [
      ...fields,
      { id: Date.now(), file: null, uploading: false }
    ]);
  };
  const removePrescriptionField = (id) => {
    setPrescriptionFields(fields => fields.filter(field => field.id !== id));
  };
  const handleDataChange = (index, newData) => {
    let tempData = [...Hosdata];
    tempData[index] = newData;
    setHosData(tempData);
  };

  const handleSave = async () => {
    if (selectedCoordinator === "Select") {
      Alert.alert(
        "Required Field",
        "Please select a coordinator or choose 'Not applicable'"
      );
      return;
    }
    setIsLoading(true);
    const prescriptionData = prescriptionFields
      .filter(field => field.file && field.file.uri)
      .map(field => ({
        prescriptiondocument: field.file.uri
      }));

    if (prescriptionData.length === 0) {
      prescriptionData.push({
        prescriptiondocument: "NA"
      });
    }
    const otherDocumentData = otherFields
      .filter(field => field.file && field.file.uri)
      .map(field => ({
        documentname: field.documentName || "NA",
        document: field.file.uri
      }));

    if (otherDocumentData.length === 0) {
      otherDocumentData.push({
        documentname: "NA",
        document: "NA"
      });
    }
   
    const statusOfSickness =
      selectedOption8 === "Select" ? "NA" : selectedOption8;
    const coordinator = selectedCoordinator;
      const desiredTimezone = "Asia/Kolkata";

      const formattedVisitDate = moment(visitDate).tz(desiredTimezone).format("MMMM D, YYYY");
      const formattedVisitTime = moment(visitTime).tz(desiredTimezone).format("hh:mm A");
    const visitData = {
      visitDate: formattedVisitDate,
      visitTime: formattedVisitTime,
      existingDeseases: {},
      problemForConsultation: {},
      importantHistory: {
        allergy: {
          typeOfAllergy: allergyType || "NA",
          duration: {
            numericValue: allergyDuration ? parseInt(allergyDuration) : 0,
            unit: selectedUnit1 || "NA",
          },
        },
        drugReaction: {
          typeOfDrug: typeOfDrug || "NA",
          typeOfReaction: typeOfReaction || "NA",
        },
        pastSurgery: {
          typeOfSurgery: typeOfSurgery || "NA",
          year: selectedYear || 0,
        },
        pastDisease: {
          typeOfDisease: typeOfDisease || "NA",
        },
        exposure: {},
        familyHistory: familyHistory || "NA",
        occupation: occupation || "NA",
      },
      pastHospitalization: Hosdata,

      statusOfSickness: statusOfSickness,
      catScore: catScore || 0,
      prescription: prescriptionData,
      otherdocuments: otherDocumentData,
    };
    if (exiDisRef && exiDisRef.current) {
      visitData.existingDeseases = exiDisRef.current.getData();
    }
    if (PFCRef && PFCRef.current) {
      visitData.problemForConsultation = PFCRef.current.getData();
    }

    if (exposureRef && exposureRef.current) {
      visitData.importantHistory.exposure = exposureRef.current.getData();
    } else {
      visitData.importantHistory.exposure = {
        dust: { duration: { numericValue: 0, unit: "NA" } },
        cottondust: { duration: { numericValue: 0, unit: "NA" } },
        wooddust: { duration: { numericValue: 0, unit: "NA" } },
        pigeon: { duration: { numericValue: 0, unit: "NA" } },
        hay: { duration: { numericValue: 0, unit: "NA" } },
        moulds: { duration: { numericValue: 0, unit: "NA" } },
        pollen: { duration: { numericValue: 0, unit: "NA" } },
        chemical: { duration: { numericValue: 0, unit: "NA" } },
        stonedust: { duration: { numericValue: 0, unit: "NA" } },
        others: {
          duration: { numericValue: 0, unit: "NA" },
          typeOfExposure: "NA",
        },
      };
    }
   console.log(visitData)
    

      try {
        const response = await axios.post(
          patientDiseaseURL,{
            coordinator: coordinator,
            visitData: visitData,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.status === 200) {
          console.log("Data sent successfully");
          Alert.alert("Success",
            "Patient Disease Updated Successfully");
          navigation.navigate('BottomNavigation');
        } else {
          console.error("Failed to send data:", response.status);
          Alert.alert("Sorry",
            "Something went wrong. Please try again.");
        }
      } catch (error) {
        console.error("Error sending data:", error.message);
        Alert.alert("Sorry",
          "Something went wrong. Please try again.");
      } finally {
        setIsLoading(false);
      }
   
  };
  useEffect(() => {
    fetchAdminNames();
  }, []);

  const fetchAdminNames = async () => {
    try {
      const response = await fetch(`${backendURL}/adminListRouter/adminNames`);
      if (!response.ok) {
        throw new Error("Failed to fetch coordinators");
      }
      const adminNames = await response.json();
      setCoordinators(adminNames);
    } catch (error) {
      console.error("Error fetching coordinators:", error);
    }
  };
  const handleVisitDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || visitDate;
    setShowVisitDatePicker(false);
    setVisitDate(currentDate);
};
const handleVisitTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || visitTime;
    setShowVisitTimePicker(false);
    setVisitTime(currentTime);
};

  const [data, setData] = useState([{ year: "", days: "", reason: "" }]);
  const [data2, setData2] = useState("");

  return (
    <View style={styles.container}>
       <StatusBar 
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
            backgroundColor="#FFFFFF" 
            translucent={false}
        />
      <SafeAreaView style={styles.disform}>
      <View style={styles.disheader}>
          <Text style={styles.texthead}>Visit Date</Text>
        </View>
                    <TouchableOpacity onPress={() => setShowVisitDatePicker(true)} style={styles.dropdown13}>
                    <Text>{visitDate.toLocaleDateString()}</Text>
                    </TouchableOpacity>
                    {showVisitDatePicker && (
    <DateTimePicker
        value={visitDate}
        style={styles.input01}
        mode="date"
        display="default"
        onChange={handleVisitDateChange}
        maximumDate={new Date()}
    />
                    )}
             <View style={styles.disheader}>
          <Text style={styles.texthead}>Visit Time</Text>
        </View>
                <TouchableOpacity onPress={() => setShowVisitTimePicker(true)} style={styles.dropdown13}>
                <Text>{visitTime.toLocaleTimeString()}</Text>
                </TouchableOpacity>
                {showVisitTimePicker && (
                <DateTimePicker
                style={styles.input01}
                value={visitTime}
                mode="time"
                display="default"
                onChange={handleVisitTimeChange}
                />
                )}
               
        <View style={styles.disheader}>
          <Text style={styles.texthead}>Existing Disease</Text>
        </View>
        <ExiDisForm ref={exiDisRef} />
        <View style={styles.disheader}>
          <Text style={styles.texthead}>Problem For Consultation</Text>
        </View>
        <PFCForm ref={PFCRef} />
        <View style={styles.disheader}>
          <Text style={styles.texthead}>Important History</Text>
        </View>
        <View style={styles.history}>
          <View style={styles.hislist}>
            <Text style={styles.textlist}>Allergy :</Text>
          </View>
          <TouchableOpacity
            style={styles.dropdown14}
            onPress={() => {
              setIsClicked3(!isClicked3);
            }}
          >
            <Text style={{ color: "#8E7D7D", fontSize: 14, width: "50%" }}>
              {selectedOption1}
            </Text>
            {isClicked3 ? (
              <Icon
                name="angle-up"
                size={15}
                color={"#8E7D7D"}
                marginLeft={windowWidth * 0.08}
              />
            ) : (
              <Icon
                name="angle-down"
                size={15}
                color={"#8E7D7D"}
                marginLeft={windowWidth * 0.08}
              />
            )}
          </TouchableOpacity>
        </View>
        {isClicked3 ? (
          <View style={styles.options}>
            <View style={styles.option}>
              <TouchableOpacity
                style={{ width: "180%" }}
                onPress={() => {
                  setSelectedOption1("Yes");
                  setIsClicked3(false);
                  setIsClicked9(true);
                }}
              >
                <Text style={{ fontSize: 15 }}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: "180%" }}
                onPress={() => {
                  setSelectedOption1("No");
                  setIsClicked3(false);
                  setIsClicked9(false);
                  setAllergyType("");
                  setAllergyDuration("");
                  setSelectedUnit1("");
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
                Type of Allergy :
              </Text>
            </View>
            <TouchableOpacity style={styles.textbox}>
              <TextInput
                style={{ fontSize: 15, width: windowWidth * 0.8 }}
                placeholder="Enter Here"
                placeholderTextColor={"#8E7D7D"}
                onChangeText={(text) => setAllergyType(text)}
              />
            </TouchableOpacity>
            <View style={styles.duration4}>
              <Text style={{ fontWeight: "400", fontSize: 14 }}>
                Duration :
              </Text>
              <TouchableOpacity style={styles.dropdown20}>
                <TextInput
                  style={{ fontSize: 15 }}
                  keyboardType="numeric"
                  placeholder="Numeric Value"
                  placeholderTextColor={"#8E7D7D"}
                  onChangeText={(text) => setAllergyDuration(text)}
                />
              </TouchableOpacity>
              <View style={styles.dropdown21}>
                <Picker
                  selectedValue={selectedUnit1}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedUnit1(itemValue)
                  }
                  style={{ width: "100%", paddingHorizontal: 10 }}
                >
                  <Picker.Item
                    label="Unit"
                    value=""
                    style={{ color: "#8E7D7D" }}
                  />
                  {Unit.map((unit) => (
                    <Picker.Item
                      key={unit.key}
                      label={unit.value}
                      value={unit.value}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        ) : null}
        <View style={styles.history}>
          <View style={styles.hislist}>
            <Text style={styles.textlist}>Drug Reaction :</Text>
          </View>
          <TouchableOpacity
            style={styles.dropdown14}
            onPress={() => {
              setIsClicked4(!isClicked4);
            }}
          >
            <Text style={{ color: "#8E7D7D", fontSize: 14, width: "50%" }}>
              {selectedOption2}
            </Text>
            {isClicked4 ? (
              <Icon
                name="angle-up"
                size={15}
                color={Color.colorGray_100}
                marginLeft={windowWidth * 0.08}
              />
            ) : (
              <Icon
                name="angle-down"
                size={15}
                color={Color.colorGray_100}
                marginLeft={windowWidth * 0.08}
              />
            )}
          </TouchableOpacity>
        </View>
        {isClicked4 ? (
          <View style={styles.options}>
            <View style={styles.option}>
              <TouchableOpacity
                style={{ width: "180%" }}
                onPress={() => {
                  setSelectedOption2("Yes");
                  setIsClicked4(false);
                  setIsClicked10(true);
                }}
              >
                <Text style={{ fontSize: 15 }}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: "180%" }}
                onPress={() => {
                  setSelectedOption2("No");
                  setIsClicked4(false);
                  setIsClicked10(false);
                  setTypeOfDrug("");
                  setTypeOfReaction("");
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
          <View style={styles.problems3}>
            <View style={styles.problist}>
              <Text style={{ fontWeight: "700", fontSize: 16, width: "50%" }}>
                What type of drugs?
              </Text>
            </View>
            <TouchableOpacity style={styles.textbox}>
              <TextInput
                style={{ fontSize: 15, width: windowWidth * 0.8 }}
                placeholder="Enter Here"
                placeholderTextColor={"#8E7D7D"}
                onChangeText={(text) => setTypeOfDrug(text)}
              />
            </TouchableOpacity>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 16,
                width: "50%",
                marginTop: windowWidth * 0.02,
              }}
            >
              What type of reaction?
            </Text>
            <TouchableOpacity style={styles.textbox}>
              <TextInput
                style={{ fontSize: 15, width: windowWidth * 0.8 }}
                placeholder="Enter Here"
                placeholderTextColor={"#8E7D7D"}
                onChangeText={(text) => setTypeOfReaction(text)}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.history}>
          <View style={styles.hislist}>
            <Text style={styles.textlist}>Past Surgery :</Text>
          </View>
          <TouchableOpacity
            style={styles.dropdown14}
            onPress={() => {
              setIsClicked5(!isClicked5);
            }}
          >
            <Text style={{ color: "#8E7D7D", fontSize: 14, width: "50%" }}>
              {selectedOption3}
            </Text>
            {isClicked5 ? (
              <Icon
                name="angle-up"
                size={15}
                color={Color.colorGray_100}
                marginLeft={windowWidth * 0.08}
              />
            ) : (
              <Icon
                name="angle-down"
                size={15}
                color={Color.colorGray_100}
                marginLeft={windowWidth * 0.08}
              />
            )}
          </TouchableOpacity>
        </View>
        {isClicked5 ? (
          <View style={styles.options}>
            <View style={styles.option}>
              <TouchableOpacity
                style={{ width: "180%" }}
                onPress={() => {
                  setSelectedOption3("Yes");
                  setIsClicked5(false);
                  setIsClicked11(true);
                }}
              >
                <Text style={{ fontSize: 15 }}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: "180%" }}
                onPress={() => {
                  setSelectedOption3("No");
                  setIsClicked5(false);
                  setIsClicked11(false);
                  setTypeOfSurgery("");
                  setSelectedYear("");
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
          <View style={styles.problems}>
            <View style={styles.problist}>
              <Text style={{ fontWeight: "700", fontSize: 16, width: "50%" }}>
                What type of surgery?
              </Text>
            </View>
            <TouchableOpacity style={styles.textbox}>
              <TextInput
                style={{ fontSize: 15, width: windowWidth * 0.8 }}
                placeholder="Enter Here"
                placeholderTextColor={"#8E7D7D"}
                onChangeText={(text) => setTypeOfSurgery(text)}
              />
            </TouchableOpacity>
            <View style={styles.duration4}>
              <Text style={{ fontWeight: "400", fontSize: 15 }}>
                Year of surgery:
              </Text>
              <View style={styles.dropdown22}>
                <Picker
                  selectedValue={selectedYear}
                  onValueChange={(itemValue, itemIndex) =>
                    setSelectedYear(itemValue)
                  }
                  style={{ height: 50, width: "100%", paddingHorizontal: 10 }}
                >
                  <Picker.Item
                    label="Select Year"
                    value=""
                    style={{ color: "#8E7D7D" }}
                  />
                  {years.map((year) => (
                    <Picker.Item
                      key={year}
                      label={year.toString()}
                      value={year.toString()}
                    />
                  ))}
                </Picker>
              </View>
            </View>
          </View>
        ) : null}
        <View style={styles.history}>
          <View style={styles.hislist}>
            <Text style={styles.textlist}>Past Diseases :</Text>
          </View>
          <TouchableOpacity
            style={styles.dropdown14}
            onPress={() => {
              setIsClicked6(!isClicked6);
            }}
          >
            <Text style={{ color: "#8E7D7D", fontSize: 14, width: "50%" }}>
              {selectedOption4}
            </Text>
            {isClicked6 ? (
              <Icon
                name="angle-up"
                size={15}
                color={Color.colorGray_100}
                marginLeft={windowWidth * 0.08}
              />
            ) : (
              <Icon
                name="angle-down"
                size={15}
                color={Color.colorGray_100}
                marginLeft={windowWidth * 0.08}
              />
            )}
          </TouchableOpacity>
        </View>
        {isClicked6 ? (
          <View style={styles.options}>
            <View style={styles.option}>
              <TouchableOpacity
                style={{ width: "180%" }}
                onPress={() => {
                  setSelectedOption4("Yes");
                  setIsClicked6(false);
                  setIsClicked12(true);
                }}
              >
                <Text style={{ fontSize: 15 }}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: "180%" }}
                onPress={() => {
                  setSelectedOption4("No");
                  setIsClicked6(false);
                  setIsClicked12(false);
                  setTypeOfDisease("");
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
          <View style={styles.problems4}>
            <View style={styles.problist}>
              <Text style={{ fontWeight: "700", fontSize: 16, width: "50%" }}>
                Type of Disease :
              </Text>
            </View>
            <TouchableOpacity style={styles.textbox}>
              <TextInput
                style={{ fontSize: 15, width: windowWidth * 0.8 }}
                placeholder="Enter Here"
                placeholderTextColor={"#8E7D7D"}
                onChangeText={(text) => setTypeOfDisease(text)}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.history}>
          <View style={styles.hislist}>
            <Text style={styles.textlist}>Family History :</Text>
          </View>
          <TouchableOpacity
            style={styles.dropdown14}
            onPress={() => {
              setIsClicked7(!isClicked7);
            }}
          >
            <Text style={{ color: "#8E7D7D", fontSize: 14, width: "50%" }}>
              {selectedOption5}
            </Text>
            {isClicked7 ? (
              <Icon
                name="angle-up"
                size={15}
                color={Color.colorGray_100}
                marginLeft={windowWidth * 0.08}
              />
            ) : (
              <Icon
                name="angle-down"
                size={15}
                color={Color.colorGray_100}
                marginLeft={windowWidth * 0.08}
              />
            )}
          </TouchableOpacity>
        </View>
        {isClicked7 ? (
          <View style={styles.options}>
            <View style={styles.option}>
              <TouchableOpacity
                style={{ width: "180%" }}
                onPress={() => {
                  setSelectedOption5("Yes");
                  setIsClicked7(false);
                  setIsClicked13(true);
                }}
              >
                <Text style={{ fontSize: 15 }}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: "180%" }}
                onPress={() => {
                  setSelectedOption5("No");
                  setIsClicked7(false);
                  setIsClicked13(false);
                  setFamilyHistory("");
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
          <View style={styles.problems4}>
            <View style={styles.problist}>
              <Text style={{ fontWeight: "700", fontSize: 16, width: "50%" }}>
                Type here :
              </Text>
            </View>
            <TouchableOpacity style={styles.textbox}>
              <TextInput
                style={{ fontSize: 15, width: windowWidth * 0.8 }}
                placeholder="Enter Here"
                placeholderTextColor={"#8E7D7D"}
                onChangeText={(text) => setFamilyHistory(text)}
              />
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.history}>
          <View style={styles.hislist}>
            <Text style={styles.textlist}>Occupation :</Text>
          </View>
          <TouchableOpacity style={styles.dropdown15}>
            <TextInput
              style={{ fontSize: 14, width: windowWidth * 0.45 }}
              placeholder="Enter here"
              placeholderTextColor={"#8E7D7D"}
              onChangeText={(text) => setOccupation(text)}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.history}>
          <View style={styles.hislist}>
            <Text style={styles.textlist}>Exposure :</Text>
          </View>
          <TouchableOpacity
            style={styles.dropdown14}
            onPress={() => {
              setIsClicked8(!isClicked8);
            }}
          >
            <Text style={{ color: "#8E7D7D", fontSize: 14, width: "50%" }}>
              {selectedOption6}
            </Text>
            {isClicked8 ? (
              <Icon
                name="angle-up"
                size={15}
                color={Color.colorGray_100}
                marginLeft={windowWidth * 0.08}
              />
            ) : (
              <Icon
                name="angle-down"
                size={15}
                color={Color.colorGray_100}
                marginLeft={windowWidth * 0.08}
              />
            )}
          </TouchableOpacity>
        </View>
        {isClicked8 ? (
          <View style={styles.options}>
            <View style={styles.option}>
              <TouchableOpacity
                style={{ width: "180%" }}
                onPress={() => {
                  setSelectedOption6("Yes");
                  setIsClicked8(false);
                  setIsClicked14(!isClicked14);
                  setIsClicked14(true);
                }}
              >
                <Text style={{ fontSize: 15 }}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: "180%" }}
                onPress={() => {
                  setSelectedOption6("No");
                  setIsClicked8(false);
                  setIsClicked14(false);
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
          // <Exposure />
          <Exposure ref={exposureRef} />
        ) : (
          Exposure.exposureRef
        )}
        <View style={styles.disheader}>
          <Text style={styles.texthead}>Past Hospitalization</Text>
        </View>
        <TouchableOpacity
          style={styles.dropdown13}
          onPress={() => setIsClicked15(!isClicked15)}
        >
          <Text
            style={{
              color:Color.colorBlack,
              fontSize: 15,
              width: windowWidth * 0.73,
            }}
          >
            {selectedOption7}
          </Text>
          {isClicked15 ? (
            <Icon
              name="angle-up"
              size={15}
              color={Color.colorGray_100}
              marginLeft={windowWidth * 0.1}
            />
          ) : (
            <Icon
              name="angle-down"
              size={15}
              color={Color.colorGray_100}
              marginLeft={windowWidth * 0.1}
            />
          )}
        </TouchableOpacity>
        {isClicked15 ? (
          <View style={styles.options2}>
            <View style={styles.option}>
              <TouchableOpacity
                style={{ width: "180%" }}
                onPress={() => {
                  setSelectedOption7("Yes");
                  setIsClicked15(false);
                  setIsClicked16(true);
                }}
              >
                <Text style={{ fontSize: 15 }}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: "180%" }}
                onPress={() => {
                  setSelectedOption7("No");
                  setIsClicked15(false);
                  setIsClicked16(false);
                }}
              >
                <Text style={{ fontSize: 15, marginTop: windowWidth * 0.02 }}>
                  No
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {isClicked16 ? (
          <View>
            {Hosdata.map((item, index) => (
              <PastHosForm
                key={index}
                onDataChange={(newData) => handleDataChange(index, newData)}
              />
            ))}
            <TouchableOpacity
              style={styles.addmore}
              onPress={() => {
                setHosData([
                  ...Hosdata,
                  {
                    yearOfHospitalization: 0,
                    days: 0,
                    reason: "NA",
                    dischargeCertificate: "NA",
                  },
                ]);
              }}
            >
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 15,
                  color: "#096759",
                  alignSelf: "center",
                }}
              >
                Add More
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={styles.disheader}>
          <Text style={styles.texthead}>Status Of Sickness</Text>
        </View>
        <SOSForm 
          selectedOption={selectedOption8}
          setSelectedOption={setSelectedOption8}
          isClicked={isClicked17}
          setIsClicked={setIsClicked17}
        />
        {isClicked17 ? (
          <View style={styles.options3}>
            <View style={styles.option}>
              <TouchableOpacity
                style={{ width: "180%" }}
                onPress={() => {
                  setSelectedOption8("Somewhat sick");
                  setIsClicked17(false);
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: windowWidth * 0.02,
                    color: "#8E7D7D",
                  }}
                >
                  Somewhat sick
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: "180%" }}
                onPress={() => {
                  setSelectedOption8("Sick");
                  setIsClicked17(false);
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: windowWidth * 0.02,
                    color: "#8E7D7D",
                  }}
                >
                  Sick
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: "180%" }}
                onPress={() => {
                  setSelectedOption8("Quite sick");
                  setIsClicked17(false);
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: windowWidth * 0.02,
                    color: "#8E7D7D",
                  }}
                >
                  Quite sick
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: "180%" }}
                onPress={() => {
                  setSelectedOption8("Very sick");
                  setIsClicked17(false);
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: windowWidth * 0.02,
                    color: "#8E7D7D",
                  }}
                >
                  Very sick
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ width: "180%" }}
                onPress={() => {
                  setSelectedOption8("Morbus");
                  setIsClicked17(false);
                }}
              >
                <Text
                  style={{
                    fontSize: 15,
                    marginTop: windowWidth * 0.02,
                    color: "#8E7D7D",
                  }}
                >
                  Morbus
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        <View style={styles.disheader}>
          <Text style={styles.texthead}>Enter CAT Score</Text>
        </View>
        <TouchableOpacity style={styles.dropdown13}>
          <TextInput
            style={{ fontSize: 15, width: windowWidth * 0.9 }}
            keyboardType="numeric"
            placeholder="Enter here"
            placeholderTextColor={"#8E7D7D"}
            onChangeText={(text) => setCatScore(parseInt(text) || 0)}
          />
        </TouchableOpacity>
        <View style={styles.disheader}>
          <Text style={styles.texthead}>Choose Coordinator*</Text>
        </View>
        <View style={styles.dropdown19}>
  <Picker
    selectedValue={selectedCoordinator}
    style={{ height: 50, width: "100%", paddingHorizontal: 10 }}
    onValueChange={(itemValue) => setSelectedCoordinator(itemValue)}
  >
    <Picker.Item
      label="Select"
      value="Select"
      style={{ color: Color.colorGray_200 }}
    />
    <Picker.Item
      label="Not applicable"
      value="NA"
      style={{ color: Color.colorBlack }}
    />
    {coordinators.map((coordinator, index) => (
      <Picker.Item
        key={index}
        label={coordinator}
        value={coordinator}
        style={{ color: Color.colorBlack }}
      />
    ))}
  </Picker>
</View>
        <View style={styles.disheader}>
        <Text style={styles.texthead}>Upload Prescription</Text>
      </View>
      
      {prescriptionFields.map((field) => (
        <View key={field.id} style={styles.hosopt1}>
          <Icon name="paperclip" size={22} color="#8E7D7D" />
          <Text
            style={{
              fontWeight: '700',
              fontSize: 15,
              width: windowWidth * 0.42,
              color: '#8E7D7D',
              marginLeft: windowWidth * 0.04,
            }}
          >
            {field.file ? field.file.name : 'Upload Prescription'}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.uploadbutton}
              onPress={() => showFilePickerOptions(field.id)}
              disabled={field.uploading}
            >
              {field.uploading ? (
                <ActivityIndicator size="small" color="#096759" />
              ) : (
                <Text style={styles.uploadText}>Upload</Text>
              )}
            </TouchableOpacity>
            
            {prescriptionFields.length > 1 && (
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removePrescriptionField(field.id)}
              >
                <Icon name="times" size={20} color="#FF4444" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
      
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.addButton}
          onPress={addPrescriptionField}
        >
          <Text style={styles.addButtonText}>Add More</Text>
        </TouchableOpacity>
        </View>
        <View style={styles.disheader}>
        <Text style={styles.texthead}>Upload Other Documents</Text>
      </View>
      {otherFields.map((field) => (
        <View key={field.id} style={styles.hosopt2}>
          <TouchableOpacity style={styles.dropdown67}>
            <TextInput
              style={{ fontSize: 15, width: windowWidth * 0.9 }}
              placeholder="Enter document name"
              placeholderTextColor={"#8E7D7D"}
              value={field.documentName}
              onChangeText={(text) => handleDocumentNameChange(field.id, text)}
            />
          </TouchableOpacity>
          <View  style={styles.hosopt3}>
          <Icon name="paperclip" size={22} color="#8E7D7D" />
          <Text
            style={{
              fontWeight: '700',
              fontSize: 15,
              width: windowWidth * 0.42,
              color: '#8E7D7D',
              marginLeft: windowWidth * 0.04,
            }}
          >
            {field.file ? field.file.name : 'Upload Document'}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.uploadbutton}
              onPress={() => showFilePickerOptions2(field.id)}
              disabled={field.uploading}
            >
              {field.uploading ? (
                <ActivityIndicator size="small" color="#096759" />
              ) : (
                <Text style={styles.uploadText}>Upload</Text>
              )}
            </TouchableOpacity>
            </View>
            {otherFields.length > 1 && (
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeOtherField(field.id)}
              >
                <Icon name="times" size={20} color="#FF4444" />
              </TouchableOpacity>
            )}
          </View>
        </View>
      ))}
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.addButton2}
          onPress={addOtherField}
        >
          <Text style={styles.addButtonText}>Add More</Text>
        </TouchableOpacity>
      </View>
        <TouchableOpacity style={styles.submitButton} onPress={handleSave}>
          {isLoading ? (
            <ActivityIndicator size="small" color={Color.colorWhite} />
          ) : (
            <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>
              Submit
            </Text>
          )}
        </TouchableOpacity>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  picker: {
    width: "100%",
    height: 30,
    paddingHorizontal: 10,
    backgroundColor: "#e3e3e3",
  },
  container: {
    flex: 1,
    backgroundColor: Color.colorWhite,
  },
  disform: {
    marginTop: windowWidth*0.01,
  },
  disheader: {
    marginLeft: 15,
    marginTop: windowWidth * 0.05,
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
    borderRadius: 5,
  },
  hosopt3: {
    width: windowWidth * 0.95,
    height: windowWidth * 0.17,
    alignSelf: 'center',
    marginTop: windowWidth * 0.01,
    backgroundColor: '#e3e3e3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
    borderRadius: 5,
  },
  hosopt2: {
    width: windowWidth * 0.95,
    height: windowWidth * 0.25,
    alignSelf: 'center',
    marginTop: windowWidth * 0.1,
    backgroundColor: '#e3e3e3',
    padding: 15,
    borderRadius: 5,
  },
  
  dropdown67: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#A99F9F',
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginBottom: 10, // Added spacing
  },
  // uploadbutton: {
  //   width: windowWidth * 0.3,
  //   height: windowWidth * 0.1,
  //   backgroundColor: '#fff',
  //   borderWidth: 2,
  //   borderColor: '#096759',
  //   borderRadius: 5,
  //   justifyContent: 'center',
  // },
  texthead: {
    fontWeight: "700",
    fontSize: 17,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  uploadbutton: {
    backgroundColor: '#E8F3F1',
    padding: 8,
    borderRadius: 5,
    minWidth: 80,
    justifyContent: 'center',
    marginLeft: windowWidth * 0.09,
  },
  uploadText: {
    fontWeight: '700',
    fontSize: 15,
    color: '#096759',
    alignSelf: 'center',
  },
  removeButton: {
    padding: 8,
    marginLeft: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginVertical: 15,
  },
  addButton: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.13,
    backgroundColor: "#DBF4F1",
    borderWidth: 1.24,
    borderColor: "#096759",
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: windowWidth * 0.03,
  },
  addButton2: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.13,
    backgroundColor: "#DBF4F1",
    borderWidth: 1.24,
    borderColor: "#096759",
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: windowWidth * 0.1,
  },
  addButtonText: {
    fontWeight: "700",
                  fontSize: 15,
                  color: "#096759",
                  alignSelf: "center",
  },
  saveButton: {
    backgroundColor: '#096759',
    padding: 12,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
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
    backgroundColor: "#096759",
    width: windowWidth * 0.95,
    height: windowWidth * 0.13,
    marginTop: windowWidth * 0.1,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    elevation: 3,
  },
  history: {
    flexDirection: "row",
    marginTop: windowWidth * 0.05,
    alignItems: "center",
  },
  hislist: {
    width: windowWidth * 0.35,
    marginLeft: windowWidth * 0.08,
  },
  dropdown14: {
    width: "30%",
    height: 34,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#A99F9F",
    alignSelf: "center",
    // marginTop: windowWidth*0.03,
    backgroundColor: "#e3e3e3",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
    marginLeft: windowWidth * 0.2,
  },
  textlist: {
    fontWeight: "500",
    fontSize: 16,
  },
  dropdown15: {
    width: windowWidth * 0.5,
    height: 34,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: "#A99F9F",
    alignSelf: "center",
    // marginTop: windowWidth*0.03,
    backgroundColor: "#e3e3e3",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    paddingRight: 15,
  },
  problems: {
    width: "95%",
    height: windowWidth * 0.48,
    backgroundColor: "#e3e3e3",
    marginTop: windowWidth * 0.05,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: windowWidth * 0.05,
    backgroundColor: "#e3e3e3",
    paddingLeft: 15,
    paddingRight: 15,
  },
  delete: {
    width: 27,
    height: 30,
    marginLeft: windowWidth * 0.51,
    marginTop: -windowWidth * 0.03,
  },
  problist: {
    flexDirection: "row",
    marginTop: windowWidth * 0.05,
    justifyContent: "flex-start",
    // alignItems: 'center'
  },
  probheader: {
    fontWeight: "700",
    fontSize: 16,
    width: "34%",
  },
  duration: {
    flexDirection: "row",
    marginTop: windowWidth * 0.08,
    alignItems: "center",
  },
  dropdown20: {
    width: windowWidth * 0.35,
    height: 34,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "#A99F9F",
    alignSelf: "center",
    // marginTop: windowWidth*0.03,
    backgroundColor: "#F1F4F3",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: windowWidth * 0.05,
  },
  dropdown21: {
    width: windowWidth * 0.3,
    height: 34,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "#A99F9F",
    alignSelf: "center",
    // marginTop: windowWidth*0.03,
    backgroundColor: "#F1F4F3",
    flexDirection: "row",
    alignItems: "center",
    // paddingLeft: 10,
    // paddingRight: 10,
    marginLeft: windowWidth * 0.02,
  },
  duration2: {
    flexDirection: "row",
    marginTop: windowWidth * 0.05,
    alignItems: "center",
  },
  dropdown22: {
    width: windowWidth * 0.58,
    height: 34,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "#A99F9F",
    alignSelf: "center",
    // marginTop: windowWidth*0.03,
    backgroundColor: "#F1F4F3",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 7,
    paddingRight: 10,
    marginLeft: windowWidth * 0.02,
  },
  problems2: {
    width: "95%",
    height: windowWidth * 0.6,
    backgroundColor: "#e3e3e3",
    marginTop: windowWidth * 0.05,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: windowWidth * 0.05,
    backgroundColor: "#e3e3e3",
    paddingLeft: 15,
    paddingRight: 15,
  },
  duration3: {
    flexDirection: "row",
    marginTop: windowWidth * 0.08,
    alignItems: "center",
  },
  duration4: {
    flexDirection: "row",
    marginTop: windowWidth * 0.05,
    alignItems: "center",
  },
  dropdown23: {
    width: windowWidth * 0.63,
    height: 34,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "#A99F9F",
    alignSelf: "center",
    // marginTop: windowWidth*0.03,
    backgroundColor: "#F1F4F3",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 7,
    paddingRight: 10,
    marginLeft: windowWidth * 0.02,
  },
  dropdown24: {
    width: windowWidth * 0.67,
    height: 34,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "#A99F9F",
    alignSelf: "center",
    // marginTop: windowWidth*0.03,
    backgroundColor: "#F1F4F3",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 7,
    paddingRight: 10,
    marginLeft: windowWidth * 0.06,
  },
  probheader1: {
    fontWeight: "700",
    fontSize: 16,
    width: "50%",
  },
  delete1: {
    width: 27,
    height: 30,
    marginLeft: windowWidth * 0.37,
    marginTop: -windowWidth * 0.03,
  },
  dropdown25: {
    width: windowWidth * 0.65,
    height: 34,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "#A99F9F",
    alignSelf: "center",
    // marginTop: windowWidth*0.03,
    backgroundColor: "#F1F4F3",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 7,
    paddingRight: 10,
    marginLeft: windowWidth * 0.02,
  },
  options: {
    width: "30%",
    height: 70,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#fff",
    elevation: 2,
    marginLeft: windowWidth * 0.63,
    paddingLeft: 15,
    paddingTop: 10,
  },
  option: {
    width: "50%",
    height: "50%",
    alignSelf: "flex-start",
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
  problems3: {
    width: "95%",
    height: windowWidth * 0.6,
    marginTop: windowWidth * 0.05,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: windowWidth * 0.05,
    backgroundColor: "#e3e3e3",
    paddingLeft: 15,
    paddingRight: 15,
  },
  problems4: {
    width: "95%",
    height: windowWidth * 0.35,
    backgroundColor: "#e3e3e3",
    marginTop: windowWidth * 0.05,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: windowWidth * 0.05,
    backgroundColor: "#e3e3e3",
    paddingLeft: 15,
    paddingRight: 15,
  },
  problems5: {
    width: "95%",
    height: windowWidth * 0.3,
    backgroundColor: "#e3e3e3",
    marginTop: windowWidth * 0.05,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: windowWidth * 0.05,
    backgroundColor: "#e3e3e3",
    paddingLeft: 15,
    paddingRight: 15,
  },
  options2: {
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
  addmore: {
    width: windowWidth * 0.9,
    height: windowWidth * 0.13,
    backgroundColor: "#DBF4F1",
    borderWidth: 1.24,
    borderColor: "#096759",
    borderRadius: 5,
    justifyContent: "center",
    alignSelf: "center",
    marginTop: windowWidth * 0.08,
  },
  options3: {
    width: windowWidth * 0.94,
    height: windowWidth * 0.4,
    borderRadius: 10,
    marginTop: 10,
    backgroundColor: "#fff",
    elevation: 2,
    marginLeft: windowWidth * 0.03,
    paddingLeft: 15,
    paddingTop: 10,
  },
  dropdown19: {
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
    // paddingLeft: 15,
    // paddingRight: 15,
  },
});

export default DiseaseForm;
