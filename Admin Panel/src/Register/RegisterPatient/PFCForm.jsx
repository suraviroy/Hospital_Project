import React, { useState,useImperativeHandle,forwardRef,useEffect} from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const windowWidth = Dimensions.get('window').width;
import { Color } from '../../../GlobalStyles';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';
const defaultPFCData = {
  sob: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  cough: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  bleedingwithcough: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  chestpain: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  wheeze: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  phlagm: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  nasalcongestion: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  snoring: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  daytimesleepiness:{ duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  weakness: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  drowsiness: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  lethargy: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  lowmood: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  diarrhoea: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  uncontrolleddisease: [{ name: 'NA', duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' ,disease: 'NA'}],
  others: { disease: 'NA', duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
}
const PFCForm = forwardRef( (props,ref ) =>  {
  const [selectedUDTypes, setSelectedUDTypes] = useState({});
  const [selectedOtherDiseases, setSelectedOtherDiseases] = useState({});
    const [selectedStatuses, setSelectedStatuses] = useState({});
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState(defaultPFCData);

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
  const StatusOptions = [
    {value:'Control',key:'CO'}, 
    {value:'Okay',key:'OK'},
    {value:'Poor',key:'PO'},
  ];
  const handleStatusChange = (disease, itemValue) => {
    setSelectedStatuses(prevSelectedStatuses => ({
      ...prevSelectedStatuses,
      [disease.toLowerCase()]: itemValue
    }));
    setData(prevData => ({
      ...prevData,
      [disease.toLowerCase()]: {
        ...prevData[disease.toLowerCase()],
        statusOfDisease: itemValue
      }
    }));
  };
  const handleDurationwithStatusChange = (option, numericValue, unit) => {
    const formattedOption = option.replace(/\s+/g, '').toLowerCase();
    if (formattedOption === 'others') {
      setData(prevData => ({
          ...prevData,
          others: {
            disease: prevData.others.disease,
              duration: {
                  numericValue: numericValue,
                  unit: unit
              },
              statusOfDisease: prevData[formattedOption].statusOfDisease,
          }
      }));
 } 
   else {
      setData(prevData => ({
          ...prevData,
          [formattedOption]: { 
              ...prevData[formattedOption], 
              duration: {
                  numericValue: numericValue,
                  unit: unit
              },
              statusOfDisease: prevData[formattedOption].statusOfDisease,
          }
      }));
  }
}; 
  const handleOthersChange = (text) => {
    setData(prevData => ({
      ...prevData,
      others: {
        ...prevData.others,
        disease: text,
      }
    }));
  };
const handleUDChangeOthers = (index, text) => {
  setData(prevData => {
    const updatedUncontrolledDisease = [...prevData.uncontrolleddisease];
    updatedUncontrolledDisease[index].disease = text;
    return {
      ...prevData,
      uncontrolleddisease: updatedUncontrolledDisease
    };
  });
};
  const handleUDChange = (index, itemValue) => {
    setData(prevData => {
      const updatedUncontrolledDisease = [...prevData.uncontrolleddisease];
      const updatedDisease = {
        ...updatedUncontrolledDisease[index],
        name: itemValue,
        disease: 'NA'
      };
      updatedUncontrolledDisease[index] = updatedDisease;
      return {
        ...prevData,
        uncontrolleddisease: updatedUncontrolledDisease
      };
    });
  };
  const handleUDDurationwithStatusChange = (index, numericValue, unit) => {
    setData(prevData => {
      const updatedUncontrolledDisease = [...prevData.uncontrolleddisease];
      const updatedDisease = {
        ...updatedUncontrolledDisease[index],
        duration: {
          numericValue: numericValue,
          unit: unit
        }
      };
      if (updatedUncontrolledDisease[index].name === 'Others') {
        updatedDisease.disease = prevData.uncontrolleddisease[index].disease;
      }
      updatedUncontrolledDisease[index] = updatedDisease;
      return {
        ...prevData,
        uncontrolleddisease: updatedUncontrolledDisease
      };
    });
  };
  const handleUDStatusChange = (index, itemValue) => {
    setData(prevData => {
      const updatedUncontrolledDisease = [...prevData.uncontrolleddisease];
      const updatedDisease = {
        ...updatedUncontrolledDisease[index],
        statusOfDisease: itemValue
      };
      updatedUncontrolledDisease[index] = updatedDisease;
      return {
        ...prevData,
        uncontrolleddisease: updatedUncontrolledDisease
      };
    });
  };
  const getData = () => {
    const formattedData = {};
    Object.keys(data).forEach((key) => {
        const formattedKey = key
            .split(' ')
            .map(word => word.toLowerCase())
            .join('');
       
        const index = formattedKey.indexOf('/');
      
        if (index !== -1) {
            formattedKey = formattedKey.substring(0, index);
        }
        formattedData[formattedKey] = data[key];
    });
    return formattedData;
};
useImperativeHandle(ref, () => ({
    getData
}));
const renderAdditionalFields = () => {
  const uncontrolledDiseaseContainerHeight = windowWidth * 0.40; 
  const additionalFieldsHeight = data.uncontrolleddisease.length * (windowWidth * 0.60); 

  const containerHeight = uncontrolledDiseaseContainerHeight + additionalFieldsHeight;
  return selected.map((option) => {
    let formattedOption = option
      .split(' ')
      .map(word => word.toLowerCase())
      .join('');

   
    const index = formattedOption.indexOf('/');
    
    if (index !== -1) {
      formattedOption = formattedOption.substring(0, index);
    }
    const optionData = data[formattedOption] || { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' };
    switch (formattedOption) {
      case 'sob':
      case 'cough':
      case 'bleedingwithcough': 
      case 'chestpain':
      case 'wheeze':
      case 'phlagm':
      case 'nasalcongestion':
      case 'snoring':
      case 'daytimesleepiness':
      case 'weakness':
      case 'drowsiness':
      case 'lethargy':
      case 'lowmood':
      case 'diarrhoea':
   return (
    <View key={option} style={styles.problems}>
      <View style={styles.problist}>
        <Text style={styles.probheader}>{option}</Text>
      </View>
      <View style={styles.duration}>
        <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
        <View style={styles.dropdown20}>
          <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} onChangeText={(text) => handleDurationwithStatusChange(formattedOption, text,optionData.duration.unit)} />
        </View>
        <View style={styles.dropdown21}>
        <Picker
   selectedValue={optionData.duration.unit}
  onValueChange={(itemValue) =>  handleDurationwithStatusChange(formattedOption, optionData.duration.numericValue, itemValue)}
  style={{ width: '100%', paddingHorizontal: 10}}>
  <Picker.Item label="Unit" value="NA" style={{color: Color.colorGray_200}}/>
  {Unit.map((unit) => (
    <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{ color: Color.colorBlack }} />
  ))}
</Picker>
        </View>
      </View>
      <View style={styles.duration2}>
        <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
        <View style={styles.dropdown22}>
        <Picker
selectedValue={selectedStatuses[formattedOption] || 'NA'}
style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
onValueChange={(itemValue) => handleStatusChange(formattedOption, itemValue)}>
<Picker.Item label="Select" value="NA" style={{ color: Color.colorGray_200 }} />
{StatusOptions.map((statusOfDisease) => (
  <Picker.Item key={statusOfDisease.key} label={statusOfDisease.value} value={statusOfDisease.value} style={{ color: Color.colorBlack }}/>
))}
</Picker>
        </View>
      </View>
    </View>
  );
  case 'others':
  return (
    <View key={option} style={styles.problems2}>
      <View style={styles.problist}>
        <Text style={styles.probheader}>{option}</Text>
      </View>
      <View style={styles.duration3}>
        <Text style={{ fontWeight: '400', fontSize: 14 }}>Disease :</Text>
        <View style={styles.dropdown24}>
         <TextInput
style={{fontSize: 15, width: windowWidth * 0.6 }}
placeholder='Enter Disease'
placeholderTextColor={'#8E7D7D'}
onChangeText={(text) => handleOthersChange(text)}
/>
          </View>
        </View>
        <View style={styles.duration}>
        <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
        <View style={styles.dropdown20}>
          <TextInput style={{fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} onChangeText={(text) => handleDurationwithStatusChange(formattedOption,text,optionData.duration.unit)} />
        </View>
        <View style={styles.dropdown21}>
        <Picker
 selectedValue={optionData.duration.unit}
  onValueChange={(itemValue) => handleDurationwithStatusChange(formattedOption,optionData.duration.numericValue,itemValue)}
  style={{ width: '100%', paddingHorizontal: 10}}>
  <Picker.Item label="Unit" value="" style={{color: Color.colorGray_200}}/>
  {Unit.map((unit) => (
    <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{ color: Color.colorBlack }} />
  ))}
</Picker>
        </View>
      </View>
      <View style={styles.duration2}>
        <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
        <View style={styles.dropdown22}>
        <Picker
selectedValue={selectedStatuses[formattedOption.toLowerCase()] || 'NA'}
style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
onValueChange={(itemValue) => handleStatusChange(formattedOption, itemValue)}>
<Picker.Item label="Select" value="NA" style={{ color: Color.colorGray_200 }} />
{StatusOptions.map((statusOfDisease) => (
  <Picker.Item key={statusOfDisease.key} label={statusOfDisease.value} value={statusOfDisease.value} style={{ color: Color.colorBlack }}/>
))}
</Picker>
        </View>
      </View>
      </View>
    );
case 'uncontrolleddisease':
  return (
    <View key={option} style={[styles.problems4, { height: containerHeight }]}>
      <View style={styles.problist}>
        <Text style={styles.probheader}>{option}</Text>
      </View>
      {data.uncontrolleddisease.map((disease, index) => (
        <View key={index}>
          <View style={styles.duration3}>
            <Text style={{ fontWeight: '400', fontSize: 14 }}>Select Type :</Text>
            <View style={styles.dropdown25}>
              <Picker
                selectedValue={disease.name}
                onValueChange={(itemValue) => handleUDChange(index, itemValue)}
                style={{ width: '100%', height: 30, paddingHorizontal: 10 }}>
                <Picker.Item label="Select" value="NA" style={{ color: Color.colorGray_200 }} />
                <Picker.Item label="Diabetes" value="Diabetes" />
                <Picker.Item label="Hypertension" value="Hypertension" />
                <Picker.Item label="Hypothyroidism" value="Hypothyroidism" />
                <Picker.Item label="Others" value="Others" />
              </Picker>
            </View>
          </View>
          {disease.name === 'Others' && (
            <View style={styles.duration3}>
              <Text style={{ fontWeight: '400', fontSize: 14 }}>Enter Disease:</Text>
              <View style={styles.dropdown26}>
                <TextInput
                  style={{ fontSize: 15 }}
                  placeholder='Enter Disease'
                  placeholderTextColor={'#8E7D7D'}
                  onChangeText={(text) => handleUDChangeOthers(index, text)}
                />
              </View>
            </View>
          )}
          <View style={styles.duration}>
            <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
            <View style={styles.dropdown20}>
              <TextInput
                style={{ fontSize: 15 }}
                keyboardType='numeric'
                placeholder='Numeric Value'
                placeholderTextColor={'#8E7D7D'}
                onChangeText={(text) => handleUDDurationwithStatusChange(index, text, disease.duration.unit)}
              />
            </View>
            <View style={styles.dropdown21}>
              <Picker
                selectedValue={disease.duration.unit}
                onValueChange={(itemValue) => handleUDDurationwithStatusChange(index, disease.duration.numericValue, itemValue)}
                style={{ width: '100%', paddingHorizontal: 10 }}>
                <Picker.Item label="Unit" value="NA" style={{ color: Color.colorGray_200 }} />
                {Unit.map((unit) => (
                  <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{ color: Color.colorBlack }} />
                ))}
              </Picker>
            </View>
          </View>
          <View style={styles.duration2}>
            <Text style={{ fontWeight: '400', fontSize: 14 }}>Status of disease :</Text>
            <View style={styles.dropdown22}>
              <Picker
                selectedValue={disease.statusOfDisease}
                style={{ width: '100%', height: 30, paddingHorizontal: 10 }}
                onValueChange={(itemValue) => handleUDStatusChange(index, itemValue)}>
                <Picker.Item label="Select" value="NA" style={{ color: Color.colorGray_200 }} />
                {StatusOptions.map((statusOfDisease) => (
                  <Picker.Item key={statusOfDisease.key} label={statusOfDisease.value} value={statusOfDisease.value} style={{ color: Color.colorBlack }} />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.addmore} onPress={() => {
        const newUncontrolledDisease = {
          name: 'NA',
          duration: { numericValue: 0, unit: 'NA' },
          statusOfDisease: 'NA'
        };

        setData(prevData => ({
          ...prevData,
          uncontrolleddisease: [...prevData.uncontrolleddisease, newUncontrolledDisease]
        }));
      }}>
        <Text style={{ fontWeight: '700', fontSize: 15, color: '#2A9988', alignSelf: 'center' }}>Add More</Text>
      </TouchableOpacity>
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
      data = {[
        { value: "SOB", key: "SOB" },
        { value: "Cough", key: "COU" },
        { value: "Bleeding with cough", key: "BWC" },
        { value: "Chest pain/ chest congestion/ tightness of chest", key: "CPN" },
        { value: "Wheeze", key: "WHE" },
        { value: "Phlagm", key: "PHL" },
        { value: "Nasal congestion/ running", key: "NCR" },
        { value: "Snoring", key: "SNO" },
        { value: "Day time sleepiness", key: "DTS" },
        { value: "Weakness", key: "WKN" },
        { value: "Drowsiness", key: "DRO" },
        { value: "Lethargy/ low energy", key: "LLE" },
        { value: "Low mood", key: "LOM" },
        { value: "Diarrhoea", key: "DIO" },
        { value: "Uncontrolled disease", key: "UND" },
        { value: "Others", key: "OTR" }
      ]}
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
);
});

const styles = StyleSheet.create({
addmore: {
  width: windowWidth * 0.9,
  height: windowWidth * 0.13,
  backgroundColor: '#DBF4F1',
  borderWidth: 1.24,
  borderColor: '#2A9988',
  borderRadius: 5,
  justifyContent: 'center',
  alignSelf: 'center',
  marginTop: windowWidth * 0.05, 
},
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
  dropdown26: {
    width: windowWidth * 0.58,
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
  problems4: {
    width: windowWidth * 0.95,
    backgroundColor: '#e3e3e3',
    marginTop: windowWidth * 0.05,
    borderRadius: 10,
    alignSelf: 'center',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
  },
});
export default PFCForm;
