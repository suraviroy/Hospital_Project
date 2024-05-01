import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Color } from '../../GlobalStyles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ActionError = ({ navigation }) => {
  const buttonPadding = windowWidth * 0.15; 
  const buttonMargin = windowWidth * 0.04; 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Action Details</Text>
      </View>
      <View style={[styles.contentContainer, { marginTop: windowHeight * 0.01 }]}>
        <Image source={require('../../assets/images/error.png')} style={[styles.image, { width: windowWidth * 0.7, height: windowWidth * 0.85 }]} />
        <Text style={styles.actionTaken}>No Action Is Taken Till Now</Text>
        <Text style={[styles.description, { width: windowWidth * 0.8 }]}>
          We will get back to you within office hours
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 10,
  },
  header: {
    paddingTop: 30,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 0.18,
    borderBottomColor: '#ccc',
  },
  title: {
    fontSize: 25,
    marginLeft: 70,
    fontFamily: 'bold01',
    marginLeft: windowWidth*0.25,
    fontWeight: '700'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginBottom: 10,
  },
  actionTaken: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 60,
    color: '#676464',
    fontWeight:'700'
  },
});

export default ActionError;