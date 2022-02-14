import React, { useEffect, useContext, useState } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    Modal,
    Keyboard,
    Platform,
    Dimensions,
    StyleSheet,
    ScrollView,
    Animated,
    KeyboardAvoidingView,
    ActivityIndicator,
} from "react-native";
const globalStyles = require("../../context/GlobalStyles");
const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;
import LinedInput from "../../components/LinedInput";
import Label from "../../components/Label";
import ImageBG from "../../../assets/WaterMark.png";
import FacebookIcon from "../../../assets/facebook.png";
import GoogleIcon from "../../../assets/google.png";
import AppleIcon from "../../../assets/apple.png";
import HeaderLogo from "../../../assets/512_PlayPlayDuck_Icon.png";
import Button from "../../components/Button";
import CheckBox from "../../components/CheckBox";

import { withOAuth } from "aws-amplify-react-native";
import { Auth } from "aws-amplify";

import { Context as UserContext } from "../../context/UserContext";
import { Context as AuthContext } from "../../context/AuthContext";
import GlobalColor from "../../context/GlobalColor";
import EndUserLicenseAgreement from "../../components/EndUserLicenseAgreement";

const LoginScreen = ({ navigation, route }) => {
    const [isLoading, setLoading] = React.useState(false);
    const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [keyboardShow, setKeyboard] = React.useState(false);
    const [incorrectPW, setIncorrectPW] = React.useState(false);
    const [containerHeight, setHeight] = useState(0);
    const [modalVisible, setModalVisible] = useState(false);
    const [messageShown, setMessageShown] = useState("");
    const [showUserAgreement, setShowUserAgreement] = useState(true);

    const {
        state: appUser,
        getUserData_Login,
        socialLogin,
        guestLogin,
    } = useContext(UserContext);
    const { state: isAuth, refreshAuthStatus } = useContext(AuthContext);

    useEffect(() => {
        console.log(appUser);
    }, [isAuth]);
    async function normalSignIn(username, password) {
        console.log("signin run");
        setTimeout(async () => {
            // Auth.signOut()
            Auth.signIn(username, password)
                .catch((error) => {
                    if (error.code === "UserNotConfirmedException") {
                        console.log(error);
                        navigation.navigate("Register", {
                            screen: "Validation",
                            params: {
                                password: password,
                                email: username,
                            },
                        });
                    } else {
                        setMessageShown(error.message);
                        setModalVisible(true);
                        setLoading(false);
                    }
                })
                .then(() => {
                    refreshAuthStatus();
                });
        }, 500);
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
            enabled={Platform.OS === "ios" ? false : false}
            style={{ flex: 1 }}
        >
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
                        backgroundColor: '#86868e'
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
                                            alignSelf: 'center'
                                        },
                                    ]}
                                >
                                    End User License Agreement
                                </Text>
                                <View style={{ height: 512 * windowHeight, width: '100%' }}>
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
                                </View>
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
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </Modal>
            <ScrollView
                style={{ backgroundColor: "#FFF" }}
                resetScrollToCoords={{ x: 0, y: 0 }}
                onLayout={(event) => {
                    var { height } = event.nativeEvent.layout;
                    setHeight(height);
                }}
                contentContainerStyle={{
                    alignSelf: "center",
                    alignItems: "center",
                    width: 375 * windowWidth,
                    backgroundColor: "#ffffff",
                    height: containerHeight,
                    flexGrow: 1,
                    position: "relative",
                }}
                scrollEnabled={false}
                // extraHeight={20 * windowHeight}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                enableOnAndroid={true}
                onKeyboardWillShow={() => {
                    {
                        Platform.OS === "ios" ? setKeyboard(true) : null;
                    }
                }}
                onKeyboardWillHide={() => {
                    {
                        Platform.OS === "ios" ? setKeyboard(false) : null;
                    }
                }}
                onKeyboardDidHide={() => {
                    {
                        Platform.OS !== "ios" ? setKeyboard(false) : null;
                    }
                }}
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
                <View
                    style={{
                        backgroundColor: "#FFF",
                        height: "100%",
                        alignItems: "center",
                        position: "relative",
                    }}
                >
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
                                opacity: 1
                            }}
                            source={ImageBG}
                        >
                            <View style={{ height: 24 * windowHeight }} />
                            <LinedInput
                                title="Email Address"
                                width={253 * windowWidth}
                                height={windowHeight * 28}
                                secureTextEntry={false}
                                value={email}
                                onChange={setEmail}
                                fontStyle={globalStyles.smallLightFont}
                            />
                            <View style={{ height: 24 * windowHeight }} />
                            <LinedInput
                                title="Password"
                                width={253 * windowWidth}
                                height={windowHeight * 28}
                                secureTextEntry
                                value={password}
                                onChange={setPassword}
                                fontStyle={globalStyles.smallLightFont}
                            />
                            <View style={{ height: 18 * windowHeight }} />

                            <View
                                style={{
                                    justifyContent: "space-between",
                                    flexDirection: "row",
                                    paddingBottom: 16 * windowHeight,
                                    width: 275 * windowWidth,
                                }}
                            >
                                <CheckBox text="Remember Me" />
                                <TouchableOpacity
                                    style={{ alignSelf: "flex-end" }}
                                    onPress={() => navigation.navigate("ForgetPassword")}
                                >
                                    <LabelLined
                                        text=" Forget Password? "
                                        lineColor={GlobalColor}
                                        padding={1}
                                    />
                                </TouchableOpacity>
                            </View>
                        </ImageBackground>
                    </View>
                </View>
                <Animated.View
                    style={{
                        alignItems: "center",
                        position: "absolute",
                        bottom: 0,
                        height: 256 * windowHeight,
                        left: 0,
                        right: 0,
                    }}
                >
                    <View style={{ position: "absolute", top: 24 }}>
                        <Button
                            handlePress={async () => {
                                if (email !== "" && password != "") {
                                    if (password.length >= 8) {
                                        console.log("pressed!");
                                        setLoading(true);
                                        const data = await normalSignIn(email, password);
                                    } else {
                                        setIncorrectPW(true);
                                    }
                                } else {
                                    setIncorrectPW(true);
                                }
                            }}
                            buttonText="Login"
                            width={160 * windowWidth}
                            height={32 * windowHeight}
                        />
                    </View>
                    <View
                        style={{
                            position: "absolute",
                            top: 72,
                            borderRadius: 45,
                            borderWidth: 1,
                            borderColor: GlobalColor,
                        }}
                    >
                        <Button
                            handlePress={async () => {
                                navigation.navigate("Register");
                            }}
                            buttonText="Sign Up Now"
                            width={160 * windowWidth}
                            height={32 * windowHeight}
                            isWhite
                        />
                    </View>
                    {incorrectPW ? (
                        <View style={{ height: 24 * windowHeight }}>
                            <Text
                                style={[
                                    { color: "red", alignSelf: "center" },
                                    globalStyles.smallBoldFont,
                                ]}
                            >
                                Incorrect Password
                            </Text>
                        </View>
                    ) : null}
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
                                Don't have an account?{" "}
                            </Text>
                            { /*
                            <TouchableOpacity
                                onPress={() => {
                                    navigation.navigate("Register");
                                }}
                            >
                                <LabelLined text="Sign Up" lineColor="#FFF" padding={1} />
                            </TouchableOpacity>
                            <Text style={[{ color: "#FFF" }, globalStyles.smallLightFont]}>
                                {" "}
                                or{" "}
                            </Text>
                           */}
                            <TouchableOpacity
                                onPress={() => {
                                    guestLogin();
                                }}
                            >
                                <LabelLined text="Try as Guest" lineColor="#FFF" padding={1} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </Animated.View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const LabelLined = ({ text, lineColor, padding, fontSize }) => {
    function viewStyle() {
        return {
            flexDirection: "column",
            borderBottomWidth: 1,
            borderRadius: 0,
            borderBottomColor: lineColor,
            paddingTop: padding,
            paddingBottom: padding,
        };
    }

    return (
        <View style={viewStyle()}>
            <Label text={text} fontSize={fontSize} fontColor={lineColor} />
        </View>
    );
};

const styles = StyleSheet.create({
    photoContainer: {
        width: 101 * windowWidth,
        height: 101 * windowHeight,
        borderRadius: 10,
        marginTop: 20 * windowHeight,
        marginLeft: 17.5 * windowWidth,
    },
    photo: {
        width: 100 * windowWidth,
        height: 100 * windowHeight,
        resizeMode: "cover",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: GlobalColor,
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
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 3, y: -4 },
        elevation: 5,
        width: 324 * windowWidth,
        height: 196 * windowHeight,
        justifyContent: "center",
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
    },
});

export default LoginScreen;
