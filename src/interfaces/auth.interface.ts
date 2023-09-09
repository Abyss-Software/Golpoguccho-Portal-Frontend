export interface ILogin {
  email: string;
  password: string;
  rememberMe: boolean;
  isEmployee?: boolean;
}
export interface ISignup {
  name: string;
  email: string;
  password: string;
}
