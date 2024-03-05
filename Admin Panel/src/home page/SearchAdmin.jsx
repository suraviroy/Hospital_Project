
import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, TextInput, Platform, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Octicons } from 'react-native-vector-icons';
const windowWidth = Dimensions.get('window').width;

const SearchAdmin = ({ onSearch }) => {
    const [searchText, setSearchText] = useState('');

    const handleSearch = (text) => {
        setSearchText(text);
        onSearch(text);
    };

    return (
        <View style={styles.searchContainer}>
            <TouchableOpacity>
                <Octicons name="search" size={24} style={styles.searchIcon} />
            </TouchableOpacity>
            <View style={styles.searchWrapper}>
                <TextInput
                    style={styles.input}
                    value={searchText}
                    onChangeText={handleSearch}
                    placeholder="Search Coordinator"
                />
            </View>
        </View>
    );
};
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        marginVertical: 16,
        marginHorizontal: width * 0.04,
        borderWidth: 1.5,
        borderColor: "#2A9988",
        marginTop: windowWidth*0.08,
    },
    searchIcon: {
        marginLeft: 15,
        padding: 10,
        color: "#706767",
    },
    searchWrapper: {
        flex: 1,
        marginRight: 12,
        borderRadius: 12,
        padding: 2,
    },
    input: {
        fontFamily: "regular02",
        width: "100%",
        ...Platform.select({
            ios: {
                height: 40, 
                paddingHorizontal: 12,
            },
            android: {
                height: 48,
                paddingHorizontal: 16,
            },
        }),
    },
});

export default SearchAdmin;

