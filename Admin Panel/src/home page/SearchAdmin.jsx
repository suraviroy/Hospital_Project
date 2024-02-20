import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Octicons } from 'react-native-vector-icons';

const SearchAdmin = () => {
    const [searchText, setSearchText] = useState('');

    return (
        <View style={styles.searchContainer012}>
            <TouchableOpacity>
                <Octicons name="search" size={24} style={{ marginLeft: 15, padding: 5, color: "#706767" }} />
            </TouchableOpacity>
            <View style={styles.searchWrapper012}>
                <TextInput
                    style={{ fontFamily: "regular02", width: "100%", height: "100%", paddingHorizontal: 12 }}
                    value={searchText}
                    onChangeText={setSearchText}
                    placeholder="Search Coordinator"
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer012: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#D1D1D6",
        borderRadius: 8,
        marginVertical: 16,
    },
    searchWrapper012: {
        flex: 1,
        backgroundColor: "#D1D1D6",
        marginRight: 12,
        borderRadius: 12,
    }
});

export default SearchAdmin;
