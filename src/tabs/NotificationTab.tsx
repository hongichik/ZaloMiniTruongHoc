import React from "react";

const NotificationTab: React.FunctionComponent = () => {
    const notifications = [
        {
            id: 1,
            title: "Thông báo nghỉ học",
            content: "Thông báo nghỉ học ngày 10/10 do thời tiết xấu",
            time: "2 giờ trước",
            type: "important",
            isRead: false
        },
        {
            id: 2,
            title: "Kết quả thi học kỳ I",
            content: "Kết quả thi học kỳ I đã được cập nhật. Xem chi tiết tại...",
            time: "1 ngày trước",
            type: "info",
            isRead: true
        },
        {
            id: 3,
            title: "Họp phụ huynh",
            content: "Cuộc họp phụ huynh sẽ diễn ra vào thứ 7 tuần tới",
            time: "3 ngày trước",
            type: "meeting",
            isRead: false
        },
        {
            id: 4,
            title: "Nộp học phí học kỳ II",
            content: "Hạn cuối nộp học phí học kỳ II là ngày 15/11",
            time: "1 tuần trước",
            type: "payment",
            isRead: true
        }
    ];

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case 'important': return '⚠️';
            case 'info': return 'ℹ️';
            case 'meeting': return '👥';
            case 'payment': return '💰';
            default: return '📢';
        }
    };

    const getNotificationColor = (type: string) => {
        switch (type) {
            case 'important': return 'border-red-500 bg-red-50';
            case 'info': return 'border-blue-500 bg-blue-50';
            case 'meeting': return 'border-green-500 bg-green-50';
            case 'payment': return 'border-yellow-500 bg-yellow-50';
            default: return 'border-gray-500 bg-gray-50';
        }
    };

    return (
        <div className="notification-tab p-4">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                    🔔 Thông Báo
                    <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                        {notifications.filter(n => !n.isRead).length}
                    </span>
                </h2>
                
                <div className="space-y-4">
                    {notifications.map((notification) => (
                        <div 
                            key={notification.id}
                            className={`border-l-4 p-4 rounded ${getNotificationColor(notification.type)} ${
                                !notification.isRead ? 'shadow-md' : 'opacity-75'
                            }`}
                        >
                            <div className="flex items-start justify-between">
                                <div className="flex-1">
                                    <div className="flex items-center mb-2">
                                        <span className="text-lg mr-2">
                                            {getNotificationIcon(notification.type)}
                                        </span>
                                        <h3 className={`font-semibold ${!notification.isRead ? 'text-gray-900' : 'text-gray-600'}`}>
                                            {notification.title}
                                        </h3>
                                        {!notification.isRead && (
                                            <span className="ml-2 w-2 h-2 bg-red-500 rounded-full"></span>
                                        )}
                                    </div>
                                    <p className="text-gray-600 text-sm mb-2">
                                        {notification.content}
                                    </p>
                                    <span className="text-xs text-gray-500">
                                        {notification.time}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NotificationTab;