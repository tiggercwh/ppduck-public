import React, { useState, useEffect } from "react";
import {
  TouchableWithoutFeedback,
  View,
  StyleSheet,
  Text,
  Image,
  ActivityIndicator,
  ImageBackground,
} from "react-native";
import { Ionicons, FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Dimensions } from "react-native";
import GlobalColor from "../context/GlobalColor";
const globalStyles = require("../context/GlobalStyles");
const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;
const windowWidthLocal = windowWidth;
const windowHeightLocal = windowHeight;

const CardItem = ({ onPressNavigate, item, isEvent }) => {
  const [imageRender, setImageRender] = useState(null);
  const timeString = new Date(item ? item.geenTime : null).toString();
  const [isLoading, setLoading] = useState(true);

  function getImage() {
    return item.geenPhoto ? item.geenPhoto[0] : null;
  }

  const TriangleCornerBottomRight = () => {
    return <View style={styles.triangleCornerBottomRight} />;
  };

  const FeaturedTag = () => {
    return (
      <>
        <TriangleCornerBottomRight />
        <View
          style={{
            position: "absolute",
            right: 12 * windowWidth,
            bottom: 12 * windowWidth,
          }}
        >
          <FontAwesome5 name="crown" size={20 * windowHeight} color="white" />
        </View>
      </>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={onPressNavigate}>
      <View
        style={{
          backgroundColor: "#e5e5e5",
          backgroundColor: "#FFF",
          height: "100%",
          width: 312 * windowWidth,
          paddingRight: 24 * windowWidth,
        }}
      >
        <View style={{ width: "100%", height: "75%" }}>
          <ImageBackground
            onLoadStart={() => setLoading(true)}
            onLoadEnd={() => {
              setLoading(false);
            }}
            style={{
              width: "100%",
              height: "100%",
              borderColor: "#86868e",
              justifyContent: "flex-end",
            }}
            imageStyle={{
              borderRadius: 12 * windowHeight,
              borderWidth: 1 * windowHeight,
            }}
            source={{ uri: getImage() }}
          >
            {item.isFeatured ? <FeaturedTag /> : <></>}
          </ImageBackground>
          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="small" color={GlobalColor} />
            </View>
          )}
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#FFF",
            height: "25%",
            width: 262 * windowWidth,
          }}
        >
          <View style={{ width: "2.5%" }}></View>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "center",
              width: 224 * windowWidth,
              height: "100%",
            }}
          >
            <View style={{ paddingTop: 4 * windowHeight, flexWrap: "wrap" }}>
              <Text style={[styles.eventTitle, globalStyles.mediumBoldFont]}>
                {item.geenName.length > 64
                  ? item.geenName.substring(0, 60) + " ..."
                  : item.geenName}
              </Text>
            </View>
            <View
              style={{ flexDirection: "row", paddingTop: 4 * windowHeight }}
            >
              <View
                style={{ alignSelf: "center", paddingLeft: 8 * windowWidth }}
              >
                <Ionicons
                  name="calendar-sharp"
                  size={8 * windowHeight}
                  color="#c4c4c4"
                />
              </View>
              <View
                style={{
                  alignSelf: "center",
                  paddingLeft: 4 * windowWidth,
                  flexWrap: "wrap",
                }}
              >
                <Text style={[styles.geenDetails, globalStyles.smallLightFont]}>
                  {timeString.substring(4, 7) +
                    " " +
                    timeString.substring(8, 10) +
                    " @" +
                    timeString.substring(16, 21)}
                </Text>
              </View>
              <View
                style={{ alignSelf: "center", paddingLeft: 8 * windowWidth }}
              >
                <FontAwesome
                  name="map-marker"
                  size={8 * windowHeight}
                  color="#c4c4c4"
                />
              </View>
              <View
                style={{ alignSelf: "center", paddingLeft: 4 * windowWidth }}
              >
                <Text
                  style={[{ color: "#86868e" }, globalStyles.smallLightFont]}
                >
                  Location
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  geenTitle: {
    color: "black",
    alignSelf: "flex-start",
    paddingLeft: 8 * windowWidth,
    //fontFamily:'KozukaLight'
  },
  geenDetails: {
    color: "#86868e",
  },
  informationCircle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    right: 44 * windowWidthLocal,
    top: 36 * windowHeightLocal,
    height: 24 * windowHeightLocal,
    width: 24 * windowHeightLocal,
    borderRadius: 12 * windowHeightLocal,
    borderColor: GlobalColor,
    borderWidth: 1,
    backgroundColor: "#ffffff",
    shadowOffset: {
      height: 4 * windowHeightLocal,
    },
    shadowColor: "black",
    shadowOpacity: 0.25,
    elevation: 2,
  },
  groupName: {
    fontSize: 20 * windowHeight,
    paddingTop: 16 * windowHeightLocal,
    fontWeight: "bold",
    color: GlobalColor,
  },
  descriptionText: {
    fontSize: 12 * windowHeight,
    color: "#86868e",
  },
  toolContainer: {
    width: 336 * windowWidthLocal,
    height: 152 * windowHeightLocal,
    borderRadius: 15,
    backgroundColor: GlobalColor,
    marginTop: 36 * windowHeightLocal,
    alignSelf: "center",
  },
  toolText: {
    color: "#ffffff",
  },
  groupSettingsText: {
    fontSize: 18 * windowHeight,
    paddingTop: 16 * windowHeightLocal,
    fontWeight: "bold",
    color: GlobalColor,
  },
  groupSettings: {
    fontSize: 16 * windowHeight,
    fontWeight: "bold",
    color: GlobalColor,
  },
  descriptionContainer: {
    width: 309 * windowWidthLocal,
    height: 125 * windowHeightLocal,
    borderWidth: 1,
    borderColor: "#c4c4c4",
    borderRadius: 15,
  },
  settingsDescriptionText: {
    color: GlobalColor,
    fontSize: 14 * windowHeight,
  },
  loadingContainer: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.7,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12 * windowHeight,
  },
  triangleCornerBottomRight: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 75 * windowHeight,
    borderTopWidth: 75 * windowWidth,
    borderRightColor: "transparent",
    borderTopColor: "#ffd700",
    transform: [{ rotate: "180deg" }],
    alignSelf: "flex-end",
    borderTopLeftRadius: 12 * windowHeight,
  },
});

export default CardItem;
