import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { backendURL } from "../backendapi";
const windowWidth = Dimensions.get('window').width;


const Home = ({ route }) => {
  const { patientId } = route.params;
  const [patientData, setPatientData] = useState({});
  const [currentIndex, setCurrentIndex] = useState(0);

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
        console.log(patientData)
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
          <Image source={require('../../assets/images/lab1.png')} style={styles.sliderImage} />
        )}
        {currentIndex === 1 && (
          <Image source={require('../../assets/images/lab2.png')} style={styles.sliderImage} />
        )}
        {currentIndex === 2 && (
          <Image source={require('../../assets/images/lab3.png')} style={styles.sliderImage} />
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
        <TouchableOpacity style={[styles.button, styles.buttonShadow]}>
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
    </View>
  );
};

const styles = StyleSheet.create({
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