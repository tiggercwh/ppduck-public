import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import Amplify from "aws-amplify";
import config from "./src/aws-exports";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";

import { Provider as GeenProvider } from "./src/context/GeenContext";
import { Provider as UserProvider } from "./src/context/UserContext";
import { Provider as AuthProvider } from "./src/context/AuthContext";
import { Provider as ChatProvider } from "./src/context/ChatContext";
import { Provider as NavigationProvider } from "./src/context/NavigationContext";

import RootNavigator from "./src/navigation/RootNavigator";
import "react-native-gesture-handler";
import { enableScreens } from "react-native-screens";
enableScreens();

async function urlOpener(url, redirectUrl) {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
    url,
    redirectUrl,
    {
      showTitle: false,
      enableUrlBarHiding: true,
      enableDefaultShare: false,
      ephemeralWebSession: false,
    }
  );

  if (type === "success") {
    Linking.openURL(newUrl);
  }
}

Amplify.configure({
  ...config,
  oauth: {
    ...config.oauth,
    urlOpener,
  },
});

// Amplify.configure(config)

export default function App() {
  return (
    <GeenProvider>
      <NavigationProvider>
        <ChatProvider>
          <AuthProvider>
            <UserProvider>
              <NavigationContainer>
                <RootNavigator />
              </NavigationContainer>
            </UserProvider>
          </AuthProvider>
        </ChatProvider>
      </NavigationProvider>
    </GeenProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
