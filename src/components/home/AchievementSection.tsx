import React from "react";
import { Text } from "zmp-ui";

interface Achievement {
    text: string;
    year: string | number;
    icon?: string;
}

interface AchievementSectionProps {
    title?: string;
    description?: string;
    achievements: Achievement[];
    onMapIconToEmoji: (iconClass: string) => string;
}

const AchievementSection: React.FC<AchievementSectionProps> = ({ 
    title = "Thành tích nổi bật",
    description,
    achievements,
    onMapIconToEmoji
}) => {
    if (!achievements || achievements.length === 0) return null;

    return (
        <div className="school-info-card">
            <div className="info-header">
                <h3 className="section-title">{title}</h3>
                <br />
            </div>

            {achievements.map((achievement, index) => (
                <div key={achievement.id || `achievement-${index}`} className="achievement-item">
                    <div className="achievement-icon">
                        {achievement.icon?.startsWith('fas fa-') 
                            ? onMapIconToEmoji(achievement.icon) 
                            : (achievement.icon || '🏆')
                        }
                    </div>
                    <div className="flex-1">
                        <p className="achievement-text">{achievement.text}</p>
                        <Text size="xSmall" className="text-amber-600">
                            Năm {achievement.year}
                        </Text>
                    </div>
                </div>
            ))}

            {description && (
                <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <Text size="small" className="text-blue-800 text-center font-medium">
                        {description}
                    </Text>
                </div>
            )}
        </div>
    );
};

export default AchievementSection;