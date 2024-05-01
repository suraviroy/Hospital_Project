import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Dimensions } from 'react-native';
import { Octicons } from 'react-native-vector-icons';
const windowWidth = Dimensions.get('window').width;
const SearchPatient = ({ setSearchText }) => {
    const [searchTextLocal, setSearchTextLocal] = useState('');

    const handleSearchChange = (text) => {
        setSearchTextLocal(text);
        setSearchText(text);
    };

    return (
        <View style={styles.searchBox2451}>
            <TouchableOpacity>
                <Octicons name="search" size={24} style={{ marginLeft: 15, paddingTop: 11, color: "#706767" }} />
            </TouchableOpacity>
            <View style={styles.searchWrapper012}>
                <TextInput  style={{
                        fontFamily: "regular02",
                        width: "100%",
                        height: "100%",
                        paddingHorizontal: 12
                    }}
                    value={searchTextLocal}
                    onChangeText={handleSearchChange}
                    placeholder="Search now"
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
        borderColor: '#2A9988',
        marginVertical: 16,
        height: 50,
        width: windowWidth*0.95,
        backgroundColor: "#FFFFFF",
        marginTop: windowWidth*0.08,

    },
    searchWrapper012: {
        flex: 1,
        backgroundColor: "#FFFFFF",
        marginRight: 12,
        borderRadius: 12,
    }
});

export default SearchPatient;