import React, { useContext, useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  ActivityIndicator,
  Pressable,
  Image,
  Dimensions,
} from "react-native";
import {
  TouchableHighlight,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";
const globalStyles = require("../context/GlobalStyles");
const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;
import ScrollRow from "../components/ScrollRow";
import { useFocusEffect } from "@react-navigation/native";

import { Menu, Divider, Provider as MenuProvider } from "react-native-paper";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  Entypo,
  MaterialIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import DummyData from "../context/DummyData";
import * as ImagePicker from "expo-image-picker";
import { Auth, Storage } from "aws-amplify";

import { Context as UserContext } from "../context/UserContext";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as GeenContext } from "../context/GeenContext";
import GlobalColor from "../context/GlobalColor";

const SettingProfileScreen = ({ navigation }) => {
  const [uploadStatus, setUploadStatus] = useState("");
  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.4,
      allowsMultipleSelection: true,
    });
    return result;
  };
  const uploadToStorage = async (image, userID) => {
    return storeFileInS3(image.uri, userID + ".jpeg");
  };
  const storeFileInS3 = async (fileUri, awsKey = null, access = "public") => {
    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", fileUri, true);
      xhr.send(null);
    });
    const { name, type } = blob._data;
    const options = {
      level: access,
      contentType: type,
    };
    const key = awsKey || name;
    try {
      //console.log("checkpoint")
      const result = await Storage.put(key, blob, options);
      return {
        access,
        key: result.key,
      };
    } catch (err) {
      throw err;
    }
  };

  let today = new Date();

  const {
    state: user,
    getUserData_Login,
    socialLogin,
    logoutRefresh,
    guestSignUp,
    updateUserinfo,
  } = useContext(UserContext);
  const { state: isAuth, refreshAuthStatus } = useContext(AuthContext);
  const { state: geen, getOneGeen } = useContext(GeenContext);

  const [containerHeight, setHeight] = useState(0);
  const [isIconLoading, setIconLoading] = useState(true);
  let mainScrollRef = React.useRef(null);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showGuestSignUp, setShowGuestSignUp] = useState(
    user == "Guest" ? true : false
  );

  useFocusEffect(
    React.useCallback(() => {
      setShowGuestSignUp(user == "Guest" ? true : false);
    }, [])
  );
  useEffect(() => {
    console.log(user);
  }, []);

  const openMenu = () => setMenuVisible(true);

  const closeMenu = () => setMenuVisible(false);
  return (
    <>
      {user == "Guest" ? (
        <View style={{ flex: 1 }}>
          <Modal visible={showGuestSignUp} animationType="slide">
            <TouchableOpacity
              style={{
                position: "absolute",
                top: 24 * windowHeight,
                left: 32 * windowWidth,
                zIndex: 2,
              }}
              onPress={() => {
                setShowGuestSignUp(false);
                navigation.navigate("CenterMap");
              }}
            >
              <Entypo name="cross" size={36 * windowHeight} />
            </TouchableOpacity>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <View style={{ backgroundColor: "white", alignItems: "center" }}>
                <Text style={[globalStyles.mediumSemiFont, { color: "black" }]}>
                  Sign up now to enjoy our full Geen functions!
                </Text>
                <Pressable
                  onPress={async () => {
                    await guestSignUp();
                  }}
                  style={{
                    width: 144 * windowWidth,
                    height: 36 * windowHeight,
                    backgroundColor: GlobalColor,
                    borderRadius: 16 * windowHeight,
                    justifyContent: "center",
                    marginTop: 24 * windowHeight,
                  }}
                >
                  <Text
                    style={[
                      globalStyles.mediumSemiFont,
                      { alignSelf: "center", color: "#FFF" },
                    ]}
                  >
                    Register Now
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
      ) : (
        <MenuProvider>
          <View
            style={{ height: "100%", width: "100%", backgroundColor: "#FFF" }}
          >
            <KeyboardAvoidingView
              behavior={Platform.OS == "ios" ? "padding" : "height"}
              keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
              enabled={Platform.OS === "ios" ? false : false}
              style={styles.skeyboardAvoidingViewStyle}
            >
              <SafeAreaView
                onLayout={(event) => {
                  var { height } = event.nativeEvent.layout;
                  setHeight(height);
                }}
                style={styles.safeAreaViewStyle}
              >
                <View style={styles.settingIconBoxStyle}>
                  <Menu
                    visible={menuVisible}
                    onDismiss={closeMenu}
                    anchor={
                      <TouchableOpacity onPress={openMenu}>
                        <Entypo
                          name="dots-three-horizontal"
                          size={24 * windowHeight}
                          color={GlobalColor}
                        />
                      </TouchableOpacity>
                    }
                  >
                    <Menu.Item
                      onPress={() => {
                        closeMenu();
                        pickImage();
                      }}
                      title="Change Photo"
                      icon="face-profile"
                    />
                    <Menu.Item
                      onPress={() => {
                        closeMenu();
                        navigation.navigate("SettingEditMenu", {
                          showContentType: "0",
                        });
                      }}
                      title="Edit Details"
                      icon="pencil"
                    />
                    <Menu.Item
                      onPress={() => {
                        closeMenu();
                        navigation.navigate("SettingReport", {
                          chatToReport: false,
                        });
                      }}
                      title="Report Issue"
                      icon="alert"
                    />
                    <Menu.Item
                      onPress={() => {
                        closeMenu();
                        navigation.navigate("Tutorial", {
                          email: "Prof",
                          password: "Prof",
                        });
                      }}
                      title="Tutorial"
                      icon="book-open-variant"
                    />
                    <Divider />
                    <Menu.Item
                      onPress={async () => {
                        closeMenu();
                        Auth.signOut().then(() =>
                          refreshAuthStatus().then(() => logoutRefresh())
                        );
                      }}
                      title="Sign Out"
                      icon="exit-to-app"
                    />
                  </Menu>
                </View>

                <View style={styles.topBoxStyle}>
                  <View style={styles.topLeftSubBoxStyle}>
                    <TouchableOpacity
                      onPress={async () => {
                        //Setting Buttons Pressed
                        // console.log(result)
                        pickImage().then(async (result) => {
                          console.log("This is the result");
                          console.log(result);
                          if (!result.cancelled) {
                            console.log("Uploading");
                            await uploadToStorage(
                              result,
                              "UserPhotos/" + user.id
                            );
                            console.log("Uploaded");
                            if (
                              user.image !=
                              "https://geenmeenlaunchbetaae66bc22f46b468d81f5d5fdf4696130851-dev.s3.us-east-2.amazonaws.com/public/UserPhotos/" +
                                user.id +
                                ".jpeg"
                            ) {
                              updateUserinfo({
                                id: user.id,
                                image:
                                  "https://geenmeenlaunchbetaae66bc22f46b468d81f5d5fdf4696130851-dev.s3.us-east-2.amazonaws.com/public/UserPhotos/" +
                                  user.id +
                                  ".jpeg",
                              });
                            }
                            console.log("Updated User Info");
                          }
                        });
                      }}
                    >
                      {user.image !== "" ? (
                        <View style={styles.userPhotoBorderStyle}>
                          <Image
                            onLoadStart={() => setIconLoading(true)}
                            onLoadEnd={() => {
                              setIconLoading(false);
                            }}
                            style={styles.userPhotoStyle}
                            source={{ uri: user.image }}
                          />
                          {isIconLoading && (
                            <View
                              style={[
                                styles.loadingContainer,
                                { borderRadius: 86 * windowHeight },
                              ]}
                            >
                              <ActivityIndicator
                                size="small"
                                color={GlobalColor}
                              />
                            </View>
                          )}
                        </View>
                      ) : (
                        <View style={styles.userNoPhotoStyle}>
                          <FontAwesome
                            name="user"
                            color={"#86868E"}
                            size={48 * windowHeight}
                          />
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={styles.topRightSubBoxStyle}>
                    <Text
                      style={[
                        styles.userHeaderTextStyle,
                        globalStyles.largeBoldFont,
                      ]}
                    >
                      {user.name}
                    </Text>
                    <Text
                      style={[
                        styles.userSubTextStyle,
                        globalStyles.mediumSemiFont,
                      ]}
                    >
                      Registered Member
                    </Text>
                  </View>
                </View>
                <View style={{ height: 24 * windowHeight }}></View>

                {
                  // TO BE AMENDED: geenArray --> >today
                }
                <ScrollView
                  decelerationRate={"normal"}
                  resetScrollToCoords={{ x: 0, y: 0 }}
                  contentContainerStyle={{
                    width: 375 * windowWidth,
                    flexGrow: 1,
                    zIndex: 3,
                    backgroundColor: "#FFF",
                  }}
                  scrollEnabled={true}
                  extraHeight={70 * windowHeight}
                  behavior={Platform.OS === "ios" ? "padding" : "height"}
                  enableOnAndroid={true}
                  ref={mainScrollRef}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  overScrollMode="never"
                >
                  <ScrollRow
                    title={`Upcoming Geens`}
                    scrollID="1"
                    geenArray={user.joinedGeens.items
                      .filter((x) => new Date(x.geen.geenTime) > today)
                      .map((x) => x.geen)}
                    titleColor={GlobalColor}
                    onPressNavigate={async (item) => {
                      const selectedGeen = await getOneGeen(item.id);
                      navigation.navigate("Geen", { Geen: selectedGeen });
                    }}
                  />
                  <ScrollRow
                    title={`Favourite Geens`}
                    scrollID="4"
                    geenArray={user.likedGeens.items
                      .filter((x) => new Date(x.geen.geenTime) > today)
                      .map((x) => x.geen)}
                    titleColor={GlobalColor}
                    onPressNavigate={async (item) => {
                      const selectedGeen = await getOneGeen(item.id);
                      navigation.navigate("Geen", { Geen: selectedGeen });
                    }}
                  />
                  <ScrollRow
                    title={`Featured Geens`}
                    scrollID="2"
                    geenArray={geen
                      .filter((x) => new Date(x.geenTime) > today)
                      .map((geen) => geen)}
                    titleColor={GlobalColor}
                    onPressNavigate={async (item) => {
                      const selectedGeen = await getOneGeen(item.id);
                      navigation.navigate("Geen", { Geen: selectedGeen });
                    }}
                  />
                  <ScrollRow
                    title={`Past Geens`}
                    scrollID="3"
                    geenArray={user.joinedGeens.items
                      .filter((x) => new Date(x.geen.geenTime) < today)
                      .map((x) => x.geen)}
                    titleColor={GlobalColor}
                    onPressNavigate={async (item) => {
                      const selectedGeen = await getOneGeen(item.id);
                      navigation.navigate("Geen", { Geen: selectedGeen });
                    }}
                  />
                </ScrollView>
              </SafeAreaView>
            </KeyboardAvoidingView>

            {/*
                            <View style={{ width: '100%', height: 32 * windowHeight, alignSelf: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                                            <CustomButton_Nav navigation={navigation} />
                                        </View>
                        */}
          </View>
        </MenuProvider>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingViewStyle: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  safeAreaViewStyle: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  settingIconBoxStyle: {
    height: 56 * windowHeight,
    width: "80%",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingTop: 24 * windowHeight,
    alignSelf: "center",
  },
  topBoxStyle: {
    width: "85%",
    backgroundColor: "#FFF",
    flexDirection: "row",
    alignItems: "flex-end",
    alignSelf: "center",
  },
  topLeftSubBoxStyle: {
    width: 96 * windowHeight,
    height: 96 * windowHeight,
    backgroundColor: "#FFF",
    justifyContent: "center",
  },
  topRightSubBoxStyle: {
    width: 186 * windowHeight,
    height: 96 * windowHeight,
    backgroundColor: "#FFF",
    justifyContent: "center",
    paddingLeft: 24 * windowWidth,
  },
  userHeaderTextStyle: {
    color: GlobalColor,
  },
  userSubTextStyle: {
    color: "#000",
    paddingTop: 8 * windowHeight,
  },
  userPhotoBorderStyle: {
    width: 96 * windowHeight,
    height: 96 * windowHeight,
    alignSelf: "center",
    borderRadius: 48 * windowHeight,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  userPhotoStyle: {
    borderRadius: 48 * windowHeight,
    height: 96 * windowHeight,
    width: 96 * windowHeight,
    borderWidth: 2 * windowHeight,
    borderColor: "#e5e5e5",
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
  userNoPhotoStyle: {
    backgroundColor: "#e5e5e5",
    width: 96 * windowHeight,
    height: 96 * windowHeight,
    alignSelf: "center",
    borderRadius: 96 * windowHeight,
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});

const CustomButton_Nav = ({ navigation }) => {
  return (
    <View
      style={{
        borderColor: GlobalColor,
        backgroundColor: "#FFF",
        alignItems: "center",
        justifyContent: "center",
        width: 64 * windowHeight,
        height: 64 * windowHeight,
        borderRadius: 64 * windowHeight,
        top: -32 * windowHeight,
        shadowColor: GlobalColor,
        shadowRadius: 5 * windowWidth,
        shadowOffset: { height: 10 * windowHeight },
        shadowOpacity: 0.3,
        borderWidth: 2 * windowWidth,
        elevation: 2,
      }}
    >
      <TouchableHighlight
        underlayColor="#FFF"
        onPress={() => {
          navigation.navigate("Home");
        }}
      >
        <View>
          <Ionicons
            name="earth-sharp"
            size={36 * windowHeight}
            color={GlobalColor}
          />
        </View>
      </TouchableHighlight>
    </View>
  );
};
export default SettingProfileScreen;
