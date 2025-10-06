// ScheduleAPI.ts - API để lấy dữ liệu thời khóa biểu

import type { 
  ScheduleResponse, 
  ThuHoc, 
  TietHoc,
  UserInfo, 
  GiaoVien, 
  ScheduleFilters, 
  AllSchedulesResponse,
  TeachersResponse,
  SubjectsResponse,
  ClassesResponse,
  TeacherInfo,
  SubjectInfo,
  ClassInfo
} from '@/types/schedule';
import { ApiUtils } from '@/utils/api';

class ScheduleAPI {

  /**
   * Lấy tất cả lịch học với các filter parameters
   * @param filters - Các tham số filter
   */
  async getAllSchedules(filters: ScheduleFilters = {}): Promise<AllSchedulesResponse> {
    try {
      console.log('📅 Đang tải tất cả lịch học với filters:', filters);
      
      // Build query string
      const queryParams = new URLSearchParams();
      
      // Add single value parameters
      if (filters.lop_id) queryParams.append('lop_id', filters.lop_id.toString());
      if (filters.ten_lop) queryParams.append('ten_lop', filters.ten_lop);
      if (filters.khoi) queryParams.append('khoi', filters.khoi.toString());
      if (filters.giao_vien_id) queryParams.append('giao_vien_id', filters.giao_vien_id.toString());
      if (filters.ten_giao_vien) queryParams.append('ten_giao_vien', filters.ten_giao_vien);
      if (filters.mon_hoc_id) queryParams.append('mon_hoc_id', filters.mon_hoc_id.toString());
      if (filters.ten_mon_hoc) queryParams.append('ten_mon_hoc', filters.ten_mon_hoc);
      if (filters.ca_hoc) queryParams.append('ca_hoc', filters.ca_hoc);
      if (filters.nam_hoc) queryParams.append('nam_hoc', filters.nam_hoc);
      if (filters.hoc_ky) queryParams.append('hoc_ky', filters.hoc_ky.toString());
      if (filters.phong_hoc) queryParams.append('phong_hoc', filters.phong_hoc);
      if (filters.page) queryParams.append('page', filters.page.toString());
      if (filters.per_page) queryParams.append('per_page', filters.per_page.toString());
      if (filters.sort_by) queryParams.append('sort_by', filters.sort_by);
      if (filters.sort_order) queryParams.append('sort_order', filters.sort_order);
      
      // Add array parameters
      if (filters.thu && filters.thu.length > 0) {
        filters.thu.forEach(thu => queryParams.append('thu[]', thu.toString()));
      }
      if (filters.tiet && filters.tiet.length > 0) {
        filters.tiet.forEach(tiet => queryParams.append('tiet[]', tiet.toString()));
      }
      
      const queryString = queryParams.toString();
      const url = `/thoi-khoa-bieu/all-schedules${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(ApiUtils.getFullURL(url), {
        method: 'GET',
        headers: ApiUtils.createHeaders(true),
      });

      const data = await ApiUtils.handleResponse<AllSchedulesResponse>(response);
      
      console.log('📊 Dữ liệu tất cả lịch học:', data);
      
      return data;
    } catch (error) {
      console.error('💥 Lỗi tải tất cả lịch học:', error);
      return ApiUtils.handleError(error, 'Lỗi kết nối khi tải danh sách lịch học');
    }
  }

  /**
   * Helper method: Tìm kiếm lịch học theo lớp
   * @param lopId - ID của lớp
   * @param tenLop - Tên lớp (optional)
   */
  async getSchedulesByClass(lopId: number, tenLop?: string): Promise<AllSchedulesResponse> {
    return this.getAllSchedules({
      lop_id: lopId,
      ten_lop: tenLop,
      page: 1,
      per_page: 50,
      sort_by: 'thu',
      sort_order: 'asc'
    });
  }

  /**
   * Helper method: Tìm kiếm lịch học theo giáo viên
   * @param giaoVienId - ID của giáo viên
   * @param tenGiaoVien - Tên giáo viên (optional)
   */
  async getSchedulesByTeacher(giaoVienId: number, tenGiaoVien?: string): Promise<AllSchedulesResponse> {
    return this.getAllSchedules({
      giao_vien_id: giaoVienId,
      ten_giao_vien: tenGiaoVien,
      page: 1,
      per_page: 50,
      sort_by: 'thu',
      sort_order: 'asc'
    });
  }

  /**
   * Helper method: Tìm kiếm lịch học theo môn học
   * @param monHocId - ID của môn học
   * @param tenMonHoc - Tên môn học (optional)
   */
  async getSchedulesBySubject(monHocId: number, tenMonHoc?: string): Promise<AllSchedulesResponse> {
    return this.getAllSchedules({
      mon_hoc_id: monHocId,
      ten_mon_hoc: tenMonHoc,
      page: 1,
      per_page: 50,
      sort_by: 'thu',
      sort_order: 'asc'
    });
  }

  /**
   * Tìm kiếm danh sách giáo viên
   * @param search - Tên giáo viên để tìm kiếm
   * @param page - Trang hiện tại (default: 1)
   * @param perPage - Số item per page (default: 50)
   */
  async searchTeachers(search?: string, page: number = 1, perPage: number = 50): Promise<TeachersResponse> {
    try {
      console.log('👨‍🏫 Đang tìm kiếm giáo viên:', search);
      
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      queryParams.append('page', page.toString());
      queryParams.append('per_page', perPage.toString());
      
      const queryString = queryParams.toString();
      const url = `/thoi-khoa-bieu/teachers${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(ApiUtils.getFullURL(url), {
        method: 'GET',
        headers: ApiUtils.createHeaders(true),
      });

      const data = await ApiUtils.handleResponse<TeachersResponse>(response);
      
      console.log('📊 Danh sách giáo viên:', data);
      
      return data;
    } catch (error) {
      console.error('💥 Lỗi tìm kiếm giáo viên:', error);
      
      // Fallback: trả về response báo lỗi thay vì mock data
      const errorResponse: TeachersResponse = {
        success: false,
        data: {
          teachers: [],
          pagination: {
            current_page: 1,
            per_page: 50,
            total: 0,
            total_pages: 0
          }
        },
        message: 'API giáo viên chưa sẵn sàng. Sẽ tự động lấy dữ liệu từ thời khóa biểu.'
      };
      
      return errorResponse;
    }
  }

  /**
   * Tìm kiếm danh sách môn học
   * @param search - Tên môn học để tìm kiếm
   * @param page - Trang hiện tại (default: 1)
   * @param perPage - Số item per page (default: 50)
   */
  async searchSubjects(search?: string, page: number = 1, perPage: number = 50): Promise<SubjectsResponse> {
    try {
      console.log('📚 Đang tìm kiếm môn học:', search);
      
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      queryParams.append('page', page.toString());
      queryParams.append('per_page', perPage.toString());
      
      const queryString = queryParams.toString();
      const url = `/thoi-khoa-bieu/subjects${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(ApiUtils.getFullURL(url), {
        method: 'GET',
        headers: ApiUtils.createHeaders(true),
      });

      const data = await ApiUtils.handleResponse<SubjectsResponse>(response);
      
      console.log('📊 Danh sách môn học:', data);
      
      return data;
    } catch (error) {
      console.error('💥 Lỗi tìm kiếm môn học:', error);
      return ApiUtils.handleError(error, 'Lỗi kết nối khi tìm kiếm môn học');
    }
  }

  /**
   * Tìm kiếm danh sách lớp học
   * @param search - Tên lớp để tìm kiếm
   * @param khoi - Khối lớp (optional)
   * @param namHoc - Năm học (optional)
   * @param page - Trang hiện tại (default: 1)
   * @param perPage - Số item per page (default: 50)
   */
  async searchClasses(
    search?: string, 
    khoi?: number, 
    namHoc?: string, 
    page: number = 1, 
    perPage: number = 50
  ): Promise<ClassesResponse> {
    try {
      console.log('🏫 Đang tìm kiếm lớp học:', { search, khoi, namHoc });
      
      const queryParams = new URLSearchParams();
      if (search) queryParams.append('search', search);
      if (khoi) queryParams.append('khoi', khoi.toString());
      if (namHoc) queryParams.append('nam_hoc', namHoc);
      queryParams.append('page', page.toString());
      queryParams.append('per_page', perPage.toString());
      
      const queryString = queryParams.toString();
      const url = `/thoi-khoa-bieu/classes${queryString ? `?${queryString}` : ''}`;
      
      const response = await fetch(ApiUtils.getFullURL(url), {
        method: 'GET',
        headers: ApiUtils.createHeaders(true),
      });

      const data = await ApiUtils.handleResponse<ClassesResponse>(response);
      
      console.log('📊 Danh sách lớp học:', data);
      
      return data;
    } catch (error) {
      console.error('💥 Lỗi tìm kiếm lớp học:', error);
      return ApiUtils.handleError(error, 'Lỗi kết nối khi tìm kiếm lớp học');
    }
  }

  /**
   * Lấy tất cả giáo viên (không filter)
   */
  async getAllTeachers(): Promise<TeachersResponse> {
    return this.searchTeachers('', 1, 1000);
  }

  /**
   * Lấy tất cả môn học (không filter)
   */
  async getAllSubjects(): Promise<SubjectsResponse> {
    return this.searchSubjects('', 1, 1000);
  }

  /**
   * Lấy tất cả lớp học (không filter)
   */
  async getAllClasses(): Promise<ClassesResponse> {
    return this.searchClasses('', undefined, undefined, 1, 1000);
  }

  /**
   * Lấy thời khóa biểu đầy đủ từ API
   * GET /api/thoi-khoa-bieu/
   */
  async getFullSchedule(): Promise<ScheduleResponse> {
    try {
      // Không thêm /api vì ApiUtils.getFullURL() đã thêm API_PREFIX rồi
      const url = `/thoi-khoa-bieu/`;
      
      const response = await fetch(ApiUtils.getFullURL(url), {
        method: 'GET',
        headers: ApiUtils.createHeaders(true),
      });

      // Kiểm tra response status trước khi handle
      if (response.status === 401) {
        console.error('🔐 Chưa đăng nhập hoặc token hết hạn');
        return {
          success: false,
          message: 'Chưa đăng nhập hoặc phiên làm việc đã hết hạn',
          data: {
            thoi_khoa_bieu: [],
            user_info: { vai_tro: '', vai_tro_text: '', id: 0, name: '', email: '' },
            nam_hoc: '',
            hoc_ky: 1,
            total_records: 0
          }
        };
      }

      const data = await ApiUtils.handleResponse<ScheduleResponse>(response);
      return data;
    } catch (error) {
      console.error('💥 Lỗi tải thời khóa biểu đầy đủ:', error);
      return ApiUtils.handleError(error, 'Lỗi kết nối khi tải thời khóa biểu');
    }
  }
}

// Export singleton instance
const scheduleAPI = new ScheduleAPI();
export default scheduleAPI;

// Export types
export type { 
  ScheduleResponse, 
  ThuHoc, 
  CaHoc, 
  TietHoc, 
  MonHoc, 
  GiaoVien, 
  Lop, 
  UserInfo,
  ScheduleFilters,
  AllSchedulesResponse,
  TeachersResponse,
  SubjectsResponse,
  ClassesResponse,
  TeacherInfo,
  SubjectInfo,
  ClassInfo
} from '@/types/schedule';