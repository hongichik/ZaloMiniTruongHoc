import React from "react";

interface NotificationContent {
    notice_text?: string;
    button_text?: string;
    button_link?: string;
}

interface NotificationCardProps {
    notificationData: NotificationContent;
}

const NotificationCard: React.FC<NotificationCardProps> = ({ notificationData }) => {
    if (!notificationData || !notificationData.notice_text) return null;

    return (
        <div className="notification-card">
            <p className="notification-text">
                {notificationData.notice_text}
            </p>
            {notificationData.button_link && notificationData.button_text && (
                <button
                    className="notification-button"
                    onClick={() => window.open(notificationData.button_link, '_blank')}
                >
                    {notificationData.button_text} →
                </button>
            )}
        </div>
    );
};

export default NotificationCard;