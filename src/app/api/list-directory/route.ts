import { NextRequest, NextResponse } from "next/server";
import { listDirectory } from "@/lib/api/list-directory";

export async function POST(request: NextRequest) {
  // Get the request data
  const { path: relativeDirectoryPath } = (await request.json()) as {
    path: string;
  };

  // Get the file system entries
  const fileSystemEntries = await listDirectory(relativeDirectoryPath);

  return NextResponse.json(fileSystemEntries);
}
