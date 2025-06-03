import styled from 'styled-components';
import { mainBackground } from '../../styles/sharedStyles';

// Props cho BackgroundContainer
interface BackgroundContainerProps {
  children: React.ReactNode;
  className?: string;
}

// Styled BackgroundContainer với animated colorful gradient
const StyledBackgroundContainer = styled.div`
  ${mainBackground}
  min-height: 100vh;
  position: relative;
  
  /* Ensure content is properly positioned */
  display: flex;
  flex-direction: column;
`;

// BackgroundContainer component
function BackgroundContainer({ children, className }: BackgroundContainerProps) {
  return (
    <StyledBackgroundContainer className={className}>
      {children}
    </StyledBackgroundContainer>
  );
}

export default BackgroundContainer; 