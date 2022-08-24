import "react-native-gesture-handler";
import DatabaseProvider from "@nozbe/watermelondb/DatabaseProvider";
import React from "react";
import { NativeBaseProvider, theme } from "native-base";
import { NavigationContainer } from "@react-navigation/native";
import Routes from "./src/routes";
import { database } from "./src/database";

export default function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer
        theme={{
          dark: true,
          colors: {
            background: theme.colors.trueGray[900],
            border: theme.colors.red[600],
            primary: theme.colors.trueGray[900],
            text: theme.colors.white,
            card: theme.colors.info[600],
            notification: theme.colors.trueGray[900],
          },
        }}
      >
        <DatabaseProvider database={database}>
          <Routes />
        </DatabaseProvider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
