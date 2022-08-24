import { database } from "..";
import { Note } from "../model/Note";
import { synchronize } from "@nozbe/watermelondb/sync";
import api from "../../services/api";
import { InternNote } from "../../hooks/useNotes";

export async function create(noteTitle: string) {
  return await database.write(async () => {
    return await database.get<Note>("notes").create((note) => {
      note.title = noteTitle;
    });
  });
}

export async function get() {
  return await database.read(async () => {
    return await database.get<Note>("notes").query().fetch();
  });
}

export async function update(params: InternNote) {
  return await database.write(async () => {
    return await (
      await database.get<Note>("notes").find(params.id)
    ).update((note) => {
      note.title = params.title;
      note.content = params.content;
    });
  });
}

export async function remove(id: string) {
  return await database.write(async () => {
    return await (await database.get<Note>("notes").find(id)).markAsDeleted();
  });
}

export async function sync() {
  await synchronize({
    database,
    sendCreatedAsUpdated: true,
    pullChanges: async () => {
      const { data } = await api.get("/sync");

      return {
        changes: {
          notes: {
            created: [],
            updated: data.data,
            deleted: data.deleted,
          },
        },
        timestamp: Date.now(),
      };
    },
    pushChanges: async ({ changes }) => {
      console.log(
        "🚀 ~ file: notesController.ts ~ line 51 ~ pushChanges: ~ changes",
        changes
      );
      changes.notes.created.forEach(async (note) => {
        await api.post("/notes", {
          title: note.title,
          id: note.id,
          content: note.content,
          deleted: false,
        });
      });

      changes.notes.updated.forEach(async (note) => {
        await api.put(`/notes/${note.id}`, {
          title: note.title,
          content: note.content,
          id: note.id,
          deleted: false,
        });
      });

      changes.notes.deleted.forEach(async (note) => {
        await api.put(`/notes/${note}`, {
          id: note,
          deleted: true,
        });
      });
    },
  });
}
