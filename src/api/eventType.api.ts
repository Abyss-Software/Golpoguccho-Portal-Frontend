import { IApiResponse } from "@/interfaces/response.interface";
import { IEventType } from "@/interfaces/packages.interface";
import { httpClient } from "@/utils/httpClient";

export class EventTypeApi {
  async createEventType(data: {
    title: string;
    description: string;
    image: string;
  }) {
    const res = await httpClient.post<IApiResponse<IEventType>>(
      "/packages/create-category",
      data
    );
    return res.data.body;
  }

  async getEventTypes() {
    const res = await httpClient.get<IApiResponse<IEventType[]>>(
      "/packages/categories"
    );
    return res.data.body;
  }

  async getEventTypeById(id: string) {
    const res = await httpClient.get<IApiResponse<IEventType>>(
      "/packages/categories/" + id
    );
    return res.data.body;
  }

  async updateEventType(data: {
    id: string;
    title: string;
    description: string;
    image: string;
  }) {
    const res = await httpClient.patch<IApiResponse<IEventType>>(
      `/packages/category/${data.id}`,
      data
    );
    return res.data.body;
  }

  async deleteEventType(id: string) {
    const res = await httpClient.delete(`/packages/category/${id}`);
    return res.data;
  }
}
