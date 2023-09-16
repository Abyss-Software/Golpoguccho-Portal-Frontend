export interface IBookings {
  id: string;
  bookingTitle: string;
  fullName: string;
  contactPrimary: string;
  email: string;
  totalPayment: number;
  status: string;
  createdAt: Date;
}

export interface IDuePayment {
  duePaymentMethod: string;
  dueTransactionId: string;
}
