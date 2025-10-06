// src/utils/api.ts - Tiện ích cho API config và helper functions

export class ApiUtils {
  static readonly BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  static readonly API_PREFIX = import.meta.env.VITE_API_PREFIX || '/api';

  /**
   * Tạo URL đầy đủ cho endpoint
   */
  static getFullURL(endpoint: string): string {
    return `${this.BASE_URL}${this.API_PREFIX}${endpoint}`;
  }

  /**
   * Tạo headers cho request
   */
  static createHeaders(includeAuth: boolean = false, token?: string): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (includeAuth) {
      // Sử dụng token được truyền vào, hoặc lấy từ localStorage
      const authToken = token || (typeof window !== 'undefined' ? localStorage.getItem('student_app_token') : null);
      
      if (authToken) {
        headers['Authorization'] = `Bearer ${authToken}`;
      } else {
        console.warn('⚠️ includeAuth=true but no token available');
      }
    }
    
    return headers;
  }

  /**
   * Xử lý response từ API
   */
  static async handleResponse<T>(response: Response): Promise<T> {
    const data = await response.json();
    
    // Nếu response không OK nhưng có dữ liệu JSON (như validation errors)
    if (!response.ok) {
      // Nếu là lỗi validation (422) hoặc có structured error, trả về data
      if (response.status === 422 || data.errors) {
        return data as T;
      }
      // Nếu là lỗi khác, throw error
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return data;
  }

  /**
   * Xử lý lỗi API
   */
  static handleError(error: unknown, defaultMessage: string): any {
    console.error('API error:', error);
    return {
      success: false,
      message: defaultMessage,
      errors: {}
    };
  }
}

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    USER: '/auth/user',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
  },
  USER: '/user',
} as const;