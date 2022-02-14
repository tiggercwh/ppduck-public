import React, { useContext, useEffect, useState, useRef } from "react";
import {
    SafeAreaView,
    View,
    StyleSheet,
    Text,
    TouchableOpacity,
    Modal,
    Animated,
    StatusBar,
    Platform,
    KeyboardAvoidingView,
    ActivityIndicator,
    Pressable,
    Image,
    Dimensions,
    TouchableHighlight,
    TouchableOpacityBase,
} from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { Auth } from "aws-amplify";
import { Context as UserContext } from "../context/UserContext";
import { Context as AuthContext } from "../context/AuthContext";
import { Context as GeenContext } from "../context/GeenContext";
import createMapStyle from "../context/createMapStyle.js";
import LottieView from "lottie-react-native";
import * as Location from "expo-location";
const globalStyles = require("../context/GlobalStyles");
const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;
import * as Linking from "expo-linking";

const CARD_HEIGHT =
    Platform.OS === "ios" ? 236 * windowHeight : 284 * windowHeight;
const CARD_WIDTH = windowWidth * 375 * 0.8;
const SPACING_FOR_CARD_INSET = windowWidth * 375 * 0.1 - 10;
import DummyData from "../context/DummyData";
import {
    MaterialCommunityIcons,
    Ionicons,
    FontAwesome,
    Entypo,
    MaterialIcons,
    FontAwesome5,
    SimpleLineIcons,
} from "@expo/vector-icons";
import Button from "../components/Button";
import GlobalColor from "../context/GlobalColor";

const HomeScreen = ({ navigation }) => {
    const mapRef = useRef(null);
    const [userLongitude, setUserLongitude] = useState(114.177216);
    const [userLatitude, setUserLatitude] = useState(22.302711);
    const [delta, setDelta] = useState({
        latitudeDelta: 0.04,
        longitudeDelta: 0.01,
    });

    const {
        state: user,
        getUserData_Login,
        socialLogin,
        logoutRefresh,
        guestSignUp,
    } = useContext(UserContext);
    const [isLoading, setIsLoading] = useState(true);
    const { state: isAuth, refreshAuthStatus } = useContext(AuthContext);
    const { state: geenArray, getOneGeen, fetchGeens } = useContext(GeenContext);
    const [containerHeight, setHeight] = useState(0);

    const [nextToken, setNextToken] = useState("");
    const [showGuestSignUp, setShowGuestSignUp] = useState(false);
    const [showRefreshControl, setShowRefreshControl] = useState(false);
    const [geenMarkerVisible, setGeenMarkerVisible] = useState(false);

    const [refreshControl, setRefreshControl] = useState(false);

    async function getInitialURL() {
        //PARSE LINK AND NAVIGATE TO SPECIFIC EVENT OR GROUP ID
        const initialURL = await Linking.getInitialURL();
        console.log("BELOW");
        console.log(initialURL);
        console.log(`getInitialURL is runned!!!!`);
        if (initialURL) {
            let { path, queryParams } = Linking.parse(initialURL);
            console.log(queryParams);
            console.log("Link Used = " + initialURL);
            if (queryParams.GeenId) {
                console.log("queryParams.GeenId Found!");
                const selectedGeen = await getOneGeen(queryParams.GeenId).catch(
                    (err) => console.log(err)
                );
                console.log("End!");
                console.log(selectedGeen);
                navigation.navigate("Geen", { Geen: selectedGeen });
            }
        }
    }

    //DEEP LINKING
    const prefix = "playplayduck://--/";
    const [data, setData] = useState(null);

    const linking = {
        prefixes: [prefix],
        config: {
            screens: {
                Group: "Group",
                Event: "Event",
                Setting: "Setting",
                Home: "Home",
                Profile: "Profile",
            },
        },
    };

    async function getUserData() {
        Auth.currentAuthenticatedUser().then(async (user) => {
            // dynamic navigate to HomeScreen
            const userEmail = user.attributes.email;
            console.log(user.attributes.email);
            const userData = await getUserData_Login(userEmail);

        });
    }
    async function handleDeepLink(geen) {
        //PARSE LINK AND NAVIGATE TO SPECIFIC EVENT OR GROUP ID
        let data = Linking.parse(geen.url);
        setData(data);

        if (geen.url) {
            let { path, queryParams } = Linking.parse(geen.url);
            if (queryParams.GeenId) {
                const selectedGeen = await getOneGeen(queryParams.GeenId);
                setTimeout(() => {
                    navigation.navigate("Geen", { params: { Geen: selectedGeen } });
                }, 2000);
            }
        }
    }

    // const tempGeenArray = DummyData
    const DummyGeen = {
        id: "123",
        hostID: "234",
        chatRoomID: "345",
        chatroom: "#tbc object",
        geenType: ["Sports", "Leisure"],
        geenName: "Lets play darts",
        geenTime: "2021 - 12 - 10T05: 34: 01.087Z",
        geenLocation: "奶路臣街旺角",
        geenDescription: "Darts is Fun!",
        geenPhoto: [
            "https://media.istockphoto.com/photos/three-darts-in-bulls-eye-close-up-picture-id529249593?k=20&m=529249593&s=612x612&w=0&h=2E3U49qvpZDjIv1uggGJUanPWGqkXHy6ZPjZSZ9ia1Y=",
            "https://media.istockphoto.com/photos/three-darts-in-bulls-eye-close-up-picture-id529249593?k=20&m=529249593&s=612x612&w=0&h=2E3U49qvpZDjIv1uggGJUanPWGqkXHy6ZPjZSZ9ia1Y=",
        ],
        geenTag: ["Hardcore", "Practice"],
        maximumParti: 4,
        longitude: 114.2185682,
        latitude: 22.3342059,
        isFeatured: true,
    };
    const [currentGeen, setCurrentGeen] = useState(null);
    function onSubmitRelocate(lat, long) {
        setUserLatitude(lat);
        setUserLongitude(long);
        mapRef.current.animateToRegion(
            {
                latitude: lat - 0.01,
                longitude: long,
                latitudeDelta: delta.latitudeDelta,
                longitudeDelta: delta.longitudeDelta,
            },
            1550
        );
    }


    useEffect(() => {
        if (geenArray.length == 0) {
            setCurrentGeen(DummyGeen);
        } else {
            const unsubscribe = navigation.addListener("tabPress", (e) => {
                // do somethingcons
                console.log("HI BITCH")
                if (e.target.substring(0, 7) === "Explore") {
                    // find next marker for user
                    if (geenArray.length !== 0) {
                        var randomGeen = geenArray[Math.floor(Math.random() * geenArray.length)];
                        while (randomGeen == currentGeen) {
                            randomGeen = geenArray[Math.floor(Math.random() * geenArray.length)];
                        }
                        setCurrentGeen(randomGeen);
                        setGeenMarkerVisible(true);
                    }
                } 
            });
            return unsubscribe;
        }
    }, [geenArray, currentGeen]);

    async function moveToCurrentLocation() {
        //setIsLoading(true)
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setUserLatitude(position.coords.latitude);
                setUserLongitude(position.coords.longitude);
                mapRef.current.animateToRegion(
                    {
                        latitude: position.coords.latitude - 0.01,
                        longitude: position.coords.longitude,
                        latitudeDelta: delta.latitudeDelta,
                        longitudeDelta: delta.longitudeDelta,
                    },
                    userLatitude == 22.302711 && userLongitude == 114.177216 ? 550 : 1550
                );
            },
            (error) => console.log(error.message),
            { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
        );
        //setIsLoading(false)
    }

    useEffect(() => {
        //Install Location
        Location.installWebGeolocationPolyfill();

        // getUserData
        getUserData().then(console.log("check userID", user));
        //MoveToUserLocation
        //moveToCurrentLocation();      
        setIsLoading(false);
        moveToCurrentLocation();
        //Fetch Data
        fetchGeens().then((data) => {
            console.log("fetchedGeens");
            setNextToken(data);
        });
        console.log('HAI LA')
        Linking.addEventListener("url", handleDeepLink);
        if (!data) {
            getInitialURL();
        }
        return () => {
            Linking.removeEventListener("url");
        };
    }, []);

    useEffect(() => {
        console.log("in current geen use effect - " + currentGeen)
        if (currentGeen) {
            //setCountSetCurrent(countSetCurrent + 1)
            mapRef.current.animateToRegion(
                {
                    latitude: currentGeen.latitude - 0.01,
                    longitude: currentGeen.longitude,
                    latitudeDelta: 0.04,
                    longitudeDelta: 0.01,
                },
                1550
            );
            console.log("called");
            //setGeenMarkerVisible(true);
        }
    }, [currentGeen]);

    const RefreshModal = () => {
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={showRefreshControl}
                onRequestClose={() => {
                    //Alert.alert("Modal has been closed.");
                    setShowRefreshControl(false);
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
                            Please refresh later
                        </Text>
                        <Button
                            buttonText={"Ok"}
                            handlePress={() => {
                                setShowRefreshControl(false);
                            }}
                            width={64 * windowWidth}
                            height={32 * windowHeight}
                        />
                    </View>
                </View>
            </Modal>
        );
    };

    return (
        <View style={{ flex: 1 }}>
            {isLoading == true || userLatitude == 22.302711 ? (
                <View
                    style={{
                        flex: 1,
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0,
                        opacity: 1,
                        backgroundColor: "#fff",
                        justifyContent: "center",
                        alignItems: "center",
                        zIndex: 5000,
                    }}
                >
                    <ActivityIndicator color={GlobalColor} size="large" />
                </View>
            ) : null}

            <View stlye={{ height: "100%", width: "100%" }}>
                <View style={styles.statusBarWrapper}>
                    <StatusBar
                        translucent
                        barStyle="light-content"
                        backgroundColor={GlobalColor}
                    />
                </View>
                <MapView
                    loadingEnabled={true}
                    ref={mapRef}
                    customMapStyle={createMapStyle}
                    provider={PROVIDER_GOOGLE}
                    followsUserLocation={true}
                    zoomEnabled={true}
                    //pitchEnabled={false}
                    //rotateEnabled={true}
                    minZoomLevel={13} // default => 0
                    maxZoomLevel={17} // default => 20
                    style={{ height: "100%", width: "100%" }}
                    initialRegion={{
                        latitude: userLatitude - 0.01,
                        longitude: userLongitude,
                        latitudeDelta: delta.latitudeDelta,
                        longitudeDelta: delta.longitudeDelta,
                    }}
                >
                    {geenArray.map((item, index) => (
                        <MapView.Marker
                            key={index}
                            tracksViewChanges={false}
                            coordinate={{
                                latitude: item.latitude,
                                longitude: item.longitude,
                            }}
                            icon={require("../../assets/Bathtub_Border.png")}
                            onPress={() => {
                                console.log("on marker pressed now");
                                setGeenMarkerVisible(true);
                                setCurrentGeen(item);
                            }}
                        />
                    ))}
                    {userLatitude != 22.302711 ?
                    <MapView.Marker
                        coordinate={{ latitude: userLatitude, longitude: userLongitude }}
                        pinColor={"#3498db"}
                    >
                            <View style={{
                                alignContent: "center", width: 42 * windowHeight,
                                height: 42 * windowHeight, justifyContent: 'center',
                                alignSelf: 'center',
                                alignContent: 'center'
                            }}>
                            <Image
                                source={require("../../assets/White_Border_Duck_Map.png")}
                                style={{
                                    width: 36 * windowHeight,
                                    height: 34 * windowHeight,
                                    alignSelf: 'center'
                                }}
                            />
                        </View>
                    </MapView.Marker>
                        : null}
                </MapView>

            </View>
            <View
                style={{
                    position: "absolute",
                    top: 0,
                    width: 375 * windowWidth,
                    height: 128 * windowHeight,
                    flexDirection: "row",
                    alignItems: "space-between",
                }}
            >
                <TouchableOpacity
                    onPress={() => {
                        if (user == "Guest") {
                            setShowGuestSignUp(true);
                        } else {
                            navigation.navigate("CreateLocation");
                        }
                    }}
                    style={{
                        elevation: 7,
                        width: 64 * windowHeight,
                        height: 64 * windowHeight,
                        position: "absolute",
                        backgroundColor: "#fff",
                        bottom: 0 * windowHeight,
                        left: 24 * windowHeight,
                        alignItems: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 64 * windowHeight,
                    }}
                >
                    <Entypo
                        name="plus"
                        size={36 * windowHeight}
                        style={{ zIndex: 2 }}
                        color={GlobalColor}
                    />
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => {
                        // Hong - write refresh function here
                        if (!refreshControl) {
                            if (!nextToken) {
                                fetchGeens().then((data) => {
                                    setNextToken(data);
                                    setRefreshControl(true);
                                    setTimeout(() => {
                                        setRefreshControl(false);
                                    }, 10000);
                                });
                            } else {
                                fetchGeens(nextToken).then((data) => {
                                    setNextToken(data);
                                });
                            }
                        } else {
                            setShowRefreshControl(true);
                        }
                    }}
                    style={{
                        elevation: 7,
                        width: 64 * windowHeight,
                        height: 64 * windowHeight,
                        position: "absolute",
                        backgroundColor: "#fff",
                        bottom: 0 * windowHeight,
                        right: 24 * windowHeight,
                        alignItems: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 64 * windowHeight,
                    }}
                >
                    <SimpleLineIcons
                        name="refresh"
                        size={36 * windowHeight}
                        style={{ zIndex: 2 }}
                        color={GlobalColor}
                    />
                </TouchableOpacity>
            </View>
            {!geenMarkerVisible ?
                <TouchableOpacity
                    onPress={() => {
                        // Hong - write refresh function here
                        moveToCurrentLocation();
                    }}
                    style={{
                        elevation: 7,
                        width: 64 * windowHeight,
                        height: 64 * windowHeight,
                        position: "absolute",
                        backgroundColor: "#fff",
                        bottom: 64 * windowHeight,
                        right: 24 * windowHeight,
                        alignItems: "center",
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 64 * windowHeight,
                    }}
                >
                    <MaterialIcons name="my-location" size={36 * windowHeight}
                        style={{ zIndex: 0 }}
                        color={GlobalColor} />

                </TouchableOpacity>
                : null}
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
                    }}
                >
                    <Entypo name="cross" size={36 * windowHeight} />
                </TouchableOpacity>
                <View
                    style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
                >
                    <View style={{ backgroundColor: "white", alignItems: "center" }}>
                        <Text style={[globalStyles.mediumSemiFont, { color: "black" }]}>
                            Sign up now to enjoy our full Geen functions!
                        </Text>
                        <Pressable
                            onPress={async () => {
                                //await guestSignUp()
                                await guestSignUp();
                                setShowGuestSignUp(false);
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
            <RefreshModal></RefreshModal>

            {geenMarkerVisible ? (
                <TouchableOpacity
                    onPress={async () => {
                        setGeenMarkerVisible(false);
                    }}
                    style={{
                        position: "absolute",
                        top: 148 * windowHeight,
                        left: 0,
                        right: 0,
                        paddingVertical: 10,
                        height: 312 * windowHeight,
                        width: "100%",

                        zIndex: 4,
                    }}
                ></TouchableOpacity>
            ) : null}
            {geenMarkerVisible ? (
                <View
                    style={{
                        position: "absolute",
                        bottom: 24 * windowHeight,
                        zIndex: 10,
                        alignSelf: "center",
                    }}
                >
                    <MarkerItem
                        marker={currentGeen}
                        key={currentGeen.id}
                        nextFunction={() => {
                            if (currentGeen.id != DummyGeen.id) {
                                getOneGeen(currentGeen.id).then((Geen) => {
                                    navigation.navigate("Geen", { Geen: Geen });
                                });
                            }
                        }}
                    />
                </View>
            ) : null}
        </View>
    );
};

const MarkerItem = ({ marker, index, nextFunction }) => {
    return (
        <View style={styles.card} key={index}>
            <Image
                source={{ uri: marker.geenPhoto[0] }}
                style={styles.cardImage}
                resizeMode="cover"
                key={index}
            />
            <View style={styles.textContent}>
                <Text numberOfLines={1} style={styles.cardtitle}>
                    {marker.geenName}
                </Text>
                <Text numberOfLines={1} style={styles.cardDescription}>
                    {marker.geenDescription}
                </Text>
                <View style={{ flexDirection: "row", paddingTop: 4 * windowHeight }}>
                    {marker.geenTag.map((tag, index) => {
                        if (index < 3) {
                            return (
                                <View
                                    style={{
                                        height: 18 * windowHeight,
                                        paddingHorizontal: index === 0 ? 0 : 6 * windowWidth,
                                        justifyContent: "center",
                                    }}
                                >
                                    <Text
                                        style={[{ color: "#86868e" }, globalStyles.tinyLightFont]}
                                    >
                                        #{tag}
                                    </Text>
                                </View>
                            );
                        }
                    })}
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPress={async () => {
                            nextFunction();
                        }}
                        style={[
                            styles.signIn,
                            {
                                borderColor: GlobalColor,
                                borderWidth: 1,
                            },
                        ]}
                    >
                        <View>
                            <Text
                                style={[
                                    styles.textSign,
                                    {
                                        color: GlobalColor,
                                    },
                                    globalStyles.smallSemiFont,
                                ]}
                            >
                                Show More
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    statusBarWrapper: {
        width: "100%",
        height: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        backgroundColor: GlobalColor,
    },
    container: {
        flex: 1,
    },
    searchBox: {
        position: "absolute",
        marginTop: Platform.OS === "ios" ? 40 : 20,
        flexDirection: "row",
        backgroundColor: "#fff",
        width: "90%",
        alignSelf: "center",
        borderRadius: 5,
        padding: 10,
        shadowColor: "#ccc",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    chipsScrollView: {
        position: "absolute",
        top: Platform.OS === "ios" ? 90 : 80,
        paddingHorizontal: 10,
    },
    chipsIcon: {
        marginRight: 5,
    },
    chipsItem: {
        flexDirection: "row",
        backgroundColor: "#fff",
        borderRadius: 20,
        padding: 8,
        paddingHorizontal: 20,
        marginHorizontal: 10,
        height: 35,
        shadowColor: "#ccc",
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 10,
    },
    scrollView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingVertical: 10,
    },
    endPadding: {
        paddingRight: windowWidth - CARD_WIDTH,
    },
    card: {
        backgroundColor: "#FFF",
        borderRadius: 10,
        margin: 10,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 3, y: -4 },
        height: CARD_HEIGHT,
        width: CARD_WIDTH,
        elevation: 2,
        //overflow: "hidden",
        zIndex: 1,
        elevation: 3,
    },
    cardPlaceholder: {
        // padding: 10,
        elevation: 2,
        borderRadius: 10,
        marginHorizontal: 10 * windowWidth,
        shadowColor: "#000",
        shadowRadius: 5,
        shadowOpacity: 0.3,
        shadowOffset: { x: 3, y: -4 },
        elevation: 2,
        height: CARD_HEIGHT,
        overflow: "hidden",
    },
    cardImage: {
        flex: 3,
        width: "100%",
        height: "100%",
        backgroundColor: "#e5e5e5",
        alignSelf: "center",
    },
    textContent: {
        flex: 2,
        padding: 10,
    },
    cardtitle: {
        fontSize: 12,
        // marginTop: 5,
        fontWeight: "bold",
    },
    cardDescription: {
        fontSize: 12,
        paddingTop: 4 * windowHeight,
        color: "#444",
    },
    markerWrap: {
        alignItems: "center",
        justifyContent: "center",
        width: 50,
        height: 50,
    },
    marker: {
        width: 30,
        height: 30,
    },
    button: {
        alignItems: "center",
        justifyContent: "flex-end",
        paddingTop: 8 * windowHeight,
    },
    signIn: {
        width: "100%",
        padding: 5,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 3,
    },
    textSign: {
        fontSize: 14,
        fontWeight: "bold",
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
});
export default HomeScreen;
