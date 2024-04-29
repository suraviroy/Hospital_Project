import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions, SafeAreaView ,ScrollView} from 'react-native';
import { MaterialIcons,FontAwesome6 } from '@expo/vector-icons';
import axios from 'axios';
import { backendURL } from "../backendapi";
const windowWidth = Dimensions.get('window').width;
import { FontFamily, Color } from '../../GlobalStyles';

const MyProfile =({ route }) => {
  const [defaultRating, setdefaultRating] =useState(2)
  const [maxRating, setmaxRating] =useState([1,2,3,4,5])
  const [improvementText, setImprovementText] = useState('');
  const { patientId } = route.params;
  const [patientData, setPatientData] = useState({});
  const starImgFilled = require('../../assets/images/star_filled.png')
  const starImgCorner = require('../../assets/images/star_corner.png')
  const CustomRatingBar = () => {
    return (
      <View style={styles.ratingBar}>
        {maxRating.map((item, key) => (
          <TouchableOpacity
            activeOpacity={0.7}
            key={item}
            onPress={() => setdefaultRating(item)}
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
    useEffect(() => {
        fetch(`${backendURL}/patientRouter/PatientProfile/${patientId}`)
            .then(response => response.json())
            .then(data => {
              setPatientData(data);
            })
            .catch(error => {
                console.error('Error fetching patient basic details:', error);
            });
            console.log(patientData)
    }, [patientId]);
    return (
      <SafeAreaView style={styles.container01}>
        <ScrollView style={styles.scrollViewContent}>
         <View style = {styles.bgprofile}>
            <View style = {styles.textContainer}>
             <View style = {styles.profiledetails}>
                <View styele = {styles.textbg}>   
                <Text style= {styles.textStyle}>Name: {patientData.name}</Text>
                <Text style= {styles.textStyle}>Gender: {patientData.gender}</Text>
                <Text style= {styles.textStyle}>Email: {patientData.email}</Text>
                <Text style= {styles.textStyle}>Username:{patientData.patientId}</Text>
                <Text style= {styles.textStyle}>Age: {patientData.age}    Blood Group: {patientData.bloodGroup}</Text>
                </View>
                <Image source={{ uri: patientData.image }} style={styles.docImage} />
             </View>
             <Text style= {styles.textStyle01}>Address: {patientData.address}</Text>
             <Text style= {styles.textStyle02}>State: {patientData.state}</Text>
             <Text style= {styles.textStyle02}>Country: {patientData.country}</Text>
            </View>
         </View>
         <View style={styles.feedprofile}>
         <View style={styles.logout}>
         <TouchableOpacity style={styles.logbutton} >
        <MaterialIcons name='logout' size={25} color='#35A9EA' marginRight={20} paddingLeft= {20} paddingTop={5}/>
        <Text style={styles.textbutton}>Logout</Text>
        <FontAwesome6 name='arrow-right-long' size={25} color='#35A9EA' marginRight={20} paddingLeft= {windowWidth*0.5} paddingTop={5}/>
        </TouchableOpacity>
        </View>
        <View style= {styles.feedpage}>
            <Text style={styles.feedtext}> RATE YOUR EXPERIENCE</Text>
            <CustomRatingBar />
            <Text style={styles.feedtext}>Tell Us How We can Improve</Text>
            <View style = {styles.textfeed}>
            <TextInput
            style={styles.inputBox}
            multiline={true}
            numberOfLines={4}
            onChangeText={text => setImprovementText(text)}
            value={improvementText}
            placeholder="Enter your feedback..."
          />
            </View> 
            <TouchableOpacity>
            <Text style={styles.sendbutton}>Send</Text>
            </TouchableOpacity>
        </View>
      </View>
      </ScrollView>
     </SafeAreaView>
);
}
const styles = StyleSheet.create({
    container01: {
        flex:1,
        // alignItems: 'center',
        // justifyContent: 'center',
        backgroundColor: 'white',
        // flexDirection: 'column',
        marginBottom: windowWidth*0.05
      },
      scrollViewContent: {
        flexGrow: 1,
    },
      sendbutton:{
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
       paddingLeft: windowWidth*0.05,
       borderRadius: windowWidth*0.01,
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
      height: windowWidth*0.80,
      top: -windowWidth*0.50,
      width: '100%',
      backgroundColor: '#35A9EA',
      borderRadius: windowWidth * 0.05,
      borderTopLeftRadius: 0,
      borderTopRightRadius: 0,
      },
      textContainer:{
       paddingTop: windowWidth * 0.03,
       paddingLeft: windowWidth * 0.03,
       backgroundColor: 'white',
       height: windowWidth*0.5,
       width: windowWidth*0.8,
       position:'absolute',
       left: windowWidth*0.1,
       top: windowWidth*0.18,
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
        paddingBottom: windowWidth*0.01,
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
        marginTop: windowWidth*0.09,
        height: windowWidth*0.85,
        backgroundColor: '#D1EDFC',
        borderRadius: windowWidth * 0.06,
        marginLeft: windowWidth*0.05,
      },
      feedprofile:{
         height: windowWidth*0.96,
         width: '95%',
         backgroundColor: 'white',
         marginTop: -windowWidth*0.40,
         borderRadius: windowWidth * 0.05,
      },
})
export default MyProfile;
