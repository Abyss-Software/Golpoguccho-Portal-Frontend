import { z } from "zod";

export const PackageCreateValidatorSchema = z.object({
  title: z.string().nonempty({ message: "Title is required" }),
  description: z.string().nonempty({ message: "Description is required" }),
  image: z.instanceof(File),
  price: z.string().refine((val) => parseInt(val) > 0, {
    message: "Price is required",
  }),
});
