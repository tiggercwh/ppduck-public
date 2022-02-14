import React, { useState } from "react";
import { View, Text, Dimensions } from "react-native";
import {
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import GlobalColor from "../context/GlobalColor";
const globalStyles = require("../context/GlobalStyles");
const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;

const FloatingInput = ({
  title,
  textValue,
  onChangeText,
  isDate,
  onPressDateModal,
  numericKeyboard,
  isMultiline,
  onSubmitFunction,
  tagMaking,
}) => {
  //  const inputRef = useState()
  return (
    <TouchableWithoutFeedback
      onPress={() => {
        if (isDate) {
          onPressDateModal();
        }
      }}
    >
      <View style={{ height: 24 * windowHeight }} />
      <View
        style={{
          height: isMultiline ? 164 * windowHeight : null,
          flexDirection: "row",
          width: "95%",
          backgroundColor: "#FFF",
          borderRadius: 12 * windowHeight,
          shadowColor: GlobalColor,
          shadowRadius: 5 * windowHeight,
          shadowOffset: { height: 5 * windowHeight },
          shadowOpacity: 0.3,
          elevation: 5,
          marginLeft: 6 * windowWidth,
          marginRight: 6 * windowWidth,
        }}
      >
        <View style={{ width: "5%" }} />
        <View
          style={{
            width: "90%",
            height: isMultiline ? 108 * windowHeight : 72 * windowHeight,
            justifyContent: isMultiline ? "flex-start" : "center",
            alignItems: "flex-start",
            paddingTop: isMultiline ? 12 * windowHeight : null,
          }}
        >
          {tagMaking ? null : (
            <Text
              style={[
                { color: "#86868E", paddingBottom: 8 * windowHeight },
                globalStyles.mediumSemiFont,
              ]}
            >
              {title}
            </Text>
          )}
          {isDate ? (
            <Text style={[{ color: "black" }, globalStyles.mediumSemiFont]}>
              {textValue.toLocaleString()}
            </Text>
          ) : isMultiline ? (
            <TextInput
              blurOnSubmit
              secureTextEntry={false}
              placeholderTextColor={"#bdbdbd"}
              multiline={true}
              numberOfLines={6}
              value={textValue}
              onChangeText={onChangeText}
              returnKeyType={"next"}
              style={[
                {
                  justifyContent: "center",
                  alignContent: "center",
                  alignSelf: "center",
                  height: "90%",
                  width: "100%",
                },
                globalStyles.mediumSemiFont,
              ]}
            />
          ) : (
            <TextInput
              value={textValue}
              onChangeText={onChangeText}
              returnKeyType="done"
              keyboardType={numericKeyboard === true ? "number-pad" : null}
              onSubmitEditing={onSubmitFunction ? onSubmitFunction : null}
              style={[{ width: "100%" }, globalStyles.mediumSemiFont]}
              placeholder={tagMaking ? "e.g. Ball4Life" : null}
            />
          )}
        </View>
      </View>
      <View style={{ height: 12 * windowHeight }} />
    </TouchableWithoutFeedback>
  );
};

export default FloatingInput;
