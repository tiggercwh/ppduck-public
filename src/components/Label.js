import React, { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native-elements';
import { Dimensions } from 'react-native'

const globalStyles = require('../context/GlobalStyles');
const windowWidth = Dimensions.get('window').width / 375;
const windowHeight = Dimensions.get('window').height / 812;
const windowRatio = windowHeight * windowWidth

const Label = ({ text, fontSize, fontColor }) => {
    function textStyle() {
        return {
            color: fontColor,
            fontSize: fontSize,
            textAlign: "center",

        }
    }
    return (<>
        <Text style={[textStyle(), globalStyles.smallSemiFont]}>
            {text}
        </Text>
    </>);
};



export default Label;