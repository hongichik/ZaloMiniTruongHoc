// Types cho API Thời khóa biểu

export interface MonHoc {
  id: number;
  ten_mon: string;
  ma_mon: string;
}

export interface GiaoVien {
  id: number;
  name: string;
}

export interface Lop {
  id: number;
  ten_lop: string;
}

export interface TietHoc {
  id: number;
  tiet: number;
  mon_hoc: MonHoc;
  giao_vien: GiaoVien;
  lop: Lop;
}

export interface CaHoc {
  ca_hoc: string;
  ca_hoc_text: string;
  mon_hoc: TietHoc[];
}

export interface ThuHoc {
  thu: number;
  thu_text: string;
  ca_hoc: CaHoc[];
}

export interface UserInfo {
  vai_tro: string;
  vai_tro_text: string;
  id: number;
  name: string;
  email: string;
}

export interface ScheduleData {
  thoi_khoa_bieu: ThuHoc[];
  user_info: UserInfo;
  nam_hoc: string;
  hoc_ky: number;
  total_records: number;
}

export interface ScheduleResponse {
  success: boolean;
  data: ScheduleData;
  message: string;
}

// Filters cho getAllSchedules API
export interface ScheduleFilters {
  lop_id?: number;
  ten_lop?: string;
  khoi?: number;
  giao_vien_id?: number;
  ten_giao_vien?: string;
  mon_hoc_id?: number;
  ten_mon_hoc?: string;
  ca_hoc?: string;
  nam_hoc?: string;
  hoc_ky?: number;
  phong_hoc?: string;
  thu?: number[];
  tiet?: number[];
  page?: number;
  per_page?: number;
  sort_by?: string;
  sort_order?: 'asc' | 'desc';
}

// Schedule item trong AllSchedules response
export interface ScheduleItem {
  id: number;
  thu: number;
  thu_text: string;
  tiet: number;
  ca_hoc: string;
  ca_hoc_text: string;
  mon_hoc: MonHoc;
  giao_vien: GiaoVien;
  lop: Lop;
  phong_hoc?: string;
  nam_hoc: string;
  hoc_ky: number;
  ngay_tao?: string;
  ngay_cap_nhat?: string;
}

// Response cho getAllSchedules API
export interface AllSchedulesResponse {
  success: boolean;
  data: {
    schedules: ScheduleItem[];
    pagination: {
      current_page: number;
      per_page: number;
      total: number;
      total_pages: number;
    };
  };
  message: string;
}

// Teacher info cho API
export interface TeacherInfo {
  id: number;
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
}

// Response cho Teachers API
export interface TeachersResponse {
  success: boolean;
  data: {
    teachers: TeacherInfo[];
    pagination: {
      current_page: number;
      per_page: number;
      total: number;
      total_pages: number;
    };
  };
  message: string;
}

// Subject info cho API
export interface SubjectInfo {
  id: number;
  ten_mon: string;
  ma_mon: string;
  khoi?: number;
  so_tiet_hoc?: number;
}

// Response cho Subjects API
export interface SubjectsResponse {
  success: boolean;
  data: {
    subjects: SubjectInfo[];
    pagination: {
      current_page: number;
      per_page: number;
      total: number;
      total_pages: number;
    };
  };
  message: string;
}

// Class info cho API
export interface ClassInfo {
  id: number;
  ten_lop: string;
  khoi: number;
  nam_hoc: string;
  si_so?: number;
  gvcn?: string;
}

// Response cho Classes API
export interface ClassesResponse {
  success: boolean;
  data: {
    classes: ClassInfo[];
    pagination: {
      current_page: number;
      per_page: number;
      total: number;
      total_pages: number;
    };
  };
  message: string;
}