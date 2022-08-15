import { Database } from "@nozbe/watermelondb";
import SQLiteAdapter from "@nozbe/watermelondb/adapters/sqlite";
import { Note } from "./model/Note";
import { schemas } from "./schema";

const adapter = new SQLiteAdapter({
  schema: schemas,
});

export const database = new Database({
  adapter,
  modelClasses: [Note],
});
