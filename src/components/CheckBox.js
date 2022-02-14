import React, { useState } from "react";
import { Text, TouchableOpacity, Image, View } from "react-native";
import TrueImage from "../../assets/True_CheckBox.png";
import FalseImage from "../../assets/False_CheckBox.png";
import { Dimensions } from "react-native";
import GlobalColor from "../context/GlobalColor";
const globalStyles = require("../context/GlobalStyles");
const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;

const CheckBox = ({ text, fontSize }) => {
    const [isTrue, setImage] = useState(false);
    function textStyle() {
        return {
            color: GlobalColor,
            fontSize: fontSize,
        };
    }

    return (
        <>
            <TouchableOpacity
                onPress={() => {
                    setImage(!isTrue);
                }}
                style={{ flexDirection: "row", alignItems: "center" }}
            >
                {isTrue === true ? (
                    <Image source={TrueImage} style={{ width: 12 * windowHeight, height: 12 * windowHeight }} />
                ) : (
                    <Image source={FalseImage} style={{ width: 12 * windowHeight, height: 12 * windowHeight }} />
                )}
                <View style={{ width: 10 }} />
                <Text style={[textStyle(), globalStyles.smallSemiFont]}>{text}</Text>
            </TouchableOpacity>
        </>
    );
};

export default CheckBox;
