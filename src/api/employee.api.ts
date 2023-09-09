import { ICreateEmployee, IEmployees } from '@/interfaces/employees.interface';
import { IApiResponse } from '@/interfaces/response.interface';
import { httpClient } from '@/utils/httpClient';

export class EmployeeApi {
  async createEmployee(data: ICreateEmployee) {
    const res = await httpClient.post<IApiResponse<IEmployees>>(
      '/employee',
      data
    );
    return res.data.body;
  }

  async getEmployees() {
    const res = await httpClient.get<IApiResponse<IEmployees[]>>('/employee');
    return res.data.body;
  }

  async getEmployee(id: string) {
    const res = await httpClient.get<IApiResponse<IEmployees>>(
      `/employee/${id}`
    );
    return res.data.body;
  }

  async updateEmployee(data: { id: string } & ICreateEmployee) {
    const res = await httpClient.patch<IApiResponse<IEmployees>>(
      `/employee/${data.id}`,
      data
    );
    return res.data.body;
  }

  async deleteEmployee(id: string) {
    const res = await httpClient.delete(`/employee/${id}`);
    return res.data;
  }
}
