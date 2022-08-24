import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { Flex, Heading, useTheme } from "native-base";
import React from "react";
import ConnectionAlert from "../components/ConnectionAlert";
import Note from "../screens/Note";
import Notes from "../screens/Notes";

const { Navigator, Screen } = createNativeStackNavigator();

const Routes: React.FC = () => {
  const { colors } = useTheme();

  const HeaderBackground = () => (
    <Flex flex={1} backgroundColor={colors.info[600]} />
  );
  return (
    <>
      <StatusBar backgroundColor={colors.info[600]} style="light" />
      <Navigator
        screenOptions={{
          headerBackVisible: false,
          headerTitleAlign: "center",
        }}
      >
        <Screen
          name="Notes"
          component={Notes}
          options={{
            title: "",
            headerLeft: () => (
              <Heading size="md" color="white">
                Minhas notas
              </Heading>
            ),
            headerBackground: () => <HeaderBackground />,
          }}
        />

        <Screen
          name="Note"
          component={Note}
          options={{
            headerBackground: () => <HeaderBackground />,
          }}
        />
      </Navigator>
      <ConnectionAlert />
    </>
  );
};

export default Routes;
