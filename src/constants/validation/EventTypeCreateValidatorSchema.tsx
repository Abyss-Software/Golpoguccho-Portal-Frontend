import { z } from 'zod';

export const EventTypeCreateValidatorSchema = z.object({
  title: z.string().nonempty({ message: 'Title is required' }),
  description: z.string().nonempty({ message: 'Description is required' }),
  image: z.string().nonempty({ message: 'Event Type Image is required' }),
});
