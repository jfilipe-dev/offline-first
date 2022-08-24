import { Model } from "@nozbe/watermelondb";
import { field, writer } from "@nozbe/watermelondb/decorators";

class Note extends Model {
  static table = "notes";

  @field("title")
  title!: string;

  @field("content")
  content!: string;
}

export { Note };
