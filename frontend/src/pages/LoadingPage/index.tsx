import React from 'react';
import styled from 'styled-components';
import { themeAwareText } from '../../styles/theme';
import LoadingSpinner from '../../components/ui/LoadingSpinner';

interface LoadingPageProps {
  message?: string;
  variant?: 'spinner' | 'dots' | 'pulse' | 'bounce';
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

const LoadingPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%);
`;

const LoadingContent = styled.div`
  text-align: center;
  max-width: 400px;
`;

const LoadingTitle = styled.h1`
  ${themeAwareText}
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const LoadingSubtitle = styled.p`
  ${themeAwareText}
  font-size: 1rem;
  margin-bottom: 40px;
  opacity: 0.7;
  line-height: 1.6;
`;

function LoadingPage({ 
  message = "Đang tải...", 
  variant = 'spinner',
  size = 'lg'
}: LoadingPageProps) {
  return (
    <LoadingPageContainer>
      <LoadingContent>
        <LoadingTitle>Askify</LoadingTitle>
        <LoadingSubtitle>
          Chúng tôi đang chuẩn bị mọi thứ cho bạn
        </LoadingSubtitle>
        <LoadingSpinner 
          variant={variant}
          size={size}
          text={message}
        />
      </LoadingContent>
    </LoadingPageContainer>
  );
}

export default LoadingPage; 