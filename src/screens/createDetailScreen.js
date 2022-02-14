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
  ImageBackground,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import DropDownPicker from "react-native-dropdown-picker";
import {
  Ionicons,
  FontAwesome5,
  Feather,
  FontAwesome,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native-gesture-handler";
import Button from "../components/Button";
import BoxInput from "../components/BoxInput";
const globalStyles = require("../context/GlobalStyles");
const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;
const windowRatio = windowWidth * windowHeight;
import * as ImagePicker from "expo-image-picker";
import FloatingInput from "../components/FloatingInput";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Storage } from "aws-amplify";
import { v4 as uuidv4 } from "uuid";

import { Context as GeenContext } from "../context/GeenContext";
import { Context as UserContext } from "../context/UserContext";
import GlobalColor from "../context/GlobalColor";

function headerStyle() {
  return {
    fontSize: 24 * windowHeight,
    color: "#000",
    fontWeight: "bold",
    paddingLeft: 8 * windowWidth,
    alignSelf: "center",
  };
}

function validateText(string) {
  var re = /[^A-Za-z0-9]+/;
  return re.test(string);
}

const dummyGeen = {
  geenName: "",
  time: new Date(),
  tags: [],
  imageArray: [],
  geenDescription: "",
};

const CreateDetailScreen = ({ navigation, route }) => {
  const { Geen, latitude, longitude, geenLocation } = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [geenName, setGeenName] = useState(Geen ? Geen.geenName : "");
  const [time, setTime] = useState(
    //if existing geen then
    Geen ? new Date(Geen.geenTime) : new Date()
  );
  const [tagInput, setTagInput] = useState(null);
  const [isValidateText, setIsValidateText] = useState(true);
  const [imageArray, setImageArray] = useState(
    //if existing geen then
    Geen ? Geen.geenPhoto : []
  );

  const [tags, setTags] = useState(
    //if existing geen then
    Geen ? Geen.geenTag : []
  );

  const [geenDescription, setGeenDescription] = React.useState(
    //if existing geen then
    Geen ? Geen.geenDescription : ""
  );

  function formattedDate(time) {
    return (
      new Date(time).toLocaleDateString("zh-hk") +
      " " +
      new Date(time)
        .toLocaleTimeString("zh-hk", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
        .substring(0, 5)
    );
  }

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    hideDatePicker();
    setTime(date);
  };

  function customInputDateStyle() {
    return {
      width: 375 * 0.9 * windowWidth,
      height: windowHeight * 36,
      fontSize: 12 * windowHeight,
      alignItems: "flex-start",
      justifyContent: "center",
      alignSelf: "center",
      borderRadius: 15,
      borderWidth: 1,
      borderColor: "#C4C4C4",
    };
  }

  //Image Upload Functions
  const uploadToStorage = async (image, userID) => {
    return storeFileInS3(image.uri ?? image, userID + ".jpeg");
  };
  const storeFileInS3 = async (fileUri, awsKey = null, access = "public") => {
    console.log("a", fileUri);
    console.log("b", awsKey);
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

  const [uploadStatus, setUploadStatus] = useState("");
  let input1Ref = React.useRef(null);
  let input2Ref = React.useRef(null);

  const { state: user } = useContext(UserContext);
  const { addGeen, amendGeen, addGeenChat, userJoinGeen } =
    useContext(GeenContext);
  const [geoCodedLocation, setGeoCodedLocation] = useState("");

  const axios = require("axios");
  const geoCodingAPIKEY = "AIzaSyCYaUhp7R-k0wf7eAYmmd_hvT24URAqsEU";
  useEffect(() => {
    if (!Geen) {
      // Make a request for a user with a given ID
      axios
        .get(
          "https://maps.googleapis.com/maps/api/geocode/json?latlng=" +
            latitude +
            "," +
            longitude +
            "&key=" +
            geoCodingAPIKEY
        )
        .then(function (response) {
          // handle success
          // console.log(response);
          console.log("this is the formatted address");
          setGeoCodedLocation(response.data.results[0].formatted_address);
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .then(function () {
          // always executed
        });
    }
  }, []);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
      enabled={Platform.OS === "ios" ? false : false}
      style={{ flex: 1, backgroundColor: "#FFF" }}
    >
      {isLoading ? (
        <View
          style={{
            flex: 1,
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            opacity: 0.9,
            backgroundColor: "black",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 5000,
          }}
        >
          <ActivityIndicator color={GlobalColor} size="large" />
        </View>
      ) : (
        <SafeAreaView style={styles.safeAreaStyle}>
          <View style={{ width: "100%" }}>
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
                paddingBottom: 12 * windowHeight,
              }}
            >
              <TouchableWithoutFeedback onPress={() => navigation.goBack()}>
                <Ionicons
                  name="chevron-back-sharp"
                  size={20 * windowHeight}
                  color={GlobalColor}
                />
              </TouchableWithoutFeedback>

              <Text style={[headerStyle(), globalStyles.largeBoldFont]}>
                Edit Geen Detail
              </Text>
            </View>
          </View>

          <View
            style={{
              height: (815 * 0.9 - 64 - 1) * windowHeight,
              width: "100%",
            }}
          >
            <ScrollView
              contentContainerStyle={styles.outerScrollViewStyle}
              scrollEnabled={true}
              behavior={Platform.OS === "ios" ? "padding" : "height"}
              enableOnAndroid={true}
            >
              <View
                style={{ borderBottomWidth: 1, borderBottomColor: "#e2e2e2" }}
              >
                <ImageUploadScrollView
                  setImageArray={setImageArray}
                  setUploadStatus={setUploadStatus}
                  currentGeen={Geen}
                />
              </View>
              <View style={{ height: 48 * 2 * windowHeight }}>
                <View
                  style={{
                    width: "90%",
                    alignSelf: "center",
                    paddingTop: 12 * windowHeight,
                    paddingBottom: 12 * windowHeight,
                    height: 48 * windowHeight,
                  }}
                >
                  <Text
                    style={[{ color: "#000" }, globalStyles.mediumSemiFont]}
                  >
                    Event Name*
                  </Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: 48 * windowHeight,
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <BoxInput
                    title={"Event Name"}
                    width={375 * 0.9 * windowWidth}
                    height={windowHeight * 36}
                    fontSize={12 * windowHeight}
                    value={geenName}
                    onChange={setGeenName}
                    textAlignCenter
                    inputRef={input1Ref}
                    shouldFocus
                    onSubmitFunction={async () => {
                      //
                    }}
                  />
                </View>
              </View>

              <View style={{ height: 48 * 2 * windowHeight }}>
                <View
                  style={{
                    width: "90%",
                    alignSelf: "center",
                    paddingTop: 12 * windowHeight,
                    paddingBottom: 12 * windowHeight,
                    height: 48 * windowHeight,
                  }}
                >
                  <Text
                    style={[{ color: "#000" }, globalStyles.mediumSemiFont]}
                  >
                    Date and Time*
                  </Text>
                </View>
                <View
                  style={{
                    width: "100%",
                    height: 48 * windowHeight,
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <TouchableOpacity
                    style={customInputDateStyle()}
                    onPress={showDatePicker}
                  >
                    <View
                      style={{
                        alignSelf: "center",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        textAlign="center"
                        style={[
                          { color: "black", fontSize: 12 * windowHeight },
                          globalStyles.smallLightFont,
                        ]}
                      >
                        {formattedDate(time)}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <DateTimePickerModal
                isVisible={isDatePickerVisible}
                mode="datetime"
                onConfirm={handleConfirmDate}
                onCancel={hideDatePicker}
              />

              <View style={{ height: 48 * 2 * windowHeight }}>
                <View
                  style={{
                    width: "90%",
                    alignSelf: "center",
                    paddingTop: 12 * windowHeight,
                    paddingBottom: 12 * windowHeight,
                    height: 48 * windowHeight,
                    flexDirection: "row",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      alignSelf: "center",
                      width: "40%",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      flexDirection: "row",
                      height: 18 * windowHeight,
                    }}
                  >
                    <Text
                      style={[
                        { color: "#000", paddingRight: 6 * windowWidth },
                        globalStyles.mediumSemiFont,
                      ]}
                    >
                      Tags
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setTags([]);
                        setIsValidateText(true);
                        // if (tagInput !== "") {
                        //    setTags([...tags, "#" + tagInput]); setTagInput("")
                        // }
                      }}
                    >
                      <MaterialCommunityIcons
                        name="restore"
                        size={18 * windowHeight}
                        color="black"
                        style={{ alignSelf: "center" }}
                      />
                    </TouchableOpacity>
                  </View>
                  {!isValidateText ? (
                    <View
                      style={{
                        width: "60%",
                        justifyContent: "flex-end",
                        alignItems: "center",
                        flexDirection: "row",
                        height: 18 * windowHeight,
                      }}
                    >
                      <Text
                        style={[
                          globalStyles.smallLightFont,
                          { color: "red", paddingLeft: 0 * windowWidth },
                        ]}
                      >
                        Please enter only English Character
                      </Text>
                    </View>
                  ) : null}
                </View>

                <View
                  style={{
                    width: "100%",
                    height: 48 * windowHeight,
                    alignContent: "center",
                    justifyContent: "center",
                  }}
                >
                  <BoxInput
                    title={"At most 3 #TAGS only"}
                    width={375 * 0.9 * windowWidth}
                    height={windowHeight * 36}
                    fontSize={12 * windowHeight}
                    value={tagInput}
                    onChange={setTagInput}
                    textAlignCenter
                    inputRef={input2Ref}
                    onSubmitFunction={async () => {
                      if (
                        tags.length < 3 &&
                        tagInput !== "" &&
                        tagInput !== null &&
                        !validateText(tagInput)
                      ) {
                        setTags([...tags, "" + tagInput]);
                        setTagInput("");
                      } else {
                        setIsValidateText(false);
                      }
                    }}
                  />
                </View>
              </View>
              <View
                style={{
                  width: "90%",
                  alignSelf: "center",
                  height: 24 * windowHeight,
                }}
              >
                {tags && tags[0] != "" ? (
                  <>
                    <View
                      style={{
                        alignItems: "center",
                        width: "100%",
                        justifyContent: "flex-start",
                        flexDirection: "row",
                        flexWrap: "wrap",
                      }}
                    >
                      {tags.map((tag, index) => {
                        return (
                          <View
                            style={{
                              backgroundColor: "#e5e5e5",
                              height: 24 * windowHeight,
                              width:
                                tag.length * 7.5 * windowWidth +
                                12 * windowWidth,
                              justifyContent: "center",
                              alignItems: "center",
                              alignSelf: "center",
                              borderRadius: 8 * windowHeight,
                              marginHorizontal:
                                index === 0 ? 0 : 8 * windowWidth,
                            }}
                          >
                            <Text
                              textContentType="name"
                              style={[
                                { color: "#86868e" },
                                globalStyles.smallLightFont,
                              ]}
                            >
                              #{tag}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </>
                ) : (
                  <></>
                )}
              </View>
              <View
                style={{
                  width: "100%",
                  alignSelf: "center",
                  height: 24 * windowHeight,
                  borderBottomWidth: 1,
                  borderBottomColor: "#e2e2e2",
                }}
              ></View>
              <View style={{ height: 48 * 6 * windowHeight }}>
                <View
                  style={{
                    width: "90%",
                    alignSelf: "center",
                    paddingTop: 12 * windowHeight,
                    paddingBottom: 12 * windowHeight,
                    height: 48 * windowHeight,
                  }}
                >
                  <Text
                    style={[{ color: "#000" }, globalStyles.mediumSemiFont]}
                  >
                    Description (Optional)
                  </Text>
                </View>
                <View
                  style={{
                    paddingTop: 12 * windowHeight,
                    width: "90%",
                    alignSelf: "center",
                  }}
                >
                  <ScrollView
                    style={styles.descriptionContainer}
                    showsVerticalScrollIndicator={false}
                  >
                    <View
                      style={{
                        paddingHorizontal: 14 * windowWidth,
                        paddingTop: 6 * windowHeight,
                      }}
                    >
                      <TextInput
                        value={geenDescription}
                        onChangeText={(text) => {
                          setGeenDescription(text);
                        }}
                        style={[
                          { color: "#868683" },
                          globalStyles.smallLightFont,
                        ]}
                        textAlign="left"
                        returnKeyType="done"
                        blurOnSubmit={true}
                        multiline={true}
                      ></TextInput>
                    </View>
                  </ScrollView>
                </View>
              </View>
              <View style={{ height: 108 * windowHeight }}></View>
            </ScrollView>
          </View>
          <View style={styles.buttonBottomTab}>
            <Button
              buttonText={"Confirm"}
              handlePress={async () => {
                setIsLoading(true);
                if (Geen) {
                  const newGeenData = await amendGeen({
                    id: Geen.id,
                    geenName: geenName, //Geen.geenName
                    geenLocation: Geen.geenLocation,
                    geenDescription: geenDescription, //Geen.geenDescription
                    geenTime: time, //Geen.geenTime
                    geenPhoto: imageArray, //Geen.geenPhoto
                    geenTag: tags, //Geen.geenTag
                    maximumParti: 20,
                    hostID: user.id,
                    longitude: Geen.longitude,
                    latitude: Geen.latitude,
                    isFeatured: false,
                  });
                  navigation.setParams({
                    Geen: newGeenData,
                  });
                } else {
                  const newGeenID = await addGeen({
                    geenName: geenName,
                    geenLocation:
                      geenLocation === "" ? geoCodedLocation : geenLocation,
                    geenDescription: geenDescription,
                    geenTime: time,
                    geenPhoto: imageArray,
                    geenTag: tags,
                    maximumParti: 20,
                    hostID: user.id,
                    longitude: longitude,
                    latitude: latitude,
                    isFeatured: false,
                  });
                  console.log(newGeenID);

                  //Upload Images
                  let IDArray = [];
                  if (imageArray.length !== 0) {
                    async function UploadPhotos() {
                      await imageArray.map((image, index) => {
                        const imageID = uuidv4();
                        IDArray.push(imageID);
                        uploadToStorage(
                          image,
                          "GeenPhotos/" + newGeenID + "/" + imageID
                        );
                      });
                    }
                    await UploadPhotos();
                    const eventPhotoArray = imageArray.map(
                      (image, index) =>
                        "https://geenmeenlaunchbetaae66bc22f46b468d81f5d5fdf4696130851-dev.s3.us-east-2.amazonaws.com/public/GeenPhotos/" +
                        newGeenID +
                        "/" +
                        IDArray[index] +
                        ".jpeg"
                    );
                    await amendGeen({
                      id: newGeenID,
                      geenPhoto: eventPhotoArray,
                    });
                  } else {
                    await amendGeen({
                      id: newGeenID,
                      geenPhoto: [
                        "https://geenmeenlaunchbetaae66bc22f46b468d81f5d5fdf4696130851-dev.s3.us-east-2.amazonaws.com/public/GeenPhotos/appIcon_1024.png",
                      ],
                    });
                  }
                  const chatRoomID = await addGeenChat(
                    {
                      name: geenName + " ChatRoom",
                      type: "Geen",
                      image:
                        "https://geenmeenlaunchbetaae66bc22f46b468d81f5d5fdf4696130851-dev.s3.us-east-2.amazonaws.com/public/GeenPhotos/appIcon_1024.png",
                    },
                    user.id,
                    newGeenID
                  );
                  await userJoinGeen({
                    id: newGeenID + user.id,
                    geenID: newGeenID,
                    chatRoomID: chatRoomID,
                    userID: user.id,
                  });
                }

                setIsLoading(false);
                setModalVisible(true);
                //navigation.navigate("CreateDetail")
              }}
              width={375 * 0.9 * windowWidth}
              height={32 * windowHeight}
            />
          </View>
        </SafeAreaView>
      )}
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
              This Geen was created successfully!
            </Text>
            <Button
              buttonText={"Done"}
              handlePress={() => {
                setModalVisible(!modalVisible);
                navigation.popToTop();
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
  buttonBottomTab: {
    width: 375 * windowWidth,
    height: "10%",
    position: "absolute",
    bottom: 0 * windowHeight,
    zIndex: 1000,
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: "#e2e2e2",
    borderTopWidth: 1,
  },
  safeAreaStyle: {
    width: "100%",
    height: "100%",
    alignSelf: "center",
    backgroundColor: "#FFF",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
  },
  outerScrollViewStyle: { width: "100%" },
  descriptionContainer: {
    width: "100%",
    height: 208 * windowHeight,
    borderWidth: 1,
    borderColor: "#e5e5e5",
    borderRadius: 10 * windowHeight,
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
});

const ImageUploadScrollView = ({
  setImageArray,
  setUploadStatus,
  currentGeen,
}) => {
  //Image functions

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 0.4,
      allowsMultipleSelection: true,
    });
    if (!result.cancelled) {
      setUploadStatus("Image Selected");
    } else {
      setUploadStatus("Image fail to upload");
    }
    return result;
  };
  const [tempImageArray, setTempImageArray] = useState(
    currentGeen
      ? currentGeen.geenPhoto.length !== 0
        ? currentGeen.geenPhoto.slice()
        : []
      : []
  );

  function photoMap(photos) {
    var tempPhoto = [];
    photos.map((photo) => {
      var uri = { uri: photo };
      tempPhoto.push(uri);
    });

    return tempPhoto;
  }

  const [shouldRerender, setShouldRerender] = useState(
    currentGeen && currentGeen.geenPhoto.length !== 0 ? 1 : 0
  );
  // useEffect(() => {
  return (
    <View style={{ height: 256 * windowHeight }}>
      <ScrollView
        horizontal
        style={{ height: 256 * windowHeight, width: 375 * windowWidth }}
        showsHorizontalScrollIndicator={false}
        snapToInterval={375 * windowWidth}
        decelerationRate={"fast"}
      >
        {shouldRerender !== 0
          ? tempImageArray.map((item, index) => {
              return (
                <>
                  <View
                    style={{
                      width: 375 * windowWidth,
                      height: 256 * windowHeight,
                      justifyContent: "center",
                    }}
                  >
                    <ImageBackground
                      source={{ uri: item }}
                      style={{
                        height: 256 * windowHeight,
                        width: 375 * windowWidth,
                      }}
                    >
                      <TouchableOpacity
                        style={{
                          width: 36 * windowWidth,
                          height: 24 * windowHeight,
                          borderRadius: 12,
                          position: "absolute",
                          right: 12 * windowWidth,
                          top: 12 * windowHeight,
                          backgroundColor: GlobalColor,
                          zIndex: 1,
                          justifyContent: "center",
                        }}
                        onPress={async () => {
                          let tempArray = tempImageArray;
                          tempArray.splice(index, 1);
                          setTempImageArray(tempArray);

                          setShouldRerender(shouldRerender + 1);
                          setImageArray(tempImageArray);
                        }}
                      >
                        <FontAwesome
                          name="trash-o"
                          size={12 * windowHeight}
                          color="white"
                          style={{ alignSelf: "center" }}
                        />
                      </TouchableOpacity>
                    </ImageBackground>
                  </View>
                </>
              );
            })
          : null}
        <View
          style={{
            width: 375 * windowWidth,
            height: 256 * windowHeight,
            justifyContent: "center",
          }}
        >
          <TouchableWithoutFeedback
            onPress={async () => {
              const eventImage = await pickImage();
              let tempArray = tempImageArray;
              tempArray.push(eventImage.uri);
              setTempImageArray(tempArray);

              setShouldRerender(shouldRerender + 1);
              setImageArray(tempImageArray);
            }}
          >
            <View
              style={{
                width: "80%",
                height: 196 * windowHeight,
                borderRadius: 12 * windowWidth,
                justifyContent: "center",
                alignSelf: "center",
                borderColor: GlobalColor,
                alignItems: "center",
                backgroundColor: "#c4c4c4",
              }}
            >
              <FontAwesome5
                name="image"
                size={24 * windowWidth}
                color="#FFF"
                style={{ alignSelf: "center" }}
              />
              <Text
                style={[
                  {
                    color: "#fff",
                    justifyContent: "center",
                    alignSelf: "center",
                    paddingTop: 12 * windowHeight,
                    textAlign: "center",
                  },
                  globalStyles.tinyBoldFont,
                ]}
              >
                {"Upload" + "" + " Cover Photo"}
              </Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateDetailScreen;
