import { NextResponse } from "next/server";
import fs from "fs";

const FILE_STORAGE_DIR = process.env.FILE_STORAGE_DIR || "";

export async function GET() {
  const filenames = await fs.promises.readdir(FILE_STORAGE_DIR);

  return NextResponse.json(filenames);
}
