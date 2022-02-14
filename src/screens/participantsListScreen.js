import React, { useState, useRef, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  TextInput,
  Platform,
  Dimensions,
  SafeAreaView,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import GlobalColor from "../context/GlobalColor";

const globalStyles = require("../context/GlobalStyles");
const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;

const ParticipantsListScreen = ({ navigation, route }) => {
  const { Geen } = route.params;

  const ParticipantItem = (participant) => {
    return (
      <View>
        <Image
          style={{
            width: 96 * windowWidth,
            height: 96 * windowWidth,
            borderRadius: 48 * windowWidth,
            borderColor: GlobalColor,
            borderWidth: 1,
          }}
          source={{ uri: participant.participant.user.image }}
        />
        <Text
          style={[
            globalStyles.mediumLightFont,
            { alignSelf: "center", marginTop: 8 * windowHeight },
          ]}
        >
          {participant.participant.user.name}
        </Text>
      </View>
    );
  };

  return (
    <View
      style={{
        backgroundColor: "#FFF",
        width: "100%",
        paddingTop: 64 * windowHeight,
        paddingHorizontal: 16 * windowWidth,
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            navigation.goBack(1);
          }}
          style={{ width: 36 * windowWidth }}
        >
          <Ionicons name="chevron-back-sharp" size={24 * windowHeight} />
        </TouchableOpacity>
        <Text style={globalStyles.mediumLightFont}>Participants List</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            width: 36 * windowWidth,
          }}
        >
          <FontAwesome5
            name="user-friends"
            size={12 * windowHeight}
            color={"black"}
            style={{ alignSelf: "center" }}
          />
          <Text style={[globalStyles.smallLightFont]}>
            {Geen.participants.items.length}
          </Text>
        </View>
      </View>
      <ScrollView
        style={{ marginTop: 48 * windowWidth, height: "100%" }}
        overScrollMode="never"
      >
        <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
          {Geen.participants.items.map((participant, index) => {
            return <ParticipantItem participant={participant} key={index} />;
          })}
        </View>
      </ScrollView>
    </View>
  );
};

ParticipantsListScreen.navigationOptions = () => {
  return {
    headerShown: true,
  };
};

const styles = StyleSheet.create({});

export default ParticipantsListScreen;
