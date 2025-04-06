import { NextRequest, NextResponse } from "next/server";
import { listDirectory } from "@/lib/services/list-directory";

export async function GET(request: NextRequest) {
  // Get the path from the query parameters
  const relativeDirectoryPath =
    request?.nextUrl?.searchParams.get("path") || "";

  // Get the file system entries
  const fileSystemEntries = await listDirectory(relativeDirectoryPath);

  return NextResponse.json(fileSystemEntries);
}
