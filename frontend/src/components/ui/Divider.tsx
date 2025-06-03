import styled from 'styled-components';
import { colors } from '../../styles/theme';

// Props cho Divider
interface DividerProps {
  orientation?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

// Styled Divider với theme-aware colors
const StyledDivider = styled.div<{
  $orientation: 'horizontal' | 'vertical';
  $size: 'sm' | 'md' | 'lg';
}>`
  background: ${colors.light.border.divider};
  
  .dark & {
    background: ${colors.dark.border.divider};
  }
  
  ${props => props.$orientation === 'vertical' ? `
    width: 1px;
    height: ${props.$size === 'sm' ? '1rem' : props.$size === 'md' ? '1.5rem' : '2rem'};
  ` : `
    height: 1px;
    width: ${props.$size === 'sm' ? '1rem' : props.$size === 'md' ? '1.5rem' : '2rem'};
  `}
`;

// Divider component
function Divider({ orientation = 'vertical', size = 'md', className }: DividerProps) {
  return (
    <StyledDivider
      $orientation={orientation}
      $size={size}
      className={className}
    />
  );
}

export default Divider; 