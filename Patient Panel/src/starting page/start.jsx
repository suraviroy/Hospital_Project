import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
  SafeAreaView,
  Platform,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');
const scale = Math.min(width, height) / 375;
const statusBarHeight = StatusBar.currentHeight || 0;

const normalize = (size) => {
  return Math.round(scale * size);
};

const Start = () => {
  const navigation = useNavigation();

  const handleGetStarted = () => {
    navigation.navigate('Alert');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
       <StatusBar 
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
            backgroundColor="#FFFFFF" 
            translucent={false}
        />
      <StatusBar
        backgroundColor="#357EEA"
        barStyle="light-content"
      />
      <View style={styles.container}>
        <Image
          source={require("../../assets/images/start.jpg")}
          style={styles.backgroundImage}
          resizeMode="contain"
        />
        
        <View style={styles.textContainer}>
          <Text style={styles.titleText}>
            <Text style={styles.institute}>Institute of Pulmocare</Text>
            {' '}
            <Text style={styles.research}>& Research</Text>
          </Text>
        </View>

        <TouchableOpacity
          style={styles.getStartedButton}
          onPress={handleGetStarted}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Get Started</Text>
          <Icon 
            name="arrow-right" 
            size={normalize(20)} 
            color='#357EEA' 
            style={styles.icon} 
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#357EEA',
    paddingTop: Platform.OS === 'android' ? statusBarHeight : 0,
  },
  container: {
    flex: 1,
    backgroundColor: '#357EEA',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    paddingHorizontal: width * 0.05,
  },
  backgroundImage: {
    marginTop:height*0.1,
    borderRadius: 45,
    bottom: 60,
    width: width * 0.9, 
    height: height * 0.55, 
    borderRadius:width*0.15,
},
  textContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: height * 0.05,
  },
  titleText: {
    textAlign: 'center',
    marginBottom: height * 0.02,
  },
  institute: {
    fontSize: normalize(24),
    color: '#FFFFFF',
    fontWeight: '500',
  },
  research: {
    fontSize: normalize(24),
    color: '#FFFFFF',
    fontWeight: '500',
  },
  getStartedButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: normalize(8),
    width: '100%',
    height: normalize(52),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: height * 0.05,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    fontSize: normalize(16),
    fontWeight: '700',
    color: '#357EEA',
  },
  icon: {
    marginLeft: normalize(10),
  },
});

export default Start;