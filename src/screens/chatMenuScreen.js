import React, { useState, useRef, useContext, useEffect } from "react";
import {
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
  Modal,
  Pressable,
} from "react-native";
import { Ionicons, Entypo, AntDesign, FontAwesome5 } from "@expo/vector-icons";

import { Context as UserContext } from "../context/UserContext";
import { Context as ChatContext } from "../context/ChatContext";
import { Context as NavigationContext } from "../context/NavigationContext";
import { useFocusEffect } from "@react-navigation/native";
import GlobalColor from "../context/GlobalColor";
const globalStyles = require("../context/GlobalStyles");
const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;

const ChatMenuScreen = ({ navigation }) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [userInput, setUserInput] = useState("");
  const [activeTab, setActiveTab] = useState("");
  const [createdAt, setCreatedAt] = useState([]);
  let TextInputRef = useRef(null);

  const { state: user, getOneUser, guestSignUp } = useContext(UserContext);
  const { getChat, addChatRoom, getUnreadChats } = useContext(ChatContext);
  const { state: chats, fetchChatsWithFilter } = useContext(NavigationContext);
  const [showGuestSignUp, setShowGuestSignUp] = useState(
    user == "Guest" ? true : false
  );

  useFocusEffect(
    React.useCallback(() => {
      setShowGuestSignUp(user == "Guest" ? true : false);
      async function fetchChats() {
        await fetchChatsWithFilter(user.id);
        const fetchedUnreadChats = await getUnreadChats(user.id);
        const createdAtArray = fetchedUnreadChats.map(
          (item) => item.chatRoom.chat.items
        );
        setCreatedAt(createdAtArray);
      }
      if (user !== "Guest") {
        fetchChats();
      }
      // Do something when the screen is focused
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );

  useEffect(() => {
    console.log(
      "Direct: ",
      chats.filter((chatroom, index) => chatroom.chatRoom.type === "Direct")
        .length
    );
    console.log(
      "Event: ",
      chats.filter((chatroom, index) => chatroom.chatRoom.type === "Event")
        .length
    );
  }, [chats]);
  // const todayDate = new Date

  // const chatroom = [
  //     {
  //         name: "Ivan Ho",
  //         chat: {
  //             items: [
  //                 {
  //                     text: "Hello",
  //                     isImage: false,
  //                     createdAt:"2021-12-09T01:00:00Z",
  //                     senderID:0
  //                 },
  //                 {
  //                     text: "Hello",
  //                     isImage: false,
  //                     createdAt:todayDate.toLocaleString(),
  //                     senderID:0
  //                 },
  //                 {
  //                     text: "What's up?",
  //                     isImage: false,
  //                     createdAt:todayDate.toLocaleString(),
  //                     senderID:1
  //                 }
  //             ]
  //         },
  //         type:"Direct",
  //         image: tempUserImage,
  //     },
  //     {
  //         name: "Mark Zuckerberg",
  //         chat: {
  //             items: [
  //                 {
  //                     text: "Good Morning",
  //                     isImage: true,
  //                     createdAt:"2019-01-01T01:00:00Z"
  //                 }
  //             ]
  //         },
  //         type:"Direct",
  //         image: tempUserImage
  //     }
  // ]

  function chatMessageStyle() {
    return [
      {
        color: "#86868e",
      },
      globalStyles.smallLightFont,
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
        paddingLeft: 8 * windowWidth,
      },
      globalStyles.largeSemiFont,
    ];
  }

  function directChatRender() {
    return chats.map((chatroom, index) => (
      <DirectChatContent chatroom={chatroom} index={index} />
    ));
  }
  const DirectChatContent = ({ chatroom, index }) => {
    return (
      <>
        {showSearchBar ? (
          chatroom.chatRoom.name
            .toLowerCase()
            .includes(userInput.toLowerCase()) ? (
            <ChatMenuItem
              chatroom={chatroom}
              index={index}
              chatRoomType="Direct"
            />
          ) : (
            <></>
          )
        ) : (
          <ChatMenuItem
            chatroom={chatroom}
            index={index}
            chatRoomType="Direct"
          />
        )}
      </>
    );
  };

  const ChatMenuItem = ({ chatroom, index, chatRoomType }) => {
    console.log(chatroom.lastEnterTime);
    // console.log("check Time", createdAt[index].filter((item) => item.createdAt < chatroom.lastEnterTime))
    const unreadCount = createdAt[index]
      ? createdAt[index].filter(
          (item) => item.createdAt > chatroom.lastEnterTime
        ).length
      : 0;

    return (
      <TouchableOpacity
        key={index}
        onPress={async () => {
          const chat = await getChat(chatroom.chatRoomID);
          console.log("this chat room:");
          console.log(chatroom);
          navigation.navigate("ChatDetail", {
            chatroom: chatroom,
          });
        }}
      >
        <View style={styles.chatContainer}>
          <View
            style={{
              flexDirection: "column",
              justifyContent: "space-between",
              width: 230 * windowWidth,
            }}
          >
            <View style={{ paddingTop: 16 * windowHeight }}>
              {/* Chat Person Name Tigger*/}
              <Text style={chatTitleStyle()}>{chatroom.chatRoom.name}</Text>
            </View>
            <View
              style={{
                paddingBottom: 16 * windowHeight,
                paddingTop: 16 * windowHeight,
              }}
            >
              {chatroom.chatRoom.chat.items.length !== 0 ? (
                chatroom.chatRoom.chat.items[
                  chatroom.chatRoom.chat.items.length - 1
                ].isImage == "true" ? (
                  <View style={{ flexDirection: "row" }}>
                    <Text style={chatMessageStyle()}>Photo</Text>
                    <Ionicons
                      name="ios-image-outline"
                      size={16}
                      color="#86868e"
                      style={{
                        paddingLeft: 8 * windowWidth,
                        alignSelf: "center",
                      }}
                    />
                  </View>
                ) : chatroom.chatRoom.chat.items[
                    chatroom.chatRoom.chat.items.length - 1
                  ].text.length < 32 ? (
                  <Text style={chatMessageStyle()}>
                    {
                      chatroom.chatRoom.chat.items[
                        chatroom.chatRoom.chat.items.length - 1
                      ].text
                    }
                  </Text>
                ) : (
                  <Text style={chatMessageStyle()}>
                    {chatroom.chatRoom.chat.items[
                      chatroom.chatRoom.chat.items.length - 1
                    ].text.substring(0, 31)}
                    ...
                  </Text>
                )
              ) : (
                <Text></Text>
              )}
            </View>
          </View>
          <View style={{ justifyContent: "center", flexDirection: "row" }}>
            {unreadCount > 0 ? (
              unreadCount > 99 ? (
                <View style={styles.unreadMessage}>
                  <Text
                    style={[
                      globalStyles.smallSemiFont,
                      styles.unreadMessageCounter,
                    ]}
                  >
                    99
                  </Text>
                </View>
              ) : (
                <View style={styles.unreadMessage}>
                  <Text
                    style={[
                      globalStyles.smallSemiFont,
                      styles.unreadMessageCounter,
                    ]}
                  >
                    {unreadCount}
                  </Text>
                </View>
              )
            ) : (
              <></>
            )}
            <View style={styles.imageContainer}>
              <Image
                style={styles.chatImage}
                source={{ uri: chatroom.chatRoom.image }}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <>
      {user == "Guest" ? (
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
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
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
          <View
            style={{
              height: 48 * windowHeight,
              flexDirection: "row",
              justifyContent: "center",
              marginTop: 48 * windowHeight,
            }}
          >
            {/* SearchBar */}

            {showSearchBar ? (
              <>
                <View
                  style={{
                    justifyContent: "center",
                    paddingRight: 8 * windowWidth,
                    paddingTop: 12 * windowHeight,
                  }}
                >
                  <TouchableWithoutFeedback
                    onPress={() => {
                      setShowSearchBar(false);
                      TextInputRef.focus();
                      setUserInput("");
                    }}
                  >
                    <Ionicons
                      name="chevron-back-sharp"
                      size={20 * windowHeight}
                      color="black"
                    />
                  </TouchableWithoutFeedback>
                </View>
                <View
                  style={{
                    justifyContent: "center",
                    paddingTop: 12 * windowHeight,
                  }}
                >
                  <TouchableWithoutFeedback
                    style={{
                      width: 288 * windowWidth,
                      justifyContent: "center",
                      backgroundColor: "#e5e5e5",
                      height: 28 * windowHeight,
                      alignContent: "center",
                      borderRadius: 8 * windowHeight,
                      paddingLeft: 4 * windowWidth,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        paddingLeft: 6 * windowWidth,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <View>
                        <AntDesign
                          name="search1"
                          size={12 * windowHeight}
                          color="#86868E"
                        />
                      </View>
                      <View style={{ paddingLeft: 8 * windowWidth }}>
                        <TextInput
                          style={[
                            { color: "#86868E", width: 268 * windowWidth },
                            globalStyles.smallLightFont,
                          ]}
                          autoCapitalize="none"
                          autoCorrect={false}
                          autoFocus={true}
                          onChangeText={(text) => {
                            setUserInput(text);
                          }}
                          ref={(ref) => (TextInputRef = ref)}
                        >
                          {userInput}
                        </TextInput>
                      </View>
                    </View>
                  </TouchableWithoutFeedback>
                </View>
              </>
            ) : (
              <SafeAreaView
                style={{
                  alignSelf: "center",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  flexGrow: 1,
                  zIndex: 1,
                }}
              >
                <View style={{ paddingTop: 12 * windowHeight, width: "100%" }}>
                  <View
                    style={{
                      width: "90%",
                      height: 36 * windowHeight,
                      justifyContent: "space-between",
                      flexDirection: "row",
                      alignSelf: "center",
                    }}
                  >
                    <TouchableOpacity
                      onPress={() => {
                        setShowSearchBar(true);
                      }}
                      style={{
                        flexDirection: "row",
                        height: 36 * windowHeight,
                        alignItems: "center",
                      }}
                    >
                      <View
                        style={{
                          width: 32 * windowHeight,
                          height: 32 * windowHeight,
                          backgroundColor: "#e5e5e5",
                          borderRadius: 16 * windowHeight,
                          alignContent: "center",
                          alignSelf: "center",
                          justifyContent: "center",
                          alignItems: "center",
                          shadowColor: "#c4c4c4",
                          shadowRadius: 1.5 * windowWidth,
                          shadowOffset: { height: 3 * windowHeight },
                          shadowOpacity: 0.3,
                        }}
                      >
                        <AntDesign
                          name="search1"
                          size={16 * windowHeight * windowWidth}
                          color="white"
                        />
                      </View>
                    </TouchableOpacity>
                  </View>
                </View>
              </SafeAreaView>
            )}
          </View>

          {/* Main Part */}

          <View
            style={{
              alignSelf: "center",
              alignItems: "center",
              width: 375 * windowWidth,
              marginTop: 0 * windowHeight,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                width: "90%",
                height:
                  Platform === "ios" ? 108 * windowHeight : 124 * windowHeight,
                justifyContent: "space-between",
                paddingTop:
                  Platform === "ios" ? 0 * windowHeight : 12 * windowHeight,
              }}
            >
              <View
                style={{
                  height: 108 * windowHeight,
                  justifyContent: "space-around",
                }}
              >
                <Text
                  style={[{ color: GlobalColor }, globalStyles.largeHeaderFont]}
                >
                  Message
                </Text>
              </View>
              <View
                style={{
                  height: 108 * windowHeight,
                  width: 72 * windowWidth,
                  justifyContent: "center",
                }}
              >
                <TouchableWithoutFeedback
                  onPress={() => {
                    navigation.navigate("SettingProfile");
                  }}
                >
                  <View
                    style={{
                      width: 72 * windowHeight,
                      height: 72 * windowHeight,
                      alignSelf: "center",
                      borderRadius: 36 * windowHeight,
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    {/* User Image */}
                    <Image
                      style={{
                        borderRadius: 72 * windowHeight,
                        height: 72 * windowHeight,
                        width: 72 * windowHeight,
                        borderColor: GlobalColor,
                        borderWidth: 2,
                      }}
                      source={{ uri: user.image }}
                    />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: "#e5e5e5",
                marginTop: 24 * windowHeight,
                height: 508 * windowHeight,
                width: "100%",
              }}
            >
              <ScrollView>
                <View>{directChatRender()}</View>
              </ScrollView>
            </View>
          </View>
        </View>
      )}
    </>
  );
};

ChatMenuScreen.navigationOptions = () => {
  return {
    headerShown: true,
  };
};

const styles = StyleSheet.create({
  chatContainer: {
    width: 375 * windowWidth,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
    paddingHorizontal: 24 * windowWidth,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  unreadMessage: {
    alignSelf: "center",
    backgroundColor: GlobalColor,
    width: 20 * windowWidth,
    height: 20 * windowHeight,
    borderRadius: 12 * windowHeight,
    justifyContent: "center",
    marginRight: 12 * windowWidth,
  },
  unreadMessageCounter: {
    color: "#ffffff",
    alignSelf: "center",
  },
  imageContainer: {
    height: 64 * windowHeight,
    width: 64 * windowHeight,
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "center",
  },
  chatImage: {
    borderRadius: 32 * windowHeight,
    height: 64 * windowHeight,
    width: 64 * windowHeight,
    backgroundColor: "#e5e5e5",
    borderWidth: 2 * windowHeight,
    borderColor: "#e5e5e5",
  },
});

export default ChatMenuScreen;
