import React, {
  useState,
  useRef,
  useEffect,
  useContext,
  useCallback,
  useLayoutEffect,
} from "react";
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
  StatusBar,
  TouchableHighlight,
} from "react-native";
import { Ionicons, FontAwesome, Entypo } from "@expo/vector-icons";
import tempUserImage from "../../assets/facebook.png";
import TextTicker from "react-native-text-ticker";
import * as Clipboard from "expo-clipboard";
import { TouchableOpacityBase } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useKeyboard } from "../components/useKeyboard";
import { Avatar } from "react-native-elements";
import { Context as UserContext } from "../context/UserContext";
import { Context as ChatContext } from "../context/ChatContext";
import { GiftedChat } from "react-native-gifted-chat";
import { retry } from "@aws-amplify/core";
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
  const { chatroom, partiID, Geen } = route.params;
  const [messages, setMessages] = useState([]);
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
    //  console.log(showChatExtraMenu)
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

  const onSend = useCallback(async (messages = []) => {
    if (messages[0]) {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );
      console.log(messages[0]);
      const newChat = await addChat(
        {
          chatRoomID: chatRoomID,
          reply: "false",
          sender: user.name, //"Jason So"
          senderID: user.id,
          text: messages[0].text,
          replyName: "",
          replyText: "",
          image: user.image,
        },
        user.image
      );
    }
  }, []);

  useEffect(() => {
    console.log(chatDetail);
    setMessages(chatDetail);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ height: "12%", width: "100%" }}>
        <View style={styles.statusBarWrapper}>
          <StatusBar
            translucent
            barStyle="light-content"
            backgroundColor={GlobalColor}
          />
        </View>
        <View style={styles.topHeaderWrapperStyle}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.topHeaderLeftItemStyle}
          >
            <Ionicons
              name="chevron-back-sharp"
              size={32 * windowHeight}
              color="#fff"
            />
          </TouchableOpacity>
          <View style={styles.topHeaderMidItemStyle}>
            <Text style={[globalStyles.largeSemiFont, { color: "#FFF" }]}>
              {chatroom.chatRoom.name.length > 35
                ? chatroom.chatRoom.name.substring(0, 35)
                : chatroom.chatRoom.name}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.topHeaderRightItemStyle}
            disabled={chatroom.chatRoom.type === "Direct" ? true : false}
            onPress={() => {
              if (chatroom.chatRoom.type !== "Direct") {
                setShowParticipantsList(!showParticipantsList);
              }
            }}
          >
            <Image
              style={styles.chatIcontStyle}
              source={{
                uri:
                  chatroom.chatRoom.type === "Direct"
                    ? chatroom.chatRoom.image
                    : chatroom.chatRoom.image,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <KeyboardAvoidingView
        behavior="padding"
        style={{ height: "88%", width: "100%" }}
      >
        {!showParticipantsList ? (
          <GiftedChat
            alwaysShowSend={true}
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: user.id,
              name: user.name,
              avatar: user.image,
            }}
          />
        ) : (
          <View style={styles.participantListStyle}>
              <ParticipantsList participants={participants} navigation={navigation} />
          </View>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

const ParticipantsList = ({ participants, navigation }) => {
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
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("SettingReport", {
                chatToReport: false,
              });
            }}
          >
            <Ionicons name="flag" size={20 * windowHeight} color={GlobalColor} style={{ alignSelf: "center" }} />
          </TouchableOpacity>
          <Image source={participant.image} style={styles.participantsimage} />
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

const styles = StyleSheet.create({
  statusBarWrapper: {
    width: "100%",
    height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: GlobalColor,
  },
  topHeaderWrapperStyle: {
    flexDirection: "row",
    backgroundColor: GlobalColor,
    width: "100%",
    height: 102 * windowHeight,
    alignItems: "center",
    justifyContent: "center",
    alignContent: "center",
  },
  topHeaderLeftItemStyle: {
    width: 36 * windowWidth,
    justifyContent: "center",
    alignSelf: "center",
    height: 102 * windowHeight,
  },
  topHeaderMidItemStyle: {
    width: 264 * windowWidth,
    justifyContent: "center",
    alignSelf: "center",
    height: 102 * windowHeight,
  },
  topHeaderRightItemStyle: {
    width: 72 * windowWidth,
    justifyContent: "center",
    alignSelf: "center",
    height: 102 * windowHeight,
  },
  chatIcontStyle: {
    height: 64 * windowHeight,
    width: 64 * windowHeight,
    borderRadius: 64 * windowHeight,
  },
  participantListStyle: {
    width: "100%",
    height: "100%",
    paddingTop: 48 * windowHeight,
  },
});

export default ChatDetailScreen;
