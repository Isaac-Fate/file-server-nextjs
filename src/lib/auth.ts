import * as jose from "jose";

export async function createAuthToken() {
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

  return authToken;
}

export async function decryptAuthToken(authToken: string) {
  // Encode the JWT secret
  const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

  // Decrypt the auth token
  const { payload } = await jose.jwtDecrypt(authToken, secret, {
    contentEncryptionAlgorithms: ["A256GCM"],
    keyManagementAlgorithms: ["dir"],
  });

  return payload;
}
