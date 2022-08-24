import { useNetInfo } from "@react-native-community/netinfo";
import { useCallback, useState, useEffect } from "react";
import {
  create,
  get,
  update,
  sync,
  remove,
} from "../database/controllers/notesController";
import { Note } from "../database/model/Note";

export interface InternNote {
  id: string;
  title: string;
  content: string;
}

const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const { isConnected } = useNetInfo();

  const getNotes = useCallback(async () => {
    if (isConnected) {
      sync().then(async () => {
        const notes = await get();
        setNotes(notes);
      });
    }
  }, [isConnected]);

  const createNote = useCallback(
    async (title: string) => {
      if (!title) return;

      const newNote = await create(title);

      // setNotes([...notes, newNote]);
    },
    [notes]
  );

  const updateNote = useCallback(async (note: InternNote) => {
    await update(note);
  }, []);

  const deleteNote = useCallback(
    async (note: Note) => {
      await remove(note.id);
      // setNotes(notes.filter((item) => item.id !== note.id));

      // await api.put(`/notes/${note.id}`, {
      //   title: note.title,
      //   content: note.content,
      //   id: note.id,
      //   deleted: true,
      // });

      // setNotes(notes.filter((item) => item.id !== note.id));
    },
    [notes]
  );

  return {
    notes,
    getNotes,
    createNote,
    updateNote,
    deleteNote,
  };
};

export default useNotes;
