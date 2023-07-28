import { z } from "zod";

export const EmployeeProfileValidationSchema = z.object({
  fullname: z.string().nonempty({ message: "Fullname is required" }),
  email: z.string().email({ message: "Invalid email" }),
  contactPrimary: z
    .string()
    .nonempty({ message: "Primary contact is required" }),
  contactSecondary: z
    .string()
    .nonempty({ message: "Secondary contact is required" }),
  address: z.string().nonempty({ message: "Address is required" }),
  image: z.string().optional().or(z.instanceof(File).optional()),
});
