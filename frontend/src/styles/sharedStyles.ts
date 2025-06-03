import { css } from 'styled-components';
import { 
  colors, 
  themeAwareText, 
  themeAwareTextHover, 
  acrylicBase, 
  acrylicButton 
} from './theme';

// Re-export từ theme system
export { 
  colors, 
  themeAwareText, 
  themeAwareTextHover, 
  acrylicBase, 
  acrylicButton 
};

// Colorful gradient backgrounds
export const gradientBackgrounds = {
  light: css`
    background: linear-gradient(135deg, 
      #667eea 0%, 
      #764ba2 25%, 
      #f093fb 50%, 
      #f5576c 75%, 
      #4facfe 100%
    );
  `,
  
  dark: css`
    background: linear-gradient(135deg, 
      #1e3c72 0%, 
      #2a5298 25%, 
      #667eea 50%, 
      #764ba2 75%, 
      #f093fb 100%
    );
  `,
  
  // Alternative gradients cho variety
  aurora: css`
    background: linear-gradient(135deg, 
      #ff9a9e 0%, 
      #fecfef 25%, 
      #fecfef 50%, 
      #a8edea 75%, 
      #fed6e3 100%
    );
  `,
  
  sunset: css`
    background: linear-gradient(135deg, 
      #fa709a 0%, 
      #fee140 25%, 
      #fa709a 50%, 
      #fee140 75%, 
      #fa709a 100%
    );
  `,
  
  ocean: css`
    background: linear-gradient(135deg, 
      #667eea 0%, 
      #764ba2 25%, 
      #84fab0 50%, 
      #8fd3f4 75%, 
      #a8edea 100%
    );
  `
};

// Main background style với bg-light.jpg và bg-dark.jpg
export const mainBackground = css`
  /* Light mode - sử dụng bg-light.jpg */
  background-image: url('/img/bg-light.jpg');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  background-repeat: no-repeat;
  
  /* Dark mode - sử dụng bg-dark.jpg */
  .dark & {
    background-image: url('/img/bg-dark.jpg');
    background-size: cover;
    background-position: center;
  }
`;

// Legacy acrylic effect (deprecated - sử dụng acrylicBase thay thế)
export const acrylicEffect = acrylicBase;

// Legacy acrylic button effect (deprecated - sử dụng acrylicButton thay thế)
export const acrylicButtonEffect = acrylicButton;

// Acrylic effect cho input
export const acrylicInputEffect = css`
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(156, 163, 175, 0.3);
  border-radius: 8px;
  
  &:focus {
    background: rgba(255, 255, 255, 0.3);
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  .dark & {
    background: rgba(55, 65, 81, 0.3);
    border-color: rgba(75, 85, 99, 0.3);
    
    &:focus {
      background: rgba(55, 65, 81, 0.5);
    }
  }
`;

// Common color variants
export const colorVariants = {
  primary: css`
    background: rgba(59, 130, 246, 0.8);
    border-color: rgba(59, 130, 246, 0.5);
    color: white;
    
    &:hover {
      background: rgba(37, 99, 235, 0.9);
      box-shadow: 0 6px 20px rgba(59, 130, 246, 0.3);
    }
  `,
  
  success: css`
    background: rgba(16, 185, 129, 0.8);
    border-color: rgba(16, 185, 129, 0.5);
    color: white;
    
    &:hover {
      background: rgba(5, 150, 105, 0.9);
      box-shadow: 0 6px 20px rgba(16, 185, 129, 0.3);
    }
  `,
  
  secondary: css`
    color: #374151;
    
    .dark & {
      color: #d1d5db;
    }
  `
}; 