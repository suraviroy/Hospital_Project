import React from 'react';
import { View, StyleSheet } from 'react-native';

import axios from 'axios';
import fs from 'fs';



const Notification = () => {

    const downloadxl = () => {
        axios({
            method: 'get',
            url: 'http://localhost:8080/adminRouter/excelFile',
            responseType: 'stream'
        })
            .then((response) => {
                response.data.pipe(fs.createWriteStream('users.xlsx'));
            })
            .catch((error) => {
                console.log(error);
            });
    }
    return (
        <View>
            <TouchableOpacity styles={{ marginLeft: 50 }} onPress={downloadxl}>
                <Ionicons name='chatbubble-ellipses-sharp' size={30} color='#2A9988' />
            </TouchableOpacity>
        </View>
    );
}
const styles = StyleSheet.create({})
export default Notification;