export interface IEmployee {
  id: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
  };
  contactPrimary: string;
  contactSecondary?: string;
  position: string;
  address: string;
  verificationType: string;
  verificationId: string;
  baseSalary?: number;
  monthlySalary?: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface ICreateEmployee {
  name: string;
  email: string;
  password: string;
  contactPrimary: string;
  contactSecondary?: string;
  address: string;
  position: string;
  role: string;
  verificationType: string;
  verificationId: string;
  baseSalary?: number;
  monthlySalary?: number;
}

export interface IUpdateEmployee {
  id: string;
  name: string;
  email: string;
  contactPrimary: string;
  contactSecondary?: string;
  address: string;
  position: string;
  role: string;
  verificationType: string;
  verificationId: string;
  baseSalary?: number;
  monthlySalary?: number;
}

export interface IUpdateProfile {
  id: string;
  name: string;
  email: string;
  contactPrimary: string;
  contactSecondary?: string;
  address: string;
}
