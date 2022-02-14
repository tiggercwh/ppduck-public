import * as React from "react";
import { View, Text, Image, K } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AuthNavigator from "../navigation/AuthNavigator";
import HomeScreen from "../screens/homeScreen";
import ChatMenuScreen from "../screens/chatMenuScreen";
import ChatDetailScreen from "../screens/chatDetailScreen";
import GeenScreen from "../screens/geenScreen";
import ParticipantsListScreen from "../screens/participantsListScreen";
import SettingProfileScreen from "../screens/settingProfileScreen";
import CreateLocationScreen from "../screens/createLocationScreen";
import CreateDetailScreen from "../screens/createDetailScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SettingReportScreen from "../screens/settingReportScreen";
import SettingEditMenuScreen from "../screens/settingEditMenuScreen";
import SettingEditDetailScreen from "../screens/settingEditDetailScreen";
import TutorialScreen from "../screens/walkthrough/tutorialScreen";
import {
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import GlobalColor from "../context/GlobalColor";

const Stack = createNativeStackNavigator();

const HomeTabStack = createBottomTabNavigator();
const HomeTabStackScreen = ({ route }) => (
  <HomeTabStack.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === "CenterMap") {
          return <MaterialIcons name="my-location" size={size} color={color} />;
        } else if (route.name === "ChatMenu") {
          return <Ionicons name={"chatbox"} size={size} color={color} />;
        } else if (route.name === "Explore") {
          return <Ionicons name={"earth-sharp"} size={size} color={color} />;
        } else if (route.name === "SettingProfile") {
          return <FontAwesome name="user" color={color} size={size} />;
        }

        // You can return any component that you like here!
      },
      tabBarActiveTintColor: GlobalColor,
      tabBarInactiveTintColor: "#86868E",
      tabBarShowLabel: false,
      headerShown: false,
    })}
    mode="card"
  >
    <HomeTabStack.Screen name="Explore" component={HomeScreen} />
    <HomeTabStack.Screen name="ChatMenu" component={ChatMenuScreen} />
    <HomeTabStack.Screen
      name="SettingProfile"
      component={SettingProfileScreen}
    />
  </HomeTabStack.Navigator>
);
function MainNavigator() {
  return (
    <Stack.Navigator options={{ headerShown: false }}>
      <Stack.Screen
        name="Home"
        component={HomeTabStackScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateLocation"
        component={CreateLocationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateDetail"
        component={CreateDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatMenu"
        component={ChatMenuScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChatDetail"
        component={ChatDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Geen"
        component={GeenScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ParticipantsList"
        component={ParticipantsListScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingProfile"
        component={SettingProfileScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingReport"
        component={SettingReportScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingEditMenu"
        component={SettingEditMenuScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SettingEditDetail"
        component={SettingEditDetailScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Tutorial"
        component={TutorialScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default MainNavigator;
