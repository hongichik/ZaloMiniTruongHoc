import React, { useState, useEffect } from 'react';
import {
  List, 
  Text, 
  Box, 
  Button, 
  Input, 
  Icon,
  Avatar,
  useSnackbar
} from 'zmp-ui';
import { FilterModal, type FilterState } from '@/components/common';
import scheduleAPI from '@/api/ScheduleAPI';
import type { ScheduleItem, AllSchedulesResponse } from '@/types/schedule';

const MyScheduleTab: React.FC = () => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    thu: '',
    ca_hoc: '',
    teacher: '',
    class: '',
    page: 1
  });
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState('thu');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filterModalVisible, setFilterModalVisible] = useState(false);
  
  const { openSnackbar } = useSnackbar();

  // Fetch schedules when filters, sort options change
  useEffect(() => {
    fetchSchedules();
  }, [filters, sortBy, sortOrder]);

  const fetchSchedules = async () => {
    setLoading(true);
    try {
      const filterParams: any = {
        page: filters.page,
        per_page: 5,
        sort_by: sortBy,
        sort_order: sortOrder
      };

      if (filters.search.trim()) {
        filterParams.ten_mon_hoc = filters.search.trim();
      }
      if (filters.thu) {
        filterParams.thu = [parseInt(filters.thu)];
      }
      if (filters.ca_hoc) {
        filterParams.ca_hoc = filters.ca_hoc;
      }
      if (filters.teacher) {
        filterParams.giao_vien_id = parseInt(filters.teacher);
      }
      if (filters.class) {
        filterParams.lop_id = parseInt(filters.class);
      }

      const response: AllSchedulesResponse = await scheduleAPI.getAllSchedules(filterParams);
      
      if (response && response.success && response.data) {
        setSchedules(response.data || []);
        setTotalPages(response.data.pagination?.total_pages || 1);
      } else {
        setSchedules([]);
        setTotalPages(1);
        openSnackbar({
          text: response?.message || 'Không thể tải dữ liệu thời khóa biểu',
          type: 'error'
        });
      }
    } catch (error) {
      console.error('Lỗi tải thời khóa biểu:', error);
      setSchedules([]);
      setTotalPages(1);
      openSnackbar({
        text: 'Có lỗi xảy ra khi tải dữ liệu. Vui lòng thử lại sau.',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value: string) => {
    setFilters(prev => ({ ...prev, search: value, page: 1 }));
  };

  const handleFilterChange = (key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value, page: 1 }));
  };

  const handlePageChange = (newPage: number) => {
    setFilters(prev => ({ ...prev, page: newPage }));
  };

  const clearAllFilters = () => {
    setFilters({
      search: '',
      thu: '',
      ca_hoc: '',
      teacher: '',
      class: '',
      page: 1
    });
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.search) count++;
    if (filters.thu) count++;
    if (filters.ca_hoc) count++;
    if (filters.teacher) count++;
    if (filters.class) count++;
    return count;
  };

  const applyFilters = () => {
    setFilterModalVisible(false);
    openSnackbar({
      text: `🔍 Đã áp dụng ${getActiveFiltersCount()} bộ lọc`,
      type: 'success'
    });
  };
  const formatSessionText = (caHoc: string): string => {
    const sessionMap: Record<string, string> = {
      'sang': 'Sáng',
      'chieu': 'Chiều',
      'toi': 'Tối'
    };
    return sessionMap[caHoc] || caHoc;
  };

  return (
    <>
      {/* Filter Bar for My Schedule */}
      <Box className="p-3 bg-white border-b border-gray-100">
        <Box className="flex items-center gap-3">
          {/* Search Input */}
          <Box className="flex-1">
            <Input
              placeholder="Tìm kiếm môn học..."
              value={filters.search}
              onChange={(e) => handleSearch(e.target.value)}
              size="small"
            />
          </Box>
          
          {/* Filter Button */}
          <Button
            size="small"
            variant={getActiveFiltersCount() > 0 ? 'primary' : 'secondary'}
            onClick={() => setFilterModalVisible(!filterModalVisible)}
            className="flex items-center gap-2 min-w-fit px-3"
          >
            <Icon icon="zi-filter" />
          </Button>
          
          {/* Clear Filters Button */}
          {getActiveFiltersCount() > 0 && (
            <Button
              size="small"
              variant="tertiary"
              onClick={clearAllFilters}
              className="text-red-600 px-2"
            >
              <Icon icon="zi-close" />
            </Button>
          )}
        </Box>
      </Box>

      {/* My Schedule List */}
      <List className="bg-white">
        {loading ? (
          // Loading skeleton
          Array.from({ length: 5 }).map((_, index) => (
            <List.Item key={`skeleton-${index}`} className="border-b border-gray-100">
              <Box className="p-3 animate-pulse">
                <Box className="flex justify-between items-start mb-2">
                  <Box className="flex-1">
                    <Box className="h-5 bg-gray-200 rounded w-3/4 mb-2"></Box>
                    <Box className="h-4 bg-gray-200 rounded w-1/2"></Box>
                  </Box>
                  <Box className="text-right">
                    <Box className="h-4 bg-gray-200 rounded w-16 mb-1"></Box>
                    <Box className="h-3 bg-gray-200 rounded w-12"></Box>
                  </Box>
                </Box>
                <Box className="flex items-center gap-2 mb-2">
                  <Box className="w-6 h-6 bg-gray-200 rounded-full"></Box>
                  <Box className="h-4 bg-gray-200 rounded w-24"></Box>
                </Box>
                <Box className="flex gap-2 mb-3">
                  <Box className="h-6 bg-gray-200 rounded w-16"></Box>
                  <Box className="h-6 bg-gray-200 rounded w-20"></Box>
                  <Box className="h-6 bg-gray-200 rounded w-18"></Box>
                </Box>
              </Box>
            </List.Item>
          ))
        ) : schedules.length === 0 ? (
          <List.Item>
            <Box className="flex justify-center p-4">
              <Text>Không có dữ liệu thời khóa biểu</Text>
            </Box>
          </List.Item>
        ) : (
          schedules.map((schedule) => (
            <List.Item key={schedule.id} className="border-b border-gray-100">
              <Box className="p-3">
                <Box className="flex justify-between items-start mb-2">
                  <Box className="flex-1">
                    <Text className="font-semibold text-lg text-blue-600">
                      {schedule.mon_hoc.ten_mon}
                    </Text>
                    <Text className="text-sm text-gray-600">
                      Mã môn: {schedule.mon_hoc.ma_mon}
                    </Text>
                  </Box>
                  <Box className="text-right">
                    <Text className="text-sm font-medium text-green-600">
                      {schedule.thu_text}
                    </Text>
                    <Text className="text-xs text-gray-500">
                      Tiết {schedule.tiet}
                    </Text>
                  </Box>
                </Box>

                <Box className="flex items-center gap-2 mb-2">
                  <Avatar size={24} />
                  <Text className="text-sm">
                    GV: {schedule.giao_vien.name}
                  </Text>
                </Box>

                <Box className="flex flex-wrap gap-2 mb-3">
                  <Box className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md text-xs font-medium">
                    Lớp: {schedule.lop.ten_lop}
                  </Box>
                  <Box className="bg-green-50 text-green-700 px-2 py-1 rounded-md text-xs font-medium">
                    Ca: {formatSessionText(schedule.ca_hoc)}
                  </Box>
                  {schedule.phong_hoc && (
                    <Box className="bg-purple-50 text-purple-700 px-2 py-1 rounded-md text-xs font-medium">
                      Phòng: {schedule.phong_hoc}
                    </Box>
                  )}
                  <Box className="bg-orange-50 text-orange-700 px-2 py-1 rounded-md text-xs font-medium">
                    Năm học: {schedule.nam_hoc} - HK{schedule.hoc_ky}
                  </Box>
                </Box>
              </Box>
            </List.Item>
          ))
        )}
      </List>

      {/* Pagination for My Schedule */}
      {totalPages > 1 && !loading && (
        <Box className="p-4 bg-white border-t">
          <Box className="flex justify-center gap-2">
            <Button
              size="small"
              variant="secondary"
              disabled={filters.page <= 1 || loading}
              onClick={() => handlePageChange(Math.max(1, filters.page - 1))}
            >
              Trước
            </Button>
            
            <Text className="px-3 py-1 text-sm">
              Trang {Math.max(1, filters.page)} / {Math.max(1, totalPages)}
            </Text>
            
            <Button
              size="small"
              variant="secondary"
              disabled={filters.page >= totalPages || loading}
              onClick={() => handlePageChange(Math.min(totalPages, filters.page + 1))}
            >
              Sau
            </Button>
          </Box>
        </Box>
      )}

      {/* Filter Modal */}
      <FilterModal
        visible={filterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        onApplyFilters={applyFilters}
        onClearAllFilters={clearAllFilters}
        getActiveFiltersCount={getActiveFiltersCount}
      />
    </>
  );
};

export default MyScheduleTab;