export interface IProfile {
  id?: number;
  fullname: string;
  email: string;
  contactPrimary: string;
  contactSecondary: string;
  address: string;
  image: File;
  position: string; //
  role: string; //
  verificationType: string; //
  verificationId: string; //
  baseSalary: number; // not shown
  monthlySalary: number; // not shown
}
