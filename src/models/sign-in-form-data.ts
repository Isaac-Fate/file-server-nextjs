import { z } from "zod";

export const SignInFormDataSchema = z.object({
  apiKey: z.string().min(1),
});

export type SignInFormData = z.infer<typeof SignInFormDataSchema>;
