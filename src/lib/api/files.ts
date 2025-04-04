import axios from "axios";
import { StringArraySchema } from "@/models/string-array";

export async function listFilenames() {
  const response = await axios.get("/api/files");

  const filenames = StringArraySchema.parse(response.data);

  return filenames;
}
