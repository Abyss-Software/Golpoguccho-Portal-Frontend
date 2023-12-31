export interface ILogin {
  email: string;
  password: string;
  rememberMe: boolean;
}
export interface ISignup {
  name: string;
  email: string;
  password: string;
}

export interface ISocialLogin {
  email: string;
  name: string;
}
