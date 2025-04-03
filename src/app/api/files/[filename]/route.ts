import fs from "fs";
import path from "path";
import { NextRequest, NextResponse } from "next/server";
import type { Readable } from "stream";
import { loadEnv } from "@/lib/env";

export async function GET(
  request: NextRequest,
  {
    params,
  }: {
    params: Promise<{
      filename: string;
    }>;
  },
) {
  try {
    const env = loadEnv();
    const { filename } = await params;

    // Validate filename
    if (!filename || !isValidFilename(filename)) {
      return new NextResponse("Invalid filename", { status: 400 });
    }

    // Construct safe file path
    const filepath = path.join(env.FILE_STORAGE_DIR, filename);

    // Verify path is within allowed directory
    if (!isPathWithinDirectory(filepath, env.FILE_STORAGE_DIR)) {
      return new NextResponse("Access denied", { status: 403 });
    }

    // Check file existence and get stats
    const fileStats = await fs.promises.stat(filepath);

    // Handle directory request
    if (fileStats.isDirectory()) {
      return new NextResponse("Cannot download directory", { status: 400 });
    }

    // Create readable stream
    const fileStream = fs.createReadStream(filepath);
    const webReadableStream = convertNodeToWebStream(fileStream);

    // Prepare response
    return new NextResponse(webReadableStream, {
      headers: {
        "Content-Type": "application/octet-stream",
        "Content-Length": fileStats.size.toString(),
        "Content-Disposition": `attachment; filename="${encodeURIComponent(filename)}"`,
        "X-File-Name": encodeURIComponent(filename),
      },
    });
  } catch (error) {
    return handleFileError(error);
  }
}

// Helper Functions

function isValidFilename(filename: string): boolean {
  return /^[^\\/:\*\?"<>\|]+$/.test(filename); // Basic filename validation
}

function isPathWithinDirectory(childPath: string, parentPath: string): boolean {
  const relative = path.relative(parentPath, childPath);
  return !relative.startsWith("..") && !path.isAbsolute(relative);
}

function convertNodeToWebStream(
  nodeStream: Readable,
): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      nodeStream.on("data", (chunk: Buffer) => {
        controller.enqueue(new Uint8Array(chunk));
      });
      nodeStream.on("end", () => controller.close());
      nodeStream.on("error", (error) => controller.error(error));
    },
    cancel() {
      nodeStream.destroy();
    },
  });
}

function handleFileError(error: unknown): NextResponse {
  console.error("File download error:", error);

  if (error instanceof Error) {
    switch ((error as NodeJS.ErrnoException).code) {
      case "ENOENT":
        return new NextResponse("File not found", { status: 404 });
      case "EACCES":
        return new NextResponse("Access denied", { status: 403 });
    }
  }

  return new NextResponse("Internal server error", { status: 500 });
}
