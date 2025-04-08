export interface User {
    id: string;
    email: string;
    name: string;
    role: string; // Required role field ('admin' or 'user')
    created_at?: string;
    email_verified?: boolean;
    verification_token?: string | null;
  }