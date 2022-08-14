import { useCallback, useState } from "react";
import api from "../services/api";
import uuid from "react-native-uuid";

export interface Note {
  id: string;
  title: string;
  content: string;
}

const useNotes = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const getNotes = useCallback(async () => {
    const { data } = await api.get("/notes");

    setNotes(data);
  }, []);

  const createNote = useCallback(
    async (title: string) => {
      if (!title) return;

      const newNote = {
        title,
        id: uuid.v4(),
        content: "",
      };

      const { data } = await api.post("/notes", newNote);

      setNotes([...notes, data]);
    },
    [notes]
  );

  const updateNote = useCallback(async (note: Note) => {
    await api.put(`/notes/${note.id}`, {
      ...note,
    });
  }, []);

  const deleteNote = useCallback(
    async (id: string) => {
      await api.delete(`/notes/${id}`);

      setNotes(notes.filter((note) => note.id !== id));
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
