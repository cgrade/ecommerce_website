export interface User {
    id: string;
    email: string;
    name: string;
    role?: string; // Add role field (e.g., 'admin' or 'user')
  }