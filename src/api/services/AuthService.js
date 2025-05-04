/**
 * Authentication Service
 * Handles user authentication, registration, and password management
 */

import BaseService from './BaseService';
import { storeAuthData, clearAuthData } from '../utils/auth';

class AuthService extends BaseService {
  constructor() {
    super('/auth');
  }

  /**
   * Log in a user
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise} Promise resolving to login response with tokens
   */
  async login(email, password) {
    const response = await this.post('/login', { email, password });
    
    if (response.success && response.data?.token) {
      // Only store tokens, not user data
      storeAuthData({
        token: response.data.token,
        refreshToken: response.data.refreshToken
      });
    }
    
    return response;
  }

  /**
   * Register a new user
   * @param {Object} userData - User registration data
   * @returns {Promise} Promise resolving to registration response
   */
  async register(userData) {
    return this.post('/register', userData);
  }

  /**
   * Log out the current user
   * @param {Function} setUser - Function from AuthContext to update user state
   * @returns {Promise} Promise resolving to logout response
   */
  async logout(setUser = null) {
    try {
      // Call logout endpoint if your API requires it
      const response = await this.post('/logout');
      
      // Clear local auth data regardless of API response
      clearAuthData(setUser);
      
      return response;
    } catch (error) {
      // Clear auth data even if the API call fails
      clearAuthData(setUser);
      throw error;
    }
  }

  /**
   * Request a password reset
   * @param {string} email - User email
   * @returns {Promise} Promise resolving to password reset request response
   */
  async requestPasswordReset(email) {
    return this.post('/forgot-password', { email });
  }

  /**
   * Reset password with token
   * @param {string} token - Password reset token
   * @param {string} newPassword - New password
   * @returns {Promise} Promise resolving to password reset response
   */
  async resetPassword(token, newPassword) {
    return this.post('/reset-password', { token, newPassword });
  }

  /**
   * Change password for authenticated user
   * @param {string} currentPassword - Current password
   * @param {string} newPassword - New password
   * @returns {Promise} Promise resolving to password change response
   */
  async changePassword(currentPassword, newPassword) {
    return this.post('/change-password', { currentPassword, newPassword });
  }

  /**
   * Verify email with token
   * @param {string} token - Email verification token
   * @returns {Promise} Promise resolving to email verification response
   */
  async verifyEmail(token) {
    return this.post('/verify-email', { token });
  }
}

// Create and export a singleton instance
const authService = new AuthService();
export default authService;
