import { appSchema } from "@nozbe/watermelondb";
import { noteSchema } from "./noteSchema";

const schemas = appSchema({
  version: 1,
  tables: [noteSchema],
});

export { schemas };
