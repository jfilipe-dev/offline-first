import { useNetInfo } from "@react-native-community/netinfo";
import { Alert, HStack, Text, VStack } from "native-base";
import React, { useEffect, useState } from "react";

const ConnectionAlert: React.FC = () => {
  const netInfo = useNetInfo();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);

    setTimeout(() => {
      setVisible(false);
    }, 3000);
  }, [netInfo]);

  if (!visible) {
    return null;
  }

  return (
    <Alert
      status={netInfo.isConnected ? "success" : "error"}
      zIndex={1}
      position="absolute"
      bottom={10}
      left={5}
      right={5}
    >
      <VStack space={2} flexShrink={1} w="100%">
        <HStack flexShrink={1} space={2} justifyContent="space-between">
          <HStack space={2} flexShrink={1}>
            <Alert.Icon mt="1" />
            <Text fontSize="md" color="coolGray.800">
              {netInfo.isConnected
                ? "Você está conectado"
                : "Você está desconectado"}
            </Text>
          </HStack>
        </HStack>
      </VStack>
    </Alert>
  );
};

export default ConnectionAlert;
