import React from 'react';
import { TextInput, View, Platform } from 'react-native';
import { Dimensions } from 'react-native'

const globalStyles = require('../context/GlobalStyles');

const BoxInput = ({ showDatePicker, title, width, height, fontSize, placeholder, secureTextEntry, value, onChange, isDashed, numericKeyboard, textAlignCenter, textColor, inputRef, shouldFocus, onSubmitFunction }) => {
    let borderStyle = null;
    if (isDashed) {
        borderStyle = 'dashed'
    } else {
        borderStyle = null
    }


    let keyboardSetting = null;
    if (numericKeyboard === true) {
        if (Platform.OS === "android") {
            keyboardSetting = "numeric"
        } else {
            keyboardSetting = "number-pad"
        }
    }

    function customInputStyle() {
        return {
            width: width,
            height: height,
            fontSize: fontSize,
            alignItems: 'flex-start',
            justifyContent: "center",
            alignSelf: 'center',
            borderRadius: 15,
            borderWidth: 1,
            borderColor: '#C4C4C4',
            borderStyle,


        }
    }

    React.useEffect(() => {
        if (shouldFocus) {
            inputRef.focus()
        }
    }, []);

    return (<>
        <View style={customInputStyle()}>
            <View style={{
                paddingLeft: textAlignCenter ? null : 12,
                flexDirection: 'row',
                alignItems: "center"
            }}>
                <TextInput
                    secureTextEntry={secureTextEntry}
                    placeholderTextColor={"#c4c4c4"}
                    placeholder={title}
                    style={[{ width, color: textColor ? textColor : 'black', fontSize }, globalStyles.smallLightFont]}
                    value={value}
                    onChangeText={onChange}
                    keyboardType={keyboardSetting}
                    textAlign={textAlignCenter ? 'center' : null}
                    ref={ref => inputRef = ref}
                    returnKeyType="done"
                    onSubmitEditing={onSubmitFunction}
                    autoCapitalize={"none"}
                    blurOnSubmit={true}

                >
                </TextInput>
            </View>
        </View>
    </>);
};



export default BoxInput;