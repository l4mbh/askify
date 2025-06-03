import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { AcrylicButton } from '../shared';

const AnimatedButtonWrapper = styled(motion.div)`
  width: 100%;
`;

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning';
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
}

const buttonVariants = {
  idle: { 
    scale: 1,
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)"
  },
  hover: { 
    scale: 1.02,
    boxShadow: "0 8px 30px rgba(0, 0, 0, 0.15)",
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 10
    }
  },
  tap: { 
    scale: 0.98,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)"
  },
  disabled: {
    scale: 1,
    opacity: 0.6,
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)"
  }
};

const rippleVariants = {
  initial: { scale: 0, opacity: 0.5 },
  animate: { 
    scale: 4, 
    opacity: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  }
};

export function AnimatedButton({ 
  children, 
  disabled = false, 
  loading = false,
  ...props 
}: AnimatedButtonProps) {
  const [ripples, setRipples] = React.useState<Array<{ id: number; x: number; y: number }>>([]);

  const createRipple = (event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const newRipple = {
      id: Date.now(),
      x,
      y
    };

    setRipples(prev => [...prev, newRipple]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id));
    }, 600);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled && !loading) {
      createRipple(event);
      props.onClick?.();
    }
  };

  return (
    <AnimatedButtonWrapper
      variants={buttonVariants}
      initial="idle"
      animate={disabled ? "disabled" : "idle"}
      whileHover={!disabled && !loading ? "hover" : undefined}
      whileTap={!disabled && !loading ? "tap" : undefined}
    >
      <AcrylicButton
        {...props}
        disabled={disabled || loading}
        onClick={handleClick}
        style={{ 
          position: 'relative', 
          overflow: 'hidden',
          border: 'none'
        }}
      >
        {children}
        
        {/* Ripple effects */}
        {ripples.map(ripple => (
          <motion.span
            key={ripple.id}
            variants={rippleVariants}
            initial="initial"
            animate="animate"
            style={{
              position: 'absolute',
              left: ripple.x,
              top: ripple.y,
              width: 20,
              height: 20,
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.6)',
              pointerEvents: 'none',
              transform: 'translate(-50%, -50%)'
            }}
          />
        ))}
      </AcrylicButton>
    </AnimatedButtonWrapper>
  );
}

export default AnimatedButton; 