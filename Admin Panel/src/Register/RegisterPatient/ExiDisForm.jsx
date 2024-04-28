
import React, { useState,useImperativeHandle,forwardRef,useEffect } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
const windowWidth = Dimensions.get('window').width;
import { Color } from '../../../GlobalStyles';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { PickerIos, Picker } from '@react-native-picker/picker';

const defaultDeseaseData = {
  diabetes: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  hypertension: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  ihd: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  hypothyroidism: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  allergicrhinitis: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  hyperuricemia: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  asthama: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  tb: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  copd: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  ild: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  bronchiectasis: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  osa: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  ibs: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  inflammatoryboweldisease: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  depression: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  anxiety: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  collagenvasculardisease: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  malignancy: { organ: 'NA', duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  dyslipidemia: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  cld: { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  ckd: { typeofckd: 'NA', duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
  others: { disease: 'NA', duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' },
};
const ExiDisForm = forwardRef( (props,ref ) => {
  const [selectedOrgans, setSelectedOrgans] = useState({});
const [selectedCKDTypes, setSelectedCKDTypes] = useState({});
const [selectedOtherDiseases, setSelectedOtherDiseases] = useState({});
  const [selectedStatuses, setSelectedStatuses] = useState({});
  const [selected, setSelected] = useState([]);
  const [data, setData] = useState(defaultDeseaseData);
  const organs = [
    {value:'Lung', key:'LU'},
    {value:'Liver',key:'LI'},
    {value:'Kidney',key:'KI'},
    {value: 'Brain',key:'BR'},
    {value:'Stomach',key:'ST'},
  ];
  const Unit = [
    { value: 'Days', key: 'DY' },
    { value: 'Weeks', key: 'WK' },
    { value: 'Months', key: 'MT' },
    { value: 'Years', key: 'YR' },
];
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
  } else if (formattedOption === 'malignancy') {
    setData(prevData => ({
        ...prevData,
        malignancy: {
          organ: prevData.malignancy.organ,
            duration: {
                numericValue: numericValue,
                unit: unit
            },
            statusOfDisease: prevData[formattedOption].statusOfDisease,
        }
    }));
} else if (formattedOption === 'malignancy') {
  setData(prevData => ({
      ...prevData,
      malignancy: {
        ckd: prevData.ckd.typeofckd,
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

  const handleOrganChange = (disease, itemValue) => {
    setSelectedOrgans(prevSelectedOrgans => ({
      ...prevSelectedOrgans,
      [disease.toLowerCase()]: itemValue
    }));
    setData(prevData => ({
      ...prevData,
      malignancy: {
        ...prevData.malignancy,
        organ: itemValue,
      }
    }));
  };
  
  const handleCKDChange = (itemValue) => {
    setSelectedCKDTypes(prevSelectedCKDTypes => ({
      ...prevSelectedCKDTypes,
      ckd: itemValue
    }));
    setData(prevData => ({
      ...prevData,
      ckd: {
        ...prevData.ckd,
        typeofckd: itemValue,
      }
    }));
  };
  
  const handleOthersChange = (text) => {
    setSelectedOtherDiseases(prevSelectedOtherDiseases => ({
      ...prevSelectedOtherDiseases,
      others: text
    }));
    setData(prevData => ({
      ...prevData,
      others: {
        ...prevData.others,
        disease: text,
      }
    }));
  };
  const getData = () => {
    const formattedData = {};
    Object.keys(data).forEach((key) => {
      const formattedKey = key
        .split(' ')
        .map(word => word.toLowerCase())
        .join('');
      formattedData[formattedKey] = data[key];
    });
    return formattedData;
  };

useImperativeHandle(ref, () => ({
    getData
}));
const renderAdditionalFields = () => {
    return selected.map((option) => {
      const formattedOption = option.split(' ')
        .map(word => word.toLowerCase())
        .join('');
  
      const optionData = data[formattedOption] || { duration: { numericValue: 0, unit: 'NA' }, statusOfDisease: 'NA' };
      switch (formattedOption) {
        case 'diabetes':
        case 'hypertension':
        case 'ihd': 
        case 'hypothyroidism':
        case 'allergicrhinitis':
        case 'hyperuricemia':
        case 'asthama':
        case 'tb':
        case 'copd':
        case 'ild':
        case 'bronchiectasis':
        case 'osa':
        case 'ibs':
        case 'inflammatoryboweldisease':
        case 'depression':
        case 'anxiety':
        case 'collagenvasculardisease':
        case 'dyslipidemia':
        case 'cld':
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
  case 'malignancy':
      return (
      <View key={option} style={styles.problems2}>
        <View style={styles.problist}>
          <Text style={styles.probheader}>{option}</Text>
          {/* <TouchableOpacity onPress={() => handleDelete(option)}>
            <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
          </TouchableOpacity> */}
        </View>
        <View style={styles.duration3}>
          <Text style={{ fontWeight: '400', fontSize: 14 }}>Select Organ :</Text>
          <View style={styles.dropdown25}>
          <Picker
  selectedValue={selectedOrgans[formattedOption.toLowerCase()] || 'NA'}
  onValueChange={(itemValue) => handleOrganChange(formattedOption, itemValue )}
  style={{ width: '100%', height: 30, paddingHorizontal: 10 }}>
  <Picker.Item label="Select" value="NA" style={{color: Color.colorGray_200}}/>
  {organs.map((organ) => (
    <Picker.Item key={organ.key} label={organ.value} value={organ.value} style={{color: Color.colorBlack}}/>
  ))}
</Picker>
          </View>
        </View>
        <View style={styles.duration}>
          <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
          <View style={styles.dropdown20}>
          <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'} onChangeText={(text) => handleDurationwithStatusChange(formattedOption,text,optionData.duration.unit)} />
          </View>
          <View style={styles.dropdown21}>
          <Picker
     selectedValue={optionData.duration.unit}
    onValueChange={(itemValue) =>  handleDurationwithStatusChange(formattedOption, optionData.duration.numericValue, itemValue)}
    style={{ width: '100%', paddingHorizontal: 10}}>
    <Picker.Item label="Unit" value="NA" style = {{ color: Color.colorGray_200 }} />
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
    case 'others':
    return (
      <View key={option} style={styles.problems2}>
        <View style={styles.problist}>
          <Text style={styles.probheader}>{option}</Text>
          {/* <TouchableOpacity onPress={() => handleDelete(option)}>
            <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
          </TouchableOpacity> */}
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
      case 'ckd': 
      return (
        <View key={option} style={styles.problems2}>
          <View style={styles.problist}>
            <Text style={styles.probheader}>{option}</Text>
            {/* <TouchableOpacity onPress={() => handleDelete(option)}>
              <Image source={require("../../../assets/images/delete.png")} style={styles.delete} />
            </TouchableOpacity> */}
          </View>
          <View style={styles.duration3}>
            <Text style={{ fontWeight: '400', fontSize: 14 }}>Select Type :</Text>
            <View style={styles.dropdown25}>
            <Picker
  selectedValue={selectedCKDTypes[formattedOption.toLowerCase()] || 'NA'}
  onValueChange={(itemValue) => handleCKDChange(itemValue)}
  style={{ width: '100%', height: 30, paddingHorizontal: 10 }}>
  <Picker.Item label="Select" value="NA"style={{color: Color.colorGray_200}} />
  <Picker.Item label="Hematological" value="Hematological" />
</Picker>
            </View>
          </View>
          <View style={styles.duration}>
          <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
          <View style={styles.dropdown20}>
            <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}  onChangeText={(text) => handleDurationwithStatusChange(formattedOption,text,optionData.duration.unit)}  />
          </View>
          <View style={styles.dropdown21}>
          <Picker
   selectedValue={optionData.duration.unit}
    onValueChange={(itemValue) => handleDurationwithStatusChange(formattedOption,optionData.duration.numericValue,itemValue)}
    style={{ width: '100%', paddingHorizontal: 10,}}>
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
          { value: "Diabetes", key: "DI" },
          { value: "Hypertension", key: "HY" },
          { value: "IHD", key: "IHD" },
          { value: "Hypothyroidism", key: "HP"},
          { value: "Allergic Rhinitis", key: "AR" },
          { value: "Hyperuricemia", key: "HU" },
          { value: "Asthama", key: "AS" },
          { value: "TB", key: "TB" },
          { value: "COPD", key: "COPD" },
          { value: "ILD", key: "ILD" },
          { value: "Bronchiectasis", key: "BR" },
          { value: "OSA", key: "OSA" },
          { value: "IBS", key: "IBS" },
          { value: "Inflammatory bowel disease", key: "IBD" },
          { value: "Depression", key: "DEP" },
          { value: "Anxiety", key: "ANX" },
          { value: "Collagen vascular disease", key: "CVD" },
          { value: "Malignancy", key: "MAL" },
          { value: "Dyslipidemia", key: "DYS" },
          { value: "CLD", key: "CLD" },
          { value: "CKD", key: "CKD" },
          { value: "Others", key: "OTH" }
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
 
