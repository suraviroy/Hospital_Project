import React, { useState } from 'react';
import {View, StyleSheet, Platform,StatusBar,Text, TouchableOpacity, FlatList, Dimensions} from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { FontFamily, Color, Border, FontSize } from "../../GlobalStyles";
import { useNavigation } from '@react-navigation/native';
import TodayList from './TodayList';
import RegisterSearch from './RegisterSearch';
import { Ionicons } from 'react-native-vector-icons';
const TodayPatient =() => {
    const navigation = useNavigation();
    const [searchText, setSearchText] = useState('');
    const handleAdd = () => {
        navigation.navigate('RegisterPatient');
    };
    const headerRegPatients = () => (
        <View style = {styles.regPatients2451}>
             <View style={styles.adminRow012}>
                <Text style={styles.text013}>Today's Patients</Text>
                <View styles={{ }}>
                    <TouchableOpacity onPress={() => handleAdd()}>
                        <Ionicons name='add-outline' size={windowWidth*0.08} color='#5B5151'  paddingRight={windowWidth*0.05} />
                    </TouchableOpacity>
                </View>
                </View>
        <RegisterSearch setSearchText={setSearchText}/>
        </View>
    );
    return (
        <SafeAreaView style = {styles.appbar13}>
             <StatusBar 
            barStyle={Platform.OS === 'ios' ? 'dark-content' : 'dark-content'}
            backgroundColor="#FFFFFF"
            translucent={false}
        />
            <View style={styles.container}>
            <View style={styles.headerContainer}>
                {headerRegPatients()}
            </View>
            <FlatList
                data={[]}
                renderItem={({ item }) => null}
                keyExtractor={(item, index) => index.toString()}
                ListFooterComponent={<TodayList searchText={searchText} />}
                style={styles.flatList}
            />
        </View>

        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    adminRow012: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 10,
        alignItems: "center",
        position: 'absolute',
        marginTop: windowWidth*0.25,
    },
    text013: {
        fontFamily: "bold01",
        fontSize: 20,
        marginLeft: 12,
        marginRight: windowWidth*0.4,
    },
    container: {
        marginTop: 0,
        flex: 1,
    },
    headerContainer: {
        paddingHorizontal: 3,
    },
    flatListContainer: {
        flex: 1,
    },
    regPatients2451: {
        marginHorizontal: 10,
        marginTop: windowWidth*-0.16,
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
        fontWeight: "bold",
        fontSize: 25,
        marginLeft: 30,
        fontFamily: FontFamily.font_bold,
    },
    appbar13: {
        flex: 1,
        backgroundColor: '#fff',
    }
})
export default TodayPatient;