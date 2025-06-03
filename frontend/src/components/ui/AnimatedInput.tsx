import React, { useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { AcrylicInput } from '../shared';

const AnimatedInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;

const FloatingLabel = styled(motion.label)<{ $hasValue: boolean; $isFocused: boolean }>`
  position: absolute;
  left: 16px;
  pointer-events: none;
  transition: all 0.2s ease;
  color: ${props => props.$isFocused ? '#667eea' : 'rgba(0, 0, 0, 0.6)'};
  font-size: ${props => props.$hasValue || props.$isFocused ? '0.75rem' : '1rem'};
  top: ${props => props.$hasValue || props.$isFocused ? '8px' : '50%'};
  transform: ${props => props.$hasValue || props.$isFocused ? 'translateY(0)' : 'translateY(-50%)'};
  z-index: 2;
  
  .dark & {
    color: ${props => props.$isFocused ? '#818cf8' : 'rgba(255, 255, 255, 0.6)'};
  }
`;

const StyledInput = styled(AcrylicInput)<{ $hasFloatingLabel: boolean }>`
  padding-top: ${props => props.$hasFloatingLabel ? '24px' : '12px'};
  padding-bottom: ${props => props.$hasFloatingLabel ? '8px' : '12px'};
  transition: all 0.3s ease;
  position: relative;
  z-index: 1;
  
  &:focus {
    transform: translateY(-1px);
    box-shadow: 0 4px 20px rgba(102, 126, 234, 0.2);
  }
  
  &::placeholder {
    opacity: ${props => props.$hasFloatingLabel ? '0' : '1'};
    transition: opacity 0.2s ease;
  }
`;

const FocusRing = styled(motion.div)`
  position: absolute;
  top: -1px;
  left: -1px;
  right: -1px;
  bottom: -1px;
  border: 2px solid #667eea;
  border-radius: 10px;
  pointer-events: none;
  z-index: 0;
  
  .dark & {
    border-color: #818cf8;
  }
`;

interface AnimatedInputProps {
  label?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  name?: string;
}

const focusRingVariants = {
  hidden: { 
    scale: 0.95, 
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30
    }
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 30
    }
  }
};

export function AnimatedInput({ 
  label,
  placeholder,
  value = '',
  onChange,
  onFocus,
  onBlur,
  ...props 
}: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;
  const hasFloatingLabel = !!label;

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  return (
    <AnimatedInputWrapper>
      <FocusRing
        variants={focusRingVariants}
        initial="hidden"
        animate={isFocused ? "visible" : "hidden"}
      />
      
      {hasFloatingLabel && (
        <FloatingLabel 
          $hasValue={hasValue} 
          $isFocused={isFocused}
          htmlFor={props.name}
        >
          {label}
        </FloatingLabel>
      )}
      
      <StyledInput
        {...props}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={hasFloatingLabel ? '' : placeholder}
        $hasFloatingLabel={hasFloatingLabel}
      />
    </AnimatedInputWrapper>
  );
}

export default AnimatedInput; 