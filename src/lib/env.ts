import { z } from "zod";

const EnvSchema = z.object({
  API_KEY: z.string(),
  JWT_SECRET: z.string(),
  JWT_EXPIRATION_TIME: z.string(),
  FILE_STORAGE_DIR: z.string().min(1),
});

export function loadEnv() {
  return EnvSchema.parse(process.env);
}
