import React, { useState } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Color } from '../../../GlobalStyles';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { Picker } from '@react-native-picker/picker';

const Exposure = () => {
    const [selected, setSelected] = useState([]);
    const [selectedUnit1, setSelectedUnit1] = useState('Unit');
    const [selectedUnit2, setSelectedUnit2] = useState('Unit');
    const [selectedUnit3, setSelectedUnit3] = useState('Unit');
    const [selectedUnit4, setSelectedUnit4] = useState('Unit');
    const [selectedUnit5, setSelectedUnit5] = useState('Unit');
    const [selectedUnit6, setSelectedUnit6] = useState('Unit');
    const [selectedUnit7, setSelectedUnit7] = useState('Unit');
    const [selectedUnit8, setSelectedUnit8] = useState('Unit');
    const [selectedUnit9, setSelectedUnit9] = useState('Unit');
    const [selectedUnit10, setSelectedUnit10] = useState('Unit');

    const Dis_Options = [
        {
            value: 'Dust',
            key: 'DUS',
        },
        {
            value: 'Cotton dust',
            key: 'CTD',
        },
        {
            value: 'Wooden dust',
            key: 'WOD',
        },
        {
            value: 'Pigeon',
            key: 'PIG',
        },
        {
            value: 'Hay',
            key: 'HAY',
        },
        {
            value: 'Moulds',
            key: 'MLD',
        },
        {
            value: 'Pollen',
            key: 'POL',
        },
        {
            value: 'Chemical',
            key: 'CHE',
        },
        {
            value: 'Stone dust',
            key: 'STD',
        },
        {
            value: 'Others',
            key: 'OTH',
        },
    ]

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
                case 'Dust':
                    return (
                        <View key={option} style={styles.problems5}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Dust</Text>
                                {/* <TouchableOpacity>
                                    <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
                                </TouchableOpacity> */}
                            </View>
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
                    );
                case 'Cotton dust':
                    return (
                        <View key={option} style={styles.problems5}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Cotton dust</Text>
                                {/* <TouchableOpacity>
                                    <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
                                </TouchableOpacity> */}
                            </View>
                            <View style={styles.duration4}>
                                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                                <TouchableOpacity style={styles.dropdown20}>
                                    <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                                </TouchableOpacity>
                                <View style={styles.dropdown21}>
                                    <Picker
                                        selectedValue={selectedUnit2}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelectedUnit2(itemValue)
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
                    );
                case 'Wooden dust':
                    return (
                        <View key={option} style={styles.problems5}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Wooden dust</Text>
                                {/* <TouchableOpacity>
                                    <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
                                </TouchableOpacity> */}
                            </View>
                            <View style={styles.duration4}>
                                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                                <TouchableOpacity style={styles.dropdown20}>
                                    <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                                </TouchableOpacity>
                                <View style={styles.dropdown21}>
                                    <Picker
                                        selectedValue={selectedUnit3}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelectedUnit3(itemValue)
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
                    );
                case 'Pigeon':
                    return (
                        <View key={option} style={styles.problems5}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Pigeon</Text>
                                {/* <TouchableOpacity>
                                    <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
                                </TouchableOpacity> */}
                            </View>
                            <View style={styles.duration4}>
                                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                                <TouchableOpacity style={styles.dropdown20}>
                                    <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                                </TouchableOpacity>
                                <View style={styles.dropdown21}>
                                    <Picker
                                        selectedValue={selectedUnit4}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelectedUnit4(itemValue)
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
                    );
                case 'Hay':
                    return (
                        <View key={option} style={styles.problems5}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Hay</Text>
                                {/* <TouchableOpacity>
                                    <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
                                </TouchableOpacity> */}
                            </View>
                            <View style={styles.duration4}>
                                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                                <TouchableOpacity style={styles.dropdown20}>
                                    <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                                </TouchableOpacity>
                                <View style={styles.dropdown21}>
                                    <Picker
                                        selectedValue={selectedUnit5}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelectedUnit5(itemValue)
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
                    );
                case 'Moulds':
                    return (
                        <View key={option} style={styles.problems5}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Moulds</Text>
                                {/* <TouchableOpacity>
                                    <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
                                </TouchableOpacity> */}
                            </View>
                            <View style={styles.duration4}>
                                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                                <TouchableOpacity style={styles.dropdown20}>
                                    <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                                </TouchableOpacity>
                                <View style={styles.dropdown21}>
                                    <Picker
                                        selectedValue={selectedUnit6}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelectedUnit6(itemValue)
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
                    );
                case 'Pollen':
                    return (
                        <View key={option} style={styles.problems5}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Pollen</Text>
                                {/* <TouchableOpacity>
                                    <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
                                </TouchableOpacity> */}
                            </View>
                            <View style={styles.duration4}>
                                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                                <TouchableOpacity style={styles.dropdown20}>
                                    <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                                </TouchableOpacity>
                                <View style={styles.dropdown21}>
                                    <Picker
                                        selectedValue={selectedUnit7}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelectedUnit7(itemValue)
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
                    );
                case 'Chemical':
                    return (
                        <View key={option} style={styles.problems5}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Chemical</Text>
                                {/* <TouchableOpacity>
                                    <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
                                </TouchableOpacity> */}
                            </View>
                            <View style={styles.duration4}>
                                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                                <TouchableOpacity style={styles.dropdown20}>
                                    <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                                </TouchableOpacity>
                                <View style={styles.dropdown21}>
                                    <Picker
                                        selectedValue={selectedUnit8}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelectedUnit8(itemValue)
                                        }
                                        style={{ width: '100%', paddingHorizontal: 10}}>
                                        <Picker.Item label="Unit" value="" style={{ color: Color.colorGray_200 }} />
                                        {Unit.map((unit) => (
                                            <Picker.Item key={unit.key} label={unit.value} value={unit.value} style={{ color: Color.colorBlack }} />
                                        ))}
                                    </Picker>
                                </View>
                            </View>
                        </View>
                    );
                case 'Stone dust':
                    return (
                        <View key={option} style={styles.problems5}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Stone dust</Text>
                                {/* <TouchableOpacity>
                                    <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
                                </TouchableOpacity> */}
                            </View>
                            <View style={styles.duration4}>
                                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                                <TouchableOpacity style={styles.dropdown20}>
                                    <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                                </TouchableOpacity>
                                <View style={styles.dropdown21}>
                                    <Picker
                                        selectedValue={selectedUnit9}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelectedUnit9(itemValue)
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
                    );
                case 'Others':
                    return (
                        <View key={option} style={styles.problems}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Others</Text>
                                {/* <TouchableOpacity>
                                    <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
                                </TouchableOpacity> */}
                            </View>
                            <TouchableOpacity style={styles.textbox}>
                                <TextInput style={{ fontSize: 15, width: windowWidth * 0.6 }} placeholder='Enter Here' placeholderTextColor={'#8E7D7D'}></TextInput>
                            </TouchableOpacity>
                            <View style={styles.duration4}>
                                <Text style={{ fontWeight: '400', fontSize: 14 }}>Duration :</Text>
                                <TouchableOpacity style={styles.dropdown20}>
                                    <TextInput style={{ fontSize: 15 }} keyboardType='numeric' placeholder='Numeric Value' placeholderTextColor={'#8E7D7D'}></TextInput>
                                </TouchableOpacity>
                                <View style={styles.dropdown21}>
                                    <Picker
                                        selectedValue={selectedUnit10}
                                        onValueChange={(itemValue, itemIndex) =>
                                            setSelectedUnit10(itemValue)
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
    )
};

const styles = StyleSheet.create({
    problems5: {
        width: windowWidth * 0.95,
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
    problist: {
        flexDirection: 'row',
        marginTop: windowWidth * 0.05,
        justifyContent: 'flex-start',
        // alignItems: 'center'
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
});
export default Exposure;