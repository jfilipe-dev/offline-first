import "react-native-gesture-handler";
import React from "react";
import { NativeBaseProvider, theme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            background: theme.colors.gray[200],
            border: theme.colors.red[600],
            primary: theme.colors.trueGray[900],
            text: theme.colors.white,
            card: theme.colors.gray[100],
            notification: theme.colors.trueGray[900],
          },
        }}
      >
        <Routes />
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
