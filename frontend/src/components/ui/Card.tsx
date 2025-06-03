import styled from 'styled-components';
import { acrylicBase, themeAwareText } from '../../styles/theme';

// Props cho Card component
interface CardProps {
  children: React.ReactNode;
  className?: string;
  padding?: 'sm' | 'md' | 'lg';
}

// Styled Card với theme-aware acrylic effects
const StyledCard = styled.div<{ $padding: 'sm' | 'md' | 'lg' }>`
  ${acrylicBase}
  ${themeAwareText}
  
  border-radius: 0.5rem;
  padding: ${props => 
    props.$padding === 'sm' ? '0.75rem' : 
    props.$padding === 'md' ? '1rem' : 
    '1.5rem'
  };
  
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 
      0 10px 25px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.2);
    
    .dark & {
      box-shadow: 
        0 10px 25px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.1);
    }
  }
`;

// Card component với theme-aware styles
function Card({ children, className, padding = 'md' }: CardProps) {
  return (
    <StyledCard $padding={padding} className={className}>
      {children}
    </StyledCard>
  );
}

export default Card; 