import withObservables from "@nozbe/with-observables";
import { database } from "../../../../database";
import { Note } from "../../../../database/model/Note";

const db = database.collections.get<Note>("notes");
const observeNotes = () => db.query().observe();

const enhance = withObservables([], () => ({
  notes: observeNotes(),
}));

export default enhance;
