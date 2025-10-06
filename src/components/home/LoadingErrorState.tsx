import React from "react";
import { Button } from "zmp-ui";

interface LoadingStateProps {
    isLoading: boolean;
    error?: string | null;
    onRetry?: () => void;
}

const LoadingErrorState: React.FC<LoadingStateProps> = ({ isLoading, error, onRetry }) => {
    if (isLoading) {
        return (
            <div className="loading-state">
                <div className="loading-spinner">⏳</div>
                <p>Đang tải dữ liệu trang chủ...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error-state">
                <div className="error-icon">⚠️</div>
                <p>{error}</p>
                {onRetry && (
                    <Button size="small" onClick={onRetry}>
                        🔄 Thử lại
                    </Button>
                )}
            </div>
        );
    }

    return null;
};

export default LoadingErrorState;