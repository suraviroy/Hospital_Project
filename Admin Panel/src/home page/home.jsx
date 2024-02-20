import React from 'react';
import {View,Text, StyleSheet, TouchableOpacity, ScrollView} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SIZES } from '../starting page/theme';
import { MaterialIcons, Ionicons } from 'react-native-vector-icons';
import SearchAdmin from './SearchAdmin';
import ImageSlider from './ImageSlider';


const Home =() => {
    return (
        <SafeAreaView>
            <View style = {styles.appBarWrapper012}>
                <View style = {styles.appBar012}>
                <MaterialIcons name = 'local-hospital' size= {40} color = {'#730404'}/>
                <Text style = {styles.text012}>Institute of Pulmocare &
                Research</Text>
                <View styles= {{alignItems: "flex-end"}}>
                <TouchableOpacity>
                   <Ionicons name = 'chatbubbles-sharp' size = {37} color='#706767'/>
                   </TouchableOpacity>
                    <View style = {styles.ChatCount012}>
                        <Text style={styles.chatNumber012}>8</Text>
                     </View>
                   
                </View>
                </View>
            
            </View>
            <ScrollView>
            <SearchAdmin/>
            </ScrollView>
            {/* <ScrollView>
            <ImageSlider/>
            </ScrollView> */}
        </SafeAreaView>
        
    );
}
const styles = StyleSheet.create({
    textStyle012:{
        fontFamily: "bold",
        fontSize: 40,
    },
    appBarWrapper012:{
    marginHorizontal: 22,
    marginTop: 12,
    },
    appBar012:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    text012:{
        fontFamily: "regular01",
        fontSize: 16,
    },
    ChatCount012:{
        position: "absolute",
        marginLeft: 23,
        bottom: 25,
        width: 16,
        height: 16,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: "#D0152C",
        justifyContent: "center",
        zIndex: 999
    },
    chatNumber012:{
        fontFamily: "bold01",
        fontSize: 10,
        color: "#FFFFFF",
    }
    
})
export default Home;