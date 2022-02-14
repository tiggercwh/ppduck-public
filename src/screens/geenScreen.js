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
    ImageBackground,
    ScrollView,
    Image,
    StyleSheet,
    Modal,
    Share,
    ActivityIndicator,
} from "react-native";
import {
    Ionicons,
    FontAwesome,
    EvilIcons,
    Entypo,
    Feather,
    FontAwesome5,
    MaterialIcons
} from "@expo/vector-icons";
import { Context as UserContext } from "../context/UserContext";
import { Context as ChatContext } from "../context/ChatContext";
import { Context as GeenContext } from "../context/GeenContext";
import Button from "../components/Button";
import * as Linking from "expo-linking";
import GlobalColor from "../context/GlobalColor";
const globalStyles = require("../context/GlobalStyles");
const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;
const fontSizeAdj = windowWidth * windowHeight;

// const Geen = {
//     name: "Sai Kung Boat Party",
//     time: "2021-12-09T01:00:00Z",
//     location: "Sai Kung Pier",
//     description: "For water sports enthusiasts and party lovers, activities include wake surfing, beach games and karaoke.For water sports enthusiasts and party lovers, activities include wake surfing, beach games and karaoke.For water sports enthusiasts and party lovers, activities include wake surfing, beach games and karaoke.For water sports enthusiasts and party lovers, activities include wake surfing, beach games and karaoke.For water sports enthusiasts and party lovers, activities include wake surfing, beach games and karaoke.For water sports enthusiasts and party lovers, activities include wake surfing, beach games and karaoke.For water sports enthusiasts and party lovers, activities include wake surfing, beach games and karaoke.For water sports enthusiasts and party lovers, activities include wake surfing, beach games and karaoke.For water sports enthusiasts and party lovers, activities include wake surfing, beach games and karaoke.",
//     image: "https://d34ip4tojxno3w.cloudfront.net/app/uploads/Sailing-well-boat-Jehu-visitaland2017-DE.jpg"
// }

const GeenScreen = ({ navigation, route }) => {
    const { Geen } = route.params;
    useEffect(() => {
        // setEventURL(Linking.makeUrl('event/', {
        //     eventId: currentEvent.id
        // }))
        console.log(Geen);
    }, []);
    const colorTheme = "#57575c";
    const fullDescription = "";
    const shortenedDescription = fullDescription.substring(0, 250) + "...";
    const [showTextButton, setShowTextButton] = useState("show more");
    const [partialDescription, setPartialDescription] =
        useState(shortenedDescription);
    const [modalVisible, setModalVisible] = useState(false);
    const [messageShown, setMessageShown] = useState("");
    const [modalType, setmodalType] = useState("");
    const [eventURL, setEventURL] = useState("");
    const geenTime = new Date(Geen.geenTime);
    const [isLoading, setIsLoading] = useState(false);

    const { state: user, getOneUser, guestSignUp } = useContext(UserContext);

    const isAdmin = Geen.hostID == user.id ? true : false;

    useEffect(() => {
        // setEventURL(Linking.createURL('Geen', {
        //     queryParams: {
        //         GeenId: Geen.id
        //     }
        // }))

        setEventURL(`https://playplayduck-landing-page-geenmeenhk-gmailcom.vercel.app?GeenId=${Geen.id}`);
        console.log(eventURL);
    }, []);

    const onShare = async () => {
        let message = `${Geen.geenName}\n\nDate: ${geenTime}\nLocation: ${Geen.geenLocation}\n===========================\nPlay Play Duck - Play咩都得\n${eventURL}`;
        try {
            const result = await Share.share({
                message: message,
                title: `You are invited to join ${Geen.geenName}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            console.log(error);
        }
    };

    const { getChat } = useContext(ChatContext);
    const { userJoinGeen, getOneGeen, userLikeGeen, userUnlikeGeen } =
        useContext(GeenContext);

    let likedGeen = user.likedGeens
        ? user.likedGeens.items.filter((item, index) => item.geenID === Geen.id)
        : [];
    const [like, setLike] = useState(likedGeen.length !== 0 ? true : false);

    let joinedGeen = user.joinedGeens
        ? user.joinedGeens.items.filter((item, index) => item.geen.id === Geen.id)
        : [];
    const [joined, setJoined] = useState(
        joinedGeen.length !== 0 ? "Joined" : "NotJoined"
    );

    const GeenModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    //Alert.alert("Modal has been closed.");
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
                            {messageShown}
                        </Text>
                        <View
                            style={{
                                flexDirection: "row",
                                justifyContent: "space-around",
                                width: "100%",
                            }}
                        >
                            <Button
                                buttonText={"Yes"}
                                handlePress={async () => {
                                    //Delete Function
                                    if (modalType == "unlike") {
                                        await userUnlikeGeen({
                                            id: Geen.id + user.id,
                                        });
                                        const newUserData = await getOneUser(user.id);
                                        setLike(false);
                                        setmodalType("");
                                        setModalVisible(false);
                                    } else if (modalType == "Guest") {
                                        guestSignUp();
                                    }
                                }}
                                width={64 * windowWidth}
                                height={32 * windowHeight}
                            />
                            <Button
                                buttonText={"No"}
                                handlePress={() => {
                                    setModalVisible(false);
                                }}
                                width={64 * windowWidth}
                                height={32 * windowHeight}
                            />
                        </View>
                    </View>
                </View>
            </Modal>
        );
    };

    const GeenHeader = () => {
        return (
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
                >
                    <Ionicons name="chevron-back-sharp" size={24 * windowHeight} />
                </TouchableOpacity>
                <Text style={globalStyles.mediumLightFont}>Geen Detail</Text>
                <TouchableOpacity
                    onPress={async () => {
                        if (isAdmin == true) {
                            navigation.navigate("CreateDetail", { Geen: Geen });
                        } else {
                            if (like == false) {
                                console.log("like!");
                                setLike(true);
                                await userLikeGeen({
                                    id: Geen.id + user.id,
                                    geenID: Geen.id,
                                    userID: user.id,
                                });
                                const newUserData = await getOneUser(user.id);
                            } else {
                                setMessageShown("Are you sure you want to unlike this event?");
                                setmodalType("unlike");
                                setModalVisible(true);
                            }
                        }
                    }}
                >
                    {isAdmin ? (
                        //<FontAwesome name="edit" size={24 * windowHeight} />
                        <MaterialIcons name="mode-edit" size={24 * windowHeight} color="black" />
                    ) : like == true ? (
                        <FontAwesome
                            name="heart"
                            color={GlobalColor}
                            size={24 * windowHeight}
                        />
                    ) : (
                        <FontAwesome name="heart-o" size={24 * windowHeight} />
                    )}
                </TouchableOpacity>
            </View>
        );
    };

    const GeenPhoto = () => {
        const ShareButton = () => {
            return (
                <View
                    style={{
                        width: 36 * windowHeight,
                        height: 36 * windowHeight,
                        borderRadius: 18 * windowHeight,
                        backgroundColor: "#FFFFFF",
                        justifyContent: "center",
                        position: "absolute",
                        left: 16 * windowWidth,
                        bottom: 16 * windowHeight,
                    }}
                >
                    <TouchableOpacity
                        onPress={() => {
                            onShare();
                        }}
                    >
                        <EvilIcons
                            name="share-google"
                            size={20 * windowHeight}
                            style={{ alignSelf: "center" }}
                            color={"#57575c"}
                        />
                    </TouchableOpacity>
                </View>
            );
        };

        return (
            <View style={{ borderRadius: 16 * windowHeight }}>
                <ImageBackground
                    source={{ uri: Geen.geenPhoto[0] }}
                    style={{ width: "100%", height: 192 * windowHeight }}
                    imageStyle={{ borderRadius: 16 * windowHeight }}
                >
                    <ShareButton />
                    <View style={{
                        width: 36 * windowHeight,
                        height: 36 * windowHeight,
                        borderRadius: 18 * windowHeight,
                        backgroundColor: "#FFF",
                        justifyContent: "center",
                        position: "absolute",
                        right: 16 * windowWidth,
                        bottom: 16 * windowHeight,
                    }}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("SettingReport", {
                                    chatToReport: false,
                                });
                            }}
                        >
                            <Ionicons name="flag" size={14 * windowHeight} style={{ alignSelf: "center" }} color="black" />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    };

    const GeenInfo = () => {
        return (
            <>
                <View>
                    <Text style={[globalStyles.largeBoldFont, { color: "#57575c" }]}>
                        {Geen.geenName}
                    </Text>
                </View>
                <View
                    style={{
                        paddingTop: 32 * windowHeight,
                        justifyContent: "space-between",
                        borderBottomWidth: 0.2,
                        borderBottomColor: "#57575c",
                    }}
                >
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons
                            name="location-outline"
                            size={16 * windowHeight}
                            color={colorTheme}
                        />
                        <Text
                            style={[
                                globalStyles.smallLightFont,
                                { color: colorTheme, paddingLeft: 4 * windowWidth },
                            ]}
                        >
                            {Geen.geenLocation}
                        </Text>
                    </View>
                    <View
                        style={{
                            flexDirection: "row",
                            marginBottom: 24 * windowHeight,
                            paddingTop: 16 * windowHeight,
                            alignItems: "center",
                        }}
                    >
                        <Entypo
                            name="calendar"
                            size={16 * windowHeight}
                            color={colorTheme}
                        />
                        <Text
                            style={[
                                globalStyles.smallLightFont,
                                { color: colorTheme, paddingLeft: 4 * windowWidth },
                            ]}
                        >
                            {new Date(Geen.geenTime).toLocaleDateString("zh-hk")}{" "}
                            {new Date(Geen.geenTime).toLocaleTimeString("zh-hk", {
                                hour12: true,
                                hour: "2-digit",
                                minute: "2-digit",
                            })}
                        </Text>
                    </View>
                </View>
                <View style={{ paddingTop: 24 * windowHeight }}>
                    <Text style={[globalStyles.largeBoldFont, { color: colorTheme }]}>
                        Description
                    </Text>
                </View>
                <View
                    style={{
                        paddingTop: 16 * windowHeight,
                        flexDirection: "row",
                        justifyContent: "space-between",
                    }}
                >
                    {fullDescription.length > 250 ? (
                        <View>
                            <Text
                                style={[globalStyles.smallLightFont, { color: colorTheme }]}
                            >
                                {partialDescription}
                            </Text>
                            <TouchableOpacity
                                onPress={() => {
                                    if (showTextButton == "show more") {
                                        setShowTextButton("show less");
                                        setPartialDescription(fullDescription);
                                    } else {
                                        setShowTextButton("show more");
                                        setPartialDescription(shortenedDescription);
                                    }
                                }}
                            >
                                <Text
                                    style={[globalStyles.smallLightFont, { color: GlobalColor }]}
                                >
                                    {showTextButton}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <Text style={[globalStyles.smallLightFont, { color: colorTheme }]}>
                            {fullDescription}
                        </Text>
                    )}
                </View>
            </>
        );
    };

    const GeenActionButton = () => {
        return (
            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <TouchableOpacity
                    onPress={async () => {
                        if (joined == "Joined") {
                            console.log(
                                "pressed",
                                user.joinedChats.items.filter(
                                    (chatroom) => chatroom.chatRoomID == Geen.chatRoomID
                                )
                            );
                            console.log(Geen.chatRoomID);
                            console.log(user);
                            if (Geen.chatRoomID) {
                                const userInfo = user.joinedChats.items.filter(
                                    (chatroom) => chatroom.chatRoomID == Geen.chatRoomID
                                )[0];
                                console.log(userInfo)
                                const chatroom = await getChat(Geen.chatRoomID);
                                navigation.navigate("ChatDetail", {
                                    chatroom: { chatRoom: chatroom },
                                    partiID: userInfo.id,
                                });
                            } else {
                                setErrorMessageShown("There is no chatroom for this geen.");
                                setModalErrorVisible(true);
                            }
                        }
                    }}
                >
                    <View
                        style={[
                            {
                                width: 48 * windowHeight,
                                height: 48 * windowHeight,
                                borderRadius: 12 * windowHeight,
                                borderWidth: 1,
                                borderColor: joined == "Joined" ? GlobalColor : colorTheme,
                                justifyContent: "center",
                            },
                            joined == "Joined" && { backgroundColor: "#fff" },
                        ]}
                    >
                        <View
                            style={{
                                width: 48 * windowHeight,
                                height: 48 * windowHeight,
                                borderRadius: 12 * windowHeight,
                                justifyContent: "center",
                            }}
                        >
                            <Ionicons
                                name="chatbox-outline"
                                size={24 * windowHeight}
                                color={GlobalColor}
                                style={{ alignSelf: "center" }}
                            />
                        </View>
                    </View>
                </TouchableOpacity>
                {joined == "Joined" ? (
                    isAdmin == true ? (
                        <></>
                    ) : (
                        <TouchableOpacity
                            onPress={async () => {
                                navigation.navigate("ParticipantsList", {
                                    participantsList: Geen.participants.items,
                                    Geen: Geen,
                                });
                            }}
                        >
                            <View
                                style={[
                                    {
                                        width: 48 * windowHeight,
                                        height: 48 * windowHeight,
                                        borderRadius: 12 * windowHeight,
                                        borderWidth: 1,
                                        borderColor: joined == "Joined" ? GlobalColor : colorTheme,
                                        justifyContent: "center",
                                    },
                                    joined == "Joined" && { backgroundColor: "#fff" },
                                ]}
                            >
                                <View
                                    style={{
                                        width: 48 * windowHeight,
                                        height: 48 * windowHeight,
                                        borderRadius: 12 * windowHeight,
                                        justifyContent: "center",
                                    }}
                                >
                                    <FontAwesome5
                                        name="user-friends"
                                        size={24 * windowHeight}
                                        color={GlobalColor}
                                        style={{ alignSelf: "center" }}
                                    />
                                </View>
                            </View>
                        </TouchableOpacity>
                    )
                ) : (
                    <></>
                )}
                <TouchableOpacity
                    onPress={async () => {
                        if (isAdmin == true) {
                            navigation.navigate("ParticipantsList", {
                                participantsList: Geen.participants.items,
                                Geen: Geen,
                            });
                        } else {
                            if (user !== "Guest") {
                                try {
                                    setIsLoading(true);
                                    await userJoinGeen({
                                        id: Geen.id + user.id,
                                        chatRoomID: Geen.chatRoomID,
                                        geenID: Geen.id,
                                        userID: user.id,
                                    });
                                    console.log("pass");
                                    const newUserData = await getOneUser(user.id);
                                    console.log("pass1");
                                    const newGeenData = await getOneGeen(Geen.id);
                                    console.log("pass2");
                                    await navigation.setParams({
                                        Geen: newGeenData,
                                    });
                                    setIsLoading(false);
                                } catch (e) {
                                    console.log(e);
                                }
                                setJoined("Joined");
                            } else {
                                setMessageShown(
                                    "This is a member-limited function, do you want to sign up?"
                                );
                                setmodalType("unlike");
                                setModalVisible(true);
                            }
                        }
                    }}
                >
                    <View
                        style={[
                            {
                                width:
                                    joined == "Joined"
                                        ? isAdmin == true
                                            ? 284 * windowWidth
                                            : 236 * windowWidth
                                        : 284 * windowWidth,
                                height: 48 * windowHeight,
                                borderRadius: 12 * windowHeight,
                                backgroundColor: GlobalColor,
                                justifyContent: "center",
                            },
                            joined == "Joined" && {
                                backgroundColor: "#FFF",
                                borderColor: GlobalColor,
                                borderWidth: 1,
                            },
                        ]}
                    >
                        {isAdmin == true ? (
                            <View
                                style={{
                                    flexDirection: "row",
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <FontAwesome5
                                    name="user-friends"
                                    size={16 * windowHeight}
                                    color={GlobalColor}
                                    style={{ alignSelf: "center" }}
                                />
                                <Text
                                    style={[
                                        globalStyles.largeLightFont,
                                        {
                                            color: "#fff",
                                            alignSelf: "center",
                                            paddingLeft: 8 * windowWidth,
                                        },
                                        joined == "Joined" && { color: GlobalColor },
                                    ]}
                                >
                                    Participants
                                </Text>
                            </View>
                        ) : (
                            <Text
                                style={[
                                    globalStyles.largeLightFont,
                                    { color: "#fff", alignSelf: "center" },
                                    joined == "Joined" && { color: GlobalColor },
                                ]}
                            >
                                {joined == "Joined" ? "Joined" : "Join"}
                            </Text>
                        )}
                    </View>
                </TouchableOpacity>
            </View>
        );
    };

    const GeenFriendsIndicator = () => {
        const FriendsImage = ({ imageURL }) => {
            return (
                <View
                    style={{
                        width: 32 * windowHeight,
                        height: 32 * windowHeight,
                        borderRadius: 16 * windowHeight,
                        backgroundColor: "grey",
                    }}
                >
                    <Image
                        source={{ uri: imageURL }}
                        style={{
                            width: 32 * windowHeight,
                            height: 32 * windowHeight,
                            borderRadius: 16 * windowHeight,
                        }}
                    />
                </View>
            );
        };

        return (
            <View style={{ flexDirection: "row" }}>
                {Geen.participants.items.slice(0, 3).map((participant, index) => {
                    console.log(participant);
                    return <FriendsImage imageURL={participant.user.image} />;
                })}
                {Geen.participants.items.length > 3 ? (
                    <View
                        style={{
                            width: 32 * windowHeight,
                            height: 32 * windowHeight,
                            borderRadius: 16 * windowHeight,
                            backgroundColor: "#c4c4c4",
                            justifyContent: "center",
                        }}
                    >
                        <Text
                            style={[
                                globalStyles.smallSemiFont,
                                { alignSelf: "center", color: "#86868e" },
                            ]}
                        >
                            {Geen.participants.items.length - 3}+
                        </Text>
                    </View>
                ) : (
                    <></>
                )}
                <Text
                    style={[
                        globalStyles.smallLightFont,
                        {
                            color: colorTheme,
                            paddingLeft: 8 * windowWidth,
                            alignSelf: "center",
                        },
                    ]}
                >
                    also joined this event.
                </Text>
            </View>
        );
    };

    return (
        <View style={{ backgroundColor: "#FFF", height: "100%" }}>
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
                    <ActivityIndicator color={{ GlobalColor }} size="large" />
                </View>
            ) : null}
            <View
                style={{ marginHorizontal: 16 * windowWidth, backgroundColor: "#FFF" }}
            >
                <GeenModal></GeenModal>
                <View style={{ marginTop: 64 * windowHeight }}>
                    <GeenHeader />
                </View>
                <ScrollView
                    style={{ height: "75%" }}
                    showsVerticalScrollIndicator={false}
                    overScrollMode={"never"}
                >
                    <View style={{ marginTop: 36 * windowHeight }}>
                        <GeenPhoto />
                    </View>
                    <View style={{ marginTop: 36 * windowHeight }}>
                        <GeenInfo />
                    </View>
                    <View style={{ marginTop: 16 * windowHeight }}>
                        <GeenFriendsIndicator />
                    </View>
                </ScrollView>
                <View style={{ marginTop: 16 * windowHeight }}>
                    <GeenActionButton />
                </View>
            </View>
        </View>
    );
};

GeenScreen.navigationOptions = () => {
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
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 3, y: -4 },
        elevation: 5,
        width: 324 * windowWidth,
        height: 196 * windowHeight,
        justifyContent: "center",
    },
});

export default GeenScreen;
