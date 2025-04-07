"use client";

// Force dynamic rendering to prevent prerendering issues with authentication
export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
