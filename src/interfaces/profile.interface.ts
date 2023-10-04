export interface IEmployeeProfile {
  id: string;
  name: string;
  email: string;
  contactPrimary: string;
  contactSecondary: string;
  address: string;
  avatar?: File | string;
}
