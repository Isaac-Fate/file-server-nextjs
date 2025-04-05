import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      pathSegments: string[];
    }>;
  },
) {
  const { pathSegments } = await params;

  // Get file path
  const filePath = path.join(
    process.env.FILE_STORAGE_ROOT_DIR!,
    ...pathSegments,
  );

  // Open the file
  const fileHandle = await fs.promises.open(filePath);

  // Create a readable stream that can be passed to NextResponse
  const stream = fileHandle.readableWebStream({
    type: "bytes",
  }) as ReadableStream<Uint8Array>;

  return new NextResponse(stream);
}
