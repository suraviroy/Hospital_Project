import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { FontFamily, Color, Border, FontSize } from '../../../GlobalStyles';
import { PickerIos, Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';

const windowWidth = Dimensions.get('window').width;

const PastHosForm = ({ onDataChange }) => {
  const [pickedFile, setPickedFile] = useState(null);
  const [selectedYear, setSelectedYear] = useState('');
  const [duration, setDuration] = useState('');
  const [reason, setReason] = useState('');
  const [uploading, setUploading] = useState(false); 
  const filePickerRef = useRef(null);
  useEffect(() => {
    handleDataChange();
  }, [pickedFile]);

  const pickFile = async () => {
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
          type: `application/pdf`,
        });
        formData.append('upload_preset', 'pulmocareapp');
        formData.append('cloud_name', 'pulmocare01');

        try {
          setUploading(true); 
          const response = await fetch(
            'https://api.cloudinary.com/v1_1/pulmocare01/image/upload',
            {
              method: 'POST',
              body: formData,
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log('Cloudinary response:', data);

            setPickedFile({
              name: data.original_filename || fileInfo.name,
              type: fileInfo.type,
              uri: data.secure_url,
            });
          } else {
            console.error('Failed to upload file to Cloudinary');
          }
        } catch (error) {
          console.error('Error uploading file:', error);
        } finally {
          setUploading(false); 
        }
      }
    } catch (error) {
      console.error('Error picking file:', error);
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
            onValueChange={(itemValue, itemIndex) => setSelectedYear(itemValue)}>
            <Picker.Item label="Select" value="" style={{ color: Color.colorGray_200 }} />
            {Array.from({ length: new Date().getFullYear() - 1980 + 1 }, (_, i) => 1980 + i).map(
              (year) => (
                <Picker.Item
                  key={year}
                  label={year.toString()}
                  value={year}
                  style={{ color: Color.colorBlack }}
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
        <Icon name="paperclip" size={22} color={Color.colorGray_100} />
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
        <TouchableOpacity style={styles.uploadbutton} onPress={pickFile}>
        
          {uploading ? (
        <ActivityIndicator size="small" color={'#2A9988'} />
            ) : (
        <Text style={{ fontWeight: '700', fontSize: 15, color: '#2A9988', alignSelf: 'center' }}>Upload</Text>
        )}</TouchableOpacity>
      </View>
    </View>
  );
};
export default PastHosForm;

const styles = StyleSheet.create({
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
    borderColor: '#2A9988',
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
