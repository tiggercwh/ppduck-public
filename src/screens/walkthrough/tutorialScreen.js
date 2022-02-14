import React, { useContext } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import AppIntroSlider from "react-native-app-intro-slider";
import Ion from "react-native-vector-icons/Ionicons";
import { Auth } from "aws-amplify";
import { Context as AuthContext } from "../../context/AuthContext";
import GlobalColor from "../../context/GlobalColor";
const globalStyles = require("../../context/GlobalStyles");

const slides = [
    {
        key: 1,
        title: "Explore",
        text: "Every time you press this button \nbrings you to a new nearby event",
        image: require("../../../assets/Tutorial_Step1.png"),
        backgroundColor: GlobalColor,
    },
    {
        key: 2,
        title: "Engage",
        text: "Every time you press this button \nshow your joined and suggested events",
        image: require("../../../assets/Tutorial_Step2.png"),
        backgroundColor: GlobalColor,
    },
    {
        key: 3,
        title: "Create",
        text: "Every time you press this button \nhelp you create your own event",
        image: require("../../../assets/Tutorial_Step3.png"),
        backgroundColor: GlobalColor,
    },
];

const renderItem = ({ item }) => {
    return (
        <View style={styles.slide}>
            <Image style={{ height: 216, width: 216 }} source={item.image}></Image>
            <Text style={[styles.title, globalStyles.headerFont]}>{item.title}</Text>
            <Text style={[styles.text, globalStyles.mediumLightFont]}>{item.text}</Text>
        </View>
    );
};
const renderDoneButton = () => {
    return (
        <View style={styles.buttonCircle}>
            <Ion name="md-checkmark" color="rgba(255, 255, 255, .9)" size={28} />
        </View>
    );
};

const renderNextButton = () => {
    return (
        <View style={styles.buttonCircle}>
            <Ion
                name="arrow-forward-outline"
                color="rgba(255, 255, 255, .9)"
                size={24}
            />
        </View>
    );
};

const TutorialScreen = ({ route, navigation }) => {
    const { state: isAuth, refreshAuthStatus } = useContext(AuthContext);
    const { password, email } = route.params;
    function finishTutorial() {
        if ((email === "Prof") & (password === "Prof")) {
            navigation.goBack();
        } else {
            Auth.signIn(email, password).then(() => {
                Auth.currentAuthenticatedUser().then(refreshAuthStatus());
            });
        }
    }
    return (
        <AppIntroSlider
            data={slides}
            renderDoneButton={renderDoneButton}
            renderNextButton={renderNextButton}
            renderItem={renderItem}
            onDone={finishTutorial}
            dotStyle={{ backgroundColor: GlobalColor }}
            activeDotStyle={{ backgroundColor: "#e2e2e2" }}
        />
    );
};

const styles = StyleSheet.create({
    buttonCircle: {
        width: 40,
        height: 40,
        backgroundColor: GlobalColor,
        borderRadius: 20,
        justifyContent: "center",
        alignItems: "center",

    },
    slide: {
        backgroundColor: '#ffffff',
        width: '100%',
        height: '100%',
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    }, title: {
        textAlign: 'center', color: GlobalColor, paddingBottom: 12, paddingTop: 48
    }, text: {
        textAlign: 'justify', color: '#86868e'
    }
});

export default TutorialScreen;
