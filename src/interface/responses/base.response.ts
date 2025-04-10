export interface BaseRes {
  status: string;
  message: string;
  data: unknown;
}

export interface PaginationRes {
  currentPage: number | null;
  totalPages: number | null;
  totalData: number | null;
  limit: number | null;
}

export interface BaseErrorRes {
  status: string;
  message: string;
  error: unknown;
}
