import { NextRequest, NextResponse } from "next/server";
import { SignInFormDataSchema } from "@/models/sign-in-form-data";
import { cookies } from "next/headers";
import { createAuthToken } from "@/lib/auth";

export async function POST(request: NextRequest) {
  // Parse the request data
  const signInFormData = SignInFormDataSchema.parse(await request.json());

  // Get the API key
  const apiKey = signInFormData.apiKey;

  if (apiKey !== process.env.API_KEY!) {
    return NextResponse.json({ error: "invalid API key" }, { status: 400 });
  }

  // Create a JWT token
  const authToken = await createAuthToken();

  // Put the token into the cookie
  const cookieStore = await cookies();
  cookieStore.set("auth-token", authToken);

  return NextResponse.json({
    authToken,
  });
}
