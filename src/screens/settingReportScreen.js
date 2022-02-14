import React, {
  useState,
  useEffect,
  Component,
  useRef,
  useContext,
} from "react";
import {
  View,
  Text,
  Platform,
  Modal,
  Dimensions,
  StyleSheet,
  KeyboardAvoidingView,
  SafeAreaView,
  Pressable,
  Keyboard,
  Animated,
  StatusBar,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DropDownPicker from "react-native-dropdown-picker";

import {
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import Button from "../components/Button";

import { API, graphqlOperation } from "aws-amplify";
import { createReport } from "../graphql/mutations";

const globalStyles = require("../context/GlobalStyles");
const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;
const windowRatio = windowWidth * windowHeight;
import GlobalColor from "../context/GlobalColor";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  Entypo,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";

const SettingReportScreen = ({ navigation, route }) => {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [open2, setOpen2] = useState(false);
  const [value2, setValue2] = useState(null);
  const [items, setItems] = useState([
    { label: "User", value: "User" },
    { label: "Geen", value: "Geen" },
  ]);
  const { chatContent, chatToReport, chatSender, isImage, chatTime } =
    route.params;
  const [reportType, setReportType] = useState("");
  const [reportCategory, setReportCategory] = useState("");
  const [reportDescription, setReportDescription] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [shouldRefresh, setShouldRefresh] = useState(true);
  const [shouldRefreshDescription, setShouldRefreshDescription] =
    useState(true);
  const [containerHeight, setHeight] = useState(0);
  const opacity0 = useState(new Animated.Value(1))[0];
  const opacity1 = useState(new Animated.Value(1))[0];

  function fadeIn0() {
    Animated.timing(opacity0, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  function fadeIn1() {
    Animated.timing(opacity1, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  function headerStyle() {
    return {
      fontSize: 24 * windowHeight,
      color: GlobalColor,
      fontWeight: "bold",
      paddingLeft: 8 * windowWidth,
      alignSelf: "center",
    };
  }

  const [typeItems, setTypeItems] = useState([
    { label: "User", value: "User" },
    { label: "Event", value: "Event" },
    { label: "Group", value: "Group" },
  ]);

  const [categoryUserItems, setCategoryUserItems] = useState([
    { label: "Spam account", value: "Spam account" },
    { label: "Fake name", value: "Fake name" },
    { label: "Pretending to be someone", value: "Pretending to be someone" },
  ]);

  const [categoryEventItems, setCategoryEventItems] = useState([
    { label: "Harassment", value: "Harassment" },
    { label: "Nudity", value: "Nudity" },
    { label: "Spam", value: "Spam" },
    { label: "Fraud", value: "Fraud" },
    { label: "Fake events", value: "Fake events" },
    { label: "Suicide or self-injury", value: "Suicide or self-injury" },
    { label: "Violence", value: "Violence" },
    { label: "Hate speech", value: "Hate speech" },
    { label: "Racist", value: "Racist" },
    { label: "Others", value: "Something else" },
  ]);

  useEffect(() => {
    console.log("updated successfully");
  }, [shouldRefresh]);

  async function addReport(report) {
    try {
      const reportdata = await API.graphql(
        graphqlOperation(createReport, { input: report })
      );
      return reportdata.data.createReport;
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
      enabled={Platform.OS === "ios" ? false : false}
      style={{ flex: 1, backgroundColor: "#FFF" }}
    >
      <SafeAreaView
        onLayout={(event) => {
          var { height } = event.nativeEvent.layout;
          setHeight(height);
        }}
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
            Report an issue
          </Text>
        </View>
        {chatToReport ? (
          <View
            style={{
              paddingTop: 24 * windowHeight,
              zIndex: 3,
              flexDirection: "row",
              width: "100%",
            }}
            onLayout={() => {
              setReportType("User");
              setShouldRefresh(true);
              setTimeout(() => {
                setShouldRefresh(false);
                opacity0.setValue(0);
                fadeIn0();
              }, 500);
            }}
          >
            <Text
              style={[
                globalStyles.smallBoldFont,
                styles.subTitleFont,
                { paddingRight: 2 * windowWidth },
              ]}
            >
              {" "}
              {chatSender}{" "}
            </Text>
            {isImage == "true" ? (
              <>
                <Text
                  style={[globalStyles.smallLightFont, styles.subTitleFont]}
                >
                  sent{" "}
                </Text>

                <Text style={[globalStyles.smallBoldFont, { color: "red" }]}>
                  an Image{" "}
                </Text>
                <Text
                  style={[globalStyles.smallLightFont, styles.subTitleFont]}
                >
                  at {chatTime}.
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={[globalStyles.smallLightFont, styles.subTitleFont]}
                >
                  said:{" "}
                </Text>
                <Text
                  style={[
                    globalStyles.smallBoldFont,
                    { color: "red", width: "80%" },
                  ]}
                  numberOfLines={3}
                >
                  {chatContent.length > 100
                    ? chatContent.substring(0, 99) + " ..."
                    : chatContent}
                </Text>
              </>
            )}
          </View>
        ) : (
          <View
            style={{
              borderWidth: 0,
              alignItems: "flex-start",
              justifyContent: "flex-start",
              width: "90%",
              alignSelf: "center",
              paddingTop: 12 * windowHeight,
              zIndex: 300,
              height: open ? 200 * windowHeight : 108 * windowHeight,
            }}
          >
            <Text style={[globalStyles.mediumLightFont, styles.subTitleFont]}>
              Report Type:
            </Text>
            <View style={{ height: 12 * windowHeight }} />
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              style={{
                backgroundColor: "#e5e5e5",
                borderColor: "#e5e5e5",
              }}
              textStyle={[globalStyles.smallLightFont, { color: "#86868e" }]}
              onOpen={() => {
                //  setShouldRefresh(false)
                setOpen2(false);
              }}
              onChangeValue={(value) => {
                console.log(shouldRefresh);
                console.log("Now user set option as : " + value);
                setReportType(value);
                //console.log("Now user set option as : " + value)
                setReportCategory("Please select a problem");
                setReportDescription("");
                setShouldRefresh(true);
                console.log(shouldRefresh);
                setOpen2(false);
                setTimeout(() => {
                  setShouldRefresh(false);
                  opacity0.setValue(0);
                  fadeIn0();
                }, 10);
              }}
            />
          </View>
        )}
        <View style={{ height: 12 * windowHeight }} />
        {shouldRefresh === true || open ? null : (
          <View
            style={{
              //opacity: opacity0 !== undefined ? opacity0 : 1, borderWidth: 0,
              borderWidth: 0,
              alignItems: "flex-start",
              justifyContent: "flex-start",
              width: "90%",
              alignSelf: "center",
              paddingTop: 12 * windowHeight,
              zIndex: 5,
              height: open2 ? 500 * windowHeight : 108 * windowHeight,
            }}
          >
            <Text style={[globalStyles.mediumLightFont, styles.subTitleFont]}>
              How would you describe it?
            </Text>
            <View style={{ height: 12 * windowHeight }} />
            <DropDownPicker
              open={open2}
              value={value2}
              items={
                reportType === "User" ? categoryUserItems : categoryEventItems
              }
              setOpen={setOpen2}
              setValue={setValue2}
              setItems={
                reportType === "User"
                  ? setCategoryUserItems
                  : setCategoryEventItems
              }
              style={{
                backgroundColor: "#e5e5e5",
                borderColor: "#e5e5e5",
              }}
              textStyle={[globalStyles.smallLightFont, { color: "#86868e" }]}
              onChangeItem={(value) => {
                setReportCategory(value.value);
                setReportDescription("");
                setShouldRefreshDescription(true);
                setTimeout(() => {
                  setShouldRefreshDescription(false);
                  opacity1.setValue(0);
                  fadeIn1();
                }, 10);
              }}
            />
          </View>
        )}

        {shouldRefresh === true || open || open2 ? null : (
          <Animated.View
            style={{
              paddingTop: 24 * windowHeight,
              opacity: opacity1 !== undefined ? opacity1 : 0,
              width: "90%",
              alignSelf: "center",
            }}
          >
            <Text style={[globalStyles.mediumLightFont, styles.subTitleFont]}>
              Details (e.g. User Name, Geen Name)
            </Text>
            <View style={{ height: 12 * windowHeight }} />
            <ScrollView
              style={styles.descriptionContainer}
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
            >
              <View
                style={{
                  paddingHorizontal: 14 * windowWidth,
                  paddingTop: 6 * windowHeight,
                }}
              >
                <TextInput
                  value={reportDescription}
                  onChangeText={(text) => {
                    setReportDescription(text);
                  }}
                  style={[{ color: "#868683" }, globalStyles.smallLightFont]}
                  textAlign="left"
                  returnKeyType="done"
                  blurOnSubmit={true}
                  multiline={true}
                ></TextInput>
              </View>
            </ScrollView>
          </Animated.View>
        )}
      </SafeAreaView>
      <View
        style={{
          position: "absolute",
          bottom: 86 * windowHeight,
          width: "100%",
          alignItems: "center",
        }}
      >
        <Button
          handlePress={async () => {
            console.log(value, value2);
            const report = await addReport({
              reportUser: "UserID",
              reportGeen: "GeenID",
              reportCategory: value ?? "reportCategory",
              reportDetails: value2 ?? "reportDetails",
            });
            console.log(report);
            setModalVisible(true);
          }}
          buttonText="Submit"
          width={130 * windowWidth}
          height={28 * windowHeight}
        />
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              style={[
                { color: "#86868e", paddingBottom: 24 * windowHeight },
                globalStyles.largeLightFont,
              ]}
            >
              Thank you for reporting this issue.
            </Text>
            <Button
              buttonText={"Done"}
              handlePress={() => {
                setModalVisible(!modalVisible);
                navigation.pop();
              }}
              width={108 * windowWidth}
              height={32 * windowHeight}
            />
          </View>
        </View>
      </Modal>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  dropdownOneStyle: {},
  dropdownBox: {
    backgroundColor: "#FFF",
    borderColor: "#e5e5e5",
  },
  dropdownBoxContainer: {
    width: "100%",
    height: 36 * windowHeight,
    backgroundColor: "#FFF",
    borderRadius: 12 * windowHeight,
  },
  dropdownText: {
    color: "#86868e",
    alignSelf: "center",
    alignItems: "flex-start",
  },
  subTitleFont: {
    color: "#86868e",
  },
  descriptionContainer: {
    width: "100%",
    height: 164 * windowHeight,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 10 * windowHeight,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    paddingHorizontal: 10 * windowWidth,
    height: 24 * windowHeight,
    justifyContent: "center",
  },
  buttonClose: {
    backgroundColor: GlobalColor,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
});

export default SettingReportScreen;
