/**
 * Base API Service
 * Provides common functionality for all API services
 */

import { axiosAuthInstance } from '../config/axios';
import { handleSuccess, handleError } from '../utils/responseHandler';

class BaseService {
  /**
   * Constructor for the base service
   * @param {string} resourceUrl - The base URL for the resource
   */
  constructor(resourceUrl) {
    this.resourceUrl = resourceUrl;
  }

  /**
   * Make a GET request
   * @param {string} url - URL to fetch (appended to resourceUrl)
   * @param {Object} params - Query parameters
   * @param {Object} config - Additional axios config
   * @returns {Promise} Promise resolving to the response data
   */
  async get(url = '', params = {}, config = {}) {
    try {
      const response = await axiosAuthInstance.get(`${this.resourceUrl}${url}`, {
        params,
        ...config,
      });
      return handleSuccess(response);
    } catch (error) {
      return handleError(error);
    }
  }

  /**
   * Make a POST request
   * @param {string} url - URL to post to (appended to resourceUrl)
   * @param {Object} data - Data to send
   * @param {Object} config - Additional axios config
   * @returns {Promise} Promise resolving to the response data
   */
  async post(url = '', data = {}, config = {}) {
    try {
      const response = await axiosAuthInstance.post(`${this.resourceUrl}${url}`, data, config);
      return handleSuccess(response);
    } catch (error) {
      return handleError(error);
    }
  }

  /**
   * Make a PUT request
   * @param {string} url - URL to put to (appended to resourceUrl)
   * @param {Object} data - Data to send
   * @param {Object} config - Additional axios config
   * @returns {Promise} Promise resolving to the response data
   */
  async put(url = '', data = {}, config = {}) {
    try {
      const response = await axiosAuthInstance.put(`${this.resourceUrl}${url}`, data, config);
      return handleSuccess(response);
    } catch (error) {
      return handleError(error);
    }
  }

  /**
   * Make a PATCH request
   * @param {string} url - URL to patch (appended to resourceUrl)
   * @param {Object} data - Data to send
   * @param {Object} config - Additional axios config
   * @returns {Promise} Promise resolving to the response data
   */
  async patch(url = '', data = {}, config = {}) {
    try {
      const response = await axiosAuthInstance.patch(`${this.resourceUrl}${url}`, data, config);
      return handleSuccess(response);
    } catch (error) {
      return handleError(error);
    }
  }

  /**
   * Make a DELETE request
   * @param {string} url - URL to delete from (appended to resourceUrl)
   * @param {Object} config - Additional axios config
   * @returns {Promise} Promise resolving to the response data
   */
  async delete(url = '', config = {}) {
    try {
      const response = await axiosAuthInstance.delete(`${this.resourceUrl}${url}`, config);
      return handleSuccess(response);
    } catch (error) {
      return handleError(error);
    }
  }
}

export default BaseService;
