import styled from 'styled-components';
import { acrylicBase, themeAwareText } from '../../styles/theme';

// Container chính cho HomePage sử dụng shared acrylic effect
export const HomeContainer = styled.div`
  ${acrylicBase}
  padding: 2rem;
  margin: 2rem;

  @media (max-width: 640px) {
    margin: 1rem;
    padding: 1.5rem;
  }
`;

// Title cho trang HomePage với theme-aware text
export const PageTitle = styled.h1`
  ${themeAwareText}
  font-size: 2.5rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
  text-align: center;
  
  @media (max-width: 640px) {
    font-size: 2rem;
    margin-bottom: 1rem;
  }
`;

// Content wrapper với theme-aware text
export const ContentWrapper = styled.div`
  ${themeAwareText}
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// Grid container cho feature cards
export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  
  @media (min-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

// Footer text với theme-aware styling
export const FooterText = styled.div`
  ${themeAwareText}
  margin-top: 2rem;
  text-align: center;
  font-size: 0.875rem;
  opacity: 0.75;
  
  .dark & {
    opacity: 0.6;
  }
`; 