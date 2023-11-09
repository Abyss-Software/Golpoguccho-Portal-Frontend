import { z } from 'zod';

export const EmployeeProfileValidationSchema = z.object({
  name: z.string().min(1, { message: 'Fullname is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  contactPrimary: z.string().min(1, { message: 'Primary contact is required' }),
  contactSecondary: z
    .string()
    .min(1, { message: 'Secondary contact is required' }),
  address: z.string().min(1, { message: 'Address is required' }),
  avatar: z.string().optional().or(z.instanceof(File).optional()),
});

export const EmployeeCreateValidationSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  password: z.string().min(1, { message: 'Password is required' }),
  contactPrimary: z.string().min(1, { message: 'Primary contact is required' }),
  contactSecondary: z.string().optional(),
  address: z.string().min(1, { message: 'Address is required' }),
  position: z.string().min(1, { message: 'Position is required' }),
  role: z.string().min(1, { message: 'Role is required' }),
  verificationType: z.string().min(1, { message: 'Verification is required' }),
  verificationId: z.string().min(1, { message: 'Verification ID is required' }),
  baseSalary: z.number().optional(),
  monthlySalary: z.number().optional(),
});

export const EmployeeUpdateValidationSchema = z.object({
  id: z.string().min(1, { message: 'ID is required' }),
  name: z.string().min(1, { message: 'Name is required' }),
  email: z.string().email({ message: 'Invalid email' }),
  contactPrimary: z.string().min(1, { message: 'Primary contact is required' }),
  contactSecondary: z.string().optional(),
  address: z.string().min(1, { message: 'Address is required' }),
  position: z.string().min(1, { message: 'Position is required' }),
  role: z.string().min(1, { message: 'Role is required' }),
  verificationType: z.string().min(1, { message: 'Verification is required' }),
  verificationId: z.string().min(1, { message: 'Verification ID is required' }),
  baseSalary: z.number().optional(),
  monthlySalary: z.number().optional(),
});
