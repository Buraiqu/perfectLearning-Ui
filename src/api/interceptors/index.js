/**
 * API Interceptors
 * This file contains interceptors for axios requests and responses
 */

import { getAuthToken, refreshToken } from '../utils/auth';
import env from '../config/env';

/**
 * Request interceptor
 * Adds authentication headers and other request processing
 */
export const requestInterceptor = (config) => {
  // Get the authentication token
  const token = getAuthToken();
  
  // If token exists, add it to the request headers
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  
  // Add a timestamp to prevent caching (if needed)
  if (config.method === 'get' && env.IS_DEV) {
    config.params = {
      ...config.params,
      _t: Date.now(),
    };
  }
  
  // Log requests in development mode
  if (env.IS_DEV) {
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`, config);
  }
  
  return config;
};

/**
 * Response interceptor
 * Processes successful responses
 */
export const responseInterceptor = (response) => {
  // Log responses in development mode
  if (env.IS_DEV) {
    console.log(`✅ API Response: ${response.config.method?.toUpperCase()} ${response.config.url}`, response.data);
  }
  
  return response;
};

/**
 * Error interceptor
 * Handles error responses, including token refresh for 401 errors
 */
export const errorInterceptor = async (error) => {
  const originalRequest = error.config;
  
  // Log errors in development mode
  if (env.IS_DEV) {
    console.error(`❌ API Error: ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url}`, error);
  }
  
  // Handle 401 Unauthorized errors (token expired)
  if (error.response?.status === 401 && !originalRequest._retry) {
    originalRequest._retry = true;
    
    try {
      // Attempt to refresh the token
      const newToken = await refreshToken();
      
      // If token refresh is successful, update the authorization header and retry
      if (newToken) {
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axios(originalRequest);
      }
    } catch (refreshError) {
      // If token refresh fails, redirect to login
      console.error('Token refresh failed:', refreshError);
      
      // Redirect to login page or dispatch logout action
      window.location.href = '/login';
      
      return Promise.reject(refreshError);
    }
  }
  
  // Standardize error response format
  return Promise.reject({
    status: error.response?.status || 500,
    message: error.response?.data?.message || 'An unexpected error occurred',
    data: error.response?.data || {},
    originalError: error,
  });
};
