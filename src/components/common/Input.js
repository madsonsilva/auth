import React from 'react';
import { TextInput, View, Text } from 'react-native';

const Input = ({ label, value, onChangeText, keyboardType, isSecure, placeholder }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;
    return (
        <View style={containerStyle}>
            <Text style={labelStyle}> { label } </Text>
            <TextInput
                style={inputStyle} 
                value={value}
                onChangeText={onChangeText}
                underlineColorAndroid='transparent'
                keyboardType={keyboardType}
                spellCheck={false}
                autoCorrect={false}
                secureTextEntry={isSecure}
                placeholder={placeholder}
            />
        </View>
    );
};

const styles = {
    containerStyle: {
        height: 40,
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        //justifyContent: 'flex-end',
        //alignContent: 'flex-start',
    },
    inputStyle: {
        color: '#000',
        paddingRight: 5,
        paddingLeft: 5,
        fontSize: 18,
        lineHeight: 23,
        flex: 3,
        // backgroundColor: 'blue'
    },
    labelStyle: {
        fontSize: 18,
        paddingLeft: 10,
        flex: 1.5,
        color: 'black'
        //backgroundColor: 'yellow',
        // justifyContent: 'flex-end',
        // alignContent: 'flex-end',
    },
};

export { Input };
