import { NextRequest, NextResponse } from "next/server";
import { loadEnv } from "@/lib/env";
import fs from "fs";
import path from "path";
import type { FileSystemEntry } from "@/models/file-system-entry";

export async function POST(request: NextRequest) {
  // Get the request data
  const { path: relativeDirectoryPath } = (await request.json()) as {
    path: string;
  };

  // Load environment variables
  const env = loadEnv();

  // Construct an absolute directory path
  const directoryPath = path.join(
    env.FILE_STORAGE_ROOT_DIR,
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

  return NextResponse.json(fileSystemEntries);
}
