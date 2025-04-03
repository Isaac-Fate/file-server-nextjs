import { NextResponse } from "next/server";
import fs from "fs";
import { loadEnv } from "@/lib/env";

export async function GET() {
  const env = loadEnv();
  const filenames = await fs.promises.readdir(env.FILE_STORAGE_DIR);

  return NextResponse.json(filenames);
}
