import React, { useEffect, useState, useContext } from "react";
import {
    TouchableOpacity,
    View,
    Text,
    Image,
    Platform,
    ImageBackground,
    Modal,
    StyleSheet,
    KeyboardAvoidingView,
    ActivityIndicator,
} from "react-native";
import HeaderLogo from "../../../assets/512_PlayPlayDuck_Icon.png";
import ImageBG from "../../../assets/WaterMark.png";
import AddBtn from "../../../assets/AddButton.png";
import Button from "../../components/Button";
import * as ImagePicker from "expo-image-picker";
import Label from "../../components/Label";
import BoxInput from "../../components/BoxInput";
import { Dimensions } from "react-native";
import { Auth } from "aws-amplify";
import GlobalColor from "../../context/GlobalColor";
const globalStyles = require("../../context/GlobalStyles");
const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;

const RegisterInfoScreen = ({ navigation }) => {
    const [uploadStatus, setUploadStatus] = useState("Select Image Now");
    const [modalVisible, setModalVisible] = useState(false);
    const [messageShown, setMessageShown] = useState("");
    const [containerHeight, setHeight] = useState(0);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [displayname, setDisplayname] = useState("");
    const [image, setImage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    async function signUp(password, email, profileImage) {
        try {
            // signup function
            const { user } = await Auth.signUp({
                username: email,
                password: password,
                // attributes: {
                //     email,          // optional
                //     // other custom attributes
                // }
            });

            // navigate
            navigation.navigate("Validation", {
                password: password,
                email: email,
                displayname: displayname,
                profileImage: profileImage,
                user: user, //AWS User Object
            });
        } catch (error) {
            if (error.message === "An account with the given email already exists.") {
                setMessageShown("Email already exists");
            } else {
                setMessageShown(error.message);
            }
            setModalVisible(true);
        }
    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 0.4,
        });

        if (!result.cancelled) {
            setImage(result);
        }
    };

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
            ) : (
                <>
                    <View
                        onLayout={(event) => {
                            var { height } = event.nativeEvent.layout;
                            setHeight(height);
                        }}
                        style={{
                            backgroundColor: "#fff",
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
                                width: windowWidth * 253,
                                alignSelf: "center",
                                paddingBottom: 33 * windowHeight,
                            }}
                        >
                            <Registration
                                info={{
                                    email,
                                    setEmail,
                                    password,
                                    setPassword,
                                    confirmPassword,
                                    setConfirmPassword,
                                    displayname,
                                    setDisplayname,
                                    image,
                                    setImage,
                                }}
                                pickImage={pickImage}
                                uploadStatus={uploadStatus}
                                setUploadStatus={setUploadStatus}
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            position: "absolute",
                            bottom: 146 * windowHeight,
                            alignSelf: "center",
                        }}
                    >
                        {/* <S3Image imgKey={"avatar"} picker /> */}
                        <Button
                            buttonText="Next"
                            width={130 * windowWidth}
                            height={28 * windowHeight}
                            handlePress={async () => {
                                setIsLoading(true);
                                if (password !== "" && email !== "") {
                                    if (password.length >= 8) {
                                        if (password === confirmPassword) {
                                            try {
                                                await signUp(password, email, image);
                                            } catch (error) {
                                                console.log("This is console log");
                                                console.log(error);
                                            }
                                        } else {
                                            setMessageShown("Passwords do not match");
                                            setModalVisible(true);
                                        }
                                    } else {
                                        setMessageShown(
                                            "Passwords should consist of at least 8 characters"
                                        );
                                        setModalVisible(true);
                                    }
                                } else {
                                    setMessageShown("Please filled all required fields.");
                                    setModalVisible(true);
                                }
                                setIsLoading(false);
                            }}
                        />
                    </View>
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
                                paddingLeft: 32 * windowHeight,
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
                </>
            )}
        </KeyboardAvoidingView>
    );
};

//Registration form
const Registration = ({ info, pickImage, uploadStatus, setUploadStatus }) => {
    return (
        <View
            style={{ backgroundColor: "#FFF", height: "100%", alignItems: "center" }}
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
                    }}
                    source={ImageBG}
                >
                    <View style={{ height: 24 * windowHeight }} />
                    <BoxInput
                        title="Email Address"
                        width={309 * windowWidth}
                        height={windowHeight * 32}
                        value={info.email}
                        onChange={info.setEmail}
                    />
                    <View style={{ height: 24 * windowHeight }} />
                    <BoxInput
                        title="Password"
                        width={309 * windowWidth}
                        height={windowHeight * 32}
                        secureTextEntry
                        value={info.password}
                        onChange={info.setPassword}
                    />
                    <View style={{ height: 24 * windowHeight }} />
                    <BoxInput
                        title="Confirm Password"
                        width={309 * windowWidth}
                        height={windowHeight * 32}
                        secureTextEntry
                        value={info.confirmPassword}
                        onChange={info.setConfirmPassword}
                    />
                    <View style={{ height: 24 * windowHeight }} />
                    <BoxInput
                        title="Display Name"
                        width={309 * windowWidth}
                        height={windowHeight * 32}
                        value={info.displayname}
                        onChange={info.setDisplayname}
                    />
                    {(
                        info.displayname
                            ? info.displayname.length > 16 || info.displayname.length < 1
                            : null
                    ) ? (
                        <View style={{ marginTop: 8 * windowHeight }}>
                            <Text style={[globalStyles.smallLightFont, { color: "red" }]}>
                                Username should contain 1 to 16 characters.
                            </Text>
                        </View>
                    ) : (
                        <></>
                    )}
                    <View style={{ height: 48 * windowHeight }} />
                    <View
                        style={{
                            width: 309 * windowWidth,
                            alignItems: "flex-start",
                            justifyContent: "center",
                            alignSelf: "center",
                        }}
                    >
                        <Text
                            style={[
                                {
                                    alignSelf: "flex-start",
                                    color: "#C4C4C4",
                                    paddingBottom: 8 * windowHeight,
                                },
                                globalStyles.smallLightFont,
                            ]}
                        >
                            Profile Picture (Optional)
                        </Text>
                        <TouchableOpacity
                            onPress={async () => {
                                const image = await pickImage();
                                setUploadStatus("Image Selected");
                            }}
                            style={{
                                zIndex: 3,
                                flexDirection: "row",
                                width: 128 * windowWidth,
                                height: 32 * windowHeight,
                            }}
                        >
                            <Image
                                source={AddBtn}
                                style={{
                                    alignSelf: "flex-start",
                                    height: 32 * windowHeight,
                                    width: 32 * windowHeight,
                                }}
                            />
                            <Text
                                style={[
                                    globalStyles.smallBoldFont,
                                    {
                                        paddingLeft: 8 * windowWidth,
                                        color:
                                            uploadStatus === "Select Image Now"
                                                ? GlobalColor
                                                : "#c4c4c4",
                                        alignSelf: "center",
                                    },
                                ]}
                            >
                                {uploadStatus}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        </View>
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

export default RegisterInfoScreen;
