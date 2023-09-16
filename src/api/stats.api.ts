import { IStatsBetween } from '@/interfaces/stats.interface';
import { httpClient } from '@/utils/httpClient';

export class StatsApi {
  async getTotalCounts() {
    const res = await httpClient.get('/stats/total');
    return res.data;
  }

  async getBestSellers() {
    const res = await httpClient.get('/stats/top-packages');
    return res.data;
  }

  async getCountsBetween(data: IStatsBetween) {
    const res = await httpClient.post('/stats/between', data);
    return res.data;
  }

  async getMonthlyCountsBetween(data: IStatsBetween) {
    return await httpClient.post('/stats/monthly', data);
  }
}
