import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { decryptAuthToken } from "@/lib/auth";

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
    // Decrypt the auth token
    const { payload } = await decryptAuthToken(authToken);

    // We don't need to do anything with the payload though
  } catch (e) {
    console.error(`failed to verify the auth token: ${e}`);
    return NextResponse.redirect(new URL("/auth", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/storage/:path*", "/api/((?!auth\\b).*)"],
};
