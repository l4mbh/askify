import { css } from 'styled-components';

// ========================
// DESIGN SYSTEM - ASKIFY
// ========================

// Brand Colors - Primary Palette
export const brandColors = {
  primary: {
    50: '#f0f4ff',
    100: '#e0e9ff', 
    200: '#c7d7fe',
    300: '#a5b8fc',
    400: '#8b94f7',
    500: '#667eea', // Main brand color
    600: '#5a67d8',
    700: '#4c51bf',
    800: '#434190',
    900: '#3730a3'
  },
  secondary: {
    50: '#faf5ff',
    100: '#f3e8ff',
    200: '#e9d5ff',
    300: '#d8b4fe',
    400: '#c084fc',
    500: '#764ba2', // Secondary brand color
    600: '#9333ea',
    700: '#7c3aed',
    800: '#6b21a8',
    900: '#581c87'
  },
  gradient: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    primaryLight: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
    primaryMedium: 'linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)',
    primaryStrong: 'linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%)'
  }
};

// Semantic Colors
export const semanticColors = {
  success: {
    50: '#f0fdf4',
    500: '#10b981',
    600: '#059669',
    700: '#047857'
  },
  error: {
    50: '#fef2f2', 
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c'
  },
  warning: {
    50: '#fffbeb',
    500: '#f59e0b',
    600: '#d97706',
    700: '#b45309'
  }
};

// Standardized Spacing
export const spacing = {
  xs: '0.25rem',  // 4px
  sm: '0.5rem',   // 8px
  md: '0.75rem',  // 12px
  lg: '1rem',     // 16px
  xl: '1.25rem',  // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '2rem',   // 32px
  '4xl': '2.5rem', // 40px
  '5xl': '3rem'    // 48px
};

// Standardized Font Sizes
export const fontSize = {
  xs: '0.75rem',   // 12px
  sm: '0.875rem',  // 14px
  base: '1rem',    // 16px
  lg: '1.125rem',  // 18px
  xl: '1.25rem',   // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.875rem' // 30px
};

// Standardized Icon Sizes
export const iconSizes = {
  xs: '12px',
  sm: '16px', 
  md: '20px',  // Standard icon size
  lg: '24px',
  xl: '32px',
  '2xl': '48px'
};

// Standardized Avatar Sizes
export const avatarSizes = {
  xs: '20px',
  sm: '24px',  // Standard small avatar
  md: '32px',  // Standard medium avatar
  lg: '40px',  // Standard large avatar
  xl: '48px',
  '2xl': '64px'
};

// Standardized Border Radius
export const borderRadius = {
  none: '0',
  sm: '4px',
  md: '8px',   // Standard button radius
  lg: '12px',  // Standard card radius
  xl: '16px',  // Standard acrylic radius
  '2xl': '24px',
  full: '9999px'
};

// Button Size Variants - CHUẨN HÓA
export const buttonSizes = {
  xs: css`
    padding: ${spacing.xs} ${spacing.sm};
    font-size: ${fontSize.xs};
    min-height: 24px;
  `,
  sm: css`
    padding: ${spacing.sm} ${spacing.lg};
    font-size: ${fontSize.sm};
    min-height: 32px;
  `,
  md: css`
    padding: ${spacing.md} ${spacing.xl};
    font-size: ${fontSize.base};
    min-height: 40px;
  `,
  lg: css`
    padding: ${spacing.lg} ${spacing['2xl']};
    font-size: ${fontSize.lg};
    min-height: 48px;
  `,
  xl: css`
    padding: ${spacing.xl} ${spacing['3xl']};
    font-size: ${fontSize.xl};
    min-height: 56px;
  `
};

// Icon Component Standardization
export const iconStyles = {
  xs: css`
    width: ${iconSizes.xs};
    height: ${iconSizes.xs};
  `,
  sm: css`
    width: ${iconSizes.sm};
    height: ${iconSizes.sm};
  `,
  md: css`
    width: ${iconSizes.md};
    height: ${iconSizes.md};
  `,
  lg: css`
    width: ${iconSizes.lg};
    height: ${iconSizes.lg};
  `,
  xl: css`
    width: ${iconSizes.xl};
    height: ${iconSizes.xl};
  `,
  '2xl': css`
    width: ${iconSizes['2xl']};
    height: ${iconSizes['2xl']};
  `
};

// Avatar Component Standardization
export const avatarStyles = {
  xs: css`
    width: ${avatarSizes.xs};
    height: ${avatarSizes.xs};
    border-radius: ${borderRadius.full};
  `,
  sm: css`
    width: ${avatarSizes.sm};
    height: ${avatarSizes.sm};
    border-radius: ${borderRadius.full};
  `,
  md: css`
    width: ${avatarSizes.md};
    height: ${avatarSizes.md};
    border-radius: ${borderRadius.full};
  `,
  lg: css`
    width: ${avatarSizes.lg};
    height: ${avatarSizes.lg};
    border-radius: ${borderRadius.full};
  `,
  xl: css`
    width: ${avatarSizes.xl};
    height: ${avatarSizes.xl};
    border-radius: ${borderRadius.full};
  `,
  '2xl': css`
    width: ${avatarSizes['2xl']};
    height: ${avatarSizes['2xl']};
    border-radius: ${borderRadius.full};
  `
};

// Updated Theme Colors với brand consistency
export const themeColors = {
  light: {
    text: {
      primary: '#1f2937',    // Gray-800
      secondary: '#374151',  // Gray-700  
      muted: '#6b7280',     // Gray-500
      accent: brandColors.primary[600]  // Brand primary
    },
    background: {
      primary: 'rgba(255, 255, 255, 0.15)',
      secondary: 'rgba(255, 255, 255, 0.25)',
      hover: 'rgba(255, 255, 255, 0.35)',
      gradient: brandColors.gradient.primaryLight
    },
    border: {
      primary: 'rgba(255, 255, 255, 0.2)',
      secondary: 'rgba(255, 255, 255, 0.3)',
      divider: 'rgba(0, 0, 0, 0.1)'
    }
  },
  dark: {
    text: {
      primary: '#f9fafb',    // Gray-50
      secondary: '#e5e7eb',  // Gray-200
      muted: '#9ca3af',     // Gray-400
      accent: brandColors.primary[400]  // Lighter brand for dark
    },
    background: {
      primary: 'rgba(20, 20, 20, 0.4)',
      secondary: 'rgba(20, 20, 20, 0.6)',
      hover: 'rgba(20, 20, 20, 0.8)',
      gradient: brandColors.gradient.primaryLight
    },
    border: {
      primary: 'rgba(255, 255, 255, 0.1)',
      secondary: 'rgba(255, 255, 255, 0.2)',
      divider: 'rgba(255, 255, 255, 0.15)'
    }
  }
};

// Standardized Hover Effects
export const hoverEffects = {
  lift: css`
    transition: all 0.2s ease;
    &:hover {
      transform: translateY(-2px);
    }
  `,
  scale: css`
    transition: all 0.2s ease;
    &:hover {
      transform: scale(1.05);
    }
  `,
  scaleSmall: css`
    transition: all 0.2s ease;
    &:hover {
      transform: scale(1.02);
    }
  `,
  slideRight: css`
    transition: all 0.2s ease;
    &:hover {
      transform: translateX(4px);
    }
  `
};

// Standardized Shadows
export const shadows = {
  xs: '0 1px 2px rgba(0, 0, 0, 0.05)',
  sm: '0 1px 3px rgba(0, 0, 0, 0.1)',
  md: '0 4px 6px rgba(0, 0, 0, 0.1)',
  lg: '0 8px 15px rgba(0, 0, 0, 0.1)',
  xl: '0 8px 32px rgba(0, 0, 0, 0.15)',
  '2xl': '0 12px 40px rgba(0, 0, 0, 0.2)',
  brand: `0 8px 32px ${brandColors.primary[500]}30`
};

// Focus Ring Standardization  
export const focusRing = css`
  outline: none;
  &:focus {
    box-shadow: 0 0 0 3px ${brandColors.primary[500]}40;
  }
  .dark &:focus {
    box-shadow: 0 0 0 3px ${brandColors.primary[400]}40;
  }
`; 