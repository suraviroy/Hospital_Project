import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';

const windowWidth = Dimensions.get('window').width;

const PastHosForm = ({ onDataChange }) => {
  const [pickedFile, setPickedFile] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');
  const [duration, setDuration] = useState('');
  const [reason, setReason] = useState('');
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    handleDataChange();
  }, [pickedFile]);

  const requestPermissions = async () => {
    const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
    const { status: libraryStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (cameraStatus !== 'granted' || libraryStatus !== 'granted') {
      Alert.alert('Permission required', 'Please grant camera and media library permissions to use this feature.');
      return false;
    }
    return true;
  };

  const uploadToCloudinary = async (fileInfo) => {
    const formData = new FormData();
    formData.append('file', {
      uri: fileInfo.uri,
      name: fileInfo.name || 'file',
      type: fileInfo.type || 'application/octet-stream',
    });
    formData.append('upload_preset', 'pulmocareapp');
    formData.append('cloud_name', 'pulmocare01');

    try {
      setUploading(true);
      const response = await fetch(
        'https://api.cloudinary.com/v1_1/pulmocare01/auto/upload',
        {
          method: 'POST',
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        return {
          name: data.original_filename || fileInfo.name,
          type: fileInfo.type,
          uri: data.secure_url,
        };
      } else {
        throw new Error('Upload failed');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      Alert.alert('Upload Error', 'Failed to upload file. Please try again.');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 
               'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
        copyToCacheDirectory: true
      });

      if (!result.canceled) {
        const fileInfo = result.assets[0];
        const uploadedFile = await uploadToCloudinary(fileInfo);
        if (uploadedFile) setPickedFile(uploadedFile);
      }
    } catch (error) {
      console.error('Error picking document:', error);
      Alert.alert('Error', 'Failed to pick document. Please try again.');
    }
  };

  const pickImage = async () => {
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
        const uploadedFile = await uploadToCloudinary(fileInfo);
        if (uploadedFile) setPickedFile(uploadedFile);
      }
    } catch (error) {
      console.error('Error picking image:', error);
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    }
  };

  const takePhoto = async () => {
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
        const uploadedFile = await uploadToCloudinary(fileInfo);
        if (uploadedFile) setPickedFile(uploadedFile);
      }
    } catch (error) {
      console.error('Error taking photo:', error);
      Alert.alert('Error', 'Failed to take photo. Please try again.');
    }
  };

  const showFilePickerOptions = () => {
    if (Platform.OS === 'ios') {
      Alert.alert(
        'Select File',
        'Choose a method',
        [
          {
            text: 'Take Photo',
            onPress: takePhoto
          },
          {
            text: 'Choose from Gallery',
            onPress: pickImage
          },
          {
            text: 'Upload Document',
            onPress: pickDocument
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
            onPress: takePhoto
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
                    onPress: pickDocument
                  },
                  {
                    text: 'Choose from Gallery',
                    onPress: pickImage
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

  const handleDataChange = () => {
    const data = {
      yearOfHospitalization: selectedYear,
      days: duration,
      reason: reason,
      dischargeCertificate: pickedFile ? pickedFile.uri : 'NA',
    };
    onDataChange(data);
  };

  return (
    <View style={styles.hosform}>
      <View style={styles.hosopt}>
        <Text style={{ fontWeight: '500', fontSize: 16, width: windowWidth * 0.5 }}>
          Year of hospitalization :
        </Text>
        <View style={styles.dropdown21}>
        <Picker
  selectedValue={selectedYear}
  style={{ height: 50, width: '100%' }}
  onValueChange={(itemValue) => setSelectedYear(itemValue)}
>
  <Picker.Item label="Select" value="" style={{ color: '#8E7D7D' }} />
  {Array.from({ length: new Date().getFullYear() - 1980 + 1 }, (_, i) => new Date().getFullYear() - i).map(
    (year) => (
      <Picker.Item
        key={year}
        label={year.toString()}
        value={year}
        style={{ color: '#000' }}
      />
    )
  )}
</Picker>

        </View>
      </View>
      <View style={styles.hosopt}>
        <Text style={{ fontWeight: '500', fontSize: 16, width: windowWidth * 0.5 }}>
          Duration in days :
        </Text>
        <TextInput
          style={styles.dropdown60}
          placeholder="Enter duration"
          placeholderTextColor={'#8E7D7D'}
          value={duration}
          onChangeText={setDuration}
          keyboardType="numeric"
          onBlur={handleDataChange}
        />
      </View>
      <View style={styles.hosopt}>
        <Text style={{ fontWeight: '500', fontSize: 16, width: windowWidth * 0.2 }}>Reason :</Text>
        <TouchableOpacity style={styles.dropdown61}>
          <TextInput
            style={{ fontSize: 15, width: windowWidth * 0.6, alignSelf: 'center' }}
            placeholder="Enter Here"
            placeholderTextColor={'#8E7D7D'}
            value={reason}
            onChangeText={setReason}
            onBlur={handleDataChange}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.hosopt1}>
        <Icon name="paperclip" size={22} color="#8E7D7D" />
        <Text
          style={{
            fontWeight: '700',
            fontSize: 15,
            width: windowWidth * 0.42,
            color: '#8E7D7D',
            marginLeft: windowWidth * 0.05,
          }}>
          {pickedFile ? pickedFile.name : 'Upload Discharge Certificate'}
        </Text>
        <TouchableOpacity 
          style={styles.uploadbutton} 
          onPress={showFilePickerOptions}
          disabled={uploading}
        >
          {uploading ? (
            <ActivityIndicator size="small" color="#096759" />
          ) : (
            <Text style={{ fontWeight: '700', fontSize: 15, color: '#096759', alignSelf: 'center' }}>
              Upload
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  hosform: {
    flex: 1,
  },
  hosopt: {
    width: windowWidth * 0.95,
    height: windowWidth * 0.12,
    alignSelf: 'center',
    marginTop: windowWidth * 0.05,
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
    borderRadius: 5,
  },
  dropdown60: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.1,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#A99F9F',
    backgroundColor: '#e3e3e3',
    paddingLeft: 15,
    paddingRight: 15,
    fontSize: 15,
  },
  dropdown61: {
    width: windowWidth * 0.7,
    height: windowWidth * 0.1,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#A99F9F',
    backgroundColor: '#e3e3e3',
    paddingLeft: 15,
    paddingRight: 15,
    justifyContent: 'center',
  },
  uploadbutton: {
    width: windowWidth * 0.3,
    height: windowWidth * 0.1,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#096759',
    borderRadius: 5,
    justifyContent: 'center',
  },
  dropdown21: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.1,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: '#A99F9F',
    alignSelf: 'center',
    backgroundColor: '#e3e3e3',
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PastHosForm;