import React, { useState, useEffect, useContext } from 'react';
import { View, Text, Platform, StatusBar, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions, SafeAreaView, ScrollView, Alert, KeyboardAvoidingView } from 'react-native';
import { MaterialIcons, FontAwesome6 ,Ionicons} from '@expo/vector-icons';
import axios from 'axios';
import { backendURL } from "../backendapi";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../AuthContext';
import { useNavigation } from '@react-navigation/native';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const MyProfile = () => {
  const [defaultRating, setDefaultRating] = useState(2);
  const [maxRating] = useState([1, 2, 3, 4, 5]);
  const [improvementText, setImprovementText] = useState('');
  const [patientData, setPatientData] = useState({});
  const starImgFilled = require('../../assets/images/star_filled.png');
  const starImgCorner = require('../../assets/images/star_corner.png');

  const { logout } = useContext(AuthContext);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedPatientId = await AsyncStorage.getItem('patientId');
        if (storedPatientId) {
          fetchPatientProfile(storedPatientId);
        }
      } catch (error) {
        console.error('Error fetching patientId from storage:', error);
      }
    };
    fetchData();
  }, []);

  const fetchPatientProfile = async (patientId) => {
    try {
      const response = await fetch(`${backendURL}/patientRouter/PatientProfile/${patientId}`);
      const data = await response.json();
      setPatientData(data);
    } catch (error) {
      console.error('Error fetching patient profile:', error);
    }
  };
  const handleReports = () => {
    navigation.navigate('PatientReport');
};
  const handleSend = async () => {
    try {
      const response = await axios.post(`${backendURL}/patientRouter/sendFeedback`, {
        patientId: patientData.patientId,
        name: patientData.name,
        phonenumber: patientData.contactNumber,
        rating: defaultRating.toString(),
        feedback: improvementText,
      });
      console.log('Feedback submitted:', response.data);
      setDefaultRating(2);
      setImprovementText('');
      Alert.alert('Feedback Submitted', 'Thank you for your feedback!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      Alert.alert('Error', 'Failed to submit feedback. Please try again later.');
    }
  };

  const handleLogout = async () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { 
          text: "OK", 
          onPress: async () => {
            await logout();
            navigation.reset({
              index: 0,
              routes: [{ name: 'Login' }],
            });
          }
        }
      ]
    );
  };
 



  const CustomRatingBar = () => {
    return (
      <View style={styles.ratingBar}>
        {maxRating.map((item) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={() => setDefaultRating(item)}
          >
            <Image
              style={styles.starImgStyle}
              source={item <= defaultRating ? starImgFilled : starImgCorner}
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container01}>
      <StatusBar 
        barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
        backgroundColor="#FFFFFF" 
        translucent={false}
      />
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          style={styles.scrollViewContent} 
          contentContainerStyle={styles.scrollViewContainer}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.profileSection}>
            <View style={styles.bgprofile}>
              <View style={styles.textContainer}>
                <View style={styles.profiledetails}>
                  <View style={styles.textbg}>   
                    <Text style={styles.textStyle}>Name: {patientData.name}</Text>
                    <Text style={styles.textStyle}>Gender: {patientData.gender}</Text>
                    <Text style={styles.textStyle}>Email: {patientData.email}</Text>
                    <Text style={styles.textStyle}>Username: {patientData.patientId}</Text>
                    <Text style={styles.textStyle}>Age: {patientData.age}    Blood Group: {patientData.bloodGroup}</Text>
                  </View>
                </View>
                <Text style={styles.textStyle01}>Address: {patientData.address}</Text>
                <Text style={styles.textStyle02}>State: {patientData.state}</Text>
                <Text style={styles.textStyle02}>Country: {patientData.country}</Text>
              </View>
            </View>

            <View style={styles.feedprofile}>
              <View style={styles.logout}>
                <TouchableOpacity style={styles.logbutton} onPress={handleLogout}>
                  <MaterialIcons name='logout' size={25} color='#357EEA' marginRight={20} paddingLeft={20} paddingTop={5}/>
                  <Text style={styles.textbutton}>Logout</Text>
                  <FontAwesome6 name='arrow-right-long' size={25} color='#357EEA' marginRight={20} paddingLeft={windowWidth*0.35} paddingTop={5}/>
                </TouchableOpacity>
              </View>
              <View style={styles.logout}>
              <TouchableOpacity style={styles.logbutton} onPress={handleReports}>
  {/* <MaterialIcons name='logout' size={25} color='#357EEA' marginRight={20} paddingLeft={20} paddingTop={5}/> */}
  <Ionicons
                                        name="document-text-outline"
                                        size={25} color='#357EEA' marginRight={20} paddingLeft={20} paddingTop={5}
                                    />
  <Text style={styles.textbutton}>Check reports</Text>
  <FontAwesome6 name='arrow-right-long' size={25} color='#357EEA' marginRight={20} paddingLeft={windowWidth*0.2} paddingTop={5}/>
</TouchableOpacity>
              </View>

              <View style={styles.feedpage}>
                <Text style={styles.feedtext}> RATE YOUR EXPERIENCE</Text>
                <CustomRatingBar />
                <Text style={styles.feedtext}>Tell Us How We can Improve</Text>
                <View style={styles.textfeed}>
                  <TextInput
                    style={styles.inputBox}
                    multiline={true}
                    numberOfLines={4}
                    onChangeText={text => setImprovementText(text)}
                    value={improvementText}
                    placeholder="Enter your feedback..."
                  />
                </View> 
                <TouchableOpacity onPress={handleSend}>
                  <Text style={styles.sendbutton}>Send</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container01: {
    flex: 1,
    backgroundColor: 'white',
  marginBottom: windowWidth*0.1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  scrollViewContainer: {
    flexGrow: 1,
  },
  profileSection: {
    flex: 1,
  },
  sendbutton: {
    backgroundColor: '#5E9BF6',
    color: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: '700',
    marginTop: windowWidth*0.02,
    marginLeft: windowWidth*0.35,
    width: windowWidth*0.20,
    height: windowWidth*0.09,
    paddingTop: windowWidth*0.02,
    borderRadius: windowWidth*0.01,
    textAlign: 'center',
  },
      ratingBar:{
      paddingLeft: windowWidth*0.05,
       flexDirection: 'row',
      },
      textfeed:{
       backgroundColor: '#FBFBFB',
       height: windowWidth*0.3,
       marginLeft: windowWidth*0.045,
       width: windowWidth*0.80,
       borderRadius: windowWidth*0.03,
      },
      inputBox: {
        borderColor: '#ccc',
        paddingHorizontal: 10,
        paddingVertical: 5,
       
      },
      starImgStyle:{
      width:40,
      height: 40,
      resizeMode: 'cover'
      },
      logbutton:{
      flexDirection: 'row'
      },
      docImage: {
        position: 'absolute',
        left: windowWidth*0.53,
        width: windowWidth * 0.22,
        height: windowWidth * 0.23,
        borderRadius: windowWidth * 0.20,
      },
      bgprofile :{
      marginTop: windowWidth*0.5,
      position: 'relative',
      height: windowWidth*0.76,
      top: -windowWidth*0.50,
      width: '100%',
      backgroundColor: '#357EEA',
      borderRadius: windowWidth * 0.05,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      },
      textContainer:{
       paddingTop: windowWidth * 0.03,
       paddingLeft: windowWidth * 0.03,
       backgroundColor: 'white',
       minheight: windowWidth*0.6,
       paddingBottom:windowWidth*0.05,
       width: windowWidth*0.8,
       position:'absolute',
       left: windowWidth*0.1,
       top: windowWidth*0.10,
       borderRadius: windowWidth * 0.05,
       flexDirection: 'column'
      },
      textStyle:{
        fontFamily: "regular05",
        fontSize: 12,
        fontWeight: '700',
        marginBottom: 3,
      },
      textStyle01:{
        fontFamily: "regular05",
        fontSize: 12,
        fontWeight: '700',
        marginBottom: 1,
        paddingTop: windowWidth*0.01,
      },
      textStyle02:{
        fontFamily: "regular05",
        fontSize: 12,
        fontWeight: '700',
        marginTop: 3,
      },
      feedtext:{
        fontFamily: "regular05",
        fontSize: 15,
        fontWeight: '700',
        paddingTop: windowWidth*0.03,
        paddingLeft: windowWidth*0.03,
        paddingRight: windowWidth*0.03,
        // paddingBottom: windowWidth*0.01,
        marginTop: 3,
      },
      textbg:{
      flexDirection: 'column',
      },
      profiledetails:{
        flexDirection: 'row'
      },
      logout:{
        marginLeft: windowWidth*0.05,
        marginTop:windowWidth*0.05,
        height: windowWidth*0.10,
        backgroundColor:'#F5F4F4',
        borderRadius: windowWidth * 0.04,

      },
      textbutton:{
        fontFamily: "regular05",
        fontSize: 17,
        fontWeight: '600',
        paddingTop: 5
      },
      feedpage:{
        marginTop: windowWidth*0.03,
        height: windowWidth*0.75,
        backgroundColor: '#D1EDFC',
        borderRadius: windowWidth * 0.06,
        marginLeft: windowWidth*0.05,
      },
      feedprofile:{
         height: windowWidth*0.8,
         width: '95%',
         backgroundColor: 'white',
         marginTop: -windowWidth*0.47,
         borderRadius: windowWidth * 0.05,
         flexDirection:'column',
         justifyContent:'space-between'
      },
})
export default MyProfile;
