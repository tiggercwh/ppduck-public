import React from "react";
import { Text, TouchableOpacity, Dimensions } from "react-native";
import GlobalColor from "../context/GlobalColor";

const globalStyles = require("../context/GlobalStyles");
const windowHeight = Dimensions.get("window").height / 812;
const Button = ({
  handlePress,
  buttonText,
  width,
  height,
  isWhite,
  fontSize,
  fontWeight,
  borderWidth,
  fontStyle,
  isGreen,
  customizedColor,
  customizedInvertedColor,
}) => {
  let butColor = "";
  let fontColor = "";

  if (isWhite) {
    butColor = "#fff";
    fontColor = GlobalColor;
  } else if (customizedColor != null) {
    butColor = customizedColor;
    fontColor = "#fff";
  } else if (customizedInvertedColor != null) {
    butColor = "#fff";
    fontColor = customizedInvertedColor;
  } else {
    butColor = GlobalColor;
    fontColor = "#FFF";
  }
  if (isGreen) {
    butColor = "#1DB954";
    fontColor = "#FFF";
  }

  function buttonStyle() {
    return {
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: butColor,
      borderRadius: 1,
      width: width,
      height: height,
      borderRadius: 45,
      borderColor: "#FFF",
      borderWidth: borderWidth,
    };
  }

  function textStyle() {
    return {
      color: fontColor,
      fontSize: fontSize !== null ? fontSize : 10 * windowHeight,
      justifyContent: "center",
      alignItems: "center",
      fontWeight: fontWeight !== null ? fontWeight : "bold",
    };
  }

  return (
    <>
      <TouchableOpacity onPress={handlePress} style={buttonStyle()}>
        <Text
          style={[
            textStyle(),
            globalStyles.mediumBoldFont,
            fontStyle ? fontStyle : null,
          ]}
        >
          {buttonText}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default Button;
