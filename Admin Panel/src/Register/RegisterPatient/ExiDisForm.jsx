import React, { useState } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const windowWidth = Dimensions.get('window').width;
import { Color } from '../../../GlobalStyles';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { PickerIos, Picker } from '@react-native-picker/picker';

const ExiDisForm = () => {
  const [selectedOrgan, setSelectedOrgan] = useState('Select from the dropdown');
  const [selectedType, setSelectedType] = useState('Select from the dropdown');
  const [selected, setSelected] = useState([]);
  const [selectedUnit1, setSelectedUnit1] = useState('Unit');
  const [selectedStatus1, setSelectedStatus1] = useState('Select');
  const [selectedUnit2, setSelectedUnit2] = useState('Unit');
  const [selectedStatus2, setSelectedStatus2] = useState('Select');
  const [selectedUnit3, setSelectedUnit3] = useState('Unit');
  const [selectedStatus3, setSelectedStatus3] = useState('Select');
  const [selectedUnit4, setSelectedUnit4] = useState('Unit');
  const [selectedStatus4, setSelectedStatus4] = useState('Select');
  const [selectedUnit5, setSelectedUnit5] = useState('Unit');
  const [selectedStatus5, setSelectedStatus5] = useState('Select');
  const [selectedUnit6, setSelectedUnit6] = useState('Unit');
  const [selectedStatus6, setSelectedStatus6] = useState('Select');
  const [selectedUnit7, setSelectedUnit7] = useState('Unit');
  const [selectedStatus7, setSelectedStatus7] = useState('Select');
  const [selectedUnit8, setSelectedUnit8] = useState('Unit');
  const [selectedStatus8, setSelectedStatus8] = useState('Select');
  const [selectedUnit9, setSelectedUnit9] = useState('Unit');
  const [selectedStatus9, setSelectedStatus9] = useState('Select');
  const [selectedUnit10, setSelectedUnit10] = useState('Unit');
  const [selectedStatus10, setSelectedStatus10] = useState('Select');
  const [selectedUnit11, setSelectedUnit11] = useState('Unit');
  const [selectedStatus11, setSelectedStatus11] = useState('Select');
  const [selectedUnit12, setSelectedUnit12] = useState('Unit');
  const [selectedStatus12, setSelectedStatus12] = useState('Select');
  const [selectedUnit13, setSelectedUnit13] = useState('Unit');
  const [selectedStatus13, setSelectedStatus13] = useState('Select');
  const [selectedUnit14, setSelectedUnit14] = useState('Unit');
  const [selectedStatus14, setSelectedStatus14] = useState('Select');
  const [selectedUnit15, setSelectedUnit15] = useState('Unit');
  const [selectedStatus15, setSelectedStatus15] = useState('Select');
  const [selectedUnit16, setSelectedUnit16] = useState('Unit');
  const [selectedStatus16, setSelectedStatus16] = useState('Select');
  const [selectedUnit17, setSelectedUnit17] = useState('Unit');
  const [selectedStatus17, setSelectedStatus17] = useState('Select');
  const [selectedUnit18, setSelectedUnit18] = useState('Unit');
  const [selectedStatus18, setSelectedStatus18] = useState('Select');
  const [selectedUnit19, setSelectedUnit19] = useState('Unit');
  const [selectedStatus19, setSelectedStatus19] = useState('Select');
  const [selectedUnit20, setSelectedUnit20] = useState('Unit');
  const [selectedStatus20, setSelectedStatus20] = useState('Select');
  const [selectedUnit21, setSelectedUnit21] = useState('Unit');
  const [selectedStatus21, setSelectedStatus21] = useState('Select');
  const [selectedUnit22, setSelectedUnit22] = useState('Unit');
  const [selectedStatus22, setSelectedStatus22] = useState('Select');
  const handleDelete = (option) => {
    setSelected(selected.filter((item) => item !== option));
  };
  const organs = ['Lung', 'Liver', 'Kidney', 'Brain', 'Stomach'];
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
  const StatusOptions = ['Control', 'Okay', 'Poor'];

  const renderAdditionalFields = () => {
    return selected.map((option) => {
      switch (option) {
        case 'Diabetes':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Diabetes</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('Diabetes')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit1}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit1(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10}}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus1}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus1(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );
        case 'Hypertension':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Hypertension</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('Hypertension')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit2}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit2(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus2}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus2(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );
        case 'IHD':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>IHD</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('IHD')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit3}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit3(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus3}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus3(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );
        case 'Hypothyroidism':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Hypothyroidism</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('Hypothyroidism')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit4}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit4(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus4}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus4(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );
        case 'Allergic Rhinitis':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Allergic Rhinitis</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('Allergic Rhinitis')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit5}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit5(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus5}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus5(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );
        case 'Hyperuricemia':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Hyperuricemia</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('Hyperuricemia')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit6}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit6(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus6}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus6(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );
        case 'Asthma':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Asthma</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('Asthma')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit7}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit7(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10, color: Color.colorGray_200 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus7}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus7(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );
        case 'TB':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>TB</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('TB')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit8}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit8(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus8}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus8(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );
        case 'COPD':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>COPD</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('COPD')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit9}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit9(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus9}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus9(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );
        case 'ILD':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>ILD</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('ILD')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit10}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit10(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus10}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus10(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );
        case 'Bronchiectasis':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Bronchiectasis</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('Bronchiectasis')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit11}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit11(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus11}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus11(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );
        case 'OSA':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>OSA</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('OSA')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit12}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit12(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus12}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus12(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );
        case 'IBS':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>IBS</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('IBS')} v>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit13}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit13(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus13}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus13(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );
        case 'Inflammatory bowel diseases':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Inflammatory bowel diseases</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('Inflammatory bowel diseases')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit14}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit14(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus14}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus14(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );
        case 'Depression':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Depression</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('Depression')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit15}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit15(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus15}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus15(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );
        case 'Anxiety':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Anxiety</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('Anxiety')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit16}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit16(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus16}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus16(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );
        case 'Collagen vascular disease':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Collagen vascular disease</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('Collagen vascular disease')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit17}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit17(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus17}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus17(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );
        case 'Dyslipidemia':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Dyslipidemia</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('Dyslipidemia')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit18}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit18(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus18}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus18(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );
        case 'CLD':
          return (
            <View key={option} style={styles.problems}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>CLD</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('CLD')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit19}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit19(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus19}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus19(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );
        case 'Malignancy':
          return (
            <View key={option} style={styles.problems2}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Malignancy</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('Malignancy')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration3}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Select Organ :</Text>
                <View style={styles.dropdown23}>
                  <Picker
                    selectedValue={selectedOrgan}
                    onValueChange={(itemValue, itemIndex) => setSelectedOrgan(itemValue)}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {organs.map((organ, index) => (
                      <Picker.Item key={index} label={organ} value={organ} style={{color: Color.colorBlack}}/>
                    ))}
                    {/* <Picker.Item label="Others" value="Others" /> */}
                  </Picker>
                  {/* <View>
                    {selectedOrgan === "Others" && (
                      <TextInput
                        style={{ color: '#8E7D7D', fontSize: 15 }}
                        placeholder='Type Organ'
                        placeholderTextColor={'#8E7D7D'}
                        onChangeText={(text) => setCustomOrgan(text)}
                      />
                  
                    )}
                    </View> */}
                </View>
              </View>
              <View style={styles.duration4}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit20}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit20(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus20}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus20(itemValue)}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );

        case 'Others':
          return (
            <View key={option} style={styles.problems2}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>Others</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('Others')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration3}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Disease :</Text>
                <TouchableOpacity style={styles.dropdown24}>
                  <TextInput style={{ fontSize: 15, width: windowWidth * 0.6 }} placeholder='Enter Here' placeholderTextColor={'#8E7D7D'}></TextInput>
                </TouchableOpacity>
              </View>
              <View style={styles.duration4}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit21}
                    onValueChange={(itemValue, itemIndex) =>
                      setSelectedUnit21(itemValue)
                    }
                    style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus21}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus21(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
            </View>
          );
        case 'CKD':
          return (
            <View key={option} style={styles.problems2}>
              <View style={styles.problist}>
                <Text style={styles.probheader}>CKD</Text>
                {/* <TouchableOpacity onPress={() => handleDelete('CKD')}>
                  <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
                </TouchableOpacity> */}
              </View>
              <View style={styles.duration3}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Select Type :</Text>
                <View style={styles.dropdown25}>
                  <Picker
                    selectedValue={selectedType}
                    onValueChange={(itemValue, itemIndex) => setSelectedType(itemValue)}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    <Picker.Item label="Hematological" value="Hematological" style={{color: Color.colorBlack}}/>
                    {/* <Picker.Item label="Others" value="Others" /> */}
                  </Picker>
                  {/* {selectedType === "Others" && (
                      <TextInput
                        style={{ color: '#8E7D7D', fontSize: 15 }}
                        placeholder='Type Other Type'
                        placeholderTextColor={'#8E7D7D'}
                        onChangeText={(text) => setOtherType(text)}
                      />
                    )} */}
                </View>
              </View>
              <View style={styles.duration4}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                <View style={styles.dropdown20}>
                  <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} />
                </View>
                <View style={styles.dropdown21}>
                  <Picker
                    selectedValue={selectedUnit22}
                    onValueChange={(itemValue, itemIndex) => setSelectedUnit22(itemValue)}
                    style={{ width: '100%', paddingHorizontal: 10 }}>
                    <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
                    {Unit.map((unit) => (
                      <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
              </View>
              <View style={styles.duration2}>
                <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
                <View style={styles.dropdown22}>
                  <Picker
                    selectedValue={selectedStatus22}
                    style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedStatus22(itemValue)}>
                    <Picker.Item label="Select" value="" style={{color: Color.colorGray_200}}/>
                    {StatusOptions.map((status, index) => (
                      <Picker.Item key={index} label={status} value={status} style={{color: Color.colorBlack}}/>
                    ))}
                  </Picker>
                </View>
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
    // paddingLeft: 10,
    // paddingRight: 10,
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
    // paddingLeft: 7,
    // paddingRight: 10,
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
    // paddingLeft: 7,
    // paddingRight: 10,
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
    // paddingLeft: 7,
    // paddingRight: 10,
    marginLeft: windowWidth * 0.02,
  },
});
export default ExiDisForm;