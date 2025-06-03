import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

interface ErrorInfo {
  code?: string;
  message?: string;
  redirectTo?: string;
}

export function useErrorHandler() {
  const navigate = useNavigate();

  const handleError = useCallback((error: Error | ErrorInfo | string) => {
    console.error('Error occurred:', error);

    // Xử lý các loại lỗi khác nhau
    if (typeof error === 'string') {
      navigate(`/error/500?message=${encodeURIComponent(error)}`);
      return;
    }

    if (error instanceof Error) {
      // Network errors
      if (error.message.includes('fetch') || error.message.includes('network')) {
        navigate('/error/network');
        return;
      }

      // Timeout errors  
      if (error.message.includes('timeout')) {
        navigate('/error/timeout');
        return;
      }

      // Default server error
      navigate(`/error/500?message=${encodeURIComponent(error.message)}`);
      return;
    }

    // Custom error info object
    const errorInfo = error as ErrorInfo;
    if (errorInfo.redirectTo) {
      navigate(errorInfo.redirectTo);
    } else {
      const code = errorInfo.code || '500';
      const message = errorInfo.message ? `?message=${encodeURIComponent(errorInfo.message)}` : '';
      navigate(`/error/${code}${message}`);
    }
  }, [navigate]);

  const handleHttpError = useCallback((response: Response) => {
    switch (response.status) {
      case 400:
        handleError({ code: '400', message: 'Yêu cầu không hợp lệ' });
        break;
      case 401:
        handleError({ code: '401', message: 'Bạn cần đăng nhập để truy cập' });
        break;
      case 403:
        handleError({ code: '403', message: 'Bạn không có quyền truy cập' });
        break;
      case 404:
        handleError({ code: '404', message: 'Không tìm thấy tài nguyên' });
        break;
      case 429:
        handleError({ code: '429', message: 'Quá nhiều yêu cầu, vui lòng thử lại sau' });
        break;
      case 500:
      default:
        handleError({ code: '500', message: 'Lỗi máy chủ nội bộ' });
        break;
    }
  }, [handleError]);

  const handleAsyncError = useCallback(async (asyncFn: () => Promise<any>) => {
    try {
      return await asyncFn();
    } catch (error) {
      handleError(error as Error);
      throw error; // Re-throw để component có thể handle nếu cần
    }
  }, [handleError]);

  return {
    handleError,
    handleHttpError,
    handleAsyncError
  };
} 