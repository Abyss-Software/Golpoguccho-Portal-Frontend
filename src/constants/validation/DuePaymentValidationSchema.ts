import { z } from 'zod';

export const DuePaymentValidationSchema = z.object({
  duePaymentMethod: z.string().min(1, 'Choose an option'),
  dueTransactionId: z.string().min(1, 'Transaction ID cannot be empty'),
});
