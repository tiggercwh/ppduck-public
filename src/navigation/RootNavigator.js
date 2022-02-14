import React, { useEffect, useContext, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Auth } from "aws-amplify";
import AuthNavigator from "./AuthNavigator";
// import { withOAuth } from "aws-amplify-react-native";

import { Context as UserContext } from "../context/UserContext";
import { Context as AuthContext } from "../context/AuthContext";

import MainNavigator from "./MainNavigator";
import GlobalColor from "../context/GlobalColor";
const Stack = createNativeStackNavigator();

function RootNavigator(props) {
  // const {
  //     oAuthUser,
  // } = props;

  const [isLoading, setLoading] = useState(true);
  const { state: user, getOneUser, getUserData } = useContext(UserContext);
  const { state: isAuth, refreshAuthStatus } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    refreshAuthStatus();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          opacity: 0.9,
          backgroundColor: "#fff",
          justifyContent: "center",
          alignItems: "center",
          zIndex: 5000,
        }}
      >
        <ActivityIndicator color={GlobalColor} size="large" />
      </View>
    );
  }

  return isAuth ? (
    <MainNavigator></MainNavigator>
  ) : user == "Guest" ? (
    <MainNavigator></MainNavigator>
  ) : (
    <AuthNavigator></AuthNavigator>
  );
}

export default RootNavigator;
