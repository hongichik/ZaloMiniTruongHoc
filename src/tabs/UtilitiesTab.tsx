import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "@/api";

interface UtilitiesTabProps {
    onLogout: () => Promise<void>;
}

const UtilitiesTab: React.FunctionComponent<UtilitiesTabProps> = ({ onLogout }) => {
    const navigate = useNavigate();
    const currentUser = AuthAPI.getStoredUser();
    const userRole = currentUser?.vai_tro; // 0: admin, 1: giáo viên, 2: phụ huynh, 3: học sinh

    const allUtilitiesOptions = [
        // Dành cho Giáo viên
        {
            icon: "📚",
            title: "Quản lý giờ dạy",
            description: "Đổi tiết, dạy bù, dạy thay",
            roles: [1],
            action: () => navigate("/teaching-management")
        },
        
        {
            icon: "✍️",
            title: "Chấm điểm",
            description: "Nhập điểm, đánh giá học sinh",
            roles: [1],
            action: () => console.log("Navigate to grading")
        },
        {
            icon: "�",
            title: "Quản lý lớp học",
            description: "Danh sách học sinh, điểm danh",
            roles: [1],
            action: () => console.log("Navigate to class management")
        },

        // Dành cho Phụ huynh
        {
            icon: "📈",
            title: "Theo dõi học tập",
            description: "Xem kết quả học tập của con",
            roles: [2],
            action: () => console.log("Navigate to student progress")
        },
        {
            icon: "💰",
            title: "Học phí",
            description: "Xem và thanh toán học phí",
            roles: [2],
            action: () => console.log("Navigate to fee payment")
        },
        {
            icon: "🤝",
            title: "Liên hệ giáo viên",
            description: "Chat với giáo viên chủ nhiệm",
            roles: [2],
            action: () => console.log("Navigate to teacher chat")
        },

        // Dành cho Học sinh
        {
            icon: "📖",
            title: "Bài tập về nhà",
            description: "Xem và nộp bài tập",
            roles: [3],
            action: () => console.log("Navigate to homework")
        },
        {
            icon: "🎯",
            title: "Kết quả học tập",
            description: "Xem điểm số và xếp hạng",
            roles: [3],
            action: () => console.log("Navigate to grades")
        },
        {
            icon: "👫",
            title: "Hoạt động lớp",
            description: "Tham gia hoạt động, sự kiện",
            roles: [3],
            action: () => console.log("Navigate to class activities")
        },

        // Chung cho tất cả
        {
            icon: "🔒",
            title: "Bảo mật",
            description: "Đổi mật khẩu, cài đặt bảo mật",
            roles: [0, 1, 2, 3],
            action: () => console.log("Navigate to security settings")
        },
        {
            icon: "🌐",
            title: "Ngôn ngữ",
            description: "Thay đổi ngôn ngữ hiển thị",
            roles: [0, 1, 2, 3],
            action: () => console.log("Change language")
        },
        {
            icon: "📱",
            title: "Về ứng dụng",
            description: "Phiên bản, điều khoản sử dụng",
            roles: [0, 1, 2, 3],
            action: () => console.log("About app")
        }
    ];

    // Lọc options theo role của user hiện tại
    const utilitiesOptions = allUtilitiesOptions.filter(option => 
        userRole !== undefined && option.roles.includes(userRole)
    );

    // Helper function để lấy tên vai trò
    const getRoleName = (roleId: number) => {
        const roleNames: Record<number, string> = {
            0: 'Quản trị viên',
            1: 'Giáo viên', 
            2: 'Phụ huynh',
            3: 'Học sinh'
        };
        return roleNames[roleId] || 'Người dùng';
    };

    return (
        <div className="utilities-tab p-4">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-6">🧰 Tiện Ích</h2>
                
                
                {/* Utilities Options */}
                <div className="space-y-3">
                    {utilitiesOptions.map((option, index) => (
                        <button
                            key={index}
                            onClick={option.action}
                            className="w-full text-left p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            <div className="flex items-center">
                                <span className="text-2xl mr-4">{option.icon}</span>
                                <div className="flex-1">
                                    <h3 className="font-semibold text-gray-800">{option.title}</h3>
                                    <p className="text-gray-600 text-sm">{option.description}</p>
                                </div>
                                <span className="text-gray-400">›</span>
                            </div>
                        </button>
                    ))}
                </div>

                {/* Logout Button */}
                <div className="mt-8 pt-6 border-t border-gray-200">
                    <button
                        onClick={onLogout}
                        className="w-full bg-red-500 text-white py-3 px-6 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center"
                    >
                        <span className="mr-2">🚪</span>
                        Đăng xuất
                    </button>
                </div>

                {/* App Version */}
                <div className="mt-4 text-center text-gray-500 text-sm">
                    <p>Phiên bản 1.0.0</p>
                    <p>© 2024 Trường Học App</p>
                </div>
            </div>
        </div>
    );
};

export default UtilitiesTab;