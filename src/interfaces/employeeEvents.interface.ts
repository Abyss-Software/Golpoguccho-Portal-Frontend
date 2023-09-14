export interface Event {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  event_date: Date;
  start_time: string;
  end_time: string;
  venue: string;
  location: string;
  number_of_guests: number;
  day_or_evening: string;
  dhaka_or_outside: string;
  additional_info: string;
  category: Category;
  package: Category;
  assignedEmployees: IEmployeeEvent[];
}

export interface IEmployeeEvent {
  eventId: string;
  employeeId: string;
  position: string;
  payment: number;
  event: Event;
  employee?: Employee;
}

export interface Category {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  image: string;
  status: string;
  price?: number;
}

export interface Employee {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  avatar: null | string;
  position: string;
  contactPrimary: string;
  contactSecondary: string;
  address: string;
  verificationType: string;
  verificationId: string;
  baseSalary: number;
  monthlySalary: number;
  user: User;
}

export interface User {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  email: string;
  password: string;
  role: string;
  status: string;
}
