export interface IResponse<T> {
  data: T;
  error: boolean;
  message: string;
}
