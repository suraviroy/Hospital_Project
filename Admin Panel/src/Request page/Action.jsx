import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Color } from '../../GlobalStyles';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const Action = () => {
  const navigation = useNavigation();
  const [selectedOption, setSelectedOption] = useState(null);

  const buttonMargin = windowWidth * 0.02; 
  const leftRightMargin = windowWidth * 0.04; 

  const options = [
    "Start oxygen inhalation",
    "Rush to nearest emergency and hospitalization & inform",
    "Get admitted and inform us with the name and phone number of your doctor so that we can contact him",
    "Send the details of admission/discharge certificate",
    "Please send the death certificate for our record"
  ];

  const handleOptionSelect = (index) => {
    if (selectedOption === index) {
      setSelectedOption(null);
    } else {
      setSelectedOption(index);
    }
  };

  const renderOptions = () => {
    return options.map((option, index) => (
      <TouchableOpacity
        key={index}
        style={[
          styles.optionBox,
          selectedOption === index && {
            backgroundColor: '#2A998880',
            color: '#fff',
          },
        ]}
        onPress={() => handleOptionSelect(index)}
      >
        <View style={[styles[`circle${index + 1}`], selectedOption === index && { backgroundColor: '#2A9988' }]}></View>
        <Text style={styles.optionText}>{option}</Text>
      </TouchableOpacity>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="angle-left" size={32} color={Color.colorBlack} />
        </TouchableOpacity>
        <Text style={styles.title}>Request Details</Text>
      </View>
      <ScrollView style={{ flex: 1 }}>
        {/* <View style={styles.userInfo}>
          <View style={styles.nameContainer}>
            <Text style={styles.userInfoText}>Name: Michael Denil</Text>
          </View>
          <View style={styles.idBox}>
            <Text style={[styles.userInfoText, { color: '#000' }]}>ID: </Text>
            <Text style={[styles.userInfoText, { color: '#000', marginTop: 2 }]}>12345</Text>
          </View>
        </View>  */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={[styles.basicButton, { flex: 1, marginRight: buttonMargin, marginLeft: leftRightMargin, backgroundColor: '#D9D9D980' }]}>
            <Text style={[styles.buttonText, { color: '#000' }]}>Basic Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.requestButton, { flex: 1, marginHorizontal: buttonMargin, backgroundColor: '#D9D9D980' }]}>
            <Text style={[styles.buttonText, { color: '#000' }]}>Request</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, { flex: 1, marginLeft: buttonMargin, marginRight: leftRightMargin, backgroundColor: '#2A9988' }]}
          >
            <Text style={[styles.buttonText, { color: '#fff' }]}>Action</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.bottomContainer}>
          <Image source={require('../../assets/images/action.png')} style={styles.bottomImage} />
          <Text style={[styles.bottomText, { fontWeight: 'bold' }]}>What action do you want to take?</Text>
          <View style={styles.optionsContainer}>
            {renderOptions()}
          </View>
          <TouchableOpacity style={styles.sendButton}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  userInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom: -2,
    marginTop: 8,
  },
  userInfoText: {
    fontSize: 16,
  },
  nameContainer: {
    marginTop: 4, 
  },
  idBox: {
    flexDirection: 'row',
    backgroundColor: '#ACF6EB',
    borderRadius: 5,
    alignItems: 'center',
    paddingVertical: 1,
    paddingHorizontal: 28,
    borderTopLeftRadius: 20, 
    borderBottomLeftRadius: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  requestButton: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 16,
  },
  basicButton: {
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  bottomImage: {
    width: 200, 
    height: 200, 
    marginBottom: 10,
    marginTop: -8,
  },
  bottomText: {
    fontSize: 18,
    left: -30,
  },
  optionsContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    marginTop: 10,
  },
  optionBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#D9D9D980',
    borderRadius: 12,
    padding: 6,
    marginBottom: 10,
    marginLeft: 0,
    width: windowWidth - 54,
  },
  optionText: {
    fontSize: 14,
    color: '#000',
    marginLeft: 10,
  },
  circle1: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: '#000',
    position: 'absolute',
    left: -20,
    top: 8,
  },
  circle2: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: '#000',
    position: 'absolute',
    left: -20,
    top: 16,
  },
  circle3: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: '#000',
    position: 'absolute',
    left: -20,
    top: 25,
  },
  circle4: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: '#000',
    position: 'absolute',
    left: -20,
    top: 16,
  },
  circle5: {
    width: 16,
    height: 16,
    borderRadius: 10,
    backgroundColor: '#000',
    position: 'absolute',
    left: -20,
    top: 16,
  },
  sendButton: {
    backgroundColor: '#2A9988',
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 140,
    marginTop: 20,
    marginBottom: 16,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Action;
