import React from 'react';
import { motion } from 'framer-motion';

interface StaggerContainerProps {
  children: React.ReactNode;
  delay?: number;
  staggerDelay?: number;
}

interface StaggerItemProps {
  children: React.ReactNode;
  index: number;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15
    }
  }
};

export function StaggerContainer({ 
  children, 
  delay = 0, 
  staggerDelay = 0.1 
}: StaggerContainerProps) {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      transition={{
        delayChildren: delay,
        staggerChildren: staggerDelay
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({ children, index }: StaggerItemProps) {
  return (
    <motion.div
      variants={itemVariants}
      transition={{
        delay: index * 0.05
      }}
    >
      {children}
    </motion.div>
  );
}

export default { StaggerContainer, StaggerItem }; 