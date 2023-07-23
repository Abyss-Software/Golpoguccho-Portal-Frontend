export interface ICreateBooking {
  fullName: string;
  email: string;
  contactPrimary: string;
  contactSecondary: string;
  address: string;
  city: string;
  events: Events[];
  totalPayment: number;
  advancePayment?: number;
  duePayment?: number;
}

export interface Events {
  eventTypeId: string;
  packageId: string;
  eventTitle: string;
  eventDate: Date;
  eventTime: string;
  eventEndTime: string;
  dayOrEvening: string;
  dhakaOrOutside: string;
  numberOfGuests: number;
  eventVenue: string;
  eventVenueAddress: string;
  additionalInfo?: string;
}
