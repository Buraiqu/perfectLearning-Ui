// src/api/services/PublicBaseService.js
import { axiosPublicInstance } from '../config/axios';
import { handleSuccess, handleError } from '../utils/responseHandler';

class PublicBaseService {
    
  constructor(resourceUrl) {
    this.resourceUrl = resourceUrl;
  }

  async get(url = '', params = {}, config = {}) {
    try {
      const response = await axiosPublicInstance.get(`${this.resourceUrl}${url}`, {
        params,
        ...config,
      });
      return handleSuccess(response);
    } catch (error) {
      return handleError(error);
    }
  }

  async post(url = '', data = {}, config = {}) {
    try {
      const response = await axiosPublicInstance.post(`${this.resourceUrl}${url}`, data, config);
      return handleSuccess(response);
    } catch (error) {
      return handleError(error);
    }
  }

  // Add other methods as needed (put, patch, delete)
}

export default PublicBaseService;