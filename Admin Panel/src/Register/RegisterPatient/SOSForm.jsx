import React, { useState } from 'react';
import { Text, View, Dimensions, StyleSheet, TouchableOpacity, Image } from 'react-native';
const windowWidth = Dimensions.get('window').width;
// import { Color } from '../../../GlobalStyles';
import { SelectList } from 'react-native-dropdown-select-list';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';


const SOSForm = () => {
  const [selected, setSelected] = useState([]);

  const Dis_Options = [
    {
      value: 'Somewhat sick',
      key: 'SOS',
    },
    {
      value: 'Sick',
      key: 'SIC',
    },
    {
      value: 'Quite sick',
      key: 'QUS',
    },
    {
      value: 'Very sick',
      key: 'VRS',
    },
    {
      value: 'Morbus',
      key: 'MRB',
    },
  ]

  return (
    <View style={{ paddingHorizontal: 10 }}>
      <SelectList
        setSelected={(val) => setSelected(val)}
        data={Dis_Options}
        save="value"
        // label="Selected Diseases"
        placeholder='Select'
        searchPlaceholder='Search'
        boxStyles={{
          borderRadius: 5,
          borderWidth: 0.5,
          borderColor: '#A99F9F',
          marginTop: windowWidth * 0.03,
          backgroundColor: '#e3e3e3',
          paddingLeft: 15,
          paddingRight: 15,
        }}
        inputStyles={{ color: '#8E7D7D', fontSize: 15 }}
      />
    </View>
  )
};

export default SOSForm;