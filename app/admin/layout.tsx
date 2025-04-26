"use client";

import React from 'react';

// Force dynamic rendering to prevent prerendering issues with authentication
export const dynamic = "force-dynamic";

/**
 * @param {Object} props - Component props
 * @param {React.ReactNode} props.children - Child components to render
 * @returns {JSX.Element} Admin layout wrapper
 * @description Layout component for all admin pages with authentication checks
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="admin-layout min-h-screen bg-background-light">
      {children}
    </div>
  );
}
