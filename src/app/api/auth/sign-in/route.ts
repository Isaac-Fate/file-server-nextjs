import { NextRequest, NextResponse } from "next/server";
import { SignInFormDataSchema } from "@/models/sign-in-form-data";
import * as jose from "jose";
import { cookies } from "next/headers";

export async function POST(request: NextRequest) {
  // Parse the request data
  const signInFormData = SignInFormDataSchema.parse(await request.json());

  // Get the API key
  const apiKey = signInFormData.apiKey;

  if (apiKey !== process.env.API_KEY!) {
    return NextResponse.json({ error: "Invalid API key" }, { status: 400 });
  }

  // Encode the JWT secret
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

  // Create a JWT token
  const authToken = await new jose.EncryptJWT({
    authorized: true,
  })
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .setIssuedAt()
    .setExpirationTime(process.env.JWT_EXPIRATION_TIME!)
    .encrypt(secret);

  // Put the token into the cookie
  const cookieStore = await cookies();
  cookieStore.set("auth-token", authToken);

  return NextResponse.json({
    authToken,
  });
}
