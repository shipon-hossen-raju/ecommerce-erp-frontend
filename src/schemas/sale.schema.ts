import { z } from "zod";

export const saleItemSchema = z.object({
  product: z
    .string({ required_error: "Product is required" })
    .min(1, "Product is required"),
  quantity: z.coerce
    .number({ required_error: "Quantity is required" })
    .int("Quantity must be a whole number")
    .min(1, "Quantity must be at least 1"),
});

export const saleSchema = z.object({
  items: z.array(saleItemSchema).min(1, "Add at least one item"),
});
