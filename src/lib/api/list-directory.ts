import axios from "axios";
import { FileSystemEntrySchema } from "@/models/file-system-entry";
import { z } from "zod";

export async function listDirectory(path: string) {
  const response = await axios.post("/api/list-directory", { path });

  const fileSystemEntries = z.array(FileSystemEntrySchema).parse(response.data);

  return fileSystemEntries;
}
