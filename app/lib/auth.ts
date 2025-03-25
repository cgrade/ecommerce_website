import { createUserInSupabase, fetchUserByCredentials } from './supabase';
import { User } from '../types/user';

/**
 * @param {string} email - User’s email.
 * @param {string} password - User’s password.
 * @returns {Promise<User | null>} The user if authenticated.
 * @description Authenticates a user with email and password.
 */
export const authenticateUser = async (email: string, password: string): Promise<User | null> => {
  return await fetchUserByCredentials(email, password);
};

/**
 * @param {string} email - User’s email.
 * @param {string} password - User’s password.
 * @param {string} name - User’s name.
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