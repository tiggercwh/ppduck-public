import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    Platform,
    KeyboardAvoidingView,
    ActivityIndicator,
    Modal,
    StyleSheet,
    ScrollView,
} from "react-native";
import { Dimensions } from "react-native";
import Label from "../../components/Label";
import EndUserLicenseAgreement from "../../components/EndUserLicenseAgreement";

import ImageBG from "../../../assets/WaterMark.png";
import HeaderLogo from "../../../assets/512_PlayPlayDuck_Icon.png";
import Button from "../../components/Button";
import OTPBox from "../../components/OTPBox";
import { Auth, Storage } from "aws-amplify";

import { Context as UserContext } from "../../context/UserContext";
import { Context as AuthContext } from "../../context/AuthContext";
import GlobalColor from "../../context/GlobalColor";

const globalStyles = require("../../context/GlobalStyles");
const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;

const ValidationScreen = ({ navigation, route }) => {
    const [code, setCode] = useState("");
    const [containerHeight, setHeight] = useState(0);
    const { password, email, displayname, profileImage, username } = route.params;
    const { state: user, addUser, updateUserinfo } = useContext(UserContext);
    const { state: isAuth, refreshAuthStatus } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(false);
    const [messageShown, setMessageShown] = useState("");
    const [modalVisible, setModalVisible] = useState(false);
    const [showUserAgreement, setShowUserAgreement] = useState(false);
    console.log("Which flow is it?");
    console.log(username === undefined ? "register" : "forgetpw");

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

    async function resendVerification(email) {
        try {
            await Auth.resendSignUp(email);
        } catch (error) {
            console.log(error);
        }
    }

    async function finishRegistration() {
        setIsLoading(true);

        const newUser = await addUser({
            email: email,
            name:
                displayname ??
                "GeenMeenUser" + Math.floor(Math.random() * 9999999).toString(),
        });
        if (profileImage === "" || profileImage === undefined) {
            await updateUserinfo({
                id: newUser.id,
                image:
                    "https://geenmeenlaunchbetaae66bc22f46b468d81f5d5fdf4696130851-dev.s3.us-east-2.amazonaws.com/public/UserPhotos/default.webp",
            });
        } else {
            const s3Image = await uploadToStorage(
                profileImage,
                "UserPhotos/" + newUser.id
            );
            await updateUserinfo({
                id: newUser.id,
                image:
                    "https://geenmeenlaunchbetaae66bc22f46b468d81f5d5fdf4696130851-dev.s3.us-east-2.amazonaws.com/public/UserPhotos/" +
                    newUser.id +
                    ".jpeg",
            });
        }
        //console.log("user_added");
        navigation.navigate("Tutorial", {
            password: password,
            email: email,
        });
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
            enabled={Platform.OS === "ios" ? true : false}
            style={{ flex: 1 }}
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
            ) : null}
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

                        <Button
                            buttonText={"Done"}
                            handlePress={() => {
                                setModalVisible(false);
                            }}
                            width={108 * windowWidth}
                            height={32 * windowHeight}
                        />
                    </View>
                </View>
            </Modal>
            <View
                onLayout={(event) => {
                    var { height } = event.nativeEvent.layout;
                    setHeight(height);
                }}
                style={{
                    backgroundColor: "#FFF",
                    height: containerHeight,
                    alignItems: "center",
                    width: "100%",
                    alignSelf: "center",
                    alignItems: "center",
                    flexGrow: 1,
                }}
            >
                <View
                    style={{
                        height: "65%",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    <View style={{ height: 102 * windowHeight }} />
                    <Image
                        source={HeaderLogo}
                        style={{
                            width: 72 * windowHeight,
                            height: 72 * windowHeight,
                            resizeMode: "contain",
                            borderRadius: 86 * windowHeight,
                            paddingTop: 102 * windowHeight,
                            paddingBottom: 12 * windowHeight,
                        }}
                    />
                    <Text style={[{ color: GlobalColor }, globalStyles.mediumBoldFont]}>
                        Play Play Duck
                    </Text>

                    <ImageBackground
                        style={{
                            width: 275 * windowWidth,
                            height: 377 * windowHeight,
                            resizeMode: "contain",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                        source={ImageBG}
                    >
                        <OTPBox
                            setCode={setCode}
                            resendVerification={resendVerification}
                            setIsLoading={setIsLoading}
                            email={username === undefined ? email : username}
                        />
                    </ImageBackground>
                </View>

                <View style={{ position: "absolute", bottom: 146 * windowHeight }}>
                    <Button
                        handlePress={async () => {
                            setIsLoading(true);
                            if (username === undefined) {
                                // Register Flow Function:
                                try {
                                    await Auth.confirmSignUp(email, code);
                                } catch (error) {
                                    console.log(error);
                                    setModalVisible(true);
                                    setMessageShown(error.message);
                                    return;
                                }
                                console.log("kept running");
                                setShowUserAgreement(true);
                            } else {
                                // Forget Password Flow Function:
                                console.log("Fly!");
                                navigation.navigate("ForgetResetPassword", {
                                    username: username,
                                    verification: code,
                                });
                            }
                            setIsLoading(false);
                        }}
                        buttonText="Verify"
                        width={130 * windowWidth}
                        height={28 * windowHeight}
                    />
                </View>
                {username === undefined ? (
                    <View
                        style={{
                            position: "absolute",
                            bottom: 0,
                            width: "100%",
                            height: 72 * windowHeight,
                        }}
                    >
                        <View
                            style={{
                                width: "100%",
                                height: 72 * windowHeight,
                                justifyContent: "flex-start",
                                flexDirection: "row",
                                backgroundColor: GlobalColor,
                                alignItems: "center",
                                paddingLeft: 32 * windowWidth,
                            }}
                        >
                            <Text style={[{ color: "#FFF" }, globalStyles.smallLightFont]}>
                                Already have an account?{" "}
                            </Text>
                            <TouchableOpacity onPress={() => navigation.popToTop()}>
                                <LabelLined text="Sign In Now" lineColor="#FFF" padding={1} />
                            </TouchableOpacity>
                        </View>
                    </View>
                ) : (
                    <View
                        style={{
                            position: "absolute",
                            bottom: 0,
                            width: 375 * windowWidth,
                            height: 72 * windowHeight,
                        }}
                    >
                        <View
                            style={{
                                width: "100%",
                                height: 72 * windowHeight,
                                justifyContent: "flex-start",
                                flexDirection: "row",
                                backgroundColor: GlobalColor,
                                alignItems: "center",
                                paddingLeft: 32 * windowWidth,
                            }}
                        >
                            <Text style={[{ color: "#FFF" }, globalStyles.smallLightFont]}>
                                Already have an account?{" "}
                            </Text>
                            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                                <LabelLined text="Sign In Now" lineColor="#FFF" padding={1} />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </View>
            {/*
            <Modal
                animationType="slide"
                transparent={true}
                visible={showUserAgreement}
            >
                <View
                    style={{
                        width: Dimensions.get("window").width,
                        height: Dimensions.get("window").height,
                        zIndex: 2,
                        position: "absolute",
                        justifyContent: "center",
                        alignContent: "center",
                    }}
                >
                    <View
                        style={{
                            shadowColor: "#000",
                            shadowRadius: 5,
                            shadowOpacity: 0.3,
                            shadowOffset: { x: 3, y: -4 },
                            elevation: 2,
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: "#ffffff",
                                width: "85%",
                                alignSelf: "center",
                                borderRadius: 45,
                            }}
                        >
                            <View
                                style={{
                                    paddingVertical: 20 * windowHeight,
                                    paddingHorizontal: 16 * windowWidth,
                                }}
                            >
                                <Text
                                    style={[
                                        {
                                            fontSize: 18 * windowHeight,
                                            color: GlobalColor,
                                            fontWeight: "bold",
                                        },
                                    ]}
                                >
                                    End User License Agreement
                                </Text>
                                <ScrollView
                                    style={{
                                        height: 324 * windowHeight,
                                        borderColor: GlobalColor,
                                        borderWidth: 1,
                                        borderRadius: 16,
                                        marginVertical: 16 * windowHeight,
                                    }}
                                >
                                    <EndUserLicenseAgreement />
                                </ScrollView>
                                <View
                                    style={{
                                        flexDirection: "row",
                                        justifyContent: "space-around",
                                    }}
                                >
                                    <Button
                                        buttonText="Accept"
                                        width={72 * windowWidth}
                                        height={28 * windowHeight}
                                        handlePress={() => {
                                            setShowUserAgreement(false);
                                            finishRegistration();
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            */}
        </KeyboardAvoidingView>
    );
};

const LabelLined = ({ text, lineColor, padding, fontSize }) => {
    function viewStyle() {
        return {
            flexDirection: "column",
            borderBottomWidth: 1,
            borderRadius: 5,
            borderBottomColor: lineColor,
            paddingTop: padding,
            paddingBottom: padding,
            paddingLeft: padding,
            paddingRight: padding,
        };
    }

    return (
        <View style={viewStyle()}>
            <Label text={text} fontSize={fontSize} fontColor={lineColor} />
        </View>
    );
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
export default ValidationScreen;
