import { httpClient } from '@/utils/httpClient';

export class BookingApi {
  async calculatePayment(data: { packageIds: string[]; promoCode?: string }) {
    const res = await httpClient.post('/payment/calculate', data);
    return res.data;
  }
}
