import React, { useState, useImperativeHandle, forwardRef,useEffect } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Color } from '../../../GlobalStyles';
import { MultipleSelectList } from 'react-native-dropdown-select-list';


const windowWidth = Dimensions.get('window').width;
const defaultExposureData = {
    dust: { duration: { numericValue: 0, unit: 'NA' } },
    cottondust: { duration: { numericValue: 0, unit: 'NA' } },
    wooddust: { duration: { numericValue: 0, unit: 'NA' } },
    pigeon: { duration: { numericValue: 0, unit: 'NA' } },
    hay: { duration: { numericValue: 0, unit: 'NA' } },
    moulds: { duration: { numericValue: 0, unit: 'NA' } },
    pollen: { duration: { numericValue: 0, unit: 'NA' } },
    chemical: { duration: { numericValue: 0, unit: 'NA' } },
    stonedust: { duration: { numericValue: 0, unit: 'NA' } },
    others: { duration: { numericValue: 0, unit: 'NA' }, typeOfExposure: 'NA' },
};

const Exposure = forwardRef((props, ref) => {
    const [selected, setSelected] = useState([]);
    const [data, setData] = useState(defaultExposureData);
    const [typeOfExposure, setTypeOfExposure] = useState('');
    const Unit = [
        { value: 'Days', key: 'DY' },
        { value: 'Weeks', key: 'WK' },
        { value: 'Months', key: 'MT' },
        { value: 'Years', key: 'YR' },
    ];

    const handleTypeOfExposureChange = (text) => {
        setData(prevData => ({
            ...prevData,
            others: {
                ...prevData.others,
                typeOfExposure: text
            }
        }));
    };
    const handleDurationChange = (option, numericValue, unit) => {
        const formattedOption = option.replace(/\s+/g, '').toLowerCase(); 
        if (formattedOption === 'others') {
            setData(prevData => ({
                ...prevData,
                others: {
                    duration: {
                        numericValue: numericValue,
                        unit: unit
                    },
                    typeOfExposure: prevData.others.typeOfExposure
                }
            }));
        } else {
            setData(prevData => ({
                ...prevData,
                [formattedOption]: {
                    ...prevData[formattedOption], 
                    duration: {
                        numericValue: numericValue,
                        unit: unit
                    }
                }
            }));
        }
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
            const optionData = data[formattedOption.toLowerCase()] || { duration: { numericValue: 0, unit: 'NA' }, typeOfExposure: 'NA'}; 
            switch (formattedOption.toLowerCase()) {
                case 'dust':
                case 'cottondust':
                case 'wooddust':
                case 'pigeon':
                case 'hay':
                case 'moulds':
                case 'pollen':
                case 'chemical':
                case 'stonedust':
                    return (
                        
                        <View key={option} style={styles.problems5}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>{option}</Text>
                            </View>
                            <View style={styles.duration4}>
                                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                                <TouchableOpacity style={styles.dropdown20}>
                                    <TextInput
                                        style={{ fontSize: 15 }}
                                        keyboardType='numeric'
                                        placeholder='Numeric Value'
                                        placeholderTextColor={'#8E7D7D'}
                                        onChangeText={(text) => handleDurationChange(formattedOption, text, optionData.duration.unit)}
                                    />
                                </TouchableOpacity>
                                <View style={styles.dropdown21}>
                                    <Picker
                                        selectedValue={optionData.duration.unit}
                                        onValueChange={(itemValue) => handleDurationChange(formattedOption,optionData.duration.numericValue, itemValue)}
                                        style={{ width: '100%', paddingHorizontal: 10 }}>
                                        <Picker.Item label="Unit" value="NA" style={{ color: Color.colorGray_200 }} />
                                        {Unit.map((unit) => (
                                            <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{ color: Color.colorBlack }} />
                                        ))}
                                    </Picker>
                                </View>
                            </View>
                        </View>
                    );
                case 'others':
                    optionData.typeOfExposure = data.others.typeOfExposure;
                    return (
                        <View key={option} style={styles.problems}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>others</Text>
                            </View>
                            <TouchableOpacity style={styles.textbox}>
                                <TextInput
                                    style={{ fontSize: 15, width: windowWidth * 0.6 }}
                                    placeholder='Enter Here'
                                    placeholderTextColor={'#8E7D7D'}
                                    onChangeText={(text) => handleTypeOfExposureChange(text)}
                                />
                            </TouchableOpacity>
                            <View style={styles.duration4}>
                                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                                <TouchableOpacity style={styles.dropdown20}>
                                    <TextInput
                                        style={{ fontSize: 15 }}
                                        keyboardType='numeric'
                                        placeholder='Numeric Value'
                                        placeholderTextColor={'#8E7D7D'}
                                        onChangeText={(text) => handleDurationChange(formattedOption, text, optionData.duration.unit)}
                                    />
                                </TouchableOpacity>
                                <View style={styles.dropdown21}>
                                    <Picker
                                        selectedValue={optionData.duration.unit}
                                        onValueChange={(itemValue) => handleDurationChange(formattedOption, optionData.duration.numericValue, itemValue)}
                                        style={{ width: '100%', paddingHorizontal: 10 }}>
                                        <Picker.Item label="Unit" value="NA" style={{ color: Color.colorGray_200 }} />
                                        {Unit.map((unit) => (
                                            <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{ color: Color.colorBlack }} />
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
    };

    return (
        <View style={{ paddingHorizontal: 10 }}>
            <MultipleSelectList
                setSelected={(val) => setSelected(val)}
                data={[
                    { value: 'dust', key: 'DUS' },
                    { value: 'cotton dust', key: 'CTD' },
                    { value: 'wood dust', key: 'WOD' },
                    { value: 'pigeon', key: 'PIG' },
                    { value: 'hay', key: 'HAY' },
                    { value: 'moulds', key: 'MLD' },
                    { value: 'pollen', key: 'POL' },
                    { value: 'chemical', key: 'CHE' },
                    { value: 'stone dust', key: 'STD' },
                    { value: 'others', key: 'OTH' }
                ]}
                save="value"
                label="Selected"
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
    problems5: {
        width: windowWidth * 0.95,
        height: windowWidth * 0.3,
        backgroundColor: '#e3e3e3',
        marginTop: windowWidth * 0.05,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: windowWidth * 0.05,
        paddingLeft: 15,
        paddingRight: 15,
    },
    problist: {
        flexDirection: 'row',
        marginTop: windowWidth * 0.05,
        justifyContent: 'flex-start',
    },
    duration4: {
        flexDirection: 'row',
        marginTop: windowWidth * 0.05,
        alignItems: 'center'
    },
    textbox: {
        width: '100%',
        height: 60,
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#A99F9F',
        alignSelf: 'center',
        marginTop: windowWidth * 0.03,
        backgroundColor: '#F1F4F3',
        flexDirection: 'row',
        paddingLeft: 10,
        paddingRight: 10,
    },
    dropdown20: {
        width: windowWidth * 0.35,
        height: 34,
        borderRadius: 2,
        borderWidth: 0.5,
        borderColor: '#A99F9F',
        alignSelf: 'center',
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
        backgroundColor: '#F1F4F3',
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: windowWidth * 0.02,
    },
    problems: {
        width: windowWidth * 0.95,
        height: windowWidth * 0.48,
        backgroundColor: '#e3e3e3',
        marginTop: windowWidth * 0.05,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: windowWidth * 0.05,
        paddingLeft: 15,
        paddingRight: 15,
    },
});

export default Exposure;

