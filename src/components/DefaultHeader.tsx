import React, { useState, useEffect } from "react";
import { Header, Button, Icon } from "zmp-ui";
import { AuthAPI } from "@/api";
import type { User } from "@/types/auth";

interface DefaultHeaderProps {
    title?: string;
    back?: boolean;
}

const DefaultHeader: React.FC<DefaultHeaderProps> = ({ title, back = false }) => {
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    useEffect(() => {
        // Kiểm tra user đã đăng nhập
        const user = AuthAPI.getStoredUser();
        setCurrentUser(user);
    }, []);

    const handleLogin = async () => {
        if (isLoggingIn) return;
        
        setIsLoggingIn(true);
        try {
            const loginData = {
                email: "admin@truonghoc.edu.vn",
                password: "123456"
            };
            
            const response = await AuthAPI.login(loginData);
            if (response.success && response.data) {
                setCurrentUser(response.data.user);
                console.log('Đăng nhập thành công:', response.data.user);
            }
        } catch (error) {
            console.error('Lỗi đăng nhập:', error);
        } finally {
            setIsLoggingIn(false);
        }
    };

    const handleLogout = async () => {
        try {
            await AuthAPI.logout();
            setCurrentUser(null);
            console.log('Đăng xuất thành công');
        } catch (error) {
            console.error('Lỗi đăng xuất:', error);
        }
    };

    return (
        <Header 
            title={title || "Sổ Tay Điện Tử"} 
            showBackIcon={back}
            className="default-header"
            suffix={
                <div className="header-auth">
                               
                    {currentUser ? (
                        <div className="user-info">
                            <span className="user-name">{currentUser.ho_ten}</span>
                            <Button 
                                size="small" 
                                variant="tertiary"
                                onClick={handleLogout}
                                className="logout-btn"
                            >
                                <Icon icon="zi-logout" />
                            </Button>
                        </div>
                    ) : (
                        <Button 
                            size="small" 
                            variant="primary"
                            onClick={handleLogin}
                            loading={isLoggingIn}
                            className="login-btn"
                        >
                            <Icon icon="zi-user" />
                            {isLoggingIn ? "Đang đăng nhập..." : "Đăng nhập"}
                        </Button>
                    )}
                </div>
            }
        />
    );
};

export default DefaultHeader;