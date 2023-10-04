import { IApiResponse } from "@/interfaces/response.interface";
import { IPackage } from "@/interfaces/packages.interface";
import { httpClient } from "@/utils/httpClient";

export class PackageApi {
  async createPackage(
    eventTypeId: string,
    data: {
      title: string;
      description: string;
      price: number;
      image?: string;
    }
  ) {
    const res = await httpClient.post<IApiResponse<IPackage>>(
      "/packages/create-package",
      {
        ...data,
        categoryId: eventTypeId,
      }
    );
    return res.data;
  }

  async getPackages() {
    const res = await httpClient.get<IApiResponse<IPackage[]>>("/packages");
    return res.data;
  }

  async updatePackage(data: {
    id: string;
    title: string;
    description: string;
    price: number;
    image?: string;
  }) {
    const res = await httpClient.patch<IApiResponse<IPackage>>(
      `/packages/${data.id}`,
      data
    );
    return res.data;
  }

  async deletePackage(id: string) {
    const res = await httpClient.delete(`/packages/${id}`);
    return res.data;
  }
}
