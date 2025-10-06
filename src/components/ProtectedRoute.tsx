import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "@/api";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const navigate = useNavigate();

  useEffect(() => {
    // Kiểm tra xem user đã đăng nhập chưa
    if (!AuthAPI.isAuthenticated()) {
      console.log("🔒 User not authenticated, redirecting to login");
      navigate('/login');
      return;
    }

    // Kiểm tra thông tin user có hợp lệ không
    const user = AuthAPI.getStoredUser();
    if (!user) {
      console.log("👤 No user data found, redirecting to login");
      navigate('/login');
      return;
    }

    console.log(`✅ User authenticated: ${user.ten} (${AuthAPI.getRoleName(user.vai_tro)})`);
  }, [navigate]);

  // Chỉ render children nếu user đã đăng nhập
  if (!AuthAPI.isAuthenticated() || !AuthAPI.getStoredUser()) {
    return null; // Hoặc có thể return một loading spinner
  }

  return <>{children}</>;
}

export default ProtectedRoute;