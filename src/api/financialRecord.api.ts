import { IFinancialRecord } from '@/interfaces/financialRecord.interface';
import { IApiResponse } from '@/interfaces/response.interface';
import { IStatsBetween } from '@/interfaces/stats.interface';
import { httpClient } from '@/utils/httpClient';

export class RecordsApi {
  async createRecord(data: IFinancialRecord) {
    const res = await httpClient.post<IApiResponse<IFinancialRecord>>(
      '/finance/add-record',
      data
    );
    return res.data;
  }

  async getRecords() {
    const res = await httpClient.get<IApiResponse<IFinancialRecord[]>>(
      '/finance'
    );
    return res.data;
  }

  async getRecordsBetween(data: IStatsBetween) {
    const res = await httpClient.post('/finance/between', data);
    return res.data;
  }

  async deleteRecord(id: string) {
    const res = await httpClient.delete(`/finance/${id}`);
    return res.data;
  }
}
