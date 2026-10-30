import * as z from "zod";

const registerSchema = z.object({
  name: z.string().min(3, "Name must be 3 character long").trim(),
  email: z.email("Invalid email address").trim().toLowerCase(),
  password: z.string().min(9, "Password must be 9 character long"),
});

const loginSchema = z.object({
  email: z.email("Invalid email address").trim().toLowerCase(),
  password: z.string().min(1, "Password is required"),
});

export { registerSchema, loginSchema };
