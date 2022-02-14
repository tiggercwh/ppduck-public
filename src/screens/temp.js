import React, { useState, useRef, useEffect, useContext } from "react";
import {
  KeyboardEvent,
  Text,
  View,
  TouchableWithoutFeedback,
  TextInput,
  Platform,
  Dimensions,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  FlatList,
  Animated,
} from "react-native";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import tempUserImage from "../../assets/facebook.png";
import TextTicker from "react-native-text-ticker";
import * as Clipboard from "expo-clipboard";
import { TouchableOpacityBase } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useKeyboard } from "../components/useKeyboard";

import { Context as UserContext } from "../context/UserContext";
import { Context as ChatContext } from "../context/ChatContext";
import GlobalColor from "../context/GlobalColor";
const globalStyles = require("../context/GlobalStyles");
const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;

const limit = 32;

function chatMessageStyle() {
  return [
    {
      color: "#86868e",
    },
    globalStyles.smallSemiFont,
  ];
}

function chatTitleStyle() {
  return [
    {
      color: GlobalColor,
    },
    globalStyles.largeSemiFont,
  ];
}

function chatBoxLengthStyle() {
  return [
    {
      color: "#86868e",
      paddingLeft: 8 * windowHeight,
    },
    globalStyles.largeSemiFont,
  ];
}

function checkColor(sender) {
  return "#000000";
}

const ChatDetailScreen = ({ navigation, route }) => {
  const [showAddMenu, setShowAddMenu] = useState(false);
  const [showParticipantsList, setShowParticipantsList] = useState(false);
  const [showReplyBox, setShowReplyBox] = useState(false);
  const [inputFocus, setFocus] = useState(false);
  const [imageUploadingChat, setImageUploadingChat] = useState(false);
  const [showChatExtraMenu, setShowChatExtraMenu] = useState(null);
  const [value, onChangeText] = useState("");
  const [replySender, setReplySender] = useState("");
  const [replyContent, setReplyContent] = useState("");
  const [replyID, setReplyID] = useState(null);
  const opacity = useState(new Animated.Value(1))[0];
  let textTickerRef = useRef(null);
  let messageScrollViewRef = useRef(null);
  const { chatroom, partiID } = route.params;

  const chatRoomPartiID = partiID ?? chatroom.id;
  const participants = chatroom.chatRoom.user.items;
  const chatRoomID = chatroom.chatRoomID ?? chatroom.chatRoom.id;
  const chatRoomName =
    chatRoomType == "Direct"
      ? chatroom.chatRoom.user.items.filter(
          (friend) => friend.user.id !== user.id
        )[0].user.name
      : chatroom.chatRoom.name;
  const chatRoomType = chatRoomType;
  const chatRoomImage =
    chatRoomType == "Direct"
      ? chatroom.chatRoom.user.items.filter(
          (friend) => friend.user.id !== user.id
        )[0].user.image
      : chatRoomType == "Event"
      ? chatroom.chatRoom.image
      : null;
  const chatRoomSharedImage = chatroom.chatRoom.sharedImage
    ? chatroom.chatRoom.sharedImage
    : [];

  const [isTyping, setIsTyping] = useState(false);

  const { state: user, updateUserinfo } = useContext(UserContext);
  const {
    state: chatDetail,
    addChat,
    getChatUpdate,
    updatePartiTime,
  } = useContext(ChatContext);
  const keyboardHeight = useKeyboard();

  useFocusEffect(
    React.useCallback(() => {
      const subscription = getChatUpdate(chatRoomID, user.id, chatRoomPartiID);
      const intialUpdate = updatePartiTime(chatRoomPartiID);

      // const updateTimer = setInterval(() => {
      //     console.log("updated")
      //     const intervalUpdate = updatePartiTime(chatRoomPartiID)
      //     console.log(intervalUpdate);
      // },60000)

      return () => {
        // clearInterval(updateTimer);
        const finalUpdate = updatePartiTime(chatRoomPartiID);

        subscription.unsubscribe(); //unsubscribe function run

        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  useEffect(() => {
    console.log(showChatExtraMenu);
  }, [showChatExtraMenu]);

  function checkIsSelf(id) {
    if (id === user.id) {
      return true;
    } else {
      return false;
    }
  }

  function checkSameDate(date, index) {
    if (index == 0) {
      return false;
    } else if (chatDetail.length > 0) {
      if (
        date ===
        new Date(chatDetail[index - 1].createdAt)
          .toLocaleString()
          .substring(0, 10)
      ) {
        return true;
      } else {
        return false;
      }
    }
  }

  const ParticipantsList = ({ participants }) => {
    const ParticipantsBlock = ({ participant }) => {
      return (
        <View
          style={{
            height: 48 * windowHeight,
            justifyContent: "space-between",
            borderBottomColor: "#86868e",
            borderBottomWidth: 1,
            flexDirection: "row",
            paddingHorizontal: 16 * windowWidth,
            alignItems: "center",
          }}
        >
          <Text style={[globalStyles.largeSemiFont]}>{participant.name}</Text>
          <View style={{ alignItems: "center", flexDirection: "row" }}>
            {/* Tigger Create Chat Function */}
            <TouchableOpacity>
              <Entypo
                name="chat"
                size={24 * windowHeight}
                color={GlobalColor}
                style={{ marginRight: 16 * windowWidth }}
              />
            </TouchableOpacity>
            <Image
              source={participant.image}
              style={styles.participantsimage}
            />
          </View>
        </View>
      );
    };

    return (
      <ScrollView style={{ height: "100%" }}>
        {participants.map((participant, index) => {
          console.log(participant.user);
          return <ParticipantsBlock participant={participant.user} />;
        })}
      </ScrollView>
    );
  };

  const AddMenu = ({ navigation }) => {
    let date = new Date();
    return (
      <>
        <View style={styles.toolContainer}>
          <View
            style={{
              flexDirection: "column",
              paddingVertical: 16 * windowHeight,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-around",
                height: 76 * windowHeight,
              }}
            >
              <View
                style={{ flexDirection: "column", width: 113 * windowWidth }}
              >
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={async () => {
                    setShowAddMenu(false);
                    // const shareImage = await pickImage();
                    // setImageUploadingChat(true)
                    // const imageName = `ChatRoomPhoto/${chatRoomID}/sharedPhotos` + date.toISOString()
                    // const s3Image = await uploadToStorage(shareImage, imageName);
                    // const newImage = await addImageInChat({
                    //     image: "https://geenmeenapp2b34196e0125445cb4fb7f5b98eee898165638-dev.s3.us-east-2.amazonaws.com/public/" + imageName + ".jpeg",
                    //     chatRoomID: chatRoomID,
                    //     sender: user.name, //user.name
                    //     senderID: user.id,
                    //     text: value
                    // });
                    // setImageUploadingChat(false)
                    // //TO BE CONTINUED
                  }}
                >
                  <View>
                    <FontAwesome
                      name="photo"
                      size={32 * windowHeight}
                      color="#ffffff"
                    />
                  </View>
                  <View style={{ paddingTop: 8 * windowHeight }}>
                    <Text style={styles.toolText}>Photo/Video</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </>
    );
  };

  const renderItem = ({ item, index }) => {
    const chat = item;
    const date = new Date(chat.createdAt).toLocaleString("en-hk", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const iosDate = new Date(chat.createdAt).toLocaleString("en-hk", {
      year: "numeric",
      month: "long",
      day: "2-digit",
      hour12: false,
      weekday: "long",
    });
    const androidDate = new Date(chat.createdAt).toString().substring(0, 15);

    let self = checkIsSelf(chat.senderID);
    let sameDate = checkSameDate(
      new Date(chat.createdAt).toLocaleString().substring(0, 10),
      index
    );

    return (
      <View style={{ marginBottom: 16 * windowHeight }}>
        {sameDate ? (
          <></>
        ) : (
          <View
            style={{ alignSelf: "center", paddingBottom: 12 * windowHeight }}
          >
            <Text style={[{ color: "#c4c4c4" }, globalStyles.smallSemiFont]}>
              {Platform.OS == "ios" ? iosDate : androidDate}
            </Text>
          </View>
        )}

        {chatroom.chatRoom.type === "Direct" ? (
          <>
            <TouchableWithoutFeedback
              onLongPress={() => {
                if (showChatExtraMenu == index) {
                  setShowChatExtraMenu(null);
                  console.log("SAME");
                } else {
                  setShowChatExtraMenu(index);
                  console.log("DIFFERENT");
                }
                setShowAddMenu(false);
              }}
            >
              {chat.reply == "true" ? (
                <View
                  style={[
                    { borderRadius: 20 * windowHeight },
                    self === true && {
                      backgroundColor: GlobalColor,
                      alignSelf: "flex-end",
                    },
                    self === false && {
                      backgroundColor: "#e5e5e5",
                      alignSelf: "flex-start",
                    },
                  ]}
                >
                  <View
                    style={[
                      {
                        justifyContent: "center",
                        backgroundColor: "#d3d3d3",
                        borderRadius: 8 * windowHeight,
                        alignSelf: "flex-start",
                        marginLeft: 8 * windowWidth,
                        marginTop: 6 * windowHeight,
                        marginRight: 8 * windowWidth,
                        borderLeftColor: "#8b0000",
                        borderLeftWidth: 4 * windowWidth,
                        alignSelf: "stretch",
                      },
                      chat.replyName == user.name && {
                        borderLeftColor: "#006400",
                      },
                    ]}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 14 * windowHeight,
                        justifyContent: "space-around",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 5 * windowHeight,
                        }}
                      >
                        {chat.replyName == user.name ? (
                          <Text
                            style={[
                              { alignSelf: "center", color: "#006400" },
                              globalStyles.smallSemiFont,
                            ]}
                          >
                            You
                          </Text>
                        ) : (
                          <Text
                            style={[
                              { alignSelf: "center" },
                              chatroom.type == "Direct" && { color: "#8b0000" },
                              globalStyles.smallSemiFont,
                            ]}
                          >
                            {chat.replyName}
                          </Text>
                        )}
                      </View>
                      {chat.replyText ? (
                        chat.replyText.length > 28 ? (
                          <View style={{ paddingBottom: 5 * windowHeight }}>
                            <Text
                              style={[
                                { paddingTop: 4 * windowHeight },
                                globalStyles.smallSemiFont,
                              ]}
                            >
                              {chat.replyText.substring(0, 28)}...
                            </Text>
                          </View>
                        ) : (
                          <View style={{ paddingBottom: 5 * windowHeight }}>
                            <Text
                              style={[
                                { paddingTop: 4 * windowHeight },
                                globalStyles.smallSemiFont,
                              ]}
                            >
                              {chat.replyText}
                            </Text>
                          </View>
                        )
                      ) : (
                        <></>
                      )}
                    </View>
                  </View>
                  <View style={[styles.chatBackground]}>
                    <View
                      style={[
                        { justifyContent: "center" },
                        chat.text.length > limit && {
                          width: 260 * windowWidth,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          {
                            paddingLeft: 16 * windowHeight,
                            paddingVertical: 8 * windowHeight,
                          },
                          self === true && { color: "white" },
                          self === false && { color: "black" },
                          globalStyles.smallSemiFont,
                        ]}
                      >
                        {chat.text}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "flex-end",
                        paddingLeft: 8 * windowHeight,
                      }}
                    >
                      <Text
                        style={[
                          {
                            paddingBottom: 5 * windowHeight,
                            paddingRight: 16 * windowHeight,
                          },
                          self === true && { color: "white" },
                          self === false && { color: "#86868e" },
                          globalStyles.tinyLightFont,
                        ]}
                      >
                        {Platform.OS == "ios"
                          ? date.substring(12, 17)
                          : date.substring(11, 16)}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                <View
                  style={[
                    styles.chatBackground,
                    self === true && {
                      backgroundColor: GlobalColor,
                      alignSelf: "flex-end",
                    },
                    self === false && {
                      backgroundColor: "#e5e5e5",
                      alignSelf: "flex-start",
                    },
                  ]}
                >
                  <View
                    style={[
                      {
                        justifyContent: "center",
                        paddingVertical: 10 * windowHeight,
                      },
                      chat.text.length > limit && { width: 260 * windowHeight },
                    ]}
                  >
                    <Text
                      style={[
                        { paddingLeft: 16 * windowHeight },
                        self === true && { color: "white" },
                        self === false && { color: "black" },
                        globalStyles.smallSemiFont,
                      ]}
                    >
                      {chat.text}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "flex-end",
                      paddingLeft: 8 * windowWidth,
                    }}
                  >
                    <Text
                      style={[
                        {
                          paddingRight: 16 * windowWidth,
                          paddingBottom: 5 * windowHeight,
                        },
                        self === true && { color: "white" },
                        self === false && { color: "#86868e" },
                        globalStyles.tinyLightFont,
                      ]}
                    >
                      {Platform.OS == "ios"
                        ? date.substring(12, 17)
                        : date.substring(11, 16)}
                    </Text>
                  </View>
                </View>
              )}
            </TouchableWithoutFeedback>
          </>
        ) : (
          <></>
        )}
        {chatroom.type != "Direct" ? (
          self === true ? (
            chat.reply == "true" ? ( //self+reply
              <>
                <TouchableWithoutFeedback
                  onLongPress={() => {
                    if (showChatExtraMenu == index) {
                      setShowChatExtraMenu(null);
                    } else {
                      setShowChatExtraMenu(index);
                    }
                    setShowAddMenu(false);
                  }}
                >
                  <View
                    style={[
                      styles.chatBackground,
                      self === true && {
                        backgroundColor: GlobalColor,
                        alignSelf: "flex-end",
                      },
                      self === false && {
                        backgroundColor: "#e5e5e5",
                        alignSelf: "flex-start",
                      },
                      chat.text.length > limit && {
                        height:
                          32 * windowHeight +
                          (Math.floor(chat.text.length / limit) + 1) *
                            14 *
                            windowHeight +
                          52 * windowHeight,
                      },
                      chat.text.length <= limit && {
                        height: 36 * windowHeight + 52 * windowHeight,
                      },
                      { flexDirection: "column" },
                    ]}
                  >
                    <View
                      style={[
                        {
                          justifyContent: "center",
                          backgroundColor: "#d3d3d3",
                          borderRadius: 8,
                          height: 48 * windowHeight,
                          alignSelf: "flex-start",
                          marginLeft: 8 * windowHeight,
                          marginTop: 6 * windowHeight,
                          marginRight: 8 * windowHeight,
                          borderLeftColor: checkColor(chat.replySender),
                          borderLeftWidth: 6 * windowHeight,
                          alignSelf: "stretch",
                        },
                        chat.replyName == user.name && {
                          borderLeftColor: "#006400",
                        },
                      ]}
                    >
                      <View
                        style={{
                          flexDirection: "column",
                          paddingHorizontal: 14 * windowHeight,
                          height: 48 * windowHeight,
                          justifyContent: "space-around",
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            paddingTop: 5 * windowHeight,
                          }}
                        >
                          {chat.replyName == user.name ? (
                            <Text
                              style={[
                                { alignSelf: "center", color: "#006400" },
                                globalStyles.smallBoldFont,
                              ]}
                            >
                              You
                            </Text>
                          ) : (
                            <Text
                              style={[
                                { alignSelf: "center" },
                                (chatroom.type == "Post" ||
                                  chatroom.type == "Event") && {
                                  color: checkColor(chat.replyName),
                                },
                                globalStyles.smallBoldFont,
                              ]}
                            >
                              {chat.replyName}
                            </Text>
                          )}
                        </View>
                        {chat.replyText ? (
                          chat.replyText.length > 28 ? (
                            <View style={{ paddingBottom: 5 * windowHeight }}>
                              <Text
                                style={[
                                  { paddingTop: 4 * windowHeight },
                                  globalStyles.smallSemiFont,
                                ]}
                              >
                                {chat.replyText.substring(0, 28)}...
                              </Text>
                            </View>
                          ) : (
                            <View style={{ paddingBottom: 5 * windowHeight }}>
                              <Text
                                style={[
                                  { paddingTop: 4 * windowHeight },
                                  globalStyles.smallSemiFont,
                                ]}
                              >
                                {chat.replyText}
                              </Text>
                            </View>
                          )
                        ) : (
                          <></>
                        )}
                      </View>
                    </View>
                    <View style={[styles.chatBackground, { flex: 1 }]}>
                      <View
                        style={[
                          { justifyContent: "center" },
                          chat.text.length > limit && {
                            width: 260 * windowWidth,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            { paddingLeft: 16 * windowHeight },
                            self === true && { color: "white" },
                            self === false && { color: "black" },
                            globalStyles.smallSemiFont,
                          ]}
                        >
                          {chat.text}
                        </Text>
                      </View>
                      <View
                        style={{
                          justifyContent: "flex-end",
                          paddingLeft: 8 * windowHeight,
                        }}
                      >
                        <Text
                          style={[
                            {
                              paddingBottom: 5 * windowHeight,
                              paddingRight: 16 * windowHeight,
                            },
                            self === true && { color: "white" },
                            self === false && { color: "#86868e" },
                            globalStyles.tinyLightFont,
                          ]}
                        >
                          {Platform.OS == "ios"
                            ? date.substring(12, 17)
                            : date.substring(11, 16)}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </>
            ) : (
              //self chat
              <>
                <TouchableWithoutFeedback
                  onLongPress={() => {
                    if (showChatExtraMenu == index) {
                      setShowChatExtraMenu(null);
                    } else {
                      setShowChatExtraMenu(index);
                    }
                    setShowAddMenu(false);
                  }}
                >
                  <View
                    style={[
                      styles.chatBackground,
                      self === true && {
                        backgroundColor: GlobalColor,
                        alignSelf: "flex-end",
                      },
                      self === false && {
                        backgroundColor: "#e5e5e5",
                        alignSelf: "flex-start",
                      },
                      chat.text.length > limit && {
                        height:
                          32 * windowHeight +
                          (Math.floor(chat.text.length / limit) + 1) *
                            14 *
                            windowHeight,
                      },
                      chat.text.length <= limit && {
                        height: 36 * windowHeight,
                      },
                    ]}
                  >
                    <View
                      style={[
                        { justifyContent: "center" },
                        chat.text.length > limit && {
                          width: 260 * windowWidth,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          { paddingLeft: 16 * windowHeight },
                          self === true && { color: "white" },
                          self === false && { color: "black" },
                          globalStyles.smallSemiFont,
                        ]}
                      >
                        {chat.text}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "flex-end",
                        paddingLeft: 8 * windowHeight,
                      }}
                    >
                      <Text
                        style={[
                          {
                            paddingBottom: 5 * windowHeight,
                            paddingRight: 16 * windowHeight,
                          },
                          self === true && { color: "white" },
                          self === false && { color: "#86868e" },
                          globalStyles.tinyLightFont,
                        ]}
                      >
                        {Platform.OS == "ios"
                          ? date.substring(12, 17)
                          : date.substring(11, 16)}
                      </Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </>
            )
          ) : chat.reply == "true" ? ( //others + reply
            <>
              <TouchableWithoutFeedback
                onLongPress={() => {
                  if (showChatExtraMenu == index) {
                    setShowChatExtraMenu(null);
                  } else {
                    setShowChatExtraMenu(index);
                  }
                  setShowAddMenu(false);
                }}
              >
                <View
                  style={[
                    styles.chatBackground,
                    self === true && {
                      backgroundColor: GlobalColor,
                      alignSelf: "flex-end",
                    },
                    self === false && {
                      backgroundColor: "#e5e5e5",
                      alignSelf: "flex-start",
                    },
                    chat.text.length > limit && {
                      height:
                        54 * windowHeight +
                        (Math.floor(chat.text.length / limit) + 1) *
                          14 *
                          windowHeight +
                        52 * windowHeight,
                    },
                    chat.text.length <= limit && {
                      height:
                        36 * windowHeight +
                        24 * windowHeight +
                        52 * windowHeight,
                    },
                    { flexDirection: "column" },
                  ]}
                >
                  <View style={{ paddingTop: 8 * windowHeight }}>
                    <Text
                      style={[
                        {
                          color: checkColor(chat.sender),
                          paddingLeft: 16 * windowHeight,
                          paddingBottom: 6 * windowHeight,
                        },
                        globalStyles.smallBoldFont,
                      ]}
                    >
                      {chat.sender}
                    </Text>
                  </View>
                  <View
                    style={[
                      {
                        justifyContent: "center",
                        backgroundColor: "#d3d3d3",
                        borderRadius: 8,
                        height: 48 * windowHeight,
                        alignSelf: "flex-start",
                        marginLeft: 8 * windowHeight,
                        marginRight: 8 * windowHeight,
                        borderLeftColor: checkColor(chat.replySender),
                        borderLeftWidth: 6 * windowHeight,
                        alignSelf: "stretch",
                      },
                      chat.replyName == user.name && {
                        borderLeftColor: "#006400",
                      },
                    ]}
                  >
                    <View
                      style={{
                        flexDirection: "column",
                        paddingHorizontal: 14 * windowHeight,
                        height: 48 * windowHeight,
                        justifyContent: "space-around",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          paddingTop: 5 * windowHeight,
                        }}
                      >
                        {chat.replyName == user.name ? (
                          <Text
                            style={[
                              { alignSelf: "center", color: "#006400" },
                              globalStyles.smallBoldFont,
                            ]}
                          >
                            You
                          </Text>
                        ) : (
                          <Text
                            style={[
                              { alignSelf: "center" },
                              (chatroom.type == "Post" ||
                                chatroom.type == "Event") && {
                                color: checkColor(chat.replyName),
                              },
                              globalStyles.smallBoldFont,
                            ]}
                          >
                            {chat.replyName}
                          </Text>
                        )}
                      </View>
                      {chat.replyText ? (
                        chat.replyText.length > 30 ? (
                          <View style={{ paddingBottom: 5 * windowHeight }}>
                            <Text
                              style={[
                                { paddingTop: 4 * windowHeight },
                                globalStyles.smallSemiFont,
                              ]}
                            >
                              {chat.replyText.substring(0, 30)}...
                            </Text>
                          </View>
                        ) : (
                          <View style={{ paddingBottom: 5 * windowHeight }}>
                            <Text
                              style={[
                                { paddingTop: 4 * windowHeight },
                                globalStyles.smallSemiFont,
                              ]}
                            >
                              {chat.replyText}
                            </Text>
                          </View>
                        )
                      ) : (
                        <></>
                      )}
                    </View>
                  </View>
                  <View style={[styles.chatBackground, { flex: 1 }]}>
                    <View
                      style={[
                        { justifyContent: "center" },
                        chat.text.length > limit && {
                          width: 260 * windowWidth,
                        },
                      ]}
                    >
                      <Text
                        style={[
                          { paddingLeft: 16 * windowHeight },
                          self === true && { color: "white" },
                          self === false && { color: "black" },
                          globalStyles.smallSemiFont,
                        ]}
                      >
                        {chat.text}
                      </Text>
                    </View>
                    <View
                      style={{
                        justifyContent: "flex-end",
                        paddingLeft: 8 * windowHeight,
                      }}
                    >
                      <Text
                        style={[
                          {
                            paddingBottom: 5 * windowHeight,
                            paddingRight: 16 * windowHeight,
                          },
                          self === true && { color: "white" },
                          self === false && { color: "#86868e" },
                          globalStyles.tinyLightFont,
                        ]}
                      >
                        {Platform.OS == "ios"
                          ? date.substring(12, 17)
                          : date.substring(11, 16)}
                      </Text>
                    </View>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </>
          ) : (
            // others chat
            <>
              <TouchableWithoutFeedback
                onLongPress={() => {
                  if (showChatExtraMenu == index) {
                    setShowChatExtraMenu(null);
                  } else {
                    setShowChatExtraMenu(index);
                  }
                  setShowAddMenu(false);
                }}
              >
                <View
                  style={[
                    styles.chatBackground,
                    self === true && {
                      backgroundColor: GlobalColor,
                      alignSelf: "flex-end",
                    },
                    self === false && {
                      backgroundColor: "#e5e5e5",
                      alignSelf: "flex-start",
                    },
                    chat.text.length > limit && {
                      height:
                        54 * windowHeight +
                        (Math.floor(chat.text.length / limit) + 1) *
                          14 *
                          windowHeight,
                    },
                    chat.text.length <= limit && {
                      height: 36 * windowHeight + 24 * windowHeight,
                    },
                  ]}
                >
                  <View
                    style={[
                      { justifyContent: "center" },
                      chat.text.length > limit && { width: 260 * windowWidth },
                    ]}
                  >
                    <Text
                      style={[
                        {
                          color: checkColor(chat.sender),
                          paddingLeft: 16 * windowHeight,
                          paddingBottom: 6 * windowHeight,
                        },
                        globalStyles.smallBoldFont,
                      ]}
                    >
                      {chat.sender}
                    </Text>
                    <Text
                      style={[
                        { paddingLeft: 16 * windowHeight },
                        self === true && { color: "white" },
                        self === false && { color: "black" },
                        globalStyles.smallSemiFont,
                      ]}
                    >
                      {chat.text}
                    </Text>
                  </View>
                  <View
                    style={{
                      justifyContent: "flex-end",
                      paddingLeft: 8 * windowHeight,
                    }}
                  >
                    <Text
                      style={[
                        {
                          paddingBottom: 5 * windowHeight,
                          paddingRight: 16 * windowHeight,
                        },
                        self === true && { color: "white" },
                        self === false && { color: "#86868e" },
                        globalStyles.tinyLightFont,
                      ]}
                    >
                      {Platform.OS == "ios"
                        ? date.substring(12, 17)
                        : date.substring(11, 16)}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
            </>
          )
        ) : (
          <></>
        )}
        {index == showChatExtraMenu ? (
          <View
            style={[
              {
                width: 192 * windowWidth,
                backgroundColor: "#c4c4c4",
                height: 22 * windowHeight,
                borderRadius: 6 * windowHeight,
                marginTop: 4 * windowHeight,
                flexDirection: "row",
              },
              self == true && { alignSelf: "flex-end" },
            ]}
          >
            <View
              style={{
                width: 64 * windowWidth,
                justifyContent: "center",
                borderRightColor: "#ffffff",
                borderRightWidth: 1,
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  setShowReplyBox(true);
                  setShowChatExtraMenu(null);
                  setReplySender(chat.sender);
                  setReplyContent(chat.text);
                  setReplyID(chat.id);
                }}
              >
                <Text
                  style={[styles.extraMenuText, globalStyles.smallSemiFont]}
                >
                  Reply
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.extraMenuBox}>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(chat.text);
                  setShowChatExtraMenu(null);
                }}
              >
                <Text
                  style={[styles.extraMenuText, globalStyles.smallSemiFont]}
                >
                  Copy
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.extraMenuBox}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Report", {
                    chatContent: chat.text,
                    chatToReport: true,
                    chatSender: chat.sender,
                    chatID: chat.id,
                    chatTime: date,
                  });
                }}
              >
                <Text
                  style={[styles.extraMenuText, globalStyles.smallSemiFont]}
                >
                  Report
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <></>
        )}
      </View>
    );
  };

  return (
    <View
      style={{
        height: 815 * windowHeight,
        justifyContent: "space-between",
        flexDirection: "column",
        backgroundColor: GlobalColor,
        width: "100%",
      }}
    >
      <View
        style={{
          height: 64 * windowHeight,
          backgroundColor: GlobalColor,
          width: 375 * windowWidth,
          flexDirection: "row",
          paddingHorizontal: 22 * windowWidth,
          justifyContent: "space-between",
        }}
      >
        <View style={{ justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => {
              showParticipantsList
                ? setShowParticipantsList(false)
                : navigation.goBack();
            }}
          >
            <Ionicons
              name="chevron-back-sharp"
              size={20 * windowHeight}
              color="white"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            paddingRight: 16 * windowWidth,
            marginLeft: 6 * windowWidth,
          }}
        >
          {chatroom.chatRoom.type === "Direct" ? (
            <View style={{ justifyContent: "center" }}>
              <View
                style={{
                  paddingBottom: 0 * windowHeight,
                  alignSelf: "flex-end",
                }}
              >
                <TouchableWithoutFeedback
                  disabled={true}
                  onPress={() => {
                    textTickerRef.startAnimation();
                  }}
                >
                  <TextTicker
                    style={[{ color: "white" }, globalStyles.largeBoldFont]}
                    duration={120 * chatroom.chatRoom.chat.items.length}
                    bounce
                    repeatSpacer={50}
                    marqueeDelay={10000}
                  >
                    {chatroom.chatRoom.name}
                  </TextTicker>
                </TouchableWithoutFeedback>
              </View>
            </View>
          ) : (
            <View
              style={[
                chatroom.chatRoom.type === "Event" && {
                  width: 198 * windowWidth,
                },
                { justifyContent: "center", flexDirection: "column" },
              ]}
            >
              <View style={{ alignSelf: "flex-end" }}>
                <TouchableOpacity
                  disabled={true}
                  onPress={() => {
                    textTickerRef.startAnimation();
                  }}
                >
                  <TextTicker
                    style={[{ color: "white" }, globalStyles.largeBoldFont]}
                    duration={120 * chatroom.chatRoom.name.length}
                    bounce
                    repeatSpacer={50}
                    marqueeDelay={10000}
                  >
                    {chatroom.chatRoom.name}
                  </TextTicker>
                </TouchableOpacity>
              </View>
              {chatroom.chatRoom.type === "Event" ? (
                <View style={{ alignSelf: "flex-end" }}>
                  <TouchableOpacity
                    onPress={() => {
                      setShowParticipantsList(!showParticipantsList);
                    }}
                  >
                    <Text
                      style={[{ color: "#c4c4c4" }, globalStyles.smallSemiFont]}
                    >
                      {chatroom.chatRoom.user.items.length} members
                    </Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <></>
              )}
            </View>
          )}
          <View style={styles.imageContainer}>
            <Image
              style={{
                borderRadius: 36 * windowHeight,
                height: 36 * windowHeight,
                width: 36 * windowHeight,
                backgroundColor: "#e5e5e5",
              }}
              source={
                chatroom.chatRoom.type === "Direct"
                  ? chatroom.chatRoom.image
                  : chatroom.chatRoom.image
              }
            />
          </View>
        </View>
      </View>
      <KeyboardAvoidingView
        style={{ height: 815 * windowHeight, backgroundColor: "#FFF" }}
        keyboardOpeningTime={0}
        keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20 * windowHeight}
        behavior={Platform.OS == "ios" ? "position" : "position"}
        enabled={Platform.OS == "ios" ? true : false}
        enableAutomaticScroll={Platform.OS === "ios"}
      >
        <View>
          {showParticipantsList ? (
            <ParticipantsList participants={participants} />
          ) : (
            <FlatList
              data={chatDetail}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              style={{
                paddingHorizontal: 18 * windowWidth,
                height: inputFocus
                  ? (815 - 64 - 64 - 16) * windowHeight - keyboardHeight
                  : (815 - 64 - 64 - 16) * windowHeight,
                paddingTop: 16 * windowHeight,
                marginBottom: 8 * windowHeight,
                backgroundColor: "red",
              }}
              ref={messageScrollViewRef}
              initialNumToRender={chatDetail.length}
            />
          )}

          {showParticipantsList ? (
            <></>
          ) : (
            <View>
              {showAddMenu ? (
                <Animated.View
                  style={{
                    position: "absolute",
                    top: -128 * windowHeight,
                    left: 8 * windowWidth,
                    opacity: opacity,
                  }}
                >
                  <AddMenu />
                </Animated.View>
              ) : (
                <></>
              )}
              {showReplyBox ? (
                <View
                  style={{
                    alignSelf: "center",
                    justifyContent: "center",
                    paddingBottom: 6 * windowHeight,
                    position: "absolute",
                    top: -64 * windowHeight,
                    backgroundColor: "#e5e5e5",
                    borderRadius: 15,
                    width: (375 - 12 * 2) * windowWidth,
                    height: 56 * windowHeight,
                    borderColor: "#86868e",
                    borderWidth: 1,
                    zIndex: -1,
                    alignSelf: "center",
                  }}
                >
                  <View
                    style={{
                      flexDirection: "column",
                      paddingHorizontal: 14 * windowWidth,
                      justifyContent: "space-around",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      {replySender == "Tigger Chan" ? (
                        <Text
                          style={[
                            { alignSelf: "center", color: "#006400" },
                            globalStyles.smallSemiFont,
                          ]}
                        >
                          Reply: You
                        </Text>
                      ) : (
                        <Text
                          style={[
                            { alignSelf: "center" },
                            chatroom.chatRoom.type == "Direct" && {
                              color: "#8b0000",
                            },
                            (chatroom.chatRoom.type == "Post" ||
                              chatroom.chatRoom.type == "Event") && {
                              color: checkColor(replySender),
                            },
                            globalStyles.smallSemiFont,
                          ]}
                        >
                          Reply: {replySender}
                        </Text>
                      )}
                      <View style={{ alignSelf: "center" }}>
                        <TouchableOpacity
                          onPress={() => {
                            setShowReplyBox(false);
                          }}
                        >
                          <Entypo
                            name="cross"
                            color="#555555"
                            size={16 * windowHeight}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                    {replyContent.length > 34 ? (
                      <Text
                        style={[
                          { paddingTop: 4 * windowHeight },
                          globalStyles.smallSemiFont,
                        ]}
                      >
                        {replyContent.substring(0, 34)}...
                      </Text>
                    ) : (
                      <Text
                        style={[
                          { paddingTop: 4 * windowHeight },
                          globalStyles.smallSemiFont,
                        ]}
                      >
                        {replyContent}
                      </Text>
                    )}
                  </View>
                </View>
              ) : (
                <></>
              )}
              {imageUploadingChat ? (
                <TouchableWithoutFeedback>
                  <View
                    style={{
                      alignSelf: "center",
                      justifyContent: "center",
                      position: "absolute",
                      top: -64 * windowHeight,
                      backgroundColor: "#e5e5e5",
                      borderRadius: 15,
                      width: (375 - 12 * 2) * windowWidth,
                      height: 56 * windowHeight,
                      borderColor: "#86868e",
                      borderWidth: 1,
                      zIndex: -1,
                      alignSelf: "center",
                    }}
                  >
                    <View style={[styles.chatBackground, { flex: 1 }]}>
                      <View
                        style={[
                          {
                            justifyContent: "flex-start",
                            width: "85%",
                            flexDirection: "row",
                            alignItems: "center",
                            paddingLeft: 12 * windowWidth,
                            alignSelf: "center",
                          },
                        ]}
                      >
                        <Text
                          style={[
                            { paddingLeft: 0, color: "black" },
                            globalStyles.smallSemiFont,
                          ]}
                        >
                          Image Uploading
                        </Text>
                        <ActivityIndicator
                          size="small"
                          color={GlobalColor}
                          style={{ paddingLeft: 12 * windowWidth }}
                        />
                      </View>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              ) : null}
            </View>
          )}
        </View>
        <View
          style={{
            backgroundColor: "#FFF",
            borderTopWidth: 1,
            borderTopColor: "#c2c2c2",
            alignSelf: "center",
            height: 64 * windowHeight,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: 375 * windowWidth,
              alignItems: "center",
              height: "100%",
            }}
          >
            {/*<TouchableOpacity
        disabled={imageUploadingChat ? true : false}
        onPress={async () => {
            setShowAddMenu(!showAddMenu); opacity.setValue(0.2); await fadeIn()
        }}>
        <View style={[(showAddMenu) && { backgroundColor: GlobalColor }, { justifyContent: 'center', width: 32 * windowWidth, height: 32 * windowHeight, borderRadius: 16 * windowHeight }]}>
            {(showAddMenu)
                ? <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Entypo name='plus' size={32 * windowHeight} color="#ffffff" />
                </View>
                : <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Entypo name='plus' size={32 * windowHeight} color={imageUploadingChat ? "#C4C4C4" : GlobalColor} />
                </View>
            }
        </View>
    </TouchableOpacity>
*/}
            <View style={styles.inputBox}>
              <TextInput
                value={value}
                onChangeText={onChangeText}
                style={[
                  { width: 224 * windowWidth },
                  globalStyles.smallSemiFont,
                ]}
                placeholder="type your messages here..."
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                returnKeyType="send"
                onPressOut={() => {
                  setTimeout(() => {
                    setFocus(true);
                  }, 100);
                }}
                onPressOut={() => {
                  setTimeout(() => {
                    setFocus(false);
                  }, 100);
                }}
                onSubmitEditing={async () => {
                  if (value == null || value == "") {
                    return;
                  }
                  onChangeText("");
                  if (showReplyBox) {
                    const newChat = await addChat(
                      {
                        isImage: "false",
                        chatRoomID: chatRoomID,
                        reply: "true",
                        sender: user.name,
                        senderID: user.id,
                        text: value,
                        replyID: replyID,
                        replyName: replySender,
                        replyText: replyContent,
                      },
                      true
                    );
                    setShowReplyBox(false);
                  } else {
                    const newChat = await addChat(
                      {
                        isImage: "false",
                        chatRoomID: chatRoomID,
                        reply: "false",
                        sender: user.name,
                        senderID: user.id,
                        text: value,
                        replyName: "",
                        replyText: "",
                      },
                      false
                    );
                  }
                  setFocus(!inputFocus);
                }}
              ></TextInput>
            </View>

            <View style={{ justifyContent: "center" }}>
              <TouchableOpacity
                onPress={async () => {
                  onChangeText("");
                  if (showReplyBox) {
                    const newChat = await addChat(
                      {
                        isImage: "false",
                        chatRoomID: chatRoomID,
                        reply: "true",
                        sender: user.name,
                        senderID: user.id,
                        text: value,
                        replyID: replyID ?? "",
                        replyName: replySender ?? "",
                        replyText: replyContent ?? "",
                      },
                      true
                    );
                    setShowReplyBox(false);
                  } else {
                    const newChat = await addChat(
                      {
                        isImage: "false",
                        chatRoomID: chatRoomID,
                        reply: "false",
                        sender: user.name, //"Jason So"
                        senderID: user.id,
                        text: value,
                        replyName: "",
                        replyText: "",
                      },
                      false
                    );
                  }
                  setFocus(!inputFocus);
                }}
                disabled={value == null || value == ""}
              >
                <View
                  style={{
                    justifyContent: "center",
                    width: 32 * windowHeight,
                    height: 32 * windowHeight,
                  }}
                >
                  {value == null || value == "" ? (
                    <FontAwesome
                      name="send"
                      size={20 * windowHeight}
                      color="#c4c4c4"
                      style={{ alignSelf: "center" }}
                    />
                  ) : (
                    <FontAwesome
                      name="send"
                      size={20 * windowHeight}
                      color={GlobalColor}
                      style={{ alignSelf: "center" }}
                    />
                  )}
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
};

ChatDetailScreen.navigationOptions = () => {
  return {
    headerShown: true,
  };
};

const styles = StyleSheet.create({
  chatBackground: {
    borderRadius: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imageContainer: {
    backgroundColor: GlobalColor,
    justifyContent: "center",
    width: 36 * windowHeight,
    height: 36 * windowHeight,
    borderRadius: 36 * windowHeight,
    paddingLeft: 16 * windowHeight,
    alignSelf: "center",
  },
  inputBox: {
    width: (375 - 64 - 64) * windowWidth,
    height: 34 * windowHeight,
    backgroundColor: "white",
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#c4c4c4",
    alignSelf: "center",
    justifyContent: "center",
    paddingHorizontal: 12 * windowWidth,
    marginLeft: 12 * windowWidth,
    marginRight: 8 * windowWidth,
  },
  toolContainer: {
    width: 145 * windowWidth,
    height: 82 * windowHeight,
    borderRadius: 15,
    backgroundColor: GlobalColor,
    marginTop: 36 * windowHeight,
    alignSelf: "center",
    zIndex: 1,
  },
  toolText: {
    fontSize: 10 * windowHeight,
    fontWeight: "bold",
    color: "#ffffff",
  },
  extraMenuBox: {
    width: 64 * windowWidth,
    justifyContent: "center",
    borderLeftColor: "#ffffff",
    borderLeftWidth: 1,
  },
  extraMenuText: {
    alignSelf: "center",
    color: GlobalColor,
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
    borderRadius: 10 * windowHeight,
  },
  participantsimage: {
    height: 36 * windowHeight,
    width: 36 * windowHeight,
    borderRadius: 18 * windowHeight,
    backgroundColor: "#e5e5e5",
  },
});

export default ChatDetailScreen;
