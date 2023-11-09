export interface IEvent {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  event_date: Date;
  start_time: string;
  end_time: string;
  venue: string;
  location: string;
  number_of_guests: number;
  day_or_evening: string;
  dhaka_or_outside: string;
  additional_info: string;
  status: string;
  booking: Booking;
  category: Category;
  package: Package;
  assignedEmployees: any[];
}

export interface Booking {
  id: string;
  createdAt: string;
  updatedAt: string;
  bookingTitle: string;
  fullName: string;
  email: string;
  contactPrimary: string;
  contactSecondary: string;
  address: string;
  city: string;
  status: string;
  images: any;
  additionalInfo: any;
  feedback: any;
  review: any;
  promoCode: string;
  totalPayment: number;
  advancePayment: number;
  advancePaymentMethod: string;
  advancePaymentDate: string;
  advanceTransactionId: string;
  duePayment: number;
  duePaymentMethod: any;
  duePaymentDate: any;
  dueTransactionId: any;
}

export interface Category {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  description: string;
  image: string;
  status: string;
}

export interface Package {
  id: string;
  createdAt: string;
  updatedAt: string;
  title: string;
  price: number;
  description: string;
  image: string;
  status: string;
}
