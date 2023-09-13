export interface IAssignEmployee {
  employeeId: string;
  position: string;
  payment: number;
}

export interface IAssignEmployeesDto {
  eventId: string;
  assignedEmployees: IAssignEmployee[];
}
