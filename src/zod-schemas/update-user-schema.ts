import { z } from "zod";

// Matches the following conditions:
// Starts with alphabets.
// Contains only alphabets.
// Has only one space (if present).
// Ends with alphabets.

const fullNameRegex = new RegExp("^[a-zA-Z]+(?: [a-zA-Z]+)?$");

export const UpdateUserSchema = z.object({
  id: z.string().min(1, "ID is required"),
  name: z
    .string()
    .trim()
    .toLowerCase()
    .min(1, "Name is required")
    .regex(fullNameRegex, "Invalid name format"),
});

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;
