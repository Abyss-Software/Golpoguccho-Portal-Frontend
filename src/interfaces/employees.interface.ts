export interface IEmployees {
  fullname: string;
  email: string;
  contactPrimary: string;
  position: string;
  role: string;
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

export const employeesColumns = [
  {
    name: 'Fullname',
    selector: (row: IEmployees) => row.fullname,
    sortable: false,
  },
  {
    name: 'Email',
    selector: (row: IEmployees) => row.email,
    sortable: true,
  },
  {
    name: 'Contact Primary',
    selector: (row: IEmployees) => row.contactPrimary,
    sortable: true,
  },
  {
    name: 'Position',
    selector: (row: IEmployees) => row.position,
    sortable: true,
  },
  {
    name: 'Role',
    selector: (row: IEmployees) => row.role,
    sortable: true,
  },
];
