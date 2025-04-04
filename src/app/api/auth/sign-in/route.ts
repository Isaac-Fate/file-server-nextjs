import { NextRequest, NextResponse } from "next/server";
import { loadEnv } from "@/lib/env";
import { SignInFormDataSchema } from "@/models/sign-in-form-data";
import * as jose from "jose";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  // Load environment variables
  const env = loadEnv();

  // Parse the request data
  const signInFormData = SignInFormDataSchema.parse(await request.json());

  // Get the API key
  const apiKey = signInFormData.apiKey;

  if (apiKey !== env.API_KEY) {
    return NextResponse.json({ error: "invalid API key" }, { status: 400 });
  }

  // Encode the JWT secret
  const secret = new TextEncoder().encode(env.JWT_SECRET);

  // Create a JWT token
  const authToken = await new jose.EncryptJWT({
    authorized: true,
  })
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime(env.JWT_EXPIRATION_TIME)
    .encrypt(secret);

  // Put the token into the cookie
  const cookieStore = await cookies();
  cookieStore.set("auth-token", authToken);

  return NextResponse.json({
    authToken,
  });
}
