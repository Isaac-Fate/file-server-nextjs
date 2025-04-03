import { NextResponse } from "next/server";
import { loadEnv } from "@/lib/env";

export async function GET() {
  const env = loadEnv();
  return NextResponse.json({
    status: "OK",
    env,
  });
}
