import React, { useState } from 'react';
import {View, StyleSheet, Text, TouchableOpacity, FlatList, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FontFamily, Color, Border, FontSize } from "../../../GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import RegisteredPatient from './RegisteredPatient';
import SearchPatient from './SearchPatient';

const RegisterNotifications =() => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(true);

    const handleBack = () => {
    navigation.goBack();
    };

    const headerRegPatients = () => (
        <View style = {styles.regPatients2451}>
            <View style = {styles.headerreg2451}>
                <TouchableOpacity onPress={handleBack} style={styles.backButton24}>
                    <Text><Icon name="angle-left" size={30} color={Color.colorBlack} /></Text>
                </TouchableOpacity>
                <Text style = {styles.text24}>Registered Patients</Text>
            </View>
        <SearchPatient setSearchText={setSearchText}/>
        </View>
    );
    return (
        <SafeAreaView style = {styles.appbar13}>
            <View style={styles.container}>
            <View style={styles.headerContainer}>
                {headerRegPatients()}
            </View>
            <FlatList
                data={[]}
                renderItem={({ item }) => null}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={<RegisteredPatient searchText={searchText} />}
                style={styles.flatList}
            />
        </View>

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        backgroundColor: '#FFFFFF',
        paddingTop: windowWidth*0.08,
    },
    headerContainer: {
        paddingHorizontal: 3,
    },
    flatListContainer: {
        flex: 1,
    },
    regPatients2451: {
        marginHorizontal: 10,
        marginTop: windowWidth*0.03,
    },
    headerreg2451: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
    },
    backButton24: {
        marginRight: 10,
        position: 'absolute',
        left: 0,
    },
    text24: {
        fontSize: 25,
        marginLeft: 30,
        fontFamily: "bold01",
    },
    appbar13: {
        flex: 1,
        backgroundColor: '#fff',
    }
})
export default RegisterNotifications;