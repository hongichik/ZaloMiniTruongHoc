import React, { useState, useEffect } from "react";
import { Box, Text } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { PageLayout, LogoTruong } from "@/components";
import { Button, Input } from "@/components/customized";
import { AuthAPI } from "@/api";
import type { LoginRequest } from "@/types/auth";

const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [showPassword, setShowPassword] = useState(false);

    // Kiểm tra nếu đã đăng nhập thì chuyển về home
    useEffect(() => {
        const currentUser = AuthAPI.getStoredUser();
        if (currentUser) {
            console.log("🏠 Already logged in, redirecting to home...");
            navigate("/home", { replace: true });
        }
    }, [navigate]);

    const handleLogin = async () => {
        console.log('🚀 Bắt đầu đăng nhập...');
        
        // Validation
        if (!email || !password) {
            setError('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        if (!isValidEmail(email)) {
            setError('Email không hợp lệ');
            return;
        }

        setIsLoading(true);
        setError('');
        setFieldErrors({});

        try {
            console.log('📡 Gọi API đăng nhập...');
            const response = await AuthAPI.login({ email, password });
            console.log('📥 Phản hồi từ API:', response);
            
            if (response.success) {
                console.log('✅ Đăng nhập thành công!');
                navigate('/home');
            } else {
                console.log('❌ Đăng nhập thất bại:', response.message);
                
                // Handle field-specific errors
                if (response.errors) {
                    setFieldErrors(response.errors);
                    console.log('🔍 Field errors:', response);
                    
                    // Set general error message
                    if (response.errors.email) {
                        setError('Thông tin đăng nhập không chính xác');
                    } else {
                        setError(response.message || 'Đăng nhập thất bại');
                    }
                } else {
                    setError(response.message || 'Đăng nhập thất bại');
                }
            }
        } catch (error) {
            console.error('💥 Lỗi đăng nhập:', error);
            setError('Lỗi kết nối. Vui lòng thử lại.');
        } finally {
            setIsLoading(false);
        }
    };

    const isValidEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleDemoLogin = () => {
        console.log('🎯 Sử dụng tài khoản demo...');
        // setEmail('hs.nguyen.van.minh@school.edu.vn');
        setEmail('gv.nguyen.van.an@school.edu.vn');
        setPassword('123456');
        
        setTimeout(() => {
            handleLogin();
        }, 300);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEmail(value);
        console.log('✏️ Email changed:', value);
        
        if (error) setError('');
        if (fieldErrors.email) {
            setFieldErrors(prev => ({ ...prev, email: undefined }));
        }
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setPassword(value);
        console.log('✏️ Password changed:', value);
        if (error) setError('');
        if (fieldErrors.password) {
            setFieldErrors(prev => ({ ...prev, password: undefined }));
        }
    };

    return (
        <PageLayout title="" id="login-page">
            <div className="modern-login-container">
                <Box className="modern-login-wrapper">
                    {/* Header Section */}
                    <div className="modern-login-header">
                        <div className="modern-logo-container">
                            <LogoTruong size={64} className="modern-logo-icon" />
                        </div>
                        <Text.Title className="modern-main-title">
                            {import.meta.env.VITE_APP_NAME || "Sổ Tay Điện Tử"}
                        </Text.Title>
                        <Text className="modern-subtitle">
                            Hệ thống quản lý trường học thông minh
                        </Text>
                    </div>

                    {/* Login Form Card */}
                    <div className="modern-login-card">
                        <div className="modern-form-section">
                            <Text.Title className="modern-section-title">
                                Đăng nhập hệ thống
                            </Text.Title>
                            <Text className="modern-section-desc">
                                Nhập thông tin tài khoản để tiếp tục
                            </Text>
                        </div>

                        <div className="modern-input-container">
                            <Box className="modern-input-group">
                                <Input
                                    label="Email"
                                    placeholder="Nhập email của bạn"
                                    type="email"
                                    value={email}
                                    onChange={handleEmailChange}
                                    clearable
                                    size="large"
                                    status={fieldErrors.email ? "error" : undefined}
                                />
                                {fieldErrors.email && (
                                    <div className="field-error-message">
                                        <Text className="error-text">{fieldErrors.email[0]}</Text>
                                    </div>
                                )}
                            </Box>
                            
                            <Box className="modern-input-group">
                                <Input
                                    label="Mật khẩu"
                                    type="password"
                                    placeholder="Nhập mật khẩu"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    size="large"
                                    status={fieldErrors.password ? "error" : undefined}
                                />
                                {fieldErrors.password && (
                                    <div className="field-error-message">
                                        <Text className="error-text">{fieldErrors.password[0]}</Text>
                                    </div>
                                )}
                            </Box>
                        </div>

                        {error && (
                            <div className="modern-error-box">
                                <Text className="modern-error-text">{error}</Text>
                            </div>
                        )}

                        <div className="modern-button-container">
                            <Button
                                onClick={handleLogin}
                                loading={isLoading}
                                fullWidth
                                size="large"
                                className="modern-primary-btn"
                            >
                                {isLoading ? "Đang đăng nhập..." : "🚀 Đăng nhập"}
                            </Button>
                            
                            <Button
                                onClick={() => navigate("/home")}
                                variant="tertiary"
                                fullWidth
                                size="medium"
                                className="modern-secondary-btn"
                            >
                                Khách
                            </Button>
                        </div>

                        {/* Demo Account Info */}
                        <div className="modern-demo-box">
                            <div 
                                className="modern-demo-info"
                                onClick={handleDemoLogin}
                            >
                                <Text className="modern-demo-text">
                                    💡 Nhấn để dùng tài khoản demo: 
                                    <span className="demo-credentials">superadmin@example.com</span> / 
                                    <span className="demo-credentials">123456</span>
                                </Text>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <Text className="modern-footer-text">
                        © 2025 {import.meta.env.VITE_APP_NAME || "Sổ Tay Điện Tử"}. Phiên bản 1.0.0
                    </Text>
                </Box>
            </div>
        </PageLayout>
    );
};

export default LoginPage;