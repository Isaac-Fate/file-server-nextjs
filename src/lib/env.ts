import { z } from "zod";

const EnvSchema = z.object({
  FILE_STORAGE_DIR: z.string().min(1),
});

export function loadEnv() {
  return EnvSchema.parse(process.env);
}
