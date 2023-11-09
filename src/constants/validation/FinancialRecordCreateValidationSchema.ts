import { z } from 'zod';

export const FinancialReportCreateValidatorSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  type: z.string().min(1, { message: 'Type is required' }),
  amount: z.number().nonnegative({ message: 'Amount is required' }),
  transactionDate: z
    .date()
    .min(
      new Date('2020-01-01T00:00:00Z'),
      'Transaction date must be after 2020-01-01'
    ),
  category: z.string().min(1, { message: 'Category is required' }),
  medium: z.string().min(1, { message: 'Medium is required' }),
  trxId: z.string().optional(),
});

export const SalaryRecordValidatorSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  amount: z.number().nonnegative({ message: 'Amount is required' }),
  transactionDate: z
    .date()
    .min(
      new Date('2020-01-01T00:00:00Z'),
      'Transaction date must be after 2020-01-01'
    ),

  medium: z.string().min(1, { message: 'Medium is required' }),
  trxId: z.string().optional(),
});
