import { z } from "zod";

export const CreateBookingValidationSchema = z.object({
  fullName: z.string().nonempty("Full name cannot be empty"),
  email: z.string().email(),
  contactPrimary: z
    .string()
    .refine((val) => val.length >= 3 && val.length <= 20, {
      message: "Contact number must be within 3 to 20 digits",
    }),
  contactSecondary: z
    .string()
    .refine((val) => val.length >= 3 && val.length <= 20, {
      message: "Contact number must be within 3 to 20 digits",
    }),
  address: z.string().nonempty("Address cannot be empty"),
  city: z.string().nonempty("City cannot be empty"),
  events: z.array(
    z.object({
      eventTypeId: z.string().nonempty("Event type ID cannot be empty"),
      packageId: z.string().nonempty("Package ID cannot be empty"),
      eventTitle: z.string().nonempty("Event title cannot be empty"),
      eventDate: z.date().min(new Date(), "Event date must be in the future"),
      eventTime: z.string().nonempty("Event time cannot be empty"),
      eventEndTime: z.string().nonempty("Event end time cannot be empty"),
      dayOrEvening: z.string().nonempty("Choose an option"),
      dhakaOrOutside: z.string().nonempty("Choose an option"),
      numberOfGuests: z.string().refine((val) => parseInt(val) > 0, {
        message: "Number of guests must be greater than 0",
      }),
      eventVenue: z.string().nonempty("Event venue cannot be empty"),
      eventVenueAddress: z
        .string()
        .nonempty("Event venue address cannot be empty"),
      additionalInfo: z.string().optional(),
    })
  ),
  totalPayment: z.number().min(1).max(1000000),
  advancePayment: z.number().min(1).max(1000000),
  duePayment: z.number().min(1).max(1000000),
});
