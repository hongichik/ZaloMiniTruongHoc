import React, { useState, useEffect } from "react";
import { AuthAPI, HomePageAPI } from "@/api";
import type { HomepageData } from "@/types/homepage";
import {
    SchoolBanner,
    BannerSlider,
    InfrastructureGallery,
    AchievementSection,
    ContactSection,
    NotificationCard,
    LoadingErrorState,
    NewsSection
} from "@/components/home";

type UserRole = 'teacher' | 'student' | 'parent' | null;

interface HomeTabProps {
    onLogout: () => Promise<void>;
}

const HomeTab: React.FunctionComponent<HomeTabProps> = ({ onLogout }) => {
    const [userRole, setUserRole] = useState<UserRole>(null);
    const [currentUser, setCurrentUser] = useState(AuthAPI.getStoredUser());
    const [homepageData, setHomepageData] = useState<HomepageData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Load homepage data from API
    useEffect(() => {
        const loadHomepageData = async () => {
            try {
                setIsLoading(true);
                setError(null);

                const response = await HomePageAPI.getFullHomepage();
                console.log('🔄 Fresh API Response:', response);
                if (response.success) {
                    setHomepageData(response.data.homepage);
                } else {
                    setError(response.message || 'Không thể tải dữ liệu trang chủ');
                    console.error('❌ Lỗi tải dữ liệu trang chủ:', response.message);
                }
            } catch (error) {
                setError('Lỗi kết nối đến server');
                console.error('💥 Lỗi tải dữ liệu trang chủ:', error);
            } finally {
                setIsLoading(false);
            }
        };

        loadHomepageData();
    }, []);

    // Icon mapping function for FontAwesome to emoji
    const mapIconToEmoji = (iconClass: string): string => {
        const iconMap: Record<string, string> = {
            'fas fa-school': '🏛️',
            'fas fa-running': '🏃',
            'fas fa-chalkboard-teacher': '📖',
            'fas fa-book': '📚',
            'fas fa-microscope': '🔬',
            'fas fa-laptop': '💻',
            'fas fa-trophy': '🏆',
            'fas fa-medal': '🥇',
            'fas fa-star': '⭐',
            'fas fa-award': '🏅',
            'fas fa-graduation-cap': '🎓',
            'fas fa-laptop-code': '💻',
            'fas fa-flask': '🧪',
            'fas fa-palette': '🎨',
            'fas fa-users': '👥',
            'fas fa-seedling': '🌱',
        };
        return iconMap[iconClass] || '🏫';
    };

    // Get data from API only
    const schoolImages = homepageData?.infrastructure?.content?.images || [];
    const achievements = homepageData?.achievement?.content?.achievements || [];
    const bannerSlides = homepageData?.slider_banner?.content?.slides || [];
    const newsArticles = homepageData?.news?.content?.articles || [];
    const contactDetails = homepageData?.contact?.content?.contact_details || {};

    return (
        <div className="home-tab">
            {/* Loading and Error States */}
            <LoadingErrorState 
                isLoading={isLoading}
                error={error}
                onRetry={() => window.location.reload()}
            />

            {/* Only show content when not loading and no error */}
            {!isLoading && !error && homepageData && (
                <>
                    {/* School Banner */}
                    <SchoolBanner
                        bannerData={homepageData.school_banner?.content}
                        currentUser={currentUser}
                        onLogout={onLogout}
                    />

                    {/* Banner Slider */}
                    <BannerSlider slides={bannerSlides} />

                    {/* News Section */}
                    {newsArticles.length > 0 && (
                        <NewsSection 
                            articles={newsArticles}
                            onViewAllNews={() => console.log('Navigate to all news')}
                        />
                    )}

                    {/* Infrastructure Gallery */}
                    <InfrastructureGallery
                        title={homepageData.infrastructure?.content?.section_title || homepageData.infrastructure?.title}
                        images={schoolImages}
                        onMapIconToEmoji={mapIconToEmoji}
                    />

                    {/* Achievement Section */}
                    <AchievementSection
                        title={homepageData.achievement?.content?.main_title}
                        description={homepageData.achievement?.content?.description}
                        achievements={achievements}
                        onMapIconToEmoji={mapIconToEmoji}
                    />

                    {/* Contact Section */}
                    <ContactSection
                        contactDetails={contactDetails}
                    />

                    {/* Notification Card */}
                    {homepageData.notification?.content && (
                        <NotificationCard
                            notificationData={homepageData.notification.content}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default HomeTab;