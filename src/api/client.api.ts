import { IClient } from '@/interfaces/clients.interface';
import { IApiResponse } from '@/interfaces/response.interface';
import { httpClient } from '@/utils/httpClient';

export class ClientApi {
  async getClients() {
    const res = await httpClient.get<IApiResponse<IClient[]>>('/users/clients');
    return res.data.body;
  }

  async deleteClient(id: string) {
    const res = await httpClient.delete(`/users/${id}`);
    return res.data;
  }
}
