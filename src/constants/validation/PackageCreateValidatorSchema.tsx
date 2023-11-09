import { z } from 'zod';

export const PackageCreateValidatorSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  image: z.string().min(1, { message: 'Image is required' }),
  price: z.number().min(1, { message: 'Price must be greater than 0' }),
});
