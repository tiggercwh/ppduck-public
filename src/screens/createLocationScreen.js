import React, { useContext, useEffect, useState, useRef } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  StatusBar,
  Platform,
  KeyboardAvoidingView,
  Pressable,
  Image,
} from "react-native";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import GooglePlacesInput from "../components/GooglePlacesInput";
import Geocoder from "react-native-geocoding";
const globalStyles = require("../context/GlobalStyles");
const windowWidth = Dimensions.get("window").width / 375;
const windowHeight = Dimensions.get("window").height / 812;
import createMapStyle from "../context/createMapStyle.js";
import LottieView from "lottie-react-native";
import * as Location from "expo-location";
import Button from "../components/Button.js";
import GlobalColor from "../context/GlobalColor";

const CreateLocationScreen = ({ navigation }) => {
  const [containerHeight, setHeight] = useState(0);
  const [locationData, setLocationData] = useState(null);
  const mapRef = useRef(null);
  const [coordState, setCoord] = useState({ longitude: 1, latitude: 1 });
  const [delta, setDelta] = useState({
    latitudeDelta: 0.04,
    longitudeDelta: 0.01,
  });
  const [isLoading, setLoading] = React.useState(false);

  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();

    //Alert.alert(date + '-' + month + '-' + year);
    // You can turn it in to your desired format
    return year + "-" + month + "-" + date + "T00:00:00.000Z"; //format: dd-mm-yyyy;
  };

  function topLeftFunction() {
    navigation.goBack();
  }
  function topRightFunction() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        setCoord({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
        mapRef.current.animateToRegion(
          {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: delta.latitudeDelta,
            longitudeDelta: delta.longitudeDelta,
          },
          550
        );
      },
      (error) => console.log(error.message),
      { enableHighAccuracy: false, timeout: 1000, maximumAge: 1000 }
    );
  }

  function onSubmitRelocate(lat, long) {
    console.log(lat, " LAT and LONG ", long);
    setCoord({ latitude: lat, longitude: long });
    console.log(mapRef);
    mapRef.current.animateToRegion(
      {
        latitude: lat,
        longitude: long,
        latitudeDelta: delta.latitudeDelta,
        longitudeDelta: delta.longitudeDelta,
      },
      550
    );
  }

  useEffect(() => {
    Location.installWebGeolocationPolyfill();
  }, []);
  useEffect(() => {
    async function moveToCurrentLocation() {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoord({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          mapRef.current.animateToRegion(
            {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              latitudeDelta: delta.latitudeDelta,
              longitudeDelta: delta.longitudeDelta,
            },
            550
          );
        },
        (error) => console.log(error.message),
        { enableHighAccuracy: false, timeout: 1000, maximumAge: 1000 }
      );
    }
    setLoading(true);
    moveToCurrentLocation();
    setLoading(false);
  }, []);

  useEffect(() => {
    if (locationData != null) {
      onSubmitRelocate(locationData.latitude, locationData.longitude, delta);
    }
  }, [locationData]);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS == "ios" ? 0 : 20}
      enabled={Platform.OS === "ios" ? false : false}
      style={{ flex: 1, backgroundColor: GlobalColor }}
    >
      <SafeAreaView
        onLayout={(event) => {
          var { height } = event.nativeEvent.layout;
          setHeight(height);
        }}
        style={{
          width: "100%",
          height: "100%",
          alignSelf: "center",
          backgroundColor: "#fff",
          paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
        }}
      >
        <GooglePlacesInput
          setData={setLocationData}
          leftButtonFunction={topLeftFunction}
          rightButtonFunction={topRightFunction}
          onSubmitRelocate={onSubmitRelocate}
        />
        {coordState.latitude === 1 ? (
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#FFF",
            }}
          >
            <View
              style={{
                width: 248 * windowHeight,
                height: 248 * windowHeight,
                alignContent: "center",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LottieView
                source={require("../../assets/animations/22608-earth-animation.json")}
                autoPlay
                loop={false}
              />
            </View>
            <View style={{ height: 12 * windowHeight }} />
            <View
              style={{
                width: 248 * windowWidth,
                height: 86 * windowHeight,
                alignContent: "center",
                alignSelf: "center",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LottieView
                source={require("../../assets/animations/890-loading-animation.json")}
                autoPlay
                loop
              />
            </View>
          </View>
        ) : (
          <View stlye={{ height: "100%", width: "100%" }}>
            <View
              style={{
                width: 86 * windowWidth,
                height: 86 * windowHeight,
                position: "absolute",
                bottom: ((812 - 86) / 2) * windowHeight,
                right: ((375 - 86) / 2) * windowWidth,
                zIndex: 1000,
              }}
            >
              <LottieView
                source={require("../../assets/animations/MAP_MARKER.json")}
                autoPlay
                loop
              />
            </View>
            <MapView
              ref={mapRef}
              mapType={"standard"}
              customMapStyle={createMapStyle}
              provider={PROVIDER_GOOGLE}
              followsUserLocation={true}
              zoomEnabled={true}
              pitchEnabled={false}
              rotateEnabled={true}
              minZoomLevel={13} // default => 0
              maxZoomLevel={17} // default => 20
              style={{ height: "100%", width: "100%" }}
              initialRegion={{
                latitude: coordState.latitude,
                longitude: coordState.longitude,
                latitudeDelta: delta.latitudeDelta,
                longitudeDelta: delta.longitudeDelta,
              }}
              onRegionChangeComplete={(region) => {
                console.log(region.latitude, region.longitude);
                setCoord({
                  latitude: region.latitude,
                  longitude: region.longitude,
                });
              }}
              onMarkerPress={() => {
                console.log("marker pressed!");
              }}
            />
          </View>
        )}
        <View
          style={{
            width: 375 * windowWidth,
            height: "15%",
            position: "absolute",
            bottom: 0 * windowHeight,
            zIndex: 1000,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            buttonText={"Next"}
            handlePress={() => {
              //setModalVisible(false)
              const address = locationData
                ? (locationData.district ?? "") +
                  (locationData.street ?? "") +
                  (locationData.building ?? "")
                : "";

              navigation.navigate("CreateDetail", {
                latitude: locationData
                  ? coordState.latitude == locationData.latitude
                    ? locationData.latitude
                    : coordState.latitude
                  : coordState.latitude,
                longitude: locationData
                  ? coordState.longitude == locationData.longitude
                    ? locationData.longitude
                    : coordState.longitude
                  : coordState.longitude,
                geenLocation: locationData
                  ? coordState.latitude == locationData.latitude
                    ? address
                    : ""
                  : "",
              });
            }}
            width={128 * windowWidth}
            height={32 * windowHeight}
          />
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default CreateLocationScreen;
