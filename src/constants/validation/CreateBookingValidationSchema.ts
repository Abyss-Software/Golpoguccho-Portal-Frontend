import { z } from 'zod';

export const CreateBookingValidationSchema = z.object({
  bookingTitle: z.string().min(1, 'Booking Title cannot be empty'),
  fullName: z.string().min(1, 'Full name cannot be empty'),
  email: z.string().email(),
  contactPrimary: z
    .string()
    .refine((val) => val.length >= 3 && val.length <= 20, {
      message: 'Contact number must be within 3 to 20 digits',
    }),
  contactSecondary: z
    .string()
    .refine((val) => val.length >= 3 && val.length <= 20, {
      message: 'Contact number must be within 3 to 20 digits',
    }),
  address: z.string().min(1, 'Address cannot be empty'),
  city: z.string().min(1, 'City cannot be empty'),
  events: z.array(
    z.object({
      eventTypeId: z.string().min(1, 'Event type ID cannot be empty'),
      packageId: z.string().min(1, 'Package ID cannot be empty'),
      eventTitle: z.string().min(1, 'Event title cannot be empty'),
      eventDate: z.date().min(new Date(), 'Event date must be in the future'),
      eventTime: z.string().min(1, 'Event time cannot be empty'),
      eventEndTime: z.string().min(1, 'Event end time cannot be empty'),
      dayOrEvening: z.string().min(1, 'Choose an option'),
      dhakaOrOutside: z.string().min(1, 'Choose an option'),
      numberOfGuests: z.number().min(1, 'Number of guests must be at least 1'),
      eventVenue: z.string().min(1, 'Event venue cannot be empty'),
      eventVenueAddress: z
        .string()
        .min(1, 'Event venue address cannot be empty'),
      additionalInfo: z.string().optional(),
    })
  ),
  acceptedTerms: z.boolean().refine((val) => val, {
    message: 'You must accept the terms and conditions',
  }),
  totalPayment: z.number().min(0).max(1000000),
  advancePaymentMethod: z.string().min(1, 'Choose an option'),
  advancePayment: z.number().min(0).max(1000000),
  advanceTransactionId: z.string().min(1, 'Transaction ID cannot be empty'),
  duePayment: z.number().min(0).max(1000000),
  promoCode: z.string().optional(),
});
