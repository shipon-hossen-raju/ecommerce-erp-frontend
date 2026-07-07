import { z } from "zod";

export const userAccountSchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name too long"),
  email: z
    .string({ required_error: "Email is required" })
    .email("Invalid email address"),
  password: z
    .union([z.string().min(6, "Password must be at least 6 characters").max(50), z.literal("")])
    .optional(),
  role: z.enum(["ADMIN", "MANAGER", "EMPLOYEE"], {
    errorMap: () => ({ message: "Role is required" }),
  }),
});
