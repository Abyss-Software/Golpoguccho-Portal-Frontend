import { IPromoCode, IPromoDto } from '@/interfaces/promoCodes.interface';
import { IApiResponse } from '@/interfaces/response.interface';
import { httpClient } from '@/utils/httpClient';

export class PromoApi {
  async createPromo(data: IPromoDto) {
    const res = await httpClient.post<IApiResponse<IPromoDto>>(
      '/promo/create-promo',
      data
    );
    return res.data;
  }

  async getPromos() {
    const res = await httpClient.get<IApiResponse<IPromoCode[]>>('/promo');
    return res.data;
  }

  async getPromoByCode(code: string) {
    const res = await httpClient.get<IApiResponse<IPromoDto[]>>(
      `/promo/${code}`
    );
    return res.data;
  }

  async updatePromo(data: IPromoDto) {
    const res = await httpClient.patch<IApiResponse<IPromoDto>>(
      `/promo/${data.promoCode}`,
      data
    );
    return res.data;
  }

  async deletePromo(code: string) {
    const res = await httpClient.delete(`/promo/${code}`);
    return res.data;
  }
}
