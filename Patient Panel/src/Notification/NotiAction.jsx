import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Color } from '../../GlobalStyles';
import { useNavigation,useRoute } from '@react-navigation/native';
import { backendURL } from "../backendapi";

const windowWidth = Dimensions.get('window').width;

const NotiAction = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { requestId } = route.params;
  const [selectedOption, setSelectedOption] = useState(null);

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

  const sendAction = async () => {
    if (selectedOption !== null) {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: options[selectedOption] })
      };
      
      try {
        const response = await fetch(`${backendURL}/adminRouter/action/${requestId}`, requestOptions);
        const data = await response.json();
        navigation.navigate('BottomNavigation');
        console.log(data);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      console.log('Please select an action.');
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.bottomContainer}>
          <Image source={require('../../assets/images/action.png')} style={styles.bottomImage} />
          <Text style={[styles.bottomText, { fontWeight: 'bold' }]}>What action do you want to take?</Text>
          <View style={styles.optionsContainer}>
            {renderOptions()}
          </View>
          <TouchableOpacity style={styles.sendButton} onPress={sendAction}>
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

export default NotiAction;