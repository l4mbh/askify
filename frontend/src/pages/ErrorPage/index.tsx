import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { acrylicButton, themeAwareText, themeAwareTextHover } from '../../styles/theme';
import { Card } from '../../components/ui';

interface ErrorPageProps {
  errorCode?: string;
  title?: string;
  message?: string;
  showHomeButton?: boolean;
  showBackButton?: boolean;
  customActions?: React.ReactNode;
}

const ErrorPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, rgba(185, 28, 28, 0.1) 100%);
`;

const ErrorCard = styled(Card)`
  padding: 60px 40px;
  text-align: center;
  max-width: 600px;
  width: 100%;
`;

const ErrorCode = styled.div`
  font-size: 6rem;
  font-weight: 900;
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 20px;
`;

const ErrorTitle = styled.h1`
  ${themeAwareText}
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #ef4444;
`;

const ErrorMessage = styled.p`
  ${themeAwareText}
  font-size: 1.1rem;
  margin-bottom: 40px;
  opacity: 0.8;
  line-height: 1.6;
  max-width: 450px;
  margin-left: auto;
  margin-right: auto;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  ${acrylicButton}
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 500;
  min-width: 120px;
`;

const SecondaryButton = styled(ActionButton)`
  background: transparent;
  border: 1px solid rgba(102, 126, 234, 0.3);
`;

const ActionLink = styled(Link)`
  ${acrylicButton}
  ${themeAwareText}
  ${themeAwareTextHover}
  padding: 12px 24px;
  font-size: 1rem;
  font-weight: 500;
  min-width: 120px;
  text-decoration: none;
  display: inline-block;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  text-align: center;
`;

const ErrorIllustration = styled.div`
  font-size: 4rem;
  margin-bottom: 30px;
  opacity: 0.7;
`;

const errorTypes = {
  '404': {
    title: 'Trang không tìm thấy',
    message: 'Trang bạn đang tìm kiếm có thể đã được di chuyển, xóa hoặc không tồn tại.',
    illustration: '🔍'
  },
  '500': {
    title: 'Lỗi máy chủ nội bộ',
    message: 'Máy chủ đã gặp phải một lỗi không mong muốn. Vui lòng thử lại sau.',
    illustration: '⚙️'
  },
  '403': {
    title: 'Truy cập bị từ chối',
    message: 'Bạn không có quyền truy cập vào trang này.',
    illustration: '🚫'
  },
  'network': {
    title: 'Lỗi kết nối mạng',
    message: 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối internet của bạn.',
    illustration: '📡'
  },
  'timeout': {
    title: 'Hết thời gian chờ',
    message: 'Yêu cầu đã hết thời gian chờ. Vui lòng thử lại.',
    illustration: '⏰'
  }
};

function ErrorPage({
  errorCode = '404',
  title,
  message,
  showHomeButton = true,
  showBackButton = true,
  customActions
}: ErrorPageProps) {
  const errorInfo = errorTypes[errorCode as keyof typeof errorTypes] || errorTypes['404'];
  
  const handleGoBack = () => {
    if (window.history.length > 1) {
      window.history.back();
    } else {
      window.location.href = '/';
    }
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <ErrorPageContainer>
      <ErrorCard>
        <ErrorIllustration>{errorInfo.illustration}</ErrorIllustration>
        <ErrorCode>{errorCode}</ErrorCode>
        <ErrorTitle>{title || errorInfo.title}</ErrorTitle>
        <ErrorMessage>
          {message || errorInfo.message}
        </ErrorMessage>

        <ButtonGroup>
          {customActions ? (
            customActions
          ) : (
            <>
              {showHomeButton && (
                <ActionLink to="/">
                  🏠 Về trang chủ
                </ActionLink>
              )}
              {showBackButton && (
                <SecondaryButton onClick={handleGoBack}>
                  ← Quay lại
                </SecondaryButton>
              )}
              {(errorCode === '500' || errorCode === 'network' || errorCode === 'timeout') && (
                <SecondaryButton onClick={handleReload}>
                  🔄 Thử lại
                </SecondaryButton>
              )}
            </>
          )}
        </ButtonGroup>
      </ErrorCard>
    </ErrorPageContainer>
  );
}

export default ErrorPage; 