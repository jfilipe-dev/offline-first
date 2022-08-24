import { Flex, Heading, Image } from "native-base";
import React from "react";
import Icon from "../../../../assets/watermelon3.png";

const Empty: React.FC = () => {
  return (
    <Flex align="center" justify="center" flex={1}>
      <Image
        source={Icon}
        width="80px"
        height="80px"
        alt="Ícone de lista vazia"
        mb={2}
      />
      <Heading size="lg" color="blueGray[700]">
        Ops...
      </Heading>

      <Heading
        size="sm"
        color="blueGray[700]"
        mt={2}
        maxW="80%"
        textAlign="center"
      >
        Você ainda não possui notas criadas.
      </Heading>
    </Flex>
  );
};

export default Empty;
