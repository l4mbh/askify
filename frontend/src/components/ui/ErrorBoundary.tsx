import React, { Component, type ReactNode } from 'react';
import styled from 'styled-components';
import { acrylicBase, acrylicButton, themeAwareText } from '../../styles/theme';
import Card from './Card';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

const ErrorContainer = styled(Card)`
  padding: 40px 20px;
  text-align: center;
  max-width: 600px;
  margin: 20px auto;
`;

const ErrorTitle = styled.h2`
  ${themeAwareText}
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 15px;
  color: #ef4444;
`;

const ErrorMessage = styled.p`
  ${themeAwareText}
  font-size: 1rem;
  margin-bottom: 20px;
  opacity: 0.8;
  line-height: 1.6;
`;

const ErrorDetails = styled.details`
  ${themeAwareText}
  margin: 20px 0;
  text-align: left;
  
  summary {
    cursor: pointer;
    font-weight: 600;
    margin-bottom: 10px;
    
    &:hover {
      opacity: 0.8;
    }
  }
`;

const ErrorStack = styled.pre`
  ${acrylicBase}
  padding: 15px;
  border-radius: 8px;
  font-size: 0.8rem;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
  max-height: 300px;
  overflow-y: auto;
  ${themeAwareText}
  opacity: 0.7;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  margin-top: 25px;
`;

const ActionButton = styled.button`
  ${acrylicButton}
  padding: 10px 20px;
  font-size: 0.9rem;
  font-weight: 500;
`;

const PrimaryButton = styled(ActionButton)`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
`;

const SecondaryButton = styled(ActionButton)`
  background: transparent;
  border: 1px solid rgba(102, 126, 234, 0.3);
`;

const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 20px;
`;

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });
  }

  handleReload = () => {
    window.location.reload();
  };

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorContainer>
          <ErrorIcon>⚠️</ErrorIcon>
          <ErrorTitle>Oops! Có lỗi xảy ra</ErrorTitle>
          <ErrorMessage>
            Ứng dụng đã gặp phải một lỗi không mong muốn. 
            Chúng tôi xin lỗi vì sự bất tiện này. Vui lòng thử lại hoặc liên hệ hỗ trợ nếu vấn đề vẫn tiếp diễn.
          </ErrorMessage>

          {this.state.error && (
            <ErrorDetails>
              <summary>Chi tiết lỗi (dành cho developer)</summary>
              <ErrorStack>
                <strong>Error:</strong> {this.state.error.message}
                {this.state.error.stack && (
                  <>
                    <br /><br />
                    <strong>Stack trace:</strong>
                    <br />
                    {this.state.error.stack}
                  </>
                )}
                {this.state.errorInfo?.componentStack && (
                  <>
                    <br /><br />
                    <strong>Component stack:</strong>
                    <br />
                    {this.state.errorInfo.componentStack}
                  </>
                )}
              </ErrorStack>
            </ErrorDetails>
          )}

          <ButtonGroup>
            <PrimaryButton onClick={this.handleReload}>
              Tải lại trang
            </PrimaryButton>
            <SecondaryButton onClick={this.handleReset}>
              Thử lại
            </SecondaryButton>
            <SecondaryButton onClick={this.handleGoHome}>
              Về trang chủ
            </SecondaryButton>
          </ButtonGroup>
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 