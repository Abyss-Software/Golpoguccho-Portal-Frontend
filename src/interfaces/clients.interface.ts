export interface IClient {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  createdAt: Date;
  bookings: any;
}
