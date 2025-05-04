/**
 * User Service
 * Handles user profile management and related operations
 */

import BaseService from './BaseService';

class UserService extends BaseService {
  constructor() {
    super('/users');
  }

  /**
   * Get current user profile
   * @returns {Promise} Promise resolving to user profile data
   */
  async getCurrentUser() {
    return this.get('/me');
  }

  /**
   * Fetch user details after login and update context
   * @param {Function} setUserData - Function from AuthContext to update user state
   * @returns {Promise} Promise resolving to user profile data
   */
  async fetchUserAndUpdateContext(setUserData) {
    const response = await this.getCurrentUser();
    
    if (response.success && response.data) {
      // Update the user context with fetched data
      setUserData(response.data);
    }
    
    return response;
  }

  /**
   * Update user profile
   * @param {Object} profileData - Updated profile data
   * @returns {Promise} Promise resolving to updated profile data
   */
  async updateProfile(profileData) {
    return this.put('/me', profileData);
  }

  /**
   * Update user avatar
   * @param {File} avatarFile - Avatar image file
   * @returns {Promise} Promise resolving to updated avatar data
   */
  async updateAvatar(avatarFile) {
    const formData = new FormData();
    formData.append('avatar', avatarFile);
    
    return this.post('/me/avatar', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  }

  /**
   * Get user notifications
   * @param {Object} params - Query parameters (pagination, filters)
   * @returns {Promise} Promise resolving to notifications data
   */
  async getNotifications(params = {}) {
    return this.get('/me/notifications', params);
  }

  /**
   * Mark notification as read
   * @param {string} notificationId - ID of the notification to mark as read
   * @returns {Promise} Promise resolving to updated notification data
   */
  async markNotificationAsRead(notificationId) {
    return this.patch(`/me/notifications/${notificationId}`, { read: true });
  }

  /**
   * Update user preferences
   * @param {Object} preferences - User preferences data
   * @returns {Promise} Promise resolving to updated preferences data
   */
  async updatePreferences(preferences) {
    return this.put('/me/preferences', preferences);
  }
}

// Create and export a singleton instance
const userService = new UserService();
export default userService;
