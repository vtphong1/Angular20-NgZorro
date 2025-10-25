export interface IPagination {
  page: number;
  size: number;
  total: number
  pageIndex?: number
}

export interface IResponse<T> {
  code: string,
  data: T,
  message: string
}
