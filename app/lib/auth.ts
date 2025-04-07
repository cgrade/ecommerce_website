import { createUserInSupabase, fetchUserByCredentials } from './supabase';
import { User } from '../types/user';
import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

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
  },
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.role = token.role as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
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
  return await fetchUserByCredentials(email, password);
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
  name: string
): Promise<{ success: boolean }> => {
  try {
    await createUserInSupabase(email, password, name);
    return { success: true };
  } catch (error) {
    return { success: false };
  }
};