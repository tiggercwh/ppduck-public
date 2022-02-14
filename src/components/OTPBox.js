import React, { useEffect, useRef, useState } from "react";
import {
  View,
  TouchableOpacity,
  Platform,
  Keyboard,
  TextInput,
} from "react-native";

import { Dimensions } from "react-native";
// import { TextInput } from 'react-native-gesture-handler';
import Label from "../components/Label";
import GlobalColor from "../context/GlobalColor";

const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;

const OTPBox = ({ setCode, resendVerification, setIsLoading, email }) => {
  let boxWidth = 36 * windowWidth;
  let boxHeight = 48 * windowHeight;

  let input1Ref = useRef(null);
  let input2Ref = useRef(null);
  let input3Ref = useRef(null);
  let input4Ref = useRef(null);
  let input5Ref = useRef(null);
  let input6Ref = useRef(null);

  const [pin, setPin] = useState({
    pin1: "",
    pin2: "",
    pin3: "",
    pin4: "",
    pin5: "",
    pin6: "",
  });

  function handleResend() {
    setPin({
      pin1: "",
      pin2: "",
      pin3: "",
      pin4: "",
      pin5: "",
      pin6: "",
    });
  }
  useEffect(() => {
    setCode(pin.pin1 + pin.pin2 + pin.pin3 + pin.pin4 + pin.pin5 + pin.pin6);
  }, [pin]);
  useEffect(() => {
    input1Ref.focus();
  }, []);

  function inputStyle() {
    return {
      backgroundColor: "#C4C4C4",
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center",
      textAlign: "center",
      fontWeight: "600",
      padding: boxWidth / 4,
      fontSize: 20 * windowHeight,
      height: boxHeight,
      width: boxWidth,
      borderRadius: 5 * windowWidth,
    };
  }

  function inputFilledStyle() {
    return {
      backgroundColor: GlobalColor,
      alignItems: "center",
      justifyContent: "center",
      alignContent: "center",
      textAlign: "center",
      fontWeight: "600",
      padding: boxWidth / 4,
      fontSize: 20 * windowHeight,
      height: boxHeight,
      width: boxWidth,
      borderRadius: 5 * windowWidth,
      color: "#FFF",
    };
  }

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          width: 312 * windowWidth,
          height: 34 * windowHeight,
          alignItems: "center",
          justifyContent: "space-evenly",
        }}
      >
        {pin.pin1 === "" ? (
          <TextInput
            ref={(ref) => (input1Ref = ref)}
            style={inputStyle()}
            maxLength={1}
            keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
            value={pin.pin1}
            onChangeText={(pin1) => {
              setPin((prev) => ({ ...prev, pin1: pin1 }));
              if (pin1 !== "") {
                input2Ref.focus();
              }
            }}
          />
        ) : (
          <TextInput
            ref={(ref) => (input1Ref = ref)}
            style={inputFilledStyle()}
            maxLength={1}
            keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
            value={pin.pin1}
            onChangeText={(pin1) => {
              setPin((prev) => ({ ...prev, pin1: pin1 }));
              if (pin1 !== "") {
                input2Ref.focus();
              }
            }}
          />
        )}

        {pin.pin2 === "" ? (
          <TextInput
            ref={(ref) => (input2Ref = ref)}
            style={inputStyle()}
            maxLength={1}
            keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
            value={pin.pin2}
            onChangeText={(pin2) => {
              setPin((prev) => ({ ...prev, pin2: pin2 }));
              if (pin2 !== "") {
                input3Ref.focus();
              }
            }}
          />
        ) : (
          <TextInput
            ref={(ref) => (input2Ref = ref)}
            style={inputFilledStyle()}
            maxLength={1}
            keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
            value={pin.pin2}
            onChangeText={(pin2) => {
              setPin((prev) => ({ ...prev, pin2: pin2 }));
              if (pin2 !== "") {
                input3Ref.focus();
              }
            }}
          />
        )}

        {pin.pin3 === "" ? (
          <TextInput
            ref={(ref) => (input3Ref = ref)}
            style={inputStyle()}
            maxLength={1}
            keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
            value={pin.pin3}
            onChangeText={(pin3) => {
              setPin((prev) => ({ ...prev, pin3: pin3 }));
              if (pin3 !== "") {
                input4Ref.focus();
              }
            }}
          />
        ) : (
          <TextInput
            ref={(ref) => (input3Ref = ref)}
            style={inputFilledStyle()}
            maxLength={1}
            keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
            value={pin.pin3}
            onChangeText={(pin3) => {
              setPin((prev) => ({ ...prev, pin3: pin3 }));
              if (pin3 !== "") {
                input4Ref.focus();
              }
            }}
          />
        )}

        {pin.pin4 === "" ? (
          <TextInput
            ref={(ref) => (input4Ref = ref)}
            style={inputStyle()}
            maxLength={1}
            keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
            value={pin.pin4}
            onChangeText={(pin4) => {
              setPin((prev) => ({ ...prev, pin4: pin4 }));
              if (pin4 !== "") {
                input5Ref.focus();
              }
            }}
          />
        ) : (
          <TextInput
            ref={(ref) => (input4Ref = ref)}
            style={inputFilledStyle()}
            maxLength={1}
            keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
            value={pin.pin4}
            onChangeText={(pin4) => {
              setPin((prev) => ({ ...prev, pin4: pin4 }));
              if (pin4 !== "") {
                input5Ref.focus();
              }
            }}
          />
        )}
        {pin.pin5 === "" ? (
          <TextInput
            ref={(ref) => (input5Ref = ref)}
            style={inputStyle()}
            maxLength={1}
            keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
            value={pin.pin5}
            onChangeText={(pin5) => {
              setPin((prev) => ({ ...prev, pin5: pin5 }));
              if (pin5 !== "") {
                input6Ref.focus();
              }
            }}
          />
        ) : (
          <TextInput
            ref={(ref) => (input5Ref = ref)}
            style={inputFilledStyle()}
            maxLength={1}
            keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
            value={pin.pin5}
            onChangeText={(pin5) => {
              setPin((prev) => ({ ...prev, pin5: pin5 }));
              if (pin5 !== "") {
                input6Ref.focus();
              }
            }}
          />
        )}
        {pin.pin6 === "" ? (
          <TextInput
            ref={(ref) => (input6Ref = ref)}
            style={inputStyle()}
            maxLength={1}
            keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
            value={pin.pin6}
            onChangeText={(pin6) => {
              setPin((prev) => ({ ...prev, pin6: pin6 }));
              if (pin6 !== "") {
                Keyboard.dismiss();
              }
            }}
          />
        ) : (
          <TextInput
            ref={(ref) => (input6Ref = ref)}
            style={inputFilledStyle()}
            maxLength={1}
            keyboardType={Platform.OS === "android" ? "numeric" : "number-pad"}
            value={pin.pin6}
            onChangeText={(pin6) => {
              setPin((prev) => ({ ...prev, pin6: pin6 }));
              if (pin6 !== "") {
                Keyboard.dismiss();
              }
            }}
          />
        )}
      </View>
      <View style={{ height: 36 * windowHeight }}></View>
      <TouchableOpacity
        onPress={async () => {
          setIsLoading(true);
          //console.log("User email:" + email)
          await resendVerification(email);
          handleResend();
          setIsLoading(false);
        }}
        style={{
          width: 135 * windowWidth,
          alignSelf: "center",
          paddingTop: 64 * windowHeight,
        }}
      >
        <LabelLined
          text="Resend Verification Code"
          lineColor={GlobalColor}
          padding={1}
        />
      </TouchableOpacity>
    </>
  );
};

const LabelLined = ({ text, lineColor, padding, fontSize }) => {
  function viewStyle() {
    return {
      flexDirection: "column",
      borderBottomWidth: 1,
      borderRadius: 0,
      borderBottomColor: lineColor,
      paddingTop: padding,
      paddingBottom: padding,
    };
  }

  return (
    <View style={viewStyle()}>
      <Label text={text} fontSize={fontSize} fontColor={lineColor} />
    </View>
  );
};
export default OTPBox;
