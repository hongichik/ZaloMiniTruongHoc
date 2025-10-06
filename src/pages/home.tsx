import React, { useState } from "react";
import { PageLayout } from "@/components";
import { useNavigate } from "react-router-dom";
import { AuthAPI } from "@/api";
import { HomeTab, ScheduleTab, NotificationTab, UtilitiesTab } from "@/tabs";
import { BottomNavigation } from "@/components/navigation";

const HomePage: React.FunctionComponent = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('home');

    const handleLogout = async () => {
        try {
            await AuthAPI.logout();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
            // Still clear user and redirect even if API call fails
            navigate('/login');
        }
    };

    const renderTabContent = () => {
        switch (activeTab) {
            case 'home':
                return <HomeTab onLogout={handleLogout} />;
            case 'schedule':
                return <ScheduleTab />;
            case 'notifications':
                return <NotificationTab />;
            case 'settings':
                return <UtilitiesTab onLogout={handleLogout} />;
            default:
                return <HomeTab onLogout={handleLogout} />;
        }
    };

    return (
        <PageLayout title={import.meta.env.VITE_APP_NAME} id="home-page">
            <div className="main-container pb-20">
                {renderTabContent()}
            </div>
            
            {/* Bottom Navigation */}
            <BottomNavigation
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />
        </PageLayout>
    );
};

export default HomePage;