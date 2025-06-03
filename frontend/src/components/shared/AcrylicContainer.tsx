import styled from 'styled-components';
import { acrylicEffect } from '../../styles/sharedStyles';

// Props cho AcrylicContainer
interface AcrylicContainerProps {
  children: React.ReactNode;
  padding?: 'sm' | 'md' | 'lg';
  margin?: 'sm' | 'md' | 'lg';
  maxWidth?: string;
  className?: string;
}

// Styled AcrylicContainer component
const StyledAcrylicContainer = styled.div<{
  $padding: 'sm' | 'md' | 'lg';
  $margin: 'sm' | 'md' | 'lg';
  $maxWidth?: string;
}>`
  ${acrylicEffect}
  color: #1f2937;
  
  .dark & {
    color: #f9fafb;
  }
  
  // Padding variants
  ${props => props.$padding === 'sm' && `padding: 1.5rem;`}
  ${props => props.$padding === 'md' && `padding: 2rem;`}
  ${props => props.$padding === 'lg' && `padding: 3rem;`}
  
  // Margin variants
  ${props => props.$margin === 'sm' && `margin: 1rem;`}
  ${props => props.$margin === 'md' && `margin: 2rem;`}
  ${props => props.$margin === 'lg' && `margin: 3rem;`}
  
  // Max width
  ${props => props.$maxWidth && `
    width: 100%;
    max-width: ${props.$maxWidth};
  `}

  @media (max-width: 640px) {
    ${props => props.$padding === 'lg' && `padding: 2rem;`}
    ${props => props.$margin === 'md' && `margin: 1rem;`}
    ${props => props.$margin === 'lg' && `margin: 1rem;`}
  }
`;

// AcrylicContainer component
function AcrylicContainer({
  children,
  padding = 'md',
  margin = 'md',
  maxWidth,
  className,
  ...props
}: AcrylicContainerProps) {
  return (
    <StyledAcrylicContainer
      $padding={padding}
      $margin={margin}
      $maxWidth={maxWidth}
      className={className}
      {...props}
    >
      {children}
    </StyledAcrylicContainer>
  );
}

export default AcrylicContainer; 