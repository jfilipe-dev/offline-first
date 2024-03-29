import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Button, Flex, Heading, Input, useTheme, View } from "native-base";
import React, { useCallback, useLayoutEffect, useRef, useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { Modalize } from "react-native-modalize";
import styles from "./styles";
import NoteItem from "./components/NoteItem";
import useNotes from "../../hooks/useNotes";
import Empty from "./components/Empty";

const Notes: React.FC = () => {
  const { colors } = useTheme();
  const { setOptions } = useNavigation();

  const { notes, createNote, getNotes, deleteNote } = useNotes();

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

  // useEffect(() => {
  //   async function loadNotes() {
  //     const notesColeciton = database.get("notes");
  //     const notes = await notesColeciton.query().fetch();
  //     console.log("🚀 ~ file: index.tsx ~ line 43 ~ loadNotes ~ notes", notes);
  //   }

  //   loadNotes();
  // }, []);

  useLayoutEffect(() => {
    setOptions({
      headerRight: () => (
        <Button
          colorScheme="tertiary"
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
        {notes.length ? (
          notes.map((note) => (
            <NoteItem key={note.id} data={note} onDelete={deleteNote} />
          ))
        ) : (
          <Empty />
        )}
      </ScrollView>

      <Modalize
        ref={modalizeRef}
        adjustToContentHeight
        modalTopOffset={80}
        keyboardAvoidingBehavior="padding"
        keyboardAvoidingOffset={80}
        modalStyle={{
          backgroundColor: colors.gray[100],
        }}
      >
        <Flex p={10}>
          <Heading size="md" color={colors.blueGray[700]}>
            Criar nova nota
          </Heading>
          <Input
            size="lg"
            p={4}
            placeholder="Digite o título da nota"
            bgColor={colors.gray[300]}
            color={colors.blueGray[700]}
            variant="filled"
            _focus={{
              borderColor: colors.blueGray[700],
            }}
            mt={7}
            value={newNote}
            onChangeText={setNewNote}
          />
          <Button colorScheme="tertiary" onPress={handleCreateNote} mt={5}>
            Adicionar
          </Button>
        </Flex>
      </Modalize>
    </>
  );
};

export default Notes;
