import React, { useState } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const windowWidth = Dimensions.get('window').width;
import { Color } from '../../../GlobalStyles';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Picker from 'react-native-picker';


const ExiDisForm = () => {
  const [selected, setSelected] = useState([]);
  const [selectedUnit, setSelectedUnit] = useState('Unit');

  const Dis_Options = [
    {
      value: 'Diabetes',
      key: 'DIA',
    },
    {
      value: 'Hypertension',
      key: 'HT',
    },
    {
      value: 'IHD',
      key: 'IHD',
    },
    {
      value: 'Hypothyroidism',
      key: 'HTH',
    },
    {
      value: 'Allergic Rhinitis',
      key: 'AR',
    },
    {
      value: 'Hyperuricemia',
      key: 'HYP',
    },
    {
      value: 'Asthma',
      key: 'AS',
    },
    {
      value: 'TB',
      key: 'TB',
    },
    {
      value: 'COPD',
      key: 'COPD',
    },
    {
      value: 'ILD',
      key: 'ILD',
    },
    {
      value: 'Bronchiectasis',
      key: 'BRT',
    },

    {
      value: 'OSA',
      key: 'OSA',
    },
    {
      value: 'IBS',
      key: 'IBS',
    },
    {
      value: 'Inflammatory bowel diseases',
      key: 'IBD',
    },
    {
      value: 'Depression',
      key: 'DEP',
    },
    {
      value: 'Anxiety',
      key: 'ANX',
    },
    {
      value: 'Collagen vascular disease',
      key: 'CVD',
    },
    {
      value: 'Malignancy',
      key: 'MAG',
    },
    {
      value: 'Dyslipidemia',
      key: 'DYS',
    },
    {
      value: 'CKD',
      key: 'CKD',
    },
    {
      value: 'CLD',
      key: 'CLD',
    },
    {
      value: 'Others',
      key: 'OTH',
    },
  ];

  const Unit = [
    {
      value: 'Days',
      key: 'DY',
    },
    {
      value: 'Weeks',
      key: 'WK',
    },
    {
      value: 'Months',
      key: 'MT',
    },
    {
      value: 'Years',
      key: 'YR',
    },
  ]

  const renderAdditionalFields = () => {
    return selected.map((option) => {
      switch (option) {
        case 'Diabetes':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Diabetes</Text>
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
        case 'Hypertension':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Hypertension</Text>
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
        case 'IHD':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>IHD</Text>
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
        case 'Hypothyroidism':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Hypothyroidism</Text>
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
        case 'Allergic Rhinitis':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Allergic Rhinitis</Text>
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
        case 'Hyperuricemia':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Hyperuricemia</Text>
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
        case 'Asthma':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Asthma</Text>
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
        case 'TB':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>TB</Text>
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
        case 'COPD':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>COPD</Text>
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
        case 'ILD':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>ILD</Text>
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
        case 'Bronchiectasis':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Bronchiectasis</Text>
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
        case 'OSA':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>OSA</Text>
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
        case 'IBS':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>IBS</Text>
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
        case 'Inflammatory bowel diseases':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Inflammatory bowel diseases</Text>
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
        case 'Depression':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Depression</Text>
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
        case 'Anxiety':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Anxiety</Text>
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
        case 'Collagen vascular disease':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Collagen vascular disease</Text>
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
        case 'Dyslipidemia':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Dyslipidemia</Text>
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
        case 'CLD':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>CLD</Text>
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
        case 'Malignancy':
          return (
            <View key={option} style={styles.problems2}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Malignancy</Text>
                <TouchableOpacity>
                  <Image source={require("../../../assets/images/delete.jpg")} style={styles.delete} />
                </TouchableOpacity>
              </View>
              <View style={styles.duration3}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Select Organ :</Text>
                <TouchableOpacity style={styles.dropdown23}>
                  <Text style={{ color: '#8E7D7D', fontSize: 15 }}>Select from the dropdown</Text>
                  <Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.1} />
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
        case 'CKD':
          return (
            <View key={option} style={styles.problems2}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>CKD</Text>
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
});
export default ExiDisForm;