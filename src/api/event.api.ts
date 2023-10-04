import { httpClient } from '@/utils/httpClient';

export class EventApi {
  async getAllEvents() {
    const res = await httpClient.get('/events');
    return res.data;
  }

  async getEventById(id: string) {
    const res = await httpClient.get(`/events/${id}`);
    return res.data;
  }

  async getEventByClientId(userId: string) {
    const res = await httpClient.get(`/events/client/${userId}`);
    return res.data;
  }

  async getEventByBookingId(bookingId: string) {
    const res = await httpClient.get(`/events/booking/${bookingId}`);
    return res.data;
  }

  async getEventByEmployeeId(employeeId: string) {
    const res = await httpClient.get(`/events/employee/${employeeId}`);
    return res.data;
  }

  async updateEventStatus() {
    const res = await httpClient.post('/events/update-status');
    return res.data;
  }

  async assignEmployees(data: { eventId: string; status: string }) {
    const res = await httpClient.post('/events/assign-employees', data);
    return res.data;
  }
}
