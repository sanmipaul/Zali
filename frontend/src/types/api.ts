export interface ApiErrorDetails {
  code: string;
  message: string;
  details?: any;
}

export interface ApiSuccessResponse<T> {
  success: true;
  data: T;
  requestId?: string;
  timestamp?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: ApiErrorDetails;
  requestId?: string;
  timestamp?: string;
}

export type ApiResponse<T> = ApiSuccessResponse<T> | ApiErrorResponse;

export interface ApiRequestMetadata {
  requestId?: string;
  timestamp?: string;
  userId?: string;
  userAgent?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiError extends Error {
  statusCode?: number;
  code?: string;
  details?: any;
}
