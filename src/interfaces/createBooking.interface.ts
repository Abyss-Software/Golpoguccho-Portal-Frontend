export interface ICreateBooking {
  clientId: string;
  bookingTitle: string;
  fullName: string;
  email: string;
  contactPrimary: string;
  contactSecondary: string;
  address: string;
  city: string;
  events: IEvents[];
  totalPayment: number;
  advancePayment: number;
  advancePaymentMethod: string;
  advanceTransactionId: string;
  duePayment: number;
  promoCode?: string;
}

export interface IEvents {
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
