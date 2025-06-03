import React from 'react';
import styled, { keyframes } from 'styled-components';
import { acrylicBase, themeAwareText } from '../../styles/theme';
import { 
  brandColors, 
  iconSizes, 
  fontSize, 
  spacing,
  shadows 
} from '../../styles/designSystem';

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const bounce = keyframes`
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
`;

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'spinner' | 'dots' | 'pulse' | 'bounce';
  text?: string;
  fullScreen?: boolean;
}

const LoadingContainer = styled.div<{ $fullScreen: boolean }>`
  ${props => props.$fullScreen && `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999;
    ${acrylicBase}
  `}
  
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;
  padding: 20px;
`;

const Spinner = styled.div<{ $size: string }>`
  width: ${props => {
    switch (props.$size) {
      case 'sm': return iconSizes.lg;
      case 'md': return iconSizes.xl;
      case 'lg': return iconSizes['2xl'];
      case 'xl': return '64px';
      default: return iconSizes.xl;
    }
  }};
  height: ${props => {
    switch (props.$size) {
      case 'sm': return iconSizes.lg;
      case 'md': return iconSizes.xl;
      case 'lg': return iconSizes['2xl'];
      case 'xl': return '64px';
      default: return iconSizes.xl;
    }
  }};
  border: 3px solid ${brandColors.primary[200]};
  border-top: 3px solid ${brandColors.primary[500]};
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
`;

const DotsContainer = styled.div`
  display: flex;
  gap: ${spacing.sm};
`;

const Dot = styled.div<{ $size: string; $delay: number }>`
  width: ${props => {
    switch (props.$size) {
      case 'sm': return spacing.sm;
      case 'md': return spacing.md;
      case 'lg': return spacing.lg;
      case 'xl': return spacing.xl;
      default: return spacing.md;
    }
  }};
  height: ${props => {
    switch (props.$size) {
      case 'sm': return spacing.sm;
      case 'md': return spacing.md;
      case 'lg': return spacing.lg;
      case 'xl': return spacing.xl;
      default: return spacing.md;
    }
  }};
  background: ${brandColors.gradient.primary};
  border-radius: 50%;
  animation: ${bounce} 1.4s ease-in-out infinite;
  animation-delay: ${props => props.$delay}s;
  box-shadow: ${shadows.sm};
`;

const PulseCircle = styled.div<{ $size: string }>`
  width: ${props => {
    switch (props.$size) {
      case 'sm': return iconSizes.lg;
      case 'md': return iconSizes.xl;
      case 'lg': return iconSizes['2xl'];
      case 'xl': return '64px';
      default: return iconSizes.xl;
    }
  }};
  height: ${props => {
    switch (props.$size) {
      case 'sm': return iconSizes.lg;
      case 'md': return iconSizes.xl;
      case 'lg': return iconSizes['2xl'];
      case 'xl': return '64px';
      default: return iconSizes.xl;
    }
  }};
  background: ${brandColors.gradient.primary};
  border-radius: 50%;
  animation: ${pulse} 1.5s ease-in-out infinite;
  box-shadow: ${shadows.md};
`;

const LoadingText = styled.p<{ $size: string }>`
  ${themeAwareText}
  margin: 0;
  font-size: ${props => {
    switch (props.$size) {
      case 'sm': return fontSize.sm;
      case 'md': return fontSize.base;
      case 'lg': return fontSize.lg;
      case 'xl': return fontSize.xl;
      default: return fontSize.base;
    }
  }};
  font-weight: 500;
  opacity: 0.8;
  animation: ${pulse} 2s ease-in-out infinite;
`;

function LoadingSpinner({ 
  size = 'md', 
  variant = 'spinner', 
  text, 
  fullScreen = false 
}: LoadingSpinnerProps) {
  const renderLoadingAnimation = () => {
    switch (variant) {
      case 'dots':
        return (
          <DotsContainer>
            <Dot $size={size} $delay={0} />
            <Dot $size={size} $delay={0.2} />
            <Dot $size={size} $delay={0.4} />
          </DotsContainer>
        );
      case 'pulse':
        return <PulseCircle $size={size} />;
      case 'bounce':
        return (
          <DotsContainer>
            <Dot $size={size} $delay={0} />
            <Dot $size={size} $delay={0.1} />
            <Dot $size={size} $delay={0.2} />
            <Dot $size={size} $delay={0.3} />
          </DotsContainer>
        );
      case 'spinner':
      default:
        return <Spinner $size={size} />;
    }
  };

  return (
    <LoadingContainer $fullScreen={fullScreen}>
      {renderLoadingAnimation()}
      {text && <LoadingText $size={size}>{text}</LoadingText>}
    </LoadingContainer>
  );
}

export default LoadingSpinner; 