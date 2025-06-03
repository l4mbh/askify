import React from 'react';
import styled from 'styled-components';
import { iconStyles } from '../../styles/designSystem';

interface IconProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  className?: string;
}

const StyledIcon = styled.span<{ $size: string }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  
  ${props => props.$size === 'xs' && iconStyles.xs}
  ${props => props.$size === 'sm' && iconStyles.sm}
  ${props => props.$size === 'md' && iconStyles.md}
  ${props => props.$size === 'lg' && iconStyles.lg}
  ${props => props.$size === 'xl' && iconStyles.xl}
  ${props => props.$size === '2xl' && iconStyles['2xl']}
  
  svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

function Icon({ children, size = 'md', className }: IconProps) {
  return (
    <StyledIcon $size={size} className={className}>
      {children}
    </StyledIcon>
  );
}

export default Icon; 