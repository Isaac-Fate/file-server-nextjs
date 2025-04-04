import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import * as jose from "jose";

export async function middleware(request: NextRequest) {
  // Get the auth header
  const authHeader = request.headers.get("authorization");

  if (authHeader !== null) {
    // Get the API key from the bearer token
    const apiKey = authHeader.replace("Bearer ", "");

    if (apiKey === process.env.API_KEY!) {
      return NextResponse.next();
    } else {
      return NextResponse.json({ error: "invalid API key" }, { status: 400 });
    }
  }

  // Get the cookies
  const cookieStore = await cookies();

  // Get the auth token
  const authToken = cookieStore.get("auth-token")?.value;

  if (authToken === undefined) {
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  try {
    // Encode the JWT secret
    const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

    // Decrypt the auth token
    await jose.jwtDecrypt(authToken, secret, {
      contentEncryptionAlgorithms: ["A256GCM"],
      keyManagementAlgorithms: ["dir"],
    });
  } catch (e) {
    console.error(`failed to verify the auth token: ${e}`);
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/files/:path*", "/api/((?!auth\\b).*)"],
};
