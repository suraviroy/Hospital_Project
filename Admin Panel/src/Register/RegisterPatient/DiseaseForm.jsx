import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Button, SafeAreaView, TextInput, TouchableOpacity, Image, Dimensions, ScrollView, FlatList } from 'react-native';
const windowWidth = Dimensions.get('window').width;
// import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { FontFamily, Color, Border, FontSize } from "../../../GlobalStyles";
import PastHosForm from './PastHosForm';
import ExiDisForm from './ExiDisForm';
import PFCForm from './PFCForm';
import SOSForm from './SOSForm';
import Exposure from './Exposure';
import { PickerIos, Picker } from '@react-native-picker/picker';
import { backendURL } from "../../backendapi";


const DiseaseForm = () => {
    const [diseases, setDiseases] = useState([]);

    const [selectedUnit1, setSelectedUnit1] = useState('Unit');
    const [selectedOption1, setSelectedOption1] = useState('Select');
    const [selectedOption2, setSelectedOption2] = useState('Select');
    const [selectedOption3, setSelectedOption3] = useState('Select');
    const [selectedOption4, setSelectedOption4] = useState('Select');
    const [selectedOption5, setSelectedOption5] = useState('Select');
    const [selectedOption6, setSelectedOption6] = useState('Select');
    const [selectedOption7, setSelectedOption7] = useState('Select');
    const [selectedOption8, setSelectedOption8] = useState('Select');
    const [selectedOption9, setSelectedOption9] = useState('Select');

    const [isClicked1, setIsClicked1] = useState(false);
    const [isClicked2, setIsClicked2] = useState(false);
    const [isClicked3, setIsClicked3] = useState(false);
    const [isClicked4, setIsClicked4] = useState(false);
    const [isClicked5, setIsClicked5] = useState(false);
    const [isClicked6, setIsClicked6] = useState(false);
    const [isClicked7, setIsClicked7] = useState(false);
    const [isClicked8, setIsClicked8] = useState(false);
    const [isClicked9, setIsClicked9] = useState(false);
    const [isClicked10, setIsClicked10] = useState(false);
    const [isClicked11, setIsClicked11] = useState(false);
    const [isClicked12, setIsClicked12] = useState(false);
    const [isClicked13, setIsClicked13] = useState(false);
    const [isClicked14, setIsClicked14] = useState(false);
    const [isClicked15, setIsClicked15] = useState(false);
    const [isClicked16, setIsClicked16] = useState(false);
    const [isClicked17, setIsClicked17] = useState(false);
    const [coordinators, setCoordinators] = useState([]);
    const [isClicked18, setIsClicked18] = useState(false);
    const [selectedCoordinator, setSelectedCoordinator] = useState('Select');
    const [selectedYear, setSelectedYear] = useState('');

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
    const handleSave = () => {

        const formattedData = {
            existingDeseases: {}
        };

        diseases.forEach(disease => {
            const {
                name,
                duration,
                organ,
                typeofckd,
                disease: diseaseName,
                status
            } = disease;
            const lowercaseName = name.toLowerCase();


            if (!formattedData.existingDeseases[lowercaseName]) {
                formattedData.existingDeseases[lowercaseName] = {};
            }
            switch (name) {
                case 'Malignancy':
                    formattedData.existingDeseases[lowercaseName].organ = organ;
                    break;
                case 'Others':
                    formattedData.existingDeseases[lowercaseName].disease = diseaseName;
                    break;
                case 'CKD':
                    formattedData.existingDeseases[lowercaseName].typeofckd = typeofckd;
                    break;
                default:
                    break;
            }
            formattedData.existingDeseases[lowercaseName].duration = duration;
            formattedData.existingDeseases[lowercaseName].statusOfDisease = status;
        });

        console.log("Data to be sent to backend:", JSON.stringify(formattedData));


    };


    useEffect(() => {
        fetchAdminNames();
    }, []);

    const fetchAdminNames = async () => {
        try {
            const response = await fetch(`${backendURL}/adminListRouter/adminNames`);
            if (!response.ok) {
                throw new Error('Failed to fetch coordinators');
            }
            const adminNames = await response.json();
            setCoordinators(adminNames);
        } catch (error) {
            console.error('Error fetching coordinators:', error);
        }
    };

    const [data, setData] = useState([{ year: '', days: '', reason: '' }]);
    const [data2, setData2] = useState('');

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.disform}>
                <View style={styles.disheader}>
                    <Text style={styles.texthead}>Existing Disease</Text>
                </View>
                {/* <ExiDisForm /> */}
                <ExiDisForm diseases={diseases} setDiseases={setDiseases} />
                <View style={styles.disheader}>
                    <Text style={styles.texthead}>Problem For Consultation</Text>
                </View>
                <PFCForm />
                <View style={styles.disheader}>
                    <Text style={styles.texthead}>Important History</Text>
                </View>
                <View style={styles.history}>
                    <View style={styles.hislist}>
                        <Text style={styles.textlist}>Allergy :</Text>
                    </View>
                    <TouchableOpacity style={styles.dropdown14} onPress={() => {
                        setIsClicked3(!isClicked3);
                    }}>
                        <Text style={{ color: '#8E7D7D', fontSize: 15, width: '50%' }}>{selectedOption1}</Text>
                        {isClicked3 ? (<Icon name="angle-up" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.08} />) : (<Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.08} />)}
                    </TouchableOpacity>
                    
                </View>
                {isClicked3 ? (
                    <View style={styles.options}>
                        <View style={styles.option}>
                            <TouchableOpacity style={{ width: '180%' }} onPress={() => {
                                setSelectedOption1(("Yes"));
                                setIsClicked3(false);
                                setIsClicked9(!isClicked9);
                                setIsClicked9(true);
                            }}>
                                <Text style={{ fontSize: 15 }}>Yes</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={{ width: '180%'}} onPress={() => {
                                setSelectedOption1(("No"));
                                setIsClicked3(false);
                                setIsClicked9(false);
                            }}>
                                <Text style={{ fontSize: 15, marginTop: windowWidth * 0.02 }}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null}
                {isClicked9 ? (
                    <View style={styles.problems}>
                        <View style={styles.problist}>
                            <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Type of Allergy :</Text>
                            {/* <TouchableOpacity>
                                <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
                            </TouchableOpacity> */}
                        </View>
                        <TouchableOpacity style={styles.textbox}>
                            <TextInput style={{ fontSize: 15, width: windowWidth * 0.8 }} placeholder='Enter Here' placeholderTextColor={'#8E7D7D'}></TextInput>
                        </TouchableOpacity>
                        <View style={styles.duration4}>
                            <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                            <TouchableOpacity style={styles.dropdown20}>
                                <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                            </TouchableOpacity>
                            <View style={styles.dropdown21}>
                                <Picker
                                    selectedValue={selectedUnit1}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSelectedUnit1(itemValue)
                                    }
                                    style={{ width: '100%', paddingHorizontal: 10 }}>
                                    <Picker.Item label="Unit" value="" style={{ color: Color.colorGray_200 }} />
                                    {Unit.map((unit) => (
                                        <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{ color: Color.colorBlack }} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    </View>
                ) : null}
                <View style={styles.history}>
                    <View style={styles.hislist}>
                        <Text style={styles.textlist}>Drug Reaction :</Text>
                    </View>
                    <TouchableOpacity style={styles.dropdown14} onPress={() => {
                        setIsClicked4(!isClicked4);
                    }}>
                        <Text style={{ color: '#8E7D7D', fontSize: 15, width: '50%' }}>{selectedOption2}</Text>
                        {isClicked4 ? (<Icon name="angle-up" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.08} />) : (<Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.08} />)}
                    </TouchableOpacity>
                </View>
                {isClicked4 ? (
                    <View style={styles.options}>
                        <View style={styles.option}>
                            <TouchableOpacity style={{ width: '180%' }} onPress={() => {
                                setSelectedOption2(("Yes"));
                                setIsClicked4(false);
                                setIsClicked10(!isClicked10);
                                setIsClicked10(true);
                            }}>
                                <Text style={{ fontSize: 15 }}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '180%' }} onPress={() => {
                                setSelectedOption2(("No"));
                                setIsClicked4(false);
                                setIsClicked10(false);
                            }}>
                                <Text style={{ fontSize: 15, marginTop: windowWidth * 0.02 }}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null}
                {isClicked10 ? (
                    <View style={styles.problems3}>
                        <View style={styles.problist}>
                            <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>What type of drugs?</Text>
                            {/* <TouchableOpacity>
                                <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
                            </TouchableOpacity> */}
                        </View>
                        <TouchableOpacity style={styles.textbox}>
                            <TextInput style={{ fontSize: 15, width: windowWidth * 0.8 }} placeholder='Enter Here' placeholderTextColor={'#8E7D7D'}></TextInput>
                        </TouchableOpacity>
                        <Text style={{ fontWeight: '700', fontSize: 16, width: '50%', marginTop: windowWidth * 0.02 }}>What type of reaction?</Text>
                        <TouchableOpacity style={styles.textbox}>
                            <TextInput style={{ fontSize: 15, width: windowWidth * 0.8 }} placeholder='Enter Here' placeholderTextColor={'#8E7D7D'}></TextInput>
                        </TouchableOpacity>
                    </View>
                ) : null}
                <View style={styles.history}>
                    <View style={styles.hislist}>
                        <Text style={styles.textlist}>Past Surgery :</Text>
                    </View>
                    <TouchableOpacity style={styles.dropdown14} onPress={() => {
                        setIsClicked5(!isClicked5);
                    }}>
                        <Text style={{ color: '#8E7D7D', fontSize: 15, width: '50%' }}>{selectedOption3}</Text>
                        {isClicked5 ? (<Icon name="angle-up" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.08} />) : (<Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.08} />)}
                    </TouchableOpacity>
                </View>
                {isClicked5 ? (
                    <View style={styles.options}>
                        <View style={styles.option}>
                            <TouchableOpacity style={{ width: '180%' }} onPress={() => {
                                setSelectedOption3(("Yes"));
                                setIsClicked5(false);
                                setIsClicked11(!isClicked11);
                                setIsClicked11(true);
                            }}>
                                <Text style={{ fontSize: 15 }}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '180%' }} onPress={() => {
                                setSelectedOption3(("No"));
                                setIsClicked5(false);
                                setIsClicked11(false);
                            }}>
                                <Text style={{ fontSize: 15, marginTop: windowWidth * 0.02 }}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null}
                {isClicked11 ? (
                    <View style={styles.problems}>
                        <View style={styles.problist}>
                            <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Type of Surgery :</Text>
                            {/* <TouchableOpacity>
                                <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
                            </TouchableOpacity> */}
                        </View>
                        <TouchableOpacity style={styles.textbox}>
                            <TextInput style={{ fontSize: 15, width: windowWidth * 0.8 }} placeholder='Enter Here' placeholderTextColor={'#8E7D7D'}></TextInput>
                        </TouchableOpacity>
                        <View style={styles.duration4}>
                            <Text style={{ fontWeight: '400', fontSize: 14 }}>Year of Surgery :</Text>
                            <View style={styles.dropdown22}>
                                <Picker
                                    selectedValue={selectedYear}
                                    style={{ height: 50, width: '100%', paddingHorizontal: 10 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                        setSelectedYear(itemValue)
                                    }
                                >
                                    <Picker.Item label="Select" value="" style={{ color: Color.colorGray_200 }} />
                                    {Array.from({ length: new Date().getFullYear() - 1980 + 1 }, (_, i) => 1980 + i).map((year) => (
                                        <Picker.Item key={year} label={year.toString()} value={year} style={{ color: Color.colorBlack }} />
                                    ))}
                                </Picker>
                            </View>
                        </View>
                    </View>
                ) : null}
                <View style={styles.history}>
                    <View style={styles.hislist}>
                        <Text style={styles.textlist}>Past Diseases :</Text>
                    </View>
                    <TouchableOpacity style={styles.dropdown14} onPress={() => {
                        setIsClicked6(!isClicked6);
                    }}>
                        <Text style={{ color: '#8E7D7D', fontSize: 15, width: '50%' }}>{selectedOption4}</Text>
                        {isClicked6 ? (<Icon name="angle-up" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.08} />) : (<Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.08} />)}
                    </TouchableOpacity>
                </View>
                {isClicked6 ? (
                    <View style={styles.options}>
                        <View style={styles.option}>
                            <TouchableOpacity style={{ width: '180%' }} onPress={() => {
                                setSelectedOption4(("Yes"));
                                setIsClicked6(false);
                                setIsClicked12(!isClicked12);
                                setIsClicked12(true);
                            }}>
                                <Text style={{ fontSize: 15 }}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '180%' }} onPress={() => {
                                setSelectedOption4(("No"));
                                setIsClicked6(false);
                                setIsClicked12(false);
                            }}>
                                <Text style={{ fontSize: 15, marginTop: windowWidth * 0.02 }}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null}
                {isClicked12 ? (
                    <View style={styles.problems4}>
                        <View style={styles.problist}>
                            <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Type of Disease :</Text>
                            {/* <TouchableOpacity>
                                <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
                            </TouchableOpacity> */}
                        </View>
                        <TouchableOpacity style={styles.textbox}>
                            <TextInput style={{ fontSize: 15, width: windowWidth * 0.8 }} placeholder='Enter Here' placeholderTextColor={'#8E7D7D'}></TextInput>
                        </TouchableOpacity>
                    </View>
                ) : null}
                <View style={styles.history}>
                    <View style={styles.hislist}>
                        <Text style={styles.textlist}>Family Histroy :</Text>
                    </View>
                    <TouchableOpacity style={styles.dropdown14} onPress={() => {
                        setIsClicked7(!isClicked7);
                    }}>
                        <Text style={{ color: '#8E7D7D', fontSize: 15, width: '50%' }}>{selectedOption5}</Text>
                        {isClicked7 ? (<Icon name="angle-up" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.08} />) : (<Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.08} />)}
                    </TouchableOpacity>
                </View>
                {isClicked7 ? (
                    <View style={styles.options}>
                        <View style={styles.option}>
                            <TouchableOpacity style={{ width: '180%' }} onPress={() => {
                                setSelectedOption5(("Yes"));
                                setIsClicked7(false);
                                setIsClicked13(!isClicked13);
                                setIsClicked13(true);
                            }}>
                                <Text style={{ fontSize: 15 }}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '180%' }} onPress={() => {
                                setSelectedOption5(("No"));
                                setIsClicked7(false);
                                setIsClicked13(false);
                            }}>
                                <Text style={{ fontSize: 15, marginTop: windowWidth * 0.02 }}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null}
                {isClicked13 ? (
                    <View style={styles.problems4}>
                        <View style={styles.problist}>
                            <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Type here :</Text>
                            {/* <TouchableOpacity>
                                <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
                            </TouchableOpacity> */}
                        </View>
                        <TouchableOpacity style={styles.textbox}>
                            <TextInput style={{ fontSize: 15, width: windowWidth * 0.8 }} placeholder='Enter Here' placeholderTextColor={'#8E7D7D'}></TextInput>
                        </TouchableOpacity>
                    </View>
                ) : null}
                <View style={styles.history}>
                    <View style={styles.hislist}>
                        <Text style={styles.textlist}>Occupation :</Text>
                    </View>
                    <TouchableOpacity style={styles.dropdown15}>
                        <TextInput style={{ fontSize: 15, width: windowWidth * 0.45 }} placeholder='Enter here' placeholderTextColor={'#8E7D7D'}></TextInput>
                    </TouchableOpacity>
                </View>
                <View style={styles.history}>
                    <View style={styles.hislist}>
                        <Text style={styles.textlist}>Exposure :</Text>
                    </View>
                    <TouchableOpacity style={styles.dropdown14} onPress={() => {
                        setIsClicked8(!isClicked8);
                    }}>
                        <Text style={{ color: '#8E7D7D', fontSize: 15, width: '50%' }}>{selectedOption6}</Text>
                        {isClicked8 ? (<Icon name="angle-up" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.08} />) : (<Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.08} />)}
                    </TouchableOpacity>
                </View>
                {isClicked8 ? (
                    <View style={styles.options}>
                        <View style={styles.option}>
                            <TouchableOpacity style={{ width: '180%' }} onPress={() => {
                                setSelectedOption6(("Yes"));
                                setIsClicked8(false);
                                setIsClicked14(!isClicked14);
                                setIsClicked14(true);
                            }}>
                                <Text style={{ fontSize: 15 }}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '180%' }} onPress={() => {
                                setSelectedOption6(("No"));
                                setIsClicked8(false);
                                setIsClicked14(false);
                            }}>
                                <Text style={{ fontSize: 15, marginTop: windowWidth * 0.02 }}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null}
                {isClicked14 ? (
                    <Exposure />
                ) : null}
                <View style={styles.disheader}>
                    <Text style={styles.texthead}>Past Hospitalization</Text>
                </View>
                <TouchableOpacity style={styles.dropdown13} onPress={() => {
                    setIsClicked15(!isClicked15);
                }}>
                    <Text style={{ color: '#8E7D7D', fontSize: 15, width: windowWidth * 0.73 }}>{selectedOption7}</Text>
                    {isClicked15 ? (<Icon name="angle-up" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.1} />) : (<Icon name="angle-down" size={15} color={Color.colorGray_100} marginLeft={windowWidth * 0.1} />)}
                </TouchableOpacity>
                {isClicked15 ? (
                    <View style={styles.options2}>
                        <View style={styles.option}>
                            <TouchableOpacity style={{ width: '180%' }} onPress={() => {
                                setSelectedOption7(("Yes"));
                                setIsClicked15(false);
                                setIsClicked16(!isClicked16);
                                setIsClicked16(true);
                            }}>
                                <Text style={{ fontSize: 15 }}>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '180%' }} onPress={() => {
                                setSelectedOption7(("No"));
                                setIsClicked15(false);
                                setIsClicked16(false);
                            }}>
                                <Text style={{ fontSize: 15, marginTop: windowWidth * 0.02 }}>No</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null}
                {isClicked16 ? (
                    <View>
                        {data.map((item, index) => (
                            <PastHosForm
                                key={index}
                                onDataChange={(year, days, reason) => {
                                    let tempData = [...data];
                                    tempData[index] = { year, days, reason };
                                    setData(tempData);
                                }}
                            />
                        ))}
                        <TouchableOpacity style={styles.addmore} onPress={() => {
                            setData([...data, { year: '', days: '', reason: '' }]);
                        }}>
                            <Text style={{ fontWeight: '700', fontSize: 15, color: '#2A9988', alignSelf: 'center' }}>Add More</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}
                <View style={styles.disheader}>
                    <Text style={styles.texthead}>Status Of Sickness</Text>
                </View>
                <SOSForm />
                {isClicked17 ? (
                    <View style={styles.options3}>
                        <View style={styles.option}>
                            <TouchableOpacity style={{ width: '180%' }} onPress={() => {
                                setSelectedOption8(("Somewhat sick"));
                                setIsClicked17(false);
                            }}>
                                <Text style={{ fontSize: 15 }}>Somewhat sick</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '180%' }} onPress={() => {
                                setSelectedOption8(("Sick"));
                                setIsClicked17(false);
                            }}>
                                <Text style={{ fontSize: 15, marginTop: windowWidth * 0.02 }}>Sick</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '180%' }} onPress={() => {
                                setSelectedOption8(("Quite sick"));
                                setIsClicked17(false);
                            }}>
                                <Text style={{ fontSize: 15, marginTop: windowWidth * 0.02 }}>Quite sick</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '180%' }} onPress={() => {
                                setSelectedOption8(("Very sick"));
                                setIsClicked17(false);
                            }}>
                                <Text style={{ fontSize: 15, marginTop: windowWidth * 0.02 }}>Very sick</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{ width: '180%' }} onPress={() => {
                                setSelectedOption8(("Morbus"));
                                setIsClicked17(false);
                            }}>
                                <Text style={{ fontSize: 15, marginTop: windowWidth * 0.02 }}>Morbus</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : null}
                <View style={styles.disheader}>
                    <Text style={styles.texthead}>Enter CAT Score</Text>
                </View>
                <TouchableOpacity style={styles.dropdown13}>
                    <TextInput
                        style={{ fontSize: 15, width: windowWidth * 0.9 }}
                        keyboardType='numeric'
                        placeholder='Enter here'
                        placeholderTextColor={'#8E7D7D'}>
                    </TextInput>
                </TouchableOpacity>
                <View style={styles.disheader}>
                    <Text style={styles.texthead}>Choose Coordinator</Text>
                </View>
                <View style={styles.dropdown19}>
                        <Picker
                            selectedValue={selectedCoordinator}
                            style={{ height: 50, width: '100%', paddingHorizontal: 10 }}
                            onValueChange={(itemValue) => setSelectedCoordinator(itemValue)}>
                            <Picker.Item label="Select" value="" style={{color:Color.colorGray_200}}/>
                            {coordinators.map((coordinator, index) => (
                                <Picker.Item key={index} label={coordinator} value={coordinator} style={{color:Color.colorBlack}}/>
                            ))}
                        </Picker>
                    </View>
                <TouchableOpacity style={styles.submitButton}
                onPress={handleSave}
                >
                    <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>Submit</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </View>
    );
};

const styles = StyleSheet.create({
    picker: {
        width: '100%',
        height: 30,
        paddingHorizontal: 10,
        backgroundColor: '#e3e3e3'
    },
    container: {
        flex: 1,
        backgroundColor: Color.colorWhite,
    },
    disform: {
        marginTop: 20,
    },
    disheader: {
        marginLeft: 15,
        marginTop: windowWidth * 0.05,
    },
    texthead: {
        fontWeight: '700',
        fontSize: 17,
    },
    dropdown13: {
        width: '95%',
        height: 50,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#A99F9F',
        alignSelf: 'center',
        marginTop: windowWidth * 0.03,
        backgroundColor: '#e3e3e3',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    submitButton: {
        backgroundColor: '#2A9988',
        width: windowWidth * 0.95,
        height: windowWidth * 0.13,
        marginTop: windowWidth * 0.1,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        elevation: 3
    },
    history: {
        flexDirection: 'row',
        marginTop: windowWidth * 0.05,
        alignItems: 'center',
    },
    hislist: {
        width: windowWidth * 0.35,
        marginLeft: windowWidth * 0.08,
    },
    dropdown14: {
        width: '30%',
        height: 34,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#A99F9F',
        alignSelf: 'center',
        // marginTop: windowWidth*0.03,
        backgroundColor: '#e3e3e3',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
        marginLeft: windowWidth * 0.2,
    },
    textlist: {
        fontWeight: '500',
        fontSize: 16,
    },
    dropdown15: {
        width: windowWidth * 0.5,
        height: 34,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#A99F9F',
        alignSelf: 'center',
        // marginTop: windowWidth*0.03,
        backgroundColor: '#e3e3e3',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 15,
    },
    problems: {
        width: '95%',
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
    delete: {
        width: 27,
        height: 30,
        marginLeft: windowWidth * 0.51,
        marginTop: -windowWidth * 0.03
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
        width: '34%'
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
        marginLeft: windowWidth * 0.02,
    },
    problems2: {
        width: '95%',
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
    duration4: {
        flexDirection: 'row',
        marginTop: windowWidth * 0.05,
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
    probheader1: {
        fontWeight: '700',
        fontSize: 16,
        width: '50%'
    },
    delete1: {
        width: 27,
        height: 30,
        marginLeft: windowWidth * 0.37,
        marginTop: -windowWidth * 0.03
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
    options: {
        width: '30%',
        height: 70,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: '#fff',
        elevation: 2,
        marginLeft: windowWidth * 0.63,
        paddingLeft: 15,
        paddingTop: 10,
    },
    option: {
        width: '50%',
        height: '50%',
        alignSelf: 'flex-start',
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
    problems3: {
        width: '95%',
        height: windowWidth * 0.6,
        marginTop: windowWidth * 0.05,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: windowWidth * 0.05,
        backgroundColor: '#e3e3e3',
        paddingLeft: 15,
        paddingRight: 15,
    },
    problems4: {
        width: '95%',
        height: windowWidth * 0.35,
        backgroundColor: '#e3e3e3',
        marginTop: windowWidth * 0.05,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: windowWidth * 0.05,
        backgroundColor: '#e3e3e3',
        paddingLeft: 15,
        paddingRight: 15,
    },
    problems5: {
        width: '95%',
        height: windowWidth * 0.3,
        backgroundColor: '#e3e3e3',
        marginTop: windowWidth * 0.05,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: windowWidth * 0.05,
        backgroundColor: '#e3e3e3',
        paddingLeft: 15,
        paddingRight: 15,
    },
    options2: {
        width: windowWidth * 0.94,
        height: 70,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: '#fff',
        elevation: 2,
        marginLeft: windowWidth * 0.03,
        paddingLeft: 15,
        paddingTop: 10,
    },
    addmore: {
        width: windowWidth * 0.9,
        height: windowWidth * 0.13,
        backgroundColor: '#DBF4F1',
        borderWidth: 1.24,
        borderColor: '#2A9988',
        borderRadius: 5,
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: windowWidth * 0.08
    },
    options3: {
        width: windowWidth * 0.94,
        height: windowWidth * 0.4,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: '#fff',
        elevation: 2,
        marginLeft: windowWidth * 0.03,
        paddingLeft: 15,
        paddingTop: 10,
    },
    dropdown19: {
        width: '95%',
        height: 50,
        borderRadius: 5,
        borderWidth: 0.5,
        borderColor: '#A99F9F',
        alignSelf: 'center',
        marginTop: windowWidth * 0.03,
        backgroundColor: '#e3e3e3',
        flexDirection: 'row',
        alignItems: 'center',
        // paddingLeft: 15,
        // paddingRight: 15,
    },
});

export default DiseaseForm;