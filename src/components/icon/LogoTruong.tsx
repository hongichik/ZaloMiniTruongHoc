
import React from 'react';
import iconImage from '@/static/icon.jpg';

interface LogoTruongProps {
  size?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const LogoTruong: React.FC<LogoTruongProps> = ({ 
  size = 24, 
  className = '',
  style = {}
}) => {
  const iconStyle: React.CSSProperties = {
    width: typeof size === 'number' ? `${size}px` : size,
    height: typeof size === 'number' ? `${size}px` : size,
    objectFit: 'contain',
    borderRadius: '8px',
    ...style
  };

  return (
    <img
      src={iconImage}
      alt="Logo Trường"
      className={`logo-truong ${className}`}
      style={iconStyle}
    />
  );
};

export default LogoTruong;
