// src/types/auth.ts - Định nghĩa các interface và type cho authentication

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  vai_tro: number; // 0 là admin, 1 là giáo viên, 2 phụ huynh, 3 học sinh
  is_active: number;
  created_at: string;
  updated_at: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: {
    admin: User; // Server trả về "admin" thay vì "user"
    token: string;
    token_type: string;
  };
  errors?: {
    [key: string]: string[];
  };
}

export interface UserResponse {
  success: boolean;
  message: string;
  data: {
    admin: User;
  };
}

export interface LogoutResponse {
  success: boolean;
  message: string;
}

// Enum cho vai trò
export enum UserRole {
  ADMIN = 0,
  TEACHER = 1,
  PARENT = 2,
  STUDENT = 3
}

// Type cho vai trò
export type RoleType = 'Admin' | 'Giáo viên' | 'Phụ huynh' | 'Học sinh' | 'Không xác định';