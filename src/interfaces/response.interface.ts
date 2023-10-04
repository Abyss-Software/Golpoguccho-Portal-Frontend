export interface IApiResponse<T> {
  statusCode: number;
  isSuccess: boolean;
  message: string;
  body: T;
}
