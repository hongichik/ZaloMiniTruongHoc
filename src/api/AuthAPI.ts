// AuthAPI.ts - API cho xác thực người dùng trong sổ tay điện tử

import type { 
  LoginRequest, 
  RegisterRequest, 
  User, 
  AuthResponse, 
  UserResponse, 
  LogoutResponse 
} from '@/types/auth';
import { StorageUtils } from '@/utils/storage';
import { RoleUtils } from '@/utils/role';
import { ApiUtils, API_ENDPOINTS } from '@/utils/api';

class AuthAPI {
  /**
   * Lấy thông tin user từ localStorage
   */
  public getStoredUser(): User | null {
    return StorageUtils.getUser();
  }

  /**
   * Lấy tên vai trò từ mã số
   */
  public getRoleName(vai_tro: number): string {
    return RoleUtils.getRoleName(vai_tro);
  }

  /**
   * Kiểm tra vai trò của user hiện tại
   */
  public getCurrentUserRole(): string | null {
    const user = this.getStoredUser();
    return user ? this.getRoleName(user.vai_tro) : null;
  }

  /**
   * Kiểm tra user có phải là admin không
   */
  public isAdmin(): boolean {
    return RoleUtils.isAdmin(this.getStoredUser());
  }

  /**
   * Kiểm tra user có phải là học sinh không
   */
  public isStudent(): boolean {
    return RoleUtils.isStudent(this.getStoredUser());
  }

  /**
   * Kiểm tra xem user đã đăng nhập chưa
   */
  isAuthenticated(): boolean {
    return StorageUtils.hasToken();
  }

  /**
   * Đăng nhập người dùng
   */
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(ApiUtils.getFullURL(API_ENDPOINTS.AUTH.LOGIN), {
        method: 'POST',
        headers: ApiUtils.createHeaders(),
        body: JSON.stringify(credentials),
      });

      const data = await ApiUtils.handleResponse<AuthResponse>(response);
      
      console.log('📋 Login response data:', data);

      if (data.success && data.data?.token) {
        console.log('🔐 Saving token:', data.data.token);
        console.log('👤 Saving user:', data.data.admin);
        
        // Lưu token và thông tin user vào localStorage
        StorageUtils.setToken(data.data.token);
        StorageUtils.setUser(data.data.admin);
        
        // Verify token đã được lưu
        const savedToken = StorageUtils.getToken();
        console.log('✅ Token saved successfully:', savedToken ? 'YES' : 'NO');
      } else {
        console.log('❌ Login failed or no token in response:', data);
      }

      return data;
    } catch (error) {
      console.log('💥 Lỗi trong AuthAPI.login:', error);
      return ApiUtils.handleError(error, 'Lỗi kết nối đến server');
    }
  }

  /**
   * Đăng ký tài khoản mới
   */
  async register(userData: RegisterRequest): Promise<AuthResponse> {
    try {
      const response = await fetch(ApiUtils.getFullURL(API_ENDPOINTS.AUTH.REGISTER), {
        method: 'POST',
        headers: ApiUtils.createHeaders(),
        body: JSON.stringify(userData),
      });

      const data = await ApiUtils.handleResponse<AuthResponse>(response);

      if (data.success && data.data.token) {
        // Lưu token và thông tin user vào localStorage
        StorageUtils.setToken(data.data.token);
        StorageUtils.setUser(data.data.admin);
      }

      return data;
    } catch (error) {
      return ApiUtils.handleError(error, 'Lỗi kết nối đến server');
    }
  }

  /**
   * Lấy thông tin user hiện tại
   */
  async getCurrentUser(): Promise<UserResponse> {
    try {
      const response = await fetch(ApiUtils.getFullURL(API_ENDPOINTS.AUTH.USER), {
        method: 'GET',
        headers: ApiUtils.createHeaders(true),
      });

      const data = await ApiUtils.handleResponse<UserResponse>(response);

      if (data.success) {
        // Cập nhật thông tin user trong localStorage
        StorageUtils.setUser(data.data.admin);
      }

      return data;
    } catch (error) {
      return ApiUtils.handleError(error, 'Lỗi kết nối đến server');
    }
  }

  /**
   * Đăng xuất
   */
  async logout(): Promise<LogoutResponse> {
    try {
      const response = await fetch(ApiUtils.getFullURL(API_ENDPOINTS.AUTH.LOGOUT), {
        method: 'POST',
        headers: ApiUtils.createHeaders(true),
      });

      const data = await ApiUtils.handleResponse<LogoutResponse>(response);

      // Xóa token và user khỏi localStorage bất kể kết quả API
      StorageUtils.clearAuth();

      return data;
    } catch (error) {
      // Vẫn xóa token local nếu có lỗi
      StorageUtils.clearAuth();
      return ApiUtils.handleError(error, 'Lỗi kết nối đến server');
    }
  }



  /**
   * Truy cập route được bảo vệ (legacy endpoint)
   */
  async getProtectedUserData(): Promise<UserResponse> {
    try {
      const response = await fetch(ApiUtils.getFullURL(API_ENDPOINTS.USER), {
        method: 'GET',
        headers: ApiUtils.createHeaders(true),
      });

      const data = await ApiUtils.handleResponse<UserResponse>(response);
      return data;
    } catch (error) {
      return ApiUtils.handleError(error, 'Lỗi kết nối đến server');
    }
  }

  /**
   * Làm mới token (nếu API hỗ trợ)
   */
  async refreshToken(): Promise<AuthResponse> {
    try {
      const response = await fetch(ApiUtils.getFullURL(API_ENDPOINTS.AUTH.REFRESH), {
        method: 'POST',
        headers: ApiUtils.createHeaders(true),
      });

      const data = await ApiUtils.handleResponse<AuthResponse>(response);

      if (data.success && data.data.token) {
        StorageUtils.setToken(data.data.token);
        StorageUtils.setUser(data.data.admin);
      }

      return data;
    } catch (error) {
      return ApiUtils.handleError(error, 'Lỗi làm mới token');
    }
  }
}

// Export singleton instance
const authAPI = new AuthAPI();
export default authAPI;

// Export types for use in components
export type { LoginRequest, RegisterRequest, User, AuthResponse, UserResponse, LogoutResponse };