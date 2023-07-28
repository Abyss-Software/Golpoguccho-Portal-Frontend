export interface IEmployees {
  fullname: string;
  email: string;
  contactPrimary: string;
  position: string;
  role: string;
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
