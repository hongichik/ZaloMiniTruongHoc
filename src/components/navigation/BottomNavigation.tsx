import React from "react";

interface TabItem {
    id: string;
    label: string;
    icon: string;
    activeIcon?: string;
}

interface BottomNavigationProps {
    activeTab: string;
    onTabChange: (tabId: string) => void;
}

const BottomNavigation: React.FunctionComponent<BottomNavigationProps> = ({
    activeTab,
    onTabChange
}) => {
    const tabs: TabItem[] = [
        {
            id: 'home',
            label: 'Trang chủ',
            icon: '🏠',
            activeIcon: '🏡'
        },
        {
            id: 'schedule',
            label: 'Thời khóa biểu',
            icon: '📅',
            activeIcon: '📆'
        },
        {
            id: 'notifications',
            label: 'Thông báo',
            icon: '🔔',
            activeIcon: '🔔'
        },
        {
            id: 'settings',
            label: 'Tiện ích',
            icon: '🧰',
            activeIcon: '🧰'
        }
    ];

    return (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
            <div className="flex items-center justify-around py-2">
                {tabs.map((tab) => {
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`flex flex-col items-center py-2 px-4 min-w-0 flex-1 transition-colors ${
                                isActive 
                                    ? 'text-blue-600' 
                                    : 'text-gray-600 hover:text-gray-800'
                            }`}
                        >
                            <span className={`text-xl mb-1 ${isActive ? 'transform scale-110' : ''} transition-transform`}>
                                {isActive ? (tab.activeIcon || tab.icon) : tab.icon}
                            </span>
                            <span className={`text-xs font-medium truncate ${
                                isActive ? 'text-blue-600' : 'text-gray-600'
                            }`}>
                                {tab.label}
                            </span>
                            {isActive && (
                                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-blue-600 rounded-b"></div>
                            )}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default BottomNavigation;