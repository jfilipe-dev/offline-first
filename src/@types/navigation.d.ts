import { Note } from "../database/model/Note";
import { InternNote } from "../hooks/useNotes";

export type AppStackParamList = {
  Notes: undefined;
  Note: {
    note: InternNote;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
