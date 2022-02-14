import React from "react";
import { Text, TextInput, View } from "react-native";
import GlobalColor from "../context/GlobalColor";

const LinedInput = ({
  title,
  width,
  height,
  fontSize,
  secureTextEntry,
  value,
  onChange,
  fontStyle,
}) => {
  function customInputStyle() {
    return {
      width: width,
      height: height,
      alignItems: "flex-start",
      justifyContent: "center",
      alignSelf: "center",
      paddingLeft: 8,
    };
  }

  return (
    <>
      <Text
        style={[
          { alignSelf: "flex-start", color: "#C4C4C4", paddingLeft: 8 },
          fontStyle,
        ]}
      >
        {title}
      </Text>
      <View style={customInputStyle()}>
        <View
          style={{
            paddingLeft: 8,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <TextInput
            secureTextEntry={secureTextEntry}
            placeholderTextColor={"#c4c4c4"}
            style={[
              { width, color: GlobalColor, fontSize, fontWeight: "bold" },
              fontStyle,
            ]}
            value={value}
            onChangeText={onChange}
            autoCapitalize="none"
          />
        </View>
      </View>
      <View
        style={{
          height: 1,
          width: width,
          backgroundColor: "#e5e5e5",
          justifyContent: "center",
          alignSelf: "center",
        }}
      ></View>
    </>
  );
};

export default LinedInput;
