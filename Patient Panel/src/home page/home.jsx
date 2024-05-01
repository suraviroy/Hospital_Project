import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useNavigation, useRoute } from '@react-navigation/native';
import { backendURL } from "../backendapi";
const windowWidth = Dimensions.get('window').width;
import { FontFamily, Color } from '../../GlobalStyles';

const Home = ({ route }) => {
  const navigation = useNavigation();
  const { patientId } = route.params;
  const [patientData, setPatientData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

const handleViewDetails = (patientId) => {
  navigation.navigate('Request', { patientId});
};
  const handleNextSlide = () => {
    setCurrentIndex((currentIndex + 1) % 3);
  };
  useEffect(() => {
    fetch(`${backendURL}/patientRouter/HomePageDetails/${patientId}`)
        .then(response => response.json())
        .then(data => {
          setPatientData(data[0]);
        })
        .catch(error => {
            console.error('Error fetching patient basic details:', error);
        });
}, [patientId]);
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.header}>         
            <>
              <Image source={{ uri: patientData.image }} style={styles.profileImage} />
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
                index === currentIndex && { backgroundColor: '#35A9EA' },
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
        <TouchableOpacity style={[styles.button, styles.buttonShadow]}  onPress={() => handleViewDetails(patientId)}>
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
                <Image source={{ uri: 'https://s3-alpha-sig.figma.com/img/f090/da92/0c0b2c11a9e7821a841e1c7d8128531b?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UTd2U3uMJfxYpa6ttNjsY6ywyHjJcf7dhuhtMN0yiriIE4gWZOLt4OeoiTgXj7H0EBygPTlEnzkj0zFxcJKg-36j-OVTFgmAqc6vrNo8h9~Yxotz6rcTvvB9s0mHpTurYpUgWQP9dx0OolWDlNyofFW6Qqt04IVwQIjHxoP3PJRij8MMG0BiL92BeCK-ERu-kuxjD6K4sQ94lqqeGSGmPxEr68S7VPBz2yNxEcjp-128tLZzxAtbwe6zrf~-NQV5z9pUV16OwDjyVtSvB~LaS0V90MxkXvtSGx3WuIPKZCCv4INYYofEbXKTwghvg~S090PEzO20xnut3ru5Yt1bYA__' }} style={styles.docImage} />
                <View style={styles.docdet}>
                    <Text style={styles.docname}>{patientData.consultingDoctor}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={styles.docdesg}>MBBS, Pathologist</Text>
                        <Text style={styles.docexp}>18 Years Exp</Text>
                    </View>
                    <Text style={styles.doclang}>English, Hindi +1</Text>
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
};

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
    borderColor: '#35A9EA',
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
  borderColor: '#35A9EA',
  borderWidth: 2,
  borderStyle: 'solid',
  borderRadius: 5,
  marginTop: windowWidth * 0.21,
  marginLeft: windowWidth * 0.65,
},
viewDetails: {
  color: '#35A9EA',
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
  color: '#35A9EA',
  marginLeft: windowWidth * 0.17,
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
    borderColor: '#35A9EA',
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
    color: '#35A9EA',
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
