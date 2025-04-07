import { createUserInSupabase, fetchUserByCredentials } from './supabase';
import { User } from '../types/user';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';

/**
 * @description Authentication options for NextAuth.js.
 */
export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        const user = await authenticateUser(credentials.email, credentials.password);
        if (user) {
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role || 'user';
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        (session.user as any).role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
};

/**
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @returns {Promise<User | null>} The user if authenticated.
 * @description Authenticates a user with email and password.
 */
export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  try {
    const user = await fetchUserByCredentials(email, password);
    if (user) {
      // Ensure role exists for auth processing
      user.role = user.role || 'user';
    }
    return user;
  } catch (error) {
    console.error('Authentication error:', error);
    return null;
  }
};

/**
 * @param {string} email - User's email.
 * @param {string} password - User's password.
 * @param {string} name - User's name.
 * @returns {Promise<{ success: boolean }>} Signup result.
 * @description Registers a new user.
 */
export const signUp = async (
  email: string,
  password: string,
  name: string,
  role: string = 'user'
): Promise<{ success: boolean; error?: string }> => {
  try {
    await createUserInSupabase(email, password, name, role);
    return { success: true };
  } catch (error: any) {
    console.error('Signup error:', error);
    return { success: false, error: error.message || 'An error occurred during signup' };
  }
};

/**
 * @param {User | any} user - The user object.
 * @returns {boolean} Whether the user is an admin.
 * @description Checks if a user has admin role.
 */
export const isAdmin = (user: any): boolean => {
  return user?.role === 'admin';
};