export interface TMessageJSON {
  id: string;
  text: string;
  isUser: boolean;
  timestamp?: string;
  userId?: string;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
} 