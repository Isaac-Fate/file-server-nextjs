import type { FileSystemEntry } from "@/models/file-system-entry";
import fs from "fs";
import path from "path";

export async function listDirectory(relativeDirectoryPath: string) {
  // Construct an absolute directory path
  const directoryPath = path.join(
    process.env.FILE_STORAGE_ROOT_DIR!,
    relativeDirectoryPath,
  );

  // Names of the files and directories
  const names = fs.readdirSync(directoryPath);

  const fileSystemEntries: FileSystemEntry[] = names.map((name) => {
    const stats = fs.statSync(path.join(directoryPath, name));
    return {
      name,
      path: path.join(relativeDirectoryPath, name),
      isDirectory: stats.isDirectory(),
    };
  });

  return fileSystemEntries;
}
