import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Button, Heading, useTheme } from "native-base";
import React, { useLayoutEffect, useState } from "react";
import { Keyboard, TextInput } from "react-native";
import { AppStackParamList } from "../../@types/navigation";
import useKeyboard from "../../hooks/useKeyboard";
import useNotes from "../../hooks/useNotes";

import styles from "./styles";

type NoteRouteProp = RouteProp<AppStackParamList, "Note">;

const Note: React.FC = () => {
  const { colors } = useTheme();
  const { setOptions, goBack } = useNavigation();
  const { params } = useRoute<NoteRouteProp>();

  const { updateNote } = useNotes();

  const { note } = params;

  const { content, title } = note;

  const [editedContent, setEditedContent] = useState(content);

  const { height } = useKeyboard();

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <Button
          colorScheme="tertiary"
          size="sm"
          onPress={() => {
            Keyboard.dismiss();
            updateNote({
              ...note,
              content: editedContent,
            });
          }}
        >
          Salvar
        </Button>
      ),
      headerTitle: () => (
        <Heading size="sm" color="blueGray[700]">
          {title}
        </Heading>
      ),
      headerLeft: () => (
        <Button
          colorScheme="tertiary"
          variant="link"
          size="sm"
          onPress={goBack}
        >
          Voltar
        </Button>
      ),
    });
  }, [updateNote, editedContent, note]);

  return (
    <TextInput
      style={[
        styles.textarea,
        { paddingBottom: height, color: colors.blueGray[700] },
      ]}
      placeholder="Digite a nota"
      placeholderTextColor={colors.gray[500]}
      multiline
      textAlignVertical="top"
      value={editedContent}
      onChangeText={setEditedContent}
    />
  );
};

export default Note;
