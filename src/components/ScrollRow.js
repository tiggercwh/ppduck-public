import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
  Modal,
  Animated,
  Platform,
  Pressable,
  Image,
} from "react-native";
import { Dimensions } from "react-native";
import CardItem from "./CardItem";
import {
  FlatList,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import GlobalColor from "../context/GlobalColor";

const globalStyles = require("../context/GlobalStyles");
const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;
const fontSizeAdj = windowWidth * windowHeight;
const windowRatio = fontSizeAdj;

const ScrollRow = ({
  title,
  geenArray,
  titleColor,
  onPressNavigate,
  scrollID,
  isFirstRowProfileScreen,
  inOtherUserScreen,
}) => {
  //
  //
  const renderItem = ({ item, index }) => {
    return (
      <CardItem
        key={index}
        item={item}
        onPressNavigate={() => {
          onPressNavigate(item);
        }}
      />
    );
  };

  return (
    geenArray !== null && (
      <View style={{ width: "100%", alignItems: "center" }}>
        <View style={{ width: "100%", backgroundColor: "#FFF" }}>
          <View
            style={{
              width: "100%",
              height: inOtherUserScreen ? 0 : 1,
              backgroundColor: "#e5e5e5",
            }}
          />
          <View style={{ height: 12 * windowHeight }}></View>
          <View style={{ alignSelf: "center", width: "90%" }}>
            <Text style={[{ color: "black" }, globalStyles.smallHeaderFont]}>
              {title}
            </Text>
          </View>
          <View style={{ height: 12 * windowHeight }}></View>
        </View>
        <View
          style={{
            width: "90%",
            height: 256 * windowHeight,
            backgroundColor: "#FFF",
          }}
        >
          {geenArray == null ? (
            <></>
          ) : (
            <FlatList
              overScrollMode="never"
              decelerationRate={0.1}
              data={geenArray}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              removeClippedSubviews={true} // Unmount components when outside of window
              initialNumToRender={10} // Reduce initial render amount
              maxToRenderPerBatch={5} // Reduce number in each render batch
              updateCellsBatchingPeriod={3} // Increase time between renders
              nestedScrollEnabled={true}
              horizontal
              style={{ alignContent: "center" }}
              showsHorizontalScrollIndicator={false}
            ></FlatList>
          )}
        </View>
        <View style={{ height: 12 * windowHeight }}></View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  eventTitle: {
    fontSize: 8 * fontSizeAdj,
    color: "black",
    fontWeight: "bold",
    alignSelf: "flex-start",
    paddingLeft: 8 * windowWidth,
  },
  eventDetails: {
    fontSize: 8 * fontSizeAdj,
    color: "#86868e",
  },
  informationCircle: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    right: 44 * windowWidth,
    top: 36 * windowHeight,
    height: 24 * windowHeight,
    width: 24 * windowHeight,
    borderRadius: 12 * windowHeight,
    borderColor: GlobalColor,
    borderWidth: 1,
    backgroundColor: "#ffffff",
    shadowOffset: {
      height: 4 * windowHeight,
    },
    shadowColor: "black",
    shadowOpacity: 0.25,
    elevation: 2,
  },
  groupName: {
    fontSize: 20 * fontSizeAdj,
    paddingTop: 16 * windowHeight,
    fontWeight: "bold",
    color: GlobalColor,
  },
  descriptionText: {
    fontSize: 12 * fontSizeAdj,
    color: "#86868e",
  },
  toolContainer: {
    width: 336 * windowWidth,
    height: 152 * windowHeight,
    borderRadius: 15,
    backgroundColor: GlobalColor,
    marginTop: 36 * windowHeight,
    alignSelf: "center",
  },
  toolText: {
    fontSize: 10 * windowHeight,
    fontWeight: "bold",
    color: "#ffffff",
  },
  groupSettingsText: {
    fontSize: 18 * windowHeight,
    paddingTop: 16 * windowHeight,
    fontWeight: "bold",
    color: GlobalColor,
  },
  groupSettings: {
    fontSize: 16 * fontSizeAdj,
    fontWeight: "bold",
    color: GlobalColor,
  },
  descriptionContainer: {
    width: 309 * windowWidth,
    height: 125 * windowHeight,
    borderWidth: 1,
    borderColor: "#c4c4c4",
    borderRadius: 15,
  },
  settingsDescriptionText: {
    color: GlobalColor,
    fontSize: 14 * fontSizeAdj,
  },
});
export default ScrollRow;
