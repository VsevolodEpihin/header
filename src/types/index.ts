export type ModalType = 'login' | 'register';

interface User {
  name: string;
  email: string;
  password: string;
  [key: string]: any;
}

export interface LoginData {
  email: string,
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}
