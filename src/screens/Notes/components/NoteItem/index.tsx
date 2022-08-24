import { useNavigation } from "@react-navigation/native";
import { Button, Heading, View } from "native-base";
import React from "react";
import { InternNote } from "../../../../hooks/useNotes";

interface Props {
  data: InternNote;
  onDelete: (note: InternNote) => void;
}

const NoteItem = ({ data, onDelete }: Props) => {
  const { navigate } = useNavigation();

  return (
    <View
      backgroundColor="muted[700]"
      p={4}
      borderRadius={6}
      flexDirection="row"
      alignItems="center"
      justifyContent="space-between"
      my="10px"
    >
      <Heading size="sm" color="white" flex={1} mr={2}>
        {data.title}
      </Heading>

      <Button
        variant="link"
        colorScheme="danger"
        onPress={() => onDelete(data)}
      >
        Excluir
      </Button>

      <Button
        variant="link"
        colorScheme="amber"
        onPress={() => navigate("Note", { note: data })}
      >
        Editar
      </Button>
    </View>
  );
};

export default NoteItem;
