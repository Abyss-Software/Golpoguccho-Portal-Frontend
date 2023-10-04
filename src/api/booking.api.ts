import { ICreateBooking } from '@/interfaces/createBooking.interface';
import { httpClient } from '@/utils/httpClient';

export class BookingApi {
  async calculatePayment(data: { packageIds: string[]; promoCode?: string }) {
    const res = await httpClient.post('/payment/calculate', data);
    return res.data;
  }

  async getAllBookings() {
    const res = await httpClient.get('/bookings');
    return res.data;
  }

  async getBookingById(id: string) {
    const res = await httpClient.get(`/bookings/${id}`);
    return res.data;
  }

  async getBookingByClientId(userId: string) {
    const res = await httpClient.get(`/bookings/client/${userId}`);
    return res.data;
  }

  async createBooking(data: ICreateBooking) {
    const res = await httpClient.post('/bookings/create-booking', data);
    return res.data;
  }

  async makeDuePayment(data: {
    bookingId: string;
    duePaymentMethod: string;
    dueTransactionId: string;
  }) {
    const res = await httpClient.patch('/bookings/due-payment', data);
    return res.data;
  }

  async changeStatus(data: { bookingId: string; status: string }) {
    const res = await httpClient.patch('/bookings/status', data);
    return res.data;
  }

  async setLink(data: { bookingId: string; link: string }) {
    const res = await httpClient.patch('/bookings/link', data);
    return res.data;
  }

  async giveFeedback(data: {
    bookingId: string;
    review: string;
    feedback: string;
  }) {
    const res = await httpClient.patch('/bookings/review', data);
    return res.data;
  }
}
