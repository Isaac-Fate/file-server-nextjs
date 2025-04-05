import { z } from "zod";

export const FileSystemEntrySchema = z.object({
  name: z.string(),
  path: z.string(),
  isDirectory: z.boolean(),
});

export type FileSystemEntry = z.infer<typeof FileSystemEntrySchema>;
