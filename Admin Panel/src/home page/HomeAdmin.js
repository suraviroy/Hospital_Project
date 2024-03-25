import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, TouchableOpacity, Linking, Platform, Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
import { useNavigation } from '@react-navigation/native';
import { backendURL } from "../backendapi";
import { Ionicons } from 'react-native-vector-icons';

const adminListURL = `${backendURL}/adminListRouter/adminlist`;

const HomeAdmin = ({ searchText }) => {
    const navigation = useNavigation();
    const [adminList, setAdminList] = useState([]);
    const [filteredAdminList, setFilteredAdminList] = useState([]);

    useEffect(() => {
        fetch(adminListURL)
            .then(response => response.json())
            .then(data => {
                setAdminList(data);
                setFilteredAdminList(data);
            })
            .catch(error => {
                console.error('Error fetching admin list:', error);
            });
    }, [adminList]);

    useEffect(() => {
        const filteredList = adminList.filter(admin => admin.name.toLowerCase().startsWith(searchText.toLowerCase()) || admin.idNumber.startsWith(searchText));
        setFilteredAdminList(filteredList);
    }, [searchText, adminList]);

    const openDial = (phNumber) => {
        if (Platform.OS === "android") {
            Linking.openURL(`tel: +91${phNumber}`);
        } else {
            Linking.openURL(`telprompt:+91${phNumber}`);
        }
    }
    const Item = ({ name, educationQualification,picture,gender, idNumber, date,time,phNumber}) => (
       
        <View style={styles.item}>
        <View style={styles.leftContent}>
        {/* <Image style={styles.picture} source={{ uri: picture }}/> */}
        {picture ? (
            <Image source={{ uri: picture }} style={styles.picture} />
        ) : (
            <Image source={require('../../assets/images/user.png')} style={styles.picture} />
        )}
        <View style={styles.contain890}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.educationQualification}>{educationQualification}</Text>
        <Text style={styles.gender}>{gender}</Text>
        <View style={styles.button90}>
        <TouchableOpacity><Text style={styles.detailsButtonText01}>View Patient</Text></TouchableOpacity>
        <TouchableOpacity><Text style={styles.detailsButtonText02}>View Details</Text></TouchableOpacity>
        </View>
</View>

</View>
<View style={styles.rightContent}>
              <View style={styles.buttonsRow}>
              {/* <TouchableOpacity style={styles.button01}>
                  <Ionicons name='chatbubble-ellipses-sharp' size={20} color='#2A9988' />
                  </TouchableOpacity> */}
                  <TouchableOpacity style={styles.button02} onPress={()=>openDial(phNumber)}>
                  <Ionicons name="call-sharp" size={20} style={styles.callIcon} />
                  </TouchableOpacity>
                 
                  </View>              
                  </View>
                  <View style={styles.idNumberContainer}>
                  <Text style={styles.idNumberText}>{idNumber}</Text>
             </View>
             {/* <View styles={{borderTopWidth: 2, borderTopColor: '#EEE9E9',}}></View> */}
             <View style={styles.registeredOnContainer}>
      <Text style={styles.registeredOnText}>Registered On: <Text style={styles.datetime}>{date},  {time}</Text></Text>
    </View>
</View>

       
    );

    return (
            <View style={styles.container}>
            <FlatList
                data={filteredAdminList}
                renderItem={({ item }) => <Item name={item.name}
                    educationQualification={item.educationQualification}
                    picture={item.picture}
                    gender={item.gender} idNumber={item.idNumber} date={item.date} time={item.time} phNumber={item.phNumber} />
                }
                keyExtractor={item => item._id}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 65,
        flex: 1,
        marginTop: windowWidth*0.04,
    },
    item: {
        backgroundColor: '#fff',
        marginVertical: 5,
        marginHorizontal: 15,
        flexDirection: 'row',
        width: windowWidth - 30, 
        height: windowWidth * 0.4,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: "#2A9988",
        elevation: 5,
    },
    name: {
        paddingTop: 15,
        fontFamily:'bold01',
        fontSize: 14
        },
    leftContent: {
        flex: 1,
        flexDirection: 'row',
    },
    rightContent: {
        flex: 1,
        alignItems: 'flex-end', 
    },
    button02: {
        position: 'absolute',
        top: 10,
        left: 32, 
    },
    picture: {
        marginTop: 5,
        marginLeft: 5,
        marginRight: 10,
        width: windowWidth * 0.2, 
        height: windowWidth * 0.25,
        borderRadius: 8,
    },
    idNumberContainer: {
        backgroundColor: '#2A9988',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        top: 45,
        left: 2,
        height: 30,
        width: 70,
        paddingTop: 5,
        paddingLeft: 15,
        position: 'relative',
    },
    idNumberText: {
        color: '#FFFFFF',
        fontSize: 12,
    },
    educationQualification: {
        fontSize: 12,
        fontFamily: 'regular89',
        paddingTop: 5,
    },
    gender: {
        paddingTop: 10,
        fontSize:12,
        fontFamily: 'regular89',
    },
    contain890: {
        flexDirection: 'column',
    },
    button90: {
        flexDirection: 'row',
        marginTop: 15,
    },
    detailsButtonText01: {
        borderWidth: 1.5,
        padding: 5,
        borderRadius: 5,
        fontSize: 12,
        color: "#F56B62",
        borderColor: "#F56B62",
        marginLeft: 20,
        marginRight: 20,
    },
    detailsButtonText02: {
        borderWidth: 1.5,
        padding: 5,
        color: "#2A9988",
        borderRadius: 5,
        fontSize: 12,
        borderColor: "#2A9988",
    },
    registeredOnContainer: {
        position: 'absolute',
        bottom: 5,
        left: 10,
    },
    registeredOnText: {
        color: '#666',
        fontSize: 11,
    },
    callIcon:{
        color:'#2A9988'
    },
    datetime:{
    color: '#011411',
    alignSelf: 'center',
    fontFamily: 'bold01'
    }
});


export default HomeAdmin;
