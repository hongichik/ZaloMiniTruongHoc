// src/utils/storage.ts - Tiện ích để quản lý localStorage

import type { User } from '@/types/auth';

export class StorageUtils {
  private static readonly TOKEN_KEY = 'student_app_token';
  private static readonly USER_KEY = 'student_app_user';

  /**
   * Lưu token vào localStorage
   */
  static setToken(token: string): void {
    console.log('💾 StorageUtils.setToken called with:', token);
    localStorage.setItem(this.TOKEN_KEY, token);
    console.log('💾 Token stored successfully');
  }

  /**
   * Lấy token từ localStorage
   */
  static getToken(): string | null {
    const token = localStorage.getItem(this.TOKEN_KEY);
    console.log('🔍 StorageUtils.getToken:', token ? `Found token: ${token.substring(0, 20)}...` : 'No token found');
    return token;
  }

  /**
   * Xóa token khỏi localStorage
   */
  static removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  /**
   * Lưu thông tin user vào localStorage
   */
  static setUser(user: User): void {
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  /**
   * Lấy thông tin user từ localStorage
   */
  static getUser(): User | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Xóa thông tin user khỏi localStorage
   */
  static removeUser(): void {
    localStorage.removeItem(this.USER_KEY);
  }

  /**
   * Xóa tất cả dữ liệu auth khỏi localStorage
   */
  static clearAuth(): void {
    this.removeToken();
    this.removeUser();
  }

  /**
   * Kiểm tra có token không
   */
  static hasToken(): boolean {
    return !!this.getToken();
  }
}