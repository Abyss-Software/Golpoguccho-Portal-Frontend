import { httpClient } from '@/utils/httpClient';

export class EventTypeApi {
  async createEventType(data: {
    title: string;
    description: string;
    image: string;
  }) {
    const res = await httpClient.post('/packages/create-category', data);
    return res.data;
  }

  async getEventTypes() {
    const res = await httpClient.get('/packages/categories');
    return res.data;
  }

  async getEventTypeById(id: string) {
    const res = await httpClient.get('/packages/categories/' + id);
    return res.data;
  }

  async updateEventType(data: {
    id: string;
    title: string;
    description: string;
    image: string;
  }) {
    const res = await httpClient.patch(`/packages/category/${data.id}`, data);
    return res.data;
  }

  async deleteEventType(id: string) {
    const res = await httpClient.delete(`/packages/category/${id}`);
    return res.data;
  }
}
