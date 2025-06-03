import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import {
  focusRing,
  hoverEffects,
  iconStyles,
  borderRadius,
  spacing,
  brandColors,
  themeColors
} from '../../styles/designSystem';
import { acrylicButton, themeAwareText } from '../../styles/theme';

interface MenuIconProps {
  children: React.ReactNode;
  onClick?: () => void;
  title?: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  autoWidth?: boolean;
}

const IconButton = styled(motion.button)<{ 
  $size: 'sm' | 'md' | 'lg';
  $autoWidth: boolean;
}>`
  ${acrylicButton}
  ${focusRing}
  ${hoverEffects.lift}
  display: flex;
  align-items: center;
  justify-content: center;
  ${props => {
    if (props.$autoWidth) {
      return `
        min-width: ${props.$size === 'sm' ? '36px' : props.$size === 'lg' ? '44px' : '40px'};
        height: ${props.$size === 'sm' ? '36px' : props.$size === 'lg' ? '44px' : '40px'};
        padding: ${spacing.sm} ${spacing.md};
      `;
    }
    
    switch (props.$size) {
      case 'sm':
        return `
          width: 36px;
          height: 36px;
        `;
      case 'lg':
        return `
          width: 44px;
          height: 44px;
        `;
      default:
        return `
          width: 40px;
          height: 40px;
        `;
    }
  }}
  border-radius: ${borderRadius.full};
  position: relative;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${brandColors.primary[300]};
    transform: translateY(-1px);
  }
  
  .dark & {
    &:hover {
      border-color: ${brandColors.primary[400]};
    }
  }
  
  svg {
    ${themeAwareText}
    ${iconStyles.md}
    color: ${themeColors.light.text.primary};
    transition: all 0.2s ease;
    
    .dark & {
      color: ${themeColors.dark.text.primary};
    }
  }
  
  &:hover svg {
    color: ${brandColors.primary[500]};
    transform: scale(1.1);
    
    .dark & {
      color: ${brandColors.primary[400]};
    }
  }
`;

const buttonVariants = {
  idle: { 
    y: 0,
    scale: 1 
  },
  hover: { 
    y: -1,
    scale: 1.02,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 17
    }
  },
  tap: { 
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

export function MenuIcon({ 
  children, 
  onClick, 
  title, 
  className,
  size = 'md',
  autoWidth = false
}: MenuIconProps) {
  return (
    <IconButton
      $size={size}
      $autoWidth={autoWidth}
      onClick={onClick}
      title={title}
      className={className}
      variants={buttonVariants}
      initial="idle"
      whileHover="hover"
      whileTap="tap"
    >
      {children}
    </IconButton>
  );
}

export default MenuIcon; 