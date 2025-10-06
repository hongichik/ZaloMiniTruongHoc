import React, { useState, useEffect, useRef } from "react";
import { ScheduleAPI } from "@/api";
import type { ScheduleData, ThuHoc, TietHoc } from "@/types/schedule";

const ScheduleTab: React.FunctionComponent = () => {
    const [scheduleData, setScheduleData] = useState<ScheduleData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [selectedDay, setSelectedDay] = useState<number>(2); // Default: Thứ 2
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [pullDistance, setPullDistance] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const startY = useRef<number>(0);
    const isDragging = useRef<boolean>(false);

    useEffect(() => {
        loadScheduleData();
    }, []);

    // Pull to refresh handlers
    const handleTouchStart = (e: React.TouchEvent) => {
        if (containerRef.current && containerRef.current.scrollTop === 0) {
            startY.current = e.touches[0].clientY;
            isDragging.current = true;
        }
    };

    const handleTouchMove = (e: React.TouchEvent) => {
        if (!isDragging.current || isRefreshing) return;

        const currentY = e.touches[0].clientY;
        const distance = currentY - startY.current;

        if (distance > 0 && containerRef.current && containerRef.current.scrollTop === 0) {
            e.preventDefault();
            const maxDistance = 100;
            const normalizedDistance = Math.min(distance, maxDistance);
            setPullDistance(normalizedDistance);
        }
    };

    const handleTouchEnd = async () => {
        if (!isDragging.current) return;
        
        isDragging.current = false;
        
        if (pullDistance > 60) {
            setIsRefreshing(true);
            await refreshData();
        }
        
        setPullDistance(0);
    };

    const refreshData = async () => {
        try {
            const response = await ScheduleAPI.getFullSchedule();
            if (response.success) {
                setScheduleData(response.data);
                setError(null);
            } else {
                setError(response.message || 'Không thể tải thời khóa biểu');
            }
        } catch (error) {
            setError('Lỗi kết nối đến server');
            console.error('Lỗi refresh thời khóa biểu:', error);
        } finally {
            setTimeout(() => setIsRefreshing(false), 500); // Delay để hiệu ứng mượt
        }
    };

    const loadScheduleData = async () => {
        try {
            setIsLoading(true);
            setError(null);

            const response = await ScheduleAPI.getFullSchedule();
            if (response.success) {
                setScheduleData(response.data);
                
                // Set selected day to today if it's a weekday
                const today = new Date().getDay();
                if (today >= 2 && today <= 6) {
                    setSelectedDay(today);
                }
            } else {
                setError(response.message || 'Không thể tải thời khóa biểu');
            }
        } catch (error) {
            setError('Lỗi kết nối đến server');
            console.error('Lỗi tải thời khóa biểu:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const getSubjectColor = (subjectCode: string): string => {
        const colors: Record<string, string> = {
            'TOAN': 'blue',
            'TVIET': 'green',
            'TANH': 'yellow',
            'KHOA': 'purple',
            'TDUC': 'orange',
            'ANHAC': 'pink',
            'MTHUAT': 'indigo',
            'LSDL': 'teal',
        };
        return colors[subjectCode] || 'gray';
    };

    const getTimeSlot = (period: number): string => {
        const timeSlots: Record<number, string> = {
            1: '7:00 - 7:45',
            2: '7:50 - 8:35',
            3: '8:40 - 9:25',
            4: '9:45 - 10:30',
            5: '10:35 - 11:20',
        };
        return timeSlots[period] || `Tiết ${period}`;
    };

    const renderScheduleCard = (tietHoc: TietHoc, index: number) => {
        const color = getSubjectColor(tietHoc.mon_hoc.ma_mon);
        
        return (
            <div key={tietHoc.id || `period-${index}`} className={`bg-${color}-50 border-l-4 border-${color}-500 p-4 rounded`}>
                <div className="flex justify-between items-center">
                    <div className="flex-1">
                        <h3 className={`font-semibold text-${color}-800`}>
                            Tiết {tietHoc.tiet}: {tietHoc.mon_hoc.ten_mon}
                        </h3>
                        <p className={`text-${color}-600 text-sm`}>
                            GV: {tietHoc.giao_vien.name} - Lớp: {tietHoc.lop.ten_lop}
                        </p>
                    </div>
                    <span className={`bg-${color}-500 text-white px-3 py-1 rounded-full text-sm font-medium`}>
                        {getTimeSlot(tietHoc.tiet)}
                    </span>
                </div>
            </div>
        );
    };

    const selectedDayData = scheduleData?.thoi_khoa_bieu.find(day => day.thu === selectedDay);

    if (isLoading) {
        return (
            <div className="schedule-tab p-4">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="animate-pulse">
                        <div className="h-6 bg-gray-300 rounded w-1/3 mb-4"></div>
                        <div className="space-y-3">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-20 bg-gray-200 rounded"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="schedule-tab p-4">
                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="text-center">
                        <div className="text-red-500 text-4xl mb-4">❌</div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">Lỗi tải thời khóa biểu</h3>
                        <p className="text-gray-600 mb-4">{error}</p>
                        <button 
                            onClick={loadScheduleData}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                        >
                            Thử lại
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div 
            className="schedule-tab p-4 relative"
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ 
                transform: `translateY(${pullDistance}px)`,
                transition: isDragging.current ? 'none' : 'transform 0.3s ease'
            }}
        >
            {/* Pull to Refresh Indicator */}
            {(pullDistance > 0 || isRefreshing) && (
                <div 
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-full flex flex-col items-center justify-center text-gray-600"
                    style={{ height: `${Math.max(pullDistance, isRefreshing ? 60 : 0)}px` }}
                >
                    <div className={`transition-transform ${isRefreshing ? 'animate-spin' : ''} ${pullDistance > 60 ? 'rotate-180' : ''}`}>
                        {isRefreshing ? '🔄' : '⬇️'}
                    </div>
                    <span className="text-xs mt-1">
                        {isRefreshing ? 'Đang tải...' : pullDistance > 60 ? 'Thả để tải lại' : 'Kéo để tải lại'}
                    </span>
                </div>
            )}

            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">📅 Thời Khóa Biểu</h2>
                
                {/* Academic Info */}
                {scheduleData && (
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 rounded-lg mb-6">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="font-semibold">Năm học: {scheduleData.nam_hoc}</h3>
                                <p className="text-blue-100 text-sm">Học kỳ {scheduleData.hoc_ky}</p>
                            </div>
                            <div className="text-right">
                                <p className="text-blue-100 text-sm">{scheduleData.user_info.vai_tro_text}</p>
                                <p className="font-semibold">{scheduleData.user_info.name}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Day Selector */}
                <div className="grid grid-cols-5 gap-2 mb-6">
                    {scheduleData?.thoi_khoa_bieu.map(day => (
                        <button
                            key={day.thu}
                            onClick={() => setSelectedDay(day.thu)}
                            className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                                selectedDay === day.thu
                                    ? 'bg-blue-500 text-white shadow-md'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {day.thu_text}
                        </button>
                    ))}
                </div>

                {/* Schedule Content */}
                {selectedDayData ? (
                    <div className="space-y-4">
                        {selectedDayData.ca_hoc.map((caHoc, sessionIndex) => (
                            <div key={`${caHoc.ca_hoc}-${sessionIndex}`}>
                                <h3 className="font-semibold text-gray-700 mb-3 flex items-center">
                                    <span className="bg-gray-100 px-3 py-1 rounded-full text-sm mr-2">
                                        {caHoc.ca_hoc_text}
                                    </span>
                                </h3>
                                
                                <div className="space-y-3 ml-4">
                                    {caHoc.mon_hoc.map((tietHoc, index) => 
                                        renderScheduleCard(tietHoc, index)
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <div className="text-gray-400 text-4xl mb-4">📅</div>
                        <p className="text-gray-600">Không có lịch học cho ngày này</p>
                    </div>
                )}

            </div>
        </div>
    );
};

export default ScheduleTab;