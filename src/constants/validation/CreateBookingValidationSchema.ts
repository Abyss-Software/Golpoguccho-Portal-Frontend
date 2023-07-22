import * as z from 'zod';

export const CreateBookingValidationSchema = z.object({
  fullName: z.string().min(3).max(255),
  email: z.string().email(),
  contactPrimary: z.string().min(3).max(20),
  contactSecondary: z.string().min(3).max(20),
  address: z.string().min(3).max(255),
  city: z.string().min(3).max(255),
  events: z.array(
    z.object({
      eventTypeId: z.string().min(3).max(255),
      packageId: z.string().min(3).max(255),
      eventTitle: z.string().min(3).max(255),
      eventDate: z.string().min(3).max(255),
      eventTime: z.string().min(3).max(255),
      eventEndTime: z.string().min(3).max(255),
      dayOrEvening: z.string().min(3).max(255),
      dhakaOrOutside: z.string().min(3).max(255),
      numberOfGuests: z.number().min(1).max(1000),
      eventVenue: z.string().min(3).max(255),
      venueAddress: z.string().min(3).max(255),
      additionalInfo: z.string().min(3).max(255),
    })
  ),
  totalPayment: z.number().min(1).max(1000000),
  advancePayment: z.number().min(1).max(1000000),
  duePayment: z.number().min(1).max(1000000),
});
