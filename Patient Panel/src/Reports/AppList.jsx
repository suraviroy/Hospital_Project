import React, {useState, useEffect} from 'react';
import { View, StyleSheet, Text, TouchableOpacity, Image, FlatList, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontFamily, Color } from '../../GlobalStyles';

const appdata = [
    {
        docname: 'Dr. Partha Sarathi Bhattacharya',
        docdeg: 'MBBS, Pathologist',
        doclang: 'English, Hindi +1',
        docexp: '18 Years Exp',
        appdate: '15',
        appmon: 'Aug',
        appyear: '2023',
        apptime: '2:30 PM',
        id: 1
    },
    {
        docname: 'Dr Amlan Chowdhury',
        docdeg: 'mbbs',
        doclang: 'hindi',
        docexp: '18 years exp',
        appdate: '18',
        appmon: 'Nov',
        appyear: '2023',
        apptime: '5:30 PM',
        id: 2
    },
   
    {
        docname: 'Dr. Satyabrata Ghosh',
        docdeg: 'mbbs',
        doclang: 'hindi',
        docexp: '18 years exp',
        appdate: '02',
        appmon: 'Jun',
        appyear: '2023',
        apptime: '4:30 PM',
        id: 3
    }
];

const AppList = ({ searchText }) => {
    const navigation = useNavigation();
    const [filteredDate, setFilteredDate] = useState([]);

    
    const handleViewDetails = (id) => {
        navigation.navigate('#');
    };

    useEffect(() => {
        if (!searchText) {
            setFilteredDate(appdata);
            return;
        }

        const filtered = appdata.filter(doctor =>
            doctor.appdate.toLowerCase().includes(searchText.toLowerCase()) ||
            doctor.appmon.toLowerCase().includes(searchText.toLowerCase()) 
        );
        setFilteredDate(filtered);
    }, [searchText, appdata]);

    const renderDoctorItem = ({item}) => (
        <View style={styles.appointView}>
                <Image source={{ uri: 'https://s3-alpha-sig.figma.com/img/f090/da92/0c0b2c11a9e7821a841e1c7d8128531b?Expires=1713139200&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UTd2U3uMJfxYpa6ttNjsY6ywyHjJcf7dhuhtMN0yiriIE4gWZOLt4OeoiTgXj7H0EBygPTlEnzkj0zFxcJKg-36j-OVTFgmAqc6vrNo8h9~Yxotz6rcTvvB9s0mHpTurYpUgWQP9dx0OolWDlNyofFW6Qqt04IVwQIjHxoP3PJRij8MMG0BiL92BeCK-ERu-kuxjD6K4sQ94lqqeGSGmPxEr68S7VPBz2yNxEcjp-128tLZzxAtbwe6zrf~-NQV5z9pUV16OwDjyVtSvB~LaS0V90MxkXvtSGx3WuIPKZCCv4INYYofEbXKTwghvg~S090PEzO20xnut3ru5Yt1bYA__' }} style={styles.docImage} />
                <View style={styles.docdet}>
                    <Text style={styles.docname}>{item.docname}</Text>
                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                        <Text style={styles.docdesg}>{item.docdeg}</Text>
                        <Text style={styles.docexp}>{item.docexp}</Text>
                    </View>
                    <Text style={styles.doclang}>{item.doclang}</Text>
                </View>
                <TouchableOpacity
                    style={styles.viewButton2451}
                    onPress={() => handleViewDetails()}
                >
                    <Text style={styles.viewDetails}>View Details</Text>
                </TouchableOpacity>
                <View style={styles.appdate}>
                    <Text style={styles.apptext}>Appointment On: <Text style={styles.datime}>{item.appdate} {item.appmon},{item.appyear},  {item.apptime}</Text></Text>
                </View>
            </View>
    );

    return (
        <SafeAreaView style={styles.appointcon}>
            <FlatList
                nestedScrollEnabled
                data={filteredDate}
                renderItem={renderDoctorItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    appointcon: {
        flex: 1,
        marginBottom: 85,
        paddingTop: -windowWidth * 0.14,
    },
    appointView: {
        width: windowWidth * 0.97,
        height: windowWidth * 0.43,
        backgroundColor: '#fff',
        alignSelf: 'center',
        marginTop: 10,
        flexDirection: 'row',
        borderRadius: 10,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: '#35A9EA',
        elevation: 5,
    },
    docImage: {
        marginTop: windowWidth * 0.02,
        marginLeft: windowWidth * 0.02,
        // marginRight: 10,
        width: windowWidth * 0.2,
        height: windowWidth * 0.25,
        borderRadius: 8,
    },
    appdate: {
        position: 'absolute',
        display: 'flex',
        bottom: 7,
        // left: 10,
        width: windowWidth * 0.965,
        borderTopColor: '#D1D1D6',
        borderTopWidth: 1,
        borderStyle: 'solid',

    },
    apptext: {
        color: '#666',
        fontSize: 13,
        // alignSelf: 'center',
        marginLeft: windowWidth * 0.02,
        marginTop: windowWidth * 0.01
    },
    datime: {
        color: '#011411',
        alignSelf: 'center',
        fontFamily: 'bold01'
    },
    viewButton2451: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: "absolute",
        width: windowWidth * 0.28,
        height: 34,
        borderColor: '#35A9EA',
        borderWidth: 2,
        borderStyle: 'solid',
        borderRadius: 5,
        marginTop: windowWidth * 0.21,
        marginLeft: windowWidth * 0.65,
    },
    viewDetails: {
        color: '#35A9EA',
        fontSize: 12,
        alignContent: 'center',
    },
    docdet: {
        display: 'flex',
        flexDirection: 'column',
    },
    docname: {
        fontWeight: 'bold',
        alignItems: 'center',
        marginLeft: windowWidth * 0.02,
        marginTop: windowWidth * 0.05,
        fontSize: 14,
        fontFamily: FontFamily.font_bold,
    },
    docdesg: {
        marginLeft: windowWidth * 0.02,
        alignItems: 'center',
        color: '#011411',
        fontSize: 12,
        fontFamily: FontFamily.font_bold,
        marginTop: windowWidth * 0.005,
        width: windowWidth*0.28
    },
    doclang: {
        marginLeft: windowWidth * 0.02,
        alignItems: 'center',
        color: Color.colorGray_100,
        fontSize: 12,
        fontFamily: 'bold01',
        marginTop: windowWidth * 0.005
    },
    docexp: {
        color: '#35A9EA',
        marginLeft: windowWidth * 0.17,
        alignItems: 'center',
        fontSize: 12,
        fontFamily: FontFamily.font_bold,
        marginTop: windowWidth * 0.005,
    }
})
export default AppList;