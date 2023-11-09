import { z } from 'zod';

export const EventTypeCreateValidatorSchema = z.object({
  title: z.string().min(1, { message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  image: z.string().min(1, { message: 'Event Type Image is required' }),
});
