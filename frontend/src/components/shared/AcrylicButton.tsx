import styled from 'styled-components';
import { acrylicButtonEffect, colorVariants } from '../../styles/sharedStyles';
import { 
  buttonSizes,
  borderRadius,
  shadows,
  focusRing,
  brandColors,
  semanticColors
} from '../../styles/designSystem';

// Props cho AcrylicButton
interface AcrylicButtonProps {
  variant?: 'primary' | 'success' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

// Styled AcrylicButton component
const StyledAcrylicButton = styled.button<{
  $variant: 'primary' | 'success' | 'secondary';
  $size: 'sm' | 'md' | 'lg';
  $fullWidth: boolean;
}>`
  ${acrylicButtonEffect}
  ${focusRing}
  
  // Size variants - SỬ DỤNG DESIGN SYSTEM
  ${props => props.$size === 'sm' && buttonSizes.sm}
  ${props => props.$size === 'md' && buttonSizes.md}  
  ${props => props.$size === 'lg' && buttonSizes.lg}
  
  // Width
  ${props => props.$fullWidth && `
    width: 100%;
  `}
  
  // Color variants - CẬP NHẬT
  ${props => props.$variant === 'primary' && `
    background: ${brandColors.gradient.primaryStrong};
    border-color: ${brandColors.primary[400]};
    color: white;
    
    &:hover {
      background: ${brandColors.primary[600]};
      box-shadow: ${shadows.brand};
    }
  `}
  
  ${props => props.$variant === 'success' && `
    background: ${semanticColors.success[500]};
    border-color: ${semanticColors.success[500]};
    color: white;
    
    &:hover {
      background: ${semanticColors.success[600]};
      box-shadow: 0 8px 32px ${semanticColors.success[500]}30;
    }
  `}
  
  ${props => props.$variant === 'secondary' && `
    color: ${brandColors.primary[600]};
    
    &:hover {
      background: ${brandColors.gradient.primaryLight};
      color: ${brandColors.primary[700]};
    }
    
    .dark & {
      color: ${brandColors.primary[400]};
      
      &:hover {
        color: ${brandColors.primary[300]};
      }
    }
  `}
  
  // Base styles
  border: none;
  font-weight: 500;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  outline: none;
  border-radius: ${borderRadius.md};
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    transform: none !important;
  }
`;

// AcrylicButton component
function AcrylicButton({
  variant = 'secondary',
  size = 'md',
  fullWidth = false,
  type = 'button',
  onClick,
  children,
  className,
  ...props
}: AcrylicButtonProps) {
  return (
    <StyledAcrylicButton
      $variant={variant}
      $size={size}
      $fullWidth={fullWidth}
      type={type}
      onClick={onClick}
      className={className}
      {...props}
    >
      {children}
    </StyledAcrylicButton>
  );
}

export default AcrylicButton; 