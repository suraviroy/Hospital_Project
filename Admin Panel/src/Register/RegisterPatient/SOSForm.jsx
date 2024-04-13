
import React from 'react';
import { View, Dimensions } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';

const windowWidth = Dimensions.get('window').width;

const SOSForm = ({ selectedOption, setSelectedOption, isClicked, setIsClicked }) => {
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
    ];

    return (
        <View style={{ paddingHorizontal: 10 }}>
            <SelectList
                setSelected={(val) => setSelectedOption(val)}
                data={Dis_Options}
                save="value"
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
    );
};

export default SOSForm;
