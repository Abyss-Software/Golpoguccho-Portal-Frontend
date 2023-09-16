import {
  ICreateEmployee,
  IEmployee,
  IUpdateEmployee,
  IUpdateProfile,
} from '@/interfaces/employees.interface';
import { IApiResponse } from '@/interfaces/response.interface';
import { httpClient } from '@/utils/httpClient';

export class EmployeeApi {
  async createEmployee(data: ICreateEmployee) {
    const res = await httpClient.post<IApiResponse<IEmployee>>(
      '/employees/create-employee',
      data
    );
    return res.data.body;
  }

  async getEmployees() {
    const res = await httpClient.get<IApiResponse<IEmployee[]>>('/employees');
    return res.data.body;
  }

  async getEmployee(id: string) {
    const res = await httpClient.get<IApiResponse<IEmployee>>(
      `/employees/${id}`
    );
    return res.data.body;
  }

  async updateEmployee(data: IUpdateEmployee) {
    const res = await httpClient.patch<IApiResponse<IEmployee>>(
      `/employees/${data.id}`,
      data
    );
    return res.data.body;
  }

  async updateProfile(data: IUpdateProfile) {
    const res = await httpClient.patch<IApiResponse<IEmployee>>(
      `/employees/profile/${data.id}`,
      data
    );
    return res.data.body;
  }

  async deleteEmployee(id: string) {
    const res = await httpClient.delete(`/employees/${id}`);
    return res.data;
  }
}
