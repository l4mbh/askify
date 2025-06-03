import { css } from 'styled-components';

// Color tokens cho theme system
export const colors = {
  light: {
    text: {
      primary: '#000000',
      secondary: '#374151', 
      muted: '#6b7280',
      accent: '#2563eb'
    },
    background: {
      primary: 'rgba(255, 255, 255, 0.1)',
      secondary: 'rgba(255, 255, 255, 0.15)',
      hover: 'rgba(255, 255, 255, 0.2)'
    },
    border: {
      primary: 'rgba(255, 255, 255, 0.2)',
      secondary: 'rgba(255, 255, 255, 0.3)',
      divider: 'rgba(0, 0, 0, 0.2)'
    },
    shadow: {
      text: '0 1px 1px rgba(255, 255, 255, 0.8)',
      box: '0 8px 32px rgba(0, 0, 0, 0.1)',
      inset: 'inset 0 1px 0 rgba(255, 255, 255, 0.2)'
    }
  },
  dark: {
    text: {
      primary: '#f3f4f6',
      secondary: '#d1d5db',
      muted: '#9ca3af', 
      accent: '#93c5fd'
    },
    background: {
      primary: 'rgba(20, 20, 20, 0.3)',
      secondary: 'rgba(20, 20, 20, 0.4)',
      hover: 'rgba(20, 20, 20, 0.5)'
    },
    border: {
      primary: 'rgba(255, 255, 255, 0.1)',
      secondary: 'rgba(255, 255, 255, 0.2)',
      divider: 'rgba(255, 255, 255, 0.2)'
    },
    shadow: {
      text: '0 1px 1px rgba(0, 0, 0, 0.8)',
      box: '0 8px 32px rgba(0, 0, 0, 0.3)',
      inset: 'inset 0 1px 0 rgba(255, 255, 255, 0.1)'
    }
  }
};

// Shared theme-aware styles
export const themeAwareText = css`
  color: ${colors.light.text.primary};
  text-shadow: ${colors.light.shadow.text};
  
  .dark & {
    color: ${colors.dark.text.primary};
    text-shadow: ${colors.dark.shadow.text};
  }
`;

export const themeAwareTextHover = css`
  &:hover {
    color: ${colors.light.text.accent};
    transform: translateY(-1px);
  }
  
  .dark &:hover {
    color: ${colors.dark.text.accent};
  }
`;

// Base acrylic effect mixin
export const acrylicBase = css`
  background: rgba(255, 255, 255, 0.25) !important;
  backdrop-filter: blur(20px) saturate(1.8) !important;
  -webkit-backdrop-filter: blur(20px) saturate(1.8) !important;
  -moz-backdrop-filter: blur(20px) saturate(1.8) !important;
  border: 1px solid rgba(255, 255, 255, 0.3);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
  
  /* Force hardware acceleration */
  will-change: backdrop-filter;
  transform: translateZ(0);
  
  .dark & {
    background: rgba(20, 20, 20, 0.6) !important;
    border: 1px solid rgba(255, 255, 255, 0.15);
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.3),
      inset 0 1px 0 rgba(255, 255, 255, 0.1);
  }
`;

// Button acrylic effect mixin
export const acrylicButton = css`
  ${acrylicBase}
  background: ${colors.light.background.secondary};
  border: 1px solid ${colors.light.border.secondary};
  border-radius: 12px;
  transition: all 0.3s ease;
  cursor: pointer;
  
  &:hover {
    background: ${colors.light.background.hover};
    transform: translateY(-2px);
    box-shadow: 
      0 6px 20px rgba(0, 0, 0, 0.15),
      inset 0 1px 0 rgba(255, 255, 255, 0.4);
  }
  
  .dark & {
    background: ${colors.dark.background.secondary};
    border: 1px solid ${colors.dark.border.secondary};
    
    &:hover {
      background: ${colors.dark.background.hover};
      box-shadow: 
        0 6px 20px rgba(0, 0, 0, 0.3),
        inset 0 1px 0 rgba(255, 255, 255, 0.15);
    }
  }
`; 