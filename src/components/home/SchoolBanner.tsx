import React from "react";
import { Button } from "zmp-ui";
import { useNavigate } from "react-router-dom";
import { LogoTruong } from "../icon";

interface BannerContent {
    main_title?: string;
    description?: string;
    subtitle?: string;
    banner_img?: string;
}

interface SchoolBannerProps {
    bannerData?: BannerContent;
    currentUser?: any;
    apiBaseUrl?: string;
    onLogout?: () => void;
}

const SchoolBanner: React.FC<SchoolBannerProps> = ({ 
    bannerData, 
    currentUser, 
    apiBaseUrl = import.meta.env.VITE_API_BASE_URL,
    onLogout
}) => {
    const navigate = useNavigate();

    if (!bannerData) return null;

    return (
        <div className="banner-container">
            {/* Nút đăng nhập/đăng xuất */}
            {!currentUser ? (
                <Button
                    size="small"
                    variant="primary"
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        zIndex: 10
                    }}
                    onClick={() => navigate('/login')}
                >
                    Đăng nhập
                </Button>
            ) : (
                <div style={{
                    position: 'absolute',
                    top: '1rem',
                    right: '1rem',
                    zIndex: 10,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                }}>
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(10px)',
                        padding: '0.5rem 0.75rem',
                        borderRadius: '8px',
                        fontSize: '0.875rem',
                        fontWeight: '500',
                        color: '#374151'
                    }}>
                        👋 {currentUser.name || 'User'}
                    </div>
                    <Button
                        size="small"
                        variant="secondary"
                        onClick={onLogout}
                        style={{
                            background: 'rgba(239, 68, 68, 0.9)',
                            color: 'white',
                            border: 'none'
                        }}
                    >
                        Đăng xuất
                    </Button>
                </div>
            )}

            {/* Banner image background */}
            {bannerData.banner_img && (
                <div
                    className="banner-background"
                    style={{
                        backgroundImage: `url(${apiBaseUrl}/storage/${bannerData.banner_img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat'
                    }}
                />
            )}

            <div className="banner-overlay">
                <div className="school-logo">
                    <LogoTruong size={55}/>
                </div>
                {bannerData.main_title && (
                    <h2 className="school-name">
                        {bannerData.main_title}
                    </h2>
                )}
                {bannerData.description && (
                    <p className="school-subtitle">
                        {bannerData.description}
                    </p>
                )}
                {bannerData.subtitle && (
                    <p className="school-welcome">{bannerData.subtitle}</p>
                )}
            </div>
        </div>
    );
};

export default SchoolBanner;