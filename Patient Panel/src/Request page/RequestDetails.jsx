import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Color } from '../../GlobalStyles';
import { useNavigation } from '@react-navigation/native';

const windowWidth = Dimensions.get('window').width;

const RequestDetails = () => {
  const navigation = useNavigation();
  const actionType = 1; 

  const handleAction = (actionType) => {
    if (actionType === 1) {
      navigation.navigate('ActionOk');
    } else {
      navigation.navigate('ActionError');
    }
  };

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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.requestButton, { paddingHorizontal: buttonPadding, marginLeft: buttonMargin }]}>
          <Text style={[styles.buttonText, { color: '#000' }]}>Request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { paddingHorizontal: buttonPadding, marginRight: buttonMargin }]}
          onPress={() => handleAction(actionType)}
        >
          <Text style={[styles.buttonText, { color: '#000' }]}>Action</Text>
        </TouchableOpacity>
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  requestButton: {
    backgroundColor: 'rgba(209, 237, 252, 1)',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionButton: {
    backgroundColor: 'rgba(209, 237, 252, 1)',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
  },
});

export default RequestDetails;