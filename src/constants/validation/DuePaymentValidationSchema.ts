import { z } from 'zod';

export const DuePaymentValidationSchema = z.object({
  duePaymentMethod: z.string().nonempty('Choose an option'),
  dueTransactionId: z.string().nonempty('Transaction ID cannot be empty'),
});
