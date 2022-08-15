import { tableSchema } from "@nozbe/watermelondb";

const noteSchema = tableSchema({
  name: "notes",
  columns: [
    { name: "note_id", type: "string" },
    { name: "title", type: "string" },
    { name: "content", type: "string" },
  ],
});

export { noteSchema };
