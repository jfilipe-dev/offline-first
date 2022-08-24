import { appSchema } from "@nozbe/watermelondb";
import { noteSchema } from "./noteSchema";

const schemas = appSchema({
  version: 5,
  tables: [noteSchema],
});

export { schemas };
