export interface Response<T> {
  data: T;
  success?: boolean;
  error?: string;
}
