import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

// Get screen dimensions and scale
const { width, height } = Dimensions.get('window');
const scale = Math.min(width, height) / 375; // Base scale on smaller dimension
const statusBarHeight = StatusBar.currentHeight || 0;

// Responsive font sizing
const normalize = (size) => {
  return Math.round(scale * size);
};

// Custom CheckBox Component
const CustomCheckBox = ({ title, checked, onPress }) => {
  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={onPress}>
      <View style={[styles.checkbox, checked && styles.checkboxChecked]}>
        {checked && <Icon name="checkmark" size={normalize(16)} color="#fff" />}
      </View>
      <Text style={styles.checkboxText}>{title}</Text>
    </TouchableOpacity>
  );
};

const AlertNoti = () => {
  const navigation = useNavigation();
  const [isChecked, setIsChecked] = useState(false);

  const handleAlert = () => {
    navigation.navigate('Login');
  };

  const cautionPoints = [
    "This app is currently in its testing phase. Some features may not function as intended.",
    "You may encounter bugs, errors, or unexpected behavior while using the app.",
    "Data entered during this testing period may not be saved or may be lost.",
    "Patient information security measures are still being implemented. Use caution when entering sensitive data.",
    "The app's performance may be slower than expected as we optimize its functionality.",
    "Some features may be incomplete or subject to change in future updates.",
    "In case of emergencies, please use established hospital / clinic protocols rather than relying solely on this app. Consult your family physician orattend the nearest hospital emergency. Our patients may call ournumbers for information. We will try assistance, if possible.",
    "Your feedback is crucial. Please report any issues or suggestions to improve the app's functionality.",
    "We appreciate your cooperation and patience as we work to enhance this tool for better patient coordination.",
    "For immediate assistance or to report critical issues, please contact our support team."
  ];

  return (
    <ScrollView style={styles.safeArea}>
      <StatusBar 
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
            backgroundColor="#FFFFFF" 
            translucent={false}
        />
      <View style={styles.container}>
        <View style={styles.backgroundOverlay} />
        
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Please read it carefully</Text>
          
          <View style={styles.alertBox}>
            <View style={styles.straightLine} />
            <ScrollView 
              style={styles.scrollView}
              showsVerticalScrollIndicator={false}
            >
              {cautionPoints.map((point, index) => (
                <View key={index} style={styles.bulletPoint}>
                  <Text style={styles.bullet}>•</Text>
                  <Text style={styles.text}>{point}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
          <CustomCheckBox
            title="I have read all the above information"
            checked={isChecked}
            onPress={() => setIsChecked(!isChecked)}
          />

          <TouchableOpacity 
            style={[styles.alertButton, !isChecked && styles.disabledButton]} 
            onPress={handleAlert}
            disabled={!isChecked}
          >
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>Proceed</Text>
              <Icon 
                name="chevron-forward-circle-outline" 
                size={normalize(20)} 
                color='#fff' 
                style={styles.icon} 
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
    paddingBottom:width*0.5,
    paddingTop: Platform.OS === 'android' ? statusBarHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
    paddingBottom: height * 0.01,
  },
  backgroundOverlay: {
    // backgroundColor: '#357EEA',
    top: -height / 2,
    // position: 'absolute',
    
  },
  alertBox: {
    backgroundColor: 'white',
    borderRadius: normalize(10),
    width: '100%',
    maxHeight: height * 0.65,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    paddingBottom:width*0.02
  },
  straightLine: {
    position: 'absolute',
    top: 0,
    left: normalize(10),
    width: normalize(3),
    height: '100%',
    backgroundColor: '#357EEA',
  },
  scrollView: {
    marginLeft: normalize(20),
    paddingVertical: normalize(10),
    paddingRight: normalize(10),
  },
  title: {
    fontSize: normalize(20),
    fontWeight: '600',
    color: '#E90808',
    marginVertical: normalize(20),
    fontFamily: "regular05",
    alignSelf: 'flex-start',
    paddingLeft: normalize(10),
  },
  bulletPoint: {
    flexDirection: 'row',
    marginBottom: normalize(10),
    paddingRight: normalize(10),
  },
  bullet: {
    marginRight: normalize(5),
    color: '#357EEA',
    fontSize: normalize(14),
  },
  text: {
    flex: 1,
    fontSize: normalize(14),
    lineHeight: normalize(20),
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(10),
  },
  checkbox: {
    width: normalize(20),
    height: normalize(20),
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#357EEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: normalize(8),
  },
  checkboxChecked: {
    backgroundColor: '#357EEA',
  },
  checkboxText: {
    fontSize: normalize(14),
    color: '#333',
  },
  alertButton: {
    backgroundColor: '#357EEA',
    padding: normalize(12),
    borderRadius: normalize(5),
    marginTop: normalize(10),
    width: '100%',
  },
  disabledButton: {
    backgroundColor: '#cccccc',
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  buttonText: {
    color: 'white',
    fontSize: normalize(16),
    fontWeight: 'bold',
  },
  icon: {
    marginLeft: normalize(8),
  },
});

export default AlertNoti;
