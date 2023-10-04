import { z } from 'zod';

export const EmployeeProfileValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Fullname is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  contactPrimary: z
    .string()
    .nonempty({ message: 'Primary contact is required' }),
  contactSecondary: z
    .string()
    .nonempty({ message: 'Secondary contact is required' }),
  address: z.string().nonempty({ message: 'Address is required' }),
  avatar: z.string().optional().or(z.instanceof(File).optional()),
});

export const EmployeeCreateValidationSchema = z.object({
  name: z.string().nonempty({ message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().nonempty({ message: 'Password is required' }),
  contactPrimary: z
    .string()
    .nonempty({ message: 'Primary contact is required' }),
  contactSecondary: z.string().optional(),
  address: z.string().nonempty({ message: 'Address is required' }),
  position: z.string().nonempty({ message: 'Position is required' }),
  role: z.string().nonempty({ message: 'Role is required' }),
  verificationType: z
    .string()
    .nonempty({ message: 'Verification is required' }),
  verificationId: z
    .string()
    .nonempty({ message: 'Verification ID is required' }),
  baseSalary: z.number().optional(),
  monthlySalary: z.number().optional(),
});

export const EmployeeUpdateValidationSchema = z.object({
  id: z.string().nonempty({ message: 'ID is required' }),
  name: z.string().nonempty({ message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  contactPrimary: z
    .string()
    .nonempty({ message: 'Primary contact is required' }),
  contactSecondary: z.string().optional(),
  address: z.string().nonempty({ message: 'Address is required' }),
  position: z.string().nonempty({ message: 'Position is required' }),
  role: z.string().nonempty({ message: 'Role is required' }),
  verificationType: z
    .string()
    .nonempty({ message: 'Verification is required' }),
  verificationId: z
    .string()
    .nonempty({ message: 'Verification ID is required' }),
  baseSalary: z.number().optional(),
  monthlySalary: z.number().optional(),
});
