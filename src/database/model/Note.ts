import { Model } from "@nozbe/watermelondb";
import { field } from "@nozbe/watermelondb/decorators";

class Note extends Model {
  static table = "notes";

  @field("note_id")
  note_id!: string;

  @field("title")
  title!: string;

  @field("content")
  content!: string;
}

export { Note };
