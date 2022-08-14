import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Button, Flex, Heading, Icon, IconButton, useTheme } from "native-base";
import React from "react";
import Note from "../screens/Note";
import Notes from "../screens/Notes";

const { Navigator, Screen } = createNativeStackNavigator();

const Routes: React.FC = () => {
  const { colors } = useTheme();

  const HeaderBackground = () => (
    <Flex flex={1} backgroundColor={colors.info[600]} />
  );
  return (
    <Navigator>
      <Screen
        name="Notes"
        component={Notes}
        options={{
          title: null,
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
  );
};

export default Routes;
