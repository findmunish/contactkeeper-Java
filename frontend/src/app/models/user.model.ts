export interface User {
  id: string;
  name: string;
  email: string;
  date: string;
}

export interface AuthResponse {
  token: string;
  email: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}
