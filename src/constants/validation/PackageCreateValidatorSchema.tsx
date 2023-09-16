import { z } from "zod";

export const PackageCreateValidatorSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  image: z.string().nonempty({ message: "Image is required" }),
  price: z.number().min(1, { message: "Price must be greater than 0" }),
});
