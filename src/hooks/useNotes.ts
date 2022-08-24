import { useCallback, useState } from "react";
import api from "../services/api";
import uuid from "react-native-uuid";

export interface InternNote {
  id: string;
  title: string;
  content: string;
}

const useNotes = () => {
  const [notes, setNotes] = useState<InternNote[]>([]);

  const getNotes = useCallback(async () => {
    const { data } = await api.get("/notes");

    setNotes(data);
  }, []);

  const createNote = useCallback(
    async (title: string) => {
      if (!title) return;

      const { data } = await api.post("/notes", { title });

      setNotes([...notes, data]);
    },
    [notes]
  );

  const updateNote = useCallback(async (note: InternNote) => {
    await api.put(`/notes/${note.id}`, {
      ...note,
    });
  }, []);

  const deleteNote = useCallback(
    async (note: InternNote) => {
      await api.put(`/notes/${note.id}`, {
        id: note.id,
        deleted: true,
      });

      setNotes(notes.filter((item) => item.id !== note.id));
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
