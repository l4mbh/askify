import React from 'react';
import { motion } from 'framer-motion';

interface PageTransitionProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'up' | 'down';
  duration?: number;
}

const slideVariants = {
  left: {
    initial: { x: -100, opacity: 0 },
    in: { x: 0, opacity: 1 },
    out: { x: 100, opacity: 0 }
  },
  right: {
    initial: { x: 100, opacity: 0 },
    in: { x: 0, opacity: 1 },
    out: { x: -100, opacity: 0 }
  },
  up: {
    initial: { y: 100, opacity: 0 },
    in: { y: 0, opacity: 1 },
    out: { y: -100, opacity: 0 }
  },
  down: {
    initial: { y: -100, opacity: 0 },
    in: { y: 0, opacity: 1 },
    out: { y: 100, opacity: 0 }
  }
};

const scaleVariants = {
  initial: { scale: 0.8, opacity: 0 },
  in: { scale: 1, opacity: 1 },
  out: { scale: 1.1, opacity: 0 }
};

export function PageTransition({ 
  children, 
  direction = 'right', 
  duration = 0.5 
}: PageTransitionProps) {
  const variants = slideVariants[direction];

  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={variants}
      transition={{
        type: "tween",
        ease: "easeInOut",
        duration: duration
      }}
    >
      {children}
    </motion.div>
  );
}

export function ScaleTransition({ 
  children, 
  duration = 0.4 
}: Omit<PageTransitionProps, 'direction'>) {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={scaleVariants}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 24,
        duration: duration
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerContainer({ 
  children, 
  staggerDelay = 0.1 
}: { 
  children: React.ReactNode; 
  staggerDelay?: number; 
}) {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={{
        initial: {},
        animate: {
          transition: {
            staggerChildren: staggerDelay
          }
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ 
  children, 
  delay = 0 
}: { 
  children: React.ReactNode; 
  delay?: number; 
}) {
  return (
    <motion.div
      variants={{
        initial: { y: 20, opacity: 0 },
        animate: { y: 0, opacity: 1 }
      }}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 24,
        delay: delay
      }}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition; 