// src/utils/role.ts - Tiện ích để xử lý vai trò người dùng

import type { User, RoleType } from '@/types/auth';
import { UserRole } from '@/types/auth';

export class RoleUtils {
  /**
   * Lấy tên vai trò từ mã số
   */
  static getRoleName(vai_tro: number): RoleType {
    switch (vai_tro) {
      case UserRole.ADMIN: 
        return 'Admin';
      case UserRole.TEACHER: 
        return 'Giáo viên';
      case UserRole.PARENT: 
        return 'Phụ huynh';
      case UserRole.STUDENT: 
        return 'Học sinh';
      default: 
        return 'Không xác định';
    }
  }

  /**
   * Kiểm tra user có phải là admin không
   */
  static isAdmin(user: User | null): boolean {
    return user?.vai_tro === UserRole.ADMIN;
  }

  /**
   * Kiểm tra user có phải là giáo viên không
   */
  static isTeacher(user: User | null): boolean {
    return user?.vai_tro === UserRole.TEACHER;
  }

  /**
   * Kiểm tra user có phải là phụ huynh không
   */
  static isParent(user: User | null): boolean {
    return user?.vai_tro === UserRole.PARENT;
  }

  /**
   * Kiểm tra user có phải là học sinh không
   */
  static isStudent(user: User | null): boolean {
    return user?.vai_tro === UserRole.STUDENT;
  }

  /**
   * Lấy màu sắc cho vai trò (để hiển thị UI)
   */
  static getRoleColor(vai_tro: number): string {
    switch (vai_tro) {
      case UserRole.ADMIN: 
        return '#dc2626'; // red-600
      case UserRole.TEACHER: 
        return '#059669'; // emerald-600
      case UserRole.PARENT: 
        return '#2563eb'; // blue-600
      case UserRole.STUDENT: 
        return '#7c3aed'; // violet-600
      default: 
        return '#6b7280'; // gray-500
    }
  }

  /**
   * Lấy icon cho vai trò
   */
  static getRoleIcon(vai_tro: number): string {
    switch (vai_tro) {
      case UserRole.ADMIN: 
        return '👑';
      case UserRole.TEACHER: 
        return '👨‍🏫';
      case UserRole.PARENT: 
        return '👨‍👩‍👧‍👦';
      case UserRole.STUDENT: 
        return '👨‍🎓';
      default: 
        return '👤';
    }
  }
}