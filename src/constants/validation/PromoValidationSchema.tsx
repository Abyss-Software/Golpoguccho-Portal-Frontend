import { z } from 'zod';

export const PromoValidationSchema = z.object({
  promoCode: z.string().nonempty({ message: 'Promo is required' }),
  description: z.string().nonempty({ message: 'Description is required' }),

  maxUse: z.number().min(1, { message: 'Max Usage must be greater than 0' }),
  discountPercentage: z
    .number()
    .min(1, { message: 'Discount Percentage must be greater than 0' }),
  maxDiscount: z
    .number()
    .min(1, { message: 'Max Discount must be greater than 0' }),
  expiryDate: z.date().min(new Date(), 'Event date must be in the future'),
  status: z.string().nonempty({ message: 'Status is required' }),
});
