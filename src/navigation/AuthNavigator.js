import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//import SelectInterestScreen from '../screens/loginFlow/registerFlow/SelectInterestScreen.js';
//import WalkthroughScreen from '../screens/loginFlow/registerFlow/WalkthroughScreen.js';
//import TermsScreen from '../screens/loginFlow/registerFlow/TermsScreen.js';
//import PrivacyScreen from '../screens/loginFlow/registerFlow/PrivacyScreen.js';
import LoginScreen from "../screens/login/loginScreen.js";
import RegisterInfoScreen from "../screens/login/registerInfoScreen.js";
import ValidationScreen from "../screens/login/validationScreen.js";
import ForgetResetPasswordScreen from "../screens/login/forgetResetPasswordScreen.js";
import ForgetEmailInfoScreen from "../screens/login/forgetEmailInfoScreen.js";
import { Context as UserContext } from "../context/UserContext";
import { useColorScheme } from "react-native";
import TutorialScreen from "../screens/walkthrough/tutorialScreen";

const registerStack = createNativeStackNavigator();
const RegisterStackScreen = () => (
  <registerStack.Navigator>
    <registerStack.Screen
      name="RegisterInfo"
      component={RegisterInfoScreen}
      options={{ headerShown: false }}
    />
    <registerStack.Screen
      name="Validation"
      component={ValidationScreen}
      options={{ headerShown: false }}
    />
    <registerStack.Screen
      name="Tutorial"
      component={TutorialScreen}
      options={{ headerShown: false }}
    />
  </registerStack.Navigator>
);

function forgetPasswordStyle() {
  return {
    headerShown: false,
  };
}

const ForgetPasswordStack = createNativeStackNavigator();
const ForgetPasswordStackScreen = () => (
  <ForgetPasswordStack.Navigator>
    <ForgetPasswordStack.Screen
      name="ForgetEmailInfo"
      component={ForgetEmailInfoScreen}
      options={forgetPasswordStyle()}
    />
    <ForgetPasswordStack.Screen
      name="Validation"
      component={ValidationScreen}
      options={forgetPasswordStyle()}
    />
    <ForgetPasswordStack.Screen
      name="ForgetResetPassword"
      component={ForgetResetPasswordScreen}
      options={forgetPasswordStyle()}
    />
  </ForgetPasswordStack.Navigator>
);

const LoginStack = createNativeStackNavigator();
const AuthNavigator = () => {
  const { state: user } = useContext(UserContext);
  return (
    <LoginStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      {user == "SignUp" ? (
        <>
          <LoginStack.Screen name="Register" component={RegisterStackScreen} />
          <LoginStack.Screen name="Login" component={LoginScreen} />
          <LoginStack.Screen
            name="ForgetPassword"
            component={ForgetPasswordStackScreen}
          />
        </>
      ) : (
        <>
          <LoginStack.Screen name="Login" component={LoginScreen} />
            <LoginStack.Screen name="Register" component={RegisterStackScreen} />
          <LoginStack.Screen
            name="ForgetPassword"
            component={ForgetPasswordStackScreen}
          />
        </>
      )}
    </LoginStack.Navigator>
  );
};

export default AuthNavigator;
