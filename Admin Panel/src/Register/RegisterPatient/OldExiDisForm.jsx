import React, { useState } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const windowWidth = Dimensions.get('window').width;
import { Color } from '../../../GlobalStyles';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { PickerIos, Picker } from '@react-native-picker/picker';

const ExiDisForm = ({  diseases, setDiseases  }) => {
  const [selected, setSelected] = useState([]);
  // const [diseases, setDiseases] = useState([]);
  const [selectedOrgan, setSelectedOrgan] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const organs = ['Lung', 'Liver', 'Kidney', 'Brain', 'Stomach'];
  const Unit = ['days', 'weeks', 'months', 'years'];
  const StatusOptions = ['Control', 'Okay', 'Poor'];
  const renderAdditionalFields = () => {
    return selected.map((option) => {
      switch (option) {
        case 'Diabetes':
          return renderCommonFields(option);
        case 'Hypertension':
          return renderCommonFields(option);
        case 'IHD':
          return renderCommonFields(option);
        case 'Hypothyroidism':
          return renderCommonFields(option);
        case 'Allergic Rhinitis':
          return renderCommonFields(option);
        case 'Asthma':
            return renderCommonFields(option);
        case 'TB':
              return renderCommonFields(option);
        case 'COPD':
            return renderCommonFields(option);
        case 'ILD':
              return renderCommonFields(option);
        case 'Bronchiectasis':
              return renderCommonFields(option);
        case 'OSA':
              return renderCommonFields(option);
        case 'IBS':
              return renderCommonFields(option);
        case 'Inflammatory bowel diseases':
              return renderCommonFields(option);
        case 'Depression':
              return renderCommonFields(option);
        case 'Anxiety':
              return renderCommonFields(option);
        case 'Collagen vascular disease':
              return renderCommonFields(option);       
        case 'Malignancy':
          return renderMalignancyFields(option);
        case 'Others':
          return renderOthersFields(option);
        case 'CKD':
          return renderCKDFields(option);
        default:
          return null;
      }
    });
  };

  const renderCommonFields = (option) => {
    return (
      <View key={option} style={styles.problems}>
        <View style={styles.problist}>
          <Text style={styles.probheader}>{option}</Text>
          <TouchableOpacity onPress={() => handleDelete(option)}>
            <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
          </TouchableOpacity>
        </View>
        <View style={styles.duration}>
          <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
          <View style={styles.dropdown20}>
            <TextInput style={{ color: '#8E7D7D', fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} onChangeText={(text) => handleNumericValueChange(option, text)} />
          </View>
          <View style={styles.dropdown21}>
          <Picker
    selectedValue={(diseases.find(disease => disease.name === option)?.duration || {}).unit || ''}
    onValueChange={(itemValue) => handleUnitChange(option, itemValue)}
    style={{ width: '100%', paddingHorizontal: 10, color: Color.colorGray_200 }}>
    <Picker.Item label="Unit" value="" />
    {Unit.map((unit, index) => (
      <Picker.Item key={index} label={unit} value={unit} />
    ))}
  </Picker>
          </View>
        </View>
        <View style={styles.duration2}>
          <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
          <View style={styles.dropdown22}>
            <Picker
              selectedValue={diseases.find(disease => disease.name === option)?.status || ''}
              style={{ width: 150, height: 30, paddingHorizontal: 10 }}
              onValueChange={(itemValue) => handleStatusChange(option, itemValue)}>
              <Picker.Item label="Select" value="" />
              {StatusOptions.map((status, index) => (
                <Picker.Item key={index} label={status} value={status} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    );
  };

  const renderMalignancyFields = (option) => {
    return (
      <View key={option} style={styles.problems2}>
        <View style={styles.problist}>
          <Text style={styles.probheader}>{option}</Text>
          <TouchableOpacity onPress={() => handleDelete(option)}>
            <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
          </TouchableOpacity>
        </View>
        <View style={styles.duration3}>
          <Text style={{ fontWeight: '400', fontSize: 14 }}>Select Organ :</Text>
          <View style={styles.dropdown25}>
            <Picker
              selectedValue={diseases.find(disease => disease.name === option)?.organ || ''}
              onValueChange={(itemValue) => handleOrganChange(option, itemValue)}
              style={{ width: 200, height: 30, paddingHorizontal: 10 }}>
              <Picker.Item label="Select" value="" />
              {organs.map((organ, index) => (
                <Picker.Item key={index} label={organ} value={organ} />
              ))}
            </Picker>
          </View>
        </View>
        <View style={styles.duration}>
          <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
          <View style={styles.dropdown20}>
            <TextInput style={{ color: '#8E7D7D', fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} onChangeText={(text) => handleNumericValueChange(option, text)} />
          </View>
          <View style={styles.dropdown21}>
          <Picker
    selectedValue={(diseases.find(disease => disease.name === option)?.duration || {}).unit || ''}
    onValueChange={(itemValue) => handleUnitChange(option, itemValue)}
    style={{ width: '100%', paddingHorizontal: 10, color: Color.colorGray_200 }}>
    <Picker.Item label="Unit" value="" />
    {Unit.map((unit, index) => (
      <Picker.Item key={index} label={unit} value={unit} />
    ))}
  </Picker>
          </View>
        </View>
        <View style={styles.duration2}>
          <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
          <View style={styles.dropdown22}>
            <Picker
              selectedValue={diseases.find(disease => disease.name === option)?.status || ''}
              style={{ width: 150, height: 30, paddingHorizontal: 10 }}
              onValueChange={(itemValue) => handleStatusChange(option, itemValue)}>
              <Picker.Item label="Select" value="" />
              {StatusOptions.map((status, index) => (
                <Picker.Item key={index} label={status} value={status} />
              ))}
            </Picker>
          </View>
        </View>
      </View>
    );
  };

  const renderOthersFields = (option) => {
    return (
      <View key={option} style={styles.problems2}>
        <View style={styles.problist}>
          <Text style={styles.probheader}>{option}</Text>
          <TouchableOpacity onPress={() => handleDelete(option)}>
            <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
          </TouchableOpacity>
        </View>
        <View style={styles.duration3}>
          <Text style={{ fontWeight: '400', fontSize: 14 }}>Disease :</Text>
          <View style={styles.dropdown24}>
            <TextInput
              style={{ color: '#8E7D7D', fontSize: 15, width: windowWidth * 0.6 }}
              placeholder='Enter Disease'
              placeholderTextColor={'#8E7D7D'}
              onChangeText={(text) => handleDiseaseChange(option, text)}
              />
            </View>
          </View>
          <View style={styles.duration}>
          <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
          <View style={styles.dropdown20}>
            <TextInput style={{ color: '#8E7D7D', fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} onChangeText={(text) => handleNumericValueChange(option, text)} />
          </View>
          <View style={styles.dropdown21}>
          <Picker
    selectedValue={(diseases.find(disease => disease.name === option)?.duration || {}).unit || ''}
    onValueChange={(itemValue) => handleUnitChange(option, itemValue)}
    style={{ width: '100%', paddingHorizontal: 10, color: Color.colorGray_200 }}>
    <Picker.Item label="Unit" value="" />
    {Unit.map((unit, index) => (
      <Picker.Item key={index} label={unit} value={unit} />
    ))}
  </Picker>
          </View>
        </View>
        <View style={styles.duration2}>
          <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
          <View style={styles.dropdown22}>
            <Picker
              selectedValue={diseases.find(disease => disease.name === option)?.status || ''}
              style={{ width: 150, height: 30, paddingHorizontal: 10 }}
              onValueChange={(itemValue) => handleStatusChange(option, itemValue)}>
              <Picker.Item label="Select" value="" />
              {StatusOptions.map((status, index) => (
                <Picker.Item key={index} label={status} value={status} />
              ))}
            </Picker>
          </View>
        </View>
        </View>
      );
    };
  
    const renderCKDFields = (option) => {
      return (
        <View key={option} style={styles.problems2}>
          <View style={styles.problist}>
            <Text style={styles.probheader}>{option}</Text>
            <TouchableOpacity onPress={() => handleDelete(option)}>
              <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
            </TouchableOpacity>
          </View>
          <View style={styles.duration3}>
            <Text style={{ fontWeight: '400', fontSize: 14 }}>Select Type :</Text>
            <View style={styles.dropdown25}>
              <Picker
                selectedValue={diseases.find(disease => disease.name === option)?.type || ''}
                onValueChange={(itemValue) => handleTypeChange(option, itemValue)}
                style={{ width: 200, height: 30, paddingHorizontal: 10 }}>
                <Picker.Item label="Select" value="" />
                <Picker.Item label="Hematological" value="Hematological" />
                {/* Add more CKD types here if needed */}
              </Picker>
            </View>
          </View>
          <View style={styles.duration}>
          <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
          <View style={styles.dropdown20}>
            <TextInput style={{ color: '#8E7D7D', fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} onChangeText={(text) => handleNumericValueChange(option, text)} />
          </View>
          <View style={styles.dropdown21}>
          <Picker
    selectedValue={(diseases.find(disease => disease.name === option)?.duration || {}).unit || ''}
    onValueChange={(itemValue) => handleUnitChange(option, itemValue)}
    style={{ width: '100%', paddingHorizontal: 10, color: Color.colorGray_200 }}>
    <Picker.Item label="Unit" value="" />
    {Unit.map((unit, index) => (
      <Picker.Item key={index} label={unit} value={unit} />
    ))}
  </Picker>
          </View>
        </View>
        <View style={styles.duration2}>
          <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
          <View style={styles.dropdown22}>
            <Picker
              selectedValue={diseases.find(disease => disease.name === option)?.status || ''}
              style={{ width: 150, height: 30, paddingHorizontal: 10 }}
              onValueChange={(itemValue) => handleStatusChange(option, itemValue)}>
              <Picker.Item label="Select" value="" />
              {StatusOptions.map((status, index) => (
                <Picker.Item key={index} label={status} value={status} />
              ))}
            </Picker>
          </View>
        </View>
        </View>
      );
    };

    const handleNumericValueChange = (disease, value) => {
  setDiseases(prevDiseases => {
    return prevDiseases.map(item => {
      if (item.name === disease) {
        return { ...item, duration: { ...item.duration, numericValue: value } };
      }
      return item;
    });
  });
};
    
    
const handleUnitChange = (disease, unit) => {
  setDiseases(prevDiseases => {
    const updatedDiseases = prevDiseases.map(item => {
      if (item.name === disease) {
        return { ...item, duration: { ...item.duration, unit: unit } };
      }
      return item;
    });
    return updatedDiseases;
  });
};
const handleStatusChange = (disease, status) => {
setDiseases(prevDiseases => {
const updatedDiseases = [...prevDiseases];
const index = updatedDiseases.findIndex(item => item.name === disease);
if (index !== -1) {
updatedDiseases[index] = { ...updatedDiseases[index], status };
} else {
updatedDiseases.push({ name: disease, status });
}
return updatedDiseases;
});
};

const handleOrganChange = (disease, organ) => {
setDiseases(prevDiseases => {
const updatedDiseases = [...prevDiseases];
const index = updatedDiseases.findIndex(item => item.name === disease);
if (index !== -1) {
updatedDiseases[index] = { ...updatedDiseases[index], organ };
} else {
updatedDiseases.push({ name: disease, organ });
}
return updatedDiseases;
});
};

const handleTypeChange = (disease, type) => {
setDiseases(prevDiseases => {
const updatedDiseases = [...prevDiseases];
const index = updatedDiseases.findIndex(item => item.name === disease);
if (index !== -1) {
updatedDiseases[index] = { ...updatedDiseases[index], type };
} else {
updatedDiseases.push({ name: disease, type });
}
return updatedDiseases;
});
};

const handleDiseaseChange = (disease, diseaseName) => {
setDiseases(prevDiseases => {
const updatedDiseases = [...prevDiseases];
const index = updatedDiseases.findIndex(item => item.name === disease);
if (index !== -1) {
updatedDiseases[index] = { ...updatedDiseases[index], disease: diseaseName };
} else {
updatedDiseases.push({ name: disease, disease: diseaseName });
}
return updatedDiseases;
});
};

const handleDelete = (option) => {
setSelected(prevSelected => prevSelected.filter(item => item !== option));
setDiseases(prevDiseases => prevDiseases.filter(disease => disease.name !== option));
};


  return (
    <View style={{ paddingHorizontal: 10 }}>
      <MultipleSelectList
        setSelected={(val) => setSelected(val)}
        data={['Diabetes', 'Malignancy', 'Others', 'CKD']}
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
      {/* <TouchableOpacity onPress={handleSave} style={{ marginTop: 20, backgroundColor: 'blue', padding: 10, borderRadius: 5 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Save</Text>
      </TouchableOpacity> */}
    </View>
  );
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
      width: windowWidth * 0.33,
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

