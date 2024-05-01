import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Color } from '../../GlobalStyles';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ActionOk = ({ navigation }) => {
  const buttonPadding = windowWidth * 0.15;
  const buttonMargin = windowWidth * 0.04; 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text>
            <Icon name="angle-left" size={32} color={Color.colorBlack} />
          </Text>
        </TouchableOpacity>
        <Text style={styles.title}>Request Details</Text>
      </View>
      {/* <View style={[styles.buttonContainer, { marginTop: windowHeight * 0.03 }]}>
        <TouchableOpacity style={[styles.requestButton, { paddingHorizontal: buttonPadding, marginLeft: buttonMargin }]}>
          <Text style={[styles.buttonText, { color: '#000' }]}>Request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { paddingHorizontal: buttonPadding, marginRight: buttonMargin }]}
        >
          <Text style={[styles.buttonText, { color: '#FFFFFF' }]}>Action</Text>
        </TouchableOpacity>
      </View> */}
      <View style={[styles.contentContainer, { marginTop: -windowHeight * 0.15 }]}>
        <Image source={require('../../assets/images/ok.png')} style={[styles.image, { width: windowWidth * 0.7, height: windowWidth * 0.65 }]} />
        <Text style={styles.actionTaken}>Action Taken</Text>
        <Text style={[styles.description, { width: windowWidth * 0.8 }]}>
          Please consult locally and ask your doctor the following
        </Text>
        <Text style={styles.thankYou}>Thank You !!</Text>
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
  },
  // buttonContainer: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  // },
  // requestButton: {
  //   backgroundColor: 'rgba(209, 237, 252, 1)',
  //   paddingVertical: 10,
  //   borderRadius: 5,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // actionButton: {
  //   backgroundColor: 'rgba(53, 169, 234, 1)',
  //   paddingVertical: 10,
  //   borderRadius: 5,
  //   alignItems: 'center',
  //   justifyContent: 'center',
  // },
  // buttonText: {
  //   fontSize: 16,
  // },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginBottom: 10,
  },
  actionTaken: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 60,
    color: '#676464',
  },
  thankYou: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ActionOk;