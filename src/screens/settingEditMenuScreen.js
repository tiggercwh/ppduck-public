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
import { SafeAreaView } from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { StatusBar } from "react-native";
import { Context as UserContext } from "../context/UserContext";
import GlobalColor from "../context/GlobalColor";

const globalStyles = require("../context/GlobalStyles");
const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;
import DummyUser from "../context/DummyUser";

const SettingEditMenuScreen = ({ navigation, route, signOut }) => {
  // const { userProfile } = route.params
  const userProfile = DummyUser;

  const { state: user } = useContext(UserContext);

  return (
    <View style={{ flex: 1, backgroundColor: "#FFF" }}>
      <SafeAreaView
        style={{
          width: "100%",
          height: "100%",
          alignSelf: "center",
          backgroundColor: "#FFF",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <View
          style={{
            height: 64 * windowHeight,
            justifyContent: "flex-start",
            width: "100%",
            flexDirection: "row",
            alignItems: "center",
            paddingTop: 24 * windowHeight,
            paddingBottom: 6 * windowHeight,
            width: "85%",
            alignSelf: "center",
          }}
        >
          <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
            <Ionicons
              name="chevron-back-sharp"
              size={20 * windowHeight}
              color="black"
            />
          </TouchableWithoutFeedback>

          <Text style={[headerStyle(), globalStyles.headerFont]}>
            Edit Profile
          </Text>
        </View>

        <View style={{ width: "85%", alignSelf: "center" }}>
          <FloatingCardItem
            title="Name"
            value={user.name}
            onPressNavigate={() => {
              navigation.navigate("SettingEditDetail", {
                showContentType: "0",
                userProfile: user,
              });
            }}
          />

          <FloatingCardItem title="Email Address" value={user.email} />

          <FloatingCardItem
            title="Password"
            value="********"
            onPressNavigate={() => {
              navigation.navigate("SettingEditDetail", {
                showContentType: "1",
                userProfile: user,
              });
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
SettingEditMenuScreen.navigationOptions = () => {
  return {
    headerShown: true,
  };
};

const styles = StyleSheet.create({});

function headerStyle() {
  return {
    fontSize: 24 * windowHeight,
    color: GlobalColor,
    fontWeight: "bold",
    paddingLeft: 8 * windowWidth,
  };
}
const FloatingCardItem = ({ title, value, onPressNavigate }) => {
  return (
    <TouchableWithoutFeedback onPress={onPressNavigate}>
      <View style={{ height: 24 * windowHeight }} />
      <View
        style={{
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
            width: "75%",
            height: 72 * windowHeight,
            justifyContent: "center",
          }}
        >
          <Text style={[{ color: "#86868E" }, globalStyles.mediumBoldFont]}>
            {title}
          </Text>
          <View style={{ height: 6 * windowHeight }} />
          <Text style={globalStyles.smallSemiFont}>{value}</Text>
        </View>
        {title === "Email Address" ? null : (
          <View
            style={{
              alignContent: "flex-end",
              width: "20%",
              height: 72 * windowHeight,
              alignItems: "center",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            <MaterialIcons
              name="edit"
              size={24 * windowHeight}
              color={GlobalColor}
            />
          </View>
        )}
      </View>
      <View style={{ height: 12 * windowHeight }} />
    </TouchableWithoutFeedback>
  );
};

const userInterest = [
  "Technology",
  "Sports & Fitness",
  "Religion",
  "Pets",
  "Career & Business",
];
function circleColorConvert(categroy) {
  switch (categroy) {
    case "Outdoors & Adventure":
      return "#a3bfcf";

    case "Technology":
      return "#d03b2c";

    case "Family":
      return "#a9aaa8";

    case "Health & Fitness":
      return "#ffc4f9";

    case "Sports & Fitness":
      return "#355151";

    case "Learning":
      return "#caaa8b";

    case "Photography":
      return "#f5030c";

    case "Food & Drink":
      return "#ea4300";

    case "Writing":
      return "#dd9096";

    case "Language & Culture":
      return "#fc8f25";

    case "Music":
      return "#9e78e4";

    case "Film":
      return "#7b1d21";

    case "Religion":
      return "#55371f";

    case "Arts":
      return "#bd73ac";

    case "Books":
      return "#f3bdca";

    case "Pets":
      return "#02bd69";

    case "Dance":
      return "#1452a7";

    case "Fashion & Beauty":
      return "#85d2e7";

    case "Hobbies & Crafts":
      return "#e6b624";

    case "Career & Business":
      return "#fd5f22";

    case "Finance":
      return "#dce0e7";

    default:
      return "gray";
  }
}

const tempGroupItems = [
  {
    groupName: "Video Shooting Interest Group",
    groupType: "Photography",
    groupMember: 54,
    groupActivityLevel: 0.8,
    groupDescription: "We are a group of stupid ass who film daily",
    groupBannerPhoto:
      "https://wordstream-files-prod.s3.amazonaws.com/s3fs-public/styles/simple_image/public/images/editing-marketing-videos-shoot.jpg?OYreWPCZvgBInvTo5ycLLRfK4w.2K3l_&itok=8nq2LSpl",
    privateAccess: false,
  },
  {
    groupName: "App Development - React Native",
    groupType: "Technology",
    groupMember: 14,
    groupActivityLevel: 0.6,
    groupDescription: "Want to build an app? Join us!",
    groupBannerPhoto:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2F1z1euk35x7oy36s8we4dr6lo-wpengine.netdna-ssl.com%2Fwp-content%2Fuploads%2F2020%2F08%2Fzymr8_steps_the_mobile_app_dev_lifecycle_cover.jpg&imgrefurl=https%3A%2F%2Fwww.businessofapps.com%2Finsights%2Fessentials-of-mobile-app-development-lifecycle-that-appreneurs-must-know%2F&tbnid=LWVX5p3IZ9qBkM&vet=12ahUKEwimyuHJzZXvAhULUpQKHeAGC_oQMygDegUIARDPAQ..i&docid=dmDva6lqlrCn0M&w=750&h=456&q=app%20development&client=firefox-b-d&ved=2ahUKEwimyuHJzZXvAhULUpQKHeAGC_oQMygDegUIARDPAQ",
    privateAccess: false,
  },
  {
    groupName: "Night Jogging - Kwun Tong",
    groupType: "Sports & Fitness",
    groupMember: 62,
    groupActivityLevel: 0.72,
    groupDescription: "Jog Daily to keep fit!",
    groupBannerPhoto:
      "https://www.google.com/imgres?imgurl=https%3A%2F%2Fwww.weizmann-usa.org%2Fmedia%2F4112%2F12436724-6936629-image-m-46_1555597433319.jpg&imgrefurl=https%3A%2F%2Fwww.weizmann-usa.org%2Fnews-media%2Fin-the-news%2Fscrap-that-early-morning-jog-evening-exercise-appears-to-be-better-for-you-because-your-body-uses-up-less-oxygen-two-studies-find%2F&tbnid=t2CiytrdOiz0WM&vet=12ahUKEwjf_cnYzpXvAhV70IsBHc5QAPcQMygFegUIARC8AQ..i&docid=hUctNmExRX2NPM&w=634&h=444&q=night%20jog&client=firefox-b-d&ved=2ahUKEwjf_cnYzpXvAhV70IsBHc5QAPcQMygFegUIARC8AQ",
    privateAccess: false,
  },
];

const tempFeaturedEventItems = [
  {
    eventName: "Muse Art Jam - Create your own piece of ARTWORK!",
    eventLocation: "Mong Kok",
    eventType: "Art",
    eventDescription:
      "Unleash your muse  at this hipster-friendly art jamming workshop. Bask in natural light, a faux vertical garden and a cup of herbal tea before picking up your paintbrush. You can show up empty handed – just bring your enthusiasm – as the venue provides all the tools you need to create your masterpiece. Choose to recreate your favourite painting or pick from one of the reference works – Disney ones and night sky landscapes are particularly popular. There are art tutors on hand to provide guidance.",
    eventPhoto: "https://media.timeout.com/images/105291232/750/422/image.jpg",
    eventTime: "2021-03-14",
    publicAccess: "true",
    maximumParti: 50,
    hostID: "1",
  },
  {
    eventName: "Weekly Hike - Tai Mo Shan 03 11",
    eventLocation: "Tsuen Wan",
    eventType: "Outdoor & Adventures",
    eventDescription:
      "Let's go out and explore the beauty of this city. Nature is good!",
    eventPhoto: "https://media.timeout.com/images/105715735/1024/576/image.jpg",
    eventTime: "2021-03-11",
    publicAccess: "true",
    maximumParti: 50,
    hostID: "2",
  },
  {
    eventName: "Beat the nature series - Let's hike 4,494 hectares",
    eventLocation: "Sai Kung",
    eventType: "Outdoor & Adventures",
    eventDescription:
      "This mammoth area – a huge 4,494 hectares – encompasses everything that’s great about natural Hong Kong – beautiful beaches, hiking trails, grassy slopes, hills and coves. Don’t expect to come and do it all in one day. Plan ahead, take your time and enjoy.",
    eventPhoto:
      "https://images.unsplash.com/photo-1553531384-397c80973a0b?ixid=MXwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80",
    eventTime: "2021-03-11",
    publicAccess: "true",
    maximumParti: 50,
    hostID: "3",
  },
  {
    eventName: "React Native Bootcamp FOR FREE",
    eventLocation: "Prince Edward",
    eventType: "Technology",
    eventDescription:
      "Tech has become very important during the pandemic. Let's do a designt thinkning workshop and rethink how the society could be constructed from scratch!",
    eventPhoto:
      "https://3x5yp62s8loz3jw8273enqos16xh-wpengine.netdna-ssl.com/wp-content/uploads/react-native-thumb-1024x640.png",
    eventTime: "2021-03-15",
    publicAccess: "true",
    maximumParti: 50,
    hostID: "4",
  },
  {
    eventName: "3 TIPS TO PET A PUPPY - CALLING FOR 1ST TIME PET PARENTS",
    eventLocation: "Sai Kung",
    eventType: "Pet",
    eventDescription:
      "We are a group of animal lovers that know how to take care of your pets WELL. Come join us and learn how to pet and train your cutie puppy!",
    eventPhoto:
      "https://s3.amazonaws.com/cdn-origin-etr.akc.org/wp-content/uploads/2020/07/09151754/Golden-Retriever-puppy-standing-outdoors.jpg",
    eventTime: "2021-03-13",
    publicAccess: "true",
    maximumParti: 50,
    hostID: "5",
  },
];

export default SettingEditMenuScreen;
