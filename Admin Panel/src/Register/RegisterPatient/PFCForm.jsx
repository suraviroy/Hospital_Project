import React, { useState } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const windowWidth = Dimensions.get('window').width;
import { Color } from '../../../GlobalStyles';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';


const PFCForm = () => {
  const [selected, setSelected] = useState([]);

  const Dis_Options = [
    {
      value: 'SOB',
      key: 'SOB',
    },
    {
      value: 'Cough',
      key: 'COU',
    },
    {
      value: 'Bleeding with cough',
      key: 'BWC',
    },
    {
      value: 'Chest pain/ chest congestion/ tightness of chest',
      key: 'CPN',
    },
    {
      value: 'Wheeze',
      key: 'WHE',
    },
    {
      value: 'Phlagm',
      key: 'PHL',
    },
    {
      value: 'Nasal congestion/ running',
      key: 'NCR',
    },
    {
      value: 'Snoring',
      key: 'SNO',
    },
    {
      value: 'Day time sleepiness',
      key: 'DTS',
    },
    {
      value: 'Weakness',
      key: 'WKN',
    },
    {
      value: 'Drowsiness',
      key: 'DRO',
    },

    {
      value: 'Lethargy/ low energy',
      key: 'LLE',
    },
    {
      value: 'Low mood',
      key: 'LOM',
    },
    {
      value: 'Diarrhoea',
      key: 'DIO',
    },
    {
      value: 'Uncontrolled diseases',
      key: 'UND',
    },
    {
      value: 'Others',
      key: 'OTR',
    },
  ]

  const renderAdditionalFields = () => {
    return selected.map((option) => {
      switch (option) {
        case 'SOB':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>SOB</Text>
                <TouchableOpacity>
                  <Image source={require("../../../assets/images/delete.jpg")} style={styles.delete} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <TouchableOpacity style={styles.dropdown20}>
                  <TextInput style={{ color: '#8E7D7D', fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdown21}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Unit</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.15} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <TouchableOpacity style={styles.dropdown22}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Select from the dropdown</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.02} />
                </TouchableOpacity>
              </View>
            </View>
          );
        case 'Cough':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Cough</Text>
                <TouchableOpacity>
                  <Image source={require("../../../assets/images/delete.jpg")} style={styles.delete} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <TouchableOpacity style={styles.dropdown20}>
                  <TextInput style={{ color: '#8E7D7D', fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdown21}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Unit</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.15} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <TouchableOpacity style={styles.dropdown22}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Select from the dropdown</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.02} />
                </TouchableOpacity>
              </View>
            </View>
          );
        case 'Bleeding with cough':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Bleeding with cough</Text>
                <TouchableOpacity>
                  <Image source={require("../../../assets/images/delete.jpg")} style={styles.delete} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <TouchableOpacity style={styles.dropdown20}>
                  <TextInput style={{ color: '#8E7D7D', fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdown21}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Unit</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.15} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <TouchableOpacity style={styles.dropdown22}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Select from the dropdown</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.02} />
                </TouchableOpacity>
              </View>
            </View>
          );
        case 'Chest pain/ chest congestion/ tightness of chest':
          return (
            <View key={option} style={styles.problems3}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Chest pain/ chest congestion/ tightness of chest</Text>
                <TouchableOpacity>
                  <Image source={require("../../../assets/images/delete.jpg")} style={styles.delete} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <TouchableOpacity style={styles.dropdown20}>
                  <TextInput style={{ color: '#8E7D7D', fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdown21}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Unit</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.15} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <TouchableOpacity style={styles.dropdown22}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Select from the dropdown</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.02} />
                </TouchableOpacity>
              </View>
            </View>
          );
        case 'Wheeze':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Wheeze</Text>
                <TouchableOpacity>
                  <Image source={require("../../../assets/images/delete.jpg")} style={styles.delete} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <TouchableOpacity style={styles.dropdown20}>
                  <TextInput style={{ color: '#8E7D7D', fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdown21}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Unit</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.15} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <TouchableOpacity style={styles.dropdown22}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Select from the dropdown</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.02} />
                </TouchableOpacity>
              </View>
            </View>
          );
        case 'Phlagm':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Phlagm</Text>
                <TouchableOpacity>
                  <Image source={require("../../../assets/images/delete.jpg")} style={styles.delete} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <TouchableOpacity style={styles.dropdown20}>
                  <TextInput style={{ color: '#8E7D7D', fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdown21}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Unit</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.15} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <TouchableOpacity style={styles.dropdown22}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Select from the dropdown</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.02} />
                </TouchableOpacity>
              </View>
            </View>
          );
        case 'Nasal congestion/ running':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Nasal congestion/ running</Text>
                <TouchableOpacity>
                  <Image source={require("../../../assets/images/delete.jpg")} style={styles.delete} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <TouchableOpacity style={styles.dropdown20}>
                  <TextInput style={{ color: '#8E7D7D', fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdown21}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Unit</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.15} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <TouchableOpacity style={styles.dropdown22}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Select from the dropdown</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.02} />
                </TouchableOpacity>
              </View>
            </View>
          );
        case 'Snoring':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Snoring</Text>
                <TouchableOpacity>
                  <Image source={require("../../../assets/images/delete.jpg")} style={styles.delete} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <TouchableOpacity style={styles.dropdown20}>
                  <TextInput style={{ color: '#8E7D7D', fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdown21}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Unit</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.15} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <TouchableOpacity style={styles.dropdown22}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Select from the dropdown</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.02} />
                </TouchableOpacity>
              </View>
            </View>
          );
        case 'Day time sleepiness':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Day time sleepiness</Text>
                <TouchableOpacity>
                  <Image source={require("../../../assets/images/delete.jpg")} style={styles.delete} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <TouchableOpacity style={styles.dropdown20}>
                  <TextInput style={{ color: '#8E7D7D', fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdown21}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Unit</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.15} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <TouchableOpacity style={styles.dropdown22}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Select from the dropdown</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.02} />
                </TouchableOpacity>
              </View>
            </View>
          );
        case 'Weakness':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Weakness</Text>
                <TouchableOpacity>
                  <Image source={require("../../../assets/images/delete.jpg")} style={styles.delete} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <TouchableOpacity style={styles.dropdown20}>
                  <TextInput style={{ color: '#8E7D7D', fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdown21}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Unit</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.15} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <TouchableOpacity style={styles.dropdown22}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Select from the dropdown</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.02} />
                </TouchableOpacity>
              </View>
            </View>
          );
        case 'Drowsiness':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Drowsiness</Text>
                <TouchableOpacity>
                  <Image source={require("../../../assets/images/delete.jpg")} style={styles.delete} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <TouchableOpacity style={styles.dropdown20}>
                  <TextInput style={{ color: '#8E7D7D', fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdown21}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Unit</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.15} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <TouchableOpacity style={styles.dropdown22}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Select from the dropdown</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.02} />
                </TouchableOpacity>
              </View>
            </View>
          );
        case 'Lethargy/ low energy':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Lethargy/ low energy</Text>
                <TouchableOpacity>
                  <Image source={require("../../../assets/images/delete.jpg")} style={styles.delete} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <TouchableOpacity style={styles.dropdown20}>
                  <TextInput style={{ color: '#8E7D7D', fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdown21}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Unit</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.15} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <TouchableOpacity style={styles.dropdown22}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Select from the dropdown</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.02} />
                </TouchableOpacity>
              </View>
            </View>
          );
        case 'Low mood':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Low mood</Text>
                <TouchableOpacity>
                  <Image source={require("../../../assets/images/delete.jpg")} style={styles.delete} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <TouchableOpacity style={styles.dropdown20}>
                  <TextInput style={{ color: '#8E7D7D', fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdown21}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Unit</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.15} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <TouchableOpacity style={styles.dropdown22}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Select from the dropdown</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.02} />
                </TouchableOpacity>
              </View>
            </View>
          );
        case 'Diarrhoea':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Diarrhoea</Text>
                <TouchableOpacity>
                  <Image source={require("../../../assets/images/delete.jpg")} style={styles.delete} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <TouchableOpacity style={styles.dropdown20}>
                  <TextInput style={{ color: '#8E7D7D', fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdown21}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Unit</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.15} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <TouchableOpacity style={styles.dropdown22}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Select from the dropdown</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.02} />
                </TouchableOpacity>
              </View>
            </View>
          );
        case 'Uncontrolled diseases':
          return (
            <View key={option} style={styles.problems2}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Uncontrolled diseases</Text>
                <TouchableOpacity>
                  <Image source={require("../../../assets/images/delete.jpg")} style={styles.delete} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration3}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Select Type :</Text>
                <TouchableOpacity style={styles.dropdown25}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Select from the dropdown</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.12} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration4}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <TouchableOpacity style={styles.dropdown20}>
                  <TextInput style={{ color: '#8E7D7D', fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdown21}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Unit</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.15} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <TouchableOpacity style={styles.dropdown22}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Select from the dropdown</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.02} />
                </TouchableOpacity>
              </View>
            </View>
          );
        case 'Others':
          return (
            <View key={option} style={styles.problems2}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Others</Text>
                <TouchableOpacity>
                  <Image source={require("../../../assets/images/delete.jpg")} style={styles.delete} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration3}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Disease :</Text>
                <TouchableOpacity style={styles.dropdown24}>
                  <TextInput style={{ color: '#8E7D7D', fontSize: 15, width: windowWidth * 0.6 }} placeholder='Enter Here' placeholderTextColor={'#8E7D7D'}></TextInput>
                </TouchableOpacity>
              </View>
              <View style={styles.duration4}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <TouchableOpacity style={styles.dropdown20}>
                  <TextInput style={{ color: '#8E7D7D', fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                </TouchableOpacity>
                <TouchableOpacity style={styles.dropdown21}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Unit</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.15} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <TouchableOpacity style={styles.dropdown22}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Select from the dropdown</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.02} />
                </TouchableOpacity>
              </View>
            </View>
          );
        default:
          return null;
      }
    });
  }

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <MultipleSelectList
        setSelected={(val) => setSelected(val)}
        data={Dis_Options}
        save="value"
        label="Selected Diseases"
        placeholder='Select'
        searchPlaceholder='Search'
        boxStyles={{
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: '#A99F9F',
          marginTop: windowWidth * 0.03,
          backgroundColor: '#e3e3e3',
          paddingLeft: 15,
          paddingRight: 15,
        }}
        inputStyles={{ color: '#8E7D7D', fontSize: 15 }}
      />
      {renderAdditionalFields()}
    </View>
  )
};

const styles = StyleSheet.create({
  problems: {
    width: windowWidth * 0.95,
    height: windowWidth * 0.48,
    backgroundColor: '#e3e3e3',
    marginTop: windowWidth * 0.05,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: windowWidth * 0.05,
    backgroundColor: '#e3e3e3',
    paddingLeft: 15,
    paddingRight: 15,
  },
  problist: {
    flexDirection: 'row',
    marginTop: windowWidth * 0.05,
    justifyContent: 'flex-start',
    // alignItems: 'center'
  },
  probheader: {
    fontWeight: '700',
    fontSize: 16,
    width: windowWidth * 0.7
  },
  delete: {
    width: 27,
    height: 30,
    marginLeft: windowWidth * 0.1,
    marginTop: -windowWidth * 0.03
  },
  duration: {
    flexDirection: 'row',
    marginTop: windowWidth * 0.08,
    alignItems: 'center'
  },
  dropdown20: {
    width: windowWidth * 0.35,
    height: 34,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#A99F9F',
    alignSelf: 'center',
    // marginTop: windowWidth*0.03,
    backgroundColor: '#F1F4F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: windowWidth * 0.05
  },
  dropdown21: {
    width: windowWidth * 0.3,
    height: 34,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#A99F9F',
    alignSelf: 'center',
    // marginTop: windowWidth*0.03,
    backgroundColor: '#F1F4F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: windowWidth * 0.02,
  },
  duration2: {
    flexDirection: 'row',
    marginTop: windowWidth * 0.05,
    alignItems: 'center'
  },
  dropdown22: {
    width: windowWidth * 0.55,
    height: 34,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#A99F9F',
    alignSelf: 'center',
    // marginTop: windowWidth*0.03,
    backgroundColor: '#F1F4F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 7,
    paddingRight: 10,
    marginLeft: windowWidth * 0.02,
  },
  problems2: {
    width: windowWidth * 0.95,
    height: windowWidth * 0.6,
    backgroundColor: '#e3e3e3',
    marginTop: windowWidth * 0.05,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: windowWidth * 0.05,
    backgroundColor: '#e3e3e3',
    paddingLeft: 15,
    paddingRight: 15,
  },
  duration3: {
    flexDirection: 'row',
    marginTop: windowWidth * 0.08,
    alignItems: 'center'
  },
  dropdown23: {
    width: windowWidth * 0.63,
    height: 34,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#A99F9F',
    alignSelf: 'center',
    // marginTop: windowWidth*0.03,
    backgroundColor: '#F1F4F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 7,
    paddingRight: 10,
    marginLeft: windowWidth * 0.02,
  },
  duration4: {
    flexDirection: 'row',
    marginTop: windowWidth * 0.05,
    alignItems: 'center'
  },
  dropdown24: {
    width: windowWidth * 0.67,
    height: 34,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#A99F9F',
    alignSelf: 'center',
    // marginTop: windowWidth*0.03,
    backgroundColor: '#F1F4F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 7,
    paddingRight: 10,
    marginLeft: windowWidth * 0.06,
  },
  dropdown25: {
    width: windowWidth * 0.65,
    height: 34,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: '#A99F9F',
    alignSelf: 'center',
    // marginTop: windowWidth*0.03,
    backgroundColor: '#F1F4F3',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 7,
    paddingRight: 10,
    marginLeft: windowWidth * 0.02,
  },
  problems3: {
    width: windowWidth * 0.95,
    height: windowWidth * 0.53,
    backgroundColor: '#e3e3e3',
    marginTop: windowWidth * 0.05,
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: windowWidth * 0.05,
    backgroundColor: '#e3e3e3',
    paddingLeft: 15,
    paddingRight: 15,
  },
});
export default PFCForm;