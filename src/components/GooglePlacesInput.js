import React, { useEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
// import { View } from "react-native";
import { v4 as uuidv4 } from "uuid";
import { View, Dimensions, TouchableOpacity } from "react-native";
const globalStyles = require("../context/GlobalStyles");
const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import GlobalColor from "../context/GlobalColor";

const GooglePlacesInput = ({
  setData,
  leftButtonFunction,
  rightButtonFunction,
}) => {
  // const createPlacesAutocompleteSessionToken = a => (a
  //     ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
  //     : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(
  //     /[018]/g,
  //     createPlacesAutocompleteSessionToken,
  //   ));

  const [sessionToken, setToken] = useState(uuidv4());

  useEffect(() => {}, [sessionToken]);

  // const newToken = uuidv4();
  // setToken(newToken);
  // textInputProps={{
  //     onChangeText: (text) => {
  //
  //     }
  // }}

  return (
    <View
      style={{
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#FFF",
        shadowColor: GlobalColor,
        shadowOffset: { height: 5 * windowHeight },
        marginTop: 4 * windowHeight,
        borderBottomWidth: 1,
        paddingTop: 18 * windowHeight,
        paddingBottom: 18 * windowHeight,
        borderColor: "#e2e2e2",
      }}
    >
      <View style={{ flexDirection: "row", width: "100%" }}>
        <GooglePlacesAutocomplete
          renderLeftButton={() => (
            <TouchableOpacity
              onPress={leftButtonFunction}
              style={{
                width: 48 * windowWidth,
                height: 36 * windowHeight,
                alignItems: "center",
              }}
            >
              <Ionicons
                name="chevron-back-sharp"
                size={24 * windowHeight}
                color={GlobalColor}
              />
            </TouchableOpacity>
          )}
          renderRightButton={() => (
            <TouchableOpacity
              onPress={rightButtonFunction}
              style={{
                width: 48 * windowWidth,
                height: 36 * windowHeight,
                alignItems: "center",
              }}
            >
              <Ionicons
                name="ios-location-sharp"
                size={24 * windowHeight}
                color={GlobalColor}
              />
            </TouchableOpacity>
          )}
          placeholder="Enter your event address"
          fetchDetails={true}
          debounce={1000}
          minLength={2}
          onPress={(data, details = null) => {
            // 'details' is provided when fetchDetails = true
            // const haveDistrict = details.adr_address.includes("locality")
            const haveStreet = details.adr_address.includes("street-address");

            const addressArray = details.adr_address
              .split(">")
              .filter((item) => !item.includes("class"));

            const district = addressArray[1]
              ? addressArray[1].split("<")[0]
              : "";
            const street = haveStreet
              ? addressArray[2]
                ? addressArray[2].split("<")[0]
                : ""
              : "";
            const building = haveStreet
              ? addressArray[3]
                ? addressArray[3].split("<")[0]
                : ""
              : addressArray[2]
              ? addressArray[2].split("<")[0]
              : "";
            setData({
              address: details.adr_address,
              district: district,
              street: street,
              building: building,
              longitude: details.geometry.location.lng,
              latitude: details.geometry.location.lat,
            });
          }}
          onFail={(error) => console.error(error)}
          query={{
            key: "",
            region: "HK",
            language: "zh-hk",
            sessiontoken: sessionToken,
            types: "geocode",
            fields: "geometry",
          }}
          GooglePlacesDetailsQuery={{
            sessiontoken: sessionToken,
          }}
          style={{ zIndex: 1000 }}
          styles={{
            textInputContainer: {
              width: "100%",
              alignSelf: "center",
              alignItems: "center",
              height: 36 * windowHeight,
            },
            row: { height: 36 * windowHeight },
            // poweredContainer: { width: '100%', elevation: 5 },
            powered: { width: 64, height: 10 },
            separator: { backgroundColor: "#fff" },
            poweredContainer: {
              height: 10 * windowHeight,
              opacity: 0.5,
              borderTopColor: "#FFF",
            },
            description: [globalStyles.smallSemiFont, { color: "#86868e" }],
            textInput: [
              globalStyles.smallSemiFont,
              { backgroundColor: "#e2e2e2" },
            ],
          }}
        />
      </View>
    </View>
  );
};

export default GooglePlacesInput;

// GoogleReverseGeocodingQuery={{
//     key: 'AIzaSyCYaUhp7R-k0wf7eAYmmd_hvT24URAqsEU',
//     language: 'en',
// }}
