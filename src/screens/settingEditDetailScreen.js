import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  Pressable,
  Image,
} from "react-native";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native";
import {
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  Entypo,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import BoxInput from "../components/BoxInput";
import Button from "../components/Button";

import { Auth } from "aws-amplify";
import { Alert } from "react-native";
import { Context as UserContext } from "../context/UserContext";
import GlobalColor from "../context/GlobalColor";

//////////////////To access routename//////////////////
// import { useRoute } from '@react-navigation/native';
// const route = useRoute();
// useEffect(() => { console.log(route) }, []);
///////////////////////////////////////////////////////
const globalStyles = require("../context/GlobalStyles");
const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;

const SettingEditDetailScreen = ({ navigation, route }) => {
  const { updateUserinfo } = useContext(UserContext);
  const { userProfile } = route.params;
  const { showContentType } = route.params;
  const [email, setEmail] = useState(userProfile.email);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [username, setUsername] = useState();
  const [containerHeight, setHeight] = useState(0);
  let input1Ref = React.useRef(null);
  let input2Ref = React.useRef(null);
  let input3Ref = React.useRef(null);
  const [selectedCategory, setSelectedCategory] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [showWarning, setShowWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectMore, setSelectMore] = useState(false);

  const [error, setError] = useState(false);

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
            paddingTop:
              showContentType === "2" ? 24 * windowHeight : 24 * windowHeight,
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
            {showContentType === "0"
              ? "Display Name"
              : showContentType === "1"
              ? "Password"
              : "Interest & Hobbies"}
          </Text>
        </View>
        <View style={{ height: 24 * windowHeight }} />
        <View style={{ width: "85%", alignSelf: "center" }}>
          <Text style={[{ color: "#86868E" }, globalStyles.smallLightFont]}>
            {showContentType === "0"
              ? "What is your name?"
              : showContentType === "1"
              ? "How do you login?"
              : "What are you interested in?"}
          </Text>
        </View>

        <View style={{ height: 24 * windowHeight }} />
        {showContentType === "0" ? (
          <View
            style={{
              width: "100%",
              height: 72 * windowHeight,
              alignContent: "center",
              justifyContent: "center",
              flexDirection: "row",
            }}
          >
            <BoxInput
              title={userProfile.name}
              width={256 * windowWidth}
              height={windowHeight * 36}
              fontSize={12 * windowHeight}
              value={username}
              onChange={setUsername}
              textAlignCenter
              inputRef={input1Ref}
              shouldFocus
            />
            <View style={{ alignSelf: "center", marginLeft: 8 * windowWidth }}>
              <Text style={[{ color: "#86868e" }, globalStyles.smallSemiFont]}>
                {username ? username.length : 0}
              </Text>
            </View>
          </View>
        ) : null}

        {showContentType === "1" ? (
          <>
            <View
              style={{
                width: "100%",
                height: 72 * windowHeight,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <BoxInput
                title="Old Password"
                width={256 * windowWidth}
                height={windowHeight * 36}
                fontSize={12 * windowHeight}
                value={password}
                onChange={setPassword}
                secureTextEntry
                textAlignCenter
                inputRef={input1Ref}
                shouldFocus
              />
            </View>
            <View
              style={{
                width: "100%",
                height: 72 * windowHeight,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <BoxInput
                title="New Password"
                width={256 * windowWidth}
                height={windowHeight * 36}
                fontSize={12 * windowHeight}
                value={newPassword}
                onChange={setNewPassword}
                secureTextEntry
                textAlignCenter
              />
            </View>
            <View
              style={{
                width: "100%",
                height: 72 * windowHeight,
                alignContent: "center",
                justifyContent: "center",
              }}
            >
              <BoxInput
                title="Confirm New Password"
                width={256 * windowWidth}
                height={windowHeight * 36}
                fontSize={12 * windowHeight}
                value={confirmNewPassword}
                onChange={setConfirmNewPassword}
                secureTextEntry
                textAlignCenter
              />
            </View>
          </>
        ) : null}

        {username ? (
          username.length > 16 ? (
            <View style={{ marginTop: 16 * windowHeight, alignSelf: "center" }}>
              <Text style={[{ color: "red" }, globalStyles.smallSemiFont]}>
                Your username should contain 1 to 16 characters.
              </Text>
            </View>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}
        {newPassword ? (
          newPassword.length < 6 ? (
            <View style={{ marginTop: 16 * windowHeight, alignSelf: "center" }}>
              <Text style={[{ color: "red" }, globalStyles.smallSemiFont]}>
                Your password should contain at least 6 charaters.
              </Text>
            </View>
          ) : (
            <></>
          )
        ) : (
          <></>
        )}

        <View
          style={{
            position: "absolute",
            bottom:
              showContentType === "2" ? 86 * windowHeight : 254 * windowHeight,
            width: "100%",
            alignItems: "center",
          }}
        >
          <Button
            handlePress={async () => {
              if (showContentType === "0") {
                if (username.length > 16) {
                  return;
                } else {
                  await updateUserinfo({ id: userProfile.id, name: username });
                }
              } else if (showContentType === "1") {
                if (newPassword.length < 6) {
                  return;
                }
                if (newPassword === confirmNewPassword) {
                  try {
                    await Auth.currentAuthenticatedUser().then((user) => {
                      return Auth.changePassword(user, password, newPassword);
                    });
                  } catch (err) {
                    setError(true);
                    setModalVisible(true);
                    setWarningMessage(err.message);
                    return;
                  }
                  navigation.pop();
                } else {
                  setError(true);
                  setModalVisible(true);
                  setWarningMessage(
                    "New Password and Confirm New Password does not match."
                  );
                  return;
                }
              }
              setWarningMessage("You have updated your profile information.");
              setModalVisible(true);
            }}
            buttonText="Confirm"
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
                {warningMessage}
              </Text>
              <Button
                buttonText={"Done"}
                handlePress={() => {
                  if (!error) {
                    setError(false);
                    navigation.pop();
                  } else {
                    setError(false);
                    setModalVisible(!modalVisible);
                  }
                }}
                width={108 * windowWidth}
                height={32 * windowHeight}
              />
            </View>
          </View>
        </Modal>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

SettingEditDetailScreen.navigationOptions = () => {
  return {
    headerShown: true,
  };
};

const styles = StyleSheet.create({
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

function headerStyle() {
  return {
    fontSize: 24 * windowHeight,
    color: GlobalColor,
    fontWeight: "bold",
    paddingLeft: 8 * windowWidth,
    alignSelf: "center",
  };
}

export default SettingEditDetailScreen;
