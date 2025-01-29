import React from 'react'; 
import { View, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native'; 
import { Octicons } from 'react-native-vector-icons'; 

const windowWidth = Dimensions.get('window').width;  

const SearchAdmin = ({ onSearchChange, placeholder }) => {
    return (
        <View style={styles.searchBox2451}>
            <TouchableOpacity>
                <Octicons name="search" size={24} style={{ marginLeft: 15, paddingTop: 11, color: "#706767" }} />
            </TouchableOpacity>
            <View style={styles.searchWrapper012}>
                <TextInput
                    style={{
                        fontFamily: "regular02",
                        width: "100%",
                        height: "100%",
                        paddingHorizontal: 12
                    }}
                    onChangeText={onSearchChange}
                    placeholder={placeholder || "Search by Name or Patient ID"}
                    clearButtonMode='always'
                />
            </View>
        </View>
    ); 
}

const styles = StyleSheet.create({
    searchBox2451: {
        flexDirection: "row",
        alignSelf: "center",
        borderRadius: 10,
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: '#096759',
        marginVertical: 16,
        height: 50,
        width: windowWidth*0.95,
        backgroundColor: "#FFFFFF",
        marginTop: windowWidth*0.05,
    },
    searchWrapper012: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        marginRight: 12,
        borderRadius: 12,
    } 
});

export default SearchAdmin;