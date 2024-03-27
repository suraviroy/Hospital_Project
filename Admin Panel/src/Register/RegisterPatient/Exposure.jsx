import React, { useState } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image, TextInput } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Color } from '../../../GlobalStyles';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';


const Exposure = () => {
    const [selected, setSelected] = useState([]);

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

    const renderAdditionalFields = () => {
        return selected.map((option) => {
            switch (option) {
                case 'Dust':
                    return (
                        <View key={option} style={styles.problems5}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Dust</Text>
                                <TouchableOpacity>
                                    <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
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
                        </View>
                    );
                case 'Cotton dust':
                    return (
                        <View key={option} style={styles.problems5}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Cotton dust</Text>
                                <TouchableOpacity>
                                    <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
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
                        </View>
                    );
                case 'Wooden dust':
                    return (
                        <View key={option} style={styles.problems5}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Wooden dust</Text>
                                <TouchableOpacity>
                                    <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
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
                        </View>
                    );
                case 'Pigeon':
                    return (
                        <View key={option} style={styles.problems5}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Pigeon</Text>
                                <TouchableOpacity>
                                    <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
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
                        </View>
                    );
                case 'Hay':
                    return (
                        <View key={option} style={styles.problems5}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Hay</Text>
                                <TouchableOpacity>
                                    <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
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
                        </View>
                    );
                case 'Moulds':
                    return (
                        <View key={option} style={styles.problems5}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Moulds</Text>
                                <TouchableOpacity>
                                    <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
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
                        </View>
                    );
                case 'Pollen':
                    return (
                        <View key={option} style={styles.problems5}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Pollen</Text>
                                <TouchableOpacity>
                                    <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
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
                        </View>
                    );
                case 'Chemical':
                    return (
                        <View key={option} style={styles.problems5}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Chemical</Text>
                                <TouchableOpacity>
                                    <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
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
                        </View>
                    );
                case 'Stone dust':
                    return (
                        <View key={option} style={styles.problems5}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Stone dust</Text>
                                <TouchableOpacity>
                                    <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
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
                        </View>
                    );
                case 'Others':
                    return (
                        <View key={option} style={styles.problems}>
                            <View style={styles.problist}>
                                <Text style={{ fontWeight: '700', fontSize: 16, width: '50%' }}>Others</Text>
                                <TouchableOpacity>
                                    <Image source={require("../../../assets/images/delete.png")} style={{ width: 27, height: 30, marginLeft: windowWidth * 0.37, marginTop: -windowWidth * 0.03 }} />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.textbox}>
                                <TextInput style={{ color: '#8E7D7D', fontSize: 15, width: windowWidth * 0.6 }} placeholder='Enter Here' placeholderTextColor={'#8E7D7D'}></TextInput>
                            </TouchableOpacity>
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
        paddingLeft: 10,
        paddingRight: 10,
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