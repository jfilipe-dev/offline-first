import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button, Flex, Heading, Input, useTheme } from "native-base";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import styles from "./styles";
import NoteItem from "./components/NoteItem";
import useNotes from "../../hooks/useNotes";
import enhance from "./components/Observable";
import { Note } from "../../database/model/Note";

interface Props {
  notes: Note[];
}

const Notes = ({ notes }: Props) => {
  const { colors } = useTheme();
  const { setOptions } = useNavigation();

  const { createNote, getNotes, deleteNote } = useNotes();

  const [newNote, setNewNote] = useState("");

  const modalizeRef = useRef<Modalize>(null);

  const handleCreateNote = () => {
    createNote(newNote);
    setNewNote("");
    modalizeRef.current?.close();
  };

  useFocusEffect(
    useCallback(() => {
      getNotes();
    }, [getNotes])
  );

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <Button
          colorScheme="amber"
          size="sm"
          onPress={() => modalizeRef.current?.open()}
        >
          Nova nota
        </Button>
      ),
    });
  }, []);

  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {notes.map((note) => (
          <NoteItem key={note.id} data={note} onDelete={deleteNote} />
        ))}
      </ScrollView>

      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        modalTopOffset={80}
        keyboardAvoidingBehavior="padding"
        keyboardAvoidingOffset={80}
        modalStyle={{
          backgroundColor: colors.muted[900],
        }}
      >
        <Flex p={10}>
          <Heading size="md" color="white">
            Criar nova nota
          </Heading>
          <Input
            size="lg"
            p={4}
            placeholder="Digite o título da nota"
            bgColor={colors.muted[800]}
            color="white"
            variant="filled"
            mt={7}
            value={newNote}
            onChangeText={setNewNote}
          />
          <Button colorScheme="amber" onPress={handleCreateNote} mt={5}>
            Adicionar
          </Button>
        </Flex>
      </Modalize>
    </>
  );
};

export default enhance(Notes);
