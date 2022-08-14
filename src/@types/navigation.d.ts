import { Note } from "../hooks/useNotes";

export type AppStackParamList = {
  Notes: undefined;
  Note: {
    note: Note;
  };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends AppStackParamList {}
  }
}
