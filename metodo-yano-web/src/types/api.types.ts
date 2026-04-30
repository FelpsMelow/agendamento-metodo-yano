export interface ApiResponse<T> {
  success: boolean;
  timestamp: string;
  data: T;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
}
