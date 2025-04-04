import { z } from "zod";

export const StringArraySchema = z.array(z.string());

export type StringArray = z.infer<typeof StringArraySchema>;
