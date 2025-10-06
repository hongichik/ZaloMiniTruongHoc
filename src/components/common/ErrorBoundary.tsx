import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Box, Text, Button } from 'zmp-ui';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box className="p-6 text-center">
          <Text className="text-lg font-semibold text-red-600 mb-4">
            😵 Oops! Có lỗi xảy ra
          </Text>
          <Text className="text-gray-600 mb-4">
            {this.state.error?.message || 'Đã xảy ra lỗi không mong muốn.'}
          </Text>
          <Button
            variant="primary"
            onClick={() => {
              this.setState({ hasError: false, error: undefined });
              window.location.reload();
            }}
          >
            🔄 Tải lại trang
          </Button>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;