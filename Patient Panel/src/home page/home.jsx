import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { backendURL } from "../backendapi";
import { FontFamily, Color } from '../../GlobalStyles';

const windowWidth = Dimensions.get('window').width;

const Home = () => {
    const navigation = useNavigation();
    const [patientData, setPatientData] = useState({});
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const storedPatientId = await AsyncStorage.getItem('patientId');
                if (storedPatientId) {
                    fetchPatientData(storedPatientId);
                }
            } catch (error) {
                console.error('Error fetching patientId from storage:', error);
            }
        };
        fetchData();
    }, []);

    const fetchPatientData = async (patientId) => {
        try {
            const response = await fetch(`${backendURL}/patientRouter/HomePageDetails/${patientId}`);
            const data = await response.json();
            setPatientData(data[0]);
        } catch (error) {
            console.error('Error fetching patient basic details:', error);
        }
    };

    const handleViewDetails = async () => {
          navigation.navigate('Request');
      }

    const handleNextSlide = () => {
        setCurrentIndex((currentIndex + 1) % 3);
    };
return (
  <View style={styles.container}>
    <View style={styles.topContainer}>
      <View style={styles.header}>         
          <>
          {patientData.image ? (
            <Image source={{ uri: patientData.image }} style={styles.profileImage} />
        ) : (
            <Image source={require('../../assets/images/user2.png')} style={styles.profileImage} />
        )}
            <View style={styles.profileText}>
              <Text style={styles.boldText}>{patientData.name}</Text>
              <Text style={styles.greyText}>How are you today?</Text>
            </View>
          </>
        
        <View style={styles.notificationIcon}>
          <Ionicons name="notifications-outline" size={24} color="black" />
        </View>
      </View>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Speciality"
          placeholderTextColor="#aaa"
        />
      </View>
    </View>

    <TouchableOpacity onPress={handleNextSlide} style={styles.imageSlider}>
      {currentIndex === 0 && (
        <Image source={require('../../assets/images/lab2.png')} style={styles.sliderImage} />
      )}
      {currentIndex === 1 && (
       <Image source={require('../../assets/images/lab3.png')} style={styles.sliderImage} />
      )}
      {currentIndex === 2 && (
        <Image source={require('../../assets/images/lab1.png')} style={styles.sliderImage} />
      )}
      <View style={styles.sliderDots}>
        {[0, 1, 2].map((index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentIndex && { backgroundColor: '#357EEA' },
            ]}
          />
        ))}
      </View>
    </TouchableOpacity>

    <Text style={styles.sectionTitle}>Our Services</Text>

    <View style={styles.buttonContainer}>
      <TouchableOpacity style={[styles.button, styles.buttonShadow]}>
        <Image source={require('../../assets/images/doctor.png')} style={styles.buttonImage} />
        <Text style={styles.buttonText}>Book Appointment</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonShadow]}  onPress={() => handleViewDetails()}>
        <Image source={require('../../assets/images/hand.png')} style={styles.buttonImage} />
        <Text style={styles.buttonText}>Contact/Help</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonShadow]}>
        <Image source={require('../../assets/images/upload.png')} style={styles.buttonImage} />
        <Text style={styles.buttonText}>Upload</Text>
      </TouchableOpacity>
    </View>

    <View style={styles.footer}>
      <Text style={styles.footerTitle}>Last Appointments</Text>
      <Text style={styles.viewAll}>View All</Text>
    </View>
    <View style={styles.appointView}>
              <Image source={require('../../assets/images/doc.png')} style={styles.docImage} />
              <View style={styles.docdet}>
                  <Text style={styles.docname}>{patientData.consultingDoctor}</Text>
                  <View style={{ display: 'flex', flexDirection: 'row' }}>
                      <Text style={styles.docdesg}>MD, DND, DM</Text>
                      <Text style={styles.docexp}>Pulmonary Medicine</Text>
                  </View>
                  <Text style={styles.doclang}>English, Hindi , Bengali</Text>
              </View>
              <TouchableOpacity
                  style={styles.viewButton2451}
                  // onPress={() => handleViewDetails()}
              >
                  <Text style={styles.viewDetails}>View Details</Text>
              </TouchableOpacity>
              <View style={styles.appdate}>
                  <Text style={styles.apptext}>Appointment On: <Text style={styles.datime}>{patientData.date} , {patientData.time}</Text></Text>
              </View>
          </View>
  </View>
  
);
}
const styles = StyleSheet.create({
appointView: {
  width: windowWidth*0.97,
  height: windowWidth * 0.43,
  backgroundColor: '#fff',
  alignSelf: 'center',
  marginTop: 10,
  flexDirection: 'row',
  borderRadius: 10,
  borderWidth: 1,
  borderStyle: 'solid',
  borderColor: '#357EEA',
  elevation: 5,
},
docImage: {
marginTop: windowWidth * 0.02,
marginLeft: windowWidth * 0.02,
// marginRight: 10,
width: windowWidth * 0.2,
height: windowWidth * 0.25,
borderRadius: 8,
},
appdate: {
position: 'absolute',
display: 'flex',
bottom: 7,
// left: 10,
width: windowWidth * 0.965,
borderTopColor: '#D1D1D6',
borderTopWidth: 1,
borderStyle: 'solid',

},
apptext: {
color: '#666',
fontSize: 13,
// alignSelf: 'center',
marginLeft: windowWidth * 0.02,
marginTop: windowWidth * 0.01
},
datime: {
color: '#011411',
alignSelf: 'center',
fontFamily: 'bold01'
},
viewButton2451: {
flexDirection: 'row',
justifyContent: 'center',
alignItems: 'center',
position: "absolute",
width: windowWidth * 0.28,
height: 34,
borderColor: '#357EEA',
borderWidth: 2,
borderStyle: 'solid',
borderRadius: 5,
marginTop: windowWidth * 0.21,
marginLeft: windowWidth * 0.65,
},
viewDetails: {
color: '#357EEA',
fontSize: 12,
alignContent: 'center',
},
docdet: {
display: 'flex',
flexDirection: 'column',
},
docname: {
fontWeight: 'bold',
alignItems: 'center',
marginLeft: windowWidth * 0.02,
marginTop: windowWidth * 0.05,
fontSize: 14,
fontFamily: FontFamily.font_bold,
},
docdesg: {
marginLeft: windowWidth * 0.02,
alignItems: 'center',
color: '#011411',
fontSize: 12,
fontFamily: FontFamily.font_bold,
marginTop: windowWidth * 0.005,
width: windowWidth*0.28
},
doclang: {
marginLeft: windowWidth * 0.02,
alignItems: 'center',
color: Color.colorGray_100,
fontSize: 12,
fontFamily: 'bold01',
marginTop: windowWidth * 0.005
},
docexp: {
color: '#357EEA',
marginLeft: windowWidth * 0.13,
alignItems: 'center',
fontSize: 12,
fontFamily: FontFamily.font_bold,
marginTop: windowWidth * 0.005,
},
container: {
  flex: 1,
  padding: 16,
  backgroundColor: '#F5F5F5', 
},
topContainer: {
  marginTop: windowWidth*0.08, 
},
header: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 16,
},
profileImage: {
  width: 40,
  height: 40,
  borderRadius: 20,
  marginRight: 8,
},
profileText: {
  flex: 1,
},
boldText: {
  fontWeight: 'bold',
},
greyText: {
  color: 'gray',
},
notificationIcon: {
  marginRight: 8,
},
searchBar: {
  flexDirection: 'row',
  alignItems: 'center',
  backgroundColor: '#fff',
  borderWidth: 1,
  borderColor: '#357EEA',
  borderRadius: 8,
  paddingHorizontal: 8,
  marginTop: -8,
  marginBottom: 8,
  height: 38,
},
searchInput: {
  flex: 1,
  marginLeft: 8,
  color: '#333',
},
imageSlider: {
  height: windowWidth * 0.5, 
  backgroundColor: '#f0f0f0',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: 16,
  marginTop: windowWidth*0.01, 
},
sliderDots: {
  flexDirection: 'row',
  position: 'absolute',
  bottom: 16,
},
dot: {
  width: 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: '#ccc',
  marginHorizontal: 4,
},
sectionTitle: {
  fontSize: 18,
  fontWeight: 'bold',
  marginTop: -5,
  marginBottom: 8,
},
buttonContainer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 16,
},
button: {
  width: '26%',
  aspectRatio: 1,
  alignItems: 'center',
  borderRadius: 10,
  padding: 6,
  backgroundColor: '#F5F5F5', 
  borderWidth: 1,
  borderColor: '#EBEBEB', 
},
buttonShadow: {
  elevation: 4,
  shadowColor: 'rgba(0, 0, 0, 0.25)',
  shadowOpacity: 0.2,
  shadowRadius: 2,
},
footer: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: windowWidth*0.07
},
footerTitle: {
  fontSize: 16,
  fontWeight: 'bold',
},
viewAll: {
  color: '#357EEA',
  textDecorationLine: 'underline',
},
sliderImage: {
  width: '100%',
  height: '100%',
  resizeMode: 'cover',
  borderRadius: 10,
},
buttonImage: {
  width: '80%',
  height: '100%',
  resizeMode: 'contain',
  
},
buttonText: {
  fontSize: 11,
  marginTop: 10,
  textAlign: 'center',
},
});

export default Home;