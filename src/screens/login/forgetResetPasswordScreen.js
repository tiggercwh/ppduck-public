import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    Modal,
    StyleSheet,
} from "react-native";
import { Dimensions } from "react-native";
import Label from "../../components/Label";
import LinedInput from "../../components/LinedInput";
import ImageBG from "../../../assets/WaterMark.png";
import HeaderLogo from "../../../assets/512_PlayPlayDuck_Icon.png";
import Button from "../../components/Button";

import { Auth } from "aws-amplify";
import GlobalColor from "../../context/GlobalColor";
const globalStyles = require("../../context/GlobalStyles");
const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;

const ForgetEmailInfoScreen = ({ navigation, route }) => {
    const { username, verification } = route.params;
    const [passwordOne, setPasswordOne] = React.useState("");
    const [passwordTwo, setPasswordTwo] = React.useState("");
    const [modalVisible, setModalVisible] = React.useState(false);
    const [messageShown, setMessageShown] = React.useState("");
    const [containerHeight, setHeight] = React.useState(0);
    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
            enabled={Platform.OS === "ios" ? true : false}
            style={{ flex: 1 }}
        >
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
                    flexGrow: 1,
                    alignSelf: "center",
                    alignItems: "center",
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
                    <View style={{ height: 12 * windowHeight }} />
                    <Text style={{ fontSize: 16 * windowHeight, color: GlobalColor }}>
                        Play Play Duck
                    </Text>

                    <ImageBackground
                        style={{
                            width: 275 * windowWidth,
                            height: 377 * windowHeight,
                            resizeMode: "contain",
                            justifyContent: "center",
                        }}
                        source={ImageBG}
                    >
                        <View style={{ justifyContent: "center" }}>
                            {/*<LinedInput title="Enter New Password" width={253 * windowWidth} height={windowHeight * 28} fontSize={12 * windowHeight} secureTextEntry={true} value={code} onChange={setCode} />
                           
                            <View style={{ height: 24 * windowHeight }} />
                          */}
                            <LinedInput
                                title="Enter New Password"
                                width={253 * windowWidth}
                                height={windowHeight * 28}
                                fontSize={12 * windowHeight}
                                secureTextEntry={true}
                                value={passwordOne}
                                onChange={setPasswordOne}
                            />
                            <View style={{ height: 24 * windowHeight }} />
                            <LinedInput
                                title="Confirm New Password"
                                width={253 * windowWidth}
                                height={windowHeight * 28}
                                fontSize={12 * windowHeight}
                                secureTextEntry={true}
                                value={passwordTwo}
                                onChange={setPasswordTwo}
                            />
                        </View>
                        <View style={{ height: 16 * windowHeight }} />
                        {passwordOne == passwordTwo && passwordOne.length >= 8 ? (
                            <Text style={{ color: "#6CC417", fontSize: 12 * windowHeight }}>
                                You are good to go!
                            </Text>
                        ) : passwordOne == "" ? (
                            <Text></Text>
                        ) : (
                            <Text style={{ color: "red", fontSize: 12 * windowHeight }}>
                                Please confirm your password
                            </Text>
                        )}
                    </ImageBackground>
                </View>

                <View style={{ position: "absolute", bottom: 146 * windowHeight }}>
                    <Button
                        handlePress={async () => {
                            // Reset Function
                            try {
                                console.log("start");
                                const data = await Auth.forgotPasswordSubmit(
                                    username,
                                    verification,
                                    passwordOne
                                );
                                console.log(data);
                            } catch (error) {
                                setMessageShown(error.message);
                                setModalVisible(true);
                                return;
                            }
                            navigation.popToTop();
                            navigation.pop();
                        }}
                        buttonText="Confirm"
                        width={130 * windowWidth}
                        height={28 * windowHeight}
                    />
                </View>

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
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate("Register");
                            }}
                        >
                            <LabelLined text="Sign Up" lineColor="#FFF" padding={1} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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

export default ForgetEmailInfoScreen;
