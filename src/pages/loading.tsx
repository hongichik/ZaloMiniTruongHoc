import React, { useState, useEffect } from "react";
import { Spinner } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { LogoTruong } from "@/components";

const LoadingPage: React.FC = () => {
    const navigate = useNavigate();
    const [loadingStep, setLoadingStep] = useState(0);
    const [progress, setProgress] = useState(0);

    const loadingSteps = [
        "🔐 Đang xác thực tài khoản...",
        "📚 Đang tải thông tin học tập...",
        "📅 Đang cập nhật thời khóa biểu...",
        "🎯 Đang kiểm tra bài tập mới...",
        "✨ Hoàn thành!"
    ];

    useEffect(() => {
        // Timer cho progress bar
        const progressTimer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressTimer);
                    return 100;
                }
                return prev + 5; // Tăng 5% mỗi 100ms để hoàn thành trong 2s
            });
        }, 100);

        // Timer cho loading steps
        const stepTimer = setInterval(() => {
            setLoadingStep(prev => {
                if (prev >= loadingSteps.length - 1) {
                    clearInterval(stepTimer);
                    return prev;
                }
                return prev + 1;
            });
        }, 400); // Thay đổi step mỗi 400ms

        const redirectTimer = setTimeout(() => {
            navigate('/home');
        }, 2000);

        return () => {
            clearInterval(progressTimer);
            clearInterval(stepTimer);
            clearTimeout(redirectTimer);
        };
    }, [navigate, loadingSteps.length]);

    return (
        <div className="student-loading-container">
            {/* Animated background */}
            <div className="loading-bg-animation">
                <div className="floating-icon">📚</div>
                <div className="floating-icon">✏️</div>
                <div className="floating-icon">🎯</div>
                <div className="floating-icon">📝</div>
                <div className="floating-icon">🏆</div>
            </div>

            {/* Main content */}
            <div className="loading-content">
                <div className="student-logo-container">
                    <div className="logo-book">
                        <LogoTruong size={60}/>
                    </div>
                    <div className="logo-sparkles">✨</div>
                </div>
                
                <h1 className="app-title">Sổ Tay Điện Tử</h1>
                <p className="app-subtitle">Dành cho học sinh thông minh</p>
                
                <div className="loading-progress-section">
                    <div className="progress-bar-container">
                        <div className="progress-bar">
                            <div 
                                className="progress-fill" 
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>
                        <span className="progress-text">{progress}%</span>
                    </div>
                    
                    <p className="loading-step-text">
                        {loadingSteps[loadingStep]}
                    </p>
                </div>

                <div className="loading-spinner-container">
                    <Spinner size="large" />
                </div>


                <div className="loading-features">
                    <div className="feature-preview">
                        <span className="feature-icon">📅</span>
                        <span className="feature-text">Thời khóa biểu</span>
                    </div>
                    <div className="feature-preview">
                        <span className="feature-icon">📊</span>
                        <span className="feature-text">Điểm số</span>
                    </div>
                    <div className="feature-preview">
                        <span className="feature-icon">📝</span>
                        <span className="feature-text">Bài tập</span>
                    </div>
                    <div className="feature-preview">
                        <span className="feature-icon">🔔</span>
                        <span className="feature-text">Thông báo</span>
                    </div>
                </div>
                
                <div className="loading-footer">
                    <p className="footer-text">
                        🌟 Học tập thông minh - Thành công rực rỡ
                    </p>
                    <p className="version-text">
                        Version 2.0 • Made with 💝
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoadingPage;