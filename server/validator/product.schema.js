import * as z from "zod";

const createProductSchema = z.object({
  name: z.string().trim().max(100, "NO character exceed form 100 character"),
  description: z
    .string()
    .trim()
    .min(2, "NO character is less than 2 characters"),
  price: z.coerce.number().positive("no must be greater than 0"),
  category: z
    .string()
    .trim()
    .max(100, "NO character exceed form 100 character")
    .min(2, "NO character is less than 2 characters"),
  quantity: z.coerce
    .number()
    .int("Quantity must be a whole number")
    .min(0, "Quantity cannot be negative"),
  image: z.string().trim().url("Image must be a valid URL"),
});

const updateProductSchema = createProductSchema
  .partial()
  .refine((data) => Object.keys(data).length > 0, {
    message: "Provide at least one feild to update",
  });

export { createProductSchema, updateProductSchema };
