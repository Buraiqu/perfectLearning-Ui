/**
 * Authentication utilities
 * Handles token storage, retrieval, and refresh
 */

import axios from 'axios';
import env from '../config/env';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

// Token storage keys - only for tokens, not user data
const TOKEN_KEY = 'auth_token';
const REFRESH_TOKEN_KEY = 'refresh_token';

// Context-aware authentication utilities
// This creates a hook that can be used in functional components
export const useAuth = () => {
  return useContext(AuthContext);
};

/**
 * Store authentication tokens securely
 * @param {Object} authData - Authentication data from server
 * @param {string} authData.token - JWT access token
 * @param {string} authData.refreshToken - JWT refresh token
 */
export const storeAuthData = (authData) => {
  if (!authData) return;
  
  // Store tokens in localStorage (consider using HttpOnly cookies in production)
  localStorage.setItem(TOKEN_KEY, authData.token);
  localStorage.setItem(REFRESH_TOKEN_KEY, authData.refreshToken);
};

/**
 * Get the current authentication token
 * @returns {string|null} The JWT token or null if not authenticated
 */
export const getAuthToken = () => {
  return localStorage.getItem(TOKEN_KEY);
};

/**
 * Get the refresh token
 * @returns {string|null} The refresh token or null if not available
 */
export const getRefreshToken = () => {
  return localStorage.getItem(REFRESH_TOKEN_KEY);
};

/**
 * Get the current user data from context
 * Note: This should be used within components using the useAuth hook
 * For non-component code, you'll need to pass the user data from a component
 * @returns {Object|null} The user data or null if not authenticated
 */
export const getUserData = (contextUser = null) => {
  // If user is passed from context, use that
  if (contextUser) {
    return contextUser;
  }
  // This is a fallback and should generally be avoided
  // It's better to always use the context value
  return null;
};

/**
 * Check if the user is authenticated
 * @returns {boolean} True if authenticated, false otherwise
 */
export const isAuthenticated = () => {
  return !!getAuthToken();
};

/**
 * Clear all authentication data (logout)
 * @param {Function} setUser - Function to update user state in context
 */
export const clearAuthData = (setUser = null) => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  
  // Clear user data in context if setUser function is provided
  if (setUser) {
    setUser(null);
  }
};

/**
 * Refresh the authentication token
 * @returns {Promise<string>} A promise that resolves to the new token
 */
export const refreshToken = async () => {
  try {
    const refreshTokenValue = getRefreshToken();
    
    if (!refreshTokenValue) {
      throw new Error('No refresh token available');
    }
    
    // Make a direct axios call (not using our configured instance to avoid circular dependencies)
    const response = await axios.post(
      `${env.API_BASE_URL}/auth/refresh-token`,
      { refreshToken: refreshTokenValue },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    // Store the new tokens
    if (response.data?.token) {
      storeAuthData(response.data);
      return response.data.token;
    }
    
    throw new Error('Failed to refresh token');
  } catch (error) {
    clearAuthData(); // Clear auth data on refresh failure
    throw error;
  }
};
