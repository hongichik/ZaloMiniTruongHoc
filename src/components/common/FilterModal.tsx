import React, { useState, useEffect } from 'react';
import {
  Modal,
  Box,
  Text,
  Select,
  Button,
  Icon,
  Input,
  useSnackbar
} from 'zmp-ui';
import scheduleAPI from '@/api/ScheduleAPI';
import type { 
  TeacherInfo, 
  ClassInfo,
  TeachersResponse,
  ClassesResponse
} from '@/types/schedule';

export interface FilterState {
  search: string;
  thu: string;
  ca_hoc: string;
  teacher: string;
  class: string;
  page: number;
}

interface FilterModalProps {
  visible: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: string) => void;
  sortBy: string;
  setSortBy: (value: string) => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  onApplyFilters: () => void;
  onClearAllFilters: () => void;
  getActiveFiltersCount: () => number;
}

const WEEKDAYS = [
  { value: '', label: 'Tất cả các ngày' },
  { value: '2', label: 'Thứ 2' },
  { value: '3', label: 'Thứ 3' },
  { value: '4', label: 'Thứ 4' },
  { value: '5', label: 'Thứ 5' },
  { value: '6', label: 'Thứ 6' },
  { value: '7', label: 'Thứ 7' }
];

const SESSIONS = [
  { value: '', label: 'Tất cả ca học' },
  { value: 'sang', label: 'Ca sáng' },
  { value: 'chieu', label: 'Ca chiều' }
];

const FilterModal: React.FC<FilterModalProps> = ({
  visible,
  onClose,
  filters,
  onFilterChange,
  sortBy,
  setSortBy,
  sortOrder,
  setSortOrder,
  onApplyFilters,
  onClearAllFilters,
  getActiveFiltersCount
}) => {
  // Internal state for teachers and classes
  const [teachers, setTeachers] = useState<TeacherInfo[]>([]);
  const [classes, setClasses] = useState<ClassInfo[]>([]);
  const [loadingTeachers, setLoadingTeachers] = useState(false);
  const [loadingClasses, setLoadingClasses] = useState(false);
  const [dataSource, setDataSource] = useState<'api' | 'schedule' | 'mock'>('api');
  const [teacherSearch, setTeacherSearch] = useState('');
  const [classSearch, setClassSearch] = useState('');
  
  const { openSnackbar } = useSnackbar();

  // Load data when modal becomes visible
  useEffect(() => {
    if (visible && teachers.length === 0) {
      fetchTeachers();
    }
    if (visible && classes.length === 0) {
      fetchClasses();
    }
  }, [visible]);

  // Debounced teacher search
  useEffect(() => {
    if (!visible) return;
    
    const timeoutId = setTimeout(() => {
      if (teacherSearch.trim() || teachers.length === 0) {
        fetchTeachers(teacherSearch.trim() || undefined);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [teacherSearch, visible]);

  // Debounced class search
  useEffect(() => {
    if (!visible) return;
    
    const timeoutId = setTimeout(() => {
      if (classSearch.trim() || classes.length === 0) {
        fetchClasses(classSearch.trim() || undefined);
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [classSearch, visible]);

  const fetchTeachers = async (search?: string) => {
    try {
      setLoadingTeachers(true);
      
      // Thử gọi API thực trước
      const response: TeachersResponse = await scheduleAPI.searchTeachers(search);
     
      if (response && response.success && response.data) {
        setTeachers(response.data);
      } 
    } catch (error) {
      console.error('❌ Lỗi tải danh sách giáo viên từ API:', error);
    } finally {
      setLoadingTeachers(false);
    }
  };


  const fetchClasses = async (search?: string, khoi?: number) => {
    setLoadingClasses(true);
    try {
      // Thử gọi API thực trước
      const response: ClassesResponse = await scheduleAPI.searchClasses(search, khoi);
      
      if (response && response.success && response.data && response.data) {
        setClasses(response.data);
        setDataSource('api');
        openSnackbar({
          text: `✅ Đã tải ${response.data.length} lớp học từ API`,
          type: 'success'
        });
      }
    } catch (error) {
      console.error('❌ Lỗi tải danh sách lớp học từ API:', error);
    } finally {
      setLoadingClasses(false);
    }
  };

  const handleClearAll = () => {
    onClearAllFilters();
    onClose();
  };

  const handleClose = () => {
    // Clear search when modal closes
    setTeacherSearch('');
    setClassSearch('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
      title="Bộ lọc tìm kiếm"
      onClose={handleClose}
      actions={[
        {
          text: 'Hủy',
          close: true,
          highLight: false
        },
        {
          text: 'Áp dụng',
          highLight: true,
          onClick: onApplyFilters
        },
        {
          text: 'Xóa tất cả',
          highLight: false,
          onClick: handleClearAll,
          disabled: getActiveFiltersCount() === 0
        }
      ]}
    >
      <Box className="p-4 space-y-4">
        {/* Data Source Info */}
        <Box className="bg-blue-50 p-3 rounded-lg">
          <Text className="text-sm font-medium text-blue-800 mb-1">
            📊 Nguồn dữ liệu
          </Text>
          <Text className="text-xs text-blue-600">
            {teachers.length} giáo viên • {classes.length} lớp học
            {dataSource === 'schedule' && ' 🔄 (Từ thời khóa biểu)'}
            {dataSource === 'api' && ' ✅ (Từ API)'}
          </Text>
        </Box>
        
        {/* Day Filter */}
        <Box>
          <Text className="text-sm font-medium text-gray-700 mb-2">
            📅 Ngày trong tuần
          </Text>
          <Select
            value={filters.thu}
            onChange={(value) => onFilterChange('thu', value)}
            placeholder="Chọn ngày"
          >
            {WEEKDAYS.map(day => (
              <Select.Option key={day.value} value={day.value} title={day.label} />
            ))}
          </Select>
        </Box>
        
        {/* Session Filter */}
        <Box>
          <Text className="text-sm font-medium text-gray-700 mb-2">
            ⏰ Ca học
          </Text>
          <Select
            value={filters.ca_hoc}
            onChange={(value) => onFilterChange('ca_hoc', value)}
            placeholder="Chọn ca học"
          >
            {SESSIONS.map(session => (
              <Select.Option key={session.value} value={session.value} title={session.label} />
            ))}
          </Select>
        </Box>
        
        {/* Teacher Filter */}
        <Box>
          <Box className="flex justify-between items-center mb-2">
            <Text className="text-sm font-medium text-gray-700">
              👨‍🏫 Giáo viên
            </Text>
            <Button
              size="small"
              variant="tertiary"
              onClick={() => {
                setTeacherSearch('');
                fetchTeachers();
              }}
              disabled={loadingTeachers}
              className="text-xs"
            >
              <Icon icon="zi-refresh" className="mr-1" />
              Làm mới
            </Button>
          </Box>
          
          {/* Search Input */}
          <Input
            placeholder="Tìm kiếm giáo viên..."
            value={teacherSearch}
            onChange={(e) => setTeacherSearch(e.target.value)}
            size="small"
            className="mb-2"
            clearable
          />
          
          {/* Filtered Select */}
          <Select
            value={filters.teacher}
            onChange={(value) => onFilterChange('teacher', value)}
            placeholder={loadingTeachers ? "Đang tải giáo viên..." : "Chọn giáo viên"}
            disabled={loadingTeachers}
          >
            <Select.Option value="" title="Tất cả giáo viên" />
            {teachers
              .filter(teacher => {
                if (!teacherSearch.trim()) return true;
                return teacher.name.toLowerCase().includes(teacherSearch.toLowerCase());
              })
              .map(teacher => (
                <Select.Option 
                  key={teacher.id} 
                  value={teacher.id.toString()} 
                  title={teacher.name} 
                />
              ))
            }
          </Select>
          
          {/* Search results info */}
          <Text className="text-xs text-gray-500 mt-1">
            {loadingTeachers ? 'Đang tải...' : 
              teacherSearch.trim() 
                ? `${teachers.filter(t => t.name.toLowerCase().includes(teacherSearch.toLowerCase())).length}/${teachers.length} giáo viên`
                : `${teachers.length} giáo viên`
            }
          </Text>
        </Box>
        
        {/* Class Filter */}
        <Box>
          <Box className="flex justify-between items-center mb-2">
            <Text className="text-sm font-medium text-gray-700">
              🏫 Lớp học
            </Text>
            <Button
              size="small"
              variant="tertiary"
              onClick={() => {
                setClassSearch('');
                fetchClasses();
              }}
              disabled={loadingClasses}
              className="text-xs"
            >
              <Icon icon="zi-refresh" className="mr-1" />
              Làm mới
            </Button>
          </Box>
          
          {/* Search Input */}
          <Input
            placeholder="Tìm kiếm lớp học..."
            value={classSearch}
            onChange={(e) => setClassSearch(e.target.value)}
            size="small"
            className="mb-2"
            clearable
          />
          
          {/* Filtered Select */}
          <Select
            value={filters.class}
            onChange={(value) => onFilterChange('class', value)}
            placeholder={loadingClasses ? "Đang tải lớp học..." : "Chọn lớp"}
            disabled={loadingClasses}
          >
            <Select.Option value="" title="Tất cả lớp" />
            {classes
              .filter(classItem => {
                if (!classSearch.trim()) return true;
                return classItem.ten_lop.toLowerCase().includes(classSearch.toLowerCase());
              })
              .map(classItem => (
                <Select.Option 
                  key={classItem.id} 
                  value={classItem.id.toString()} 
                  title={`${classItem.ten_lop} (Khối ${classItem.khoi})`} 
                />
              ))
            }
          </Select>
          
          {/* Search results info */}
          <Text className="text-xs text-gray-500 mt-1">
            {loadingClasses ? 'Đang tải...' : 
              classSearch.trim() 
                ? `${classes.filter(c => c.ten_lop.toLowerCase().includes(classSearch.toLowerCase())).length}/${classes.length} lớp học`
                : `${classes.length} lớp học`
            }
          </Text>
        </Box>
        
        {/* Sort Options */}
        <Box>
          <Text className="text-sm font-medium text-gray-700 mb-2">
            🔄 Sắp xếp
          </Text>
          <Box className="flex gap-2">
            <Select
              value={sortBy}
              onChange={(value) => {
                if (value && typeof value === 'string') {
                  setSortBy(value);
                }
              }}
              className="flex-1"
            >
              <Select.Option value="thu" title="Thứ trong tuần" />
              <Select.Option value="tiet" title="Tiết học" />
              <Select.Option value="mon_hoc" title="Môn học" />
              <Select.Option value="giao_vien" title="Giáo viên" />
            </Select>
            <Button
              size="small"
              variant="secondary"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="px-3"
            >
              <Icon icon={sortOrder === 'asc' ? 'zi-arrow-up' : 'zi-arrow-down'} />
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default FilterModal;