"use client";

import React from "react";

interface PageContainerProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  fullWidth?: boolean;
  className?: string;
}

/**
 * A consistent container component for pages
 * Provides standardized padding, width constraints and optional title/subtitle
 */
const PageContainer: React.FC<PageContainerProps> = ({
  children,
  title,
  subtitle,
  fullWidth = false,
  className = "",
}) => {
  return (
    <div className={`py-8 px-4 ${fullWidth ? 'w-full' : 'max-w-7xl mx-auto'} ${className}`}>
      {(title || subtitle) && (
        <div className="mb-8 text-center">
          {title && <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>}
          {subtitle && <p className="text-gray-600">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
};

export default PageContainer;
