import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialIcons, Ionicons } from 'react-native-vector-icons';
import SearchAdmin from './SearchAdmin';
import { useNavigation } from '@react-navigation/native';
import ImageSlider from './ImageSlider';
import HomeAdmin from './HomeAdmin';


const Home = () => {
    const navigation = useNavigation();

    const renderHeader = () => (
        <View>
            <View style={styles.appBarWrapper012}>
                <View style={styles.appBar012}>
                    <MaterialIcons name='local-hospital' size={40} color={'#730404'} />
                    <Text style={styles.text012}>Institute of Pulmocare & {'\n'}Research</Text>
                    <View styles={{ alignItems: "flex-end" }}>
                        <TouchableOpacity styles={{ marginLeft: 50 }}>
                            <Ionicons name='chatbubble-ellipses-sharp' size={30} color='#2A9988' />
                        </TouchableOpacity>
                        <View style={styles.ChatCount012}>
                            <Text style={styles.chatNumber012}>8</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.adminRow012}>
                <Text style={styles.text013}>Admins List</Text>
                <TouchableOpacity style={styles.button456} onPress={() => navigation.navigate('RegisterPatient')}>
                    <Text style={styles.text567}> Add Admin</Text>
                </TouchableOpacity>
                <View styles={{ alignItems: "flex-end" }}>
                    <TouchableOpacity onPress={() => navigation.navigate('RegisterPanel')}>
                        <Ionicons name='settings-sharp' size={30} color='#5B5151' marginRight={20} />
                    </TouchableOpacity>
                </View>
            </View>
            <SearchAdmin />
        </View>
    );

    return (
        <SafeAreaView style={styles.appbar033}>
            
                <FlatList nestedScrollEnabled
                    ListHeaderComponent={renderHeader}
                    data={[]}
                    renderItem={({ item }) => null}
                    keyExtractor={(item, index) => index.toString()}
                    ListFooterComponent={<HomeAdmin />}
                    style={styles.flatList}
                />

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    appBarWrapper012: {
        marginHorizontal: 22,
        marginTop: 12,
    },
    appBar012: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        borderBottomWidth: 3,
        borderBottomColor: '#D3F1ED'
    },
    adminRow012: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginLeft: 10,
        alignItems: "center",
        marginTop: 15,
    },
    text012: {
        fontFamily: "regular01",
        fontSize: 18,
        marginBottom: 5,
    },
    text013: {
        fontFamily: "bold01",
        fontSize: 20,
        marginLeft: 12,
    },
    button456: {
        marginLeft: 110,
        borderWidth: 2,
        borderColor: "#2A9988",
        padding: 5,
        borderRadius: 6,
    },
    text567: {
        color: "#2A9988",
        fontFamily: "bold01",
        fontSize: 14,
    },
    ChatCount012: {
        position: "absolute",
        marginLeft: 23,
        bottom: 18,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: "#D0152C",
        justifyContent: "center",
        zIndex: 999
    },
    chatNumber012: {
        fontFamily: "bold01",
        fontSize: 10,
        color: "#FFFFFF",
    },
    appbar033: {
        flex: 1,
        backgroundColor: '#fff'
    },
    flatList: {
        paddingHorizontal: 3
    }
});

export default Home;
// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import { MaterialIcons, Ionicons } from 'react-native-vector-icons';
// import SearchAdmin from './SearchAdmin';
// import { useNavigation } from '@react-navigation/native';
// import ImageSlider from './ImageSlider';
// import HomeAdmin from './HomeAdmin';

// const { width, height } = Dimensions.get('window');

// const Home = () => {
//     const navigation = useNavigation();

//     const renderHeader = () => (
//         <View>
//             <View style={styles.appBarWrapper}>
//                 <View style={styles.appBar}>
//                     <MaterialIcons name='local-hospital' size={width * 0.1} color={'#730404'} />
//                     <Text style={styles.text}>Institute of Pulmocare & {'\n'}Research</Text>
//                     <TouchableOpacity onPress={() => navigation.navigate('Chat')}>
//                         <Ionicons name='chatbubble-ellipses-sharp' size={width * 0.08} color='#2A9988' />
//                     </TouchableOpacity>
//                     <View style={styles.chatCount}>
//                         <Text style={styles.chatNumber}>8</Text>
//                     </View>
//                 </View>
//             </View>
//             <View style={styles.adminRow}>
//                 <Text style={styles.text}>Admins List</Text>
//                 <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddAdmin')}>
//                     <Text style={styles.text}> Add Admin</Text>
//                 </TouchableOpacity>
//                 <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
//                     <Ionicons name='settings-sharp' size={width * 0.08} color='#5B5151' />
//                 </TouchableOpacity>
//             </View>
//             <SearchAdmin />
//         </View>
//     );

//     return (
//         <SafeAreaView style={styles.container}>
//             <FlatList
//                 nestedScrollEnabled
//                 ListHeaderComponent={renderHeader}
//                 data={[]}
//                 renderItem={({ item }) => null}
//                 keyExtractor={(item, index) => index.toString()}
//                 ListFooterComponent={<HomeAdmin />}
//                 style={styles.flatList}
//             />
//         </SafeAreaView>
//     );
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//     },
//     appBarWrapper: {
//         marginHorizontal: width * 0.05,
//         marginTop: height * 0.02,
//     },
//     appBar: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         alignItems: 'center',
//         borderBottomWidth: 3,
//         borderBottomColor: '#D3F1ED',
//     },
//     adminRow: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//         marginHorizontal: width * 0.05,
//         alignItems: 'center',
//         marginTop: height * 0.02,
//     },
//     text: {
//         fontFamily: 'regular01',
//         fontSize: width * 0.04,
//         marginBottom: height * 0.01,
//     },
//     addButton: {
//         borderWidth: 2,
//         borderColor: '#2A9988',
//         padding: width * 0.015,
//         borderRadius: width * 0.02,
//     },
//     chatCount: {
//         position: 'absolute',
//         bottom: height * 0.02,
//         marginLeft: width * 0.05,
//         width: width * 0.08,
//         height: width * 0.08,
//         right: width* -0.001,
//         borderRadius: width * 0.04,
//         alignItems: 'center',
//         backgroundColor: '#D0152C',
//         justifyContent: 'center',
//         zIndex: 999,
//     },
//     chatNumber: {
//         fontFamily: 'bold01',
//         fontSize: width * 0.025,
//         color: '#FFFFFF',
//     },
//     flatList: {
//         paddingHorizontal: width * 0.01,
//     },
// });

// export default Home;