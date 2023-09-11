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
}
