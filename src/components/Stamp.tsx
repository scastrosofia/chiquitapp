import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface OfficialStampProps {
  text: string;
  subtext?: string;
  variant?: 'celeste' | 'gold' | 'ink' | 'alert';
  rotate?: number;
  className?: string;
}

export const OfficialStamp: React.FC<OfficialStampProps> = ({
  text,
  subtext,
  variant = 'celeste',
  rotate = -6,
  className = '',
}) => {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      className={`official-stamp stamp-${variant} ${className}`}
      initial={
        prefersReduced
          ? { opacity: 1, rotate }
          : { opacity: 0, scale: 1.55, rotate: rotate - 8 }
      }
      animate={{ opacity: 1, scale: 1, rotate }}
      transition={
        prefersReduced
          ? { duration: 0 }
          : { type: 'spring', stiffness: 420, damping: 22 }
      }
    >
      <span className="stamp-main">{text}</span>
      {subtext && <span className="stamp-sub">{subtext}</span>}
    </motion.div>
  );
};
