import { httpClient } from '@/utils/httpClient';

export class PackageApi {
  async createPackage(data: {
    title: string;
    description: string;
    price: number;
    image: string;
  }) {
    const res = await httpClient.post('/packages/create-package', data);
    return res.data;
  }

  async getPackages() {
    const res = await httpClient.get('/packages');
    return res.data;
  }

  async updatePackage(data: {
    id: string;
    title: string;
    description: string;
    price: number;
    image: string;
  }) {
    const res = await httpClient.patch(`/packages/${data.id}`, data);
    return res.data;
  }

  async deletePackage(id: string) {
    const res = await httpClient.delete(`/packages/category/${id}`);
    return res.data;
  }
}
