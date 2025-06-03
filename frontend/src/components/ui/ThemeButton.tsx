import styled from 'styled-components';
import { acrylicButton, themeAwareText, themeAwareTextHover } from '../../styles/theme';
import { 
  buttonSizes,
  borderRadius,
  focusRing,
  spacing
} from '../../styles/designSystem';

// Props cho ThemeButton
interface ThemeButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  'aria-label'?: string;
  title?: string;
}

// Styled ThemeButton với acrylic effects
const StyledThemeButton = styled.button<{ $size: 'sm' | 'md' | 'lg' }>`
  ${acrylicButton}
  ${themeAwareText}
  ${themeAwareTextHover}
  ${focusRing}
  
  // Size variants - SỬ DỤNG DESIGN SYSTEM
  ${props => props.$size === 'sm' && `
    padding: ${spacing.sm};
    ${buttonSizes.sm}
  `}
  ${props => props.$size === 'md' && `
    padding: ${spacing.md};
    ${buttonSizes.md}
  `}
  ${props => props.$size === 'lg' && `
    padding: ${spacing.lg};
    ${buttonSizes.lg}
  `}
  
  border: none;
  outline: none;
  border-radius: ${borderRadius.lg};
  
  &:focus {
    outline: 2px solid rgba(59, 130, 246, 0.5);
    outline-offset: 2px;
  }
`;

// ThemeButton component
function ThemeButton({ 
  children, 
  onClick, 
  size = 'md', 
  className, 
  'aria-label': ariaLabel,
  title 
}: ThemeButtonProps) {
  return (
    <StyledThemeButton
      $size={size}
      onClick={onClick}
      className={className}
      aria-label={ariaLabel}
      title={title}
    >
      {children}
    </StyledThemeButton>
  );
}

export default ThemeButton; 